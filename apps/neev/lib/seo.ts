import type { Metadata } from "next";
import { SITE } from "@siddh/config";
import type { Faq } from "./content";
import { DESCRIPTOR, NAME, ORG_ID, PRODUCT_ID, TAGLINE, UPDATED, asset, url } from "./site";

/**
 * Per-page metadata with a self-referencing canonical. The public Cloud Run
 * addresses serve identical pages, so every page names siddhtech.ai as the one
 * that counts. Note a page-level `openGraph` replaces the layout's wholesale,
 * so siteName, locale and type are repeated here on purpose.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  /** path under /neev, e.g. "/features"; "" for the home page */
  path: string;
  /** use the title as given instead of adding the " · Neev CMS" template */
  absoluteTitle?: boolean;
}): Metadata {
  const canonical = url(path);
  const fullTitle = absoluteTitle ? title : `${title} · ${NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: NAME,
      locale: "en_IN",
      url: canonical,
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

/** Escapes "<" so a "</script>" inside content can never end the JSON-LD block early. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const organizationNode = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/neev/brand/icon-512.png`,
  sameAs: ["https://www.linkedin.com/in/ankurgosar"],
};

export const softwareNode = {
  "@type": "SoftwareApplication",
  "@id": PRODUCT_ID,
  name: NAME,
  alternateName: "Neev",
  description: `${NAME} is ${DESCRIPTOR}. ${TAGLINE}`,
  url: url(),
  image: `${SITE.url}/neev/brand/icon-512.png`,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Construction management",
  operatingSystem: "Web",
  inLanguage: "en-IN",
  audience: { "@type": "BusinessAudience", audienceType: "Real estate developers in India" },
  publisher: { "@id": ORG_ID },
  provider: { "@id": ORG_ID },
  featureList: [
    "Live inventory and parking board",
    "Milestone billing with demand letters on WhatsApp and email",
    "Receivables aging, reminders and daily interest",
    "Quotations, demand letters and agreements for sale from your templates",
    "PAN and Aadhaar reading with name-mismatch check and human approval",
    "Communication log by buyer and channel, roles and an audit log",
  ],
};

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function breadcrumbNode(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: NAME, item: url() },
      ...trail.map((t, i) => ({ "@type": "ListItem", position: i + 2, name: t.name, item: url(t.path) })),
    ],
  };
}

export function webPageNode({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@type": "WebPage",
    "@id": `${url(path)}#webpage`,
    url: url(path),
    name,
    description,
    inLanguage: "en-IN",
    dateModified: UPDATED,
    isPartOf: { "@id": `${url()}#website` },
    about: { "@id": PRODUCT_ID },
  };
}

export const websiteNode = {
  "@type": "WebSite",
  "@id": `${url()}#website`,
  url: url(),
  name: NAME,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-IN",
};

export function faqNode(faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function videoNode() {
  return {
    "@type": "VideoObject",
    name: "A full Neev CMS milestone cycle in 30 seconds",
    description:
      "A slab is certified and marked complete, the demand lands on WhatsApp for every buyer with the certificate, and the numbered receipt goes out when payment comes in. Shown on demo data.",
    thumbnailUrl: `${SITE.url}${asset("/screens/demand-on-whatsapp.webp")}`,
    contentUrl: `${SITE.url}${asset("/media/neev-milestone-reel.mp4")}`,
    uploadDate: UPDATED,
    duration: "PT30S",
    publisher: { "@id": ORG_ID },
  };
}
