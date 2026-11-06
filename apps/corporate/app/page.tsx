import type { Metadata } from "next";
import { Container, SectionHeading, Button, Badge } from "@siddh/ui";
import { SITE, getProduct, getProductHref } from "@siddh/config";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name}: AI-native software for operations-heavy industries` },
  description:
    "Siddh Tech Solutions builds AI-native software for operations-heavy industries in India. Neev CMS gets real estate developers paid sooner; SwasthyaConnect runs a clinic's bookings and reminders.",
};

const neev = getProduct("neev");
const swasthya = getProduct("swasthyaconnect");

// Pilot averages from the Neev sales deck (slide 14): 2 projects, 50+ units.
const NEEV_PROOF = [
  { label: "Demand sent", before: "7–10 days", after: "Same day" },
  { label: "Payment received", before: "15–20 days", after: "5–10 days" },
  { label: "Back-office effort per milestone", before: "40 hours", after: "1 hour" },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-rule py-20 sm:py-28">
        <Container className="flex flex-col gap-6">
          <Badge tone="accent">B2B AI-SaaS · India</Badge>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Software for the parts of your operation that still run on spreadsheets and phone calls
          </h1>
          <p className="max-w-2xl text-lg text-ink-2">
            {SITE.name} builds AI-native software for operations-heavy industries in India. We started with real estate
            construction and with clinic practice management: two industries where the daily work is still stitched
            together by hand.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={getProductHref(neev)}>See Neev CMS</Button>
            <Button href="/contact" variant="secondary">
              Talk to us
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20" data-brand="neev">
        <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="flex flex-col gap-5">
            <span className="font-mono text-[0.685rem] font-medium uppercase tracking-[0.16em] text-muted">
              Our lead product · {neev.name}
            </span>
            <h2 className="text-balance font-display text-3xl font-bold leading-tight tracking-tight text-ink">
              {neev.tagline}
            </h2>
            <p className="text-ink-2">
              {neev.name} is a construction management system for real estate developers. Mark a milestone complete and every
              buyer has the demand on WhatsApp the same day, then reminders, receipts and a log of every message follow.
            </p>
            <dl className="grid gap-3 sm:grid-cols-3">
              {NEEV_PROOF.map((p) => (
                <div key={p.label} className="flex flex-col gap-1 rounded border border-rule bg-surface p-3">
                  <dt className="text-xs text-muted">{p.label}</dt>
                  <dd className="flex flex-col">
                    <span className="font-mono text-xs text-muted line-through">{p.before}</span>
                    <span className="font-display text-lg font-bold text-ink">{p.after}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="text-xs text-muted">
              Pilot averages. Live pilot: 2 projects, 50+ residential and commercial units. Your results depend on your
              process and your buyers.
            </p>
            <a href={getProductHref(neev)} className="w-fit font-mono text-sm font-medium text-accent hover:underline">
              Visit {neev.name} →
            </a>
          </div>
          <a href={getProductHref(neev)} className="block overflow-hidden rounded-lg border border-rule shadow-sm" aria-label={`${neev.name} building view, on demo data`}>
            {/* Served by the Neev app through this site's /neev rewrite. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/neev/screens/building-view.webp"
              width={1624}
              height={1174}
              alt="Neev CMS building view: Wing A drawn in 3D, each flat coloured by status, with the selected unit's floor plan beside it. Demo data."
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </a>
        </Container>
      </section>

      <section className="border-t border-rule bg-surface py-16 sm:py-20" data-brand="swasthyaconnect">
        <Container className="flex flex-col gap-4">
          <span className="font-mono text-[0.685rem] font-medium uppercase tracking-[0.16em] text-muted">{swasthya.name}</span>
          <h2 className="max-w-2xl text-balance font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Online booking, WhatsApp reminders and a digital clinic card
          </h2>
          <p className="max-w-measure text-ink-2">
            SwasthyaConnect handles scheduling, records and patient communication so clinics spend less time on admin and
            more on care. It is early: two clinic partners are live.
          </p>
          <a href={getProductHref(swasthya)} className="w-fit font-mono text-sm font-medium text-accent hover:underline">
            Visit {swasthya.name} →
          </a>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="How we build"
            title="Built by engineers and real estate experts, together"
            lede="Neev CMS pairs a product engineer with a valuer who has funded and valued construction projects. We start from how one team actually works, then automate the repetition and leave decisions with your people."
          />
          <div className="flex flex-wrap gap-3">
            <Button href="/about/team" variant="secondary">Meet the team</Button>
            <Button href="/trust" variant="ghost">How we handle your data →</Button>
          </div>
        </Container>
      </section>

      <section className="border-t border-rule py-16 sm:py-20">
        <Container className="flex flex-col items-start gap-4 rounded border border-rule bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="font-display text-xl font-semibold text-ink">
              Building something in an operations-heavy industry?
            </h2>
            <p className="text-ink-2">We are always interested in a conversation, whether you are a customer or a partner.</p>
          </div>
          <Button href="/contact">Get in touch</Button>
        </Container>
      </section>

    </>
  );
}
