import { Container, SectionHeading, Badge, Button } from "@siddh/ui";
import { getProduct } from "@siddh/config";

const product = getProduct("swasthyaconnect");

const PROBLEMS = [
  {
    title: "Missed Calls & Phone Tag",
    body: "Front desk staff stuck juggling calls while patients wait in the clinic.",
  },
  {
    title: "No-Shows Eat Into Your Day",
    body: "Empty slots that could have gone to another patient, lost with no warning.",
  },
  {
    title: "Registers & Paper Records",
    body: "Prescriptions, receipts and patient history scattered across notebooks.",
  },
  {
    title: "Invisible Online",
    body: "New patients can't easily find your timings, fees, or clinic location.",
  },
];

const PILLARS = [
  { title: "Patient Portal", body: "Self-service booking, family accounts and visit history." },
  { title: "Doctor Dashboard", body: "The whole day — and every patient's history — at a glance." },
  { title: "Smart Scheduling", body: "Slots generate themselves; double-booking simply can't happen." },
  { title: "WhatsApp Automation", body: "Confirmations, reminders and daily summaries, sent automatically." },
  { title: "Digital Business Card", body: "Timings, fees and location patients can find before they call." },
];

const OUTCOMES = [
  { title: "Save Staff Time", body: "Less phone tag, less paperwork, more time for patients." },
  { title: "Fewer No-Shows", body: "Automated reminders keep patients on schedule." },
  { title: "Grow Your Patient Base", body: "A professional online presence brings new patients in." },
  { title: "A Professional Image", body: "Polished booking, prescriptions and receipts, every time." },
  { title: "A Better Patient Experience", body: "Self-service booking families genuinely enjoy using." },
  { title: "Organized, Searchable Records", body: "Every patient's history, right at your fingertips." },
];

export default function SwasthyaConnectHomePage() {
  return (
    <>
      <section className="border-b border-rule py-20 sm:py-28">
        <Container className="flex flex-col gap-6">
          <Badge>Practice Management</Badge>
          <h1 className="max-w-2xl text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            {product.tagline}
          </h1>
          <p className="max-w-measure text-lg text-ink-2">{product.description}</p>
          <div className="flex flex-wrap gap-3">
            <Button href="/swasthyaconnect/demo">Book a free walkthrough</Button>
            <Button href="/swasthyaconnect/pricing" variant="secondary">
              See pricing
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="The everyday reality"
            title="Running a clinic shouldn't feel like a full-time second job"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {PROBLEMS.map((item) => (
              <div key={item.title} className="flex flex-col gap-1.5">
                <h3 className="font-display text-base font-semibold text-ink">{item.title}</h3>
                <p className="text-sm text-ink-2">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-rule bg-surface py-16 sm:py-20">
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="The solution"
            title="One platform. Every part of your front office."
            lede="SwasthyaConnect brings booking, scheduling, patient communication and your clinic's digital business card into one place — so your team spends less time on admin and more time on patients."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="flex flex-col gap-1.5 rounded border border-rule border-l-[3px] border-l-accent bg-surface p-5"
              >
                <h3 className="font-display text-base font-semibold text-ink">{pillar.title}</h3>
                <p className="text-sm text-ink-2">{pillar.body}</p>
              </div>
            ))}
          </div>
          <Button href="/swasthyaconnect/features" variant="ghost" className="w-fit">
            See every feature →
          </Button>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-4 rounded border border-rule border-l-[3px] border-l-accent bg-surface p-8">
            <div className="flex items-center gap-3">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="flex-none text-accent"
              >
                <path
                  d="M12 2.5 4 5.5v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10v-6L12 2.5Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 12.2 11 14.8l4.5-5.4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                We never sell your patients&rsquo; data. Ever.
              </h2>
            </div>
            <p className="max-w-measure text-ink-2">
              Privacy is at the heart of how SwasthyaConnect is designed, not a policy bolted on
              afterward. Patient records, prescriptions and consultation history exist to serve
              your clinic and your patients — never as a product to be sold, shared or mined for
              anything else.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-rule bg-surface py-16 sm:py-20">
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="The bottom line" title="What this means for your practice" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OUTCOMES.map((item) => (
              <div key={item.title} className="flex flex-col gap-1.5">
                <h3 className="font-display text-base font-semibold text-ink">{item.title}</h3>
                <p className="text-sm text-ink-2">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col items-start gap-4 rounded border border-rule bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="font-display text-xl font-semibold text-ink">Let&rsquo;s modernize your practice</h2>
            <p className="text-ink-2">
              See SwasthyaConnect in action — a free walkthrough tailored to your clinic, with no
              disruption to your current workflow.
            </p>
          </div>
          <Button href="/swasthyaconnect/demo">Book a free walkthrough</Button>
        </Container>
      </section>
    </>
  );
}
