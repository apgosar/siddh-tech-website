// See apps/neev/next.config.mjs for why basePath is set this way.
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/swasthyaconnect",
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),
  transpilePackages: ["@siddh/ui", "@siddh/tokens", "@siddh/config", "@siddh/mail"],
};

export default nextConfig;
