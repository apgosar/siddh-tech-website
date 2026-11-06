import type { Metadata } from "next";
import { Container, SectionHeading, Callout } from "@siddh/ui";

// Draft placeholder: kept out of search results until it has been through legal review.
export const metadata: Metadata = { title: "Terms of Service", robots: { index: false, follow: true } };

export default function TermsPage() {
  return (
    <Container className="flex flex-col gap-8 py-16 sm:py-20">
      <SectionHeading
        level={1} eyebrow="Legal" title="Terms of Service" />
      <Callout eyebrow="Draft — needs legal review before publishing">
        Placeholder. Replace with real terms covering each product's service
        commitments, acceptable use, liability and termination, reviewed by
        counsel before publishing.
      </Callout>
    </Container>
  );
}
