-- ============================================================
-- Sync Real Administrator from auth.users to public.staff_users
-- ============================================================

-- Ensure any administrator created in auth.users is registered in staff_users
insert into public.staff_users (id, email, role, is_active)
select id, email, 'admin', true
from auth.users
on conflict (id) do update
set is_active = true,
    role = 'admin',
    email = excluded.email;
