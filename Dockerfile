# Based on https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
FROM node:18-alpine AS base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine 
# to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

RUN npm install -g pnpm@8.5.0


FROM base AS deps

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile


FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build


FROM base AS runner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app
COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV NODE_ENV production

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
