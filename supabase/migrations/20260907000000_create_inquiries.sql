create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  services text not null,
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;
