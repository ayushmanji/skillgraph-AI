import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Network, Filter, Sparkles } from 'lucide-react';
import { apiService } from '../api/client';
import { CytoscapeGraph } from '../components/graph/CytoscapeGraph';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';

export const GraphExplorerPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('ALL');

  const { data: graphData, isLoading } = useQuery({
    queryKey: ['graphData'],
    queryFn: () => apiService.getGraphData()
  });

  const hopMutation = useMutation({
    mutationFn: (skillId: string) => apiService.getHops(skillId, 3)
  });

  const handleSelectNode = (nodeId: string, nodeData: any) => {
    if (nodeData.type === 'Skill') {
      hopMutation.mutate(nodeId);
    }
  };

  const nodeTypes = ['ALL', 'Skill', 'Technology', 'Framework', 'Role', 'Project', 'LearningResource'];

  return (
    <div className="space-y-6 pb-16">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Badge variant="cyan" className="mb-2">Interactive CognoDB Graph</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Network className="w-6 h-6 text-sky-600" />
            <span>Graph Explorer Studio</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Pan, zoom, click nodes, and query multi-hop relationships dynamically across connected entities.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-2 rounded-2xl glass-panel bg-white">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
          {nodeTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                selectedType === type
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* GRAPH CANVAS CONTAINER */}
      {isLoading ? (
        <Skeleton className="h-[650px] w-full rounded-3xl" />
      ) : graphData ? (
        <CytoscapeGraph
          data={graphData}
          height="650px"
          filterNodeType={selectedType}
          onSelectNode={handleSelectNode}
        />
      ) : (
        <div className="p-12 text-center font-mono text-slate-500">Failed to load graph data.</div>
      )}

      {/* 3-HOP RELATIONSHIPS PANEL */}
      {hopMutation.data && hopMutation.data.length > 0 && (
        <div className="p-6 rounded-3xl glass-panel bg-white space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Skills Within 3 Hops Traversal ({hopMutation.data.length} Nodes Found)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {hopMutation.data.map((item: any) => (
              <div key={item.skill.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono">
                <div>
                  <div className="text-slate-900 font-semibold">{item.skill.name}</div>
                  <div className="text-[10px] text-slate-500">{item.skill.category}</div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px]">
                  {item.hops} Hop{item.hops > 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
