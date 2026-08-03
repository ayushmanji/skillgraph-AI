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
  Compass
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
    { id: 'react', name: 'React', category: 'Frontend' },
    { id: 'typescript', name: 'TypeScript', category: 'Frontend' },
    { id: 'nodejs', name: 'Node.js', category: 'Backend' },
    { id: 'python-lang', name: 'Python', category: 'AI & ML' },
    { id: 'neo4j', name: 'Graph DB & Cypher', category: 'Database' },
    { id: 'docker', name: 'Docker', category: 'DevOps' },
    { id: 'kubernetes', name: 'Kubernetes', category: 'DevOps' },
    { id: 'langchain', name: 'LangChain & RAG', category: 'AI & ML' }
  ];

  const stats = [
    { label: 'Skills Graph Nodes', count: '80+', icon: Network },
    { label: 'Technologies', count: '30+', icon: Cpu },
    { label: 'Frameworks', count: '25+', icon: Zap },
    { label: 'Career Roles', count: '20+', icon: Briefcase },
    { label: 'Practice Projects', count: '40+', icon: FolderKanban },
    { label: 'Curated Resources', count: '40+', icon: BookOpen }
  ];

  const workflowSteps = [
    { number: '01', title: 'Select Skills', desc: 'Pick your known technologies & current stack', icon: MousePointerClick },
    { number: '02', title: 'Generate Roadmap', desc: 'Compute missing prerequisites via Cypher traversals', icon: Compass },
    { number: '03', title: 'Interactive Graph', desc: 'Explore 3-hop connected nodes & shortest paths', icon: Network },
    { number: '04', title: 'Recommended Projects', desc: 'Build portfolio projects matched to your gaps', icon: FolderKanban },
    { number: '05', title: 'Career Roles', desc: 'Track your Readiness % for top industry roles', icon: Briefcase },
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
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION WITH CLEAN LIGHT SAAS DESIGN */}
      <section className="relative pt-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        
        {/* Ambient background soft light gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-mono font-bold text-indigo-700 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span>Powered by CognoDB Cloud & openCypher Engine</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
              Discover Your <br />
              <span className="gradient-text-indigo">Graph-Powered</span> <br />
              Learning Path
            </h1>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Select the skills you know. SkillGraph AI executes CognoDB Cloud openCypher graph traversals to calculate missing prerequisites, career readiness, and project roadmaps.
            </p>

            {/* SEARCH BAR */}
            <form onSubmit={handleSearchSubmit} className="pt-2">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search skills: React, Node.js, Docker, Python..."
                  className="w-full pl-12 pr-32 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* POPULAR SKILLS CHIPS */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs font-mono text-slate-500 mr-1">Popular:</span>
              {popularSkills.slice(0, 6).map((sk) => (
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
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/dashboard"
                className="px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Start Roadmap Studio</span>
              </Link>

              <Link
                to="/explorer"
                className="px-7 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
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
            className="lg:col-span-6 relative"
          >
            <div className="p-2 rounded-3xl glass-panel bg-white border border-slate-200 relative overflow-hidden shadow-lg">
              
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-900">Live Graph Canvas</span>
                </div>
                <Badge variant="cyan">CognoDB Cloud</Badge>
              </div>

              {/* Sample Visual Chain Banner */}
              <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-700 overflow-x-auto">
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
                <CytoscapeGraph data={sampleGraph} height="380px" />
              ) : (
                <div className="h-[380px] bg-white flex items-center justify-center text-xs font-mono text-slate-400">
                  Loading Graph Engine...
                </div>
              )}

            </div>
          </motion.div>

        </div>
      </section>

      {/* ROADMAP FLOW WORKFLOW STEPS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="primary" className="mb-2">5-Step Graph Workflow</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How SkillGraph AI Builds Your Path
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Seamless workflow from initial skill selection to career match rankings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {workflowSteps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="p-5 rounded-2xl glass-panel glass-panel-hover bg-white flex flex-col justify-between relative"
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

                <h3 className="font-bold text-base text-slate-900 mb-1">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>

              {idx < workflowSteps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300 font-bold">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* QUICK STATS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-5 rounded-2xl glass-panel text-center bg-white"
            >
              <div className="w-9 h-9 mx-auto mb-2 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <stat.icon className="w-4 h-4" />
              </div>
              <div className="text-2xl font-black text-slate-900">{stat.count}</div>
              <div className="text-[11px] font-mono text-slate-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY GRAPH DATABASE COMPARISON SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl glass-panel bg-white relative overflow-hidden">
          
          <div className="max-w-3xl mb-8">
            <Badge variant="cyan" className="mb-3">Architectural Rationale</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why a Graph Database is the Correct Solution for Connected Data
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Traditional Relational Databases (RDBMS) require costly multi-table recursive `JOIN`s to query connected skills, prerequisites, and role dependencies. CognoDB Cloud index-free adjacency provides sub-millisecond graph traversals.
            </p>
          </div>

          {/* COMPARISON TABLE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Relational DB Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-slate-700 font-semibold text-base">
                <Database className="w-5 h-5" />
                <span>Relational Database (RDBMS)</span>
              </div>
              <ul className="space-y-2.5 text-xs font-mono text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Requires complex 6-table recursive SQL `JOIN`s for prerequisite paths.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Exponential execution time degradation as graph depth increases.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Rigid tabular schemas struggle with dynamic polymorphic skill relations.</span>
                </li>
              </ul>
            </div>

            {/* Graph DB Card (CognoDB Cloud) */}
            <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Network className="w-5 h-5 text-indigo-600" />
                <span>Graph Database (CognoDB Cloud)</span>
              </div>
              <ul className="space-y-2.5 text-xs font-mono text-slate-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sub-millisecond openCypher shortestPath pattern matching.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Constant O(1) index-free adjacency traversal performance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Flexible schema modeling nodes (`:Skill`, `:Role`) and relationships (`:REQUIRES`, `:BUILDS`).</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
