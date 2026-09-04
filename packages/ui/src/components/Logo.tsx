import type { CSSProperties } from "react";

/**
 * The Siddh Tech mark: a dot, a plinth, and a crescent — settled on after
 * several rounds of exploration (stepped "plinth" alone, crescent alone,
 * then this combination). Native aspect ratio is 64:54; consumers set
 * height and let width follow, since the two aren't proportioned 1:1.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="32" cy="9" r="5" fill="currentColor" />
      <rect x="18" y="25" width="28" height="7" fill="currentColor" />
      <path
        d="M8 38 A26 26 0 0 0 56 38 A44.643 44.643 0 0 1 8 38 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Arrow geometry for the "t" in the wordmark, in em units relative to the
 * surrounding text's font-size. Measured off Archivo 700's real metrics
 * (advance .342em, ascender .68em) so the arrow sits exactly where the
 * letter's stem and crossbar would be, rather than approximately.
 */
const ARROW = {
  shaft: 0.78,
  shaftWidth: 0.17,
  barBottom: 0.28,
  barWidth: 0.34,
  barHeight: 0.085,
  headWidth: 0.4,
  headHeight: 0.34,
};

function ArrowT() {
  // This span has no in-flow content and an explicit height of 0, so per
  // the CSS baseline rule it takes its own bottom margin edge as its
  // baseline — which is what actually lines up with the surrounding text.
  // (An earlier version wrapped a real "t" character here; a text box's
  // content height includes the font's descender space below the
  // baseline, which quietly pushed the arrow below the line it should
  // have been standing on.)
  const wrapperStyle: CSSProperties = {
    display: "inline-block",
    position: "relative",
    width: "0.342em",
    height: 0,
    verticalAlign: "baseline",
  };
  const centered: CSSProperties = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  };
  return (
    <span style={wrapperStyle}>
      <span className="sr-only">t</span>
      <span
        aria-hidden="true"
        style={{
          ...centered,
          bottom: 0,
          width: `${ARROW.shaftWidth}em`,
          height: `${ARROW.shaft}em`,
          background: "currentColor",
        }}
      />
      <span
        aria-hidden="true"
        style={{
          ...centered,
          bottom: `${ARROW.barBottom}em`,
          width: `${ARROW.barWidth}em`,
          height: `${ARROW.barHeight}em`,
          background: "currentColor",
        }}
      />
      <span
        aria-hidden="true"
        style={{
          ...centered,
          bottom: `${ARROW.shaft}em`,
          width: 0,
          height: 0,
          borderLeft: `${ARROW.headWidth / 2}em solid transparent`,
          borderRight: `${ARROW.headWidth / 2}em solid transparent`,
          borderBottom: `${ARROW.headHeight}em solid currentColor`,
        }}
      />
    </span>
  );
}

/**
 * The "siddhtech" wordmark. Renders as real text (so it stays selectable
 * and reads correctly to screen readers as "siddhtech") with the "t"
 * visually replaced by an arrow — apply font-display + weight/size via
 * className, the same way any other text element in this design system is
 * styled.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      siddh
      <ArrowT />
      ech
    </span>
  );
}
