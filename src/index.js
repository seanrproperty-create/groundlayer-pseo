import { renderLandingPage, renderHubPage, renderDashboard, renderLoginPage, renderThankYouPage, renderSitemap, renderRobotsTxt, renderAdsTxt, renderLlmsTxt, renderPrivacyPolicy, renderAboutPage, renderContactPage, renderTermsPage, renderBlogHub, renderBlogArticle, getBlogArticleBySlug } from './templates.js';
import { sendLeadEmail, sendCustomerConfirmationEmail, sendLoginLinkEmail } from './email.js';
import { checkAccess, requestLoginLink, verifyLoginToken, buildSessionCookie } from './access.js';
import { PAGE_MAP } from './constants.js';
import {
  FAVICON_ICO_BASE64,
  FAVICON_SVG_BASE64,
  FAVICON_96_BASE64,
  APPLE_TOUCH_ICON_BASE64,
  WEBMANIFEST_192_BASE64,
  WEBMANIFEST_512_BASE64,
} from './brand-assets.js';

function base64ToBytes(b64) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

// Long, immutable cache: each URL only changes if the source asset is
// redeployed, so it's safe for browsers to cache indefinitely rather than
// re-fetching these on every one of 200+ pages.
function cachedImage(bytes, contentType) {
  return new Response(bytes, { headers: { 'Content-Type': contentType, 'Cache-Control': 'public, max-age=31536000, immutable' } });
}

