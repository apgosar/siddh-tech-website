import type { Metadata } from "next";
import { Container, SectionHeading, ProductCard, Callout } from "@siddh/ui";
import { PRODUCTS } from "@siddh/config";

export const metadata: Metadata = {
  title: "Products",
  description: "The products Siddh Tech Solutions builds and operates.",
};

export default function ProductsPage() {
  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Products"
        title="What we build"
        lede="Each product is run by its own team with its own roadmap. What they share is engineering standards, a security posture, and this firm."
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
