import type { Metadata } from "next";
import { Container, SectionHeading, Callout } from "@siddh/ui";

export const metadata: Metadata = {
  title: "Insights",
  description: "Perspective from Siddh Tech Solutions on AI in operations-heavy industries.",
};

// TODO: back this with MDX (see packages/content in the roadmap) once there's enough to publish regularly.
const POSTS: { title: string; slug: string; date: string; excerpt: string }[] = [];

export default function InsightsPage() {
  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Insights"
        title="What we're learning building for these industries"
        lede="Company-level perspective lives here. Product-specific guides (a RERA checklist, an ABDM readiness guide) belong on each product's own resources section instead."
      />
      {POSTS.length === 0 ? (
        <Callout eyebrow="Nothing published yet">
          Write the first piece from something you've actually learned
          building Neev or SwasthyaConnect — a real number, a real decision,
          a real mistake. That will outperform generic AI-industry commentary.
        </Callout>
      ) : (
        <div className="flex flex-col divide-y divide-rule border-y border-rule">
          {POSTS.map((post) => (
            <a key={post.slug} href={`/insights/${post.slug}`} className="flex flex-col gap-1 py-5">
              <span className="font-mono text-xs uppercase tracking-wide text-muted">{post.date}</span>
              <h3 className="font-display text-lg font-semibold text-ink">{post.title}</h3>
              <p className="text-sm text-ink-2">{post.excerpt}</p>
            </a>
          ))}
        </div>
      )}
    </Container>
  );
}
