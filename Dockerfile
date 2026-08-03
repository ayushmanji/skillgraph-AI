# Multi-stage Dockerfile for SkillGraph AI
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root and module package manifests
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies
RUN npm run setup

# Copy source files
COPY . .

# Build both server and client
RUN npm run build

# Production Runner
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

COPY package*.json ./
COPY server/package*.json ./server/
RUN cd server && npm install --omit=dev

COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/client/dist ./client/dist

EXPOSE 5000

CMD ["node", "server/dist/app.js"]
