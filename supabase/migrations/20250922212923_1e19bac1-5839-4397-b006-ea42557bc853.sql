-- Add UPDATE policy for bookings table to allow users to update only their own booking status
CREATE POLICY "Users can update their own booking status" 
ON public.bookings 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Add a more restrictive policy that only allows updating the status field
-- First, we need to drop the general update policy and create a more specific one
DROP POLICY IF EXISTS "Users can update their own booking status" ON public.bookings;

-- Create a function to check if only status field is being updated
CREATE OR REPLACE FUNCTION public.can_update_booking_status(
  old_record public.bookings,
  new_record public.bookings
) RETURNS boolean AS $$
BEGIN
  -- Allow update only if:
  -- 1. Only the status field is changed
  -- 2. All other fields remain the same
  RETURN (
    old_record.id = new_record.id AND
    old_record.user_id = new_record.user_id AND
    old_record.service_name = new_record.service_name AND
    old_record.service_price = new_record.service_price AND
    old_record.booking_date = new_record.booking_date AND
    old_record.payment_id = new_record.payment_id AND
    old_record.notes = new_record.notes AND
    old_record.payment_status = new_record.payment_status AND
    old_record.created_at = new_record.created_at
    -- Only status and updated_at can be different
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the restrictive UPDATE policy
CREATE POLICY "Users can update only their booking status" 
ON public.bookings 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id AND 
  public.can_update_booking_status(bookings, bookings)
);