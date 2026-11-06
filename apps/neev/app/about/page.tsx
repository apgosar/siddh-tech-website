import type { Metadata } from "next";
import { SITE } from "@siddh/config";
import { Container } from "@siddh/ui";
import { FOUNDERS, PILOT_CAVEAT } from "../../lib/content";
import { CONTACT, DESCRIPTOR, NAME, ORG_ID, TAGLINE, UPDATED, url } from "../../lib/site";
import { breadcrumbNode, graph, organizationNode, pageMetadata, softwareNode, webPageNode } from "../../lib/seo";
import { JsonLd } from "../_components/JsonLd";
import { PageHead } from "../_components/PageHead";

const TITLE = "Built by engineers and real estate experts, together";
const DESCRIPTION = `${NAME} is ${DESCRIPTOR}, built by Siddh Tech Solutions. Founded by Ankur Gosar, with Vinit Sangoi, a civil engineer and IBBI-registered valuer. In live pilot on 2 projects and 50+ units.`;

export const metadata: Metadata = pageMetadata({ title: "About", description: DESCRIPTION, path: "/about" });

const DATED = new Date(UPDATED).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const FACTS: [string, string][] = [
  ["What it is", `${NAME}, ${DESCRIPTOR}.`],
  ["What it does", "Moves a certified construction milestone to cash: live inventory and parking, milestone billing, collections with reminders and interest, quotations, demand letters and agreements for sale, PAN and Aadhaar reading, and a log of every message."],
  ["Who it is for", "Residential and commercial real estate developers in India: promoters, finance heads, sales teams and accounts teams."],
  ["Channels", "WhatsApp and email, sent together. Buyers who opted out are skipped."],
  ["Roles", "Super Admin, Admin, Sales, Viewer. Every important change is in the audit log."],
  ["Where it runs", "On your own server or private cloud. PAN and Aadhaar are stored encrypted. After handover we keep no access."],
  ["Pilot results", `Demand out the same day (was 7 to 10 days). Paid in 5 to 10 days (was 15 to 20). 1 hour of back-office work per milestone (was 40). 80 to 85% of demands paid by the due date (was 50%). ${PILOT_CAVEAT}`],
  ["How to start", "A one-project pilot: we set it up, you run a milestone, you compare, you decide."],
  ["Made by", `${SITE.legalName}, India.`],
  ["Contact", CONTACT.email],
  ["Last reviewed", DATED],
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          organizationNode,
          softwareNode,
          webPageNode({ name: TITLE, description: DESCRIPTION, path: "/about" }),
          breadcrumbNode([{ name: "About", path: "/about" }]),
          ...FOUNDERS.map((f) => ({
            "@type": "Person",
            "@id": `${url("/about")}#${f.name.toLowerCase().replace(/\s+/g, "-")}`,
            name: f.name,
            jobTitle: f.role,
            description: f.bio,
            ...(f.sameAs.length ? { sameAs: f.sameAs } : {}),
            ...(f.name === "Ankur Gosar" ? { worksFor: { "@id": ORG_ID } } : {}),
          })),
        )}
      />
      <PageHead
        trail={[{ name: "About" }]}
        eyebrow="About"
        title={TITLE}
        answer={`${NAME} is ${DESCRIPTOR}, made by ${SITE.name}. ${TAGLINE} It is in live pilot on 2 projects and 50+ residential and commercial units.`}
      />

      <section className="py-14 sm:py-20">
        <Container className="flex flex-col gap-12">
          <div className="grid gap-5 md:grid-cols-2">
            {FOUNDERS.map((f) => (
              <div key={f.name} className="flex gap-4 rounded-xl border border-rule bg-surface p-6">
                <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-accent-soft font-display text-base font-bold text-accent-ink" aria-hidden="true">{f.initials}</span>
                <div className="flex flex-col gap-1">
                  <h2 className="font-display text-xl font-bold text-ink">{f.name}</h2>
                  <p className="font-mono text-xs text-muted">{f.role}</p>
                  <p className="text-ink-2">{f.bio}</p>
                  {f.sameAs.map((href) => (
                    <a key={href} href={href} rel="noopener" className="w-fit text-sm text-accent underline-offset-4 hover:underline">
                      LinkedIn
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink">Neev CMS fact sheet</h2>
            <div className="overflow-hidden rounded-xl border border-rule">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">Neev CMS fact sheet, last reviewed {DATED}</caption>
                <tbody>
                  {FACTS.map(([k, v]) => (
                    <tr key={k} className="border-t border-rule first:border-t-0 align-top">
                      <th scope="row" className="w-40 bg-surface p-4 font-display text-sm font-semibold text-ink sm:w-56">{k}</th>
                      <td className="p-4 text-ink-2">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
