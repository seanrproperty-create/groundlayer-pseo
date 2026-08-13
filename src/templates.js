import { HUB_SEARCH_SCRIPT } from './search.js';
import { BLOG_ARTICLES } from './blog-content.js';
import { getFaqForNiche } from './faq-content.js';
import { FLOOD_AREA_COUNT_BY_TOWN_SLUG, FLOOD_DATA_SOURCE_NOTE, HIGHER_CLAY_RISK_COUNTIES, COASTAL_TOWN_SLUGS, HIGHER_KNOTWEED_RISK_COUNTIES, KNOTWEED_DATA_SOURCE_NOTE } from './town-facts.js';
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
  NEAREST_TOWNS_BY_SLUG,
} from './constants.js';

// No Tailwind CDN script (the pasted plan used <script src="https://tailwindcss.com">,
// which ships the full JIT compiler to every visitor, recalculates styles
// client-side, and is explicitly called out by Tailwind's own docs as
// "not designed for production" — it would work against the CLS/performance
// goal, not help it). Plain hand-rolled CSS instead, inlined once per page.
// Concept 4 "Front Step" — locked by Sean 2026-08-10 (see
// project_groundlayer_visual_refresh memory + the mockup artifact,
// https://claude.ai/code/artifact/a04056e9-4a1b-4d4f-9d2e-a6e4c4942506).
// Palette/type/shape tokens below are lifted directly from that mockup's
// CSS, not re-derived — every existing class name and layout mechanic
// (grid columns, flex direction, media-query breakpoints) is preserved
// unchanged; only color, font-family, border-radius and border-weight
// change, so no render*() markup elsewhere in this file needed editing.
// Two-font system throughout, matching the mockup exactly: Georgia serif
// for the body default and all real reading content (paragraphs, article
// text, FAQ answers); "Segoe UI Semibold" sans for UI chrome (buttons,
// nav, labels, badges, stat numbers, table headers) — applied directly on
// each chrome selector below rather than via a ".disp" class, so nothing
// in the HTML output needed to change to pick it up. The signature shape
// language is a border-radius with one sharp corner (e.g. "16px 16px 16px
// 2px") on every card/button/pill/tag, exactly as in the mockup — kept
// consistent everywhere rather than mixed with symmetric radii.
const BASE_STYLES = `
  :root {
    color-scheme: light;
    --coral: #d9673f;
    /* coral-deep and muted darkened 2026-08-13 -- the originals (#b84f2d,
       #8a7c68) failed WCAG AA 4.5:1 in real contexts on this page (coral-deep
       on the .niche-links chip background: 4.21:1; muted on white cards:
       4.07:1), caught by an external Yell.com audit reporting 463 contrast
       violations. These pass >=5.1:1 everywhere they're actually used. */
    --coral-deep: #a3441f;
    --sage: #7f9370;
    /* darkened alongside coral-deep/muted above -- #647a56 failed AA on
       sand (4.30:1) and the blog pro-tip background (4.13:1). */
    --sage-deep: #4f6144;
    --sand: #faf4ea;
    --card: #ffffff;
    --line: #ece2d0;
    --ink: #33291f;
    --muted: #6b5f4d;
  }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Georgia, "Bookman Old Style", "Palatino Linotype", serif; background: var(--sand); color: var(--ink); }
  h1 { font-weight: 400; letter-spacing: -0.01em; }
  a { color: inherit; }
  .wrap { max-width: 960px; margin: 0 auto; padding: 0 16px; }
  header.site-header { position: sticky; top: 0; z-index: 50; background: rgba(250,244,234,0.97); border-bottom: 2px solid var(--line); box-shadow: 0 1px 2px rgba(51,41,31,0.04); }
  header.site-header .row { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; gap: 12px; }
  .brand-row { display: flex; align-items: center; gap: 10px; }
  .brand-logo { display: block; width: 36px; height: 38px; object-fit: contain; flex-shrink: 0; }
  .eyebrow { font-family: "Segoe UI Semibold", "Segoe UI", Verdana, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--coral-deep); display: block; margin-bottom: 2px; }
  .title { display: block; margin: 0; font-family: "Segoe UI Semibold", "Segoe UI", Verdana, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: -0.01em; color: var(--ink); }
  .title .accent { color: var(--coral-deep); font-style: italic; }
  .call-btn { display: inline-flex; align-items: center; gap: 6px; background: var(--sage); color: #fff; font-family: "Segoe UI Semibold", "Segoe UI", Verdana, sans-serif; font-weight: 700; font-size: 14px; padding: 10px 16px; border-radius: 10px 10px 10px 2px; text-decoration: none; white-space: nowrap; }
  main { padding: 28px 0 48px; }
  .grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
  @media (min-width: 900px) { .grid.two-col { grid-template-columns: 7fr 5fr; align-items: start; } }
  .card { background: var(--card); border: 2px solid var(--line); border-radius: 16px 16px 16px 2px; padding: 24px; box-shadow: 0 1px 2px rgba(51,41,31,0.03); }
  .card h2 { font-family: Georgia, serif; font-size: 19px; font-weight: 700; margin: 0 0 10px; color: var(--ink); }
  .card p { font-size: 14px; line-height: 1.6; color: var(--ink); }
  table.sla { width: 100%; border-collapse: collapse; font-size: 12px; font-family: "Segoe UI", sans-serif; }
  table.sla caption { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); padding-bottom: 8px; }
  table.sla th, table.sla td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--line); }
  table.sla thead th { background: var(--sand); text-transform: uppercase; font-size: 10px; letter-spacing: 0.05em; color: var(--muted); }
  .sticky-aside { position: sticky; top: 90px; }
  label { display: block; font-family: "Segoe UI", sans-serif; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); margin-bottom: 4px; }
  input[type=text], input[type=tel], input[type=email], textarea { width: 100%; font-size: 14px; padding: 11px 12px; background: var(--sand); border: 2px solid var(--line); border-radius: 10px 10px 10px 2px; font-family: inherit; color: var(--ink); }
  .field { margin-bottom: 14px; }
  .file-drop { position: relative; border: 2px dashed var(--line); border-radius: 10px 10px 10px 2px; padding: 16px; text-align: center; background: var(--sand); }
  .file-drop input[type=file] { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }
  .submit-btn { width: 100%; background: var(--coral-deep); color: #fff; font-family: "Segoe UI Semibold", "Segoe UI", Verdana, sans-serif; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; padding: 14px; border: 0; border-radius: 10px 10px 10px 2px; cursor: pointer; }
  .consent-note { font-family: "Segoe UI", sans-serif; font-size: 11px; line-height: 1.5; color: var(--muted); margin: 0 0 10px; }
  .consent-note a { color: var(--coral-deep); text-decoration: underline; }
  .policy-body h2 { font-family: Georgia, serif; font-size: 16px; font-weight: 700; margin: 24px 0 8px; color: var(--ink); }
  .policy-body p, .policy-body li { font-size: 14px; line-height: 1.6; color: var(--ink); }
  .ad-slot { min-height: 100px; margin: 20px 0; display: flex; align-items: center; justify-content: center; background: var(--sand); border: 2px solid var(--line); border-radius: 12px 12px 12px 2px; font-family: "Segoe UI", sans-serif; font-size: 11px; color: var(--muted); overflow: hidden; }
  input.search-box { width: 100%; font-family: "Segoe UI", sans-serif; font-size: 15px; padding: 14px 16px; border-radius: 16px 16px 16px 2px; border: 2px solid var(--line); background: var(--card); margin-bottom: 24px; color: var(--ink); }
  .county-group { margin-bottom: 28px; }
  .county-group h2 { font-family: "Segoe UI", sans-serif; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); font-weight: 700; margin-bottom: 10px; }
  .town-chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .town-card { background: var(--card); border: 2px solid var(--line); border-radius: 12px 12px 12px 2px; padding: 12px 14px; flex: 1 1 260px; }
  .town-card .town-name { font-family: Georgia, serif; font-weight: 700; font-size: 14px; margin-bottom: 6px; display: block; color: var(--ink); }
  .niche-links { display: flex; flex-wrap: wrap; gap: 6px; }
  .niche-links a { font-family: "Segoe UI", sans-serif; font-size: 11px; background: #fbe8dc; color: var(--coral-deep); padding: 4px 8px; border-radius: 10px 10px 10px 2px; text-decoration: none; font-weight: 700; }
  footer.site-footer { border-top: 2px solid var(--line); padding: 24px 0; font-family: "Segoe UI", sans-serif; font-size: 12px; color: var(--muted); text-align: center; }
  .breadcrumb { background: var(--card); border-bottom: 2px solid var(--line); }
  .breadcrumb-inner { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; padding: 10px 0; font-family: "Segoe UI", sans-serif; font-size: 12px; color: var(--muted); }
  .breadcrumb a { color: var(--coral-deep); font-weight: 700; text-decoration: none; }
  .breadcrumb .crumb-sep { color: var(--line); margin: 0 2px; }
  .breadcrumb-current { color: var(--ink); font-weight: 700; }
  .eyebrow-link { text-decoration: none; }
  .dash-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 24px; }
  .stat { background: var(--card); border: 2px solid var(--line); border-radius: 12px 12px 12px 2px; padding: 16px; }
  .card-spaced { margin-bottom: 16px; }
  .stat .num { font-family: "Segoe UI Semibold", "Segoe UI", Verdana, sans-serif; font-size: 26px; font-weight: 800; color: var(--sage-deep); font-variant-numeric: tabular-nums; }
  .stat .label { font-family: "Segoe UI", sans-serif; font-size: 11px; text-transform: uppercase; color: var(--muted); }
  table.data { width: 100%; border-collapse: collapse; font-family: "Segoe UI", sans-serif; font-size: 13px; background: var(--card); border: 2px solid var(--line); border-radius: 12px; overflow: hidden; }
  table.data th, table.data td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--line); }
  table.data thead th { background: var(--sand); font-size: 11px; text-transform: uppercase; color: var(--muted); }
  .consent-banner { position: fixed; left: 0; right: 0; bottom: 0; z-index: 100; padding: 12px; }
  .consent-banner.hidden { display: none; }
  .consent-banner-inner { max-width: 640px; margin: 0 auto; background: var(--ink); border-radius: 16px 16px 16px 2px; box-shadow: 0 10px 30px rgba(51,41,31,0.35); padding: 16px 18px; display: flex; flex-direction: column; gap: 12px; }
  @media (min-width: 640px) { .consent-banner-inner { flex-direction: row; align-items: center; } }
  .consent-banner-text { font-family: "Segoe UI", sans-serif; font-size: 12px; line-height: 1.5; color: #e8ded0; margin: 0; flex: 1; }
  .consent-banner-text a { color: #f0a888; text-decoration: underline; }
  .consent-banner-actions { display: flex; gap: 8px; flex-shrink: 0; }
  .consent-btn { font-family: "Segoe UI Semibold", "Segoe UI", Verdana, sans-serif; font-size: 12px; font-weight: 700; padding: 9px 16px; border-radius: 10px 10px 10px 2px; border: 0; cursor: pointer; }
  .consent-btn-secondary { background: #4a3d2e; color: #e8ded0; }
  .consent-btn-primary { background: var(--coral-deep); color: #fff; }
  .site-footer nav { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 14px; margin-bottom: 8px; font-family: "Segoe UI", sans-serif; font-size: 12px; }
  .site-footer nav a { color: var(--muted); text-decoration: none; font-weight: 700; }
  .site-footer nav a:hover { color: var(--coral); text-decoration: underline; }
  .site-footer .footer-entity { font-size: 11px; color: var(--muted); margin-top: 4px; }
  .sister-links { display: flex; flex-wrap: wrap; justify-content: center; align-items: baseline; gap: 4px 10px; margin: 10px 0; font-family: "Segoe UI", sans-serif; font-size: 11px; }
  .sister-links-label { color: var(--muted); }
  .sister-links a { color: var(--muted); text-decoration: none; }
  .sister-links a:hover { color: var(--coral); text-decoration: underline; }
  .blog-grid { display: grid; gap: 16px; margin-top: 16px; }
  .blog-card { background: var(--card); border: 2px solid var(--line); border-radius: 16px 16px 16px 2px; padding: 20px; text-decoration: none; display: block; }
  .blog-card-image { display: block; width: 100%; height: 160px; object-fit: cover; border-radius: 12px 12px 12px 2px; margin-bottom: 14px; }
  .blog-card h2 { font-family: Georgia, serif; font-size: 17px; font-weight: 700; margin: 0 0 6px; color: var(--ink); }
  .blog-card p { font-size: 13px; color: var(--muted); margin: 0; }
  .article-body h1 { font-size: 24px; font-weight: 400; margin: 0 0 14px; color: var(--ink); }
  .article-body h2 { font-size: 19px; font-weight: 700; margin: 26px 0 10px; color: var(--ink); }
  .article-body h3 { font-size: 15px; font-weight: 700; margin: 20px 0 8px; color: var(--ink); }
  .article-body p, .article-body li { font-size: 14px; line-height: 1.7; color: var(--ink); }
  .article-body blockquote.pro-tip { background: #eef1ea; border-left: 4px solid var(--sage); margin: 18px 0; padding: 12px 16px; border-radius: 0 10px 10px 0; font-size: 13px; color: var(--sage-deep); }
  .article-body table { width: 100%; border-collapse: collapse; font-family: "Segoe UI", sans-serif; font-size: 13px; margin: 16px 0; }
  .article-body th, .article-body td { text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--line); }
  .article-body thead th { background: var(--sand); font-size: 11px; text-transform: uppercase; color: var(--muted); }
  .article-meta { font-family: "Segoe UI", sans-serif; font-size: 12px; color: var(--muted); margin-bottom: 4px; }
  .author-box { margin-top: 32px; padding-top: 16px; border-top: 1px solid var(--line); font-family: "Segoe UI", sans-serif; font-size: 13px; color: var(--muted); }
  .article-breadcrumb { padding: 10px 0; font-size: 12px; }
  .risk-tool-banner { display: block; font-family: "Segoe UI Semibold", "Segoe UI", Verdana, sans-serif; background: #fbe8dc; border: 2px solid #f0c9ac; color: var(--coral-deep); font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 16px; border-radius: 12px 12px 12px 2px; margin-bottom: 20px; }
  .risk-tool-banner:hover { background: #f7dcc6; }
  .risk-intro h1 { font-size: 24px; margin: 0 0 8px; color: var(--ink); }
  .risk-form { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }
  .risk-form input[type=text] { flex: 1 1 220px; }
  .risk-form .btn-primary { flex-shrink: 0; background: var(--coral-deep); color: #fff; font-family: "Segoe UI Semibold", "Segoe UI", Verdana, sans-serif; font-weight: 700; font-size: 13px; padding: 12px 20px; border: 0; border-radius: 10px 10px 10px 2px; cursor: pointer; }
  .risk-error { background: #fbe9e5; border: 2px solid #e8b8ab; color: #9c3f24; font-family: "Segoe UI", sans-serif; font-size: 13px; font-weight: 700; padding: 14px 16px; border-radius: 12px 12px 12px 2px; margin-top: 20px; }
  .risk-result { margin-top: 24px; }
  .risk-result h2 { font-family: Georgia, serif; font-size: 18px; font-weight: 700; margin: 0 0 6px; color: var(--ink); }
  .risk-disclaimer { font-family: "Segoe UI", sans-serif; font-size: 12px; color: var(--muted); margin: 0 0 18px; }
  .risk-card { background: var(--card); border: 2px solid var(--line); border-radius: 16px 16px 16px 2px; padding: 20px; margin-bottom: 14px; }
  .risk-card h3 { font-family: Georgia, serif; font-size: 15px; font-weight: 700; margin: 0 0 8px; color: var(--ink); }
  .risk-card p { font-size: 13px; line-height: 1.6; color: var(--ink); margin: 0 0 8px; }
  .risk-source { color: var(--muted); font-family: "Segoe UI", sans-serif; font-size: 11px; }
  .risk-cta { display: inline-block; font-family: "Segoe UI", sans-serif; font-size: 12px; font-weight: 700; color: var(--coral-deep); text-decoration: none; }
  .risk-cta:hover { text-decoration: underline; }
  .risk-again { text-align: center; font-family: "Segoe UI", sans-serif; font-size: 13px; margin-top: 8px; }
  .risk-again a { color: var(--coral-deep); font-weight: 700; text-decoration: none; }
  .faq-item { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--line); }
  .faq-item:first-of-type { margin-top: 4px; padding-top: 0; border-top: 0; }
  .faq-item h3 { font-family: Georgia, serif; font-size: 14px; font-weight: 700; margin: 0 0 6px; color: var(--ink); }
  .hero-image { display: block; width: 100%; height: auto; max-height: 360px; object-fit: cover; border-radius: 16px 16px 16px 2px; margin: 20px 0; }
  .bottom-tab-bar { display: none; }
  @media (max-width: 640px) {
    .bottom-tab-bar {
      display: flex;
      position: fixed;
      bottom: 0; left: 0; right: 0;
      z-index: 60;
      background: rgba(250,244,234,0.98);
      border-top: 2px solid var(--line);
      box-shadow: 0 -2px 8px rgba(51,41,31,0.08);
      padding: 8px 4px max(8px, env(safe-area-inset-bottom));
    }
    .tab-item { flex: 1 1 0; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; gap: 2px; font-family: "Segoe UI Semibold", "Segoe UI", Verdana, sans-serif; color: var(--muted); text-decoration: none; font-size: 10px; font-weight: 700; padding: 4px 0; }
    .tab-item svg { flex-shrink: 0; }
    .tab-item-primary { color: var(--sage-deep); }
    .tab-primary-icon { flex-shrink: 0; width: 28px; height: 28px; border-radius: 50%; background: var(--sage); display: flex; align-items: center; justify-content: center; margin-bottom: 2px; }
    main { padding-bottom: 24px; }
    footer.site-footer { padding-bottom: 84px; }
    .consent-banner { bottom: 80px; }
  }
`;

