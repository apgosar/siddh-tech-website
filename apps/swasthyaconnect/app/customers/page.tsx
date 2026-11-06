import type { Metadata } from "next";
import { Container, SectionHeading, Callout, Button } from "@siddh/ui";
import { getProduct } from "@siddh/config";

const product = getProduct("swasthyaconnect");

export const metadata: Metadata = {
  alternates: { canonical: "/swasthyaconnect/customers" },
  // Placeholder ("coming soon"): kept out of search results and the sitemap until there is a clinic to feature.
  robots: { index: false, follow: true },
  title: "Customers",
  description: `Clinics partnering with ${product.name}.`,
};

export default function CustomersPage() {
  return (
    <Container className="flex flex-col gap-8 py-16 sm:py-20">
      <SectionHeading
        level={1}
        eyebrow="Customers"
        title="Two clinics are live on SwasthyaConnect"
      />
      <Callout eyebrow="Early, and real">
        SwasthyaConnect is early, with two clinic partners live. We'd rather show real clinics
        using it, with their permission, than fill this page with placeholder logos or quotes.
        As clinics agree to be named, they'll be featured here.
      </Callout>
      <div className="flex flex-col items-start gap-4 rounded border border-rule bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-measure text-ink-2">
          Want to be next? Early partners get introductory pricing and a
          hands-on onboarding.
        </p>
        <Button href="/swasthyaconnect/demo">Book a free walkthrough</Button>
      </div>
    </Container>
  );
}
