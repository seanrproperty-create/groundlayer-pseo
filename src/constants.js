export const PHONE_DISPLAY = '0330 220 0118';
export const PHONE_TEL = '03302200118';

// IndexNow protocol key (Bing/Yandex/Seznov/Naver): must be served verbatim
// at /<key>.txt so the search engine can verify ping ownership before
// accepting submitted URLs. Generated 2026-08-11, no rotation needed unless
// compromised.
export const INDEXNOW_KEY = '22e434a3af384c85827dd8cbe63fd73e';

// Receives the per-lead notification email (src/email.js sendLeadEmail).
// Unrelated to who can log into the dashboard — see DASHBOARD_ADMIN_EMAILS.
export const ADMIN_EMAIL = 'info@eightfinity.net';

// The only mailboxes allowed to request a dashboard login link (Sean,
// 2026-08-04). Each gets its link sent to itself, never to a shared fixed
// address — otherwise a compromised inbox on one account could be used to
// receive login links intended for the other.
export const DASHBOARD_ADMIN_EMAILS = ['seanrproperty@gmail.com', 'info@eightfinity.net'];

// Google Analytics (GA4) measurement ID, from Sean's "Set up a Google tag"
// screen, 2026-08-04.
export const GA_MEASUREMENT_ID = 'G-VW421N550V';

// Reused from propertybrain.uk (confirmed live in propertybrain/ads.txt and
// every propertybrain page) rather than guessed — do not swap without
// checking AdSense policy first: serving the same publisher ID from a second,
// unrelated site is fine, but each *site* still needs to be added and
// approved individually in the AdSense dashboard before ads will actually
// render there (see AdSense's "Sites" tab). Until groundlayer.co.uk is added
// and approved, the slots below will render blank, not broken.
export const ADSENSE_PUBLISHER_ID = 'pub-9748936508682808';

export const SITE_NAME = 'Groundlayer';
export const BUSINESS_TYPE = 'StructuralEngineeringService';
export const SITE_URL = 'https://groundlayer.co.uk';

// Four high-ticket verticals x 50 towns = 200 landing pages.
// heroImage: real, license-compliant photos sourced from Pexels
// (2026-08-11) via the API key already in use on propertyalert.uk's
// server for YouTube Short backgrounds (Brief 707) — reused rather than
// provisioning a new key. Pexels' license permits commercial use without
// mandatory attribution, but a photographer credit is included anyway as
// good practice. Each photo was picked to genuinely represent the service
// (a real inspection/repair/removal in progress), not a decorative texture
// standing in for something it isn't — the first subsidence-repair
// candidates (cracked paint/plaster close-ups) were rejected for exactly
// that reason. alt text also serves as the visible photo credit.
export const NICHES = [
  {
    slug: 'subsidence-repair',
    label: 'Subsidence Repair',
    short: 'subsidence repair',
    description:
      'diagnostics, underpinning coordination, and resin injection remediation for subsidence, cracking, and foundation movement',
    heroImage: {
      src: '/assets/site-assets/hero-subsidence-repair.webp',
      alt: 'A structural inspector examining a property during a site assessment. Photo by RDNE Stock project / Pexels.',
    },
  },
  {
    slug: 'commercial-roofing',
    label: 'Commercial Roofing',
    short: 'commercial roofing',
    description:
      'flat and pitched commercial roof surveys, repairs, and full recover/replacement contracting',
    heroImage: {
      src: '/assets/site-assets/hero-commercial-roofing.webp',
      alt: 'A roofer working from an access platform on a tiled roof. Photo by Gundula Vogel / Pexels.',
    },
  },
  {
    slug: 'tree-surgeon',
    label: 'Tree Surgeon',
    short: 'tree surgery',
    description:
      'arboricultural inspection, crown reduction, dangerous tree removal, and root-related subsidence risk assessment',
    heroImage: {
      src: '/assets/site-assets/hero-tree-surgeon.webp',
      alt: 'A rigged arborist using a chainsaw to remove a section of tree. Photo by Jacky / Pexels.',
    },
  },
  {
    slug: 'basement-waterproofing',
    label: 'Basement Waterproofing',
    short: 'basement waterproofing',
    description:
      'cavity drain membrane systems, tanking, and structural waterproofing for basements and below-ground structures',
    heroImage: {
      src: '/assets/site-assets/hero-basement-waterproofing.webp',
      alt: 'A below-ground concrete plant room corridor. Photo by Jakub Zerdzicki / Pexels.',
    },
  },
];

