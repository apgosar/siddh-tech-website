import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
import { Header, Footer, LogoMark, Wordmark } from "@siddh/ui";
import { PRODUCTS, getProductHref, SITE } from "@siddh/config";
import { graph, jsonLdString, organizationNode, websiteNode } from "../lib/seo";
import "./globals.css";

// Self-hosted at build time, so no request goes to Google's font servers.
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}: AI-native software for operations-heavy industries`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  // "./" resolves against each page's own path, so every page names itself as
  // its canonical. The public Cloud Run addresses serve identical pages, and
  // this tells search engines which address counts.
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Trust", href: "/trust" },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-brand="corporate" className={`${archivo.variable} ${sourceSerif.variable} ${plexMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(graph(organizationNode, websiteNode)) }}
        />
        <Header
          brandName={SITE.name}
          brandMark={
            <>
              <LogoMark className="h-6 w-auto text-ink" />
              <Wordmark className="font-display text-lg font-bold tracking-tight text-ink" />
            </>
          }
          homeHref="/"
          links={NAV_LINKS}
          cta={{ label: "Talk to us", href: "/contact" }}
        />
        <main>{children}</main>
        <Footer
          brandName={SITE.name}
          legalName={SITE.legalName}
          legalLinks={LEGAL_LINKS}
          columns={[
            {
              heading: "Company",
              links: [
                { label: "About", href: "/about" },
                { label: "Team", href: "/about/team" },
                { label: "Contact", href: "/contact" },
              ],
            },
            {
              heading: "Products",
              links: PRODUCTS.map((product) => ({
                label: product.name,
                href: getProductHref(product),
              })),
            },
            {
              heading: "Trust",
              links: [
                { label: "Trust centre", href: "/trust" },
                { label: "Security", href: "/trust#security" },
              ],
            },
          ]}
        />
      </body>
    </html>
  );
}
