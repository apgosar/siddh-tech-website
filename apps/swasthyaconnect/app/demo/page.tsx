import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container, SectionHeading, Callout } from "@siddh/ui";
import { getProduct } from "@siddh/config";
import { sendDemoRequest } from "../../lib/mail";

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

async function submitDemoRequest(formData: FormData) {
  "use server";
  const entry = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    clinic: String(formData.get("clinic") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  try {
    await sendDemoRequest(entry);
  } catch (error) {
    // Notification email failing shouldn't break the visitor's experience —
    // but it must not fail silently, since a misconfigured GMAIL_APP_PASSWORD
    // would otherwise mean requests vanish with no record anywhere.
    console.error("[demo] failed to send notification email", error);
  }

  redirect("/demo?sent=1");
}

export default async function DemoPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const sent = (await searchParams).sent === "1";

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

      {sent ? (
        <Callout eyebrow="Request sent">
          Thanks — we&rsquo;ll get back to you shortly to schedule your walkthrough.
        </Callout>
      ) : (
        <form action={submitDemoRequest} className="flex max-w-measure flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="font-mono text-xs uppercase tracking-wide text-muted">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="rounded border border-rule bg-surface px-3 py-2.5 text-ink outline-none focus-visible:border-accent"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-mono text-xs uppercase tracking-wide text-muted">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="rounded border border-rule bg-surface px-3 py-2.5 text-ink outline-none focus-visible:border-accent"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="clinic" className="font-mono text-xs uppercase tracking-wide text-muted">
              Clinic name
            </label>
            <input
              id="clinic"
              name="clinic"
              type="text"
              required
              className="rounded border border-rule bg-surface px-3 py-2.5 text-ink outline-none focus-visible:border-accent"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="font-mono text-xs uppercase tracking-wide text-muted">
              Anything else we should know?
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="rounded border border-rule bg-surface px-3 py-2.5 text-ink outline-none focus-visible:border-accent"
            />
          </div>
          <button
            type="submit"
            className="inline-flex w-fit items-center justify-center gap-2 rounded bg-ink px-4 py-2.5 font-display text-sm font-semibold text-surface transition-colors hover:bg-ink-2"
          >
            Request a walkthrough
          </button>
        </form>
      )}
    </Container>
  );
}
