-- ============================================================
-- Fix Staff Users Policy Recursion & Drop Debug Helpers
-- ============================================================

-- Drop debug helper
drop function if exists public.debug_staff();

-- Fix staff_users select policy to eliminate recursion
drop policy if exists "Staff can view staff roster" on public.staff_users;
drop policy if exists "Users can view own staff record" on public.staff_users;

create policy "Users can view own staff record"
  on public.staff_users
  for select
  to authenticated
  using (id = auth.uid());

-- Ensure is_staff() is clean, fast, and granted to authenticated role
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

revoke all on function public.is_staff() from public;
grant execute on function public.is_staff() to authenticated;
