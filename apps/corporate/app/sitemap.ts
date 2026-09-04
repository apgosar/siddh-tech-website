import type { MetadataRoute } from "next";
import { SITE, PRODUCTS, getProductCanonicalUrl } from "@siddh/config";

const CORPORATE_PATHS = [
  "",
  "/products",
  "/about",
  "/about/team",
  "/careers",
  "/trust",
  "/insights",
  "/partners",
  "/contact",
  "/legal/privacy",
  "/legal/terms",
  "/legal/dpa",
  "/legal/cookies",
];

// TODO: once apps/neev and apps/swasthyaconnect have their own route trees,
// give each its own sitemap.ts and compose a sitemap index here instead of
// listing just the product roots.
export default function sitemap(): MetadataRoute.Sitemap {
  const corporateEntries = CORPORATE_PATHS.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
  }));

  const productEntries = PRODUCTS.map((product) => ({
    url: getProductCanonicalUrl(product),
    lastModified: new Date(),
  }));

  return [...corporateEntries, ...productEntries];
}
