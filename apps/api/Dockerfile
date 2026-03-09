FROM node:20-alpine AS base
WORKDIR /app

# Install deps (root + workspaces)
FROM base AS deps
COPY package.json package-lock.json* ./
COPY apps/api/package.json apps/api/
COPY packages/database/package.json packages/database/
RUN npm ci

# Generate Prisma client and build API
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build:db
RUN npm run build:api

# Production runner
FROM base AS runner
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/packages/database ./packages/database
COPY package.json package-lock.json* ./
COPY apps/api/package.json apps/api/
COPY packages/database/package.json packages/database/

WORKDIR /app
EXPOSE 3000
CMD ["sh", "-c", "cd packages/database && npx prisma migrate deploy && cd ../.. && node apps/api/dist/main.js"]
