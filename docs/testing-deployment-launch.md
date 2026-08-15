# Testing, Deployment, and Launch

## Testing Strategy

- Unit tests: scoring, XP, coin costs, unlock eligibility, streak logic, schedule generation.
- Integration tests: onboarding plan generation, focus session lifecycle, subscription state, marketplace purchase.
- Mobile tests: blocking permissions, notification filtering, emergency unlock, offline sync.
- AI evals: helpfulness, shame-free tone, schedule correctness, burnout false positives.
- Accessibility tests: contrast, screen reader labels, keyboard navigation, reduced motion.
- Performance tests: cold launch, focus start latency, sync queue drain, animation frame stability.

## Deployment Guide

1. Provision Supabase project and enable Auth providers.
2. Apply `docs/database-schema.sql`.
3. Configure row-level security policies and storage buckets.
4. Deploy Edge Functions for AI coach, notifications, receipts, and marketplace webhooks.
5. Configure Stripe products: Free, Pro, Ultimate.
6. Build Flutter clients for iOS, Android, desktop, and web.
7. Configure browser extension app-blocking manifests.
8. Deploy web app and admin dashboard.
9. Set up monitoring, backups, analytics, and incident alerts.

## App Store and Play Store Assets

- App name: Forge.
- Subtitle: Personal Growth OS.
- Short description: Focus, habits, AI coaching, and rewards for real-life progress.
- Screenshots: Home dashboard, focus mode, adaptive blocking, AI coach, Habit DNA, communities.
- Preview video: 20 seconds showing onboarding to first focus session and reward reveal.
- Keywords: focus, productivity, habits, goals, study, screen time, AI coach.

## Marketing Strategy

- Position Forge as the personal growth OS, not another blocker.
- Launch wedge: students preparing for high-stakes exams and professionals seeking deep work.
- Content pillars: discipline without shame, adaptive blocking, future self, study rooms, AI planning.
- Growth loops: shareable badges, focus rooms, friend challenges, creator marketplace plans.
- Partnerships: study creators, productivity YouTubers, coaching communities, schools.

## Launch Roadmap

### Phase 1: Private Alpha

- Home, onboarding, focus timer, manual blocking rules, XP, daily review.
- 100 users across students and professionals.

### Phase 2: Beta

- Adaptive coins, AI coach, Habit DNA v1, Future Self video, friends.
- Creator-led study plans and initial communities.

### Phase 3: Public Launch

- Pro subscription, cross-device sync, browser extension, marketplace beta.
- App Store, Play Store, and web launch.

### Phase 4: Scale

- Teams, schools, family dashboards, advanced reporting, seasonal events.

## Future Feature Roadmap

- Wearable recovery signals.
- Location-aware Habit DNA.
- Shared family focus windows.
- AI-generated focus music.
- Creator revenue analytics.
- Enterprise coaching dashboards.
- Privacy-preserving cohort benchmarks.
