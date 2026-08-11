// Real, sourced per-town/region signals used to give the 200 niche x town
// landing pages genuine local variation instead of just swapped placeholders
// — see [[project_groundlayer_pseo_build]] and the pseo-directory-buildout
// skill's "Building topical authority" section. Every classification here is
// either (a) live government API data (flood risk) or (b) a published,
// citable regional finding (BGS/ABI subsidence data, UK wind-loading
// standard), deliberately NOT a fabricated precise per-town claim. Where a
// town isn't in a "higher" tier, the copy still recommends a proper
// site-specific assessment rather than implying zero risk.

// Flood-risk-area counts within 5km of each town centre, from the
// Environment Agency flood-monitoring API (environment.data.gov.uk),
// captured 2026-08-11. Precomputed offline rather than fetched per page
// request — this is a low-churn dataset (designated flood areas don't
// change day to day) and 200 landing pages doing a live external fetch on
// every render would add latency/failure risk for no real benefit. The
// /tools/property-risk-checker/ tool (risk-data.js) still calls the API
// live, since a postcode lookup there is inherently a one-off, on-demand
// query, not a page served to every visitor.
// Cardiff, Swansea, Newport, Edinburgh and Glasgow are deliberately absent,
// not zero: the Environment Agency covers England only (Wales sits with
// Natural Resources Wales, Scotland with SEPA, neither federated into this
// API). Verified directly — even at a 30km radius from Cardiff the API
// returns zero Welsh entries (only Somerset coast areas, i.e. the English
// side of the Bristol Channel), confirming this is a coverage gap, not a
// real "no flood risk" finding. Presenting 0 for those five towns would
// have been a false claim, so renderLocalContextSection() (templates.js)
// only renders this section when a town has a real entry here.
export const FLOOD_AREA_COUNT_BY_TOWN_SLUG = {
  london: 27,
  birmingham: 20,
  manchester: 19,
  leeds: 27,
  sheffield: 47,
  bristol: 22,
  liverpool: 9,
  'newcastle-upon-tyne': 14,
  sunderland: 10,
  nottingham: 26,
  leicester: 23,
  southampton: 15,
  portsmouth: 17,
  reading: 15,
  oxford: 12,
  cambridge: 15,
  peterborough: 11,
  norwich: 15,
  ipswich: 9,
  derby: 16,
  'stoke-on-trent': 10,
  coventry: 11,
  wolverhampton: 5,
  'milton-keynes': 13,
  luton: 7,
  bedford: 13,
  northampton: 11,
  colchester: 7,
  chelmsford: 9,
  watford: 16,
  brighton: 6,
  bournemouth: 12,
  plymouth: 12,
  exeter: 15,
  gloucester: 21,
  cheltenham: 11,
  swindon: 11,
  york: 31,
  middlesbrough: 15,
  hull: 38,
  bradford: 11,
  wakefield: 17,
  preston: 21,
  blackpool: 13,
  warrington: 25,
  chester: 9,
};

export const FLOOD_DATA_SOURCE_NOTE = 'Source: Environment Agency flood-monitoring API, captured 2026-08-11 (England only).';

// Counties/regions BGS and ABI/insurer data explicitly name as where UK
// shrink-swell clay subsidence claims concentrate: London, the South East,
// parts of East Anglia, and the Midlands (BGS, "Latest research emphasises
// climate-related subsidence risk to millions of British homes", 2026;
// ABI-sourced reporting naming Essex, Kent, Hertfordshire and Bedfordshire
// specifically as highest-claim counties). Deliberately does NOT extend this
// to every South East/Midlands county — only ones actually named in that
// research — and deliberately does NOT claim zero risk for counties outside
// this set; BGS's own explanation (clay elsewhere is older/harder, "less
// able to absorb water") is used verbatim in spirit for the lower-tier copy,
// not a claim that subsidence can't happen there.
export const HIGHER_CLAY_RISK_COUNTIES = new Set([
  'Greater London',
  'Essex',
  'Hertfordshire',
  'Bedfordshire',
  'Berkshire',
  'Oxfordshire',
  'Hampshire',
  'Buckinghamshire',
  'Cambridgeshire',
  'Norfolk',
  'Suffolk',
  'West Midlands',
  'Nottinghamshire',
  'Leicestershire',
  'Derbyshire',
  'Staffordshire',
  'Northamptonshire',
]);

// Towns with clear, uncontroversial direct coastal or tidal-estuary
// exposure — used only for a general, hedged note about UK wind-loading
// design standards (BS EN 1991-1-4 sets higher basic wind speeds for
// coastal/exposed sites), not a claim about any specific roof's exposure
// category, which depends on exact site conditions an engineer would assess.
export const COASTAL_TOWN_SLUGS = new Set([
  'blackpool',
  'bournemouth',
  'brighton',
  'plymouth',
  'portsmouth',
  'southampton',
  'liverpool',
  'hull',
  'swansea',
  'cardiff',
  'newport',
  'sunderland',
  'newcastle-upon-tyne',
  'middlesbrough',
  'exeter',
]);
