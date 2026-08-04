import { HUB_SEARCH_SCRIPT } from './search.js';
import { BLOG_ARTICLES } from './blog-content.js';
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  ADSENSE_PUBLISHER_ID,
  GA_MEASUREMENT_ID,
  ADMIN_EMAIL,
  SITE_NAME,
  SITE_URL,
  BUSINESS_TYPE,
  NICHES,
  TOWNS,
} from './constants.js';

// No Tailwind CDN script (the pasted plan used <script src="https://tailwindcss.com">,
// which ships the full JIT compiler to every visitor, recalculates styles
// client-side, and is explicitly called out by Tailwind's own docs as
// "not designed for production" — it would work against the CLS/performance
// goal, not help it). Plain hand-rolled CSS instead, inlined once per page.
const BASE_STYLES = `
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; background: #f8fafc; color: #0f172a; }
  a { color: inherit; }
  .wrap { max-width: 960px; margin: 0 auto; padding: 0 16px; }
  header.site-header { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,0.97); border-bottom: 1px solid #e2e8f0; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
  header.site-header .row { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; gap: 12px; }
  .brand-row { display: flex; align-items: center; gap: 10px; }
  .brand-logo { display: block; width: 36px; height: 38px; object-fit: contain; flex-shrink: 0; }
  .eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #2563eb; display: block; margin-bottom: 2px; }
  .title { font-size: 18px; font-weight: 900; letter-spacing: -0.01em; }
  .title .accent { color: #2563eb; }
  .call-btn { display: inline-flex; align-items: center; gap: 6px; background: #2563eb; color: #fff; font-weight: 700; font-size: 14px; padding: 10px 16px; border-radius: 12px; text-decoration: none; white-space: nowrap; }
  main { padding: 28px 0 48px; }
  .grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
  @media (min-width: 900px) { .grid.two-col { grid-template-columns: 7fr 5fr; align-items: start; } }
  .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }
  .card h2 { font-size: 19px; font-weight: 800; margin: 0 0 10px; }
  .card p { font-size: 14px; line-height: 1.6; color: #475569; }
  table.sla { width: 100%; border-collapse: collapse; font-size: 12px; }
  table.sla caption { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; padding-bottom: 8px; }
  table.sla th, table.sla td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #f1f5f9; }
  table.sla thead th { background: #f1f5f9; text-transform: uppercase; font-size: 10px; letter-spacing: 0.05em; color: #475569; }
  .sticky-aside { position: sticky; top: 90px; }
  label { display: block; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 4px; }
  input[type=text], input[type=tel], input[type=email], textarea { width: 100%; font-size: 14px; padding: 11px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; font-family: inherit; }
  .field { margin-bottom: 14px; }
  .file-drop { position: relative; border: 2px dashed #e2e8f0; border-radius: 10px; padding: 16px; text-align: center; background: #f8fafc; }
  .file-drop input[type=file] { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }
  .submit-btn { width: 100%; background: #0f172a; color: #fff; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; padding: 14px; border: 0; border-radius: 10px; cursor: pointer; }
  .consent-note { font-size: 11px; line-height: 1.5; color: #64748b; margin: 0 0 10px; }
  .consent-note a { color: #2563eb; text-decoration: underline; }
  .policy-body h2 { font-size: 16px; font-weight: 800; margin: 24px 0 8px; }
  .policy-body p, .policy-body li { font-size: 14px; line-height: 1.6; color: #334155; }
  .ad-slot { min-height: 100px; margin: 20px 0; display: flex; align-items: center; justify-content: center; background: #f1f5f9; border-radius: 12px; font-size: 11px; color: #94a3b8; overflow: hidden; }
  .search-box { width: 100%; font-size: 15px; padding: 14px 16px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 24px; }
  .county-group { margin-bottom: 28px; }
  .county-group h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 10px; }
  .town-chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .town-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 14px; flex: 1 1 260px; }
  .town-card .town-name { font-weight: 700; font-size: 14px; margin-bottom: 6px; display: block; }
  .niche-links { display: flex; flex-wrap: wrap; gap: 6px; }
  .niche-links a { font-size: 11px; background: #eff6ff; color: #2563eb; padding: 4px 8px; border-radius: 999px; text-decoration: none; font-weight: 600; }
  footer.site-footer { border-top: 1px solid #e2e8f0; padding: 24px 0; font-size: 12px; color: #94a3b8; text-align: center; }
  .breadcrumb { background: #fff; border-bottom: 1px solid #e2e8f0; }
  .breadcrumb-inner { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; padding: 10px 0; font-size: 12px; color: #64748b; }
  .breadcrumb a { color: #2563eb; font-weight: 600; text-decoration: none; }
  .breadcrumb .crumb-sep { color: #cbd5e1; margin: 0 2px; }
  .breadcrumb-current { color: #0f172a; font-weight: 600; }
  .eyebrow-link { text-decoration: none; }
  .dash-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 24px; }
  .stat { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
  .card-spaced { margin-bottom: 16px; }
  .stat .num { font-size: 26px; font-weight: 800; }
  .stat .label { font-size: 11px; text-transform: uppercase; color: #64748b; }
  table.data { width: 100%; border-collapse: collapse; font-size: 13px; background: #fff; border-radius: 12px; overflow: hidden; }
  table.data th, table.data td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #f1f5f9; }
  table.data thead th { background: #f1f5f9; font-size: 11px; text-transform: uppercase; color: #475569; }
  .consent-banner { position: fixed; left: 0; right: 0; bottom: 0; z-index: 100; padding: 12px; }
  .consent-banner.hidden { display: none; }
  .consent-banner-inner { max-width: 640px; margin: 0 auto; background: #0f172a; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.25); padding: 16px 18px; display: flex; flex-direction: column; gap: 12px; }
  @media (min-width: 640px) { .consent-banner-inner { flex-direction: row; align-items: center; } }
  .consent-banner-text { font-size: 12px; line-height: 1.5; color: #cbd5e1; margin: 0; flex: 1; }
  .consent-banner-text a { color: #60a5fa; text-decoration: underline; }
  .consent-banner-actions { display: flex; gap: 8px; flex-shrink: 0; }
  .consent-btn { font-size: 12px; font-weight: 700; padding: 9px 16px; border-radius: 999px; border: 0; cursor: pointer; }
  .consent-btn-secondary { background: #1e293b; color: #e2e8f0; }
  .consent-btn-primary { background: #2563eb; color: #fff; }
  .site-footer nav { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 14px; margin-bottom: 8px; font-size: 12px; }
  .site-footer nav a { color: #475569; text-decoration: none; font-weight: 600; }
  .site-footer nav a:hover { text-decoration: underline; }
  .site-footer .footer-entity { font-size: 11px; color: #94a3b8; margin-top: 4px; }
  .sister-links { display: flex; flex-wrap: wrap; justify-content: center; align-items: baseline; gap: 4px 10px; margin: 10px 0; font-size: 11px; }
  .sister-links-label { color: #94a3b8; }
  .sister-links a { color: #475569; text-decoration: none; }
  .sister-links a:hover { text-decoration: underline; }
  .blog-grid { display: grid; gap: 16px; margin-top: 16px; }
  .blog-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; text-decoration: none; display: block; }
  .blog-card h2 { font-size: 17px; font-weight: 800; margin: 0 0 6px; color: #0f172a; }
  .blog-card p { font-size: 13px; color: #64748b; margin: 0; }
  .article-body h1 { font-size: 24px; font-weight: 900; margin: 0 0 14px; color: #0f172a; }
  .article-body h2 { font-size: 19px; font-weight: 800; margin: 26px 0 10px; color: #0f172a; }
  .article-body h3 { font-size: 15px; font-weight: 800; margin: 20px 0 8px; color: #0f172a; }
  .article-body p, .article-body li { font-size: 14px; line-height: 1.7; color: #334155; }
  .article-body blockquote.pro-tip { background: #eff6ff; border-left: 4px solid #2563eb; margin: 18px 0; padding: 12px 16px; border-radius: 0 10px 10px 0; font-size: 13px; color: #1e3a8a; }
  .article-body table { width: 100%; border-collapse: collapse; font-size: 13px; margin: 16px 0; }
  .article-body th, .article-body td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #e2e8f0; }
  .article-body thead th { background: #f1f5f9; font-size: 11px; text-transform: uppercase; color: #475569; }
  .article-meta { font-size: 12px; color: #94a3b8; margin-bottom: 4px; }
  .author-box { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b; }
  .article-breadcrumb { padding: 10px 0; font-size: 12px; }
`;

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[ch]));
}

