import type { Metadata } from "next";
import { Header, Footer } from "@siddh/ui";
import { SITE, getProduct } from "@siddh/config";
import "./globals.css";

const product = getProduct("neev");

export const metadata: Metadata = {
  title: { default: `${product.name} — Construction & Sales Management`, template: `%s · ${product.name}` },
  description: product.description,
};

export default function NeevLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-brand="neev">
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
          brandName={product.name}
          endorsement={{ label: "by Siddh Tech", href: "/" }}
          homeHref="/neev"
          links={[
            { label: "Features", href: "/neev/features" },
            { label: "Pricing", href: "/neev/pricing" },
            { label: "Customers", href: "/neev/customers" },
          ]}
          cta={{ label: "Book a demo", href: "/neev/demo" }}
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
                { label: "Features", href: "/neev/features" },
                { label: "Pricing", href: "/neev/pricing" },
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
