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

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Health
  getHealth: async () => {
    const res = await api.get('/health');
    return res.data;
  },

  // Skills
  getSkills: async (): Promise<SkillNode[]> => {
    const res = await api.get('/skills');
    return res.data.data;
  },

  // Roles
  getRoles: async (): Promise<RoleNode[]> => {
    const res = await api.get('/roles');
    return res.data.data;
  },

  // Projects
  getProjects: async (): Promise<ProjectNode[]> => {
    const res = await api.get('/projects');
    return res.data.data;
  },

  // Graph Data
  getGraphData: async (knownSkillIds: string[] = [], roleId?: string): Promise<CompleteGraphData> => {
    const query = new URLSearchParams();
    if (knownSkillIds.length > 0) query.append('known', knownSkillIds.join(','));
    if (roleId) query.append('role', roleId);
    
    const res = await api.get(`/graph?${query.toString()}`);
    return res.data.data;
  },

  // Recommend
  getRecommendations: async (knownSkillIds: string[], targetRoleId?: string): Promise<RecommendationResponse> => {
    const res = await api.post('/recommend', { knownSkillIds, targetRoleId });
    return res.data.data;
  },

  // Roadmap
  getRoadmap: async (knownSkillIds: string[], targetRoleId?: string): Promise<RoadmapResponse> => {
    const res = await api.post('/roadmap', { knownSkillIds, targetRoleId });
    return res.data.data;
  },

  // Shortest Path
  getShortestPath: async (startSkillId: string, targetSkillId: string) => {
    const res = await api.post('/shortest-path', { startSkillId, targetSkillId });
    return res.data.data;
  },

  // Related Tech
  getRelatedTech: async (skillId: string) => {
    const res = await api.post('/related', { skillId });
    return res.data.data;
  },

  // 3-Hop Skills
  getHops: async (skillId: string, maxHops: number = 3) => {
    const res = await api.post('/hops', { skillId, maxHops });
    return res.data.data;
  },

  // Resources
  getResources: async (missingSkillIds: string[]): Promise<ResourceNode[]> => {
    const res = await api.post('/resources', { missingSkillIds });
    return res.data.data;
  }
};
