// Multi-zone routing: each product ships as its own Next.js app (apps/neev,
// apps/swasthyaconnect) with its own deploy pipeline, but is proxied onto
// this domain at a subdirectory so search engines — and visitors — see one
// host. Destinations point at each zone's own deployment URL in production;
// in local dev they point at that app's dev server port. See
// packages/config/src/routing.ts for the mode this mirrors.
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const NEEV_ORIGIN = process.env.NEEV_ORIGIN || "http://localhost:3001";
const SWASTHYACONNECT_ORIGIN = process.env.SWASTHYACONNECT_ORIGIN || "http://localhost:3002";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a self-contained .next/standalone build (server + only the
  // node_modules it actually needs) — what the Cloud Run Dockerfile copies
  // into its runtime image, instead of shipping the whole monorepo.
  output: "standalone",
  // Without this, Next.js guesses the workspace root from lockfile
  // location, which can pick the wrong ancestor in a monorepo and silently
  // leave workspace packages (@siddh/ui etc.) out of the traced build.
  outputFileTracingRoot: path.join(__dirname, "../../"),
  transpilePackages: ["@siddh/ui", "@siddh/tokens", "@siddh/config"],
  async rewrites() {
    return [
      { source: "/neev", destination: `${NEEV_ORIGIN}/neev` },
      { source: "/neev/:path*", destination: `${NEEV_ORIGIN}/neev/:path*` },
      { source: "/swasthyaconnect", destination: `${SWASTHYACONNECT_ORIGIN}/swasthyaconnect` },
      { source: "/swasthyaconnect/:path*", destination: `${SWASTHYACONNECT_ORIGIN}/swasthyaconnect/:path*` },
    ];
  },
};

export default nextConfig;
