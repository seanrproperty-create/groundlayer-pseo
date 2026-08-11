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
  'japanese-knotweed-removal': [
    {
      q: 'Do I have to declare Japanese knotweed when selling my house?',
      a: "Yes. The TA6 Property Information Form used in UK conveyancing asks directly whether the property is affected by Japanese knotweed, and you must answer yes, no, or don't know. Failing to disclose it honestly can lead to disputes or legal claims from the buyer after completion, so this isn't something worth guessing on.",
    },
    {
      q: 'Will Japanese knotweed stop me getting a mortgage?',
      a: "It depends on severity, not just presence. RICS uses a Management Category system: Category A (knotweed already causing damage to structures) usually means automatic rejection until a treatment plan is in place; Category B (present but not causing structural damage) typically just needs a funded Management Plan; Category C (on adjoining land within 7 metres of the boundary) is the mildest case. Most lenders will proceed once a PCA-accredited specialist has provided a Knotweed Management Plan with an insurance-backed guarantee, though each lender sets its own criteria.",
    },
    {
      q: 'Is it illegal to have Japanese knotweed in my garden?',
      a: "No — simply having it on your land isn't a criminal offence and it doesn't have to be reported. What's illegal, under Schedule 9 of the Wildlife and Countryside Act 1981, is planting it or causing it to spread into the wild or onto neighbouring land. Section 14 offences can carry unlimited fines and, in serious cases, imprisonment, so the legal risk is really about allowing it to spread unmanaged, not about ownership itself.",
    },
    {
      q: 'How is Japanese knotweed actually treated?',
      a: 'The two main approaches are herbicide treatment (a programme of applications over several growing seasons, carried out by a PCA-accredited firm who provide a Knotweed Management Plan and an insurance-backed guarantee, often valid for up to 10 years) or physical excavation, which is faster but more disruptive and requires the dug-out material to be disposed of correctly as controlled waste. Which is right depends on the size of the infestation, timescale, and whether a sale or mortgage is pending.',
    },
    {
      q: "What's the difference between Category A, B, and C knotweed risk?",
      a: "This is the RICS framework mortgage lenders use to assess a property. Category A means the knotweed is close enough to cause structural damage — this is the category that usually triggers an automatic mortgage rejection until a treatment plan is agreed. Category B is present on the property but not causing structural damage, and Category C is on land adjoining the property, within 7 metres of the boundary. All three still warrant a professional survey, but the lending risk and urgency differ significantly between them.",
    },
  ],
  'structural-building-surveys': [
    {
      q: "What's the difference between a Level 2 and Level 3 survey?",
      a: "A Level 2 survey (HomeBuyer Report) is a visual inspection of accessible parts of the property, suited to modern homes in reasonable condition — it includes the surveyor's opinion on repairs, flags urgent issues, and can include a market valuation. A Level 3 survey (Building Survey) is a much more detailed structural inspection that involves lifting carpets and opening roof spaces where accessible, with full commentary on construction methods and defects — it's the right choice for older, unusual, or listed properties where a Level 2's visual-only inspection wouldn't catch enough.",
    },
    {
      q: "Do I need a survey if I'm already getting a mortgage valuation?",
      a: "Yes — a mortgage valuation only confirms to the lender that the property is worth what they're lending against; it isn't a survey and doesn't assess the building's condition in any real depth. A separate Level 2 or Level 3 survey, commissioned by the buyer, is the only way to actually understand what state the property is in before committing to buy it.",
    },
    {
      q: 'How much does a house survey cost in the UK?',
      a: 'As a general guide: a Level 1 Condition Report typically runs £300-£500, a Level 2 HomeBuyer Report £400-£900, and a Level 3 Building Survey £700-£1,500 or more, with London prices often 30-50% higher. The exact cost depends on the size, age, and value of the property, so these figures are a starting point rather than a quote.',
    },
    {
      q: 'Which survey level do I need for an older or period property?',
      a: "A Level 3 Building Survey is generally recommended for period properties, listed buildings, homes of non-standard construction, or anything older than roughly 50 years. These properties are far more likely to have hidden structural issues — historic movement, past repairs, non-standard materials — that only the more invasive Level 3 inspection is designed to uncover.",
    },
    {
      q: 'What happens if the survey finds a problem?',
      a: "The report will flag issues with a severity rating and the surveyor's professional opinion on what's urgent versus cosmetic. Significant structural findings are usually the point where it makes sense to bring in a specialist — a structural engineer for cracking, a damp specialist for damp, and so on — for a targeted assessment before deciding whether to proceed, renegotiate the price, or ask the seller to address it first.",
    },
  ],
  'damp-proofing': [
    {
      q: 'What\'s the difference between rising damp, penetrating damp, and condensation?',
      a: "Rising damp is groundwater moving up through masonry by capillary action where the damp-proof course has failed or is missing, and usually appears as a tide-mark up to around a metre on ground-floor walls. Penetrating damp comes from an external source — a defective gutter, cracked render, a bridged cavity — and can appear at any height. Condensation comes from everyday moisture (cooking, showering, drying laundry) condensing on cold surfaces, and is very commonly mistaken for rising damp. Getting the diagnosis right matters, because the fix for each is completely different.",
    },
    {
      q: 'What is BS 6576 and why does it matter?',
      a: "BS 6576 is the British Standard covering how rising damp should be diagnosed and how chemical damp-proof courses should be installed. It exists largely because rising damp is one of the most over-diagnosed problems in UK homes — condensation and penetrating damp get blamed on it far more often than genuine rising damp actually occurs — so a contractor following BS 6576 is one who's done the diagnosis properly before recommending (or not recommending) treatment.",
    },
    {
      q: 'How is a chemical damp-proof course installed?',
      a: 'A chemical DPC involves drilling a controlled pattern of holes along the affected wall and injecting a liquid formulation that penetrates the masonry and reacts with it to form a continuous water-resistant barrier — effectively replacing a physical damp-proof course that has failed or was never installed.',
    },
    {
      q: 'Is rising damp always the real cause of a damp problem?',
      a: "No, and this is worth checking carefully before paying for treatment. Genuine rising damp is less common than the staining and skirting-board damage often blamed on it — penetrating damp and condensation account for a large share of the damp problems surveyors are actually called out to. BS 6576 exists specifically so rising damp gets properly diagnosed rather than assumed, since treating condensation with a chemical injection won't fix anything.",
    },
    {
      q: 'How much does damp proofing cost?',
      a: "It depends entirely on which type of damp is actually present and how much wall length and re-plastering is involved — a straightforward chemical DPC injection on one wall is a very different job to a full external drainage fix for persistent penetrating damp. An accurate figure needs a proper diagnosis first, which is why a general estimate without a site visit isn't very meaningful.",
    },
  ],
  'party-wall-surveyors': [
    {
      q: 'What counts as a party wall?',
      a: 'A party wall is a wall (or in some cases a garden boundary wall) that sits on the boundary between two properties and is shared by both. The Party Wall etc. Act 1996 also covers excavation near a neighbouring building\'s foundations even where there\'s no shared wall at all, if the new foundations are within 3-6 metres depending on their depth.',
    },
    {
      q: 'When do I need to serve a party wall notice?',
      a: "You need to serve written notice on affected neighbours between two months and one year before starting work covered by the Act — building on or at the boundary, work directly to a shared wall, or nearby excavation. A notice lapses if the work hasn't started within 12 months of being served, so serving too early just means doing it again later.",
    },
    {
      q: "What happens if my neighbour doesn't respond to a party wall notice?",
      a: "If there's no response within 14 days, it's treated as a dispute under the Act and surveyors have to be appointed to resolve it — either one surveyor agreed by both sides, or one surveyor for each side who then agree a third if needed. This still results in a formal Party Wall Award, it just takes longer and costs more than a straightforward written consent would have.",
    },
    {
      q: 'How much does a party wall surveyor cost?',
      a: 'With a single surveyor agreed by both parties, typical costs run from around £900 to £2,700 for a straightforward matter. Where each side appoints their own surveyor, hourly rates of roughly £150-£300 are more common, with total costs often landing between £1,000 and £3,000. Under the Act, the building owner carrying out the work is responsible for all reasonable surveyor fees, including the neighbour\'s surveyor if they choose to appoint one separately.',
    },
    {
      q: 'Do I still need a party wall agreement if my neighbour has no objection?',
      a: "Yes. A verbal \"no objection\" isn't enough under the Act — the neighbour needs to give written consent to the notice, or a formal Party Wall Award needs to be agreed between surveyors. Skipping this step leaves the building owner without the legal protections the Act provides if a dispute arises later, for example over damage caused during the work.",
    },
  ],
};

export function getFaqForNiche(nicheSlug) {
  return FAQ_BY_NICHE[nicheSlug] || [];
}
