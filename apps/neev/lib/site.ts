import { SITE, getProduct, getProductCanonicalUrl } from "@siddh/config";

export const product = getProduct("neev");

/** "Neev CMS" in titles, structured data and cards; plain "Neev" in running text. */
export const NAME = "Neev CMS";

/** The descriptor that goes next to the name at first mention. Many things are called Neev. */
export const DESCRIPTOR = "a construction management system for real estate developers";

export const TAGLINE = "Accelerate your cash flow. Never chase a payment again.";

/** Bump when content is re-checked against the deck; feeds sitemap lastModified and "Updated" lines. */
export const UPDATED = "2026-11-05";

export const CONTACT = {
  email: "ankur@siddhtech.ai",
  // Click-to-chat instead of a bare number on a public page (it attracts spam calls).
  whatsapp: "https://wa.me/919773776803?text=Hi%20Ankur%2C%20I%27d%20like%20to%20see%20Neev%20CMS%20on%20my%20project.",
  linkedin: "https://www.linkedin.com/in/ankurgosar",
} as const;

export const ORG_ID = `${SITE.url}/#organization`;
export const PRODUCT_ID = `${getProductCanonicalUrl(product)}#software`;

/** Public canonical URL for a Neev path, e.g. url("/features") -> https://siddhtech.ai/neev/features */
export function url(path = ""): string {
  return getProductCanonicalUrl(product, path);
}

/** Path to a file in apps/neev/public. The app has basePath /neev, which plain <img> and <video> do not add. */
export function asset(path: string): string {
  return `/neev${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Indian digit grouping: 3675000 -> "36,75,000". Used everywhere an amount is
 * shown so the site reads like the product.
 */
export function inr(amount: number, fractionDigits = 0): string {
  return `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}`;
}
