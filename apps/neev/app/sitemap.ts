import type { MetadataRoute } from "next";
import { MODULES } from "../lib/content";
import { UPDATED, url } from "../lib/site";

// One entry per public page, with the date its content was last checked against
// the deck (not "now": a sitemap that always says "changed today" teaches crawlers
// to ignore lastmod). Served at /neev/sitemap.xml via corporate's rewrite and
// listed in the root robots.txt.
const PATHS: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/features", priority: 0.9 },
  ...MODULES.map((m) => ({ path: `/${m.slug}`, priority: 0.8 })),
  { path: "/security", priority: 0.8 },
  { path: "/results", priority: 0.8 },
  { path: "/roi-calculator", priority: 0.7 },
  { path: "/pilot", priority: 0.8 },
  { path: "/faq", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/demo", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map(({ path, priority }) => ({
    url: url(path),
    lastModified: UPDATED,
    changeFrequency: "monthly",
    priority,
  }));
}
