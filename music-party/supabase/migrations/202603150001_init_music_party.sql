create extension if not exists "pgcrypto";

create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  join_code text not null unique,
  host_user_id uuid not null references auth.users(id) on delete cascade,
  host_service text not null check (host_service in ('spotify')),
  status text not null default 'active' check (status in ('active', 'closed')),
  current_song_request_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_rooms_join_code on public.rooms(join_code);
create index if not exists idx_rooms_host_user on public.rooms(host_user_id);

create table if not exists public.room_members (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  display_name text not null,
  avatar_url text,
  role text not null check (role in ('host', 'guest')),
  joined_at timestamptz not null default now(),
  left_at timestamptz,
  unique(room_id, user_id)
);

create index if not exists idx_room_members_room on public.room_members(room_id);
create index if not exists idx_room_members_user on public.room_members(user_id);

create table if not exists public.song_requests (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  submitted_by_user_id uuid not null references auth.users(id) on delete cascade,
  original_input text not null,
  original_source_type text not null check (original_source_type in ('search', 'spotify_link', 'apple_music_link', 'youtube_link', 'manual')),
  normalized_title text not null,
  normalized_artist text not null,
  normalized_album text,
  duration_ms integer,
  explicit_preference text check (explicit_preference in ('explicit', 'clean', 'no_preference')),
  status text not null check (status in ('pending', 'matched', 'review_needed', 'failed', 'approved', 'queued', 'played', 'skipped')),
  queue_position integer,
  added_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_song_requests_room on public.song_requests(room_id);
create index if not exists idx_song_requests_status on public.song_requests(status);
create index if not exists idx_song_requests_queue_position on public.song_requests(room_id, queue_position) where queue_position is not null;

create table if not exists public.track_mappings (
  id uuid primary key default gen_random_uuid(),
  song_request_id uuid not null references public.song_requests(id) on delete cascade,
  provider text not null check (provider in ('spotify')),
  provider_track_id text not null,
  provider_uri text not null,
  matched_title text not null,
  matched_artist text not null,
  matched_album text,
  matched_duration_ms integer,
  artwork_url text,
  is_explicit boolean,
  confidence_score numeric(4,3) not null check (confidence_score >= 0 and confidence_score <= 1),
  match_reason jsonb not null default '{}'::jsonb,
  review_needed boolean not null default false,
  is_primary boolean not null default true,
  created_at timestamptz not null default now()
);

create unique index if not exists uq_track_mappings_song_request_primary
  on public.track_mappings(song_request_id)
  where is_primary = true;

create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  song_request_id uuid not null references public.song_requests(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  vote_value integer not null check (vote_value in (-1, 1)),
  created_at timestamptz not null default now(),
  unique(user_id, song_request_id)
);

create index if not exists idx_votes_room_song on public.votes(room_id, song_request_id);

create table if not exists public.host_provider_sessions (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null unique references public.rooms(id) on delete cascade,
  provider text not null check (provider in ('spotify')),
  provider_account_id text,
  access_token_encrypted text not null,
  refresh_token_encrypted text not null,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.rooms
  add constraint rooms_current_song_request_fk
  foreign key (current_song_request_id) references public.song_requests(id) on delete set null;

-- Realtime publications
alter publication supabase_realtime add table public.rooms;
alter publication supabase_realtime add table public.room_members;
alter publication supabase_realtime add table public.song_requests;
alter publication supabase_realtime add table public.votes;

alter table public.rooms enable row level security;
alter table public.room_members enable row level security;
alter table public.song_requests enable row level security;
alter table public.track_mappings enable row level security;
alter table public.votes enable row level security;
alter table public.host_provider_sessions enable row level security;

-- Basic membership-based access policy
create policy "members can read rooms" on public.rooms
for select using (
  exists (
    select 1 from public.room_members rm
    where rm.room_id = rooms.id and rm.user_id = auth.uid() and rm.left_at is null
  )
);

create policy "host can create room" on public.rooms
for insert with check (host_user_id = auth.uid());

create policy "members can read room_members" on public.room_members
for select using (
  exists (
    select 1 from public.room_members rm
    where rm.room_id = room_members.room_id and rm.user_id = auth.uid() and rm.left_at is null
  )
);

create policy "user can insert own room membership" on public.room_members
for insert with check (user_id = auth.uid());

create policy "members can read song_requests" on public.song_requests
for select using (
  exists (
    select 1 from public.room_members rm
    where rm.room_id = song_requests.room_id and rm.user_id = auth.uid() and rm.left_at is null
  )
);

create policy "members can insert song requests" on public.song_requests
for insert with check (
  submitted_by_user_id = auth.uid() and
  exists (
    select 1 from public.room_members rm
    where rm.room_id = song_requests.room_id and rm.user_id = auth.uid() and rm.left_at is null
  )
);
