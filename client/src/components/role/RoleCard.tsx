import React from 'react';
import { Briefcase, DollarSign, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import { RoleNode } from '../../types';
import { Badge } from '../ui/Badge';

interface RoleCardProps {
  role: RoleNode;
  matchPercentage?: number;
  matchedSkillIds?: string[];
  missingSkillIds?: string[];
  onSelectRole?: (roleId: string) => void;
  isSelected?: boolean;
}

export const RoleCard: React.FC<RoleCardProps> = ({
  role,
  matchPercentage = 0,
  matchedSkillIds = [],
  missingSkillIds = [],
  onSelectRole,
  isSelected = false
}) => {
  return (
    <div
      onClick={() => onSelectRole && onSelectRole(role.id)}
      className={`rounded-2xl glass-panel glass-panel-hover p-5 transition-all cursor-pointer bg-white ${
        isSelected
          ? 'border-indigo-500 bg-gradient-to-b from-white via-white to-indigo-50/40 shadow-md ring-2 ring-indigo-500/20'
          : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <Badge variant="amber">Career Role</Badge>
          <h3 className="font-bold text-lg text-slate-900 mt-1 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>{role.name}</span>
          </h3>
        </div>

        {/* Skill Match % Badge */}
        <div className="px-3 py-1.5 rounded-xl border border-indigo-200 text-xs font-mono font-bold shadow-sm bg-indigo-50 text-indigo-700">
          {matchPercentage}% Match
        </div>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
        {role.description}
      </p>

      {/* Salary & Demand Info */}
      <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700">
        <div className="flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
          <span>{role.averageSalary || 'Competitive'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
          <span>{role.demandLevel || 'High'} Demand</span>
        </div>
      </div>

      {/* Skills Match Breakdown */}
      <div className="space-y-2 text-xs font-mono">
        <div className="flex items-center justify-between text-slate-500 text-[11px]">
          <span>Skills Required: {role.requiredSkills?.length || 0}</span>
          <span>Matched: {matchedSkillIds.length} | Missing: {missingSkillIds.length}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 to-sky-500 transition-all duration-500"
            style={{ width: `${matchPercentage}%` }}
          />
        </div>

        <div className="flex flex-wrap gap-1 pt-1">
          {matchedSkillIds.slice(0, 4).map(sId => (
            <span key={sId} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-mono border border-emerald-200 flex items-center gap-1">
              <CheckCircle className="w-2.5 h-2.5 text-emerald-600" />
              {sId.replace('-', ' ')}
            </span>
          ))}
          {missingSkillIds.slice(0, 3).map(sId => (
            <span key={sId} className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[10px] font-mono border border-amber-200 flex items-center gap-1">
              <AlertCircle className="w-2.5 h-2.5 text-amber-600" />
              {sId.replace('-', ' ')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
