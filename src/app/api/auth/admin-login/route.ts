import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/admin-login
 * Signs in with email/password and sets auth cookies on this response.
 * Uses service role (if set) to read profile and bypass RLS.
 */
export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !anonKey) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });

  const supabase = createServerClient(supabaseUrl, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

  if (signInError) {
    return NextResponse.json({ error: signInError.message }, { status: 401 });
  }

  const userId = (await supabase.auth.getUser()).data.user?.id ?? '';
  if (!userId) {
    await supabase.auth.signOut();
    return NextResponse.json({ error: 'Could not get user after sign-in.' }, { status: 500 });
  }

  let profile: { role: string } | null = null;
  let profileError: { message: string } | null = null;

  if (serviceRoleKey) {
    const adminClient = createSupabaseClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const result = await adminClient
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .maybeSingle();
    profile = result.data;
    profileError = result.error;
  } else {
    const result = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .maybeSingle();
    profile = result.data;
    profileError = result.error;
  }

  if (profileError) {
    await supabase.auth.signOut();
    const msg =
      process.env.NODE_ENV === 'production'
        ? 'Could not load profile. Try again or check Supabase.'
        : `Profile check failed: ${profileError.message}`;
    return NextResponse.json({ error: msg }, { status: 503 });
  }

  if (!profile || profile.role !== 'admin') {
    await supabase.auth.signOut();
    const errorMsg =
      !profile
        ? 'No profile found for this account. See docs/ADMIN_SETUP.md — run the "Ensure profile and set admin" SQL.'
        : 'Your account does not have admin access. See docs/ADMIN_SETUP.md to set role to admin.';
    return NextResponse.json(
      { error: errorMsg },
      { status: 403 }
    );
  }

  return response;
}
