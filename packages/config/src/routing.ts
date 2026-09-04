/**
 * The one switch that decides how product sites are addressed.
 *
 * `subdirectory` (current default): siddhtech.ai/neev, siddhtech.ai/swasthyaconnect.
 * Each product still lives in its own app/deploy (apps/neev, apps/swasthyaconnect);
 * Next.js multi-zone rewrites in apps/corporate/next.config.mjs stitch them onto
 * one host so search engines see one domain and the domain keeps one authority pool.
 *
 * `subdomain`: product.siddhtech.ai. Flip this — and the per-product override in
 * products.ts — when a product is ready to become its own thing (e.g. before a
 * spin-out to its own root domain), not as a first choice.
 *
 * Every internal link, canonical tag, and sitemap entry must resolve through
 * getProductHref() below rather than hardcoding a path or host.
 */
export type RoutingMode = "subdirectory" | "subdomain";

export const ROOT_DOMAIN = "siddhtech.ai";
export const ROOT_URL = `https://${ROOT_DOMAIN}`;
export const DEFAULT_ROUTING_MODE: RoutingMode = "subdirectory";
