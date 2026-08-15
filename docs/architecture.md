# Forge Architecture

## Platform Stack

- Clients: Flutter for iOS, Android, Windows, macOS, and web shell; browser extension for desktop blocking.
- Web marketing/admin: React or Next-compatible front end.
- Backend: Supabase with PostgreSQL, Edge Functions, Realtime, Storage, Auth, and row-level security.
- Sync: offline-first local store on clients with conflict-aware background sync.
- AI: orchestration service that combines profile, goals, focus logs, habit events, and safety rules.
- Payments: Stripe subscriptions with App Store and Play Store receipt validation for mobile.
- Analytics: product events, retention funnels, model quality metrics, and privacy-preserving behavior aggregates.

## Backend Services

- Identity: Google, Apple, email magic link, family/team invite.
- Goal service: life goals, milestones, tasks, routines, and completion events.
- Focus service: sessions, blocked apps, emergency unlocks, breaks, focus analytics.
- Economy service: XP, levels, coins, badges, titles, seasons, rewards.
- Coach service: daily reviews, recommendations, burnout risk, tomorrow plan.
- Community service: guilds, study rooms, challenges, leaderboards, moderation.
- Marketplace service: creator plans, purchases, commissions, reviews.
- Notification service: personalized nudges with quiet hours and frequency caps.
- Admin service: user support, marketplace moderation, revenue, system health.

## AI Architecture

Inputs:

- User profile, goals, schedule, sleep, mood, workout, focus history, unlock attempts, app usage, community commitments.

Core jobs:

- Generate initial plan.
- Detect procrastination and burnout risk.
- Recommend focus length and break timing.
- Rewrite tomorrow's schedule.
- Produce daily review.
- Generate supportive notifications.
- Explain analytics in plain language.

Safety and trust:

- Never use shame language.
- Always explain schedule changes using evidence.
- Keep emergency unlock available according to user settings.
- Store model outputs with source event references.
- Allow users to delete coach memory.

## API Documentation

### Auth

- `POST /auth/session`: create session from provider token.
- `GET /me`: return profile, plan, subscription, and preferences.

### Onboarding

- `POST /onboarding/answers`: save one answer.
- `POST /onboarding/generate-plan`: create routine, habits, blocking rules, rewards, and milestones.

### Focus

- `POST /focus/sessions`: start session.
- `PATCH /focus/sessions/:id`: pause, complete, or emergency unlock.
- `GET /focus/analytics`: return focus score, deep work hours, distraction windows, and peak hours.

### Goals and Habits

- `POST /goals`: create goal.
- `POST /habits/:id/check-ins`: record check-in.
- `GET /plan/today`: return today's prioritized plan.

### Economy

- `POST /economy/award`: award XP, coins, badges, or titles.
- `GET /economy/profile`: return level, stats, streaks, and rewards.

### AI Coach

- `POST /coach/review`: generate daily review.
- `POST /coach/tomorrow`: create tomorrow plan.
- `GET /coach/insights`: return active recommendations.

### Marketplace

- `GET /marketplace/items`: browse plans and templates.
- `POST /marketplace/purchases`: buy item.
- `POST /creator/items`: publish creator item for review.

## Secure Architecture

- Row-level security on every user-owned table.
- Encrypted storage for Future Self videos.
- Signed URLs for video playback.
- Separate analytics tables from personally sensitive content.
- Audit logs for admin actions.
- Rate limits on AI and unlock endpoints.
- App integrity checks for mobile blocking APIs.

## Admin Dashboard

- User search and account support.
- Subscription and receipt status.
- Marketplace review queue.
- Community moderation queue.
- AI output audit samples.
- Revenue, activation, retention, and churn dashboards.
- Blocking health and client sync error monitoring.

