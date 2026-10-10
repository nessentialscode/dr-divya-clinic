-- Seed the 3 verified Google reviews into public.patient_feedback
DELETE FROM public.patient_feedback 
WHERE patient_name IN ('Marvin McKinney', 'Michael H.', 'Esther K.');

INSERT INTO public.patient_feedback (patient_name, treatment, rating, message, status)
SELECT 
  'Devadathan K', 
  'General & Preventive Dentistry', 
  5, 
  'I had a wonderful experience at this dental clinic. The doctors and staff are incredibly professional, friendly, and welcoming. The clinic is spotlessly clean and equipped with modern technology. They explained the entire procedure clearly and made sure I was comfortable throughout. Highly recommended for anyone looking for top-notch dental care!', 
  'approved'
WHERE NOT EXISTS (
  SELECT 1 FROM public.patient_feedback WHERE patient_name = 'Devadathan K'
);

INSERT INTO public.patient_feedback (patient_name, treatment, rating, message, status)
SELECT 
  'Sumayya Faizal', 
  'Family Dental Care', 
  5, 
  'Had a wonderful experience at this dental clinic. The doctor and staff were very polite, attentive, and caring. The treatment was provided with great care and perfection. Highly recommended to everyone!', 
  'approved'
WHERE NOT EXISTS (
  SELECT 1 FROM public.patient_feedback WHERE patient_name = 'Sumayya Faizal'
);

INSERT INTO public.patient_feedback (patient_name, treatment, rating, message, status)
SELECT 
  'Adithya Pradeep', 
  'Comprehensive Dental Care', 
  5, 
  'I visited Dr Divya’s dental clinic for my dental treatment and I''m really impressed. The doctor took time to explain my issue and treatment options. The clinic is clean, well-equipped, and the staff is very courteous. The results are excellent and there was no pain at all. Thank you so much Dr Divya', 
  'approved'
WHERE NOT EXISTS (
  SELECT 1 FROM public.patient_feedback WHERE patient_name = 'Adithya Pradeep'
);
