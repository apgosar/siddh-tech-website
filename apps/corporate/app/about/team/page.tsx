import type { Metadata } from "next";
import { Container, SectionHeading } from "@siddh/ui";
import { SITE } from "@siddh/config";
import { graph, jsonLdString, ORG_ID } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "Team",
  description: `The people behind ${SITE.name}: Ankur Gosar, an electronics engineer with 12+ years at Intel India, and Vinit Sangoi, a civil engineer and IBBI-registered valuer.`,
};

// From the Neev sales deck (slide 18). Photos and Vinit's profile link are not supplied yet; initials stand in.
const TEAM = [
  {
    id: "ankur-gosar",
    initials: "AG",
    name: "Ankur Gosar",
    role: "Founder, Siddh Tech Solutions",
    bio: "Electronics engineer with 12+ years at Intel India and an M.Tech from NIT Surat. Has architected modular systems and automated provisioning and release pipelines at scale.",
    link: "https://www.linkedin.com/in/ankurgosar",
  },
  {
    id: "vinit-sangoi",
    initials: "VS",
    name: "Vinit Sangoi",
    role: "Co-founder and CEO, VDS Advisory",
    bio: "Civil engineer with a postgraduate degree in Advanced Construction Management (NICMAR) and an IBBI-registered valuer. Previously handled mortgage valuation and construction funding at ICICI Bank and L&T Finance.",
    link: undefined,
  },
];

export default function TeamPage() {
  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            graph(
              ...TEAM.map((p) => ({
                "@type": "Person",
                "@id": `${SITE.url}/about/team#${p.id}`,
                name: p.name,
                jobTitle: p.role,
                description: p.bio,
                ...(p.link ? { sameAs: [p.link] } : {}),
                ...(p.id === "ankur-gosar" ? { worksFor: { "@id": ORG_ID } } : {}),
              })),
            ),
          ),
        }}
      />
      <SectionHeading
        level={1}
        eyebrow="About · Team"
        title="Built by engineers and real estate experts, together"
        lede="Engineering depth, and someone who has funded and valued construction projects. Neev CMS is in live pilot on 2 projects and 50+ residential and commercial units."
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {TEAM.map((person) => (
          <div key={person.name} className="flex gap-4 rounded border border-rule bg-surface p-5">
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-accent-soft font-display text-sm font-bold text-accent-ink" aria-hidden="true">
              {person.initials}
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="font-display text-base font-semibold text-ink">{person.name}</h2>
              <p className="font-mono text-xs uppercase tracking-wide text-muted">{person.role}</p>
              <p className="mt-1 text-sm text-ink-2">{person.bio}</p>
              {person.link ? (
                <a href={person.link} rel="noopener" className="mt-1 w-fit text-sm text-accent underline-offset-4 hover:underline">
                  LinkedIn
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