const SITE_WEBMANIFEST = JSON.stringify({
  name: 'Groundlayer',
  short_name: 'Groundlayer',
  icons: [
    { src: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
    { src: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
  theme_color: '#2563eb',
  background_color: '#ffffff',
  display: 'standalone',
});

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8MB

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (path === '/local/dashboard' && method === 'GET') {
      return handleDashboard(request, env);
    }
    if (path === '/local/dashboard/login' && method === 'GET') {
      return html(renderLoginPage({ sent: false, next: safeNextPath(url.searchParams.get('next')) }));
    }
    if (path === '/local/dashboard/login' && method === 'POST') {
      return handleLoginRequest(request, env, url);
    }
    if (path === '/local/dashboard/verify' && method === 'GET') {
      return handleVerify(request, env, url);
    }
    if (path === '/local/dashboard/export.csv' && method === 'GET') {
      return handleExportCsv(request, env);
    }
    if (path.startsWith('/local/uploads/') && method === 'GET') {
      return handleServeUpload(request, env, path);
    }
    if (path === '/local/submit-lead' && method === 'POST') {
      return handleSubmitLead(request, env, ctx, url);
    }
    if (path === '/local/thank-you' && method === 'GET') {
      return html(renderThankYouPage());
    }
    if ((path === '/' || path === '/local' || path === '/local/') && method === 'GET') {
      return html(renderHubPage());
    }
    if (path === '/sitemap.xml' && method === 'GET') {
      return new Response(renderSitemap(), { headers: { 'Content-Type': 'application/xml;charset=UTF-8' } });
    }
    if (path === '/robots.txt' && method === 'GET') {
      return new Response(renderRobotsTxt(), { headers: { 'Content-Type': 'text/plain;charset=UTF-8' } });
    }
    if (path === '/ads.txt' && method === 'GET') {
      return new Response(renderAdsTxt(), { headers: { 'Content-Type': 'text/plain;charset=UTF-8' } });
    }
    if (path === '/favicon.ico' && method === 'GET') {
      return cachedImage(base64ToBytes(FAVICON_ICO_BASE64), 'image/x-icon');
    }
    if (path === '/favicon.svg' && method === 'GET') {
      return cachedImage(base64ToBytes(FAVICON_SVG_BASE64), 'image/svg+xml');
    }
    if (path === '/favicon-96x96.png' && method === 'GET') {
      return cachedImage(base64ToBytes(FAVICON_96_BASE64), 'image/png');
    }
    if (path === '/apple-touch-icon.png' && method === 'GET') {
      return cachedImage(base64ToBytes(APPLE_TOUCH_ICON_BASE64), 'image/png');
    }
    if (path === '/web-app-manifest-192x192.png' && method === 'GET') {
      return cachedImage(base64ToBytes(WEBMANIFEST_192_BASE64), 'image/png');
    }
    if (path === '/web-app-manifest-512x512.png' && method === 'GET') {
      return cachedImage(base64ToBytes(WEBMANIFEST_512_BASE64), 'image/png');
    }
    if (path === '/site.webmanifest' && method === 'GET') {
      return new Response(SITE_WEBMANIFEST, { headers: { 'Content-Type': 'application/manifest+json;charset=UTF-8', 'Cache-Control': 'public, max-age=86400' } });
    }
    if (path === '/llms.txt' && method === 'GET') {
      return new Response(renderLlmsTxt(), { headers: { 'Content-Type': 'text/plain;charset=UTF-8' } });
    }
    if (path === '/privacy-policy' && method === 'GET') {
      return html(renderPrivacyPolicy());
    }
    if (path === '/about/' && method === 'GET') {
      return html(renderAboutPage());
    }
    if (path === '/contact/' && method === 'GET') {
      return html(renderContactPage());
    }
    if (path === '/terms-of-service/' && method === 'GET') {
      return html(renderTermsPage());
    }
    if (path === '/blog/' && method === 'GET') {
      return html(renderBlogHub());
    }
    if (path.startsWith('/blog/') && path !== '/blog/' && method === 'GET') {
      const slug = path.slice('/blog/'.length).replace(/\/$/, '');
      const article = getBlogArticleBySlug(slug);
      if (article) return html(renderBlogArticle(article));
      return new Response('Not Found', { status: 404 });
    }
    // Flattened landing pages live directly off the root, e.g.
    // "/subsidence-repair-stoke-on-trent/" — checked last, after every
    // reserved /local/* system route above, so none of those names can ever
    // collide with a niche-town slug (none of which will ever equal
    // "local", "dashboard", etc.).
    if (method === 'GET') {
      const landingResponse = await handleLandingPage(request, env, ctx, path);
      if (landingResponse) {
        return landingResponse;
      }
    }

    return new Response('Not Found', { status: 404 });
  },
};

async function handleLandingPage(request, env, ctx, path) {
  // "/<niche-slug>-<town-slug>/" — trailing segment only, trailing slash
  // optional. Returns null (not a 404 Response) on no match so the caller
  // can fall through to the generic 404 without this function owning that
  // decision — keeps it a pure lookup.
  const segment = path.slice(1).replace(/\/$/, '');
  const match = PAGE_MAP.get(segment);
  if (!match) {
    return null;
  }

  const ua = request.headers.get('user-agent') || '';
  const deviceType = /Mobile|Android/.test(ua) ? 'Mobile' : 'Desktop';
  ctx.waitUntil(
    env.DB.prepare('INSERT INTO analytics_views (town, niche, device_type) VALUES (?, ?, ?)')
      .bind(match.town.slug, match.niche.slug, deviceType)
      .run()
      .catch((err) => console.error('[analytics] view insert failed', err))
  );

  return html(renderLandingPage(match));
}

async function handleSubmitLead(request, env, ctx, url) {
  const formData = await request.formData();
  const townSlug = String(formData.get('town') || '');
  const nicheSlug = String(formData.get('niche') || '');
  const name = String(formData.get('client_name') || '').slice(0, 200);
  const phone = String(formData.get('client_phone') || '').slice(0, 40);
  const email = String(formData.get('client_email') || '').slice(0, 200);
  const details = String(formData.get('damage_details') || '').slice(0, 2000);
  const photoFile = formData.get('damage_photo');

  let imageUrl = '';
  if (photoFile && typeof photoFile === 'object' && photoFile.size > 0) {
    if (photoFile.size <= MAX_UPLOAD_BYTES && String(photoFile.type || '').startsWith('image/')) {
      const safeName = String(photoFile.name || 'photo').replace(/[^a-zA-Z0-9._-]/g, '_').slice(-80);
      const fileKey = `leads/${Date.now()}-${safeName}`;
      await env.R2_BUCKET.put(fileKey, photoFile.stream(), {
        httpMetadata: { contentType: photoFile.type },
      });
      imageUrl = `/local/uploads/${fileKey}`;
    }
    // Oversized or non-image uploads are silently dropped — the lead still
    // submits without a photo rather than losing the whole enquiry.
  }

  const referenceNum = await insertLeadWithUniqueRef(env, {
    townSlug,
    nicheSlug,
    name,
    phone,
    email,
    details,
    imageUrl,
  });

  const dashboardUrl = `${url.origin}/local/dashboard`;
  ctx.waitUntil(
    sendLeadEmail(env, {
      referenceNum,
      town: townSlug,
      niche: nicheSlug,
      name,
      phone,
      email,
      details,
      imageUrl: imageUrl ? `${url.origin}${imageUrl}` : '',
      dashboardUrl,
    }).catch((err) => console.error('[email] lead notify failed', err))
  );

  const match = PAGE_MAP.get(`${nicheSlug}-${townSlug}`);
  if (email && match) {
    ctx.waitUntil(
      sendCustomerConfirmationEmail(env, {
        referenceNum,
        town: match.town.name,
        niche: match.niche.label,
        name,
        email,
      }).catch((err) => console.error('[email] customer confirmation failed', err))
    );
  }

  return Response.redirect(`${url.origin}/local/thank-you`, 302);
}

async function insertLeadWithUniqueRef(env, { townSlug, nicheSlug, name, phone, email, details, imageUrl }) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const referenceNum = 'GL-' + Math.floor(100000 + Math.random() * 900000);
    try {
      await env.DB.prepare(
        'INSERT INTO leads (reference_num, town, niche, client_name, client_phone, client_email, damage_details, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      )
        .bind(referenceNum, townSlug, nicheSlug, name, phone, email, details, imageUrl)
        .run();
      return referenceNum;
    } catch (err) {
      if (attempt === 2) throw err;
      // UNIQUE collision on reference_num (6-digit random space) — retry with a new one.
    }
  }
}

