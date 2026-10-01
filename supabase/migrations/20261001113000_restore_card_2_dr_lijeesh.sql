-- Restore Card 2 to Dr. Lijeesh Kadambil
update public.specialists
set name = 'Dr. Lijeesh Kadambil',
    specialty = 'Chief Dental Surgeon'
where name ilike '%Mufeed%' or (name ilike '%Lijeesh%' and name not ilike '%Divya%');
