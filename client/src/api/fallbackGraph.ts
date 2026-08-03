import { 
  SkillNode, 
  RoleNode, 
  ProjectNode, 
  ResourceNode, 
  CompleteGraphData,
  RecommendationResponse,
  RoadmapResponse,
  RoleMatch,
  RoadmapStep
} from '../types';

export interface RawSkill extends SkillNode {
  requires?: string[];
  relatedTo?: string[];
}

export const FALLBACK_SKILLS: RawSkill[] = [
  { id: 'html5', name: 'HTML5', type: 'Skill', category: 'Frontend', level: 'Beginner', description: 'Semantic structure and Web APIs' },
  { id: 'css3', name: 'CSS3', type: 'Skill', category: 'Frontend', level: 'Beginner', description: 'Styling, Flexbox, Grid and CSS Animations', requires: ['html5'] },
  { id: 'javascript', name: 'JavaScript ES6+', type: 'Skill', category: 'Frontend', level: 'Beginner', description: 'Core web scripting, async/await, closures', requires: ['html5', 'css3'] },
  { id: 'typescript', name: 'TypeScript', type: 'Skill', category: 'Frontend', level: 'Intermediate', description: 'Static typing, generics, strict type safety', requires: ['javascript'] },
  { id: 'react', name: 'React', type: 'Skill', category: 'Frontend', level: 'Intermediate', description: 'Component architecture, hooks, Virtual DOM', requires: ['javascript', 'css3'], relatedTo: ['vue', 'svelte'] },
  { id: 'nextjs', name: 'Next.js', type: 'Skill', category: 'Frontend', level: 'Advanced', description: 'App Router, SSR, SSG, Server Components', requires: ['react', 'typescript'] },
  { id: 'tailwindcss', name: 'Tailwind CSS', type: 'Skill', category: 'Frontend', level: 'Intermediate', description: 'Utility-first CSS styling and custom design tokens', requires: ['css3'] },
  { id: 'state-mgmt', name: 'State Management', type: 'Skill', category: 'Frontend', level: 'Intermediate', description: 'Redux Toolkit, Zustand, Context API', requires: ['react'] },
  { id: 'tanstack-query', name: 'TanStack Query', type: 'Skill', category: 'Frontend', level: 'Intermediate', description: 'Server state management, caching, optimistic updates', requires: ['react'] },
  { id: 'web-perf', name: 'Web Performance', type: 'Skill', category: 'Frontend', level: 'Advanced', description: 'Lighthouse, Core Web Vitals, Code Splitting', requires: ['nextjs', 'react'] },
  { id: 'nodejs', name: 'Node.js', type: 'Skill', category: 'Backend', level: 'Intermediate', description: 'Event loop, asynchronous I/O, Streams', requires: ['javascript'] },
  { id: 'express', name: 'Express.js', type: 'Skill', category: 'Backend', level: 'Intermediate', description: 'RESTful API routing, middleware pattern', requires: ['nodejs'] },
  { id: 'nestjs', name: 'NestJS', type: 'Skill', category: 'Backend', level: 'Advanced', description: 'Enterprise Node.js framework with Dependency Injection', requires: ['express', 'typescript'] },
  { id: 'python-lang', name: 'Python', type: 'Skill', category: 'Backend', level: 'Beginner', description: 'General purpose language for backend, scripts, AI' },
  { id: 'fastapi', name: 'FastAPI', type: 'Skill', category: 'Backend', level: 'Intermediate', description: 'Modern high-performance Python web APIs with Pydantic', requires: ['python-lang'] },
  { id: 'django', name: 'Django', type: 'Skill', category: 'Backend', level: 'Intermediate', description: 'Full-featured Python web framework', requires: ['python-lang'] },
  { id: 'golang', name: 'Go (Golang)', type: 'Skill', category: 'Backend', level: 'Intermediate', description: 'Concurrent, high performance compiled backend code' },
  { id: 'postgresql', name: 'PostgreSQL', type: 'Skill', category: 'Database', level: 'Intermediate', description: 'ACID compliant relational database, indexing, JSONB', requires: ['sql'] },
  { id: 'sql', name: 'SQL Querying & Data Modeling', type: 'Skill', category: 'Database', level: 'Beginner', description: 'Joins, aggregations, schema normalization' },
  { id: 'mongodb', name: 'MongoDB', type: 'Skill', category: 'Database', level: 'Intermediate', description: 'NoSQL document database, aggregation pipelines', requires: ['javascript'] },
  { id: 'redis', name: 'Redis', type: 'Skill', category: 'Database', level: 'Intermediate', description: 'In-memory cache, pub/sub, rate limiting', requires: ['sql'] },
  { id: 'neo4j', name: 'Neo4j & Cypher', type: 'Skill', category: 'Database', level: 'Advanced', description: 'Graph database traversals, shortest path, pattern matching', requires: ['sql'] },
  { id: 'docker', name: 'Docker & Containers', type: 'Skill', category: 'DevOps & Cloud', level: 'Intermediate', description: 'Containerization, Dockerfiles, multi-stage builds', requires: ['linux-cli'] },
  { id: 'kubernetes', name: 'Kubernetes (K8s)', type: 'Skill', category: 'DevOps & Cloud', level: 'Advanced', description: 'Container orchestration, pods, deployments, ingress', requires: ['docker'] },
  { id: 'linux-cli', name: 'Linux & Shell Scripting', type: 'Skill', category: 'DevOps & Cloud', level: 'Beginner', description: 'Command line operations, bash scripting, file permissions' },
  { id: 'aws', name: 'AWS Cloud Services', type: 'Skill', category: 'DevOps & Cloud', level: 'Intermediate', description: 'EC2, S3, Lambda, IAM, CloudFront', requires: ['linux-cli'] },
  { id: 'langchain', name: 'LangChain & RAG Architecture', type: 'Skill', category: 'AI & ML', level: 'Advanced', description: 'LLM orchestration, Retrieval-Augmented Generation, vector stores', requires: ['python-lang', 'vector-db'] },
  { id: 'vector-db', name: 'Vector DBs (Pinecone/Chroma)', type: 'Skill', category: 'Database', level: 'Advanced', description: 'Embeddings storage, similarity search, HNSW indexing', requires: ['neo4j'] },
  { id: 'machine-learning', name: 'Machine Learning Fundamentals', type: 'Skill', category: 'AI & ML', level: 'Intermediate', description: 'Supervised, unsupervised learning, evaluation metrics', requires: ['python-lang'] }
];