// lat/lon are town-centre approximations — accurate enough for the
// AdministrativeArea schema block, not survey-grade. County is used purely
// to group the hub page directory.
export const TOWNS = [
  { slug: 'london', name: 'London', county: 'Greater London', lat: 51.5074, lon: -0.1278 },
  { slug: 'birmingham', name: 'Birmingham', county: 'West Midlands', lat: 52.4862, lon: -1.8904 },
  { slug: 'manchester', name: 'Manchester', county: 'Greater Manchester', lat: 53.4808, lon: -2.2426 },
  { slug: 'leeds', name: 'Leeds', county: 'West Yorkshire', lat: 53.8008, lon: -1.5491 },
  { slug: 'sheffield', name: 'Sheffield', county: 'South Yorkshire', lat: 53.3811, lon: -1.4701 },
  { slug: 'bristol', name: 'Bristol', county: 'Bristol', lat: 51.4545, lon: -2.5879 },
  { slug: 'liverpool', name: 'Liverpool', county: 'Merseyside', lat: 53.4084, lon: -2.9916 },
  { slug: 'newcastle-upon-tyne', name: 'Newcastle upon Tyne', county: 'Tyne and Wear', lat: 54.9783, lon: -1.6178 },
  { slug: 'sunderland', name: 'Sunderland', county: 'Tyne and Wear', lat: 54.9069, lon: -1.3838 },
  { slug: 'nottingham', name: 'Nottingham', county: 'Nottinghamshire', lat: 52.9548, lon: -1.1581 },
  { slug: 'leicester', name: 'Leicester', county: 'Leicestershire', lat: 52.6369, lon: -1.1398 },
  { slug: 'southampton', name: 'Southampton', county: 'Hampshire', lat: 50.9097, lon: -1.4044 },
  { slug: 'portsmouth', name: 'Portsmouth', county: 'Hampshire', lat: 50.8198, lon: -1.0880 },
  { slug: 'reading', name: 'Reading', county: 'Berkshire', lat: 51.4543, lon: -0.9781 },
  { slug: 'oxford', name: 'Oxford', county: 'Oxfordshire', lat: 51.7520, lon: -1.2577 },
  { slug: 'cambridge', name: 'Cambridge', county: 'Cambridgeshire', lat: 52.2053, lon: 0.1218 },
  { slug: 'peterborough', name: 'Peterborough', county: 'Cambridgeshire', lat: 52.5695, lon: -0.2405 },
  { slug: 'norwich', name: 'Norwich', county: 'Norfolk', lat: 52.6309, lon: 1.2974 },
  { slug: 'ipswich', name: 'Ipswich', county: 'Suffolk', lat: 52.0567, lon: 1.1482 },
  { slug: 'derby', name: 'Derby', county: 'Derbyshire', lat: 52.9225, lon: -1.4746 },
  { slug: 'stoke-on-trent', name: 'Stoke-on-Trent', county: 'Staffordshire', lat: 53.0027, lon: -2.1794 },
  { slug: 'coventry', name: 'Coventry', county: 'West Midlands', lat: 52.4068, lon: -1.5197 },
  { slug: 'wolverhampton', name: 'Wolverhampton', county: 'West Midlands', lat: 52.5870, lon: -2.1288 },
  { slug: 'milton-keynes', name: 'Milton Keynes', county: 'Buckinghamshire', lat: 52.0406, lon: -0.7594 },
  { slug: 'luton', name: 'Luton', county: 'Bedfordshire', lat: 51.8787, lon: -0.4200 },
  { slug: 'bedford', name: 'Bedford', county: 'Bedfordshire', lat: 52.1364, lon: -0.4668 },
  { slug: 'northampton', name: 'Northampton', county: 'Northamptonshire', lat: 52.2405, lon: -0.9027 },
  { slug: 'colchester', name: 'Colchester', county: 'Essex', lat: 51.8959, lon: 0.8919 },
  { slug: 'chelmsford', name: 'Chelmsford', county: 'Essex', lat: 51.7356, lon: 0.4685 },
  { slug: 'watford', name: 'Watford', county: 'Hertfordshire', lat: 51.6565, lon: -0.3903 },
  { slug: 'brighton', name: 'Brighton', county: 'East Sussex', lat: 50.8225, lon: -0.1372 },
  { slug: 'bournemouth', name: 'Bournemouth', county: 'Dorset', lat: 50.7192, lon: -1.8808 },
  { slug: 'plymouth', name: 'Plymouth', county: 'Devon', lat: 50.3755, lon: -4.1427 },
  { slug: 'exeter', name: 'Exeter', county: 'Devon', lat: 50.7184, lon: -3.5339 },
  { slug: 'gloucester', name: 'Gloucester', county: 'Gloucestershire', lat: 51.8642, lon: -2.2380 },
  { slug: 'cheltenham', name: 'Cheltenham', county: 'Gloucestershire', lat: 51.9002, lon: -2.0781 },
  { slug: 'swindon', name: 'Swindon', county: 'Wiltshire', lat: 51.5558, lon: -1.7797 },
  { slug: 'york', name: 'York', county: 'North Yorkshire', lat: 53.9600, lon: -1.0873 },
  { slug: 'middlesbrough', name: 'Middlesbrough', county: 'North Yorkshire', lat: 54.5742, lon: -1.2350 },
  { slug: 'hull', name: 'Hull', county: 'East Yorkshire', lat: 53.7457, lon: -0.3367 },
  { slug: 'bradford', name: 'Bradford', county: 'West Yorkshire', lat: 53.7960, lon: -1.7594 },
  { slug: 'wakefield', name: 'Wakefield', county: 'West Yorkshire', lat: 53.6833, lon: -1.4977 },
  { slug: 'preston', name: 'Preston', county: 'Lancashire', lat: 53.7632, lon: -2.7031 },
  { slug: 'blackpool', name: 'Blackpool', county: 'Lancashire', lat: 53.8175, lon: -3.0357 },
  { slug: 'warrington', name: 'Warrington', county: 'Cheshire', lat: 53.3900, lon: -2.5970 },
  { slug: 'chester', name: 'Chester', county: 'Cheshire', lat: 53.1934, lon: -2.8931 },
  { slug: 'cardiff', name: 'Cardiff', county: 'South Glamorgan', lat: 51.4816, lon: -3.1791 },
  { slug: 'swansea', name: 'Swansea', county: 'West Glamorgan', lat: 51.6214, lon: -3.9436 },
  { slug: 'newport', name: 'Newport', county: 'Gwent', lat: 51.5842, lon: -2.9977 },
  { slug: 'edinburgh', name: 'Edinburgh', county: 'Midlothian', lat: 55.9533, lon: -3.1883 },
  { slug: 'glasgow', name: 'Glasgow', county: 'Lanarkshire', lat: 55.8642, lon: -4.2518 },
];