// Real logo + full favicon package (Sean's 2026-08-04 upload, run through
// realfavicongenerator.net), served via dedicated cached routes rather than
// inlined here — see brand-assets.js for why.
const LOGO_HREF = '/apple-touch-icon.png';

// AdSense's own loader script is NOT included here (unlike the old
// unconditional adsenseHead()) — it only gets injected client-side, after
// consent, by consentBanner()'s activation logic below. Loading it
// unconditionally in <head> on every page (including pages with no ad slot
// at all) is both wasteful and defeats the point of gating ads behind
// consent: the script itself sets/reads doubleclick.net cookies before a
// visitor has made any choice.
function adSlot() {
  return `
  <div class="ad-slot">
    <ins class="adsbygoogle" style="display:block;width:100%;min-height:100px" data-ad-client="ca-${ADSENSE_PUBLISHER_ID}" data-ad-format="auto" data-full-width-responsive="true"></ins>
  </div>`;
}

// Consent Mode v2: default every storage category to denied BEFORE gtag.js
// loads, so the very first pageview already respects an undecided visitor's
// (non-)consent. consentBanner() below calls gtag('consent','update',...)
// once a choice is made — GA itself then adjusts what it collects, no
// separate gating needed on the analytics side (unlike AdSense above, which
// has no equivalent built-in consent hook and has to be gated manually).
function gaHead() {
  return `<!-- Google tag (gtag.js) -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });
</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script>
<script>
  gtag('js', new Date());
  gtag('config', '${GA_MEASUREMENT_ID}');
</script>`;
}

