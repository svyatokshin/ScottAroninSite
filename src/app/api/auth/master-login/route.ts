import { NextRequest, NextResponse } from 'next/server';
import {
  validateMasterCredentials,
  createMasterCookieValue,
  COOKIE_NAME,
} from '@/lib/auth/master-cookie';

/**
 * POST /api/auth/master-login
 * Validates email/password against MASTER_EMAIL and MASTER_PASSWORD env vars.
 * Sets master_session cookie on success. No Supabase auth.
 */
export async function POST(request: NextRequest) {
  const masterEmail = process.env.MASTER_EMAIL;
  const masterPassword = process.env.MASTER_PASSWORD;

  if (!masterEmail || !masterPassword) {
    return NextResponse.json({ error: 'Master login is not configured' }, { status: 401 });
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

  if (!validateMasterCredentials(email, password)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const cookieValue = await createMasterCookieValue();
  const response = NextResponse.json({ success: true });

  response.cookies.set(COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24h
    path: '/',
  });

  return response;
}
