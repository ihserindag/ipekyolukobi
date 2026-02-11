# Stage 1: Build React Client
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package.json package-lock.json* ./

# Copy client package files
COPY client/package.json client/package-lock.json* ./client/

# Install all dependencies (root + client via postinstall)
RUN npm install

# Copy all source files
COPY . .

# Build the React client
RUN cd client && npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Copy root package files and install production deps only
COPY package.json package-lock.json* ./
COPY server/package.json server/package-lock.json* ./server/

# Install root dependencies (production)
RUN npm install --omit=dev && cd server && npm install --omit=dev

# Copy server files
COPY server/ ./server/
COPY index.js ./

# Copy built client from builder stage
COPY --from=builder /app/client/dist ./client/dist

# Create data directory for SQLite persistence
RUN mkdir -p /app/data

# Environment variables
ENV NODE_ENV=production
ENV PORT=3001
ENV DB_PATH=/app/data/database.db

EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/auth/health || exit 1

CMD ["node", "index.js"]