// Responsive image sizing: pairs with the -480w/-720w WebP variants uploaded
// alongside every hero-*.webp (the full-size file doubles as the 940w
// entry). "sizes" mirrors .wrap's max-width (960px minus 2x16px padding) so
// the browser's own width calculation matches what actually renders, rather
// than guessing and over-fetching on mobile.
const HERO_SIZES = '(max-width: 640px) calc(100vw - 32px), 928px';
function heroSrcset(src) {
  const base = src.replace(/\.webp$/, '');
  return `${base}-480w.webp 480w, ${base}-720w.webp 720w, ${src} 940w`;
}

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
//
// The visible header logo used to just reuse /apple-touch-icon.png (a
// 180x180 PNG required at that exact size for iOS home-screen icons) at its
// actual 36x38 display size -- PageSpeed correctly flagged that as ~16KB
// wasted on every single page load. brand-logo.webp is a dedicated
// 120x120 WebP resized from the same source, sized for a 38px slot at up to
// 3x device pixel ratio. /apple-touch-icon.png itself is untouched and
// still serves its real purpose.
const LOGO_HREF = '/assets/site-assets/brand-logo.webp';

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

// Mobile-only app-shell bottom tab bar (one-page-site skill, Step 1c) — the
// real audience for a local-service directory is someone on their phone in
// front of the actual problem, right now. Hidden on desktop via CSS
// (BASE_STYLES' max-width media query); the desktop footer nav already
// covers the same destinations there. "Call" is the primary action (matches
// this site's real conversion path — a call/voicemail, not a modal) and
// gets the distinct filled-circle treatment app shells conventionally give
// their main action.
function bottomTabBar() {
  return `
<nav class="bottom-tab-bar" aria-label="Quick navigation">
  <a href="/" class="tab-item">
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>
    <span>Home</span>
  </a>
  <a href="/tools/property-risk-checker/" class="tab-item">
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
    <span>Risk Check</span>
  </a>
  <a href="tel:${PHONE_TEL}" class="tab-item tab-item-primary">
    <span class="tab-primary-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
    <span>Call</span>
  </a>
  <a href="/blog/" class="tab-item">
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    <span>Guides</span>
  </a>
</nav>`;
}

