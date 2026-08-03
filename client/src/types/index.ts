export type NodeType = 'Skill' | 'Technology' | 'Framework' | 'Project' | 'Role' | 'LearningResource';

export interface SkillNode {
  id: string;
  name: string;
  type: 'Skill';
  category: 'Frontend' | 'Backend' | 'AI & ML' | 'DevOps & Cloud' | 'Data Engineering' | 'Database' | 'Architecture' | 'General';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
}

export interface TechnologyNode {
  id: string;
  name: string;
  type: 'Technology';
  category: string;
  description: string;
}

export interface RoleNode {
  id: string;
  name: string;
  type: 'Role';
  description: string;
  requiredSkills: string[];
  averageSalary?: string;
  demandLevel?: 'High' | 'Very High' | 'Moderate';
}

export interface ProjectNode {
  id: string;
  name: string;
  type: 'Project';
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  skillsLearned: string[];
  techStack: string[];
  prerequisites: string[];
}

export interface ResourceNode {
  id: string;
  name: string;
  type: 'LearningResource';
  url: string;
  typeFormat: 'Course' | 'Documentation' | 'Video' | 'Book' | 'Interactive';
  rating: number;
  duration: string;
  teachesSkillId: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: 'RELATED_TO' | 'REQUIRES' | 'USES' | 'BUILDS' | 'TEACHES';
  label?: string;
}

export interface CompleteGraphData {
  nodes: (SkillNode | TechnologyNode | RoleNode | ProjectNode | ResourceNode | any)[];
  edges: GraphEdge[];
}

export interface RoleMatch {
  role: RoleNode;
  requiredSkillIds: string[];
  matchedSkillIds: string[];
  missingSkillIds: string[];
  matchPercentage: number;
}

export interface RecommendationResponse {
  knownSkillCount: number;
  targetRole: RoleNode | null;
  readinessScore: number;
  roleMatches: RoleMatch[];
  missingSkills: {
    skill: SkillNode;
    prerequisites: SkillNode[];
  }[];
  recommendedProjects: {
    project: ProjectNode;
    skillsLearned: string[];
    techStack: string[];
    missingReqs: string[];
    requiresOnlyOneMissingSkill: boolean;
  }[];
  singleMissingSkillProjects: {
    project: ProjectNode;
    skillsLearned: string[];
    techStack: string[];
    missingReqs: string[];
  }[];
  learningResources: {
    resource: ResourceNode;
    taughtSkill?: SkillNode;
  }[];
}

export interface RoadmapStep {
  step: number;
  skill: SkillNode;
  prerequisites: SkillNode[];
  recommendedProject?: ProjectNode;
  resource?: ResourceNode;
  estimatedWeeks: number;
}

export interface RoadmapResponse {
  targetRole: RoleNode | null;
  readinessScore: number;
  totalEstimatedWeeks: number;
  steps: RoadmapStep[];
}
