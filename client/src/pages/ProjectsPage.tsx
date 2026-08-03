import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FolderKanban, Search, Filter } from 'lucide-react';
import { apiService } from '../api/client';
import { Badge } from '../components/ui/Badge';
import { ProjectCard } from '../components/project/ProjectCard';
import { Skeleton } from '../components/ui/Skeleton';

export const ProjectsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: apiService.getProjects
  });

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDiff = difficultyFilter === 'ALL' || p.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="emerald" className="mb-2">Practical Experience</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-emerald-600" />
            <span>Recommended Projects Library ({projects.length})</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Build real-world applications mapped directly to skill graph nodes.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects..."
              className="pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl glass-panel bg-white">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
            {['ALL', 'Beginner', 'Intermediate', 'Advanced'].map(diff => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                  difficultyFilter === diff
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
};
