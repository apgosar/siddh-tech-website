import type { Metadata } from "next";
import { Container, SectionHeading, Callout } from "@siddh/ui";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <Container className="flex flex-col gap-8 py-16 sm:py-20">
      <SectionHeading eyebrow="Legal" title="Privacy Policy" />
      <Callout eyebrow="Draft — needs legal review before publishing">
        This is a placeholder. Replace with a privacy policy reviewed against
        the DPDP Act 2023 and each product's actual data practices (what's
        collected, why, retention periods, user rights, and how to exercise
        them) before this page is live.
      </Callout>
    </Container>
  );
}
