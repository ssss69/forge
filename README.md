# Forge

Forge is a premium personal growth operating system prototype. The first web surface combines deep focus, adaptive app blocking, AI coaching, RPG progression, analytics, communities, pricing, and launch strategy.

## Stack

- Vinext / React app router
- Cloudflare Sites deployment target
- Cloudflare D1 logical binding named `DB`
- Drizzle schema and migrations
- Node test runner

## Quick Start

```bash
npm install
npm run dev
npm test
```

## Backend Endpoints

- `GET /api/health`: service health.
- `POST /api/onboarding/generate-plan`: accepts onboarding answers and creates a generated routine, habits, goals, and blocking rules for the demo user.
- `GET /api/plan/today`: returns the current goal, missions, and next task.
- `GET /api/focus/sessions`: lists recent focus sessions.
- `POST /api/focus/sessions`: starts a focus session and awards starter XP.
- `GET /api/economy/profile`: returns level, XP, coins, title, and RPG stats.
- `GET /api/intelligence/summary`: returns focus score, deep work hours, distraction frequency, recovery score, and goal prediction.
- `GET /api/coach/insights`: returns or creates the latest coach insight.

The first backend pass uses `demo_user` so the routes can be exercised before authentication is wired. The next production step is to replace that with authenticated Sites headers or Supabase Auth identities.

## Database

The D1 binding is declared in `.openai/hosting.json` as `DB`. Drizzle schema lives in `db/schema.ts`, and generated SQL migrations live under `drizzle/`.

```bash
npm run db:generate
```

## Product Docs

- `docs/product-strategy.md`
- `docs/architecture.md`
- `docs/database-schema.sql`
- `docs/testing-deployment-launch.md`

## Validation

```bash
npm run build
npm run lint
npm test
```
