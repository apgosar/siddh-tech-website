"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Container } from "./Container";

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  brandName: string;
  /**
   * Custom icon + wordmark to render in place of the plain-text brand
   * treatment — used by the corporate site for the full siddhtech mark.
   * Product apps omit this and get the default glyph + brandName text.
   */
  brandMark?: ReactNode;
  /** shown after the brand name when this app belongs to a product, e.g. "by Siddh Tech" */
  endorsement?: { label: string; href: string };
  homeHref: string;
  links: NavLink[];
  cta?: NavLink;
}

/**
 * Shared header shell for every app in the monorepo. Each app supplies its
 * own brand name, nav links and CTA — the markup, spacing and endorsement
 * lockup stay identical so a new product site inherits this for free.
 */
export function Header({ brandName, brandMark, endorsement, homeHref, links, cta }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-surface/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <a href={homeHref} className="flex items-center gap-2.5">
            {brandMark ?? (
              <>
                <span className="relative block h-[22px] w-[22px] flex-none border-2 border-ink bg-surface">
                  <span className="absolute inset-x-[3px] top-[3px] border-t-2 border-ink" aria-hidden="true" />
                </span>
                <span className="font-display text-[0.95rem] font-semibold tracking-wide text-ink">
                  {brandName}
                </span>
              </>
            )}
          </a>
          {endorsement ? (
            <>
              <span className="h-4 w-px bg-rule-strong" aria-hidden="true" />
              <a
                href={endorsement.href}
                className="font-mono text-[0.72rem] uppercase tracking-wide text-muted hover:text-ink"
              >
                {endorsement.label}
              </a>
            </>
          ) : null}
        </div>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-sm font-medium text-ink-2 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          {cta ? (
            <a
              href={cta.href}
              className="inline-flex items-center rounded bg-ink px-4 py-2 font-display text-sm font-semibold text-surface hover:bg-ink-2"
            >
              {cta.label}
            </a>
          ) : null}
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded border border-rule text-ink md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
            <path d="M0 1H16M0 6H16M0 11H16" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      </Container>

      {open ? (
        <div className="border-t border-rule bg-surface md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded px-2 py-2.5 font-display text-sm font-medium text-ink-2 hover:bg-surface-2 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            {cta ? (
              <a
                href={cta.href}
                className="mt-1 inline-flex items-center justify-center rounded bg-ink px-4 py-2.5 font-display text-sm font-semibold text-surface"
              >
                {cta.label}
              </a>
            ) : null}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
