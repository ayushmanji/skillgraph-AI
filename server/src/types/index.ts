export type NodeType = 'Skill' | 'Technology' | 'Framework' | 'Project' | 'Role' | 'LearningResource';

export type RelationshipType = 
  | 'RELATED_TO' 
  | 'REQUIRES' 
  | 'USES' 
  | 'BUILDS' 
  | 'TEACHES';

export interface BaseNode {
  id: string;
  name: string;
  category?: string;
  description?: string;
}

export interface SkillNode extends BaseNode {
  type: 'Skill';
  category: 'Frontend' | 'Backend' | 'AI & ML' | 'DevOps & Cloud' | 'Data Engineering' | 'Database' | 'Architecture' | 'General';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface TechnologyNode extends BaseNode {
  type: 'Technology';
  category: string;
}

export interface FrameworkNode extends BaseNode {
  type: 'Framework';
  ecosystem: string;
}

export interface ProjectNode extends BaseNode {
  type: 'Project';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  skillsLearned: string[];
  techStack: string[];
  prerequisites: string[];
}

export interface RoleNode extends BaseNode {
  type: 'Role';
  requiredSkills: string[];
  averageSalary?: string;
  demandLevel?: 'High' | 'Very High' | 'Moderate';
}

export interface ResourceNode extends BaseNode {
  type: 'LearningResource';
  url: string;
  typeFormat: 'Course' | 'Documentation' | 'Video' | 'Book' | 'Interactive';
  rating: number;
  duration: string;
  teachesSkillId: string;
}

export type AnyGraphNode = SkillNode | TechnologyNode | FrameworkNode | ProjectNode | RoleNode | ResourceNode;

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: RelationshipType;
  label?: string;
}

export interface CompleteGraphData {
  nodes: (BaseNode & { type: NodeType; [key: string]: any })[];
  edges: GraphEdge[];
}

export interface RecommendRequest {
  knownSkillIds: string[];
  targetRoleId?: string;
}

export interface ShortestPathRequest {
  startSkillId: string;
  targetSkillId: string;
}

export interface RoadmapRequest {
  knownSkillIds: string[];
  targetRoleId?: string;
}

export interface RelatedSkillsRequest {
  skillId: string;
  maxHops?: number;
}
