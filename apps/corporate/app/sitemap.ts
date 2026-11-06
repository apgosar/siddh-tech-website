import type { MetadataRoute } from "next";
import { SITE } from "@siddh/config";

// Only pages that are finished. Placeholder pages (careers, insights, partners
// and the legal drafts) are noindex and stay out until they are written; add them
// here and drop their `robots` metadata at the same time. Product sites list
// their own pages in /neev/sitemap.xml and /swasthyaconnect/sitemap.xml, which
// robots.txt points to. lastModified is the date the content was last reviewed,
// not "now".
const REVIEWED = "2026-11-05";

const PATHS: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/products", priority: 0.8 },
  { path: "/about", priority: 0.6 },
  { path: "/about/team", priority: 0.6 },
  { path: "/trust", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map(({ path, priority }) => ({
    url: `${SITE.url}${path}`,
    lastModified: REVIEWED,
    changeFrequency: "monthly",
    priority,
  }));
}
