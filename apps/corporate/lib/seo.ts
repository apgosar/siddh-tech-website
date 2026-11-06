import { SITE } from "@siddh/config";

/** Escapes "<" so a "</script>" inside content can never end the JSON-LD block early. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\u003c");
}

export const ORG_ID = `${SITE.url}/#organization`;

export const organizationNode = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/icon.svg`,
  description: SITE.description,
  email: "ankur@siddhtech.ai",
  sameAs: ["https://www.linkedin.com/in/ankurgosar"],
  founder: { "@id": `${SITE.url}/about/team#ankur-gosar` },
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-IN",
};

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
