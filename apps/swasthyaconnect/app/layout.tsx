import type { Metadata } from "next";
import { Header, Footer } from "@siddh/ui";
import { SITE, getProduct } from "@siddh/config";
import "./globals.css";

const product = getProduct("swasthyaconnect");

export const metadata: Metadata = {
  title: { default: `${product.name} — Practice Management for Doctors`, template: `%s · ${product.name}` },
  description: product.description,
  appleWebApp: { title: product.name },
  other: { "apple-touch-icon": "/swasthyaconnect/brand/apple-touch-icon.png" },
};

export default function SwasthyaConnectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-brand="swasthyaconnect">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,400&family=Work+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body>
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
