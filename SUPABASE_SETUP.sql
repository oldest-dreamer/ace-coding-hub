-- =============================================================================
-- Ace Coding Hub — Supabase Schema, Grants, RLS Policies & Admin Trigger
-- Run this script once in your Supabase SQL Editor (https://supabase.com/dashboard).
-- =============================================================================

-- 1. PROFILES TABLE (Learner Identity, Gamification & Admin Role)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  username text not null default 'Learner',
  full_name text,
  target_goal text not null default 'Competitive Programming',
  avatar_seed text not null default 'L',
  preferred_language text not null default 'python',
  theme text not null default 'dark' check (theme in ('dark', 'light')),
  xp int not null default 120 check (xp >= 0),
  level int not null default 1 check (level >= 1),
  streak_days int not null default 1 check (streak_days >= 1),
  contest_rating int not null default 1200,
  last_active_date date not null default current_date,
  is_admin boolean not null default false,
  updated_at timestamptz not null default now()
);

-- 2. USER PROGRESS TABLE (Chapters, Solved Problems, Bookmarks & Saved IDE Code)
create table if not exists public.user_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  item_id text not null,
  item_type text not null check (item_type in ('chapter', 'problem', 'bookmark', 'code')),
  status text not null default 'in_progress',
  saved_code text,
  language text,
  metadata jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, item_id)
);

create index if not exists idx_user_progress_user_type
  on public.user_progress (user_id, item_type);

-- 3. CONTENT OVERRIDES TABLE (Live Admin Lesson & Problem CMS)
create table if not exists public.content_overrides (
  id text primary key,
  target_type text not null check (target_type in ('chapter', 'problem', 'custom_problem')),
  payload jsonb not null default '{}'::jsonb,
  updated_by uuid references auth.users (id) on delete set null,
  updated_at timestamptz not null default now()
);

-- =============================================================================
-- EXPLICIT SCHEMA & TABLE GRANTS
-- =============================================================================
grant usage on schema public to anon, authenticated;

grant select, insert, update, delete on table public.profiles to authenticated;
grant select, insert, update, delete on table public.user_progress to authenticated;
grant select, insert, update, delete on table public.content_overrides to authenticated;
grant select on table public.content_overrides to anon;

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================
alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.content_overrides enable row level security;

-- Profiles RLS: Users can only read/write their own profile
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "profiles_delete_own" on public.profiles;
create policy "profiles_delete_own"
  on public.profiles for delete
  to authenticated
  using (auth.uid() = id);

-- User Progress RLS: Users can only manage their own progress & saved snippets
drop policy if exists "user_progress_select_own" on public.user_progress;
create policy "user_progress_select_own"
  on public.user_progress for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "user_progress_insert_own" on public.user_progress;
create policy "user_progress_insert_own"
  on public.user_progress for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "user_progress_update_own" on public.user_progress;
create policy "user_progress_update_own"
  on public.user_progress for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "user_progress_delete_own" on public.user_progress;
create policy "user_progress_delete_own"
  on public.user_progress for delete
  to authenticated
  using (auth.uid() = user_id);

-- Content Overrides RLS:
-- Public read for both anon (guest learners) and authenticated users
drop policy if exists "content_overrides_read_all" on public.content_overrides;
create policy "content_overrides_read_all"
  on public.content_overrides for select
  to anon, authenticated
  using (true);

-- Write/Delete strictly restricted to admins
drop policy if exists "content_overrides_admin_insert" on public.content_overrides;
create policy "content_overrides_admin_insert"
  on public.content_overrides for insert
  to authenticated
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_admin = true
    )
    or lower(coalesce(auth.jwt() ->> 'email', '')) = 'sciencesaru30@gmail.com'
  );

drop policy if exists "content_overrides_admin_update" on public.content_overrides;
create policy "content_overrides_admin_update"
  on public.content_overrides for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_admin = true
    )
    or lower(coalesce(auth.jwt() ->> 'email', '')) = 'sciencesaru30@gmail.com'
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_admin = true
    )
    or lower(coalesce(auth.jwt() ->> 'email', '')) = 'sciencesaru30@gmail.com'
  );

drop policy if exists "content_overrides_admin_delete" on public.content_overrides;
create policy "content_overrides_admin_delete"
  on public.content_overrides for delete
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_admin = true
    )
    or lower(coalesce(auth.jwt() ->> 'email', '')) = 'sciencesaru30@gmail.com'
  );

-- =============================================================================
-- AUTO-CREATE PROFILE TRIGGER ON AUTH.USERS SIGNUP
-- Automatically assigns is_admin = true when email matches sciencesaru30@gmail.com
-- =============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  derived_username text;
  derived_full_name text;
  derived_goal text;
  is_admin_account boolean;
begin
  derived_full_name := coalesce(
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'name',
    split_part(coalesce(new.email, 'Learner'), '@', 1)
  );
  derived_username := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'username'), ''),
    nullif(trim(derived_full_name), ''),
    'Learner'
  );
  derived_goal := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'target_goal'), ''),
    'Competitive Programming'
  );
  is_admin_account := (lower(coalesce(new.email, '')) = 'sciencesaru30@gmail.com');

  insert into public.profiles (
    id,
    email,
    username,
    full_name,
    target_goal,
    avatar_seed,
    is_admin
  )
  values (
    new.id,
    new.email,
    left(derived_username, 32),
    derived_full_name,
    derived_goal,
    upper(left(derived_username, 1)),
    is_admin_account
  )
  on conflict (id) do update
    set email = excluded.email,
        is_admin = (public.profiles.is_admin or excluded.is_admin),
        updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
