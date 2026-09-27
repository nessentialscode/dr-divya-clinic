-- ============================================================
-- Dr. Divya Clinic — Initial Database Schema
-- ============================================================

-- ------------------------------------------------------------
-- Services
-- ------------------------------------------------------------

create table public.services (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  description text,
  active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint services_name_not_empty
    check (length(trim(name)) > 0)
);

-- ------------------------------------------------------------
-- Appointments
-- ------------------------------------------------------------

create table public.appointments (
  id uuid primary key default gen_random_uuid(),

  patient_name text not null,
  phone text not null,

  service_id uuid not null
    references public.services(id)
    on delete restrict,

  preferred_date date not null,
  preferred_time time not null,

  message text,

  status text not null default 'pending',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint appointments_patient_name_not_empty
    check (length(trim(patient_name)) > 0),

  constraint appointments_phone_not_empty
    check (length(trim(phone)) > 0),

  constraint appointments_status_check
    check (
      status in (
        'pending',
        'contacted',
        'confirmed',
        'cancelled',
        'completed'
      )
    )
);

-- ------------------------------------------------------------
-- Indexes
-- ------------------------------------------------------------

create index appointments_service_id_idx
  on public.appointments(service_id);

create index appointments_preferred_date_idx
  on public.appointments(preferred_date);

create index appointments_status_idx
  on public.appointments(status);

create index appointments_created_at_idx
  on public.appointments(created_at desc);

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------

alter table public.services enable row level security;
alter table public.appointments enable row level security;

-- Services are public website content.
create policy "Services are publicly readable"
  on public.services
  for select
  to anon, authenticated
  using (active = true);

-- Appointments are intentionally NOT directly readable/writable
-- from the public frontend.
--
-- Appointment creation will be handled through a controlled
-- Supabase Edge Function.
--
-- No public INSERT/SELECT/UPDATE/DELETE policies are created here.