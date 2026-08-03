import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Cpu, Download } from 'lucide-react';
import { apiService } from '../api/client';
import { Badge } from '../components/ui/Badge';
import { RoadmapTimeline } from '../components/roadmap/RoadmapTimeline';
import { Skeleton } from '../components/ui/Skeleton';
import { exportRoadmapToPDF } from '../utils/pdfExport';

export const RoadmapPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('role-fullstack');
  const knownSkills = ['react', 'nodejs', 'mongodb', 'typescript'];

  const { data: roadmap, isLoading } = useQuery({
    queryKey: ['roadmapView', selectedRole],
    queryFn: () => apiService.getRoadmap(knownSkills, selectedRole)
  });

  const { data: roles = [] } = useQuery({
    queryKey: ['roles'],
    queryFn: apiService.getRoles
  });

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="primary" className="mb-2">Roadmap View</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-indigo-600" />
            <span>Interactive Learning Timeline</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Prerequisite graph order for achieving your desired career role.
          </p>
        </div>

        <button
          onClick={() => exportRoadmapToPDF('standalone-roadmap-timeline')}
          className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Export Timeline PDF</span>
        </button>
      </div>

      {/* Role Picker Bar */}
      <div className="p-4 rounded-2xl glass-panel bg-white flex flex-wrap items-center gap-3">
        <span className="text-xs font-mono font-bold uppercase text-slate-600">Select Target Role:</span>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 shadow-sm"
        >
          {roles.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
      </div>

      {/* Timeline View */}
      <div id="standalone-roadmap-timeline">
        {isLoading ? (
          <Skeleton className="h-96 w-full rounded-2xl" />
        ) : roadmap ? (
          <RoadmapTimeline steps={roadmap.steps} />
        ) : null}
      </div>
    </div>
  );
};
