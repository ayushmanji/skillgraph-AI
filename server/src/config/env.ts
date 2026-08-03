import dotenv from 'dotenv';
import path from 'path';

// Load .env file from root or local directory
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  cognodb: {
    uri: process.env.COGNODB_URI || process.env.NEO4J_URI || '',
    username: process.env.COGNODB_USERNAME || process.env.NEO4J_USERNAME || '',
    password: process.env.COGNODB_PASSWORD || process.env.NEO4J_PASSWORD || '',
  }
};
