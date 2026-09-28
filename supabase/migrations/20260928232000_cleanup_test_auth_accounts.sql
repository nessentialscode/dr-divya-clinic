-- ============================================================
-- Retain only the real administrator in staff_users
-- ============================================================

-- Remove test accounts from staff_users
delete from public.staff_users
where email <> 'ayankalamdentist@gmail.com';

-- Clean up test accounts from auth.users
delete from auth.users
where email in ('drdivyaclinic@gmail.com', 'unauthorized_test_patient@gmail.com');
