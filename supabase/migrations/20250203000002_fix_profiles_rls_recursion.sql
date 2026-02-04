-- Fix infinite recursion in profiles RLS: policies that checked
-- "EXISTS (SELECT 1 FROM public.profiles ...)" triggered the same policies.
-- Use a SECURITY DEFINER function so the check runs without re-entering RLS.

CREATE OR REPLACE FUNCTION public.current_user_is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Drop policies that caused recursion on profiles
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update profiles" ON public.profiles;

-- Recreate using the function (no self-reference)
CREATE POLICY "Admins can read all profiles" ON public.profiles
  FOR SELECT USING (public.current_user_is_admin());

CREATE POLICY "Admins can update profiles" ON public.profiles
  FOR UPDATE USING (public.current_user_is_admin());