export const FALLBACK_ROLES: RoleNode[] = [
  {
    id: 'role-fullstack',
    name: 'Full Stack Engineer',
    type: 'Role',
    description: 'Build end-to-end web applications across frontend React, backend Node.js/Express, and databases.',
    requiredSkills: ['react', 'typescript', 'nodejs', 'express', 'postgresql', 'mongodb'],
    averageSalary: '$125,000 / yr',
    demandLevel: 'Very High'
  },
  {
    id: 'role-frontend-lead',
    name: 'Senior Frontend Architect',
    type: 'Role',
    description: 'Architect scalable web UIs, state management, design systems, and web performance.',
    requiredSkills: ['react', 'nextjs', 'typescript', 'tailwindcss', 'state-mgmt', 'web-perf'],
    averageSalary: '$145,000 / yr',
    demandLevel: 'High'
  },
  {
    id: 'role-ai-engineer',
    name: 'AI & LLM Systems Engineer',
    type: 'Role',
    description: 'Build GenAI apps, RAG pipelines, agentic workflows, and vector store integration.',
    requiredSkills: ['python-lang', 'fastapi', 'vector-db', 'langchain', 'machine-learning', 'postgresql'],
    averageSalary: '$160,000 / yr',
    demandLevel: 'Very High'
  },
  {
    id: 'role-devops',
    name: 'DevOps & Cloud Platform Engineer',
    type: 'Role',
    description: 'Manage cloud infrastructure, CI/CD pipelines, Docker containers, and Kubernetes clusters.',
    requiredSkills: ['linux-cli', 'docker', 'kubernetes', 'aws', 'golang', 'postgresql'],
    averageSalary: '$140,000 / yr',
    demandLevel: 'High'
  }
];

