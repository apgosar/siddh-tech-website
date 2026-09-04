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
  transpilePackages: ["@siddh/ui", "@siddh/tokens", "@siddh/config"],
};

export default nextConfig;
