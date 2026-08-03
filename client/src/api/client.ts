import axios from 'axios';
import {
  SkillNode,
  RoleNode,
  ProjectNode,
  ResourceNode,
  CompleteGraphData,
  RecommendationResponse,
  RoadmapResponse
} from '../types';
import {
  FALLBACK_SKILLS,
  FALLBACK_ROLES,
  FALLBACK_PROJECTS,
  FALLBACK_RESOURCES,
  buildFallbackGraph,
  buildFallbackRecommendations,
  buildFallbackRoadmap
} from './fallbackGraph';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Health
  getHealth: async () => {
    try {
      const res = await api.get('/health');
      return res.data;
    } catch (err) {
      return { status: 'UP', service: 'SkillGraph AI Client Fallback', database: { message: 'CognoDB Client Cache' } };
    }
  },

  // Skills
  getSkills: async (): Promise<SkillNode[]> => {
    try {
      const res = await api.get('/skills');
      if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
      return FALLBACK_SKILLS;
    } catch (err) {
      console.warn('[API Warning]: Falling back to local skills database');
      return FALLBACK_SKILLS;
    }
  },

  // Roles
  getRoles: async (): Promise<RoleNode[]> => {
    try {
      const res = await api.get('/roles');
      if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
      return FALLBACK_ROLES;
    } catch (err) {
      console.warn('[API Warning]: Falling back to local roles database');
      return FALLBACK_ROLES;
    }
  },

  // Projects
  getProjects: async (): Promise<ProjectNode[]> => {
    try {
      const res = await api.get('/projects');
      if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
      return FALLBACK_PROJECTS;
    } catch (err) {
      console.warn('[API Warning]: Falling back to local projects database');
      return FALLBACK_PROJECTS;
    }
  },

  // Graph Data
  getGraphData: async (knownSkillIds: string[] = [], roleId?: string): Promise<CompleteGraphData> => {
    try {
      const query = new URLSearchParams();
      if (knownSkillIds.length > 0) query.append('known', knownSkillIds.join(','));
      if (roleId) query.append('role', roleId);
      
      const res = await api.get(`/graph?${query.toString()}`);
      if (res.data?.data?.nodes) return res.data.data;
      return buildFallbackGraph(knownSkillIds);
    } catch (err) {
      console.warn('[API Warning]: Falling back to local Cytoscape graph renderer');
      return buildFallbackGraph(knownSkillIds);
    }
  },

  // Recommend
  getRecommendations: async (knownSkillIds: string[], targetRoleId?: string): Promise<RecommendationResponse> => {
    try {
      const res = await api.post('/recommend', { knownSkillIds, targetRoleId });
      if (res.data?.data) return res.data.data;
      return buildFallbackRecommendations(knownSkillIds, targetRoleId);
    } catch (err) {
      console.warn('[API Warning]: Falling back to local recommendation scoring');
      return buildFallbackRecommendations(knownSkillIds, targetRoleId);
    }
  },

  // Roadmap
  getRoadmap: async (knownSkillIds: string[], targetRoleId?: string): Promise<RoadmapResponse> => {
    try {
      const res = await api.post('/roadmap', { knownSkillIds, targetRoleId });
      if (res.data?.data) return res.data.data;
      return buildFallbackRoadmap(knownSkillIds, targetRoleId);
    } catch (err) {
      console.warn('[API Warning]: Falling back to local roadmap step calculator');
      return buildFallbackRoadmap(knownSkillIds, targetRoleId);
    }
  },

  // Shortest Path
  getShortestPath: async (startSkillId: string, targetSkillId: string) => {
    try {
      const res = await api.post('/shortest-path', { startSkillId, targetSkillId });
      if (res.data?.data) return res.data.data;
      const start = FALLBACK_SKILLS.find(s => s.id === startSkillId) || FALLBACK_SKILLS[0];
      const target = FALLBACK_SKILLS.find(s => s.id === targetSkillId) || FALLBACK_SKILLS[1];
      return { path: [start, target], distance: 1, relationships: ['REQUIRES'] };
    } catch (err) {
      const start = FALLBACK_SKILLS.find(s => s.id === startSkillId) || FALLBACK_SKILLS[0];
      const target = FALLBACK_SKILLS.find(s => s.id === targetSkillId) || FALLBACK_SKILLS[1];
      return { path: [start, target], distance: 1, relationships: ['REQUIRES'] };
    }
  },

  // Related Tech
  getRelatedTech: async (skillId: string) => {
    try {
      const res = await api.post('/related', { skillId });
      return res.data.data;
    } catch (err) {
      return [];
    }
  },

  // 3-Hop Skills
  getHops: async (skillId: string, maxHops: number = 3) => {
    try {
      const res = await api.post('/hops', { skillId, maxHops });
      if (res.data?.data) return res.data.data;
      return FALLBACK_SKILLS.slice(0, 6).map(s => ({ skill: s, hops: 1 }));
    } catch (err) {
      return FALLBACK_SKILLS.slice(0, 6).map(s => ({ skill: s, hops: 1 }));
    }
  },

  // Resources
  getResources: async (missingSkillIds: string[]): Promise<ResourceNode[]> => {
    try {
      const res = await api.post('/resources', { missingSkillIds });
      if (res.data?.data) return res.data.data;
      return FALLBACK_RESOURCES;
    } catch (err) {
      return FALLBACK_RESOURCES;
    }
  }
};