export const FALLBACK_PROJECTS: ProjectNode[] = [
  {
    id: 'proj-skillgraph',
    name: 'SkillGraph AI Platform',
    type: 'Project',
    description: 'Graph-based learning path recommendation engine powered by CognoDB Cloud.',
    difficulty: 'Advanced',
    estimatedHours: 40,
    skillsLearned: ['react', 'typescript', 'nodejs', 'express', 'neo4j'],
    techStack: ['tech-react', 'tech-ts', 'tech-neo4j'],
    prerequisites: ['javascript', 'sql']
  },
  {
    id: 'proj-ai-rag',
    name: 'Enterprise Knowledge RAG Agent',
    type: 'Project',
    description: 'Vector embeddings document search system with Python, FastAPI, and Pinecone.',
    difficulty: 'Advanced',
    estimatedHours: 35,
    skillsLearned: ['langchain', 'vector-db', 'fastapi', 'python-lang'],
    techStack: ['tech-python', 'tech-fastapi'],
    prerequisites: ['python-lang']
  },
  {
    id: 'proj-kanban-saas',
    name: 'Real-Time SaaS Task Management',
    type: 'Project',
    description: 'Multi-tenant Kanban board app with React, Next.js, Tailwind CSS, and WebSockets.',
    difficulty: 'Intermediate',
    estimatedHours: 25,
    skillsLearned: ['react', 'nextjs', 'tailwindcss', 'state-mgmt'],
    techStack: ['tech-react', 'tech-nextjs'],
    prerequisites: ['javascript']
  }
];

export const FALLBACK_RESOURCES: ResourceNode[] = [
  {
    id: 'res-neo4j-academy',
    name: 'Official CognoDB openCypher Graph Fundamentals',
    type: 'LearningResource',
    url: 'https://neo4j.com/graphacademy/',
    typeFormat: 'Interactive',
    rating: 4.9,
    duration: '4 hours',
    teachesSkillId: 'neo4j'
  },
  {
    id: 'res-react-docs',
    name: 'React 18 Official Interactive Tutorial',
    type: 'LearningResource',
    url: 'https://react.dev/learn',
    typeFormat: 'Documentation',
    rating: 4.9,
    duration: '6 hours',
    teachesSkillId: 'react'
  },
  {
    id: 'res-ts-handbook',
    name: 'TypeScript Handbook & Type System Masterclass',
    type: 'LearningResource',
    url: 'https://www.typescriptlang.org/docs/',
    typeFormat: 'Documentation',
    rating: 4.8,
    duration: '5 hours',
    teachesSkillId: 'typescript'
  }
];

export function buildFallbackGraph(knownSkillIds: string[] = []): CompleteGraphData {
  const knownSet = new Set(knownSkillIds);
  const nodes: any[] = [];
  const edges: any[] = [];

  FALLBACK_SKILLS.forEach(s => {
    nodes.push({
      id: s.id,
      name: s.name,
      type: 'Skill',
      category: s.category,
      level: s.level,
      isKnown: knownSet.has(s.id),
      description: s.description
    });

    (s.requires || []).forEach(reqId => {
      edges.push({
        id: `edge-req-${s.id}-${reqId}`,
        source: s.id,
        target: reqId,
        type: 'REQUIRES',
        label: 'REQUIRES'
      });
    });
  });

  FALLBACK_ROLES.forEach(r => {
    nodes.push({
      id: r.id,
      name: r.name,
      type: 'Role',
      demandLevel: r.demandLevel,
      averageSalary: r.averageSalary,
      description: r.description
    });
    r.requiredSkills.forEach(skId => {
      edges.push({
        id: `edge-role-${r.id}-${skId}`,
        source: r.id,
        target: skId,
        type: 'REQUIRES',
        label: 'REQUIRES'
      });
    });
  });

  return { nodes, edges };
}

