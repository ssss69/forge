# Forge Target Stack

## Product Stack

- Frontend: React Native + Expo + TypeScript
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

## Repo Shape

- `apps/mobile`: Expo Router mobile app.
- `supabase/migrations`: PostgreSQL schema, indexes, RLS policies, storage bucket setup.
- `supabase/functions`: Supabase Edge Functions, including the Groq-powered coach endpoint.
- Root app: current Forge web dashboard prototype, deployable as the web dashboard.

## Required Environment Variables

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `EXPO_PUBLIC_POSTHOG_KEY`
- `EXPO_PUBLIC_POSTHOG_HOST`
- `GROQ_API_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Next Backend Milestones

1. Wire Supabase Auth screens in Expo.
2. Replace demo mobile writes with authenticated `user_id` writes.
3. Add RPC functions for XP, coin awards, and focus completion.
4. Add Supabase Storage upload flow for Future Self videos.
5. Add Expo push-token registration to `push_tokens`.
6. Create Vercel dashboard API routes that call Supabase with service role permissions.
