import type { Metadata } from "next";
import { Container, SectionHeading, Callout, Button } from "@siddh/ui";
import { getProduct } from "@siddh/config";

const product = getProduct("swasthyaconnect");

export const metadata: Metadata = {
  title: "Customers",
  description: `Clinics partnering with ${product.name}.`,
};

export default function CustomersPage() {
  return (
    <Container className="flex flex-col gap-8 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Customers"
        title="We're onboarding our first clinic partners"
      />
      <Callout eyebrow="Coming soon">
        SwasthyaConnect is early — we'd rather show real clinics using it, with their
        permission, than fill this page with placeholder logos or quotes. As partnerships go
        live, they'll be featured here.
      </Callout>
      <div className="flex flex-col items-start gap-4 rounded border border-rule bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-measure text-ink-2">
          Want to be one of the first? Early partners get introductory pricing and a
          hands-on onboarding.
        </p>
        <Button href="/swasthyaconnect/demo">Book a free walkthrough</Button>
      </div>
    </Container>
  );
}
