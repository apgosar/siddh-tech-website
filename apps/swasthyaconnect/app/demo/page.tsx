import type { Metadata } from "next";
import { Container, SectionHeading, Button } from "@siddh/ui";
import { getProduct } from "@siddh/config";

const product = getProduct("swasthyaconnect");

export const metadata: Metadata = {
  title: "Book a demo",
  description: `Book a free, no-obligation walkthrough of ${product.name} tailored to your clinic.`,
};

const POINTS = [
  {
    title: "Free practice walkthrough",
    body: "A session tailored to your clinic — how it runs today, and how SwasthyaConnect fits your day.",
  },
  {
    title: "No disruption to current workflow",
    body: "See it in action before anything about how your clinic runs today has to change.",
  },
  {
    title: "Get started in days, not months",
    body: "Onboarding and data setup are handled for you — this isn't a long implementation project.",
  },
];

export default function DemoPage() {
  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Let's talk"
        title="Let's modernize your practice"
        lede="See SwasthyaConnect in action — book a walkthrough tailored to your clinic and find out how much time it can give back to your day."
      />

      <div className="grid gap-6 sm:grid-cols-3">
        {POINTS.map((point) => (
          <div key={point.title} className="flex flex-col gap-1.5">
            <h3 className="font-display text-base font-semibold text-ink">{point.title}</h3>
            <p className="text-sm text-ink-2">{point.body}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start gap-4 rounded border border-rule bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-measure text-ink-2">
          Tell us a bit about your clinic and we&rsquo;ll get back to you to schedule your
          walkthrough — mention SwasthyaConnect in the message.
        </p>
        <Button href="/contact">Request a walkthrough</Button>
      </div>
    </Container>
  );
}
