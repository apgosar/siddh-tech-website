import type { Metadata } from "next";
import { Container, SectionHeading, Callout } from "@siddh/ui";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at Siddh Tech Solutions.",
};

// TODO: wire to a real source (ATS, or a roles.ts registry) once hiring opens.
const OPEN_ROLES: { title: string; team: string; location: string }[] = [];

export default function CareersPage() {
  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Careers"
        title="Work on software that runs real operations"
        lede="We're a small team building two live products with real customers. If that's interesting, reach out even without a listed role."
      />
      {OPEN_ROLES.length === 0 ? (
        <Callout eyebrow="No open roles right now">
          Nothing posted at the moment. Email{" "}
          <a href="mailto:careers@siddhtech.ai" className="underline">
            careers@siddhtech.ai
          </a>{" "}
          if you'd like to talk anyway.
        </Callout>
      ) : (
        <div className="flex flex-col divide-y divide-rule border-y border-rule">
          {OPEN_ROLES.map((role) => (
            <div key={role.title} className="flex items-center justify-between gap-4 py-4">
              <div>
                <h3 className="font-display text-base font-semibold text-ink">{role.title}</h3>
                <p className="text-sm text-muted">{role.team}</p>
              </div>
              <span className="font-mono text-xs uppercase tracking-wide text-muted">{role.location}</span>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
