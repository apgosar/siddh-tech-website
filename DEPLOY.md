# Deploying to Cloud Run

Three independent services — `siddh-corporate`, `siddh-neev`,
`siddh-swasthyaconnect` — one per app in the monorepo. `siddh-corporate` is
the only one the public domain points at; it proxies `/neev` and
`/swasthyaconnect` to the other two over plain HTTPS at request time (see
`apps/corporate/next.config.mjs`), so they can be deployed, scaled, and
rolled back independently.

`siddh-neev` and `siddh-swasthyaconnect` run in `asia-south1` (Mumbai) —
they're never hit directly by a browser, only server-to-server from
corporate's proxy, so the region only affects that one hop.
`siddh-corporate` runs in **`asia-southeast1` (Singapore)** instead: Cloud
Run domain mappings (the thing that lets `siddhtech.ai` point at a service
at all) aren't supported in `asia-south1` — Singapore is the closest region
that supports them. If that ever changes, moving corporate back is a matter
of redeploying it to `asia-south1` and recreating the domain mapping there.

**The `NEEV_ORIGIN` / `SWASTHYACONNECT_ORIGIN` env vars only work as Docker
build args, not as `gcloud run deploy --set-env-vars`.** Next.js resolves
`next.config.mjs`'s `rewrites()` destinations once, at `next build` time,
into `.next/routes-manifest.json` — it does not re-read them when the
standalone server starts. So corporate's build (step 2 below) always needs
`_NEEV_ORIGIN` / `_SWASTHYACONNECT_ORIGIN` substitutions pointing at real,
already-deployed URLs. (This also required declaring both as
`env: [...]` on the `build` task in `turbo.json` — Turborepo doesn't pass
arbitrary env vars through to a task's build command otherwise, and won't
invalidate its cache when they change.)

Builds run in **Cloud Build**, not on your machine — you don't need Docker
installed or running locally for any of this.

## 0. One-time setup

Requires the [gcloud CLI](https://cloud.google.com/sdk/docs/install), a GCP
project with billing enabled (a billing account is required even to stay
entirely within the free tier — GCP won't run Cloud Run without one, but it
won't charge you unless you exceed the free tier described in the pricing
notes we discussed), and picking a region (`asia-south1` — Mumbai — is the
obvious pick for an India-based audience; substitute your own below).

```bash
gcloud config set project YOUR_PROJECT_ID
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com

gcloud artifacts repositories create siddh-web \
  --repository-format=docker --location=asia-south1
```

## 1. Deploy neev and swasthyaconnect first

Corporate's rewrites need to know where these two land, so they go first.
Run this pair for each app (`neev`, then `swasthyaconnect`):

```bash
# --- neev ---
gcloud builds submit --config cloudbuild.yaml \
  --substitutions=_APP=neev,_IMAGE=asia-south1-docker.pkg.dev/YOUR_PROJECT_ID/siddh-web/neev .

gcloud run deploy siddh-neev \
  --image asia-south1-docker.pkg.dev/YOUR_PROJECT_ID/siddh-web/neev \
  --region asia-south1 --allow-unauthenticated
```

Note the URL it prints (`https://siddh-neev-xxxxx-as.a.run.app`). Repeat for
`swasthyaconnect`.

## 2. Deploy corporate, wired to both

Note the `_NEEV_ORIGIN` / `_SWASTHYACONNECT_ORIGIN` build substitutions —
required (see above), not optional — and that this deploys to
`asia-southeast1`, not `asia-south1` like the other two.

```bash
gcloud builds submit --config cloudbuild.yaml \
  --substitutions=_APP=corporate,_IMAGE=asia-south1-docker.pkg.dev/YOUR_PROJECT_ID/siddh-web/corporate,_NEEV_ORIGIN=https://siddh-neev-xxxxx-as.a.run.app,_SWASTHYACONNECT_ORIGIN=https://siddh-swasthyaconnect-xxxxx-as.a.run.app .

gcloud run deploy siddh-corporate \
  --image asia-south1-docker.pkg.dev/YOUR_PROJECT_ID/siddh-web/corporate \
  --region asia-southeast1 --allow-unauthenticated \
  --set-env-vars CONTACT_NOTIFY_TO=ankur@siddhtech.ai \
  --set-env-vars GMAIL_USER=you@gmail.com \
  --set-env-vars GMAIL_APP_PASSWORD=your16charapppassword
```

(`NEEV_ORIGIN` / `SWASTHYACONNECT_ORIGIN` are omitted from `--set-env-vars`
here deliberately — they don't do anything at this stage; see above.)

**On `GMAIL_APP_PASSWORD` as a plain env var:** this works, and is fine to
ship with while you're the only one touching this project — but it means
the password is visible in plain text to anyone who can run
`gcloud run services describe` or open this service in the Cloud Console.
Before handing access to anyone else, move it to Secret Manager instead:

```bash
printf 'your16charapppassword' | gcloud secrets create gmail-app-password --data-file=-
gcloud run deploy siddh-corporate --region asia-south1 \
  --set-secrets GMAIL_APP_PASSWORD=gmail-app-password:latest
  # (combine with the other --set-env-vars flags above)
```

## 3. Point the domain at it

Once `siddhtech.ai` is registered, and its ownership is verified in
[Search Console](https://search.google.com/search-console) (add it as a
Domain property, add the TXT record it gives you at your DNS host):

```bash
gcloud beta run domain-mappings create --service siddh-corporate \
  --domain siddhtech.ai --region asia-southeast1
```

`beta` and `--region` are both required — the GA `gcloud run
domain-mappings` command group doesn't accept `--region` at all. This
prints DNS records (A + AAAA, for the apex domain) to add at your
registrar — add exactly those. SSL provisioning starts automatically once
DNS resolves; no cert to buy or upload.

## 4. Redeploying after code changes

Same two commands as step 1 or 2 (`gcloud builds submit` then
`gcloud run deploy`), for whichever app changed — remember corporate's
`_NEEV_ORIGIN`/`_SWASTHYACONNECT_ORIGIN` build substitutions and its
`asia-southeast1` region if that's the one you're redeploying. There's no
CI/CD wired up yet — every deploy is a command you run by hand. Say if you
want a GitHub Actions workflow that does this automatically on push; it's a
fairly small addition once you're on GitHub.

## What this doesn't cover

**Domain email** (`ankur@siddhtech.ai`) isn't a Cloud Run concern — that's
DNS records on the domain itself, set up through whichever DNS provider you
point `siddhtech.ai` at (Cloudflare's free plan, most likely). Separate
task, not covered here.
