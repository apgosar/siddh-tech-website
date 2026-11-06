import type { MetadataRoute } from "next";
import { SITE } from "@siddh/config";

/**
 * Search and answer-engine crawlers are named explicitly so the policy is a
 * decision, not a default: they send visitors and citations. Training-only
 * crawlers (GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended) are not
 * named and so fall under "*", which allows them. To opt out of model training,
 * add a { userAgent: [...], disallow: "/" } rule for them; that does not affect
 * search ranking.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
        ],
        allow: "/",
      },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: [
      `${SITE.url}/sitemap.xml`,
      `${SITE.url}/neev/sitemap.xml`,
      `${SITE.url}/swasthyaconnect/sitemap.xml`,
    ],
    host: SITE.url,
  };
}
