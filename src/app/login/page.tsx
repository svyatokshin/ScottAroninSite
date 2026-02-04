'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

/**
 * User login/signup page. Profile created with role=user via DB trigger.
 */
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') ?? '/dashboard';

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    try {
      const supabase = createClient();

      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (signUpError) throw signUpError;
        setMessage('Check your email to confirm your account.');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        router.push(redirectTo);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 border border-bgDark-2/50 rounded-lg focus:ring-2 focus:ring-bgDark-2/60 focus:border-bgDark-2/60 bg-white text-gray-900 placeholder-gray-500/60 min-h-[44px]';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bgLight-4 via-bgLight-3 to-bgLight-2 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-bgDark-2/20 bg-white/90 backdrop-blur-sm shadow-xl p-8">
          <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-2 text-center">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </h1>
          <p className="text-gray-600 text-sm mb-6 text-center">
            Access your courses
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div
                className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800"
                role="alert"
              >
                {error}
              </div>
            )}
            {message && (
              <div
                className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800"
                role="status"
              >
                {message}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputClass}
                  placeholder="Your name"
                  disabled={isLoading}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className={inputClass}
                placeholder="you@example.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                className={inputClass}
                disabled={isLoading}
              />
              {mode === 'signup' && (
                <p className="mt-1 text-xs text-gray-500">At least 6 characters</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-semibold text-white bg-[#0D47A1] hover:bg-[#1565C0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] focus:outline-none focus:ring-2 focus:ring-bgDark-2/60 focus:ring-offset-2"
            >
              {isLoading
                ? mode === 'signin'
                  ? 'Signing in...'
                  : 'Creating account...'
                : mode === 'signin'
                  ? 'Sign In'
                  : 'Sign Up'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            {mode === 'signin' ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-bgDark-2 hover:underline font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-bgDark-2 hover:underline font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </p>

          <p className="mt-4 text-center text-sm text-gray-500">
            <Link href="/" className="text-bgDark-2 hover:underline">
              Back to site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bgLight-4 via-bgLight-3 to-bgLight-2">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
