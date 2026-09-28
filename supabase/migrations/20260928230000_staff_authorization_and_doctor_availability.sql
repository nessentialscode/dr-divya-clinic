-- ============================================================
-- Dr. Divya Clinic — Staff Authorization & Doctor Availability Architecture
-- ============================================================

-- ------------------------------------------------------------
-- 1. Remove Unconfirmed / Seeded Branch Records
-- ------------------------------------------------------------

delete from public.clinics
where name in (
  'Dr. Divya Clinic — Main Branch',
  'Dr. Divya Clinic — City Center'
);

-- ------------------------------------------------------------
-- 2. Doctor Daily Availability Architecture
-- ------------------------------------------------------------
-- `active` = doctor is an active specialist on staff (remains true for all 8 specialists)
-- `is_available` = doctor's daily booking availability (present vs absent)

alter table public.specialists
  add column if not exists is_available boolean not null default true;

-- Ensure all existing specialists remain active and default to available
update public.specialists
set active = true, is_available = true
where active is false or is_available is false;

create index if not exists specialists_availability_idx
  on public.specialists(active, is_available);

-- ------------------------------------------------------------
-- 3. Staff Authorization Table & Helper Function
-- ------------------------------------------------------------

create table if not exists public.staff_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'staff' check (role in ('admin', 'staff')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Seed existing verified administrator into staff_users
insert into public.staff_users (id, email, role, is_active)
select id, email, 'admin', true
from auth.users
where email = 'drdivyaclinic@gmail.com'
on conflict (id) do update set is_active = true, role = 'admin';

-- Enable RLS on staff_users
alter table public.staff_users enable row level security;

-- Staff check function (security definer, avoids recursion and bypasses RLS on staff_users)
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.staff_users
    where id = auth.uid()
      and is_active = true
  );
$$;

-- Grant execution to authenticated users
revoke all on function public.is_staff() from public;
grant execute on function public.is_staff() to authenticated;

-- Policies for staff_users table
drop policy if exists "Staff can view staff roster" on public.staff_users;
create policy "Staff can view staff roster"
  on public.staff_users
  for select
  to authenticated
  using (id = auth.uid() or public.is_staff());

-- ------------------------------------------------------------
-- 4. Enforce is_staff() Authorization on All Staff RLS Policies
-- ------------------------------------------------------------

-- Appointments: Only authorized staff can view/update/delete appointments
drop policy if exists "Staff can view all appointments" on public.appointments;
create policy "Staff can view all appointments"
  on public.appointments
  for select
  to authenticated
  using (public.is_staff());

drop policy if exists "Staff can update appointments" on public.appointments;
create policy "Staff can update appointments"
  on public.appointments
  for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "Staff can delete appointments" on public.appointments;
create policy "Staff can delete appointments"
  on public.appointments
  for delete
  to authenticated
  using (public.is_staff());

-- Specialists: Public can view active specialists; staff can view all and update availability
drop policy if exists "Staff can view all specialists" on public.specialists;
create policy "Staff can view all specialists"
  on public.specialists
  for select
  to authenticated
  using (public.is_staff());

drop policy if exists "Staff can update specialists availability" on public.specialists;
create policy "Staff can update specialists availability"
  on public.specialists
  for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- Clinics: Public can view active clinics; staff can view all and update
drop policy if exists "Staff can view all clinics" on public.clinics;
create policy "Staff can view all clinics"
  on public.clinics
  for select
  to authenticated
  using (public.is_staff());

drop policy if exists "Staff can update clinics" on public.clinics;
create policy "Staff can update clinics"
  on public.clinics
  for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- Patient Feedback: Public can view approved; staff can view all, update, and delete
drop policy if exists "Staff can view all feedback" on public.patient_feedback;
create policy "Staff can view all feedback"
  on public.patient_feedback
  for select
  to authenticated
  using (public.is_staff());

drop policy if exists "Staff can update feedback status" on public.patient_feedback;
create policy "Staff can update feedback status"
  on public.patient_feedback
  for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "Staff can delete feedback" on public.patient_feedback;
create policy "Staff can delete feedback"
  on public.patient_feedback
  for delete
  to authenticated
  using (public.is_staff());
