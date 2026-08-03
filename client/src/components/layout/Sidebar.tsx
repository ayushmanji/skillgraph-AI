import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Compass, 
  Network, 
  Briefcase, 
  FolderKanban, 
  BookOpen, 
  Cpu, 
  Sparkles 
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Roadmap Generator', path: '/dashboard', icon: Compass },
    { label: 'Graph Explorer', path: '/explorer', icon: Network },
    { label: 'Roadmap View', path: '/roadmap-view', icon: Cpu },
    { label: 'Career Roles', path: '/roles', icon: Briefcase },
    { label: 'Recommended Projects', path: '/projects', icon: FolderKanban },
    { label: 'Learning Resources', path: '/resources', icon: BookOpen },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-slate-200 bg-white hidden lg:flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-6">
        
        {/* Navigation Category */}
        <div>
          <h3 className="px-3 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-3 border-b border-slate-200 pb-1">
            Dashboard Navigation
          </h3>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Feature Highlight Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-indigo-50/70 via-slate-50 to-sky-50/70 border border-indigo-100 text-center relative overflow-hidden">
          <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 mb-1">Graph Traversal Power</h4>
          <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
            Powered by CognoDB Cloud openCypher queries for sub-millisecond multi-hop graph paths.
          </p>
          <NavLink
            to="/explorer"
            className="block text-[11px] font-bold text-indigo-700 hover:underline"
          >
            Launch Graph Explorer &rarr;
          </NavLink>
        </div>

      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 font-mono font-semibold flex items-center justify-between">
        <span>CognoDB Cloud Engine</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
    </aside>
  );
};
