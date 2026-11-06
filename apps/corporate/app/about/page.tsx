import type { Metadata } from "next";
import { Container, SectionHeading, Button } from "@siddh/ui";
import { SITE, getProduct, getProductHref } from "@siddh/config";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE.name} builds AI-native software for operations-heavy industries in India: Neev CMS for real estate developers and SwasthyaConnect for clinics.`,
};

const neev = getProduct("neev");
const swasthya = getProduct("swasthyaconnect");

export default function AboutPage() {
  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-20">
      <SectionHeading
        level={1}
        eyebrow="About"
        title="Software for the people doing the work that still runs on paper and phone calls"
        lede={`${SITE.name} builds AI-native software for operations-heavy industries in India. We started with real estate construction and clinic practice management.`}
      />
      <div className="flex max-w-measure flex-col gap-4 text-ink-2">
        <p>
          Some of the most consequential work in India, building homes and treating patients, is still coordinated on
          spreadsheets, WhatsApp and phone calls. We build software for the people doing that work, and we judge it by
          whether it saves a real person real time.
        </p>
        <p>
          We have two products, in two unrelated industries. They do not share customers or a combined platform.
        </p>
        <ul className="flex flex-col gap-3">
          <li>
            <a href={getProductHref(neev)} className="font-semibold text-ink underline underline-offset-4 hover:text-accent">{neev.name}</a>
            {": "}a construction management system for real estate developers. In live pilot on 2 projects and 50+ units.
          </li>
          <li>
            <a href={getProductHref(swasthya)} className="font-semibold text-ink underline underline-offset-4 hover:text-accent">{swasthya.name}</a>
            {": "}online booking, WhatsApp reminders and a digital clinic card for clinics. Two clinic partners are live.
          </li>
        </ul>
        <p>
          {SITE.name} is made by {SITE.legalName}, in India, and founded by Ankur Gosar.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button href="/about/team" variant="secondary">
          Meet the team
        </Button>
        <Button href="/contact" variant="secondary">
          Talk to us
        </Button>
      </div>
    </Container>
  );
}
