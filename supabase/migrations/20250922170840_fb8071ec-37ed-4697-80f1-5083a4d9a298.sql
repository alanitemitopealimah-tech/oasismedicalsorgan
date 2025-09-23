-- Update profiles table to match Dashboard interface
ALTER TABLE public.profiles 
ADD COLUMN date_of_birth DATE,
ADD COLUMN gender TEXT;

-- Update medical_records table to match Dashboard interface  
ALTER TABLE public.medical_records
ADD COLUMN test_type TEXT NOT NULL DEFAULT '',
ADD COLUMN test_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
ADD COLUMN status TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN doctor_notes TEXT,
ADD COLUMN results JSONB;

-- Update bookings table to match Dashboard interface
ALTER TABLE public.bookings
ADD COLUMN payment_status TEXT NOT NULL DEFAULT 'pending';

-- Update medical_records table to use test_date instead of created_at for ordering
UPDATE public.medical_records SET test_date = created_at WHERE test_date IS NULL;