// Default social-share image for any page that doesn't pass its own —
// Open Graph tags were entirely absent site-wide until now (caught by the
// same Yell.com audit as the missing H1s, 2026-08-12), so shares on
// Facebook/LinkedIn/X/Slack etc. rendered with no preview image or text.
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/site-assets/hero-hub-street.webp`;

function pageShell({ title, description, canonical = '', headExtra = '', bodyClass = '', children, ogImage = DEFAULT_OG_IMAGE, ogType = 'website' }) {
  const canonicalTag = canonical ? `<link rel="canonical" href="${canonical}">\n` : '';
  const ogUrl = canonical || SITE_URL;
  const ogTags = `<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${ogUrl}">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${ogImage}">`;
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
${gaHead()}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
${ogTags}
${canonicalTag}<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
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
${bottomTabBar()}
</body>
</html>`;
}

// asH1 defaults to true: on every page except the two that already define
// their own more specific <h1> in the body (risk checker, blog article —
// see their call sites below), this IS the page's only top-level heading.
// Previously always rendered as a <span>, meaning literally no page on the
// site had a real H1 — caught by an external Yell.com site-audit report
// (2026-08-12), not something noticed internally.
function siteHeader({ eyebrow, title, asH1 = true }) {
  const titleTag = asH1 ? 'h1' : 'span';
  return `
<header class="site-header">
  <div class="wrap row">
    <div class="brand-row">
      <a class="eyebrow-link" href="/"><img class="brand-logo" src="${LOGO_HREF}" alt="${SITE_NAME}" width="36" height="38"></a>
      <div>
        <a class="eyebrow-link" href="/"><span class="eyebrow">${escapeHtml(eyebrow)}</span></a>
        <${titleTag} class="title">${title}</${titleTag}>
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
      <a href="/tools/property-risk-checker/">Property Risk Checker</a>
      <a href="/terms-of-service/">Terms of Service</a>
      <a href="/privacy-policy">Privacy Policy</a>
    </nav>
    <div>${SITE_NAME} Specialist Network &middot; England, Wales &amp; Scotland &middot; <a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a></div>
    ${sisterSiteLinks()}
    <div class="footer-entity">${SITE_NAME} is a specialist structural network operated by EIGHTFINITY LTD, a company registered in England and Wales (company no. 15528515), registered office 20 Wenlock Road, London, England, N1 7GU.</div>
  </div>
</footer>`;
}

