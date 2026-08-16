create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  age integer check (age >= 13 and age <= 100),
  occupation text,
  track text not null check (track in ('student', 'professional')),
  primary_goal text not null,
  timezone text not null default 'UTC',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  category text not null,
  target_date date,
  status text not null default 'active' check (status in ('active', 'paused', 'complete')),
  created_at timestamptz not null default now()
);

create table if not exists public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  goal_id uuid references public.goals(id) on delete set null,
  title text not null,
  cadence jsonb not null default '{}'::jsonb,
  reward_xp integer not null default 25,
  reward_coins integer not null default 10,
  created_at timestamptz not null default now()
);

create table if not exists public.focus_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  planned_minutes integer not null check (planned_minutes between 5 and 240),
  actual_minutes integer,
  strict_mode boolean not null default false,
  status text not null default 'active' check (status in ('active', 'completed', 'cancelled', 'emergency_unlocked')),
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

create table if not exists public.blocked_apps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  app_name text not null,
  coin_cost integer not null check (coin_cost >= 0),
  unlock_rule jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.unlock_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  focus_session_id uuid references public.focus_sessions(id) on delete set null,
  app_name text not null,
  outcome text not null check (outcome in ('blocked', 'unlocked', 'future_self_shown', 'emergency')),
  created_at timestamptz not null default now()
);

create table if not exists public.economy_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  source_type text not null,
  source_id uuid,
  xp_delta integer not null default 0,
  coin_delta integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  insight_type text not null,
  body text not null,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.push_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  expo_push_token text not null unique,
  platform text,
  created_at timestamptz not null default now()
);

create index if not exists idx_goals_user_created on public.goals(user_id, created_at desc);
create index if not exists idx_habits_user_created on public.habits(user_id, created_at desc);
create index if not exists idx_focus_sessions_user_started on public.focus_sessions(user_id, started_at desc);
create index if not exists idx_blocked_apps_user on public.blocked_apps(user_id);
create index if not exists idx_unlock_attempts_user_created on public.unlock_attempts(user_id, created_at desc);
create index if not exists idx_economy_events_user_created on public.economy_events(user_id, created_at desc);
create index if not exists idx_ai_insights_user_created on public.ai_insights(user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.goals enable row level security;
alter table public.habits enable row level security;
alter table public.focus_sessions enable row level security;
alter table public.blocked_apps enable row level security;
alter table public.unlock_attempts enable row level security;
alter table public.economy_events enable row level security;
alter table public.ai_insights enable row level security;
alter table public.push_tokens enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'profiles own rows') then
    create policy "profiles own rows" on public.profiles
      for all using (auth.uid() = id) with check (auth.uid() = id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'goals' and policyname = 'goals own rows') then
    create policy "goals own rows" on public.goals
      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'habits' and policyname = 'habits own rows') then
    create policy "habits own rows" on public.habits
      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'focus_sessions' and policyname = 'focus sessions own rows') then
    create policy "focus sessions own rows" on public.focus_sessions
      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'blocked_apps' and policyname = 'blocked apps own rows') then
    create policy "blocked apps own rows" on public.blocked_apps
      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'unlock_attempts' and policyname = 'unlock attempts own rows') then
    create policy "unlock attempts own rows" on public.unlock_attempts
      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'economy_events' and policyname = 'economy events own rows') then
    create policy "economy events own rows" on public.economy_events
      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'ai_insights' and policyname = 'ai insights own rows') then
    create policy "ai insights own rows" on public.ai_insights
      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'push_tokens' and policyname = 'push tokens own rows') then
    create policy "push tokens own rows" on public.push_tokens
      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
end $$;

insert into storage.buckets (id, name, public)
values ('future-self-videos', 'future-self-videos', false)
on conflict (id) do nothing;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'future self videos readable by owner') then
    create policy "future self videos readable by owner" on storage.objects
      for select using (
        bucket_id = 'future-self-videos'
        and auth.uid()::text = (storage.foldername(name))[1]
      );
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'future self videos writable by owner') then
    create policy "future self videos writable by owner" on storage.objects
      for insert with check (
        bucket_id = 'future-self-videos'
        and auth.uid()::text = (storage.foldername(name))[1]
      );
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'future self videos deletable by owner') then
    create policy "future self videos deletable by owner" on storage.objects
      for delete using (
        bucket_id = 'future-self-videos'
        and auth.uid()::text = (storage.foldername(name))[1]
      );
  end if;
end $$;
