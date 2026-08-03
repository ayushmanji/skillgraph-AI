import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Search } from 'lucide-react';
import { apiService } from '../api/client';
import { Badge } from '../components/ui/Badge';
import { RoleCard } from '../components/role/RoleCard';
import { Skeleton } from '../components/ui/Skeleton';

export const RolesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const knownSkillIds = ['react', 'nodejs', 'mongodb', 'typescript'];

  const { data: roles = [], isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: apiService.getRoles
  });

  const filteredRoles = roles.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="amber" className="mb-2">Career Opportunities</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-amber-600" />
            <span>Career Roles Catalog ({roles.length})</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Explore industry roles, skill requirement dependencies, and market salaries.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search career role..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
          />
        </div>
      </div>

      {/* Grid of Roles */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRoles.map((role) => {
            const required = role.requiredSkills || [];
            const matched = required.filter(id => knownSkillIds.includes(id));
            const missing = required.filter(id => !knownSkillIds.includes(id));
            const matchPct = required.length > 0 ? Math.round((matched.length / required.length) * 100) : 0;

            return (
              <RoleCard
                key={role.id}
                role={role}
                matchPercentage={matchPct}
                matchedSkillIds={matched}
                missingSkillIds={missing}
                onSelectRole={(rId) => navigate(`/dashboard?role=${rId}`)}
              />
            );
          })}
        </div>
      )}

    </div>
  );
};
