// Real "People Also Asked"-style Q&A per niche, written from established UK
// building-regulation/industry-standard knowledge (BS 8102 waterproofing
// grades, Town and Country Planning Act TPO rules, typical underpinning
// process, etc.) — not fabricated, not town-specific precision we can't back
// up. Same honesty discipline as risk-data.js: general accurate guidance,
// not a claim about any specific property. FAQPage schema is deliberately
// NOT attached (Google retired FAQ rich results May 2026) — this exists for
// genuine visitor/AI-answer-engine value and to fix the thin near-duplicate
// content GSC/AdSense flagged across the 200 niche x town pages, not for a
// rich-result snippet.

export const FAQ_BY_NICHE = {
  'subsidence-repair': [
    {
      q: 'What are the warning signs of subsidence in a UK home?',
      a: 'The classic signs are diagonal cracks wider than about 3mm (especially around doors and windows), cracks that are wider at the top than the bottom, doors and windows sticking, and a visible sloping or wrinkling in wallpaper near a crack. Not every crack is subsidence — normal thermal movement causes hairline cracks too — but new or growing diagonal cracks are worth a professional assessment.',
    },
    {
      q: 'Is subsidence covered by home insurance?',
      a: 'Most standard UK buildings insurance policies do cover subsidence, but premiums and excesses for subsidence claims are typically much higher than for other damage, and insurers usually require a structural engineer\'s report before agreeing a repair method. If a property has a history of subsidence, some insurers will decline cover or add specific exclusions, so always check the policy wording.',
    },
    {
      q: 'How much does underpinning cost in the UK?',
      a: 'Underpinning cost varies significantly with the extent of the affected wall, the method used, and ground conditions, so any figure without a site survey is only a rough guide. Traditional mass-concrete underpinning tends to be more disruptive and costly than modern methods like resin injection, which can be quicker for suitable cases. A structural engineer\'s assessment is the only reliable way to get an accurate cost for a specific property.',
    },
    {
      q: 'Can trees near my house cause subsidence?',
      a: 'Yes — this is one of the most common causes of subsidence in the UK, particularly on clay soils. Large trees draw significant amounts of water from the ground through their roots; on shrinkable clay, this can cause the soil beneath foundations to dry out and contract. The risk is highest for trees within roughly 10 metres of a building, though the exact distance depends on the species and soil type.',
    },
    {
      q: 'Will subsidence affect my ability to sell my home?',
      a: 'A history of subsidence doesn\'t make a property unsellable, but it does need to be disclosed to buyers and their mortgage lender. Properties with a fully repaired, documented subsidence history (ideally with an insurance-backed guarantee) are much easier to sell and mortgage than ones with unresolved or undocumented movement, so getting a proper structural report and, where needed, repair is usually worthwhile before marketing.',
    },
  ],
  'commercial-roofing': [
    {
      q: 'How often should a commercial flat roof be inspected?',
      a: 'Most roofing contractors and insurers recommend at least two inspections a year — typically spring and autumn — plus a check after any severe storm. Flat roofs in particular can develop ponding, membrane splits, or blocked outlets that aren\'t visible from ground level, so a proper inspection means someone getting up on the roof, not just a visual check from below.',
    },
    {
      q: "What's the difference between a recover and a full roof replacement?",
      a: 'A recover (or overlay) adds a new waterproofing layer on top of the existing roof build-up, which is faster and cheaper but only viable if the deck and insulation underneath are still structurally sound and dry. A full replacement strips back to the deck and rebuilds the whole system — necessary if there\'s trapped moisture, deck damage, or the roof has already been recovered once before (most warranties won\'t allow a second overlay).',
    },
    {
      q: 'How long does a commercial roof typically last?',
      a: 'It depends heavily on the system: built-up felt roofs typically last 15-20 years, single-ply membranes (like EPDM or PVC) often 20-25 years or more with proper maintenance, and metal standing-seam roofs can exceed 30-40 years. Poor maintenance, ponding water, and UV exposure all shorten these ranges considerably, which is why regular inspection matters more than the age figure alone.',
    },
    {
      q: 'What causes most commercial roof leaks?',
      a: 'The majority of commercial roof leaks trace back to a handful of causes: failed flashing around roof penetrations (pipes, vents, HVAC units), split or perished membrane at seams, blocked or damaged drainage leading to standing water, and damage from foot traffic during other maintenance work. Leaks often show up some distance from the actual defect, since water travels along the deck before dripping through, which is why a proper roof survey (not just chasing the drip) is the right way to diagnose one.',
    },
    {
      q: 'Do I need planning permission to replace a commercial roof?',
      a: 'Like-for-like repairs and most re-roofing work is usually permitted development and doesn\'t need planning permission, but this can change if the building is listed, in a conservation area, or if the replacement significantly alters the roof\'s height, shape, or materials. Building Regulations approval is a separate requirement from planning permission and typically does apply to re-roofing work, particularly around insulation standards — worth checking both before starting.',
    },
  ],
  'tree-surgeon': [
    {
      q: 'Do I need permission to remove a tree from my property?',
      a: "In most cases you don't need permission to remove a tree on your own land, but there are two common exceptions: the tree is covered by a Tree Preservation Order (TPO), or it's within a Conservation Area. Both require a formal application to the local planning authority before any work — checking with the council or an arborist before cutting is the safest first step, since penalties for unauthorised work on a protected tree can be significant.",
    },
    {
      q: 'How do I know if a tree is dangerous and needs removing?',
      a: 'Warning signs include large dead branches, fungal growth at the base of the trunk (often a sign of root or trunk decay), a noticeable lean that has developed recently, cracks or splits in the trunk, and roots that have visibly lifted or heaved. Not every concerning-looking tree needs felling — a qualified arborist can often assess and manage risk with pruning rather than removal — so a professional inspection is worth getting before assuming removal is the only option.',
    },
    {
      q: 'What is a Tree Preservation Order (TPO)?',
      a: 'A TPO is a legal designation made by a local planning authority under the Town and Country Planning Act to protect a specific tree, group of trees, or woodland that is considered to provide significant amenity value. Once a TPO is in place, it\'s a criminal offence to cut down, top, lop, uproot, wilfully damage, or wilfully destroy the tree without the council\'s written consent — this applies even to a tree on private land.',
    },
    {
      q: 'How much does professional tree removal cost?',
      a: 'Cost depends on the tree\'s size, species, condition, and access — a small garden tree with clear access is a very different job from a large, storm-damaged tree overhanging a building or road that needs specialist rigging and traffic management. Any fixed price without a site visit should be treated with caution; a proper quote comes after an arborist has actually assessed the tree and the access constraints.',
    },
    {
      q: 'Can I be fined for removing a protected tree?',
      a: "Yes — removing or damaging a tree protected by a TPO or in a Conservation Area without consent is a criminal offence, and UK courts can impose unlimited fines depending on the severity of the case, alongside a requirement to replant. It's always worth checking a tree's protected status with the local council before any removal or significant pruning work.",
    },
  ],
  'basement-waterproofing': [
    {
      q: 'What are the different types (grades) of basement waterproofing?',
      a: 'UK basement waterproofing is classified under British Standard BS 8102 into three grades based on intended use: Grade 1 (basic utility use, some damp acceptable), Grade 2 (better protection suited to storage or plant rooms, some seepage tolerated), and Grade 3 (fully habitable space, requiring a dry environment with no water ingress). The grade needed depends entirely on what the space will be used for, which is why a proper waterproofing design specifies the grade upfront.',
    },
    {
      q: 'How much does basement waterproofing cost in the UK?',
      a: 'Cost varies with the size of the space, the waterproofing method (cavity drain membrane, tanking, or external drainage), the severity of the existing water ingress, and access constraints. Converting an existing damp cellar into a Grade 3 habitable space is typically a larger project than simply damp-proofing a storage basement, so an accurate figure really does require a site survey rather than a general estimate.',
    },
    {
      q: 'What causes damp in a basement or cellar?',
      a: 'The main causes are groundwater pressure against below-ground walls, poor or blocked external drainage letting water pool against the foundation, condensation from inadequate ventilation, and rising damp through masonry that lacks an effective damp-proof course. Different causes need different fixes — treating condensation like groundwater ingress (or vice versa) is a common and expensive mistake, which is why correct diagnosis matters before any waterproofing work starts.',
    },
    {
      q: 'Is basement waterproofing covered by a guarantee?',
      a: 'Reputable waterproofing contractors typically offer an insurance-backed guarantee (often 10-30 years depending on the system) that remains valid even if the original contractor goes out of business. It\'s worth confirming a guarantee is genuinely insurance-backed, not just a company promise, before committing to a contractor, particularly for a Grade 3 habitable conversion where the cost of a future failure is much higher.',
    },
    {
      q: 'Can I convert a damp basement into a habitable room?',
      a: "Yes, but it needs to be designed and waterproofed to BS 8102 Grade 3 standard, which usually means a cavity drain membrane system with active drainage (a sump and pump) rather than simply sealing or tanking the walls. Building Regulations also apply to habitable basement conversions, covering areas like ceiling height, fire escape, ventilation, and damp-proofing, so this is a project that needs proper design input, not just a waterproofing product applied to the walls.",
    },
  ],
};

export function getFaqForNiche(nicheSlug) {
  return FAQ_BY_NICHE[nicheSlug] || [];
}
