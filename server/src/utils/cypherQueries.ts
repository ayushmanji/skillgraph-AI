/**
 * Parameterized Cypher Queries for Neo4j Database
 * Strictly using parameter placeholders ($param) for safety and security.
 */

export const CYPHER_QUERIES = {
  // Query 1: Find missing skills for a selected role
  FIND_MISSING_SKILLS_FOR_ROLE: `
    MATCH (r:Role {id: $roleId})-[:REQUIRES]->(s:Skill)
    WHERE NOT s.id IN $knownSkillIds
    OPTIONAL MATCH (s)-[:REQUIRES]->(prereq:Skill)
    RETURN s AS missingSkill, collect(DISTINCT prereq) AS prerequisites
    ORDER BY s.name ASC
  `,

  // Query 2: Recommend projects based on known skills
  RECOMMEND_PROJECTS: `
    MATCH (p:Project)-[:BUILDS]->(s:Skill)
    OPTIONAL MATCH (p)-[:USES]->(t:Technology)
    OPTIONAL MATCH (p)-[:REQUIRES_SKILL]->(req:Skill)
    WITH p, collect(DISTINCT s) AS skillsLearned, collect(DISTINCT t) AS techStack, collect(DISTINCT req.id) AS reqSkillIds
    WITH p, skillsLearned, techStack, [id IN reqSkillIds WHERE NOT id IN $knownSkillIds] AS missingReqs
    RETURN p AS project, skillsLearned, techStack, missingReqs
    ORDER BY size(missingReqs) ASC, p.estimatedHours ASC
  `,

  // Query 3: Find shortest learning path from one skill to another
  FIND_SHORTEST_PATH: `
    MATCH (start:Skill {id: $startSkillId}), (target:Skill {id: $targetSkillId})
    MATCH path = shortestPath((start)-[:REQUIRES|RELATED_TO*..6]->(target))
    RETURN [node IN nodes(path) | node] AS pathNodes,
           [rel IN relationships(path) | type(rel)] AS pathRelationships
  `,

  // Query 4: Find related technologies
  FIND_RELATED_TECHNOLOGIES: `
    MATCH (s:Skill {id: $skillId})
    OPTIONAL MATCH (fw:Framework)-[:USES]->(t:Technology)
    WHERE fw.usesTechId = t.id
    OPTIONAL MATCH (p:Project)-[:BUILDS]->(s)
    OPTIONAL MATCH (p)-[:USES]->(pTech:Technology)
    WITH collect(DISTINCT pTech) AS projectTechs
    MATCH (t:Technology)
    WHERE t.id IN $techIds OR t IN projectTechs
    RETURN DISTINCT t AS technology
  `,

  // Query 5: Find all skills within 3 hops
  FIND_SKILLS_WITHIN_HOPS: `
    MATCH (s:Skill {id: $skillId})
    MATCH path = (s)-[:RELATED_TO|REQUIRES*1..3]-(connected:Skill)
    WITH connected, min(length(path)) AS hops
    RETURN connected AS skill, hops
    ORDER BY hops ASC, connected.name ASC
  `,

  // Query 6: Recommend learning resources
  RECOMMEND_RESOURCES: `
    MATCH (lr:LearningResource)-[:TEACHES]->(s:Skill)
    WHERE s.id IN $missingSkillIds
    RETURN lr AS resource, s AS taughtSkill
    ORDER BY lr.rating DESC, lr.name ASC
  `,

  // Query 7: Find roles matching current skills (with Match %)
  FIND_MATCHING_ROLES: `
    MATCH (r:Role)-[:REQUIRES]->(s:Skill)
    WITH r, collect(DISTINCT s.id) AS requiredSkillIds
    WITH r, requiredSkillIds,
         [id IN requiredSkillIds WHERE id IN $knownSkillIds] AS matchedSkillIds,
         [id IN requiredSkillIds WHERE NOT id IN $knownSkillIds] AS missingSkillIds
    WITH r, requiredSkillIds, matchedSkillIds, missingSkillIds,
         round((toFloat(size(matchedSkillIds)) / toFloat(size(requiredSkillIds))) * 100) AS matchPercentage
    RETURN r AS role, requiredSkillIds, matchedSkillIds, missingSkillIds, matchPercentage
    ORDER BY matchPercentage DESC, r.name ASC
  `,

  // Query 8: Find projects requiring only one missing skill
  FIND_PROJECTS_ONE_MISSING_SKILL: `
    MATCH (p:Project)
    OPTIONAL MATCH (p)-[:BUILDS]->(bSkill:Skill)
    OPTIONAL MATCH (p)-[:REQUIRES_SKILL]->(rSkill:Skill)
    WITH p, collect(DISTINCT bSkill.id) + collect(DISTINCT rSkill.id) AS allNeededSkillIds
    WITH p, [id IN allNeededSkillIds WHERE NOT id IN $knownSkillIds] AS missingSkillIds
    WHERE size(missingSkillIds) = 1
    MATCH (s:Skill {id: missingSkillIds[0]})
    OPTIONAL MATCH (p)-[:BUILDS]->(learned:Skill)
    OPTIONAL MATCH (p)-[:USES]->(tech:Technology)
    RETURN p AS project, s AS singleMissingSkill, collect(DISTINCT learned) AS skillsLearned, collect(DISTINCT tech) AS techStack
    ORDER BY p.name ASC
  `,

  // Helper Cypher: Fetch entire graph for visualization (Nodes & Relationships)
  GET_FULL_GRAPH: `
    MATCH (n)
    OPTIONAL MATCH (n)-[r]->(m)
    RETURN n, r, m
    LIMIT $limit
  `
};
