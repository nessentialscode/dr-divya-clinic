-- Add Dr. Fathima Roosa Fidha TP to specialists
INSERT INTO specialists (id, name, specialty, active, is_available)
VALUES (
  'a3b89012-789a-4bc3-9de1-23456789abcd',
  'Dr. Fathima Roosa Fidha TP',
  'Resident Dental Surgeon',
  true,
  true
)
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name, specialty = EXCLUDED.specialty, active = true;
