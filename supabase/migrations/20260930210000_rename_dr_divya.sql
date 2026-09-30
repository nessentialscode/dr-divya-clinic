-- Update Dr. Divya's name to Dr. Divya Lijeesh
update public.specialists
set name = 'Dr. Divya Lijeesh'
where name ilike '%Divya%';
