-- Seed primary clinic if not present
insert into public.clinics (name, location, active, display_order)
select 'Dr. Divya''s Family Dental Clinic', 'Ayankalam, Malappuram, Kerala', true, 1
where not exists (
  select 1 from public.clinics where name ilike '%Divya%'
);