// First-party cookie-consent banner: shown once per browser (localStorage),
// blocks in both directions — GA via Consent Mode v2 above, AdSense by
// simply never injecting its loader script or calling push() on any
// .adsbygoogle placeholder until the visitor accepts. No page reload on
// Accept (matches the no-reload pattern already established on
// propertyalert.uk's own consent banner, Brief 1014): the visitor's current
// pageview activates ads immediately via the same script, just without a
// server round-trip.
function consentBanner() {
  return `
<div id="consent-banner" class="consent-banner hidden" role="dialog" aria-label="Cookie consent">
  <div class="consent-banner-inner">
    <p class="consent-banner-text">We use cookies for analytics and, where you consent, to show relevant ads. Read our <a href="/privacy-policy">Privacy Policy</a>.</p>
    <div class="consent-banner-actions">
      <button id="consent-reject" type="button" class="consent-btn consent-btn-secondary">Reject</button>
      <button id="consent-accept" type="button" class="consent-btn consent-btn-primary">Accept All</button>
    </div>
  </div>
</div>
<script>
(function () {
  'use strict';
  var KEY = 'gl_ad_consent';
  var banner = document.getElementById('consent-banner');
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}

  function activateAds() {
    if (document.getElementById('adsbygoogle-loader')) return;
    var slots = document.querySelectorAll('ins.adsbygoogle');
    if (!slots.length) return;
    var s = document.createElement('script');
    s.id = 'adsbygoogle-loader';
    s.async = true;
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${ADSENSE_PUBLISHER_ID}';
    s.crossOrigin = 'anonymous';
    s.onload = function () {
      slots.forEach(function () {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      });
    };
    document.head.appendChild(s);
  }

  function updateConsent(granted) {
    if (typeof gtag !== 'function') return;
    gtag('consent', 'update', {
      ad_storage: granted ? 'granted' : 'denied',
      ad_user_data: granted ? 'granted' : 'denied',
      ad_personalization: granted ? 'granted' : 'denied',
      analytics_storage: granted ? 'granted' : 'denied'
    });
    if (granted) activateAds();
  }

  if (stored === 'granted' || stored === 'denied') {
    updateConsent(stored === 'granted');
  } else if (banner) {
    banner.classList.remove('hidden');
  }

  function choose(granted) {
    try { localStorage.setItem(KEY, granted ? 'granted' : 'denied'); } catch (e) {}
    updateConsent(granted);
    if (banner) banner.classList.add('hidden');
  }

  var acceptBtn = document.getElementById('consent-accept');
  var rejectBtn = document.getElementById('consent-reject');
  if (acceptBtn) acceptBtn.addEventListener('click', function () { choose(true); });
  if (rejectBtn) rejectBtn.addEventListener('click', function () { choose(false); });
})();
</script>`;
}

