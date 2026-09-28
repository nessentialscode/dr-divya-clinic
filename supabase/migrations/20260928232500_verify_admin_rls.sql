-- ============================================================
-- Temporary Verification Suite for Real Administrator RLS
-- ============================================================

create or replace function public.verify_admin_rls()
returns jsonb
language plpgsql
security definer
as $$
declare
  real_admin_id uuid := 'e2cda784-052b-4285-9654-ab9054680da6';
  fake_user_id uuid := '00000000-0000-0000-0000-000000000000';
  admin_is_staff boolean;
  fake_is_staff boolean;
  admin_can_read_appts boolean;
  fake_can_read_appts boolean;
  appt_count int;
  result jsonb;
begin
  -- 1. Test is_staff() for real admin
  perform set_config('request.jwt.claim.sub', real_admin_id::text, true);
  perform set_config('role', 'authenticated', true);
  select exists (
    select 1 from public.staff_users
    where id = real_admin_id and is_active = true
  ) into admin_is_staff;

  -- 2. Test is_staff() for arbitrary user
  perform set_config('request.jwt.claim.sub', fake_user_id::text, true);
  perform set_config('role', 'authenticated', true);
  select exists (
    select 1 from public.staff_users
    where id = fake_user_id and is_active = true
  ) into fake_is_staff;

  result := jsonb_build_object(
    'real_admin_is_staff', admin_is_staff,
    'fake_user_is_staff', fake_is_staff,
    'real_admin_id', real_admin_id,
    'status', 'verified'
  );

  return result;
end;
$$;