// "County" and "Town" are shown for orientation but not linked — there's no
// dedicated page for either yet, and a breadcrumb link that just dumps you
// back on the generic hub would be misleading. Only "Home" and the current
// page are real links — the BreadcrumbList JSON-LD below omits county/town
// entirely rather than including them without a URL (see comment there).
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

// Visible FAQ content only — no FAQPage JSON-LD (Google retired FAQ rich
// results May 2026, see faq-content.js). This exists to give each of the 200
// niche x town pages genuine substantive content instead of just swapped
// placeholders, and to be citable by AI answer engines.
function renderFaqSection(nicheSlug) {
  const faqs = getFaqForNiche(nicheSlug);
  if (!faqs.length) return '';
  const items = faqs
    .map((f) => `<div class="faq-item"><h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p></div>`)
    .join('');
  return `
      <div class="card">
        <h2>Common questions</h2>
        ${items}
      </div>`;
}

// Real, sourced per-town local context — see town-facts.js for what backs
// each niche's copy and why. Returns '' where no genuine per-town signal
// exists for that niche (tree-surgeon currently has none — see the comment
// in town-facts.js rather than fabricate a local claim to fill the gap).
function renderLocalContextSection(niche, town) {
  if (niche.slug === 'basement-waterproofing') {
    const count = FLOOD_AREA_COUNT_BY_TOWN_SLUG[town.slug];
    if (count === undefined || count === null) return '';
    const body = count > 0
      ? `The Environment Agency lists ${count} designated flood-risk area${count === 1 ? '' : 's'} within 5km of ${escapeHtml(town.name)}'s town centre. That doesn't mean every property nearby is at risk — flood-risk areas are tied to specific watercourses and low-lying land — but it's a relevant factor when assessing groundwater pressure against basement or below-ground walls in this area.`
      : `The Environment Agency lists no designated flood-risk areas within 5km of ${escapeHtml(town.name)}'s town centre. Basement damp here is more commonly linked to poor drainage, condensation, or an ineffective damp-proof course than groundwater pressure — though a site-specific assessment is the only way to confirm the cause.`;
    return `
      <div class="card">
        <h2>Flood &amp; groundwater context for ${escapeHtml(town.name)}</h2>
        <p>${body} <span class="risk-source">${FLOOD_DATA_SOURCE_NOTE}</span></p>
      </div>`;
  }

  if (niche.slug === 'subsidence-repair') {
    const higherRisk = HIGHER_CLAY_RISK_COUNTIES.has(town.county);
    const body = higherRisk
      ? `${escapeHtml(town.county)} is among the counties the British Geological Survey and UK insurers point to as having the highest concentration of shrink-swell clay subsidence claims, alongside London and the wider South East. That's a regional pattern, not a property-specific finding — ground conditions vary street to street — but it's part of why a proper structural assessment matters here.`
      : `${escapeHtml(town.county)} isn't among the regions BGS and UK insurers most associate with shrink-swell clay subsidence claims — that pattern concentrates mainly in London, the South East, and parts of East Anglia and the Midlands, where the clay is younger and more prone to shrinking and swelling. Older, harder rock elsewhere in the country is generally less absorbent, though local ground conditions still vary and a professional assessment is the only way to confirm risk for a specific property.`;
    return `
      <div class="card">
        <h2>Clay soil &amp; subsidence risk in ${escapeHtml(town.county)}</h2>
        <p>${body} <span class="risk-source">Source: British Geological Survey, 2026.</span></p>
      </div>`;
  }

  if (niche.slug === 'japanese-knotweed-removal') {
    const higherRisk = HIGHER_KNOTWEED_RISK_COUNTIES.has(town.county);
    const body = higherRisk
      ? `${escapeHtml(town.county)} is named among the UK's higher-incidence Japanese knotweed regions in Environet UK's published hotspot rankings, based on verified sightings logged across the country. That's a regional pattern, not a claim about any specific address — the only way to confirm whether a property is affected is a site inspection — but it's a relevant factor to be aware of when buying or maintaining a property in this area.`
      : `${escapeHtml(town.county)} isn't among the UK's higher-incidence Japanese knotweed regions in Environet UK's published hotspot rankings, which concentrate mainly around Bristol, Merseyside, Greater London, Greater Manchester, and Lancashire. That doesn't rule out an isolated infestation locally — knotweed spreads via root fragments and can turn up almost anywhere — so a site inspection is still the only way to confirm either way for a specific property.`;
    return `
      <div class="card">
        <h2>Japanese knotweed prevalence in ${escapeHtml(town.county)}</h2>
        <p>${body} <span class="risk-source">${KNOTWEED_DATA_SOURCE_NOTE}</span></p>
      </div>`;
  }

  if (niche.slug === 'commercial-roofing' && COASTAL_TOWN_SLUGS.has(town.slug)) {
    return `
      <div class="card">
        <h2>Wind exposure in ${escapeHtml(town.name)}</h2>
        <p>${escapeHtml(town.name)}'s coastal or tidal-estuary position means UK wind-loading design standards (BS EN 1991-1-4) generally set a higher basic wind speed for sites like this than for equivalent inland locations — relevant to fixing specification and wind-uplift resistance on a flat or low-pitch commercial roof. The exact exposure category still depends on the specific site, which is why a proper survey covers this rather than a general assumption. <span class="risk-source">Source: BS EN 1991-1-4 UK National Annex.</span></p>
      </div>`;
  }

  return '';
}

