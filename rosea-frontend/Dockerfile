# --- Stage 1: Dependencies ---
FROM node:20-alpine AS base
WORKDIR /app

# Copy only dependency files first (better cache)
COPY package.json package-lock.json ./
RUN npm ci

# --- Stage 2: Builder ---
FROM base AS builder
WORKDIR /app
COPY . .
RUN npm run build

# --- Stage 3: Runner ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Security best practices
RUN addgroup -S nodejs
RUN adduser  -S nextjs -G nodejs

# Copy only what is required to run the standalone server
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

