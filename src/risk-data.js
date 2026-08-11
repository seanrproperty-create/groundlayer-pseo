// Property Structural Risk Checker — data layer.
//
// Deliberately conservative about what's presented as *this property's*
// data vs. general UK educational guidance. Only the flood-risk-area count
// is genuinely location-specific, sourced live from a real government API.
// Subsidence/tree/roofing content is accurate, well-established UK-wide
// guidance, not a per-postcode claim we can't back up — see the terms page
// ("we do not ourselves carry out any inspection, survey, or building
// work") and the SLA/misrepresentation lesson from Brief 1012: never claim
// more precision than the underlying data actually supports.

const POSTCODE_RE = /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/;

export function normalisePostcode(input) {
  return (input || '').trim().toUpperCase().replace(/\s+/g, ' ');
}

export function isValidPostcodeFormat(postcode) {
  return POSTCODE_RE.test(postcode);
}

// postcodes.io — free, keyless, no rate-limit auth required for reasonable
// use. Real, live UK postcode geocoding/admin-area lookup.
async function geocodePostcode(postcode) {
  const resp = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`);
  if (!resp.ok) return null;
  const data = await resp.json();
  if (data.status !== 200 || !data.result) return null;
  return {
    postcode: data.result.postcode,
    latitude: data.result.latitude,
    longitude: data.result.longitude,
    adminDistrict: data.result.admin_district,
    region: data.result.region || data.result.country,
    country: data.result.country,
  };
}

// Environment Agency flood-monitoring API — free, keyless, Open Government
// Licence. Returns designated flood-risk *areas* (not a precise per-address
// score) within `dist` km of a point. This is the one part of the checker
// backed by real, live, location-specific government data.
async function nearbyFloodAreas(latitude, longitude, distKm = 3) {
  try {
    const url = `https://environment.data.gov.uk/flood-monitoring/id/floodAreas?lat=${latitude}&long=${longitude}&dist=${distKm}`;
    const resp = await fetch(url);
    if (!resp.ok) return { ok: false, areas: [] };
    const data = await resp.json();
    const items = Array.isArray(data.items) ? data.items : [];
    return {
      ok: true,
      count: items.length,
      areas: items.slice(0, 3).map((a) => a.label || a.description).filter(Boolean),
    };
  } catch (err) {
    return { ok: false, areas: [] };
  }
}

/**
 * Returns { error } or { postcode, adminDistrict, region, flood: {...} }.
 * Never throws — a failed flood-API call degrades to flood.ok = false
 * rather than failing the whole page, since the educational sections below
 * don't depend on it.
 */
export async function checkPropertyRisk(rawPostcode) {
  const postcode = normalisePostcode(rawPostcode);
  if (!isValidPostcodeFormat(postcode)) {
    return { error: 'Enter a valid UK postcode, e.g. N17 9DJ.' };
  }
  const geo = await geocodePostcode(postcode);
  if (!geo) {
    return { error: `Couldn't find "${postcode}" — check it's a real UK postcode and try again.` };
  }
  const flood = await nearbyFloodAreas(geo.latitude, geo.longitude);
  return {
    postcode: geo.postcode,
    adminDistrict: geo.adminDistrict,
    region: geo.region,
    country: geo.country,
    flood,
  };
}
