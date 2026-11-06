"use client";

import { useState } from "react";

/** ₹ amount in Indian grouping, rounded to whole rupees. */
function rupees(n: number) {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

function lakh(n: number) {
  return `₹${(n / 100000).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} lakh`;
}

const FIELD =
  "w-full rounded-md border border-rule-strong bg-ground px-3 py-2.5 font-mono text-base text-ink outline-none focus-visible:border-accent";

function num(v: string, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

/**
 * The deck's sum (slide 15), with your numbers: demand x cost of funds x days / 365.
 * Illustrative simple interest at an assumed cost of funds, not a forecast.
 */
export function Calculator() {
  const [crore, setCrore] = useState("5");
  const [rate, setRate] = useState("12");
  const [days, setDays] = useState("10");
  const [count, setCount] = useState("10");

  const demand = num(crore, 0) * 10_000_000;
  const r = num(rate, 0) / 100;
  const d = num(days, 0);
  const n = Math.floor(num(count, 0));

  const perDay = (demand * r) / 365;
  const perMilestone = perDay * d;
  const total = perMilestone * n;
  const hours = 39 * n;

  return (
    <div className="grid gap-6 rounded-xl border border-rule bg-surface p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()} aria-label="Cost of delay inputs">
        <div className="flex flex-col gap-2">
          <label htmlFor="crore" className="font-mono text-xs uppercase tracking-wider text-muted">Demand per milestone (₹ crore)</label>
          <input id="crore" inputMode="decimal" value={crore} onChange={(e) => setCrore(e.target.value)} className={FIELD} />
          <div className="flex flex-wrap gap-2" role="group" aria-label="Typical demand sizes">
            {["2", "5", "10"].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setCrore(v)}
                aria-pressed={crore === v}
                className={`rounded-full border px-3 py-1 font-mono text-xs ${crore === v ? "border-accent bg-accent-soft text-accent-ink" : "border-rule-strong text-ink-2 hover:border-accent"}`}
              >
                ₹{v} Cr
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="rate" className="font-mono text-xs uppercase tracking-wider text-muted">Cost of funds (% a year)</label>
            <input id="rate" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} className={FIELD} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="days" className="font-mono text-xs uppercase tracking-wider text-muted">Days faster</label>
            <input id="days" inputMode="decimal" value={days} onChange={(e) => setDays(e.target.value)} className={FIELD} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="count" className="font-mono text-xs uppercase tracking-wider text-muted">Milestones</label>
          <input id="count" inputMode="numeric" value={count} onChange={(e) => setCount(e.target.value)} className={FIELD} />
        </div>
        <p className="text-xs leading-relaxed text-muted">
          Defaults are the deck&rsquo;s: a 12% yearly cost of funds, and 10 days faster, which is the pilot&rsquo;s saving on the payment leg (15 to 20 days down to 5 to 10).
        </p>
      </form>

      <div className="flex flex-col gap-5 rounded-lg bg-ground p-5" aria-live="polite">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">A late demand costs you</span>
          <span className="tnum font-display text-4xl font-black tracking-tight text-bad">{rupees(perDay)}</span>
          <span className="text-sm text-ink-2">for every day it is late</span>
        </div>
        <div className="flex flex-col gap-1 border-t border-rule pt-5">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">Paid {d} days sooner, you keep</span>
          <span className="tnum font-display text-3xl font-black tracking-tight text-accent">{lakh(perMilestone)}</span>
          <span className="text-sm text-ink-2">on each milestone</span>
        </div>
        <div className="flex flex-col gap-1 border-t border-rule pt-5">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">Over {n} milestones</span>
          <span className="tnum font-display text-3xl font-black tracking-tight text-ok">{lakh(total)}</span>
          <span className="text-sm text-ink-2">
            plus about <strong className="tnum text-ink">{hours.toLocaleString("en-IN")} hours</strong> of back-office time (39 hours a milestone: the pilot&rsquo;s 40 hours down to 1)
          </span>
        </div>
      </div>
    </div>
  );
}
