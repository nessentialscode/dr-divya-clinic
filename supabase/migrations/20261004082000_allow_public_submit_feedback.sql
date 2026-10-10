-- Enable public submission of patient feedback
-- Restricts public insertion status strictly to 'pending' to ensure administrative moderation
DROP POLICY IF EXISTS "Anyone can submit patient feedback" ON public.patient_feedback;

CREATE POLICY "Anyone can submit patient feedback"
  ON public.patient_feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (coalesce(status, 'pending') = 'pending');

-- Allow authenticated staff full insert rights
DROP POLICY IF EXISTS "Staff can insert feedback" ON public.patient_feedback;

CREATE POLICY "Staff can insert feedback"
  ON public.patient_feedback
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

