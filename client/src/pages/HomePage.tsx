import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Network, 
  Sparkles, 
  Search, 
  ArrowRight, 
  Database, 
  Cpu, 
  Zap, 
  CheckCircle2,
  FolderKanban,
  Briefcase,
  BookOpen,
  MousePointerClick,
  Compass,
  Monitor,
  LayoutGrid
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../api/client';
import { Badge } from '../components/ui/Badge';
import { CytoscapeGraph } from '../components/graph/CytoscapeGraph';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: sampleGraph } = useQuery({
    queryKey: ['sampleGraphData'],
    queryFn: () => apiService.getGraphData(['react', 'nodejs', 'mongodb', 'typescript'], 'role-fullstack')
  });

  const popularSkills = [
    { id: 'react', name: 'React' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'nodejs', name: 'Node.js' },
    { id: 'python-lang', name: 'Python' },
    { id: 'neo4j', name: 'Graph DB' },
    { id: 'docker', name: 'Docker' }
  ];

  const stats = [
    { label: 'Graph Nodes', count: '80+', icon: Network },
    { label: 'Technologies', count: '30+', icon: Cpu },
    { label: 'Frameworks', count: '25+', icon: Zap },
    { label: 'Career Roles', count: '20+', icon: Briefcase },
    { label: 'Projects', count: '40+', icon: FolderKanban },
    { label: 'Resources', count: '40+', icon: BookOpen }
  ];

  const workflowSteps = [
    { number: '01', title: 'Select Skills', desc: 'Pick your known technologies & stack', icon: MousePointerClick },
    { number: '02', title: 'Generate Roadmap', desc: 'Compute prerequisites via Cypher traversals', icon: Compass },
    { number: '03', title: 'Interactive Graph', desc: 'Explore 3-hop connected nodes', icon: Network },
    { number: '04', title: 'Projects', desc: 'Build portfolio projects for your gaps', icon: FolderKanban },
    { number: '05', title: 'Career Roles', desc: 'Track readiness % for industry roles', icon: Briefcase },
  ];

  const fourSections = [
    {
      num: '1',
      title: 'Roadmap Studio',
      desc: 'Interactive skill chip picker & openCypher dependency ordering engine.',
      icon: Compass,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 border-indigo-200'
    },
    {
      num: '2',
      title: 'Interactive Cytoscape Visualizer',
      desc: 'Full-screen canvas supporting 3-hop traversals & node metadata inspection.',
      icon: Network,
      color: 'text-sky-600',
      bg: 'bg-sky-50 border-sky-200'
    },
    {
      num: '3',
      title: 'Career Roles Match Ranking',
      desc: 'Readiness % score meter, target market salary, & skill gap analysis.',
      icon: Briefcase,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-200'
    },
    {
      num: '4',
      title: 'Recommended Projects & Resources',
      desc: 'Portfolio projects with 1-skill Quick Win badges & curated course links.',
      icon: FolderKanban,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-200'
    }
  ];

  const handleQuickSelectSkill = (skillId: string) => {
    navigate(`/dashboard?skill=${skillId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/dashboard?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="space-y-12 sm:space-y-20 pb-16">
      
      {/* HERO SECTION - FULLY RESPONSIVE */}
      <section className="relative pt-6 sm:pt-10 pb-8 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        
        {/* Ambient background soft light gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-4 w-60 sm:w-80 h-60 sm:h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Hero Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-4 sm:space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[11px] sm:text-xs font-mono font-bold text-indigo-700 shadow-sm max-w-full">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse shrink-0" />
              <span className="truncate">Powered by CognoDB Cloud & openCypher</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
              Discover Your <br />
              <span className="gradient-text-indigo">Graph-Powered</span> <br />
              Learning Path
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Select the skills you know. SkillGraph AI executes CognoDB Cloud openCypher graph traversals to calculate missing prerequisites, career readiness, and project roadmaps.
            </p>

            {/* SEARCH BAR */}
            <form onSubmit={handleSearchSubmit} className="pt-1 sm:pt-2">
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search skills: React, Node.js, Docker..."
                  className="w-full pl-10 sm:pl-12 pr-24 sm:pr-32 py-3 sm:py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
                </button>
              </div>
            </form>

            {/* POPULAR SKILLS CHIPS */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs font-mono text-slate-500 mr-1">Popular:</span>
              {popularSkills.map((sk) => (
                <button
                  key={sk.id}
                  onClick={() => handleQuickSelectSkill(sk.id)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all shadow-sm"
                >
                  {sk.name}
                </button>
              ))}
            </div>

            {/* CTA BUTTONS */}
            <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                to="/dashboard"
                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Start Roadmap Studio</span>
              </Link>

              <Link
                to="/explorer"
                className="px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Network className="w-4 h-4 text-sky-600" />
                <span>Launch Graph Explorer</span>
              </Link>
            </div>

          </motion.div>

          {/* Hero Graph Canvas Preview Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 relative w-full"
          >
            <div className="p-2 sm:p-3 rounded-3xl glass-panel bg-white border border-slate-200 relative overflow-hidden shadow-lg">
              
              <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-900">Live Graph Canvas</span>
                </div>
                <Badge variant="cyan">CognoDB Cloud</Badge>
              </div>

              {/* Sample Visual Chain Banner */}
              <div className="p-2.5 sm:p-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-slate-700 overflow-x-auto whitespace-nowrap">
                <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold text-slate-800">React</span>
                <span className="text-slate-400">→</span>
                <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold text-slate-800">Node.js</span>
                <span className="text-slate-400">→</span>
                <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold text-slate-800">Express</span>
                <span className="text-slate-400">→</span>
                <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold text-slate-800">MongoDB</span>
                <span className="text-slate-400">→</span>
                <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded border border-indigo-200 font-bold">Full Stack Developer</span>
              </div>

              {/* Cytoscape Canvas Preview */}
              {sampleGraph ? (
                <CytoscapeGraph data={sampleGraph} height="360px" />
              ) : (
                <div className="h-[360px] bg-white flex items-center justify-center text-xs font-mono text-slate-400">
                  Loading Graph Engine...
                </div>
              )}

            </div>
          </motion.div>

        </div>
      </section>

      {/* NEW SECTION: PLATFORM SCREENSHOT SHOWCASE & 4-MODULE BREAKDOWN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl glass-panel bg-white border border-slate-200 space-y-8 shadow-sm">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <Badge variant="primary">Platform Architecture Showcase</Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              4-Section Module Showcase
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Complete visual breakdown of the 4 core modules powering SkillGraph AI.
            </p>
          </div>

          {/* 4 Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fourSections.map((sec) => (
              <div
                key={sec.num}
                className={`p-4 rounded-2xl border ${sec.bg} space-y-2 shadow-sm transition-all hover:scale-105`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                    Section 0{sec.num}
                  </span>
                  <sec.icon className={`w-4 h-4 ${sec.color}`} />
                </div>
                <h3 className="font-bold text-sm text-slate-900">{sec.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{sec.desc}</p>
              </div>
            ))}
          </div>

          {/* Screenshot Browser Frame Container */}
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-2 sm:p-4 shadow-2xl overflow-hidden relative group">
            
            {/* macOS Browser Bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 mb-3 bg-slate-950/60 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              </div>
              <div className="px-4 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 font-medium truncate max-w-xs sm:max-w-md">
                https://skillgraph-ai.vercel.app/showcase
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Monitor className="w-4 h-4" />
              </div>
            </div>

            {/* Platform Screenshot Image */}
            <div className="relative overflow-hidden rounded-xl border border-slate-800">
              <img
                src="/screenshort.png"
                alt="SkillGraph AI 4-Section Platform Overview"
                className="w-full h-auto object-cover rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>

          </div>

        </div>
      </section>

      {/* ROADMAP FLOW WORKFLOW STEPS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <Badge variant="primary" className="mb-2">5-Step Graph Workflow</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How SkillGraph AI Builds Your Path
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Seamless workflow from initial skill selection to career match rankings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 relative">
          {workflowSteps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="p-4 sm:p-5 rounded-2xl glass-panel glass-panel-hover bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-mono font-bold text-indigo-600">
                    {step.number}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                    <step.icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-1">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* QUICK STATS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-4 sm:p-5 rounded-2xl glass-panel text-center bg-white"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 mx-auto mb-2 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <stat.icon className="w-4 h-4" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900">{stat.count}</div>
              <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY GRAPH DATABASE COMPARISON SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl glass-panel bg-white relative overflow-hidden">
          
          <div className="max-w-3xl mb-6 sm:mb-8">
            <Badge variant="cyan" className="mb-3">Architectural Rationale</Badge>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why a Graph Database is the Correct Solution for Connected Data
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Traditional Relational Databases (RDBMS) require costly multi-table recursive `JOIN`s to query connected skills, prerequisites, and role dependencies. CognoDB Cloud index-free adjacency provides sub-millisecond graph traversals.
            </p>
          </div>

          {/* COMPARISON TABLE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Relational DB Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm sm:text-base">
                <Database className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Relational Database (RDBMS)</span>
              </div>
              <ul className="space-y-2 text-xs font-mono text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Requires complex 6-table recursive SQL `JOIN`s for prerequisite paths.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Exponential execution time degradation as graph depth increases.</span>
                </li>
              </ul>
            </div>

            {/* Graph DB Card (CognoDB Cloud) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-indigo-50/50 border border-indigo-200 shadow-sm space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
                <Network className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                <span>Graph Database (CognoDB Cloud)</span>
              </div>
              <ul className="space-y-2 text-xs font-mono text-slate-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sub-millisecond openCypher shortestPath pattern matching.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Constant O(1) index-free adjacency traversal performance.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
