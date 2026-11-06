import type { Metadata } from "next";
import { Container, SectionHeading, Callout } from "@siddh/ui";

// Draft placeholder: kept out of search results until it has been through legal review.
export const metadata: Metadata = { title: "Data Processing Agreement", robots: { index: false, follow: true } };

export default function DpaPage() {
  return (
    <Container className="flex flex-col gap-8 py-16 sm:py-20">
      <SectionHeading
        level={1} eyebrow="Legal" title="Data Processing Agreement" />
      <Callout eyebrow="Draft — needs legal review before publishing">
        Placeholder. Enterprise buyers in healthcare especially will ask for
        this by name during procurement — get a real DPA drafted before that
        conversation happens, not during it.
      </Callout>
    </Container>
  );
}
