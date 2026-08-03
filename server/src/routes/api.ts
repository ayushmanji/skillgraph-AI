import { Router } from 'express';
import { GraphController } from '../controllers/graphController';

const router = Router();

// Health Check
router.get('/health', GraphController.getHealth);

// Entity Catalogs
router.get('/skills', GraphController.getSkills);
router.get('/roles', GraphController.getRoles);
router.get('/projects', GraphController.getProjects);
router.get('/graph', GraphController.getGraph);

// Graph Recommendation Operations
router.post('/recommend', GraphController.getRecommendations);
router.post('/roadmap', GraphController.getRoadmap);
router.post('/shortest-path', GraphController.getShortestPath);
router.post('/related', GraphController.getRelatedTechnologies);
router.post('/hops', GraphController.getSkillsWithinHops);
router.post('/resources', GraphController.getResources);

export default router;
