-- Create membership tier enum
CREATE TYPE public.membership_tier AS ENUM ('gold', 'silver', 'platinum');

-- Add membership tier and email notifications to profiles
ALTER TABLE public.profiles 
ADD COLUMN membership_tier public.membership_tier DEFAULT 'silver',
ADD COLUMN email_notifications boolean DEFAULT true;

-- Update RLS policy to allow users to update their own profile
-- (already exists but let's ensure it's correct)
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);