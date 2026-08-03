import React from 'react';
import { Network } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
            <Network className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-900 text-sm">SkillGraph AI</span>
          <span className="text-xs text-slate-500 font-mono">| CognoDB Cloud Graph Engine</span>
        </div>

        <p className="text-xs font-mono text-slate-600 flex items-center gap-1">
          Built for CognoDB Cloud using React, TypeScript, openCypher, & Tailwind CSS
        </p>

        <div className="flex items-center gap-4 text-xs font-mono font-bold text-slate-700">
          <span>CognoDB Cloud</span>
          <span>•</span>
          <span>openCypher</span>
        </div>

      </div>
    </footer>
  );
};
