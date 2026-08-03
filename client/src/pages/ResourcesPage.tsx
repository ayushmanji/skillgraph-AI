import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, Search, ExternalLink, Star } from 'lucide-react';
import { apiService } from '../api/client';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';

export const ResourcesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const sampleSkillIds = ['react', 'nextjs', 'docker', 'neo4j', 'python-lang', 'typescript', 'fastapi', 'postgresql'];

  const { data: resources = [], isLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: () => apiService.getResources(sampleSkillIds)
  });

  const filteredResources = resources.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.typeFormat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="cyan" className="mb-2">Curated Content</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-sky-600" />
            <span>Learning Resources Library ({resources.length})</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Official documentation, interactive sandboxes, video courses, and ebooks.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search resource..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map(res => (
            <div key={res.id} className="p-5 rounded-2xl glass-panel bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant="cyan">{res.typeFormat}</Badge>
                  <span className="text-xs font-mono text-slate-600 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {res.rating}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">{res.name}</h3>
                <p className="text-xs font-mono text-slate-500">Duration: {res.duration}</p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