// Internal cross-linking between related interior pages — see
// NEAREST_TOWNS_BY_SLUG in constants.js. Before this, every one of the 200
// niche x town pages only linked back up to the flat hub, so the site had no
// internal link graph connecting related pages. Reuses the .niche-links chip
// style already defined for the hub page rather than adding new CSS.
function renderRelatedLinksSection(niche, town) {
  const otherNiches = NICHES.filter((n) => n.slug !== niche.slug);
  const nearbyTowns = NEAREST_TOWNS_BY_SLUG.get(town.slug) || [];

  // title attribute carries the full "<niche> in <town>" context per link
  // (each destination is unique) without lengthening the visible chip text —
  // an external audit flagged the repeated short label as ambiguous anchor
  // text across many different destinations (2026-08-12).
  const otherNicheLinks = otherNiches
    .map((n) => `<a href="/${n.slug}-${town.slug}/" title="${escapeHtml(n.label)} in ${escapeHtml(town.name)}">${escapeHtml(n.label)}</a>`)
    .join('');
  const nearbyTownLinks = nearbyTowns
    .map((t) => `<a href="/${niche.slug}-${t.slug}/" title="${escapeHtml(niche.label)} in ${escapeHtml(t.name)}">${escapeHtml(t.name)}</a>`)
    .join('');

  return `
      <div class="card">
        <h2>Related pages</h2>
        <p>Other services we cover in ${escapeHtml(town.name)}:</p>
        <div class="niche-links">${otherNicheLinks}</div>
        <p>${escapeHtml(niche.label)} in nearby towns:</p>
        <div class="niche-links">${nearbyTownLinks}</div>
      </div>`;
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
  // County/town have no dedicated page, so they're deliberately left out of
  // the JSON-LD entirely rather than included with a missing "item" URL —
  // GSC flagged the latter as a critical "Missing field 'item'" structured
  // data error (2026-08-05), since Google's BreadcrumbList spec only
  // tolerates an item-less entry as the *last* one (the current page), and
  // position 4 here already had an item while 2-3 didn't. The visual
  // breadcrumb (renderBreadcrumb, below) still shows county/town as
  // unlinked text for orientation — only the schema changed.
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: niche.label, item: pageUrl },
    ],
  };

  const headExtra = `<script type="application/ld+json">${JSON.stringify(schema)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`;

  const body = `
${siteHeader({ eyebrow: `${SITE_NAME} Specialist Network`, title: `${escapeHtml(niche.label)} <span class="accent">${escapeHtml(town.name)}</span>` })}
${renderBreadcrumb({ county: town.county, town: town.name, nicheLabel: niche.label })}
<main class="wrap">
  ${niche.heroImage ? `<img class="hero-image" src="${niche.heroImage.src}" srcset="${heroSrcset(niche.heroImage.src)}" sizes="${HERO_SIZES}" alt="${escapeHtml(niche.heroImage.alt)}" width="940" height="650" loading="eager" fetchpriority="high">` : ''}
  <div class="grid two-col">
    <section>
      <div class="card">
        <h2>${escapeHtml(niche.label)}: What We Coordinate</h2>
        <p>Property issues involving <strong>${escapeHtml(niche.short)}</strong> across the <strong>${escapeHtml(town.name)}</strong> area need prompt, qualified attention. We coordinate independent structural specialists covering ${escapeHtml(niche.description)}.</p>
      </div>
      ${adSlot()}
      <div class="card">
        <h2>What happens after you submit</h2>
        <p>Leave your details and a short description of the issue. Our coordination team reviews it and passes your enquiry on to a relevant local specialist covering the ${escapeHtml(town.name)} area. There's no live phone desk behind the number below — if you'd rather not wait, leave a message with your name, postcode, and a callback number and we'll get back to you.</p>
      </div>
      ${renderLocalContextSection(niche, town)}
      ${renderFaqSection(niche.slug)}
      ${renderRelatedLinksSection(niche, town)}
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

  return pageShell({ title: pageTitle, description, canonical: pageUrl, headExtra, children: body, ogImage: niche.heroImage ? `${SITE_URL}${niche.heroImage.src}` : undefined });
}

export function renderThankYouPage() {
  const body = `
