import type { Metadata } from "next";
import { Container, SectionHeading, Button } from "@siddh/ui";

export const metadata: Metadata = {
  title: "About",
  description: "Why Siddh Tech Solutions exists and how we work.",
};

export default function AboutPage() {
  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-20">
      <SectionHeading
        eyebrow="About"
        title="Foundation, then health — one firm building for industries that run on paper and phone calls"
      />
      <div className="flex max-w-measure flex-col gap-4 text-ink-2">
        {/* TODO: replace with the real founding story — why "Siddh", why these
            two industries first, and what connects the founders' experience
            in construction/real estate and healthcare, if anything does. */}
        <p>
          Siddh Tech Solutions started with a simple observation: some of the
          most consequential, highest-stakes work in India — building homes,
          treating patients — is still coordinated on spreadsheets, WhatsApp
          and phone calls. We build software for the people doing that work.
        </p>
        <p>
          We started with two products in two unrelated industries: Neev, a
          construction and sales management system for real estate developers,
          and SwasthyaConnect, a practice management app for doctors. They
          don't share customers or a combined platform — what they share is
          how we build: AI-native from the first schema, compliant with Indian
          regulation by default, and judged by whether they save a real person
          real time.
        </p>
      </div>
      <div className="flex gap-3">
        <Button href="/about/team" variant="secondary">
          Meet the team
        </Button>
        <Button href="/careers" variant="secondary">
          See open roles
        </Button>
      </div>
    </Container>
  );
}
