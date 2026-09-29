-- Allow public to read clinic open/closed status
drop policy if exists "Clinics are publicly readable when active" on public.clinics;
drop policy if exists "Clinics are publicly readable" on public.clinics;

create policy "Clinics are publicly readable"
  on public.clinics
  for select
  to anon, authenticated
  using (true);