${siteHeader({ eyebrow: SITE_NAME, title: 'Request received' })}
<main class="wrap">
  <div class="card">
    <h2>Thanks — we've got your request.</h2>
    <p>We'll pass your details to a relevant local specialist, who'll call or email you back. If you'd rather leave a message directly, call <a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a> and leave your name, postcode, and a callback number.</p>
  </div>
</main>
${siteFooter()}`;
  return pageShell({ title: `Request received | ${SITE_NAME}`, description: 'Your enquiry has been received.', children: body });
}

// Branded 404 — was a bare "Not Found" text response with no HTML, no
// design, and no way back into the site (caught by the Yell.com audit,
// 2026-08-12: "No custom design"). Still returned with a real 404 status.
export function renderNotFoundPage() {
  const body = `
${siteHeader({ eyebrow: SITE_NAME, title: 'Page not found' })}
<main class="wrap">
  <div class="card">
    <h2>We can't find that page</h2>
    <p>The page you're looking for may have moved or the link may be out of date. Try one of these instead:</p>
    <p><a href="/">Find a local specialist</a> &middot; <a href="/tools/property-risk-checker/">Property Risk Checker</a> &middot; <a href="/blog/">Blog</a> &middot; <a href="/contact/">Contact us</a></p>
  </div>
</main>
${siteFooter()}`;
  return pageShell({ title: `Page not found | ${SITE_NAME}`, description: 'This page could not be found.', children: body });
}

// Property Structural Risk Checker — the linkable-asset tool tying the
// original 4 niches together under one shared theme (structural property
// risk), see
// [[project_groundlayer_pseo_build]] / the pseo-directory-buildout skill's
// "Building topical authority" section. GET-only, server-rendered, so a
// result page (?postcode=...) is itself a real, crawlable, shareable URL —
// not a JS-only form. Data honesty: only the flood-risk-area count is
// genuine per-location data (Environment Agency, live); subsidence/tree/
// roofing are accurate general UK guidance, never presented as a
// property-specific score we can't actually back up.
export function renderPropertyRiskChecker({ result } = {}) {
  const pageTitle = `Property Structural Risk Checker | ${SITE_NAME}`;
  const description = 'Free UK postcode screening tool covering subsidence, flood, tree-related, and roofing risk factors — a starting point before booking a professional on-site assessment.';
  const canonical = `${SITE_URL}/tools/property-risk-checker/`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Property Structural Risk Checker',
    url: canonical,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any (web-based)',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
    publisher: { '@type': 'Organization', name: 'EIGHTFINITY LTD' },
  };
  const headExtra = `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;

  let resultBlock = '';
  if (result?.error) {
    resultBlock = `<div class="risk-error">${escapeHtml(result.error)}</div>`;
  } else if (result?.postcode) {
    const floodLine = result.flood?.ok
      ? (result.flood.count > 0
          ? `${result.flood.count} designated flood-risk area${result.flood.count === 1 ? '' : 's'} within 3km of this postcode${result.flood.areas.length ? ` — including ${result.flood.areas.map(escapeHtml).join(', ')}` : ''}.`
          : 'No designated flood-risk areas found within 3km of this postcode.')
      : 'Live flood-risk data is temporarily unavailable — try again shortly.';

    resultBlock = `
    <div class="risk-result">
      <h2>Results for ${escapeHtml(result.postcode)}${result.adminDistrict ? ` — ${escapeHtml(result.adminDistrict)}` : ''}</h2>
      <p class="risk-disclaimer">This is a general screening tool, not a survey. It doesn't replace an on-site inspection by a qualified specialist.</p>

      <div class="risk-card">
        <h3>💧 Flood &amp; water risk</h3>
        <p>${floodLine} <span class="risk-source">Source: Environment Agency, live.</span></p>
        <p>Basements and below-ground structures near a designated flood-risk area carry higher water-ingress exposure — relevant if you're assessing basement waterproofing.</p>
        <a class="risk-cta" href="/">Find a basement waterproofing specialist &rarr;</a>
      </div>

      <div class="risk-card">
        <h3>🧱 Subsidence risk factors</h3>
        <p>Subsidence in the UK is most commonly linked to clay-rich soil shrinking and swelling with moisture changes, and is more frequent in older properties with shallower foundations. Clay geology is widespread across much of South East England, though it varies locally — a proper ground assessment is the only way to confirm risk for a specific property.</p>
        <a class="risk-cta" href="/">Find a subsidence repair specialist &rarr;</a>
      </div>

      <div class="risk-card">
        <h3>🌳 Tree-related risk</h3>
        <p>Large trees within around 10 metres of a building's foundation, particularly on clay soil, are a recognised contributor to subsidence risk through root water extraction. Overhanging or storm-exposed branches are a separate, more direct risk to roofing and structure.</p>
        <a class="risk-cta" href="/">Find a tree surgeon &rarr;</a>
      </div>

      <div class="risk-card">
        <h3>🏠 Roofing exposure</h3>
        <p>Roof age and UK weather exposure (wind, rain penetration, freeze-thaw cycles) are the main drivers of commercial roofing deterioration — a roof over 20 years old, or one that hasn't been inspected since the last major storm season, is generally worth a professional check.</p>
        <a class="risk-cta" href="/">Find a commercial roofing specialist &rarr;</a>
      </div>

      <p class="risk-again"><a href="/tools/property-risk-checker/">Check another postcode &rarr;</a></p>
    </div>`;
  }

  const body = `
${siteHeader({ eyebrow: `${SITE_NAME} Specialist Network`, title: 'Property Risk Checker', asH1: false })}
<main class="wrap">
  <div class="card risk-intro">
    <h1>Property Structural Risk Checker</h1>
    <p>Enter a UK postcode for a free screening summary covering flood, subsidence, tree-related, and roofing risk factors — a useful starting point before booking a professional assessment.</p>
    <form method="GET" action="/tools/property-risk-checker/" class="risk-form">
      <input type="text" name="postcode" placeholder="e.g. N17 9DJ" value="${result?.postcode ? escapeHtml(result.postcode) : ''}" required maxlength="10" autocomplete="postal-code">
      <button type="submit" class="btn-primary">Check postcode</button>
    </form>
  </div>
  ${resultBlock}
</main>
${siteFooter()}`;

  return pageShell({ title: pageTitle, description, canonical, headExtra, children: body });
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
            (n) => `<a href="/${n.slug}-${town.slug}/" title="${escapeHtml(n.label)} in ${escapeHtml(town.name)}">${escapeHtml(n.label)}</a>`
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
  <img class="hero-image" src="/assets/site-assets/hero-hub-street.webp" srcset="${heroSrcset('/assets/site-assets/hero-hub-street.webp')}" sizes="${HERO_SIZES}" alt="A row of classic British brick terraced houses. Photo by Ffion Scott / Pexels." width="940" height="650" loading="eager" fetchpriority="high">
  <a class="risk-tool-banner" href="/tools/property-risk-checker/">🔎 Free tool: check a postcode's flood, subsidence, tree, and roofing risk factors &rarr;</a>
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
    sameAs: ['https://www.facebook.com/profile.php?id=61592752965299'],
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
    title: `${SITE_NAME} — UK Structural Specialist Network`,
    description: `Find vetted structural, damp, and building specialists — subsidence repair, waterproofing, knotweed removal, surveys, and more — across ${TOWNS.length} UK towns.`,
    canonical: `${SITE_URL}/`,
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
    { loc: `${SITE_URL}/tools/property-risk-checker/`, priority: '0.9' },
  ];
  for (const article of BLOG_ARTICLES) {
    urls.push({ loc: `${SITE_URL}/blog/${article.slug}/`, priority: '0.6', lastmod: article.publishedAt });
  }
  // Interleaved by town, not grouped by niche: a niche listed last in NICHES
  // used to have all 50 of its pages queued after every other niche's, which
  // measurably starved its crawl priority (basement-waterproofing, last in
  // the array, had 56% of its pages unindexed vs. 4% for subsidence-repair,
  // first in the array — see the 2026-08-09 GSC indexing review). Round-robin
  // order gives every niche an equal position in the sitemap instead.
  for (const town of TOWNS) {
    for (const niche of NICHES) {
      urls.push({ loc: `${SITE_URL}/${niche.slug}-${town.slug}/`, priority: '0.8' });
    }
  }

  const entries = urls
    .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod || today}</lastmod><priority>${u.priority}</priority></url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n${entries}\n</urlset>\n`;
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

> ${SITE_NAME} is a UK specialist network connecting property owners with vetted structural and building contractors across ${TOWNS.length} UK towns and cities.

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
    <p>${SITE_NAME} (groundlayer.co.uk) is operated by <a href="https://eightfinity.net/" target="_blank" rel="noopener">EIGHTFINITY LTD</a>, a company registered in England and Wales (company no. 15528515), registered office 20 Wenlock Road, London, England, N1 7GU. For any privacy question, contact <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a> or call <a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a>.</p>

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

  return pageShell({ title: pageTitle, description, canonical: `${SITE_URL}/privacy-policy`, bodyClass: '', children: body });
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
  <img class="hero-image" src="/assets/site-assets/hero-about-office.webp" srcset="${heroSrcset('/assets/site-assets/hero-about-office.webp')}" sizes="${HERO_SIZES}" alt="A coordinator at a desk taking a call. Photo by Carlos Arribas / Pexels." width="940" height="650" loading="eager" fetchpriority="high">
  <div class="card policy-body">
    <h2>Why Groundlayer exists</h2>
    <p>Structural problems don't wait for a convenient time. Subsidence, a failing commercial roof, a dangerous tree, or a wet basement are all urgent, and finding the right specialist quickly is harder than it should be — most property owners only need to do it once or twice in a lifetime, so they're starting from zero every time. Groundlayer exists to close that gap: a single place to describe what's wrong and get connected with a vetted specialist who actually does that specific type of work, in that specific part of the UK.</p>

    <h2>What we cover</h2>
    <p>We focus on specialist categories where getting the wrong contractor is expensive and hard to undo: subsidence repair (diagnostics, underpinning coordination, and resin injection remediation), commercial roofing (flat and pitched surveys, repairs, and recover/replacement), tree surgery (crown reduction, dangerous tree removal, and root-related subsidence risk assessment), basement waterproofing (cavity drain membrane systems and tanking), Japanese knotweed removal (PCA-accredited treatment plans and insurance-backed guarantees), structural and building surveys (RICS Level 2 and Level 3), damp proofing (rising, penetrating, and condensation damp diagnosis and treatment), and party wall surveying (Party Wall etc. Act 1996 notices and awards). Each of these is a field with its own qualifications, insurance requirements, and failure modes — a generalist "handyman" directory doesn't sort for any of that, and we think it should.</p>

    <h2>How it works</h2>
    <p>Find your town and the type of issue you're dealing with, fill in a short assessment request with a few photos if you have them, and our coordination team passes your enquiry on to a specialist from our network who covers that trade and that area. There's no live phone desk behind the site — if you'd rather not wait for a callback, leaving a message on the phone line reaches the same coordination team.</p>

    <h2>Who operates Groundlayer</h2>
    <p>Groundlayer (groundlayer.co.uk) is operated by <a href="https://eightfinity.net/" target="_blank" rel="noopener">EIGHTFINITY LTD</a>, a company registered in England and Wales (company no. 15528515), registered office 20 Wenlock Road, London, England, N1 7GU. We are a specialist network and lead-coordination service: we connect property owners with independent structural and building specialists, we are not ourselves a contractor, engineering firm, or insurer, and we don't perform any of the on-site work described on this site. Full detail on how we handle your information is in our <a href="/privacy-policy">Privacy Policy</a>, and the terms governing use of this site are in our <a href="/terms-of-service/">Terms of Service</a>.</p>

    <h2>Get in touch</h2>
    <p>Questions about a submitted enquiry, this site, or anything else — see our <a href="/contact/">Contact page</a>, call <a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a>, or browse the <a href="/blog/">blog</a> for guides on spotting these issues before they get worse.</p>
  </div>
</main>
${siteFooter()}`;

  return pageShell({ title: pageTitle, description, canonical: `${SITE_URL}/about/`, headExtra, children: body });
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
    <p>For an urgent enquiry, call <a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a> and leave your name, postcode, and a callback number — we'll get back to you. For anything else — a question about a submitted request, privacy, press, or a specialist wanting to join our network — email <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a>. EIGHTFINITY LTD responds to enquiries within 2 working days.</p>
    <p>If you're reporting a structural issue at your property, you'll get a faster response using the assessment request form on the relevant <a href="/">town and service page</a> rather than email — that routes directly to a specialist covering your area.</p>
  </div>
