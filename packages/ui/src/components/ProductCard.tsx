import type { Product } from "@siddh/config";
import { getProductHref } from "@siddh/config";
import { Badge } from "./Badge";

export function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={getProductHref(product)}
      data-brand={product.id}
      className="group flex flex-col gap-3 rounded border border-rule border-l-[3px] border-l-accent bg-surface p-5 transition-colors hover:border-l-accent"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
          {product.name}
        </h3>
        <Badge tone={product.status === "live" ? "accent" : "neutral"}>
          {product.status === "live" ? "Live" : "In pipeline"}
        </Badge>
      </div>
      <p className="text-ink-2">{product.tagline}</p>
      <span className="mt-auto font-mono text-xs font-medium text-accent group-hover:underline">
        Visit {product.name} →
      </span>
    </a>
  );
}
