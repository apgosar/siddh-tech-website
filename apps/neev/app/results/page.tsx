import type { Metadata } from "next";
import { Container } from "@siddh/ui";
import { PILOT_CAVEAT, RESULTS } from "../../lib/content";
import { NAME } from "../../lib/site";
import { breadcrumbNode, graph, organizationNode, pageMetadata, softwareNode, webPageNode } from "../../lib/seo";
import { CtaBand } from "../_components/CtaBand";
import { JsonLd } from "../_components/JsonLd";
import { PageHead } from "../_components/PageHead";
import { Timelines } from "../_components/Timelines";

const TITLE = "What our pilot projects saw";
const DESCRIPTION = `Pilot results for ${NAME} from 2 live projects and 50+ units: demand out the same day instead of 7 to 10 days, payment in 5 to 10 days instead of 15 to 20, 1 hour of back-office work per milestone instead of 40.`;

export const metadata: Metadata = pageMetadata({ title: "Pilot results", description: DESCRIPTION, path: "/results" });

export default function ResultsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          organizationNode,
          softwareNode,
          webPageNode({ name: TITLE, description: DESCRIPTION, path: "/results" }),
          breadcrumbNode([{ name: "Pilot results", path: "/results" }]),
        )}
      />
      <PageHead
        trail={[{ name: "Pilot results" }]}
        eyebrow="Pilot results"
        title={TITLE}
        answer="In our live pilot on 2 projects and 50+ residential and commercial units, the demand went out the same day the milestone was certified, payment arrived in 5 to 10 days instead of 15 to 20, and back-office effort per milestone fell from 40 hours to 1."
      />

      <section className="py-14 sm:py-20">
        <Container className="flex flex-col gap-10">
          <div className="overflow-x-auto rounded-xl border border-rule">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="sr-only">Pilot averages, manual process against the same process on Neev CMS</caption>
              <thead>
                <tr className="bg-surface text-sm text-muted">
                  <th scope="col" className="p-4 font-medium">Measure</th>
                  <th scope="col" className="p-4 font-medium">Before (manual)</th>
                  <th scope="col" className="p-4 font-medium">With Neev</th>
                  <th scope="col" className="p-4 font-medium">What it measures</th>
                </tr>
              </thead>
              <tbody>
                {RESULTS.map((r) => (
                  <tr key={r.label} className="border-t border-rule">
                    <th scope="row" className="p-4 font-display font-semibold text-ink">{r.label}</th>
                    <td className="tnum p-4 text-ink-2">{r.before}</td>
                    <td className="tnum p-4 font-display text-lg font-bold text-ok">{r.after}</td>
                    <td className="p-4 text-sm text-ink-2">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex max-w-measure flex-col gap-3 rounded-xl border-l-[3px] border-l-flag bg-flag-soft p-5">
            <h2 className="font-display text-lg font-bold text-ink">How to read these figures</h2>
            <ul className="flex flex-col gap-2 text-ink-2">
              <li>{PILOT_CAVEAT}</li>
              <li>These are averages across the pilot, not promises. Before a pilot we ask you to measure your own baseline, so the comparison is yours.</li>
              <li>
                The whole path, certificate to cash, is about 26 days by hand (the midpoints of 7 to 10 and 15 to 20) and
                5 to 10 days with Neev, roughly 18 days sooner at the midpoints. On the payment leg alone it is about 10 days
                faster, which is the figure the calculator uses.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink">One milestone, two timelines</h2>
            <Timelines />
          </div>
        </Container>
      </section>
      <CtaBand title="Measure it on your own project" body="Start with one project and judge by your own numbers." />
    </>
  );
}
