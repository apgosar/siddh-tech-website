import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@siddh/ui";
import { MODULES, getModule } from "../../lib/content";
import { graph, breadcrumbNode, faqNode, organizationNode, pageMetadata, softwareNode, webPageNode } from "../../lib/seo";
import { CtaBand } from "../_components/CtaBand";
import { FaqList } from "../_components/Faq";
import { JsonLd } from "../_components/JsonLd";
import { PageHead } from "../_components/PageHead";
import { Shot } from "../_components/Shot";

// Only the six module slugs exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return MODULES.map((m) => ({ module: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ module: string }> }): Promise<Metadata> {
  const m = getModule((await params).module);
  if (!m) return {};
  return pageMetadata({ title: m.metaTitle, description: m.metaDescription, path: `/${m.slug}` });
}

export default async function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const m = getModule((await params).module);
  if (!m) notFound();

  const path = `/${m.slug}`;
  const related = m.related
    .map((slug) => MODULES.find((x) => x.slug === slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <>
      <JsonLd
        data={graph(
          organizationNode,
          softwareNode,
          webPageNode({ name: m.metaTitle, description: m.metaDescription, path }),
          breadcrumbNode([{ name: "Features", path: "/features" }, { name: m.name, path }]),
          faqNode(m.faqs),
        )}
      />

      <PageHead
        trail={[{ name: "Features", href: "/neev/features" }, { name: m.name }]}
        eyebrow={`Problem ${m.problem} of 5 · ${m.problemName}`}
        title={m.title}
        answer={m.answer}
      >
        <q className="font-display text-xl font-semibold text-ink-2 [quotes:'\201C'_'\201D']">{m.quote}</q>
      </PageHead>

      {m.sections.map((s, i) => (
        <section key={s.heading} className={`py-14 sm:py-20 ${i % 2 === 1 ? "border-y border-rule bg-surface" : ""}`}>
          <Container className="flex flex-col gap-8">
            <div className="flex max-w-measure flex-col gap-4">
              <h2 className="text-balance font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{s.heading}</h2>
              <p className="text-lg text-ink-2">{s.body}</p>
              {s.points ? (
                <ul className="flex flex-col gap-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-ink-2">
                      <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            {s.shots ? (
              <div
                className={
                  s.shots.length === 1
                    ? s.shots[0] === "demand-on-whatsapp"
                      ? "max-w-xs"
                      : "max-w-5xl"
                    : "grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3"
                }
              >
                {s.shots.map((name) => (
                  <Shot key={name} name={name} />
                ))}
              </div>
            ) : null}
          </Container>
        </section>
      ))}

      <section className="border-t border-rule py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div className="flex flex-col gap-4">
            <h2 className="text-balance font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Questions about {m.name.toLowerCase()}</h2>
            <p className="text-ink-2">
              More in the <a href="/neev/faq" className="text-accent underline-offset-4 hover:underline">full FAQ</a>.
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <a href={`/neev/${r.slug}`} className="group flex flex-col rounded-lg border border-rule p-4 hover:border-accent">
                    <span className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">Next</span>
                    <span className="font-display font-bold text-ink">{r.name}</span>
                    <span className="text-sm text-ink-2">{r.summary}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <FaqList items={m.faqs} open />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
