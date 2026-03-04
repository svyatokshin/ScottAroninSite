/**
 * Master cookie validation and creation. Edge-safe (no server-only imports).
 * Used by middleware and API routes.
 */

export const COOKIE_NAME = 'master_session';
const COOKIE_MAX_AGE_SEC = 24 * 60 * 60; // 24h

/**
 * Constant-time string comparison to prevent timing attacks.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Computes HMAC-SHA256 of message with secret. Uses Web Crypto for Edge/Node compatibility.
 */
async function hmacSha256(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(message)
  );
  return btoa(Array.from(new Uint8Array(sig)).map((c) => String.fromCharCode(c)).join(''));
}

/**
 * Verifies the master_session cookie signature and expiry.
 * @param cookieValue - Raw cookie value from request
 * @returns true if cookie is valid
 */
export async function validateMasterCookie(
  cookieValue: string | undefined
): Promise<boolean> {
  const secret = process.env.MASTER_PASSWORD;
  if (!secret || !cookieValue) return false;

  const parts = cookieValue.split('.');
  if (parts.length !== 3) return false;

  const [expiresAtStr, rand, signature] = parts;
  const payload = `${expiresAtStr}.${rand}`;

  const expectedSig = await hmacSha256(secret, payload);
  if (!timingSafeEqual(signature, expectedSig)) return false;

  const expiresAt = parseInt(expiresAtStr, 10);
  if (isNaN(expiresAt) || Date.now() > expiresAt) return false;

  return true;
}

/**
 * Creates the signed master_session cookie value.
 */
export async function createMasterCookieValue(): Promise<string> {
  const secret = process.env.MASTER_PASSWORD;
  if (!secret) throw new Error('MASTER_PASSWORD not configured');

  const expiresAt = Date.now() + COOKIE_MAX_AGE_SEC * 1000;
  const rand = crypto.randomUUID();
  const payload = `${expiresAt}.${rand}`;
  const signature = await hmacSha256(secret, payload);
  return `${payload}.${signature}`;
}

/**
 * Validates master credentials against env vars. Constant-time for password.
 */
export function validateMasterCredentials(
  email: string,
  password: string
): boolean {
  const masterEmail = process.env.MASTER_EMAIL?.trim();
  const masterPassword = process.env.MASTER_PASSWORD;

  if (!masterEmail || !masterPassword) return false;
  if (email.trim().toLowerCase() !== masterEmail.toLowerCase()) return false;
  if (!timingSafeEqual(password, masterPassword)) return false;

  return true;
}
