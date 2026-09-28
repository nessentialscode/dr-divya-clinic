-- ============================================================
-- Dr. Divya Clinic — Specialists Schema
-- ============================================================

create table if not exists public.specialists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  specialty text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.appointments
  add column if not exists specialist_id uuid
  references public.specialists(id)
  on delete set null;

create index if not exists appointments_specialist_id_idx
  on public.appointments(specialist_id);

alter table public.specialists enable row level security;