function pageShell({ title, description, headExtra = '', bodyClass = '', children }) {
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
${gaHead()}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="shortcut icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<meta name="apple-mobile-web-app-title" content="${SITE_NAME}">
<link rel="manifest" href="/site.webmanifest">
<style>${BASE_STYLES}</style>
${headExtra}
</head>
<body class="${bodyClass}">
${children}
${consentBanner()}
</body>
</html>`;
}

function siteHeader({ eyebrow, title }) {
  return `
<header class="site-header">
  <div class="wrap row">
    <div class="brand-row">
      <a class="eyebrow-link" href="/"><img class="brand-logo" src="${LOGO_HREF}" alt="${SITE_NAME}" width="36" height="38"></a>
      <div>
        <a class="eyebrow-link" href="/"><span class="eyebrow">${escapeHtml(eyebrow)}</span></a>
        <span class="title">${title}</span>
      </div>
    </div>
    <a class="call-btn" href="tel:${PHONE_TEL}">📞 ${PHONE_DISPLAY}</a>
  </div>
</header>`;
}

// Sister sites under the same EIGHTFINITY LTD umbrella — plain contextual
// link text (not keyword-stuffed anchors), matching what each site actually
// does rather than an SEO-motivated description. Company number/address
// verified directly against Companies House (2026-08-04), not taken on
// trust from the pasted proposal that suggested this cross-linking —
// that proposal's address matched the official record, but a stale,
// never-deployed new_privacy.html draft elsewhere in the Groundlayer repo
// had a different, wrong address, which is exactly why this got checked
// independently rather than copied.
function sisterSiteLinks() {
  return `
    <nav class="sister-links" aria-label="Partner property networks">
      <span class="sister-links-label">Also part of the EIGHTFINITY network:</span>
      <a href="https://propertyalert.uk" target="_blank" rel="noopener">PropertyAlert (off-market property deal alerts)</a>
      <a href="https://propertybrain.uk" target="_blank" rel="noopener">PropertyBrain (landlord cashflow calculators)</a>
      <a href="https://howmuchismyhomeworth.uk" target="_blank" rel="noopener">HowMuchIsMyHomeWorth (instant home valuation)</a>
    </nav>`;
}

function siteFooter() {
  return `
<footer class="site-footer">
  <div class="wrap">
    <nav aria-label="Legal">
      <a href="/about/">About</a>
      <a href="/contact/">Contact</a>
      <a href="/blog/">Blog</a>
      <a href="/terms-of-service/">Terms of Service</a>
      <a href="/privacy-policy">Privacy Policy</a>
    </nav>
    <div>${SITE_NAME} Specialist Network &middot; England, Wales &amp; Scotland &middot; <a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a></div>
    ${sisterSiteLinks()}
    <div class="footer-entity">${SITE_NAME} is a specialized structural trade directory operated by EIGHTFINITY LTD, a company registered in England and Wales (company no. 15528515), registered office 20 Wenlock Road, London, England, N1 7GU.</div>
  </div>
</footer>`;
}

// "County" and "Town" are shown for orientation but not linked — there's no
// dedicated page for either yet, and a breadcrumb link that just dumps you
// back on the generic hub would be misleading. Only "Home" and the current
// page are real links, matching what the BreadcrumbList JSON-LD below
// actually asserts (no "item" URL for entries with no real page).
function renderBreadcrumb({ county, town, nicheLabel }) {
  return `
<nav class="breadcrumb" aria-label="Breadcrumb">
  <div class="wrap breadcrumb-inner">
    <a href="/">Home</a><span class="crumb-sep">/</span>
    <span>${escapeHtml(county)}</span><span class="crumb-sep">/</span>
    <span>${escapeHtml(town)}</span><span class="crumb-sep">/</span>
    <span class="breadcrumb-current" aria-current="page">${escapeHtml(nicheLabel)}</span>
  </div>
</nav>`;
}

export function renderLandingPage({ niche, town }) {
  const pageTitle = `${niche.label} in ${town.name} | ${SITE_NAME} Structural`;
  const description = `Get expert, high-ticket ${niche.short} services in ${town.name}. Rapid on-site engineering assessments, specialist contractors, and transparent quotes.`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': BUSINESS_TYPE,
    name: `${SITE_NAME} — ${niche.label} — ${town.name}`,
    description,
    telephone: PHONE_DISPLAY,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: town.name,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: town.name,
      addressRegion: town.county,
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: town.lat,
      longitude: town.lon,
    },
  };

  const pageUrl = `${SITE_URL}/${niche.slug}-${town.slug}/`;
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: town.county },
      { '@type': 'ListItem', position: 3, name: town.name },
      { '@type': 'ListItem', position: 4, name: niche.label, item: pageUrl },
    ],
  };

  const headExtra = `<script type="application/ld+json">${JSON.stringify(schema)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`;

  const body = `
${siteHeader({ eyebrow: `${SITE_NAME} Specialist Network`, title: `${escapeHtml(niche.label)} <span class="accent">${escapeHtml(town.name)}</span>` })}
${renderBreadcrumb({ county: town.county, town: town.name, nicheLabel: niche.label })}
<main class="wrap">
  <div class="grid two-col">
    <section>
      <div class="card">
        <h2>Structural Engineering &amp; Specialist Diagnostics</h2>
        <p>Property issues involving <strong>${escapeHtml(niche.short)}</strong> across the <strong>${escapeHtml(town.name)}</strong> area need prompt, qualified attention. We coordinate independent structural specialists covering ${escapeHtml(niche.description)}.</p>
      </div>
      ${adSlot()}
      <div class="card">
        <table class="sla" aria-label="Service performance">
          <caption>Performance SLA</caption>
          <thead><tr><th scope="col">Metric</th><th scope="col">Target</th></tr></thead>
          <tbody>
            <tr><td>Initial assessment review</td><td>Under 2 hours</td></tr>
            <tr><td>On-site inspection</td><td>Within 48 hours</td></tr>
          </tbody>
        </table>
      </div>
    </section>
    <aside class="sticky-aside">
      <div class="card">
        <h2>Request an Inspection</h2>
        <p>Complete the form below. You can upload photos directly from your phone.</p>
        <form action="/local/submit-lead" method="POST" enctype="multipart/form-data">
          <input type="hidden" name="town" value="${escapeHtml(town.slug)}">
          <input type="hidden" name="niche" value="${escapeHtml(niche.slug)}">
          <div class="field">
            <label for="client_name">Your name</label>
            <input type="text" id="client_name" name="client_name" required>
          </div>
          <div class="field">
            <label for="client_phone">Contact phone</label>
            <input type="tel" id="client_phone" name="client_phone" required>
          </div>
          <div class="field">
            <label for="client_email">Email address</label>
            <input type="email" id="client_email" name="client_email" required>
          </div>
          <div class="field">
            <label for="damage_details">Details</label>
            <textarea id="damage_details" name="damage_details" rows="3" required placeholder="Describe cracking, movement, leaks..."></textarea>
          </div>
          <div class="field">
            <label>Photos (optional)</label>
            <div class="file-drop">
              <input type="file" name="damage_photo" accept="image/*">
              <span>📷 Tap to select or take a photo</span>
            </div>
          </div>
          <p class="consent-note">By submitting, you agree to our processing terms. View our <a href="/privacy-policy">Privacy Policy</a>.</p>
          <button type="submit" class="submit-btn">Submit Assessment Request</button>
        </form>
      </div>
    </aside>
  </div>
</main>
${siteFooter()}`;

  return pageShell({ title: pageTitle, description, headExtra, children: body });
}

export function renderThankYouPage() {
  const body = `
${siteHeader({ eyebrow: SITE_NAME, title: 'Request received' })}
<main class="wrap">
  <div class="card">
    <h2>Thanks — we've got your request.</h2>
    <p>A specialist will call you shortly. If it's urgent, call <a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a> now.</p>
  </div>
</main>
${siteFooter()}`;
  return pageShell({ title: `Request received | ${SITE_NAME}`, description: 'Your enquiry has been received.', children: body });
}

export function renderHubPage() {
  const byCounty = new Map();
  for (const town of TOWNS) {
    if (!byCounty.has(town.county)) byCounty.set(town.county, []);
    byCounty.get(town.county).push(town);
  }
  const counties = [...byCounty.keys()].sort();

  const groupsHtml = counties
    .map((county) => {
      const towns = byCounty.get(county);
      const townCards = towns
        .map((town) => {
          const searchText = [town.name, town.county, ...NICHES.map((n) => n.label)]
            .join(' ')
            .toLowerCase();
          const links = NICHES.map(
            (n) => `<a href="/${n.slug}-${town.slug}/">${escapeHtml(n.label)}</a>`
          ).join('');
          return `
          <div class="town-card" data-search-text="${escapeHtml(searchText)}">
            <span class="town-name">${escapeHtml(town.name)}</span>
            <div class="niche-links">${links}</div>
          </div>`;
        })
        .join('');
      return `
      <div class="county-group" data-county-group>
        <h2>${escapeHtml(county)}</h2>
        <div class="town-chips">${townCards}</div>
      </div>`;
    })
    .join('');

  const body = `
${siteHeader({ eyebrow: SITE_NAME, title: 'Find a Local Specialist' })}
<main class="wrap">
  <input type="text" id="directory-search" class="search-box" placeholder="Search by town, county, or service…">
  ${groupsHtml}
</main>
${siteFooter()}
<script>${HUB_SEARCH_SCRIPT}</script>`;

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    telephone: PHONE_DISPLAY,
    email: ADMIN_EMAIL,
    address: { '@type': 'PostalAddress', addressCountry: 'GB' },
    areaServed: { '@type': 'Country', name: 'United Kingdom', identifier: 'GB' },
  };
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
  };
  const headExtra = `<script type="application/ld+json">${JSON.stringify(orgSchema)}</script>
<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>`;

  return pageShell({
    title: `${SITE_NAME} — UK Structural Specialist Directory`,
    description: `Find vetted structural specialists for subsidence repair, commercial roofing, tree surgery, and basement waterproofing across ${TOWNS.length} UK towns.`,
    headExtra,
    children: body,
  });
}

export function renderLoginPage({ sent, next = null }) {
  const body = `
${siteHeader({ eyebrow: SITE_NAME, title: 'Dashboard sign-in' })}
<main class="wrap">
  <div class="card">
    ${
      sent
        ? '<p>Check the inbox for a sign-in link. It expires in 15 minutes.</p>'
        : `<form action="/local/dashboard/login" method="POST">
             ${next ? `<input type="hidden" name="next" value="${next}">` : ''}
             <div class="field">
               <label for="email">Admin email</label>
               <input type="email" id="email" name="email" required>
             </div>
             <button type="submit" class="submit-btn">Email me a login link</button>
           </form>`
    }
  </div>
</main>
${siteFooter()}`;
  return pageShell({ title: `Sign in | ${SITE_NAME}`, description: 'Dashboard sign-in.', children: body });
}

const TOWN_NAME_BY_SLUG = new Map(TOWNS.map((t) => [t.slug, t.name]));
const NICHE_LABEL_BY_SLUG = new Map(NICHES.map((n) => [n.slug, n.label]));

export async function renderDashboard(env) {
  const [leadsCount, viewsCount, recentLeads, topSegments] = await Promise.all([
    env.DB.prepare('SELECT COUNT(*) AS n FROM leads').first(),
    env.DB.prepare('SELECT COUNT(*) AS n FROM analytics_views').first(),
    env.DB.prepare(
      'SELECT reference_num, town, niche, client_name, client_phone, client_email, image_url, status, created_at FROM leads ORDER BY created_at DESC LIMIT 100'
    ).all(),
    env.DB.prepare(
      'SELECT town, niche, COUNT(*) AS volume FROM analytics_views GROUP BY town, niche ORDER BY volume DESC LIMIT 5'
    ).all(),
  ]);

  const topSegmentRows = (topSegments.results || [])
    .map(
      (row) => `
      <tr>
        <td>${escapeHtml(TOWN_NAME_BY_SLUG.get(row.town) || row.town)}</td>
        <td>${escapeHtml(NICHE_LABEL_BY_SLUG.get(row.niche) || row.niche)}</td>
        <td>${row.volume}</td>
      </tr>`
    )
    .join('');

  const rows = (recentLeads.results || [])
    .map(
      (lead) => `
      <tr>
        <td>${escapeHtml(lead.reference_num)}</td>
        <td>${escapeHtml(lead.created_at)}</td>
        <td>${escapeHtml(lead.niche)}</td>
        <td>${escapeHtml(lead.town)}</td>
        <td>${escapeHtml(lead.client_name)}</td>
        <td>${escapeHtml(lead.client_phone)}</td>
        <td>${escapeHtml(lead.client_email)}</td>
        <td>${lead.image_url ? `<a href="${escapeHtml(lead.image_url)}" target="_blank" rel="noopener">Photo</a>` : '—'}</td>
        <td>${escapeHtml(lead.status)}</td>
      </tr>`
    )
    .join('');

  const body = `
${siteHeader({ eyebrow: SITE_NAME, title: 'Evidence Dashboard' })}
<main class="wrap">
  <div class="dash-stats">
    <div class="stat"><div class="num">${leadsCount.n}</div><div class="label">Leads</div></div>
    <div class="stat"><div class="num">${viewsCount.n}</div><div class="label">Page views</div></div>
  </div>
  <div class="card card-spaced">
    <a href="/local/dashboard/export.csv">Export leads as CSV</a>
  </div>
  <div class="card card-spaced">
    <h2>Top Performing Town / Service Segments</h2>
    <table class="data">
      <thead><tr><th>Town</th><th>Service</th><th>Page views</th></tr></thead>
      <tbody>${topSegmentRows || '<tr><td colspan="3">No page views yet.</td></tr>'}</tbody>
    </table>
  </div>
  <div class="card">
    <table class="data">
      <thead><tr><th>Ref</th><th>Date</th><th>Service</th><th>Town</th><th>Name</th><th>Phone</th><th>Email</th><th>Photo</th><th>Status</th></tr></thead>
      <tbody>${rows || '<tr><td colspan="9">No leads yet.</td></tr>'}</tbody>
    </table>
  </div>
</main>
${siteFooter()}`;

  return pageShell({ title: `Dashboard | ${SITE_NAME}`, description: 'Internal evidence dashboard.', children: body });
}

// Only the public content pages (hub + about/contact/legal/blog + 204
// landing pages) are listed — /local/dashboard, /local/submit-lead,
// /local/uploads/* are deliberately excluded: dashboard is auth-gated
// (Google can't crawl it anyway), submit-lead is POST-only, and uploads are
// private lead photos. Blog articles carry their own real publishedAt as
// lastmod (from blog-content.js) rather than defaulting to "today" like the
// other pages — a fabricated freshness date would mislead the crawler.
export function renderSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: `${SITE_URL}/`, priority: '1.0' },
    { loc: `${SITE_URL}/about/`, priority: '0.4' },
    { loc: `${SITE_URL}/contact/`, priority: '0.4' },
    { loc: `${SITE_URL}/privacy-policy`, priority: '0.3' },
    { loc: `${SITE_URL}/terms-of-service/`, priority: '0.3' },
    { loc: `${SITE_URL}/blog/`, priority: '0.6' },
  ];
  for (const article of BLOG_ARTICLES) {
    urls.push({ loc: `${SITE_URL}/blog/${article.slug}/`, priority: '0.6', lastmod: article.publishedAt });
  }
  for (const niche of NICHES) {
    for (const town of TOWNS) {
      urls.push({ loc: `${SITE_URL}/${niche.slug}-${town.slug}/`, priority: '0.8' });
    }
  }

  const entries = urls
    .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod || today}</lastmod><priority>${u.priority}</priority></url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
}

// Traditional search engines discover pages via the wildcard allow rule below
// plus /sitemap.xml. AI answer engines (ChatGPT, Claude, Perplexity, Google's
// AI Overviews) crawl and cite under their own named user-agents, so they're
// listed explicitly here rather than relying solely on the "*" fallback —
// and given their own hub file at /llms.txt (renderLlmsTxt below) instead of
// a sitemap, since they consume a plain-language summary, not a URL index.
export function renderRobotsTxt() {
  const disallowLocal = 'Allow: /\nDisallow: /local/';
  const aiBots = ['GPTBot', 'ChatGPT-User', 'Claude-Web', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Gemini-Web', 'Omgilibot', 'FacebookBot'];
  const aiBlocks = aiBots.map((bot) => `User-agent: ${bot}\n${disallowLocal}`).join('\n\n');
  return `User-agent: *\n${disallowLocal}\n\n${aiBlocks}\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

export function renderAdsTxt() {
  return `google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n`;
}

export function renderLlmsTxt() {
  const services = NICHES.map((n) => `- **${n.label}** — ${n.description}`).join('\n');
  const townNames = TOWNS.map((t) => t.name).join(', ');
  return `# ${SITE_NAME}

> ${SITE_NAME} is a UK specialist trade directory connecting property owners with vetted structural and building contractors across ${TOWNS.length} UK towns and cities.

## Services

${services}

## Towns covered

${townNames}

## Guides

${BLOG_ARTICLES.map((a) => `- [${a.title}](${SITE_URL}/blog/${a.slug}/) — ${a.summary}`).join('\n')}

## Contact

Phone: ${PHONE_DISPLAY}
Email: ${ADMIN_EMAIL}
About: ${SITE_URL}/about/
Sitemap: ${SITE_URL}/sitemap.xml
`;
}

export function renderPrivacyPolicy() {
  const pageTitle = `Privacy Policy | ${SITE_NAME}`;
  const description = `How ${SITE_NAME} collects, uses, and protects your information when you request a specialist inspection.`;
  const body = `
${siteHeader({ eyebrow: `${SITE_NAME} Specialist Network`, title: 'Privacy Policy' })}
<main class="wrap">
  <div class="card policy-body">
    <h2>Who we are</h2>
    <p>${SITE_NAME} (groundlayer.co.uk) is operated by EIGHTFINITY LTD. For any privacy question, contact <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a> or call <a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a>.</p>

    <h2>What we collect</h2>
    <p>When you submit an inspection request, we collect your name, phone number, email address, the details you describe, and an optional photo. We also use Google Analytics to understand how visitors use the site, and Google AdSense may set advertising cookies.</p>

    <h2>Why we collect it</h2>
    <p>Your enquiry details are used solely to connect you with a specialist contractor from our network so they can prepare an assessment and quote. Analytics data helps us understand site usage and improve the service.</p>

    <h2>Who we share it with</h2>
    <p>Your enquiry is shared with the specialist contractor best placed to handle your request. We do not sell your data to third parties.</p>

    <h2>Cookies</h2>
    <p>This site uses cookies for analytics (Google Analytics) and, where you consent, advertising (Google AdSense). On your first visit you'll see a cookie banner where you can accept or reject non-essential cookies; no analytics or advertising cookie is set until you choose. You can change your choice at any time by clearing your browser's site data for groundlayer.co.uk.</p>

    <h2>How long we keep it</h2>
    <p>We retain enquiry data for as long as necessary to fulfil your request and to meet any legal or accounting obligations, after which it is deleted.</p>

    <h2>Your rights</h2>
    <p>Under UK GDPR, you have the right to access, correct, or request deletion of your personal data. To exercise any of these rights, email <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a>.</p>
  </div>
</main>
${siteFooter()}`;

  return pageShell({ title: pageTitle, description, bodyClass: '', children: body });
}

export function renderAboutPage() {
  const pageTitle = `About | ${SITE_NAME}`;
  const description = `What ${SITE_NAME} does, how it works, and who operates it.`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${SITE_NAME}`,
    url: `${SITE_URL}/about/`,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
  };
  const headExtra = `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;

  const body = `
${siteHeader({ eyebrow: `${SITE_NAME} Specialist Network`, title: 'About Us' })}
<main class="wrap">
  <div class="card policy-body">
    <h2>Why Groundlayer exists</h2>
    <p>Structural problems don't wait for a convenient time. Subsidence, a failing commercial roof, a dangerous tree, or a wet basement are all urgent, and finding the right specialist quickly is harder than it should be — most property owners only need to do it once or twice in a lifetime, so they're starting from zero every time. Groundlayer exists to close that gap: a single place to describe what's wrong and get connected with a vetted specialist who actually does that specific type of work, in that specific part of the UK.</p>

    <h2>What we cover</h2>
    <p>We focus on four specialist categories where getting the wrong contractor is expensive and hard to undo: subsidence repair (diagnostics, underpinning coordination, and resin injection remediation), commercial roofing (flat and pitched surveys, repairs, and recover/replacement), tree surgery (crown reduction, dangerous tree removal, and root-related subsidence risk assessment), and basement waterproofing (cavity drain membrane systems and tanking). Each of these is a field with its own qualifications, insurance requirements, and failure modes — a generalist "handyman" directory doesn't sort for any of that, and we think it should.</p>

    <h2>How it works</h2>
    <p>Find your town and the type of issue you're dealing with, fill in a short assessment request with a few photos if you have them, and our coordination team routes your enquiry to a specialist from our network who covers that trade and that area. We publish a performance SLA on every page — initial assessment review under 2 hours, on-site inspection within 48 hours — because we think you should know what to expect before you submit anything.</p>

    <h2>Who operates Groundlayer</h2>
    <p>Groundlayer (groundlayer.co.uk) is operated by EIGHTFINITY LTD, a UK company. We are a specialist directory and lead-coordination service: we connect property owners with independent structural and building specialists, we are not ourselves a contractor, engineering firm, or insurer, and we don't perform any of the on-site work described on this site. Full detail on how we handle your information is in our <a href="/privacy-policy">Privacy Policy</a>, and the terms governing use of this site are in our <a href="/terms-of-service/">Terms of Service</a>.</p>

    <h2>Get in touch</h2>
    <p>Questions about a submitted enquiry, this site, or anything else — see our <a href="/contact/">Contact page</a>, call <a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a>, or browse the <a href="/blog/">blog</a> for guides on spotting these issues before they get worse.</p>
  </div>
</main>
${siteFooter()}`;

  return pageShell({ title: pageTitle, description, headExtra, children: body });
}

export function renderContactPage() {
  const pageTitle = `Contact | ${SITE_NAME}`;
  const description = `Get in touch with ${SITE_NAME}.`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${SITE_NAME}`,
    url: `${SITE_URL}/contact/`,
  };
  const headExtra = `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;

  const body = `
${siteHeader({ eyebrow: `${SITE_NAME} Specialist Network`, title: 'Contact' })}
<main class="wrap">
  <div class="card policy-body">
    <h2>Talk to us</h2>
    <p>For an urgent enquiry, call <a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a> and we'll take your details directly. For anything else — a question about a submitted request, privacy, press, or a specialist wanting to join our network — email <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a>. EIGHTFINITY LTD responds to enquiries within 2 working days.</p>
    <p>If you're reporting a structural issue at your property, you'll get a faster response using the assessment request form on the relevant <a href="/">town and service page</a> rather than email — that routes directly to a specialist covering your area.</p>
  </div>
</main>
${siteFooter()}`;

  return pageShell({ title: pageTitle, description, headExtra, children: body });
}

export function renderTermsPage() {
  const pageTitle = `Terms of Service | ${SITE_NAME}`;
  const description = `The terms governing use of ${SITE_NAME}.`;
  const body = `
${siteHeader({ eyebrow: `${SITE_NAME} Specialist Network`, title: 'Terms of Service' })}
<main class="wrap">
  <div class="card policy-body">
    <h2>What Groundlayer is</h2>
    <p>${SITE_NAME} (groundlayer.co.uk) is a specialist directory and lead-coordination service operated by EIGHTFINITY LTD, a UK company. We connect property owners with independent, third-party specialists in subsidence repair, commercial roofing, tree surgery, and basement waterproofing. We are not a contractor, engineering firm, or insurer, and we do not ourselves carry out any inspection, survey, or building work.</p>

    <h2>No guarantee of work, pricing, or outcome</h2>
    <p>Submitting an assessment request connects you with an independent specialist from our network; it does not create a contract between you and Groundlayer or EIGHTFINITY LTD, and we don't guarantee that a specialist will be available, that any quote will be accepted, or the quality, pricing, or outcome of work carried out by a specialist. Any agreement for inspection or building work is between you and the specialist directly.</p>

    <h2>Acceptable use</h2>
    <p>You agree to provide accurate contact and property details when submitting a request, and not to use this site to submit false enquiries, scrape or republish its content, or attempt to disrupt the service.</p>

    <h2>Liability</h2>
    <p>To the extent permitted by law, EIGHTFINITY LTD is not liable for any loss arising from work carried out, or not carried out, by a specialist contacted through this site. Nothing in these terms excludes liability that cannot be excluded under UK law.</p>

    <h2>Changes to these terms</h2>
    <p>We may update these terms from time to time; the current version always applies. Continued use of the site after a change means you accept the update.</p>

    <h2>Governing law</h2>
    <p>These terms are governed by the law of England and Wales.</p>

    <h2>Contact</h2>
    <p>Questions about these terms: <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a>. See also our <a href="/privacy-policy">Privacy Policy</a>.</p>
  </div>
</main>
${siteFooter()}`;

  return pageShell({ title: pageTitle, description, children: body });
}

const BLOG_ARTICLE_BY_SLUG = new Map(BLOG_ARTICLES.map((a) => [a.slug, a]));

export function getBlogArticleBySlug(slug) {
  return BLOG_ARTICLE_BY_SLUG.get(slug) || null;
}

export function renderBlogHub() {
  const pageTitle = `Blog | ${SITE_NAME}`;
  const description = `Guides on spotting subsidence, commercial roofing problems, dangerous trees, and basement water ingress before they get worse.`;

  // Visible card grid and the Blog JSON-LD blogPost array are built from the
  // same BLOG_ARTICLES list so they can't drift out of sync with each other.
  const cardsHtml = BLOG_ARTICLES.map(
    (a) => `
    <a class="blog-card" href="/blog/${a.slug}/">
      <h2>${escapeHtml(a.title)}</h2>
      <p>${escapeHtml(a.summary)}</p>
    </a>`
  ).join('');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Blog`,
    url: `${SITE_URL}/blog/`,
    blogPost: BLOG_ARTICLES.map((a) => ({
      '@type': 'BlogPosting',
      headline: a.title,
      url: `${SITE_URL}/blog/${a.slug}/`,
      datePublished: a.publishedAt,
    })),
  };
  const headExtra = `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;

  const body = `
${siteHeader({ eyebrow: `${SITE_NAME} Specialist Network`, title: 'Blog' })}
<main class="wrap">
  <div class="blog-grid">${cardsHtml}</div>
</main>
${siteFooter()}`;

  return pageShell({ title: pageTitle, description, headExtra, children: body });
}

export function renderBlogArticle(article) {
  const pageTitle = `${article.title} | ${SITE_NAME}`;
  const pageUrl = `${SITE_URL}/blog/${article.slug}/`;

  const postSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    url: pageUrl,
    author: { '@type': 'Organization', name: 'EIGHTFINITY LTD' },
    publisher: { '@type': 'Organization', name: 'EIGHTFINITY LTD' },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Blog', item: `${SITE_URL}/blog/` },
      { '@type': 'ListItem', position: 2, name: article.title, item: pageUrl },
    ],
  };
  const headExtra = `<script type="application/ld+json">${JSON.stringify(postSchema)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`;

  const body = `
${siteHeader({ eyebrow: `${SITE_NAME} Specialist Network`, title: 'Blog' })}
<main class="wrap">
  <nav class="breadcrumb-inner article-breadcrumb">
    <a href="/blog/">Blog</a><span class="crumb-sep">/</span><span class="breadcrumb-current">${escapeHtml(article.title)}</span>
  </nav>
  <div class="card article-body">
    <p class="article-meta">Published ${escapeHtml(article.publishedAt)}</p>
    <h1>${escapeHtml(article.title)}</h1>
    ${article.bodyHtml}
  </div>
</main>
${siteFooter()}`;

  return pageShell({ title: pageTitle, description: article.summary, headExtra, children: body });
}
