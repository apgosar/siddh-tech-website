import { Container, Badge, Callout } from "@siddh/ui";
import { getProduct } from "@siddh/config";

const product = getProduct("neev");

export default function NeevHomePage() {
  return (
    <Container className="flex flex-col gap-8 py-20 sm:py-28">
      <Badge>Construction & Sales Management</Badge>
      <h1 className="max-w-2xl text-balance font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
        {product.tagline}
      </h1>
      <p className="max-w-measure text-lg text-ink-2">{product.description}</p>
      <Callout eyebrow="This is a stub">
        This app exists to prove the multi-zone routing works end to end —
        <code className="mx-1 rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em]">
          siddhtech.ai/neev
        </code>
        proxies here from apps/corporate while this deploys and scales on its
        own. Replace this page with the real Neev marketing site per the
        product template (role pages, feature pages, pricing, comparisons,
        demo) in the next build phase.
      </Callout>
    </Container>
  );
}
