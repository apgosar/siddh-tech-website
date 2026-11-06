import type { Metadata, Viewport } from "next";
import { Archivo, Inter, IBM_Plex_Mono } from "next/font/google";
import { Header, Footer } from "@siddh/ui";
import { SITE } from "@siddh/config";
import { CONTACT, DESCRIPTOR, NAME, TAGLINE, asset } from "../lib/site";
import "./globals.css";

// Self-hosted at build time: no request to Google's font servers, no layout
// shift from a late swap. Archivo is the wordmark's face; Inter is the face the
// product's own screens use, so tables and rupee amounts read the same here.
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${NAME}: accelerate your cash flow`, template: `%s · ${NAME}` },
  description: `${NAME} is ${DESCRIPTOR}. ${TAGLINE}`,
  // Neev is served from siddhtech.ai/neev via corporate's rewrites, so card
  // images and canonicals must resolve against the public host, not this app's own URL.
  metadataBase: new URL(SITE.url),
  applicationName: NAME,
  // No canonical here on purpose: a layout-level one would be inherited by any
  // page that forgets its own and point it at the home page. Every page sets
  // its canonical through pageMetadata() in lib/seo.ts.
  openGraph: {
    type: "website",
    siteName: NAME,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  appleWebApp: { title: "Neev" },
};

export const viewport: Viewport = {
  themeColor: "#0b1b2e",
  colorScheme: "dark",
};

const NAV = [
  { label: "Features", href: "/neev/features" },
  { label: "Calculator", href: "/neev/roi-calculator" },
  { label: "Results", href: "/neev/results" },
  { label: "Pilot", href: "/neev/pilot" },
  { label: "Security", href: "/neev/security" },
];

export default function NeevLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-brand="neev" className={`${archivo.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-cta focus:px-3 focus:py-2 focus:font-semibold focus:text-on-cta"
        >
          Skip to content
        </a>
        <Header
          brandName={NAME}
          brandMark={
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={asset("/brand/neev-logo-horizontal-on-dark.svg")}
              alt="Neev CMS"
              width={129}
              height={61}
              className="h-[3.25rem] w-auto"
            />
          }
          homeHref="/neev"
          links={NAV}
          cta={{ label: "See it on your project", href: "/neev/demo" }}
        />
        <main id="main">{children}</main>
        <Footer
          brandName={NAME}
          legalName={SITE.legalName}
          parentLine={{ label: "Powered by Siddh Tech Solutions", href: "/" }}
          brand={
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/brand/neev-logo-horizontal-on-dark.svg")} alt="" width={129} height={61} className="h-12 w-auto" />
              <p className="max-w-xs text-sm text-ink-2">
                {NAME} is {DESCRIPTOR}. {TAGLINE}
              </p>
              <p className="flex flex-col gap-1 text-sm">
                <a href={`mailto:${CONTACT.email}`} className="text-ink hover:text-accent">{CONTACT.email}</a>
                <a href={CONTACT.whatsapp} className="text-ink-2 hover:text-accent" rel="noopener">Message us on WhatsApp</a>
              </p>
            </>
          }
          legalLinks={[
            { label: "Privacy", href: "/legal/privacy" },
            { label: "Terms", href: "/legal/terms" },
          ]}
          columns={[
            {
              heading: "Product",
              links: [
                { label: "Inventory", href: "/neev/inventory" },
                { label: "Milestone billing", href: "/neev/milestone-billing" },
                { label: "Collections", href: "/neev/collections" },
                { label: "Documents", href: "/neev/documents" },
                { label: "PAN and Aadhaar", href: "/neev/kyc" },
                { label: "Communications", href: "/neev/communications" },
              ],
            },
            {
              heading: "Proof",
              links: [
                { label: "Pilot results", href: "/neev/results" },
                { label: "ROI calculator", href: "/neev/roi-calculator" },
                { label: "Security", href: "/neev/security" },
                { label: "FAQ", href: "/neev/faq" },
              ],
            },
            {
              heading: "Start",
              links: [
                { label: "Pilot one project", href: "/neev/pilot" },
                { label: "See it on your project", href: "/neev/demo" },
                { label: "About", href: "/neev/about" },
              ],
            },
          ]}
        />
      </body>
    </html>
  );
}
