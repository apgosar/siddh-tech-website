import type { MetadataRoute } from "next";
import { SITE } from "@siddh/config";

// Served at /swasthyaconnect/sitemap.xml through corporate's rewrite and listed
// in the root robots.txt. /customers is a "coming soon" placeholder: noindex, and
// left out until there is a clinic to feature. lastModified is the date the
// content was last reviewed, not "now".
const REVIEWED = "2026-11-05";

const PATHS: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/features", priority: 0.9 },
  { path: "/pricing", priority: 0.7 },
  { path: "/demo", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map(({ path, priority }) => ({
    url: `${SITE.url}/swasthyaconnect${path}`,
    lastModified: REVIEWED,
    changeFrequency: "monthly",
    priority,
  }));
}
