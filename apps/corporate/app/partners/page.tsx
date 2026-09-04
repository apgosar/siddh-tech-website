import type { Metadata } from "next";
import { Container, SectionHeading, Button, Callout } from "@siddh/ui";

export const metadata: Metadata = {
  title: "Partners",
  description: "Reseller and implementation partnerships with Siddh Tech Solutions.",
};

export default function PartnersPage() {
  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Partners"
        title="Implementation and reseller partners"
        lede="We're early — this program isn't formalized yet, but we're open to conversations with firms already embedded with real estate developers or clinics."
      />
      <Callout eyebrow="Program status">
        {/* TODO: replace with real partner terms once there's a first partner to formalize them with. */}
        No structured partner program yet. If you work with real estate
        developers or healthcare practices and think there's a fit, reach out
        directly rather than waiting for a formal application process.
      </Callout>
      <Button href="/contact" className="w-fit">
        Start a conversation
      </Button>
    </Container>
  );
}
