import { jsonLdString } from "../../lib/seo";

/** Server-rendered JSON-LD block. Pass the object from graph(...). */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(data) }} />;
}