// Built once at module load: O(1) lookup for any "<niche-slug>-<town-slug>"
// path segment. Deliberately NOT parsed at request time by splitting on the
// last hyphen — niche slugs (e.g. "subsidence-repair") and town slugs (e.g.
// "stoke-on-trent", "milton-keynes") both contain internal hyphens, so a
// lastIndexOf('-') split misidentifies the boundary for any multi-word town.
export const PAGE_MAP = new Map();
for (const niche of NICHES) {
  for (const town of TOWNS) {
    PAGE_MAP.set(`${niche.slug}-${town.slug}`, { niche, town });
  }
}

// Great-circle distance in km — used only to rank towns by proximity for
// internal cross-linking (below), not for anything precision-sensitive.
function haversineKm(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Built once at module load: for every town, its 5 nearest other towns.
// Used to cross-link landing pages ("<niche> in nearby towns") so the site's
// 200 pages form a real link graph instead of each page only linking back to
// the flat hub — GSC showed real impressions but positions in the 70s-90s
// for a brand-new domain with no internal linking signal (2026-08-11).
export const NEAREST_TOWNS_BY_SLUG = new Map();
for (const town of TOWNS) {
  const ranked = TOWNS.filter((t) => t.slug !== town.slug)
    .map((t) => ({ town: t, km: haversineKm(town, t) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 5)
    .map((r) => r.town);
  NEAREST_TOWNS_BY_SLUG.set(town.slug, ranked);
}

export const COOKIE_NAME = 'gl_dash_session';
export const LOGIN_TOKEN_TTL_SECONDS = 15 * 60; // 15 minutes
export const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours
