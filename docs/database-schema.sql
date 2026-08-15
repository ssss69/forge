create extension if not exists pgcrypto;

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  age integer,
  occupation text,
  track text check (track in ('student', 'professional')),
  primary_goal text,
  created_at timestamptz not null default now()
);

create table goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  category text not null,
  target_date date,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  goal_id uuid references goals(id) on delete set null,
  title text not null,
  cadence jsonb not null,
  reward_xp integer not null default 25,
  reward_coins integer not null default 10
);

create table focus_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  planned_minutes integer not null,
  actual_minutes integer,
  strict_mode boolean not null default false,
  status text not null default 'active',
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

create table blocked_apps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  app_name text not null,
  coin_cost integer not null,
  unlock_rule jsonb not null
);

create table unlock_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  focus_session_id uuid references focus_sessions(id) on delete set null,
  app_name text not null,
  outcome text not null,
  created_at timestamptz not null default now()
);

create table economy_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  source_type text not null,
  source_id uuid,
  xp_delta integer not null default 0,
  coin_delta integer not null default 0,
  created_at timestamptz not null default now()
);

create table ai_insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  insight_type text not null,
  body text not null,
  evidence jsonb not null,
  created_at timestamptz not null default now()
);

create table communities (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null
);

create table community_memberships (
  user_id uuid not null references profiles(id) on delete cascade,
  community_id uuid not null references communities(id) on delete cascade,
  role text not null default 'member',
  joined_at timestamptz not null default now(),
  primary key (user_id, community_id)
);

create table marketplace_items (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  item_type text not null,
  price_cents integer not null,
  commission_bps integer not null default 2000,
  status text not null default 'review'
);