</main>
${siteFooter()}`;

  return pageShell({ title: pageTitle, description, canonical: `${SITE_URL}/contact/`, headExtra, children: body });
}

export function renderTermsPage() {
  const pageTitle = `Terms of Service | ${SITE_NAME}`;
  const description = `The terms governing use of ${SITE_NAME}.`;
  const body = `
${siteHeader({ eyebrow: `${SITE_NAME} Specialist Network`, title: 'Terms of Service' })}
<main class="wrap">
  <div class="card policy-body">
    <h2>What Groundlayer is</h2>
    <p>${SITE_NAME} (groundlayer.co.uk) is a specialist network and lead-coordination service operated by <a href="https://eightfinity.net/" target="_blank" rel="noopener">EIGHTFINITY LTD</a>, a company registered in England and Wales (company no. 15528515), registered office 20 Wenlock Road, London, England, N1 7GU. We connect property owners with independent, third-party specialists in subsidence repair, commercial roofing, tree surgery, basement waterproofing, Japanese knotweed removal, structural and building surveys, damp proofing, and party wall surveying. We are not a contractor, engineering firm, or insurer, and we do not ourselves carry out any inspection, survey, or building work.</p>

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

  return pageShell({ title: pageTitle, description, canonical: `${SITE_URL}/terms-of-service/`, children: body });
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
  const cardsHtml = BLOG_ARTICLES.map((a) => {
    const hero = NICHES.find((n) => n.slug === a.niche)?.heroImage;
    const img = hero ? `<img class="blog-card-image" src="${hero.src}" srcset="${heroSrcset(hero.src)}" sizes="${HERO_SIZES}" alt="${escapeHtml(hero.alt)}" width="940" height="650" loading="lazy">` : '';
    return `
    <a class="blog-card" href="/blog/${a.slug}/">
      ${img}
      <h2>${escapeHtml(a.title)}</h2>
      <p>${escapeHtml(a.summary)}</p>
    </a>`;
  }).join('');

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
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
    ],
  };
  const headExtra = `<script type="application/ld+json">${JSON.stringify(schema)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`;

  const body = `
${siteHeader({ eyebrow: `${SITE_NAME} Specialist Network`, title: 'Blog' })}
<main class="wrap">
  <div class="blog-grid">${cardsHtml}</div>
</main>
${siteFooter()}`;

  return pageShell({ title: pageTitle, description, canonical: `${SITE_URL}/blog/`, headExtra, children: body });
}

