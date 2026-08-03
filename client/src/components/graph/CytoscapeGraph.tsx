import React, { useEffect, useRef, useState } from 'react';
import cytoscape, { Core, NodeSingular } from 'cytoscape';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Layers, 
  Sparkles,
  X,
  Share2
} from 'lucide-react';
import { CompleteGraphData } from '../../types';
import { Badge } from '../ui/Badge';
import { apiService } from '../../api/client';

interface CytoscapeGraphProps {
  data: CompleteGraphData;
  height?: string;
  selectedNodeId?: string;
  onSelectNode?: (nodeId: string, nodeData: any) => void;
  filterNodeType?: string;
}

const NODE_COLORS: Record<string, string> = {
  Skill: '#4f46e5',           // Indigo
  Technology: '#0284c7',      // Sky Blue
  Framework: '#2563eb',       // Blue
  Role: '#d97706',            // Amber
  Project: '#059669',         // Emerald
  LearningResource: '#db2777' // Pink
};

export const CytoscapeGraph: React.FC<CytoscapeGraphProps> = ({
  data,
  height = '500px',
  onSelectNode,
  filterNodeType = 'ALL'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);
  
  const [layoutName, setLayoutName] = useState<'cose' | 'concentric' | 'circle' | 'breadthfirst'>('cose');
  const [inspectedNode, setInspectedNode] = useState<any | null>(null);
  const [hopNeighbors, setHopNeighbors] = useState<any[]>([]);
  const [activePathMessage, setActivePathMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const filteredNodes = filterNodeType === 'ALL'
      ? data.nodes
      : data.nodes.filter((n: any) => n.type === filterNodeType);

    const nodeIds = new Set(filteredNodes.map((n: any) => n.id));

    const filteredEdges = data.edges.filter(
      (e: any) => nodeIds.has(e.source) && nodeIds.has(e.target)
    );

    const cyElements = [
      ...filteredNodes.map((n: any) => ({
        data: {
          id: n.id,
          label: n.name,
          nodeType: n.type,
          color: n.isKnown ? '#f59e0b' : (NODE_COLORS[n.type] || '#4f46e5'),
          textColor: '#0f172a',
          isKnown: !!n.isKnown,
          raw: n
        }
      })),
      ...filteredEdges.map((e: any) => ({
        data: {
          id: e.id,
          source: e.source,
          target: e.target,
          label: e.type,
          type: e.type
        }
      }))
    ];

    const cy = cytoscape({
      container: containerRef.current,
      elements: cyElements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'data(color)',
            'label': 'data(label)',
            'color': '#0f172a',
            'font-size': '11px',
            'font-family': 'Inter, system-ui, sans-serif',
            'font-weight': 'bold',
            'text-valign': 'bottom',
            'text-margin-y': 6,
            'border-width': '2px',
            'border-color': '#cbd5e1',
            'width': '34px',
            'height': '34px',
            'transition-property': 'background-color, border-color, border-width',
            'transition-duration': 0.2
          }
        },
        {
          selector: 'node[?isKnown]',
          style: {
            'border-width': '4px',
            'border-color': '#fef08a',
            'background-color': '#f59e0b',
            'color': '#78350f',
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#94a3b8',
            'target-arrow-color': '#94a3b8',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'opacity': 0.75,
            'label': 'data(label)',
            'font-size': '9px',
            'font-family': 'Inter, system-ui, sans-serif',
            'color': '#64748b',
            'text-rotation': 'autorotate'
          }
        },
        {
          selector: '.highlighted',
          style: {
            'background-color': '#0284c7',
            'border-color': '#0ea5e9',
            'border-width': '5px',
            'line-color': '#0284c7',
            'target-arrow-color': '#0284c7',
            'opacity': 1,
            'z-index': 999
          }
        },
        {
          selector: '.dimmed',
          style: {
            'opacity': 0.2
          }
        }
      ],
      layout: {
        name: layoutName,
        animate: true,
        animationDuration: 500,
        padding: 40
      } as any
    });

    cyRef.current = cy;

    cy.on('tap', 'node', (evt) => {
      const node = evt.target as NodeSingular;
      const rawData = node.data('raw');
      
      setInspectedNode(rawData);
      setActivePathMessage(null);

      cy.elements().removeClass('highlighted dimmed');

      const neighborhood = node.closedNeighborhood();
      cy.elements().difference(neighborhood).addClass('dimmed');
      neighborhood.addClass('highlighted');

      const neighbors = node.neighborhood('node').map(n => n.data('raw'));
      setHopNeighbors(neighbors);

      if (onSelectNode) {
        onSelectNode(node.id(), rawData);
      }
    });

    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        cy.elements().removeClass('highlighted dimmed');
        setInspectedNode(null);
        setHopNeighbors([]);
        setActivePathMessage(null);
      }
    });

    return () => {
      cy.destroy();
    };
  }, [data, layoutName, filterNodeType]);

  const handleExpand3Hops = async () => {
    if (!inspectedNode || !cyRef.current) return;
    try {
      const hopsData = await apiService.getHops(inspectedNode.id, 3);
      const hopSkillIds = new Set([inspectedNode.id, ...hopsData.map((h: any) => h.skill.id)]);
      
      cyRef.current.elements().removeClass('highlighted dimmed');
      
      cyRef.current.nodes().forEach((n) => {
        if (hopSkillIds.has(n.id())) {
          n.addClass('highlighted');
        } else {
          n.addClass('dimmed');
        }
      });
      setActivePathMessage(`3-Hop Subgraph: ${hopsData.length} Connected Skills`);
    } catch (err) {
      console.error('Hops expansion error:', err);
    }
  };

  const handleZoomIn = () => cyRef.current?.zoom(cyRef.current.zoom() * 1.25);
  const handleZoomOut = () => cyRef.current?.zoom(cyRef.current.zoom() * 0.75);
  const handleResetFit = () => cyRef.current?.fit(undefined, 30);

  return (
    <div className="relative w-full rounded-2xl glass-panel border border-slate-200 overflow-hidden bg-white">
      
      {/* Top Controls Toolbar - Fully Responsive */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Layout Switcher */}
        <div className="flex items-center gap-1 p-1 sm:p-1.5 rounded-xl bg-white/90 border border-slate-200 backdrop-blur-md pointer-events-auto shadow-sm overflow-x-auto max-w-full">
          <Layers className="w-3.5 h-3.5 text-indigo-600 ml-1 sm:ml-2 shrink-0" />
          <span className="hidden sm:inline text-[10px] font-mono font-bold text-slate-500 uppercase mr-1">Layout:</span>
          {(['cose', 'concentric', 'circle', 'breadthfirst'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLayoutName(l)}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-mono font-semibold capitalize whitespace-nowrap transition-all ${
                layoutName === l
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Zoom & Fit Actions */}
        <div className="flex items-center gap-1 p-1 sm:p-1.5 rounded-xl bg-white/90 border border-slate-200 backdrop-blur-md pointer-events-auto shadow-sm">
          <button
            onClick={handleZoomIn}
            className="p-1 sm:p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1 sm:p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={handleResetFit}
            className="p-1 sm:p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
            title="Fit to View"
          >
            <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

      </div>

      {/* Active Traversal Path Notification */}
      {activePathMessage && (
        <div className="absolute top-14 sm:top-16 left-3 z-10 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-[11px] font-mono font-bold text-indigo-700 shadow-sm backdrop-blur-md">
          {activePathMessage}
        </div>
      )}

      {/* Legend Badges Overlay */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap items-center gap-1.5 pointer-events-none max-h-16 overflow-hidden">
        {Object.entries(NODE_COLORS).map(([type, color]) => (
          <div
            key={type}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 border border-slate-200 text-[10px] font-mono font-medium text-slate-700 backdrop-blur-md shadow-sm"
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span>{type}</span>
          </div>
        ))}
      </div>

      {/* Cytoscape Canvas Container */}
      <div ref={containerRef} style={{ height }} className="w-full bg-white min-h-[350px]" />

      {/* Node Inspector Drawer - Mobile & Desktop Responsive */}
      {inspectedNode && (
        <div className="absolute inset-x-0 bottom-0 sm:bottom-auto sm:top-16 sm:right-3 sm:left-auto z-20 w-full sm:w-80 p-4 rounded-t-2xl sm:rounded-2xl bg-white border border-slate-200 shadow-2xl max-h-[75vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 sm:slide-in-from-right-4 duration-200">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <Badge variant="cyan">{inspectedNode.type || 'Node'}</Badge>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 mt-1">{inspectedNode.name}</h3>
            </div>
            <button
              onClick={() => {
                setInspectedNode(null);
                cyRef.current?.elements().removeClass('highlighted dimmed');
                setActivePathMessage(null);
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            {inspectedNode.description || 'Connected entity node in CognoDB Cloud dataset.'}
          </p>

          {inspectedNode.category && (
            <div className="text-xs text-slate-500 mb-1">
              <span className="font-semibold text-slate-700">Category:</span> {inspectedNode.category}
            </div>
          )}

          {/* Interactive Traversal Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center gap-2 mb-3">
            <button
              onClick={handleExpand3Hops}
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Expand 3-Hop Traversal</span>
            </button>
          </div>

          {/* Connected Hops List */}
          {hopNeighbors.length > 0 && (
            <div className="pt-2 border-t border-slate-200">
              <h4 className="text-[10px] font-mono uppercase font-bold text-slate-500 mb-2 flex items-center gap-1">
                <Share2 className="w-3 h-3 text-indigo-600" />
                Direct Neighbors ({hopNeighbors.length})
              </h4>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
                {hopNeighbors.map((nb) => (
                  <span
                    key={nb.id}
                    className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-700 border border-slate-200"
                  >
                    {nb.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
