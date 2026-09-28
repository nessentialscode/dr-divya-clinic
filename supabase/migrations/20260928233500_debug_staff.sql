create or replace function public.debug_staff()
returns table(auth_id uuid, auth_email text, staff_id uuid, staff_email text, staff_active boolean)
language sql
security definer
as $$
  select
    u.id as auth_id,
    u.email as auth_email,
    s.id as staff_id,
    s.email as staff_email,
    s.is_active as staff_active
  from auth.users u
  full outer join public.staff_users s on u.email = s.email;
$$;
