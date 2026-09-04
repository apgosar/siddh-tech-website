import type { Metadata } from "next";
import { Container, SectionHeading, Callout } from "@siddh/ui";
import { getProduct } from "@siddh/config";

const product = getProduct("swasthyaconnect");

export const metadata: Metadata = {
  title: "Features",
  description: `Everything ${product.name} handles for your clinic — booking, scheduling, patient communication, records and your digital business card.`,
};

const SECTIONS = [
  {
    eyebrow: "For your patients",
    title: "Let patients book themselves, anytime",
    items: [
      {
        title: "Instant online booking",
        body: "Patients pick from real, up-to-the-minute available time slots — no phone calls needed.",
      },
      {
        title: "Family & multi-patient accounts",
        body: "One mobile number manages elderly parents, children, and other family members.",
      },
      {
        title: "Self-service history",
        body: "Patients view upcoming visits and past consultations whenever they need to.",
      },
      {
        title: "Calendar sync",
        body: "Appointments can be synced to patients' and doctors' personal calendars via Google Calendar & iCal.",
      },
    ],
  },
  {
    eyebrow: "For you and your staff",
    title: "Your whole day, at a glance",
    items: [
      {
        title: "Daily overview",
        body: "Today's appointments, completed visits and total patient counts on one screen.",
      },
      {
        title: "Patient insights before you walk in",
        body: "Age, chief complaints and past consultation history, ready before every visit.",
      },
      {
        title: "Full schedule control",
        body: "Manage shifts, patient queues and appointment flow without the back-and-forth.",
      },
      {
        title: "Your daily summary",
        body: "A schedule overview and real-time cancellation updates sent straight to your WhatsApp.",
      },
    ],
  },
  {
    eyebrow: "Behind the scenes",
    title: "Smart scheduling that protects your time",
    items: [
      {
        title: "Automatic slot generation",
        body: "Clinic shifts are divided into clean, consistent appointment slots on their own.",
      },
      {
        title: "Conflict-free booking",
        body: "Booked and blocked slots disappear instantly — double-booking simply can't happen.",
      },
      {
        title: "Block time for leave or surgery",
        body: "Mark out full days or specific slots — patients can't book when you're unavailable.",
      },
    ],
  },
  {
    eyebrow: "Patient communication",
    title: "Keep patients informed, automatically",
    items: [
      {
        title: "WhatsApp integration",
        body: "Booking confirmations, reminders and cancellation alerts reach patients instantly on WhatsApp and email — the moment they happen, on the channel patients actually open.",
        highlight: true,
      },
      {
        title: "Instant booking confirmations",
        body: "Patients get clinic details, directions and appointment times the moment they book.",
      },
      {
        title: "Smart reminders",
        body: "Automated reminders and instant alerts for any changes or cancellations.",
      },
    ],
  },
  {
    eyebrow: "Your clinic online",
    title: "Your clinic's digital business card",
    items: [
      {
        title: "Timings & location",
        body: "Clear shift hours, operating days, and map directions patients can find in seconds.",
      },
      {
        title: "Transparent fees",
        body: "Consultation and follow-up charges shown upfront — no awkward phone calls.",
      },
      {
        title: "Featured products",
        body: "Highlight clinic-recommended medicines, supplements and wellness products.",
      },
      {
        title: "Video content",
        body: "Embed health tips, education videos and a warm introduction to your clinic.",
      },
    ],
  },
  {
    eyebrow: "Records & documentation",
    title: "Leave the paper behind",
    items: [
      {
        title: "Digital prescriptions",
        body: "Clear, professional prescriptions, ready to print or share in seconds.",
      },
      {
        title: "Instant receipts",
        body: "Every payment documented automatically — nothing scribbled, nothing lost.",
      },
      {
        title: "Organized patient records",
        body: "Complete consultation history kept in one searchable place, visit after visit.",
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <Container className="flex flex-col gap-16 py-16 sm:py-20">
      <div className="flex flex-col gap-6">
        <SectionHeading
          eyebrow="Features"
          title="Every part of your front office, in one platform"
          lede="Booking, scheduling, communication and records — built around how a clinic actually runs its day."
        />
        <Callout eyebrow="Privacy, built in">
          We never sell your patients&rsquo; data — not to advertisers, not to data brokers, not to
          anyone. Privacy is designed into every feature below, from the first schema, not added
          on afterward.
        </Callout>
      </div>

      {SECTIONS.map((section) => (
        <div key={section.title} className="flex flex-col gap-6">
          <SectionHeading eyebrow={section.eyebrow} title={section.title} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) =>
              item.highlight ? (
                <div
                  key={item.title}
                  className="flex flex-col gap-1.5 rounded border border-rule border-l-[3px] border-l-accent bg-surface p-5 sm:col-span-2 lg:col-span-1"
                >
                  <h3 className="font-display text-base font-semibold text-ink">{item.title}</h3>
                  <p className="text-sm text-ink-2">{item.body}</p>
                </div>
              ) : (
                <div key={item.title} className="flex flex-col gap-1.5">
                  <h3 className="font-display text-base font-semibold text-ink">{item.title}</h3>
                  <p className="text-sm text-ink-2">{item.body}</p>
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </Container>
  );
}
