import React from 'react';
import { Clock, FolderKanban, Sparkles, CheckCircle, Code2 } from 'lucide-react';
import { ProjectNode } from '../../types';
import { Badge } from '../ui/Badge';

interface ProjectCardProps {
  project: ProjectNode;
  missingReqs?: string[];
  requiresOnlyOneMissingSkill?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  missingReqs = [],
  requiresOnlyOneMissingSkill = false,
}) => {
  return (
    <div
      className={`rounded-2xl glass-panel glass-panel-hover p-5 flex flex-col justify-between relative overflow-hidden bg-white ${
        requiresOnlyOneMissingSkill
          ? 'border-emerald-300 bg-gradient-to-b from-white via-white to-emerald-50/50 shadow-md'
          : ''
      }`}
    >
      {/* Quick Win Ribbon */}
      {requiresOnlyOneMissingSkill && (
        <div className="absolute top-0 right-0 bg-emerald-600 text-[10px] font-mono font-extrabold uppercase px-3 py-1 rounded-bl-xl text-white shadow-sm flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-white" />
          <span>Quick Win (1 Skill Missing)</span>
        </div>
      )}

      <div>
        <div className="flex items-center gap-2 mb-3 flex-wrap pr-20">
          <Badge variant="cyan">{project.difficulty}</Badge>
          <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {project.estimatedHours} Hours
          </span>
        </div>

        <h3 className="font-bold text-lg text-slate-900 mb-2 flex items-center gap-2">
          <FolderKanban className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{project.name}</span>
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Skills Learned Badges */}
        <div className="mb-3">
          <h4 className="text-[11px] font-mono text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Skills You Will Build:
          </h4>
          <div className="flex flex-wrap gap-1">
            {project.skillsLearned.map((sId) => (
              <span
                key={sId}
                className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-700 capitalize"
              >
                {sId.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>

        {/* Technologies Badges */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="mb-3">
            <h4 className="text-[11px] font-mono text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
              <Code2 className="w-3 h-3 text-sky-600" />
              Tech Stack:
            </h4>
            <div className="flex flex-wrap gap-1">
              {project.techStack.map((tId) => (
                <span
                  key={tId}
                  className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-700 capitalize"
                >
                  {tId.replace('tech-', '').replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Prerequisites Alert */}
      <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
        {missingReqs.length > 0 ? (
          <span className="text-amber-700 font-semibold">
            Missing Prerequisites: {missingReqs.length}
          </span>
        ) : (
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            Ready to Build Now
          </span>
        )}
      </div>
    </div>
  );
};
