# BlackRoad OS Demo Showcase

Demo-Gen-0 scaffolds a Next.js 14 app router experience that threads together the Core UI, API Gateway, Operator, and Agent Registry. It is text-only (no binaries) and uses Tailwind + shadcn-inspired components for rapid tinkering.

## Quickstart

```bash
pnpm i
pnpm dev # http://localhost:3000
```

Optional environment variables:

- `GATEWAY_URL=http://localhost:4000`
- `BEACON_URL=http://localhost:5000`
- `DEMO_JWT=<token>`

## Features

- **Tour wizard**: four steps (mock Core login → create agent → trigger job → watch Beacon update).
- **Agent registry table**: fetches `/agents` from the Gateway and validates with `zod`.
- **Live Beacon feed**: Server-Sent Events from `$BEACON_URL/stream`.
- **Code examples**: language tabs for TypeScript, Bash, and Curl.
- **Auth stub**: JWT header attached when present, otherwise public reads.

## Scripts

- `pnpm lint` — Next.js linting with Prettier alignment.
- `pnpm test` — Vitest component tests (jsdom).
- `pnpm test:e2e` — Playwright run; install browsers first via `pnpm exec playwright install`.
- `pnpm seed` — Emit README snippet helpers.
- `pnpm build` — Build and then inject `public/sig.beacon.json` via `postbuild`.

## Docker

```bash
docker build -t blackroad/demo:0.0.1 .
docker run -e PORT=3000 -p 3000:3000 blackroad/demo:0.0.1
```

## TODOs

- TODO(demo-next): Live agent chat surface inside the wizard.
- TODO(demo-next): Dark-mode code frame with syntax highlighting.
