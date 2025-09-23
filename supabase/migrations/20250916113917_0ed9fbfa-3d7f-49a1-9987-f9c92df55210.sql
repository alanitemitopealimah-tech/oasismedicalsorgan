-- Remove the insecure policy that allows anyone to update payments
DROP POLICY IF EXISTS "System can update payments" ON public.payments;

-- The edge function uses service role key which bypasses RLS policies,
-- so no additional update policy is needed for system operations.
-- This ensures only the system (via service role) can update payment records,
-- preventing any authenticated user from modifying payment data.