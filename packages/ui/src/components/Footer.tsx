import type { ReactNode } from "react";
import { Container } from "./Container";
import type { NavLink } from "./Header";

export interface FooterProps {
  brandName: string;
  /** optional lockup shown beside the link columns: logo, one line about the product, contact */
  brand?: ReactNode;
  /** e.g. "Part of Siddh Tech Solutions" — omit on the corporate site itself */
  parentLine?: { label: string; href: string };
  columns: { heading: string; links: NavLink[] }[];
  legalLinks: NavLink[];
  legalName: string;
}

export function Footer({ brandName, brand, parentLine, columns, legalLinks, legalName }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule bg-surface">
      <Container className="flex flex-col gap-10 py-12">
        <div className={brand ? "grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)]" : undefined}>
          {brand ? <div className="flex flex-col gap-3">{brand}</div> : null}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <h4 className="font-display text-sm font-semibold text-ink">{column.heading}</h4>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm text-ink-2 hover:text-ink">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-rule pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <span>
              © {year} {brandName}
              {parentLine ? (
                <>
                  {" · "}
                  <a href={parentLine.href} className="hover:text-ink">
                    {parentLine.label}
                  </a>
                </>
              ) : (
                <> · {legalName}</>
              )}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {legalLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-ink">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
