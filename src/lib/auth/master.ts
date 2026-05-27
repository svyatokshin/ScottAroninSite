import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase/server';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  validateMasterCookie,
  COOKIE_NAME,
} from '@/lib/auth/master-cookie';

/** Result of getAdminSupabase: either Supabase client with user context or service-role client for master. */
export interface AdminAuthResult {
  supabase: SupabaseClient;
  isMaster: boolean;
  userId?: string;
}

export { COOKIE_NAME };

/**
 * Returns Supabase client for admin operations. Uses normal auth when session exists,
 * or service-role client when master cookie is valid.
 */
export async function getAdminSupabase(): Promise<AdminAuthResult | null> {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const masterCookie = cookieStore.get(COOKIE_NAME)?.value;

  if (masterCookie && (await validateMasterCookie(masterCookie))) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) return null;

    const client = createSupabaseClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    return { supabase: client, isMaster: true };
  }

  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') return null;

  return { supabase, isMaster: false, userId: user.id };
}