// Only ever redirect to a same-origin /local/... path — an unvalidated
// `next` taken straight from the query string would be an open redirect.
function safeNextPath(next) {
  if (typeof next !== 'string') return null;
  if (!next.startsWith('/local/') || next.startsWith('//')) return null;
  return next;
}

async function handleServeUpload(request, env, path) {
  const authorized = await checkAccess(request, env);
  if (!authorized) {
    // The admin lead-alert email links straight here, so an unauthenticated
    // click used to just dead-end on a bare 401 (Sean, 2026-08-04) — send it
    // through login instead and land back on the same photo afterwards.
    const loginUrl = new URL('/local/dashboard/login', request.url);
    loginUrl.searchParams.set('next', path);
    return Response.redirect(loginUrl, 302);
  }
  const key = path.slice('/local/uploads/'.length);
  const object = await env.R2_BUCKET.get(key);
  if (!object) {
    return new Response('Not Found', { status: 404 });
  }
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('Cache-Control', 'private, max-age=3600');
  return new Response(object.body, { headers });
}

async function handleDashboard(request, env) {
  const authorized = await checkAccess(request, env);
  if (!authorized) {
    return Response.redirect(new URL('/local/dashboard/login', request.url), 302);
  }
  return html(await renderDashboard(env));
}

async function handleLoginRequest(request, env, url) {
  const formData = await request.formData();
  const email = String(formData.get('email') || '').trim();
  const next = safeNextPath(String(formData.get('next') || ''));
  const result = await requestLoginLink(env, email);
  if (result) {
    await sendLoginLinkEmail(env, { token: result.token, to: result.email, dashboardBaseUrl: url.origin, next });
  }
  // Same response whether or not the email matched an allow-listed mailbox,
  // so the form can't be used to probe which addresses are valid.
  return html(renderLoginPage({ sent: true }));
}

async function handleVerify(request, env, url) {
  const token = url.searchParams.get('token');
  const valid = await verifyLoginToken(env, token);
  if (!valid) {
    return new Response('Invalid or expired link', { status: 401 });
  }
  const cookie = await buildSessionCookie(env);
  const next = safeNextPath(url.searchParams.get('next')) || '/local/dashboard';
  return new Response(null, {
    status: 302,
    headers: {
      Location: next,
      'Set-Cookie': cookie,
    },
  });
}

async function handleExportCsv(request, env) {
  const authorized = await checkAccess(request, env);
  if (!authorized) {
    return new Response('Unauthorized', { status: 401 });
  }
  const { results } = await env.DB.prepare(
    'SELECT reference_num, town, niche, client_name, client_phone, client_email, damage_details, image_url, status, created_at FROM leads ORDER BY created_at DESC'
  ).all();

  const header = ['reference_num', 'town', 'niche', 'client_name', 'client_phone', 'client_email', 'damage_details', 'image_url', 'status', 'created_at'];
  const lines = [header.join(',')];
  for (const row of results || []) {
    lines.push(header.map((col) => csvCell(row[col])).join(','));
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="groundlayer-leads.csv"',
    },
  });
}

function csvCell(value) {
  const str = String(value ?? '');
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function html(body) {
  return new Response(body, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
}
