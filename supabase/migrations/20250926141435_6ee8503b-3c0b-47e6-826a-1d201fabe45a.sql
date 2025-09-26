-- Add missing UPDATE policy for payments table to prevent users from modifying existing payments
CREATE POLICY "Users can only update their own payments" 
ON public.payments 
FOR UPDATE 
USING (auth.uid() = user_id);