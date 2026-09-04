# One Dockerfile, three services — build with --build-arg APP=corporate,
# APP=neev, or APP=swasthyaconnect. Each produces an image for exactly one
# app in the monorepo; the multi-zone rewrites that stitch them together
# happen at request time (apps/corporate/next.config.mjs), not at build time,
# so the three images stay fully independent — deploy, scale, and roll back
# each one on its own.
#
# Build (from the repo root):
#   docker build --build-arg APP=corporate -t siddh-corporate .
#   docker build --build-arg APP=neev -t siddh-neev .
#   docker build --build-arg APP=swasthyaconnect -t siddh-swasthyaconnect .
#
# See DEPLOY.md for the matching `gcloud run deploy` commands.

FROM node:20-alpine AS builder
ARG APP
# Only used by apps/corporate: Next.js resolves next.config.mjs's rewrites()
# destinations once, at `next build` time, into .next/routes-manifest.json —
# it does NOT re-run rewrites() when the standalone server starts. So these
# have to be real values already at build time; setting NEEV_ORIGIN /
# SWASTHYACONNECT_ORIGIN only via `gcloud run deploy --set-env-vars` (i.e.
# after the image is already built) has no effect on where corporate proxies.
ARG NEEV_ORIGIN
ARG SWASTHYACONNECT_ORIGIN
ENV NEEV_ORIGIN=${NEEV_ORIGIN} SWASTHYACONNECT_ORIGIN=${SWASTHYACONNECT_ORIGIN}
WORKDIR /repo

# Copying the whole repo before installing (rather than just package.json
# files first) costs some Docker layer-cache efficiency, but a monorepo has
# enough package.json files scattered across apps/*/ and packages/*/ that
# hand-listing them is an easy place for this to silently break — not worth
# the trade for a low-traffic site's occasional deploy.
COPY . .
RUN npm install
RUN npx turbo run build --filter=@siddh/${APP}

FROM node:20-alpine AS runner
ARG APP
# Cloud Run injects its own PORT at runtime — this default only matters for
# `docker run` outside Cloud Run.
ENV NODE_ENV=production PORT=8080 APP=${APP}
WORKDIR /app

# Next.js standalone output already traces only the node_modules this one
# app actually needs — this image never sees the other two apps, or the
# full monorepo install.
COPY --from=builder /repo/apps/${APP}/.next/standalone ./
COPY --from=builder /repo/apps/${APP}/.next/static ./apps/${APP}/.next/static
COPY --from=builder /repo/apps/${APP}/public ./apps/${APP}/public

EXPOSE 8080
# Exec'd through a shell so $APP expands — Docker's exec-form CMD doesn't
# substitute build ARGs/ENV vars on its own.
CMD ["sh", "-c", "node apps/${APP}/server.js"]
