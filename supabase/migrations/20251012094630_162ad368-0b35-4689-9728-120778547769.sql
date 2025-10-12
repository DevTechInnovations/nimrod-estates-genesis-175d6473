-- Add account status enum
CREATE TYPE public.account_status AS ENUM ('active', 'suspended', 'pending');

-- Add payment status enum
CREATE TYPE public.payment_status AS ENUM ('verified', 'unverified', 'pending');

-- Add new columns to profiles table
ALTER TABLE public.profiles
ADD COLUMN account_status account_status DEFAULT 'pending',
ADD COLUMN payment_status payment_status DEFAULT 'unverified',
ADD COLUMN payment_verified_at timestamp with time zone,
ADD COLUMN last_login_at timestamp with time zone;

-- Create RLS policy for admins to view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policy for admins to update all profiles
CREATE POLICY "Admins can update all profiles"
ON public.profiles
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));