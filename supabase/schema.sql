-- Database setup for the Yale Housing Catalog Supabase project (kjcuyyhcruuxplmrzlzt).
-- This is the final state of the migrations already applied to the project, kept here
-- for reference and for recreating the project. Running it against the live project
-- again will fail because the objects already exist.

-- Admin allow-list, in a schema the API does not expose.
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

create table private.admins (
  email text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);
alter table private.admins enable row level security;
insert into private.admins (email) values ('kapadiyamilind@gmail.com');

-- True only for a signed-in user whose confirmed email is on the allow-list.
create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from auth.users u
    join private.admins a on a.email = lower(u.email)
    where u.id = auth.uid()
      and u.email_confirmed_at is not null
  );
$$;
revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to authenticated;

create table public.rooms (
  id text primary key default gen_random_uuid()::text,
  college_id text not null,
  room_number text not null,
  entrance text not null,
  floor text not null,
  dimensions text not null default '',
  square_feet text not null default '',
  occupancy text not null default '',
  suite_type text not null default '',
  bath text not null default '',
  suite_details text not null default '',
  notes text not null default '',
  created_by uuid default auth.uid() references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index rooms_college_id_idx on public.rooms (college_id);
create index rooms_created_by_idx on public.rooms (created_by);

create table public.room_photos (
  id uuid primary key default gen_random_uuid(),
  room_id text not null references public.rooms (id) on delete cascade,
  url text not null,
  storage_path text unique,
  position integer not null default 0,
  created_at timestamptz not null default now()
);
create index room_photos_room_id_idx on public.room_photos (room_id, position);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
create trigger rooms_set_updated_at before update on public.rooms
  for each row execute function public.set_updated_at();

alter table public.rooms enable row level security;
alter table public.room_photos enable row level security;

create policy "Anyone can read rooms" on public.rooms
  for select to anon, authenticated using (true);
create policy "Admins can add rooms" on public.rooms
  for insert to authenticated with check ((select private.is_admin()));
create policy "Admins can edit rooms" on public.rooms
  for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins can delete rooms" on public.rooms
  for delete to authenticated using ((select private.is_admin()));

create policy "Anyone can read room photos" on public.room_photos
  for select to anon, authenticated using (true);
create policy "Admins can add room photos" on public.room_photos
  for insert to authenticated with check ((select private.is_admin()));
create policy "Admins can edit room photos" on public.room_photos
  for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins can delete room photos" on public.room_photos
  for delete to authenticated using ((select private.is_admin()));

-- Public bucket: photos are viewable by URL; only admins can upload, list, replace or delete.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('room-photos', 'room-photos', true, 10485760,
        array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/heic']);

create policy "Admins can upload room photos" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'room-photos' and (select private.is_admin()));
create policy "Admins can update room photos" on storage.objects
  for update to authenticated
  using (bucket_id = 'room-photos' and (select private.is_admin()))
  with check (bucket_id = 'room-photos' and (select private.is_admin()));
create policy "Admins can delete room photos" on storage.objects
  for delete to authenticated
  using (bucket_id = 'room-photos' and (select private.is_admin()));
create policy "Admins can list room photos" on storage.objects
  for select to authenticated
  using (bucket_id = 'room-photos' and (select private.is_admin()));

-- The 11 starter rooms from data.js were then inserted into public.rooms and
-- public.room_photos (photo urls point at assets/rooms/*.svg).
