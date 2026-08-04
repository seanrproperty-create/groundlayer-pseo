import { COOKIE_NAME, LOGIN_TOKEN_TTL_SECONDS, SESSION_TTL_SECONDS, DASHBOARD_ADMIN_EMAILS } from './constants.js';

// Email-a-link auth for /local/dashboard, as specced. AppleManLegal's
// dashboard uses Cloudflare Access (Zero Trust) instead of this, which is the
// stronger option if Sean wants to switch later — but Access requires a
// Zero Trust team already configured for the zone, which groundlayer.co.uk
// doesn't have yet, so a self-contained token flow is what actually ships
// today without extra Cloudflare dashboard setup.
//
// Flow: POST /local/dashboard/login -> random token stored in D1 (hashed,
// allow-listed mailboxes only, see DASHBOARD_ADMIN_EMAILS) -> emailed as a
// link to that same mailbox -> GET .../verify?token= checks it, marks it
// used, and sets a signed session cookie. The cookie is HMAC-signed with
// SESSION_SECRET (a Worker secret, set via `wrangler secret put
// SESSION_SECRET`) so it can't be forged even though it isn't itself opaque
// — no server-side session table needed for the everyday check.

export async function requestLoginLink(env, email) {
  const normalized = email.trim().toLowerCase();
  const matched = DASHBOARD_ADMIN_EMAILS.find((allowed) => allowed.toLowerCase() === normalized);
  if (!matched) {
    // Deliberately do not reveal whether the email matched.
    return null;
  }
  const token = randomToken();
  const tokenHash = await sha256Hex(token);
  const expiresAt = Math.floor(Date.now() / 1000) + LOGIN_TOKEN_TTL_SECONDS;

  await env.DB.prepare(
    'INSERT INTO dashboard_tokens (token_hash, email, expires_at) VALUES (?, ?, ?)'
  )
    .bind(tokenHash, matched, expiresAt)
    .run();

  return { token, email: matched };
}

export async function verifyLoginToken(env, token) {
  if (!token) return false;
  const tokenHash = await sha256Hex(token);
  const nowSeconds = Math.floor(Date.now() / 1000);

  const row = await env.DB.prepare(
    'SELECT id, expires_at, used_at FROM dashboard_tokens WHERE token_hash = ?'
  )
    .bind(tokenHash)
    .first();

  if (!row || row.used_at || row.expires_at < nowSeconds) {
    return false;
  }

  await env.DB.prepare('UPDATE dashboard_tokens SET used_at = ? WHERE id = ?')
    .bind(nowSeconds, row.id)
    .run();

  return true;
}

export async function checkAccess(request, env) {
  const cookie = getCookie(request, COOKIE_NAME);
  if (!cookie) return false;
  return await verifySessionCookie(cookie, env);
}

export async function buildSessionCookie(env) {
  const expires = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${expires}`;
  const signature = await hmacHex(payload, env.SESSION_SECRET);
  const value = `${payload}.${signature}`;
  // Path=/ (not /local/dashboard) — the dashboard links to lead photos under
  // /local/uploads/*, a sibling path that would never receive a cookie
  // scoped to /local/dashboard, permanently 401ing every photo link.
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}`;
}

async function verifySessionCookie(value, env) {
  const [payload, signature] = value.split('.');
  if (!payload || !signature) return false;

  const expected = await hmacHex(payload, env.SESSION_SECRET);
  if (expected !== signature) return false;

  const expires = Number(payload);
  return Number.isFinite(expires) && Date.now() / 1000 < expires;
}

function getCookie(request, name) {
  const header = request.headers.get('Cookie');
  if (!header) return null;
  const match = header.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? match[1] : null;
}

function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

async function sha256Hex(input) {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

async function hmacHex(input, secret) {
  if (!secret) {
    throw new Error('SESSION_SECRET is not set — run: wrangler secret put SESSION_SECRET');
  }
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(input));
  return Array.from(new Uint8Array(signature), (b) => b.toString(16).padStart(2, '0')).join('');
}
