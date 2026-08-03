import { runCypherQuery, isLiveDbConnected } from '../db/neo4j';
import { CYPHER_QUERIES } from '../utils/cypherQueries';
import { SKILLS, TECHNOLOGIES, FRAMEWORKS, ROLES, PROJECTS, RESOURCES } from '../db/seedData';
import { SkillNode, RoleNode, ProjectNode, ResourceNode, CompleteGraphData, GraphEdge } from '../types';

export class GraphService {
  /**
   * Get all skills sorted by category & level
   */
  static async getSkills(): Promise<SkillNode[]> {
    if (isLiveDbConnected()) {
      try {
        const records = await runCypherQuery(`
          MATCH (s:Skill)
          RETURN s
          ORDER BY s.category ASC, s.level ASC, s.name ASC
        `);
        if (records.length > 0) {
          return records.map(r => r.s.properties as SkillNode);
        }
      } catch (err) {
        console.warn('Live Cypher failed, using fallback:', err);
      }
    }
    // Fallback seed return
    return SKILLS.map(s => ({
      ...s,
      type: 'Skill' as const
    }));
  }

  /**
   * Get all career roles with required skill details
   */
  static async getRoles(): Promise<RoleNode[]> {
    if (isLiveDbConnected()) {
      try {
        const records = await runCypherQuery(`
          MATCH (r:Role)
          OPTIONAL MATCH (r)-[:REQUIRES]->(s:Skill)
          RETURN r, collect(DISTINCT s.id) AS requiredSkills
          ORDER BY r.name ASC
        `);
        if (records.length > 0) {
          return records.map(rec => ({
            ...(rec.r.properties as any),
            type: 'Role' as const,
            requiredSkills: rec.requiredSkills || []
          }));
        }
      } catch (err) {
        console.warn('Live Cypher failed, using fallback:', err);
      }
    }
    return ROLES.map(r => ({
      id: r.id,
      name: r.name,
      type: 'Role' as const,
      description: r.description,
      requiredSkills: r.requiredSkillIds,
      averageSalary: r.averageSalary,
      demandLevel: r.demandLevel
    }));
  }

  /**
   * Get all projects
   */
  static async getProjects(): Promise<ProjectNode[]> {
    if (isLiveDbConnected()) {
      try {
        const records = await runCypherQuery(`
          MATCH (p:Project)
          OPTIONAL MATCH (p)-[:BUILDS]->(s:Skill)
          OPTIONAL MATCH (p)-[:USES]->(t:Technology)
          OPTIONAL MATCH (p)-[:REQUIRES_SKILL]->(req:Skill)
          RETURN p, collect(DISTINCT s.id) AS skillsLearned, collect(DISTINCT t.id) AS techStack, collect(DISTINCT req.id) AS prerequisites
          ORDER BY p.difficulty ASC, p.name ASC
        `);
        if (records.length > 0) {
          return records.map(rec => ({
            ...(rec.p.properties as any),
            type: 'Project' as const,
            skillsLearned: rec.skillsLearned || [],
            techStack: rec.techStack || [],
            prerequisites: rec.prerequisites || []
          }));
        }
      } catch (err) {
        console.warn('Live Cypher failed, using fallback:', err);
      }
    }
    return PROJECTS.map(p => ({
      id: p.id,
      name: p.name,
      type: 'Project' as const,
      description: p.description,
      difficulty: p.difficulty,
      estimatedHours: p.estimatedHours,
      skillsLearned: p.buildsSkillIds,
      techStack: p.usesTechIds,
      prerequisites: p.prerequisiteSkillIds
    }));
  }

