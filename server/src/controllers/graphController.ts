import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { GraphService } from '../services/graphService';
import { verifyConnection } from '../db/neo4j';

// Validation Schemas
const recommendSchema = z.object({
  knownSkillIds: z.array(z.string()).default([]),
  targetRoleId: z.string().optional()
});

const shortestPathSchema = z.object({
  startSkillId: z.string().min(1, 'startSkillId is required'),
  targetSkillId: z.string().min(1, 'targetSkillId is required')
});

const relatedTechSchema = z.object({
  skillId: z.string().min(1, 'skillId is required')
});

const hopsSchema = z.object({
  skillId: z.string().min(1, 'skillId is required'),
  maxHops: z.number().min(1).max(5).default(3)
});

const resourcesSchema = z.object({
  missingSkillIds: z.array(z.string()).default([])
});

export class GraphController {
  // GET /health
  static async getHealth(req: Request, res: Response, next: NextFunction) {
    try {
      const dbStatus = await verifyConnection();
      res.json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        service: 'SkillGraph AI Backend',
        database: dbStatus
      });
    } catch (err) {
      next(err);
    }
  }

  // GET /skills
  static async getSkills(req: Request, res: Response, next: NextFunction) {
    try {
      const skills = await GraphService.getSkills();
      res.json({ success: true, count: skills.length, data: skills });
    } catch (err) {
      next(err);
    }
  }

  // GET /roles
  static async getRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await GraphService.getRoles();
      res.json({ success: true, count: roles.length, data: roles });
    } catch (err) {
      next(err);
    }
  }

  // GET /projects
  static async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await GraphService.getProjects();
      res.json({ success: true, count: projects.length, data: projects });
    } catch (err) {
      next(err);
    }
  }

  // GET /graph - Complete Cytoscape Graph Data
  static async getGraph(req: Request, res: Response, next: NextFunction) {
    try {
      const knownSkillIds = req.query.known ? String(req.query.known).split(',').filter(Boolean) : [];
      const targetRoleId = req.query.role ? String(req.query.role) : undefined;
      
      const graphData = await GraphService.getCompleteGraph(knownSkillIds, targetRoleId);
      res.json({ success: true, data: graphData });
    } catch (err) {
      next(err);
    }
  }

  // POST /recommend
  static async getRecommendations(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = recommendSchema.parse(req.body);
      const recommendations = await GraphService.getRecommendations(parsed.knownSkillIds, parsed.targetRoleId);
      res.json({ success: true, data: recommendations });
    } catch (err) {
      next(err);
    }
  }

  // POST /roadmap
  static async getRoadmap(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = recommendSchema.parse(req.body);
      const roadmap = await GraphService.generateRoadmap(parsed.knownSkillIds, parsed.targetRoleId);
      res.json({ success: true, data: roadmap });
    } catch (err) {
      next(err);
    }
  }

  // POST /shortest-path
  static async getShortestPath(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = shortestPathSchema.parse(req.body);
      const pathData = await GraphService.findShortestPath(parsed.startSkillId, parsed.targetSkillId);
      res.json({ success: true, data: pathData });
    } catch (err) {
      next(err);
    }
  }

  // POST /related
  static async getRelatedTechnologies(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = relatedTechSchema.parse(req.body);
      const technologies = await GraphService.getRelatedTechnologies(parsed.skillId);
      res.json({ success: true, count: technologies.length, data: technologies });
    } catch (err) {
      next(err);
    }
  }

  // POST /hops
  static async getSkillsWithinHops(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = hopsSchema.parse(req.body);
      const hopsData = await GraphService.getSkillsWithinHops(parsed.skillId, parsed.maxHops);
      res.json({ success: true, count: hopsData.length, data: hopsData });
    } catch (err) {
      next(err);
    }
  }

  // POST /resources
  static async getResources(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = resourcesSchema.parse(req.body);
      const resources = await GraphService.getRecommendedResources(parsed.missingSkillIds);
      res.json({ success: true, count: resources.length, data: resources });
    } catch (err) {
      next(err);
    }
  }
}
