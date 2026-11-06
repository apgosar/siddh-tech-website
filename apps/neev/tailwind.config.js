const tokensPreset = require("@siddh/tokens/tailwind-preset");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tokensPreset],
  content: ["./app/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // The product's own status colours (see globals.css).
        ok: "var(--ok)",
        warn: "var(--warn)",
        bad: "var(--bad)",
        info: "var(--info)",
      },
    },
  },
};
