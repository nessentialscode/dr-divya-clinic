-- Rename Card 4 to Dr. Nidhash Saddik
update public.specialists
set name = 'Dr. Nidhash Saddik'
where name ilike '%Anas%' or name ilike '%Nidhash%';
