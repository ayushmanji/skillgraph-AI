import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Network, Sparkles, Database } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-500 flex items-center justify-center shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform duration-300">
            <Network className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
              SkillGraph <span className="gradient-text-indigo font-black">AI</span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block -mt-1 font-semibold">
              CognoDB Cloud Engine
            </span>
          </div>
        </Link>

        {/* Quick Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1.5 rounded-full border border-slate-200">
          <Link
            to="/dashboard"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              location.pathname === '/dashboard'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            Roadmap Studio
          </Link>
          <Link
            to="/explorer"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              location.pathname === '/explorer'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            Graph Explorer
          </Link>
          <Link
            to="/roles"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              location.pathname === '/roles'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            Career Roles
          </Link>
          <Link
            to="/projects"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              location.pathname === '/projects'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            Projects
          </Link>
        </nav>

        {/* Right Action Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-indigo-700 font-bold">
            <Database className="w-3.5 h-3.5 text-indigo-600" />
            <span>openCypher</span>
          </div>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white text-xs font-bold shadow-md hover:opacity-95 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Generate Roadmap</span>
          </Link>
        </div>

      </div>
    </header>
  );
};
