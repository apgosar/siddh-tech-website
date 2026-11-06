import type { Metadata } from "next";
import { Lora, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import { Header, Footer } from "@siddh/ui";
import { SITE, getProduct } from "@siddh/config";
import "./globals.css";

const product = getProduct("swasthyaconnect");

// Self-hosted at build time, so no request goes to Google's font servers.
const lora = Lora({ subsets: ["latin"], weight: ["600", "700"], style: ["normal", "italic"], variable: "--font-lora", display: "swap" });
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-mono", display: "swap" });

const ORG_ID = `${SITE.url}/#organization`;
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": ORG_ID, name: SITE.name, legalName: SITE.legalName, url: SITE.url },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE.url}/swasthyaconnect#software`,
      name: product.name,
      description: product.description,
      url: `${SITE.url}/swasthyaconnect`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "en-IN",
      publisher: { "@id": ORG_ID },
    },
  ],
};

export const metadata: Metadata = {
  title: { default: `${product.name} — Practice Management for Doctors`, template: `%s · ${product.name}` },
  description: product.description,
  // SwasthyaConnect is served from siddhtech.ai/swasthyaconnect via corporate's
  // rewrites, so card images must resolve against the public host.
  metadataBase: new URL(SITE.url),
  // No canonical here: "./" drops this app's basePath (it would name siddhtech.ai/features, not
  // /swasthyaconnect/features), and a fixed one would be inherited by pages that forget their own.
  // Each page sets its own canonical.
  openGraph: {
    type: "website",
    siteName: product.name,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
  appleWebApp: { title: product.name },
  other: { "apple-touch-icon": "/swasthyaconnect/brand/apple-touch-icon.png" },
};

export default function SwasthyaConnectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-brand="swasthyaconnect" className={`${lora.variable} ${workSans.variable} ${plexMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }} />
        <Header
          brandName={product.name}
          brandMark={
            <span className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/swasthyaconnect/brand/mark-color.svg"
                alt=""
                width={34}
                height={34}
                className="flex-none"
              />
              <span className="flex flex-col leading-tight">
                <span className="font-display text-[1.05rem] font-bold tracking-tight text-ink">
                  {product.name}
                </span>
                <span className="hidden font-display text-[0.68rem] italic text-muted sm:block">
                  Connecting you to good health.
                </span>
              </span>
            </span>
          }
          homeHref="/swasthyaconnect"
          links={[
            { label: "Features", href: "/swasthyaconnect/features" },
            { label: "Pricing", href: "/swasthyaconnect/pricing" },
            { label: "Customers", href: "/swasthyaconnect/customers" },
          ]}
          cta={{ label: "Book a demo", href: "/swasthyaconnect/demo" }}
        />
        <main>{children}</main>
        <Footer
          brandName={product.name}
          legalName={SITE.legalName}
          parentLine={{ label: SITE.name, href: "/" }}
          legalLinks={[
            { label: "Privacy", href: "/legal/privacy" },
            { label: "Terms", href: "/legal/terms" },
          ]}
          columns={[
            {
              heading: "Product",
              links: [
                { label: "Features", href: "/swasthyaconnect/features" },
                { label: "Pricing", href: "/swasthyaconnect/pricing" },
              ],
            },
            {
              heading: "Company",
              links: [{ label: "Siddh Tech Solutions", href: "/" }],
            },
          ]}
        />
      </body>
    </html>
  );
}
