# Noderax SaaS Site

`noderax-saas` is the public marketing site for Noderax. It is a Next.js app that presents the product, self-hosted installer flow, operational surfaces, and current control-plane positioning.

## Current Messaging Surface

The site now reflects the current product behavior:

- self-hosted installer-first onboarding
- copyable platform install command in the hero
- installer-managed setup flow at `/setup`
- HA runtime with `api-a`, `api-b`, `web`, and `nginx`
- official agent updates plus installer-managed control-plane updates
- workspace-aware operations, telemetry, terminals, notifications, and diagnostics

Hero install command:

```bash
curl -fsSL https://cdn.noderax.net/noderax-platform/install.sh | sudo bash
```

## Local Development

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build And Verification

```bash
pnpm lint
pnpm build
```

## Cloudflare Worker Deploy

`noderax-saas` is deployed as a Cloudflare Worker using `wrangler deploy`.

Primary commands:

```bash
pnpm worker:build
pnpm worker:deploy
```

Equivalent manual path:

```bash
pnpm worker:build
wrangler deploy
```

Requirements:

- `wrangler login` or `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- existing R2 bucket `noderax-saas-opennext-cache`

CI deploy is defined in `.github/workflows/worker-deploy.yml` and expects:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Project Notes

- The site is intentionally marketing-focused, not the operator console.
- Product claims here should stay aligned with:
  - `AI_CONTEXT.md`
  - `README.md`
  - `noderax-platform-release/README.md`
- When installer, setup, update-center, or release behavior changes, update this site copy at the same time so the public promise stays consistent with the shipped bundle.
