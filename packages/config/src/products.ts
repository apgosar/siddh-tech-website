import type { Brand } from "@siddh/tokens";
import { DEFAULT_ROUTING_MODE, ROOT_DOMAIN, ROOT_URL, type RoutingMode } from "./routing";

export type ProductStatus = "live" | "pipeline";

export interface Product {
  /** matches the accent triad in packages/tokens and the app/ dir under apps/ */
  id: Exclude<Brand, "corporate">;
  name: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  /** URL segment used in subdirectory mode and as the subdomain label in subdomain mode */
  slug: string;
  /** overrides DEFAULT_ROUTING_MODE for this one product; leave unset until a real reason to diverge */
  routingModeOverride?: RoutingMode;
}

export const PRODUCTS: Product[] = [
  {
    id: "neev",
    name: "Neev",
    tagline: "Construction and sales management, in one system.",
    description:
      "Neev Construction Management System runs the full cycle from land and lead to sale and possession for real estate developers and contractors.",
    status: "live",
    slug: "neev",
  },
  {
    id: "swasthyaconnect",
    name: "SwasthyaConnect",
    tagline: "Practice management built around the doctor's day.",
    description:
      "SwasthyaConnect handles scheduling, records, billing and patient communication so clinics spend less time on admin and more on care.",
    status: "live",
    slug: "swasthyaconnect",
  },
];

export function getProduct(id: Product["id"]): Product {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) {
    throw new Error(`Unknown product id: ${id}`);
  }
  return product;
}

/**
 * Resolves the canonical href for a product's marketing site (its root page,
 * or a sub-path within it) according to the routing mode. Use this instead of
 * hardcoding "/neev" or "https://neev.siddhtech.ai" anywhere in the codebase —
 * flipping a product's routingModeOverride is the only change a subdomain
 * migration should require here.
 */
export function getProductHref(product: Product, path = ""): string {
  const mode = product.routingModeOverride ?? DEFAULT_ROUTING_MODE;
  const cleanPath = path.replace(/^\/+/, "");

  if (mode === "subdomain") {
    const base = `https://${product.slug}.${ROOT_DOMAIN}`;
    return cleanPath ? `${base}/${cleanPath}` : base;
  }

  // subdirectory mode
  const base = `/${product.slug}`;
  return cleanPath ? `${base}/${cleanPath}` : base;
}

/** Absolute canonical URL for a product path, for <link rel="canonical"> and sitemaps. */
export function getProductCanonicalUrl(product: Product, path = ""): string {
  const mode = product.routingModeOverride ?? DEFAULT_ROUTING_MODE;
  const href = getProductHref(product, path);
  return mode === "subdomain" ? href : `${ROOT_URL}${href}`;
}
