# Siddh Web

Monorepo for Siddh Tech Solutions' web presence: the corporate site plus one
Next.js app per product, proxied onto `siddhtech.ai` at a subdirectory via
Next.js multi-zones. See `packages/config/src/routing.ts` for why, and
`next-config.mjs` in `apps/corporate` for how.

## Structure

```
apps/
  corporate/         siddhtech.ai — company site
  neev/               siddhtech.ai/neev — stub, replace per the product template
  swasthyaconnect/    siddhtech.ai/swasthyaconnect — stub, replace per the product template
packages/
  tokens/             color, type and spacing tokens shared by every app
  config/             product registry + the routing-mode switch
  ui/                 shared components (Header, Footer, ProductCard, etc.)
```

Adding a third product means: an entry in `packages/config/src/products.ts`,
an accent triad in `packages/tokens/src/tokens.css`, a new `apps/<product>`
built against the same route skeleton as `apps/neev`, and one line in
`apps/corporate/next.config.mjs`'s rewrites.

## Run it

```bash
npm install
npm run dev
```

This starts all three apps (corporate on :3000, Neev on :3001,
SwasthyaConnect on :3002) via Turborepo. Visit `localhost:3000`, then
`localhost:3000/neev` and `localhost:3000/swasthyaconnect` — those two are
served by the other two dev servers, proxied through the corporate app's
rewrites, exactly as they will be in production.

To run one app on its own: `npm run dev:corporate` (or `:neev`,
`:swasthyaconnect`).

## What's real vs. a placeholder

The corporate site's IA, copy and components are meant to ship. Marked with
`TODO` and a `Callout` in the page itself: team bios, careers listings, legal
text, trust-centre specifics (certifications, subprocessors), and the first
insights post — none of these should be invented, so they're scaffolded
empty rather than filled with placeholder claims.

`apps/neev` and `apps/swasthyaconnect` are intentionally thin stubs. Building
out their full site (role pages, feature pages, pricing, comparisons, case
studies) is the next phase — see the roadmap in the architecture plan.
