-- ============================================================
-- Dr. Divya Clinic — Admin Portal Schema & Policies
-- ============================================================

-- ------------------------------------------------------------
-- 1. Clinics / Branches Table
-- ------------------------------------------------------------

create table if not exists public.clinics (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  active boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint clinics_name_not_empty check (length(trim(name)) > 0)
);

-- Seed initial Dr. Divya Clinic branches if empty
insert into public.clinics (name, location, active, display_order)
select 'Dr. Divya Clinic — Main Branch', 'Kottakkal, Kerala', true, 1
where not exists (select 1 from public.clinics where name like '%Main Branch%');

insert into public.clinics (name, location, active, display_order)
select 'Dr. Divya Clinic — City Center', 'Malappuram, Kerala', true, 2
where not exists (select 1 from public.clinics where name like '%City Center%');

-- ------------------------------------------------------------
-- 2. Patient Feedback / Testimonials Table
-- ------------------------------------------------------------

create table if not exists public.patient_feedback (
  id uuid primary key default gen_random_uuid(),
  patient_name text not null,
  treatment text,
  rating int not null default 5 check (rating >= 1 and rating <= 5),
  message text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint feedback_patient_name_not_empty check (length(trim(patient_name)) > 0),
  constraint feedback_message_not_empty check (length(trim(message)) > 0)
);

-- Seed existing patient testimonials into patient_feedback
insert into public.patient_feedback (patient_name, treatment, rating, message, status)
select 'Marvin McKinney', 'General Dentistry', 5, 'I was nervous at first, but Dr. Thompson explained everything clearly and the treatment was completely pain-free.', 'approved'
where not exists (select 1 from public.patient_feedback where patient_name = 'Marvin McKinney');

insert into public.patient_feedback (patient_name, treatment, rating, message, status)
select 'Michael H.', 'Dental Implants', 5, 'After struggling for years with missing teeth, I can finally eat and speak comfortably. The team were so professional.', 'approved'
where not exists (select 1 from public.patient_feedback where patient_name = 'Michael H.');

insert into public.patient_feedback (patient_name, treatment, rating, message, status)
select 'Esther K.', 'Cosmetic Smile Design', 5, 'Absolutely thrilled with my results! Dr. Emma made me feel at ease from the moment I walked in. I finally love my smile in photos!', 'approved'
where not exists (select 1 from public.patient_feedback where patient_name = 'Esther K.');

-- ------------------------------------------------------------
-- 3. Row Level Security Configuration
-- ------------------------------------------------------------

alter table public.clinics enable row level security;
alter table public.patient_feedback enable row level security;
alter table public.specialists enable row level security;
alter table public.appointments enable row level security;

-- Clinics policies
drop policy if exists "Clinics are publicly readable when active" on public.clinics;
create policy "Clinics are publicly readable when active"
  on public.clinics
  for select
  to anon, authenticated
  using (active = true);

drop policy if exists "Staff can view all clinics" on public.clinics;
create policy "Staff can view all clinics"
  on public.clinics
  for select
  to authenticated
  using (true);

drop policy if exists "Staff can update clinics" on public.clinics;
create policy "Staff can update clinics"
  on public.clinics
  for update
  to authenticated
  using (true)
  with check (true);

-- Specialists policies
drop policy if exists "Specialists are publicly readable when active" on public.specialists;
create policy "Specialists are publicly readable when active"
  on public.specialists
  for select
  to anon
  using (active = true);

drop policy if exists "Staff can view all specialists" on public.specialists;
create policy "Staff can view all specialists"
  on public.specialists
  for select
  to authenticated
  using (true);

drop policy if exists "Staff can update specialists availability" on public.specialists;
create policy "Staff can update specialists availability"
  on public.specialists
  for update
  to authenticated
  using (true)
  with check (true);

-- Appointments policies
drop policy if exists "Staff can view all appointments" on public.appointments;
create policy "Staff can view all appointments"
  on public.appointments
  for select
  to authenticated
  using (true);

drop policy if exists "Staff can update appointments" on public.appointments;
create policy "Staff can update appointments"
  on public.appointments
  for update
  to authenticated
  using (true)
  with check (true);

-- Patient Feedback policies
drop policy if exists "Approved feedback is publicly readable" on public.patient_feedback;
create policy "Approved feedback is publicly readable"
  on public.patient_feedback
  for select
  to anon, authenticated
  using (status = 'approved');

drop policy if exists "Staff can view all feedback" on public.patient_feedback;
create policy "Staff can view all feedback"
  on public.patient_feedback
  for select
  to authenticated
  using (true);

drop policy if exists "Staff can update feedback status" on public.patient_feedback;
create policy "Staff can update feedback status"
  on public.patient_feedback
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Staff can delete feedback" on public.patient_feedback;
create policy "Staff can delete feedback"
  on public.patient_feedback
  for delete
  to authenticated
  using (true);

-- ------------------------------------------------------------
-- 4. Performance Indexes
-- ------------------------------------------------------------

create index if not exists clinics_active_idx on public.clinics(active);
create index if not exists specialists_active_idx on public.specialists(active);
create index if not exists patient_feedback_status_idx on public.patient_feedback(status);
