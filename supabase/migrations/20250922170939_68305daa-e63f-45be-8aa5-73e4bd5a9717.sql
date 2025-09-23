-- First, let's add the missing columns that weren't properly added
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS gender TEXT;

-- Add missing columns to bookings table
ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'pending';

-- Update medical_records table structure to match Dashboard interface
-- First add the missing columns
ALTER TABLE public.medical_records
ADD COLUMN IF NOT EXISTS test_type TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS test_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS doctor_notes TEXT,
ADD COLUMN IF NOT EXISTS results JSONB;

-- Enable leaked password protection for enhanced security
UPDATE auth.config 
SET enable_password_strength = true, 
    enable_password_breach_check = true 
WHERE true;