import neo4j, { Driver, Session } from 'neo4j-driver';
import { config } from '../config/env';
import { SKILLS, TECHNOLOGIES, FRAMEWORKS, ROLES, PROJECTS, RESOURCES } from './seedData';

let driver: Driver | null = null;
let isConnectedToLiveDb = false;

export function getNeo4jDriver(): Driver | null {
  if (driver) return driver;

  const { uri, username, password } = config.cognodb;

  if (uri && username && password) {
    try {
      driver = neo4j.driver(
        uri,
        neo4j.auth.basic(username, password),
        {
          maxConnectionPoolSize: 50,
          connectionTimeout: 15000,
        }
      );
      console.log(`[Neo4j DB] Attempting connection to ${uri}...`);
    } catch (error) {
      console.error('[Neo4j DB] Driver initialization error:', error);
      driver = null;
    }
  } else {
    console.log('[Neo4j DB] No COGNODB_URI / Credentials set. Using resilient graph fallback engine.');
  }

  return driver;
}

export async function verifyConnection(): Promise<{ connected: boolean; message: string }> {
  const d = getNeo4jDriver();
  if (!d) {
    isConnectedToLiveDb = false;
    return {
      connected: false,
      message: 'Using in-memory high performance graph engine (No live CognoDB credentials provided).'
    };
  }

  try {
    const session = d.session();
    await session.run('RETURN 1 AS test');
    await session.close();
    isConnectedToLiveDb = true;
    return {
      connected: true,
      message: 'Successfully connected to CognoDB Cloud / Neo4j database.'
    };
  } catch (err: any) {
    isConnectedToLiveDb = false;
    console.warn('[Neo4j DB] Connection test failed:', err.message);
    return {
      connected: false,
      message: `Connection failed (${err.message}). Falling back to graph fallback engine.`
    };
  }
}

export function isLiveDbConnected(): boolean {
  return isConnectedToLiveDb;
}

export async function closeNeo4jDriver(): Promise<void> {
  if (driver) {
    await driver.close();
    driver = null;
    console.log('[Neo4j DB] Driver closed.');
  }
}

export async function runCypherQuery(cypher: string, params: Record<string, any> = {}): Promise<any[]> {
  const d = getNeo4jDriver();
  if (d && isConnectedToLiveDb) {
    const session = d.session();
    try {
      const result = await session.run(cypher, params);
      return result.records.map(record => record.toObject());
    } finally {
      await session.close();
    }
  }
  return [];
}
