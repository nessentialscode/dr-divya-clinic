-- Confirm drdivyaclinic@gmail.com email
update auth.users
set email_confirmed_at = now()
where email = 'drdivyaclinic@gmail.com' and email_confirmed_at is null;

-- Remove temporary inspection function
drop function if exists public.get_existing_auth_emails();
