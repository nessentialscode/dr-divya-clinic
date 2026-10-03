-- ============================================================
-- Rearrange Doctor Cards & Replace Dr. Ratheesh M.S with Dr. Ayisha
-- Card 1: Dr. Divya Lijeesh
-- Card 2: Dr. Lijeesh Kadambil
-- Card 3: Dr. Fathima Roosa Fidha
-- Card 4: Dr. Ayisha
-- Card 5: Dr. Rathish TK
-- Card 6: Dr. Nidhash Siddik
-- Card 7: Dr. Roshan
-- Card 8: Dr. Mohammed Aslif
-- Card 9: Dr. Mohammed Haris PM
-- ============================================================

-- 1. Replace Dr. Ratheesh M.S with Dr. Ayisha (Card 4)
UPDATE public.specialists
SET name = 'Dr. Ayisha',
    specialty = 'Consultant Pedodontist',
    active = true
WHERE name ILIKE '%Ratheesh M%' OR name ILIKE '%Ratheesh%M%';

-- If Dr. Ayisha does not exist yet (e.g. fresh environment), insert her
INSERT INTO public.specialists (name, specialty, active, is_available)
SELECT 'Dr. Ayisha', 'Consultant Pedodontist', true, true
WHERE NOT EXISTS (
  SELECT 1 FROM public.specialists WHERE name ILIKE '%Ayisha%'
);

-- 2. Ensure Dr. Roshan is active (Card 6)
UPDATE public.specialists
SET name = 'Dr. Roshan',
    specialty = 'Consultant Orthodontist',
    active = true
WHERE name ILIKE '%Roshan%';

-- If Dr. Roshan does not exist yet, insert him
INSERT INTO public.specialists (name, specialty, active, is_available)
SELECT 'Dr. Roshan', 'Consultant Orthodontist', true, true
WHERE NOT EXISTS (
  SELECT 1 FROM public.specialists WHERE name ILIKE '%Roshan%'
);

-- 3. Standardize names for other specialist cards
UPDATE public.specialists
SET name = 'Dr. Rathish TK'
WHERE (name ILIKE '%Rathish%' OR name ILIKE '%Ratheesh TK%') AND name NOT ILIKE '%Ayisha%';

UPDATE public.specialists
SET name = 'Dr. Nidhash Siddik'
WHERE name ILIKE '%Nidhash%' OR name ILIKE '%Anas%';

UPDATE public.specialists
SET name = 'Dr. Mohammed Aslif'
WHERE name ILIKE '%Aslif%';

UPDATE public.specialists
SET name = 'Dr. Mohammed Haris PM'
WHERE name ILIKE '%Haris%';