export function buildFallbackRecommendations(knownSkillIds: string[] = [], targetRoleId: string = 'role-fullstack'): RecommendationResponse {
  const knownSet = new Set(knownSkillIds);
  const role = FALLBACK_ROLES.find(r => r.id === targetRoleId) || FALLBACK_ROLES[0];
  const required = role.requiredSkills;

  const matchedSkills = FALLBACK_SKILLS.filter(s => required.includes(s.id) && knownSet.has(s.id));
  const missingSkills = FALLBACK_SKILLS.filter(s => required.includes(s.id) && !knownSet.has(s.id));

  const score = required.length > 0 ? Math.round((matchedSkills.length / required.length) * 100) : 0;

  const roleMatches: RoleMatch[] = FALLBACK_ROLES.map(r => {
    const rMatched = r.requiredSkills.filter(id => knownSet.has(id));
    const rMissing = r.requiredSkills.filter(id => !knownSet.has(id));
    const mPct = r.requiredSkills.length > 0 ? Math.round((rMatched.length / r.requiredSkills.length) * 100) : 0;
    return {
      role: r,
      requiredSkillIds: r.requiredSkills,
      matchPercentage: mPct,
      matchedSkillIds: rMatched,
      missingSkillIds: rMissing
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  const recommendedProjects = FALLBACK_PROJECTS.map(p => {
    const missingReqs = p.prerequisites.filter(id => !knownSet.has(id));
    const isQuickWin = missingReqs.length <= 1;
    return {
      project: p,
      skillsLearned: p.skillsLearned,
      techStack: p.techStack,
      missingReqs,
      requiresOnlyOneMissingSkill: isQuickWin
    };
  });

  const singleMissingSkillProjects = recommendedProjects.filter(p => p.requiresOnlyOneMissingSkill);

  const learningResources = FALLBACK_RESOURCES.map(r => ({
    resource: r,
    taughtSkill: FALLBACK_SKILLS.find(s => s.id === r.teachesSkillId)
  }));

  const missingSkillObjects = missingSkills.map(sk => ({
    skill: sk,
    prerequisites: (sk.requires || []).map(id => FALLBACK_SKILLS.find(s => s.id === id)).filter((s): s is SkillNode => s !== undefined)
  }));

  return {
    knownSkillCount: knownSkillIds.length,
    targetRole: role,
    readinessScore: score,
    roleMatches,
    missingSkills: missingSkillObjects,
    recommendedProjects,
    singleMissingSkillProjects,
    learningResources
  };
}

export function buildFallbackRoadmap(knownSkillIds: string[] = [], targetRoleId: string = 'role-fullstack'): RoadmapResponse {
  const recs = buildFallbackRecommendations(knownSkillIds, targetRoleId);
  const steps: RoadmapStep[] = recs.missingSkills.map((item, idx) => ({
    step: idx + 1,
    skill: item.skill,
    prerequisites: item.prerequisites,
    recommendedProject: FALLBACK_PROJECTS.find(p => p.skillsLearned.includes(item.skill.id)),
    resource: FALLBACK_RESOURCES.find(r => r.teachesSkillId === item.skill.id),
    estimatedWeeks: item.skill.level === 'Beginner' ? 1 : item.skill.level === 'Intermediate' ? 2 : 3
  }));

  return {
    targetRole: recs.targetRole,
    readinessScore: recs.readinessScore,
    totalEstimatedWeeks: steps.reduce((acc, curr) => acc + curr.estimatedWeeks, 0),
    steps
  };
}
