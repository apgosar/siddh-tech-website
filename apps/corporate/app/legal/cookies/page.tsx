import type { Metadata } from "next";
import { Container, SectionHeading, Callout } from "@siddh/ui";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <Container className="flex flex-col gap-8 py-16 sm:py-20">
      <SectionHeading eyebrow="Legal" title="Cookie Policy" />
      <Callout eyebrow="Draft — needs legal review before publishing">
        Placeholder. List the actual cookies/trackers each app sets (analytics,
        session) once analytics is wired up, per packages/config's analytics
        schema.
      </Callout>
    </Container>
  );
}