  /**
   * Recommendation Engine - Combines Query 1, 2, 7 & 8
   */
  static async getRecommendations(knownSkillIds: string[], targetRoleId?: string) {
    const allSkills = await this.getSkills();
    const allRoles = await this.getRoles();
    const allProjects = await this.getProjects();

    const knownSet = new Set(knownSkillIds);

    // 1. Role Match % calculation (Query 7)
    const roleMatches = allRoles.map(role => {
      const required = role.requiredSkills || [];
      const matched = required.filter(id => knownSet.has(id));
      const missing = required.filter(id => !knownSet.has(id));
      const matchPercentage = required.length > 0
        ? Math.round((matched.length / required.length) * 100)
        : 0;

      return {
        role,
        requiredSkillIds: required,
        matchedSkillIds: matched,
        missingSkillIds: missing,
        matchPercentage
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);

    // Selected Target Role or Best Match Role
    const targetRoleMatch = targetRoleId
      ? roleMatches.find(r => r.role.id === targetRoleId) || roleMatches[0]
      : roleMatches[0];

    const missingSkillIdsForTarget = targetRoleMatch ? targetRoleMatch.missingSkillIds : [];

    // Missing Skill Details with Prerequisites (Query 1)
    const missingSkills = allSkills
      .filter(s => missingSkillIdsForTarget.includes(s.id))
      .map(s => {
        const rawSkill = SKILLS.find(raw => raw.id === s.id);
        const prereqs = (rawSkill?.requires || [])
          .map(reqId => allSkills.find(sk => sk.id === reqId))
          .filter((sk): sk is SkillNode => sk !== undefined);
        return {
          skill: s,
          prerequisites: prereqs
        };
      });

    // 2. Recommend Projects (Query 2)
    const recommendedProjects = allProjects.map(project => {
      const missingReqs = project.prerequisites.filter(reqId => !knownSet.has(reqId));
      return {
        project,
        skillsLearned: project.skillsLearned,
        techStack: project.techStack,
        missingReqs,
        requiresOnlyOneMissingSkill: missingReqs.length === 1
      };
    }).sort((a, b) => a.missingReqs.length - b.missingReqs.length);

    // Projects requiring ONLY 1 missing skill (Query 8)
    const singleMissingSkillProjects = recommendedProjects.filter(p => p.requiresOnlyOneMissingSkill);

    // 3. Recommended Learning Resources (Query 6)
    const learningResources = RESOURCES
      .filter(r => missingSkillIdsForTarget.includes(r.teachesSkillId))
      .map(r => ({
        resource: r,
        taughtSkill: allSkills.find(s => s.id === r.teachesSkillId)
      }))
      .sort((a, b) => b.resource.rating - a.resource.rating);

    // Calculate overall Career Readiness Score (0 - 100)
    const readinessScore = targetRoleMatch ? targetRoleMatch.matchPercentage : 0;

    return {
      knownSkillCount: knownSkillIds.length,
      targetRole: targetRoleMatch ? targetRoleMatch.role : null,
      readinessScore,
      roleMatches,
      missingSkills,
      recommendedProjects,
      singleMissingSkillProjects,
      learningResources
    };
  }

  /**
   * Generate Step-by-Step Learning Roadmap
   */
  static async generateRoadmap(knownSkillIds: string[], targetRoleId?: string) {
    const recs = await this.getRecommendations(knownSkillIds, targetRoleId);
    const knownSet = new Set(knownSkillIds);
    const missing = recs.missingSkills.map(m => m.skill);

    // Order missing skills by prerequisite dependencies
    const roadmapSteps: {
      step: number;
      skill: SkillNode;
      prerequisites: SkillNode[];
      recommendedProject?: ProjectNode;
      resource?: any;
      estimatedWeeks: number;
    }[] = [];

    const processed = new Set(knownSkillIds);
    let stepNumber = 1;

    // Iterative dependency resolution for roadmap ordering
    let remaining = [...missing];
    let iterations = 0;

    while (remaining.length > 0 && iterations < 10) {
      iterations++;
      const nextBatch: SkillNode[] = [];
      const leftover: SkillNode[] = [];

      for (const skill of remaining) {
        const raw = SKILLS.find(s => s.id === skill.id);
        const prereqs = raw?.requires || [];
        const unfulfilledPrereqs = prereqs.filter(p => !processed.has(p));

        if (unfulfilledPrereqs.length === 0) {
          nextBatch.push(skill);
        } else {
          leftover.push(skill);
        }
      }

      // If circular dependency or no prereq resolved, force taking first
      if (nextBatch.length === 0 && leftover.length > 0) {
        nextBatch.push(leftover.shift()!);
      }

      for (const sk of nextBatch) {
        processed.add(sk.id);
        const raw = SKILLS.find(s => s.id === sk.id);
        const prereqs: SkillNode[] = (raw?.requires || [])
          .map(id => SKILLS.find(s => s.id === id))
          .filter((s): s is NonNullable<typeof s> => s !== undefined)
          .map(s => ({ ...s, type: 'Skill' as const }));

        const project = recs.recommendedProjects.find(p => p.project.skillsLearned.includes(sk.id))?.project;
        const res = RESOURCES.find(r => r.teachesSkillId === sk.id);

        roadmapSteps.push({
          step: stepNumber++,
          skill: sk,
          prerequisites: prereqs,
          recommendedProject: project,
          resource: res ? { ...res, type: 'LearningResource' as const } : undefined,
          estimatedWeeks: sk.level === 'Beginner' ? 1 : sk.level === 'Intermediate' ? 2 : 3
        });
      }

      remaining = leftover;
    }

    return {
      targetRole: recs.targetRole,
      readinessScore: recs.readinessScore,
      totalEstimatedWeeks: roadmapSteps.reduce((acc, curr) => acc + curr.estimatedWeeks, 0),
      steps: roadmapSteps
    };
  }

  /**
   * Find Shortest Learning Path (Query 3)
   */
  static async findShortestPath(startSkillId: string, targetSkillId: string) {
    const allSkills = await this.getSkills();

    // Check if both skills exist
    const startSkill = allSkills.find(s => s.id === startSkillId);
    const targetSkill = allSkills.find(s => s.id === targetSkillId);

    if (!startSkill || !targetSkill) {
      throw new Error('Start skill or Target skill not found in graph database');
    }

    if (startSkillId === targetSkillId) {
      return {
        path: [startSkill],
        distance: 0,
        relationships: []
      };
    }

    // Graph BFS to compute shortest path between skills
    const queue: { currentId: string; path: string[]; rels: string[] }[] = [
      { currentId: startSkillId, path: [startSkillId], rels: [] }
    ];
    const visited = new Set<string>([startSkillId]);

    while (queue.length > 0) {
      const { currentId, path, rels } = queue.shift()!;

      if (currentId === targetSkillId) {
        const pathNodes = path
          .map(id => allSkills.find(s => s.id === id))
          .filter((s): s is SkillNode => s !== undefined);

        return {
          path: pathNodes,
          distance: path.length - 1,
          relationships: rels
        };
      }

      // Find outgoing REQUIRES or RELATED_TO edges
      const currSkillRaw = SKILLS.find(s => s.id === currentId);
      if (currSkillRaw) {
        const neighbors: { id: string; rel: 'REQUIRES' | 'RELATED_TO' }[] = [];
        (currSkillRaw.requires || []).forEach(reqId => neighbors.push({ id: reqId, rel: 'REQUIRES' }));
        (currSkillRaw.relatedTo || []).forEach(relId => neighbors.push({ id: relId, rel: 'RELATED_TO' }));
        
        // Reverse requirements (Skills that require currentId)
        SKILLS.forEach(other => {
          if (other.requires?.includes(currentId)) {
            neighbors.push({ id: other.id, rel: 'REQUIRES' });
          }
          if (other.relatedTo?.includes(currentId)) {
            neighbors.push({ id: other.id, rel: 'RELATED_TO' });
          }
        });

        for (const n of neighbors) {
          if (!visited.has(n.id)) {
            visited.add(n.id);
            queue.push({
              currentId: n.id,
              path: [...path, n.id],
              rels: [...rels, n.rel]
            });
          }
        }
      }
    }

    return {
      path: [startSkill, targetSkill],
      distance: 1,
      relationships: ['RELATED_TO']
    };
  }

  /**
   * Find Related Technologies (Query 4)
   */
  static async getRelatedTechnologies(skillId: string) {
    const skill = SKILLS.find(s => s.id === skillId);
    if (!skill) return [];

    // Tech used in projects building this skill
    const projectTechs = PROJECTS
      .filter(p => p.buildsSkillIds.includes(skillId))
      .flatMap(p => p.usesTechIds);

    // Frameworks linked to skill category
    const frameworkTechs = FRAMEWORKS.map(f => f.usesTechId);

    const relatedTechIds = Array.from(new Set([...projectTechs, ...frameworkTechs]));
    return TECHNOLOGIES.filter(t => relatedTechIds.includes(t.id));
  }

  /**
   * Find Skills within N Hops (Query 5)
   */
  static async getSkillsWithinHops(skillId: string, maxHops: number = 3) {
    const allSkills = await this.getSkills();
    const root = allSkills.find(s => s.id === skillId);
    if (!root) return [];

    const hopMap = new Map<string, number>();
    const queue: { id: string; hop: number }[] = [{ id: skillId, hop: 0 }];
    hopMap.set(skillId, 0);

    while (queue.length > 0) {
      const { id, hop } = queue.shift()!;
      if (hop >= maxHops) continue;

      const raw = SKILLS.find(s => s.id === id);
      if (raw) {
        const neighbors = [
          ...(raw.requires || []),
          ...(raw.relatedTo || [])
        ];
        SKILLS.forEach(other => {
          if (other.requires?.includes(id) || other.relatedTo?.includes(id)) {
            neighbors.push(other.id);
          }
        });

        for (const neighborId of neighbors) {
          if (!hopMap.has(neighborId)) {
            hopMap.set(neighborId, hop + 1);
            queue.push({ id: neighborId, hop: hop + 1 });
          }
        }
      }
    }

    const results: { skill: SkillNode; hops: number }[] = [];
    hopMap.forEach((hops, id) => {
      if (id !== skillId) {
        const sk = allSkills.find(s => s.id === id);
        if (sk) {
          results.push({ skill: sk, hops });
        }
      }
    });

    return results.sort((a, b) => a.hops - b.hops);
  }

  /**
   * Recommend Resources (Query 6)
   */
  static async getRecommendedResources(missingSkillIds: string[]): Promise<ResourceNode[]> {
    const set = new Set(missingSkillIds);
    return RESOURCES
      .filter(r => set.has(r.teachesSkillId))
      .map(r => ({ ...r, type: 'LearningResource' as const }))
      .sort((a, b) => b.rating - a.rating);
  }

  /**
   * Complete Cytoscape.js Graph Data Generator
   */
  static async getCompleteGraph(knownSkillIds: string[] = [], targetRoleId?: string): Promise<CompleteGraphData> {
    const nodes: any[] = [];
    const edges: GraphEdge[] = [];
    const knownSet = new Set(knownSkillIds);

    // 1. Add Skill Nodes
    SKILLS.forEach(s => {
      nodes.push({
        id: s.id,
        name: s.name,
        type: 'Skill',
        category: s.category,
        level: s.level,
        isKnown: knownSet.has(s.id),
        description: s.description
      });

      // Relationships between skills
      (s.requires || []).forEach(reqId => {
        edges.push({
          id: `edge-req-${s.id}-${reqId}`,
          source: s.id,
          target: reqId,
          type: 'REQUIRES',
          label: 'REQUIRES'
        });
      });

      (s.relatedTo || []).forEach(relId => {
        edges.push({
          id: `edge-rel-${s.id}-${relId}`,
          source: s.id,
          target: relId,
          type: 'RELATED_TO',
          label: 'RELATED_TO'
        });
      });
    });

    // 2. Add Role Nodes & Edges
    ROLES.forEach(r => {
      nodes.push({
        id: r.id,
        name: r.name,
        type: 'Role',
        demandLevel: r.demandLevel,
        averageSalary: r.averageSalary,
        description: r.description
      });

      r.requiredSkillIds.forEach(skId => {
        edges.push({
          id: `edge-role-${r.id}-${skId}`,
          source: r.id,
          target: skId,
          type: 'REQUIRES',
          label: 'REQUIRES'
        });
      });
    });

    // 3. Add Project Nodes & Edges
    PROJECTS.forEach(p => {
      nodes.push({
        id: p.id,
        name: p.name,
        type: 'Project',
        difficulty: p.difficulty,
        estimatedHours: p.estimatedHours,
        description: p.description
      });

      p.buildsSkillIds.forEach(skId => {
        edges.push({
          id: `edge-proj-builds-${p.id}-${skId}`,
          source: p.id,
          target: skId,
          type: 'BUILDS',
          label: 'BUILDS'
        });
      });

      p.usesTechIds.forEach(tId => {
        edges.push({
          id: `edge-proj-uses-${p.id}-${tId}`,
          source: p.id,
          target: tId,
          type: 'USES',
          label: 'USES'
        });
      });
    });

    // 4. Add Technology Nodes
    TECHNOLOGIES.forEach(t => {
      nodes.push({
        id: t.id,
        name: t.name,
        type: 'Technology',
        category: t.category,
        description: t.description
      });
    });

    // 5. Add Framework Nodes & Edges
    FRAMEWORKS.forEach(f => {
      nodes.push({
        id: f.id,
        name: f.name,
        type: 'Framework',
        ecosystem: f.ecosystem,
        description: f.description
      });

      edges.push({
        id: `edge-fw-uses-${f.id}-${f.usesTechId}`,
        source: f.id,
        target: f.usesTechId,
        type: 'USES',
        label: 'USES'
      });
    });

    // 6. Add Resource Nodes & Edges
    RESOURCES.forEach(res => {
      nodes.push({
        id: res.id,
        name: res.name,
        type: 'LearningResource',
        typeFormat: res.typeFormat,
        rating: res.rating,
        url: res.url
      });

      edges.push({
        id: `edge-res-teaches-${res.id}-${res.teachesSkillId}`,
        source: res.id,
        target: res.teachesSkillId,
        type: 'TEACHES',
        label: 'TEACHES'
      });
    });

    return { nodes, edges };
  }
}
