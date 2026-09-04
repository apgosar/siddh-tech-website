import type { Metadata } from "next";
import { Header, Footer, LogoMark, Wordmark } from "@siddh/ui";
import { PRODUCTS, getProductHref, SITE } from "@siddh/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
};

const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Trust", href: "/trust" },
  { label: "Insights", href: "/insights" },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "DPA", href: "/legal/dpa" },
  { label: "Cookies", href: "/legal/cookies" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-brand="corporate">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body>
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
                { label: "Careers", href: "/careers" },
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
              heading: "Resources",
              links: [
                { label: "Insights", href: "/insights" },
                { label: "Partners", href: "/partners" },
              ],
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
