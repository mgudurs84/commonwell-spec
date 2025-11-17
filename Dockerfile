        # Multi-stage Docker build for CommonWell API Documentation Viewer

# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the frontend (Vite will bundle the app)
RUN npm run build

# Stage 2: Production runtime
FROM node:20-alpine

WORKDIR /app

# Install production dependencies only
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/shared ./shared

# Expose port 5000
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/categories', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "server/index.js"]
