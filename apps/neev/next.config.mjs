// basePath matches the subdirectory this app is proxied to from
// apps/corporate/next.config.mjs, per the multi-zone pattern in
// packages/config/src/routing.ts. If this product ever moves to its own
// subdomain, remove basePath and flip its routingModeOverride instead.
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/neev",
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),
  transpilePackages: ["@siddh/ui", "@siddh/tokens", "@siddh/config", "@siddh/mail"],
  poweredByHeader: false,
  // Pages that moved when the site was rebuilt around the deck. Permanent, so
  // search engines carry their history to the new URL. Next prepends basePath
  // to both source and destination.
  async redirects() {
    return [
      { source: "/pricing", destination: "/pilot", permanent: true },
      { source: "/customers", destination: "/results", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Static media: a day fresh, a week stale-while-revalidate, so a replaced file shows up quickly.
        source: "/(screens|brand|media)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
