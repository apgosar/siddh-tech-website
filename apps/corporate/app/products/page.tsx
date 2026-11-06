import type { Metadata } from "next";
import { Container, SectionHeading, ProductCard, Callout } from "@siddh/ui";
import { PRODUCTS } from "@siddh/config";

export const metadata: Metadata = {
  title: "Products",
  description: "Neev CMS, a construction management system for real estate developers, and SwasthyaConnect, practice management for clinics: the products Siddh Tech Solutions builds.",
};

export default function ProductsPage() {
  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-20">
      <SectionHeading
        level={1}
        eyebrow="Products"
        title="Two products, two industries"
        lede="Neev CMS is in live pilot on 2 projects. SwasthyaConnect has 2 clinic partners live. Each has its own site, roadmap and brand."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Callout eyebrow="A note on how these fit together">
        Neev and SwasthyaConnect are independent products serving unrelated
        industries — they don't share a customer base, and we haven't built a
        combined platform story between them. If that changes as we grow, this
        page — and a dedicated platform page — will say so plainly.
      </Callout>
    </Container>
  );
}
