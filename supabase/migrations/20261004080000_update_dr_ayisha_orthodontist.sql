-- Update Dr. Ayisha's specialty to Orthodontist | Invisalign®️ Certified Provider
UPDATE public.specialists
SET specialty = 'Orthodontist | Invisalign®️ Certified Provider'
WHERE name ILIKE '%Ayisha%' OR name ILIKE '%Aisha%';
