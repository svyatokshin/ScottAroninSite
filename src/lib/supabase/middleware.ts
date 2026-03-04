import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import {
  validateMasterCookie,
  COOKIE_NAME,
} from '@/lib/auth/master-cookie';

/**
 * Refreshes Supabase session and protects /admin routes.
 * Unauthenticated users on /admin/* (except /admin/login) are redirected to /admin/login.
 * Master cookie bypass: valid master_session cookie grants access without Supabase auth.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  await supabase.auth.getUser();

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isAdminLogin = request.nextUrl.pathname.startsWith('/admin/login');

  if (isAdminRoute && !isAdminLogin) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const masterCookie = request.cookies.get(COOKIE_NAME)?.value;
      const isMasterValid =
        masterCookie && (await validateMasterCookie(masterCookie));

      if (!isMasterValid) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin/login';
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}
