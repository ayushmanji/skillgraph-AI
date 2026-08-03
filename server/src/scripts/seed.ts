import { getNeo4jDriver } from '../db/neo4j';
import { SKILLS, TECHNOLOGIES, FRAMEWORKS, ROLES, PROJECTS, RESOURCES } from '../db/seedData';

async function seedDatabase() {
  const driver = getNeo4jDriver();
  if (!driver) {
    console.error('❌ Cannot seed: Neo4j / CognoDB Cloud credentials missing in environment variables.');
    console.error('Please set COGNODB_URI, COGNODB_USERNAME, COGNODB_PASSWORD in .env file.');
    process.exit(1);
  }

  const session = driver.session();
  console.log('🚀 Initializing SkillGraph AI Database Seeding...');

  try {
    // 1. Create Schema Constraints & Indexes for high performance
    console.log('📦 Step 1: Creating Constraints and Indexes...');
    const constraintQueries = [
      `CREATE CONSTRAINT skill_id_unique IF NOT EXISTS FOR (s:Skill) REQUIRE s.id IS UNIQUE`,
      `CREATE CONSTRAINT tech_id_unique IF NOT EXISTS FOR (t:Technology) REQUIRE t.id IS UNIQUE`,
      `CREATE CONSTRAINT framework_id_unique IF NOT EXISTS FOR (f:Framework) REQUIRE f.id IS UNIQUE`,
      `CREATE CONSTRAINT role_id_unique IF NOT EXISTS FOR (r:Role) REQUIRE r.id IS UNIQUE`,
      `CREATE CONSTRAINT project_id_unique IF NOT EXISTS FOR (p:Project) REQUIRE p.id IS UNIQUE`,
      `CREATE CONSTRAINT resource_id_unique IF NOT EXISTS FOR (lr:LearningResource) REQUIRE lr.id IS UNIQUE`,
      
      `CREATE INDEX skill_name_idx IF NOT EXISTS FOR (s:Skill) ON (s.name)`,
      `CREATE INDEX role_name_idx IF NOT EXISTS FOR (r:Role) ON (r.name)`
    ];

    for (const cypher of constraintQueries) {
      try {
        await session.run(cypher);
      } catch (err: any) {
        console.warn(`[Constraint Note]: ${err.message}`);
      }
    }

    // 2. Seed Skills
    console.log(`🧠 Step 2: Seeding ${SKILLS.length} Skills...`);
    for (const skill of SKILLS) {
      await session.run(
        `
        MERGE (s:Skill {id: $id})
        SET s.name = $name,
            s.category = $category,
            s.level = $level,
            s.description = $description
        `,
        skill
      );
    }

    // Skill Relationships (:REQUIRES & :RELATED_TO)
    for (const skill of SKILLS) {
      if (skill.requires) {
        for (const reqId of skill.requires) {
          await session.run(
            `
            MATCH (s:Skill {id: $skillId})
            MATCH (req:Skill {id: $reqId})
            MERGE (s)-[:REQUIRES]->(req)
            `,
            { skillId: skill.id, reqId }
          );
        }
      }
      if (skill.relatedTo) {
        for (const relId of skill.relatedTo) {
          await session.run(
            `
            MATCH (s:Skill {id: $skillId})
            MATCH (rel:Skill {id: $relId})
            MERGE (s)-[:RELATED_TO]->(rel)
            `,
            { skillId: skill.id, relId }
          );
        }
      }
    }

    // 3. Seed Technologies
    console.log(`💻 Step 3: Seeding ${TECHNOLOGIES.length} Technologies...`);
    for (const tech of TECHNOLOGIES) {
      await session.run(
        `
        MERGE (t:Technology {id: $id})
        SET t.name = $name,
            t.category = $category,
            t.description = $description
        `,
        tech
      );
    }

    // 4. Seed Frameworks & (:USES) -> (:Technology)
    console.log(`⚙️ Step 4: Seeding ${FRAMEWORKS.length} Frameworks...`);
    for (const fw of FRAMEWORKS) {
      await session.run(
        `
        MERGE (f:Framework {id: $id})
        SET f.name = $name,
            f.ecosystem = $ecosystem,
            f.description = $description,
            f.usesTechId = $usesTechId
        WITH f
        MATCH (t:Technology {id: $usesTechId})
        MERGE (f)-[:USES]->(t)
        `,
        fw
      );
    }

    // 5. Seed Roles & (:REQUIRES) -> (:Skill)
    console.log(`💼 Step 5: Seeding ${ROLES.length} Roles...`);
    for (const role of ROLES) {
      await session.run(
        `
        MERGE (r:Role {id: $id})
        SET r.name = $name,
            r.description = $description,
            r.averageSalary = $averageSalary,
            r.demandLevel = $demandLevel
        `,
        role
      );

      for (const reqSkillId of role.requiredSkillIds) {
        await session.run(
          `
          MATCH (r:Role {id: $roleId})
          MATCH (s:Skill {id: $skId})
          MERGE (r)-[:REQUIRES]->(s)
          `,
          { roleId: role.id, skId: reqSkillId }
        );
      }
    }

    // 6. Seed Projects & (:BUILDS)->(:Skill), (:USES)->(:Technology), (:REQUIRES_SKILL)->(:Skill)
    console.log(`🚀 Step 6: Seeding ${PROJECTS.length} Projects...`);
    for (const proj of PROJECTS) {
      await session.run(
        `
        MERGE (p:Project {id: $id})
        SET p.name = $name,
            p.description = $description,
            p.difficulty = $difficulty,
            p.estimatedHours = $estimatedHours
        `,
        proj
      );

      for (const buildSkId of proj.buildsSkillIds) {
        await session.run(
          `
          MATCH (p:Project {id: $pId})
          MATCH (s:Skill {id: $sId})
          MERGE (p)-[:BUILDS]->(s)
          `,
          { pId: proj.id, sId: buildSkId }
        );
      }

      for (const techId of proj.usesTechIds) {
        await session.run(
          `
          MATCH (p:Project {id: $pId})
          MATCH (t:Technology {id: $tId})
          MERGE (p)-[:USES]->(t)
          `,
          { pId: proj.id, tId: techId }
        );
      }

      for (const reqSkId of proj.prerequisiteSkillIds) {
        await session.run(
          `
          MATCH (p:Project {id: $pId})
          MATCH (s:Skill {id: $sId})
          MERGE (p)-[:REQUIRES_SKILL]->(s)
          `,
          { pId: proj.id, sId: reqSkId }
        );
      }
    }

    // 7. Seed Learning Resources & (:TEACHES)->(:Skill)
    console.log(`📚 Step 7: Seeding ${RESOURCES.length} Learning Resources...`);
    for (const res of RESOURCES) {
      await session.run(
        `
        MERGE (lr:LearningResource {id: $id})
        SET lr.name = $name,
            lr.url = $url,
            lr.typeFormat = $typeFormat,
            lr.rating = $rating,
            lr.duration = $duration,
            lr.teachesSkillId = $teachesSkillId
        WITH lr
        MATCH (s:Skill {id: $teachesSkillId})
        MERGE (lr)-[:TEACHES]->(s)
        `,
        res
      );
    }

    console.log('✅ Database Seeding Completed Successfully!');
  } catch (error) {
    console.error('❌ Seeding Error:', error);
  } finally {
    await session.close();
    await driver.close();
  }
}

seedDatabase();
