import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Network, 
  Sparkles, 
  Database, 
  Menu, 
  X,
  Compass,
  Briefcase,
  FolderKanban,
  BookOpen,
  Cpu
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Roadmap Studio', path: '/dashboard', icon: Compass },
    { label: 'Graph Explorer', path: '/explorer', icon: Network },
    { label: 'Timeline View', path: '/roadmap-view', icon: Cpu },
    { label: 'Career Roles', path: '/roles', icon: Briefcase },
    { label: 'Projects', path: '/projects', icon: FolderKanban },
    { label: 'Resources', path: '/resources', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-500 flex items-center justify-center shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform duration-300">
            <Network className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
              SkillGraph <span className="gradient-text-indigo font-black">AI</span>
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-slate-500 block -mt-1 font-semibold">
              CognoDB Cloud Engine
            </span>
          </div>
        </Link>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1.5 rounded-full border border-slate-200">
          {navLinks.slice(0, 5).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                location.pathname === link.path
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Badge & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-indigo-700 font-bold">
            <Database className="w-3.5 h-3.5 text-indigo-600" />
            <span>openCypher</span>
          </div>

          <Link
            to="/dashboard"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white text-xs font-bold shadow-md hover:opacity-95 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Generate Roadmap</span>
          </Link>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-all focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2">
            Navigation Menu
          </div>
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <link.icon className="w-4 h-4 text-indigo-600" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Roadmap Studio</span>
            </Link>
          </div>
        </div>
      )}

    </header>
  );
};
