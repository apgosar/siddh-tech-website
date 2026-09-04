/**
 * Shared Tailwind preset. Every app extends this instead of redefining
 * color/type scales — a new brand overrides `--accent*` in tokens.css,
 * never Tailwind config.
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        ground: "var(--ground)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        muted: "var(--muted)",
        rule: "var(--rule)",
        "rule-strong": "var(--rule-strong)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        "accent-ink": "var(--accent-ink)",
        flag: "var(--flag)",
        "flag-soft": "var(--flag-soft)",
      },
      fontFamily: {
        display: ["var(--f-display)"],
        body: ["var(--f-body)"],
        mono: ["var(--f-mono)"],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      maxWidth: {
        measure: "var(--measure)",
      },
    },
  },
};
