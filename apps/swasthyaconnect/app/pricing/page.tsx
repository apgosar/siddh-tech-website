import type { Metadata } from "next";
import { Container, SectionHeading, Button, Badge } from "@siddh/ui";
import { getProduct } from "@siddh/config";

const product = getProduct("swasthyaconnect");

export const metadata: Metadata = {
  title: "Pricing",
  description: `Simple, transparent introductory pricing for ${product.name} clinic partners.`,
};

const ANNUAL_FEATURES = ["Every feature included, no add-ons", "One payment — nothing to renew"];

const FIVE_YEAR_FEATURES = [
  "Your rate locked in for 5 full years",
  "Free onboarding & data setup",
  "Cancel anytime after year one",
  "Everything in the Annual Plan",
];

export default function PricingPage() {
  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Investment"
        title="Simple, transparent pricing"
        lede="Introductory rates for clinics that come on board early."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-4 rounded border border-rule bg-surface p-6">
          <Badge tone="neutral">Annual plan</Badge>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-4xl font-bold text-ink">₹5,000</span>
            <span className="text-sm text-muted">/ year</span>
          </div>
          <ul className="flex flex-col gap-2">
            {ANNUAL_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-ink-2">
                <span aria-hidden="true" className="mt-0.5 text-accent">
                  ✓
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <Button href="/swasthyaconnect/demo" variant="secondary" className="mt-auto w-fit">
            Book a walkthrough
          </Button>
        </div>

        <div className="flex flex-col gap-4 rounded border border-rule border-l-[3px] border-l-accent bg-surface p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>5-year plan</Badge>
            <Badge tone="flag">Limited-time offer</Badge>
          </div>
          <p className="text-sm font-medium text-ink">Get 5 years for the price of 4</p>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-4xl font-bold text-ink">₹20,000</span>
            <span className="text-sm text-muted">total</span>
          </div>
          <p className="text-sm text-ink-2">
            Just ₹4,000/year — you save ₹5,000 versus paying annually.
          </p>
          <ul className="flex flex-col gap-2">
            {FIVE_YEAR_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-ink-2">
                <span aria-hidden="true" className="mt-0.5 text-accent">
                  ✓
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <Button href="/swasthyaconnect/demo" className="mt-auto w-fit">
            Book a walkthrough
          </Button>
        </div>
      </div>

      <p className="max-w-measure text-sm text-muted">
        Pricing shown is an introductory rate for early clinic partners.
      </p>
    </Container>
  );
}
