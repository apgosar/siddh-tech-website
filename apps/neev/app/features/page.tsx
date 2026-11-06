import type { Metadata } from "next";
import { Container } from "@siddh/ui";
import { MODULES, PROBLEMS } from "../../lib/content";
import { NAME, DESCRIPTOR } from "../../lib/site";
import { breadcrumbNode, graph, organizationNode, pageMetadata, softwareNode, webPageNode } from "../../lib/seo";
import { CtaBand } from "../_components/CtaBand";
import { JsonLd } from "../_components/JsonLd";
import { PageHead } from "../_components/PageHead";

const TITLE = "What Neev CMS does, in the order cash gets held back";
const DESCRIPTION = `${NAME} is ${DESCRIPTOR}. Five problems hold cash back: stock you can't see, late demands, paperwork typed by hand, KYC retyped from photos and no proof of what was sent. Here is how Neev removes each one.`;

export const metadata: Metadata = pageMetadata({ title: "Features", description: DESCRIPTION, path: "/features" });

const EXTRAS = [
  { t: "Security and handover", d: "Your own server or private cloud. PAN and Aadhaar stored encrypted. We keep no access after handover.", href: "/neev/security" },
  { t: "What faster collection is worth", d: "Redo the cost-of-delay sum with your demand size and cost of funds.", href: "/neev/roi-calculator" },
  { t: "Pilot results", d: "Days to demand, days to cash, hours spent and the share paid on time, from 2 live projects.", href: "/neev/results" },
];

export default function FeaturesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          organizationNode,
          softwareNode,
          webPageNode({ name: TITLE, description: DESCRIPTION, path: "/features" }),
          breadcrumbNode([{ name: "Features", path: "/features" }]),
        )}
      />
      <PageHead
        trail={[{ name: "Features" }]}
        eyebrow="Features"
        title={TITLE}
        answer={`${NAME} is ${DESCRIPTOR}. It removes five things that hold cash back, one page each, in this order: stock you can't see, late demands and late payers, paperwork typed by hand, KYC retyped from photos, and no proof of what was sent.`}
      />

      <section className="py-14 sm:py-20">
        <Container className="flex flex-col gap-12">
          {PROBLEMS.map((p) => {
            const mods = MODULES.filter((m) => m.problem === p.n);
            return (
              <div key={p.n} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Problem {p.n} of 5</span>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-ink">{p.name}</h2>
                  <q className="font-display text-lg text-ink-2 [quotes:'\201C'_'\201D']">{p.quote}</q>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {mods.map((m) => (
                    <a key={m.slug} href={`/neev/${m.slug}`} className="group flex flex-col gap-2 rounded-xl border border-rule bg-surface p-5 transition-colors hover:border-accent">
                      <h3 className="font-display text-lg font-bold text-ink">{m.name}</h3>
                      <p className="text-ink-2">{m.summary}</p>
                      <span className="mt-auto pt-2 font-mono text-xs font-medium text-accent group-hover:underline">Read more →</span>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="grid gap-4 border-t border-rule pt-10 sm:grid-cols-3">
            {EXTRAS.map((e) => (
              <a key={e.href} href={e.href} className="group flex flex-col gap-2 rounded-xl border border-dashed border-rule-strong p-5 hover:border-accent">
                <h3 className="font-display text-lg font-bold text-ink">{e.t}</h3>
                <p className="text-sm text-ink-2">{e.d}</p>
                <span className="mt-auto pt-2 font-mono text-xs font-medium text-accent group-hover:underline">Open →</span>
              </a>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
