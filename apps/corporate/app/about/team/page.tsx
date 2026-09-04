import type { Metadata } from "next";
import { Container, SectionHeading, Callout } from "@siddh/ui";

export const metadata: Metadata = {
  title: "Team",
  description: "The people behind Siddh Tech Solutions.",
};

// TODO: replace with real founder/team entries before launch.
const TEAM: { name: string; role: string; bio: string }[] = [];

export default function TeamPage() {
  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-20">
      <SectionHeading eyebrow="About · Team" title="The people building this" />
      {TEAM.length === 0 ? (
        <Callout eyebrow="Content needed">
          This page is scaffolded but empty. Add founder and team bios here —
          name, role, one line on background — before this page goes live.
        </Callout>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {TEAM.map((person) => (
            <div key={person.name} className="flex flex-col gap-1 rounded border border-rule bg-surface p-5">
              <h3 className="font-display text-base font-semibold text-ink">{person.name}</h3>
              <p className="font-mono text-xs uppercase tracking-wide text-muted">{person.role}</p>
              <p className="mt-2 text-sm text-ink-2">{person.bio}</p>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
