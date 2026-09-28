create or replace function public.get_existing_auth_emails()
returns table(id uuid, email text, confirmed_at timestamptz)
language sql
security definer
as $$
  select id, email, email_confirmed_at as confirmed_at from auth.users;
$$;
