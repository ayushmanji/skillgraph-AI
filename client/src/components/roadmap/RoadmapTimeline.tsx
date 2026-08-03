import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  BookOpen, 
  FolderKanban, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { RoadmapStep } from '../../types';
import { Badge } from '../ui/Badge';

interface RoadmapTimelineProps {
  steps: RoadmapStep[];
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ steps }) => {
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({
    1: true,
    2: true
  });

  const toggleStep = (stepNumber: number) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  if (!steps || steps.length === 0) {
    return (
      <div className="p-8 rounded-2xl glass-panel text-center bg-white">
        <Sparkles className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
        <h3 className="text-base font-bold text-slate-900 mb-1">No Missing Skills Required!</h3>
        <p className="text-xs text-slate-500">You already possess all required skills for this target career role.</p>
      </div>
    );
  }

  return (
    <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
      {steps.map((item, index) => {
        const isExpanded = !!expandedSteps[item.step];

        return (
          <motion.div
            key={item.skill.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative"
          >
            {/* Timeline Milestone Dot */}
            <div className="absolute -left-6 sm:-left-8 top-4 w-6 h-6 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center text-[10px] font-bold text-indigo-600 shadow-sm">
              {item.step}
            </div>

            {/* Step Card Container */}
            <div className="rounded-2xl glass-panel glass-panel-hover overflow-hidden bg-white">
              
              {/* Header Bar */}
              <button
                onClick={() => toggleStep(item.step)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="primary">Step {item.step}</Badge>
                  <h3 className="font-bold text-lg sm:text-xl text-slate-900">{item.skill.name}</h3>
                  <Badge variant="amber">{item.skill.level}</Badge>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    ~{item.estimatedWeeks} week{item.estimatedWeeks > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Expandable Step Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-5 sm:px-5 space-y-4 border-t border-slate-100 pt-4"
                  >
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.skill.description}
                    </p>

                    {/* Prerequisites */}
                    {item.prerequisites.length > 0 && (
                      <div>
                        <h4 className="text-[11px] font-mono uppercase font-bold text-slate-500 mb-1.5 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Prerequisite Skills
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {item.prerequisites.map(p => (
                            <span key={p.id} className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
                              {p.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Content Columns: Recommended Project & Learning Resource */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      
                      {/* Project Card */}
                      {item.recommendedProject && (
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
                            <FolderKanban className="w-4 h-4" />
                            <span>Recommended Practice Project</span>
                          </div>
                          <h5 className="font-bold text-sm text-slate-900 mb-1">{item.recommendedProject.name}</h5>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-2">
                            {item.recommendedProject.description}
                          </p>
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                            <span>Difficulty: {item.recommendedProject.difficulty}</span>
                            <span>Est: {item.recommendedProject.estimatedHours}h</span>
                          </div>
                        </div>
                      )}

                      {/* Learning Resource Card */}
                      {item.resource && (
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 mb-1">
                            <BookOpen className="w-4 h-4" />
                            <span>Recommended Course / Resource</span>
                          </div>
                          <h5 className="font-bold text-sm text-slate-900 mb-1">{item.resource.name}</h5>
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-2">
                            <span>Format: {item.resource.typeFormat}</span>
                            <span className="text-amber-600 font-bold">★ {item.resource.rating}</span>
                          </div>
                          <a
                            href={item.resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:underline"
                          >
                            <span>Open Resource</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      )}

                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
