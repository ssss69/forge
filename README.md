# Forge

Forge is a premium personal growth operating system prototype. The first web surface combines deep focus, adaptive app blocking, AI coaching, RPG progression, analytics, communities, pricing, and launch strategy.

## Stack

- Mobile frontend: React Native + Expo + TypeScript
- Navigation: Expo Router
- Animations: React Native Reanimated
- Backend: Supabase Free
- Database: PostgreSQL through Supabase
- Authentication: Supabase Auth
- Storage: Supabase Storage free tier
- Push notifications: Expo Notifications
- Analytics: PostHog free tier
- AI: Groq free API
- Hosting/web dashboard: Vercel free tier
- Git/repository: GitHub Free at `https://github.com/ssss69/forge`
- Node test runner

## Quick Start

```bash
npm install
npm run dev
npm test
```

The Expo app lives in `apps/mobile`. Install and run it from that folder:

```bash
cd apps/mobile
npm install
npm run start
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

## Supabase Backend

Supabase migrations live in `supabase/migrations`. The first migration creates the Forge product tables, indexes, row-level security policies, Expo push token table, and private Future Self video storage bucket.

The Groq-powered AI coach lives in `supabase/functions/coach`.

## Legacy Web Prototype Database

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