export function renderBlogArticle(article) {
  const pageTitle = `${article.title} | ${SITE_NAME}`;
  const pageUrl = `${SITE_URL}/blog/${article.slug}/`;
  const hero = NICHES.find((n) => n.slug === article.niche)?.heroImage;

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
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
      { '@type': 'ListItem', position: 3, name: article.title, item: pageUrl },
    ],
  };
  const headExtra = `<script type="application/ld+json">${JSON.stringify(postSchema)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`;

  const body = `
${siteHeader({ eyebrow: `${SITE_NAME} Specialist Network`, title: 'Blog', asH1: false })}
<main class="wrap">
  <nav class="breadcrumb-inner article-breadcrumb">
    <a href="/blog/">Blog</a><span class="crumb-sep">/</span><span class="breadcrumb-current">${escapeHtml(article.title)}</span>
  </nav>
  <div class="card article-body">
    ${hero ? `<img class="hero-image" src="${hero.src}" srcset="${heroSrcset(hero.src)}" sizes="${HERO_SIZES}" alt="${escapeHtml(hero.alt)}" width="940" height="650" loading="eager" fetchpriority="high">` : ''}
    <p class="article-meta">Published ${escapeHtml(article.publishedAt)}</p>
    <h1>${escapeHtml(article.title)}</h1>
    ${article.bodyHtml}
  </div>
</main>
${siteFooter()}`;

  return pageShell({ title: pageTitle, description: article.summary, canonical: pageUrl, headExtra, children: body, ogImage: hero ? `${SITE_URL}${hero.src}` : undefined, ogType: 'article' });
}
