import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { config } from './config/env';
import apiRoutes from './routes/api';
import { errorHandler } from './middlewares/errorHandler';
import { verifyConnection } from './db/neo4j';

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Static Client Build Serving (for Single-Container / Production Hosting)
const clientDistPath = path.resolve(__dirname, '../../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.resolve(clientDistPath, 'index.html'));
  });
} else {
  // Direct root endpoints fallback for API standalone deployment
  app.use('/', apiRoutes);
}

// Central Error Handler
app.use(errorHandler);

// Server startup
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, async () => {
    console.log(`=================================================`);
    console.log(`🚀 SkillGraph AI Server running on port ${config.port}`);
    console.log(`📡 Environment: ${config.nodeEnv}`);
    console.log(`=================================================`);
    
    // Test Neo4j / CognoDB Connection
    const dbStatus = await verifyConnection();
    console.log(`[CognoDB Status]: ${dbStatus.message}`);
  });
}

export default app;
