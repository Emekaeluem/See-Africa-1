-- Run once in the see-africa-booking Supabase SQL Editor.
-- Email notification delivery deduplication for Paystack statuses.
CREATE TABLE IF NOT EXISTS public.payment_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id uuid NOT NULL REFERENCES public.payments(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('pending','success','failed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (payment_id,status)
);
ALTER TABLE public.payment_notifications ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.payment_notifications FROM anon, authenticated;
GRANT USAGE ON SCHEMA public TO service_role;
GRANT SELECT, INSERT, DELETE ON public.payment_notifications TO service_role;
-- No public policies: only the privileged server connection has access.
