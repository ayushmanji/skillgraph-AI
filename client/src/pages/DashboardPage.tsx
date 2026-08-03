import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { 
  Sparkles, 
  Search, 
  Check, 
  Compass, 
  Briefcase, 
  FolderKanban, 
  BookOpen, 
  Download, 
  Bookmark, 
  Network,
  RotateCcw,
  Route,
  Play
} from 'lucide-react';
import { apiService } from '../api/client';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { CytoscapeGraph } from '../components/graph/CytoscapeGraph';
import { RoadmapTimeline } from '../components/roadmap/RoadmapTimeline';
import { ProjectCard } from '../components/project/ProjectCard';
import { RoleCard } from '../components/role/RoleCard';
import { exportRoadmapToPDF } from '../utils/pdfExport';

export const DashboardPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const initialQuery = searchParams.get('q') || '';
  const initialSkill = searchParams.get('skill') || '';

  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([
    'react', 'nodejs', 'mongodb', 'typescript'
  ]);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('role-fullstack');
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const [startSkillId, setStartSkillId] = useState('react');
  const [targetSkillId, setTargetSkillId] = useState('langchain');
  const [shortestPathResult, setShortestPathResult] = useState<any | null>(null);

  const [isBookmarked, setIsBookmarked] = useState(false);

  const { data: skills = [], isLoading: isLoadingSkills } = useQuery({
    queryKey: ['skills'],
    queryFn: apiService.getSkills
  });

  const { data: roles = [], isLoading: isLoadingRoles } = useQuery({
    queryKey: ['roles'],
    queryFn: apiService.getRoles
  });

  const recommendationMutation = useMutation({
    mutationFn: async () => {
      const [recs, roadmap, graph] = await Promise.all([
        apiService.getRecommendations(selectedSkillIds, selectedRoleId),
        apiService.getRoadmap(selectedSkillIds, selectedRoleId),
        apiService.getGraphData(selectedSkillIds, selectedRoleId)
      ]);
      return { recs, roadmap, graph };
    }
  });

  const shortestPathMutation = useMutation({
    mutationFn: async () => {
      return await apiService.getShortestPath(startSkillId, targetSkillId);
    },
    onSuccess: (data) => {
      setShortestPathResult(data);
    }
  });

  useEffect(() => {
    if (initialSkill && !selectedSkillIds.includes(initialSkill)) {
      setSelectedSkillIds(prev => [...prev, initialSkill]);
    }
    recommendationMutation.mutate();
  }, [initialSkill]);

  const applyPreset = (presetSkills: string[], roleId: string) => {
    setSelectedSkillIds(presetSkills);
    setSelectedRoleId(roleId);
    setTimeout(() => recommendationMutation.mutate(), 50);
  };

  const toggleSkill = (id: string) => {
    setSelectedSkillIds(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleClearAllSkills = () => {
    setSelectedSkillIds([]);
  };

  const handleGenerateRoadmap = () => {
    recommendationMutation.mutate();
  };

  const filteredSkills = skills.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'ALL' || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['ALL', 'Frontend', 'Backend', 'AI & ML', 'DevOps & Cloud', 'Database', 'Data Engineering', 'Architecture'];

  const results = recommendationMutation.data;
  const isGenerating = recommendationMutation.isPending;

  return (
    <div className="space-y-10 pb-16">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Badge variant="primary" className="mb-2">Roadmap Studio</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-indigo-600" />
            <span>Skill Graph Roadmap Studio</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Select your known skills to traverse graph prerequisites, role matches, and project milestones.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportRoadmapToPDF('roadmap-printable-container')}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border shadow-sm ${
              isBookmarked
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>
        </div>
      </div>

      {/* DEMO PRESETS BAR */}
      <div className="p-4 rounded-2xl glass-panel bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
          <Sparkles className="w-4 h-4 text-sky-600" />
          <span>Quick Demo Presets:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => applyPreset(['react', 'nodejs', 'mongodb', 'typescript'], 'role-fullstack')}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-semibold text-slate-700 hover:text-indigo-600 hover:border-indigo-200 transition-all"
          >
            💻 MERN Full Stack
          </button>
          <button
            onClick={() => applyPreset(['python-lang', 'fastapi', 'postgresql'], 'role-ai-engineer')}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-semibold text-slate-700 hover:text-indigo-600 hover:border-indigo-200 transition-all"
          >
            🤖 AI & LLM Engineer
          </button>
          <button
            onClick={() => applyPreset(['docker', 'linux-cli', 'aws'], 'role-devops')}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-semibold text-slate-700 hover:text-indigo-600 hover:border-indigo-200 transition-all"
          >
            ☁️ DevOps & Platform
          </button>
        </div>
      </div>

      {/* SKILL SELECTION PANEL */}
      <section className="p-6 rounded-3xl glass-panel bg-white space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>Select Known Skills</span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-mono text-xs font-bold border border-indigo-100">
                {selectedSkillIds.length} Selected
              </span>
            </h2>
            <p className="text-xs text-slate-500">Click skills to toggle your existing knowledge stack.</p>
          </div>

          <div className="flex items-center gap-2">
            {selectedSkillIds.length > 0 && (
              <button
                onClick={handleClearAllSkills}
                className="text-xs font-mono text-slate-500 hover:text-slate-900 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Target Role Selector & Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div>
            <label className="block text-xs font-mono text-slate-600 uppercase font-semibold mb-1.5">
              Target Career Role
            </label>
            <select
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 shadow-sm"
            >
              {roles.map(r => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-slate-600 uppercase font-semibold mb-1.5">
              Search Skills Catalog
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter by skill name or category..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
              />
            </div>
          </div>

        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Chips Multi-Select Grid */}
        <div className="max-h-56 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {isLoadingSkills ? (
            Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)
          ) : filteredSkills.length > 0 ? (
            filteredSkills.map((sk) => {
              const isSelected = selectedSkillIds.includes(sk.id);
              return (
                <button
                  key={sk.id}
                  onClick={() => toggleSkill(sk.id)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-indigo-50 text-indigo-900 border-indigo-300 font-bold shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate">{sk.name}</span>
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-slate-300 text-transparent'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                  </div>
                </button>
              );
            })
          ) : (
            <div className="col-span-full py-6 text-center text-xs font-mono text-slate-500">
              No skills match your search filter.
            </div>
          )}
        </div>

        {/* Generate Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleGenerateRoadmap}
            disabled={isGenerating}
            className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>{isGenerating ? 'Drawing openCypher Traversal...' : 'Generate SkillGraph Roadmap'}</span>
          </button>
        </div>

      </section>

      {/* SHORTEST PATH GRAPH TRAVERSAL TOOL */}
      <section className="p-6 rounded-3xl glass-panel bg-white space-y-4">
        <div className="flex items-center gap-2">
          <Route className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">Find Shortest Skill Learning Path (Cypher Query 3)</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-mono text-slate-600 mb-1 font-semibold">Start Skill</label>
            <select
              value={startSkillId}
              onChange={(e) => setStartSkillId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 shadow-sm"
            >
              {skills.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-600 mb-1 font-semibold">Target Skill</label>
            <select
              value={targetSkillId}
              onChange={(e) => setTargetSkillId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 shadow-sm"
            >
              {skills.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => shortestPathMutation.mutate()}
              className="w-full py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 text-indigo-600" />
              <span>Compute Shortest Path</span>
            </button>
          </div>
        </div>

        {/* Shortest Path Result Render */}
        {shortestPathResult && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-mono text-slate-700">
            <span className="font-bold text-slate-900">Path ({shortestPathResult.distance} Hops):</span>
            {shortestPathResult.path.map((node: any, i: number) => (
              <React.Fragment key={node.id}>
                <span className="px-2.5 py-1 rounded bg-white border border-slate-200 font-semibold text-indigo-700 shadow-sm">
                  {node.name}
                </span>
                {i < shortestPathResult.path.length - 1 && (
                  <span className="text-slate-400 font-bold">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </section>

      {/* RESULTS DISPLAY CONTAINER */}
      {results && (
        <div id="roadmap-printable-container" className="space-y-12">
          
          {/* READINESS OVERVIEW BAR */}
          <section className="p-6 sm:p-8 rounded-3xl glass-panel bg-white relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              
              <div>
                <Badge variant="amber" className="mb-2">Target Role Overview</Badge>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {results.recs.targetRole?.name || 'Selected Career Goal'}
                </h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {results.recs.targetRole?.description}
                </p>
              </div>

              {/* Readiness Score Meter */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center justify-center">
                <span className="text-xs font-mono uppercase font-bold text-slate-500 mb-1">
                  Career Readiness Score
                </span>
                <div className="text-4xl font-extrabold text-indigo-600">
                  {results.recs.readinessScore}%
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full mt-2 overflow-hidden max-w-xs">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 to-sky-500 transition-all duration-700"
                    style={{ width: `${results.recs.readinessScore}%` }}
                  />
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-3 text-center font-mono font-bold">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs text-slate-500">Known Skills</div>
                  <div className="text-xl font-black text-slate-900">
                    {selectedSkillIds.length}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs text-slate-500">Missing Skills</div>
                  <div className="text-xl font-black text-indigo-600">
                    {results.recs.missingSkills.length}
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* GRAPH VISUALIZATION CENTERPIECE */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Network className="w-5 h-5 text-indigo-600" />
                  <span>Connected Skill Graph Traversal</span>
                </h2>
                <p className="text-xs text-slate-500">Interactive Cytoscape visualization of your skills, prerequisites, and target path.</p>
              </div>
            </div>

            {results.graph && (
              <CytoscapeGraph
                data={results.graph}
                height="550px"
              />
            )}
          </section>

          {/* ROADMAP TIMELINE */}
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-sky-600" />
                <span>Sequential Learning Roadmap</span>
              </h2>
              <p className="text-xs text-slate-500">Order of missing skills computed by prerequisite dependency resolution.</p>
            </div>

            <RoadmapTimeline steps={results.roadmap.steps} />
          </section>

          {/* RECOMMENDED PROJECTS SECTION */}
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-emerald-600" />
                <span>Recommended Projects</span>
              </h2>
              <p className="text-xs text-slate-500">Projects tailored to build your missing skills. "Quick Win" projects require only 1 missing skill.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.recs.recommendedProjects.slice(0, 6).map((item) => (
                <ProjectCard
                  key={item.project.id}
                  project={item.project}
                  missingReqs={item.missingReqs}
                  requiresOnlyOneMissingSkill={item.requiresOnlyOneMissingSkill}
                />
              ))}
            </div>
          </section>

          {/* CAREER ROLES MATCHING */}
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-600" />
                <span>Career Roles Match Ranking</span>
              </h2>
              <p className="text-xs text-slate-500">Roles ordered by match percentage with your current skill set.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.recs.roleMatches.slice(0, 6).map((item) => (
                <RoleCard
                  key={item.role.id}
                  role={item.role}
                  matchPercentage={item.matchPercentage}
                  matchedSkillIds={item.matchedSkillIds}
                  missingSkillIds={item.missingSkillIds}
                  isSelected={item.role.id === selectedRoleId}
                  onSelectRole={(rId) => {
                    setSelectedRoleId(rId);
                    recommendationMutation.mutate();
                  }}
                />
              ))}
            </div>
          </section>

          {/* LEARNING RESOURCES */}
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <span>Recommended Courses & Learning Resources</span>
              </h2>
              <p className="text-xs text-slate-500">Curated interactive tutorials and documentation for your missing skills.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.recs.learningResources.slice(0, 6).map((item) => (
                <div key={item.resource.id} className="p-4 rounded-2xl glass-panel bg-white space-y-2">
                  <Badge variant="cyan">{item.resource.typeFormat}</Badge>
                  <h3 className="font-bold text-base text-slate-900">{item.resource.name}</h3>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>Duration: {item.resource.duration}</span>
                    <span className="text-amber-600 font-bold">★ {item.resource.rating}</span>
                  </div>
                  <a
                    href={item.resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs font-bold text-indigo-600 hover:underline pt-2"
                  >
                    Open Resource &rarr;
                  </a>
                </div>
              ))}
            </div>
          </section>

        </div>
      )}

    </div>
  );
};
