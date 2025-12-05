# Approval Checkpoint Templates

**Purpose:** Standardized formats for the three user approval gates throughout the autopilot workflow

**Usage:** Copy these templates and fill with actual research findings at each checkpoint

---

## Overview

The autopilot-listicle-offers skill has **three approval checkpoints** where the skill presents findings and waits for user approval or correction:

1. **Checkpoint #1:** Initial Determination (after material analysis)
2. **Checkpoint #2:** Research Plan (after library check)
3. **Checkpoint #3:** Final Brief (after research completion)

At each checkpoint:
- Skill TELLS user what it determined/found
- User APPROVES or REDIRECTS
- If corrections needed, skill updates and re-presents

---

# CHECKPOINT #1: INITIAL DETERMINATION

**When:** After analyzing offer LP, example listicles, and checking resource library
**Purpose:** Validate offer classification, audience, and positioning before investing in research
**User Responses:** "Yes, proceed" / "No, adjust: [corrections]" / "More like: [alternative]"

---

## Template

```markdown
CHECKPOINT #1: INITIAL DETERMINATION

Based on analysis of [your offer landing page / your offer LP + example listicles / provided materials]:

---

## OFFER CLASSIFICATION

- **Category:** [Financial / Home Services / Health / Tech / Education / Automotive]
- **Offer Type:** [Specific type within category]
- **Mechanism:** [How it works - 1-2 sentences]
- **Value Proposition:** [Main benefit with numbers if available]
- **Cost Structure:** [Pricing model or "Not specified on LP"]

---

## TARGET AUDIENCE (determined from LP)

- **Age:** [Range or "Not specified"]
- **Situation:** [Specific current state - e.g., "$10K+ unsecured debt"]
- **Primary Pain:** [Specific painful situation happening NOW]
- **Income:** [Level/source if indicated, or "Not specified"]
- **Desired Outcome:** [What they want to achieve - specific]

---

## POSITIONING ANGLE (from example analysis)

[If examples provided:]
- **Tone:** [Pain-focused / Aspiration-focused / Logic-driven / Mixed]
- **Information Density:** [Brief / Moderate / Detailed] ([X-Y] words per offer)
- **CTA Pattern:** [Interactive selector / Calculator / Direct form / "Learn More" / etc.]
- **Visual Style:** [Approach used in examples]

[If NO examples provided:]
- Based on resource library patterns for [category]
- Recommend: [Suggested approach based on library knowledge]

---

## UNIQUE ELEMENTS (from your LP)

- [Differentiator 1 - specific feature or benefit]
- [Differentiator 2 - specific feature or benefit]
- [Differentiator 3 - specific feature or benefit]

[Or if limited:]
[Limited unique elements identified on LP - will research competitive differentiation]

---

## RESOURCE LIBRARY CHECK

✓ **Found:** [Resource name] (updated [date])
✓ **Found:** [Resource name] (updated [date])
✗ **Not found:** [Gap] (will research)

---

## CONFIDENCE ASSESSMENT

- **High confidence:** [List areas where multiple sources agree]
- **Medium confidence:** [List areas with some data but needs validation]
- **Low confidence:** [List areas with gaps or assumptions]

---

**Does this match what you're promoting, or should I adjust anything?**

[User can respond:]
- "Yes, proceed" → Move to Checkpoint #2 (Research Plan)
- "No, adjust: [specific corrections]" → Update analysis and re-present
- "More like: [alternative]" → Revise determinations
```

---

## Example (Filled)

```markdown
CHECKPOINT #1: INITIAL DETERMINATION

Based on analysis of your offer landing page and the example listicle you provided:

---

## OFFER CLASSIFICATION

- **Category:** Financial (Debt Relief)
- **Offer Type:** Debt Settlement
- **Mechanism:** Creditor negotiation to reduce total debt owed, avoiding bankruptcy
- **Value Proposition:** Reduce unsecured debt by 30-50% in 24-48 months
- **Cost Structure:** Percentage-based fees (15-25% of enrolled debt), charged only after successful settlement

---

## TARGET AUDIENCE (determined from LP)

- **Age:** 35-60
- **Situation:** $10K+ unsecured debt (credit cards, medical bills, personal loans)
- **Primary Pain:** Making minimum payments but debt not shrinking, collection calls causing stress
- **Income:** Employed but struggling, insufficient income for full payoff
- **Desired Outcome:** Debt-free in 2-4 years without bankruptcy damage

---

## POSITIONING ANGLE (from example analysis)

- **Tone:** Mixed (pain awareness → control → logical proof)
- **Information Density:** Moderate (200-300 words per offer)
- **CTA Pattern:** Interactive debt amount selector → personalized estimate
- **Visual Style:** Relatable imagery (person reviewing bills), benefit-focused

---

## UNIQUE ELEMENTS (from your LP)

- Mobile app for real-time progress tracking (tracks savings, settlements, timeline)
- Dedicated debt coach assigned to each client
- No upfront fees - only pay after successful settlement

---

## RESOURCE LIBRARY CHECK

✓ **Found:** debt-relief-research.md (updated 2 months ago)
✓ **Found:** financial-compliance.md (FTC Debt Relief Rule)
✓ **Found:** seniors-financial-psychology.md (from Grammy Notes)
✗ **Not found:** Mobile app positioning research (this differentiator is new)

---

## CONFIDENCE ASSESSMENT

- **High confidence:** Target audience, primary pain point, compliance requirements
- **Medium confidence:** Positioning angle (only 1 example provided, library patterns used)
- **Low confidence:** Mobile app as differentiator (not researched yet)

---

**Does this match what you're promoting, or should I adjust anything?**
```

---

# CHECKPOINT #2: RESEARCH PLAN

**When:** After resource library check, before conducting new research
**Purpose:** Get user approval on what to research (and what to reuse) before investing time
**User Responses:** "Yes" / "Also research: [item]" / "Skip: [item]"

---

## Template

```markdown
CHECKPOINT #2: RESEARCH PLAN

Based on resource library check and your approved determination:

---

## REUSABLE RESEARCH (From Library)

### ✅ [Research Track 1 - e.g., Category Research]
- **File:** [filename]
- **Updated:** [date]
- **Coverage:** [What it includes]
- **Time Saved:** ~[X] minutes

### ✅ [Research Track 2 - e.g., Compliance Rules]
- **File:** [filename]
- **Updated:** [date]
- **Coverage:** [What it includes]
- **Time Saved:** ~[X] minutes

### ✅ [Research Track 3 - e.g., Consumer Psychology]
- **File:** [filename]
- **Updated:** [date]
- **Coverage:** [What it includes]
- **Time Saved:** ~[X] minutes

[Continue for all reusable resources]

**Total Reuse Time Savings:** ~[XX] minutes

---

## NEW RESEARCH NEEDED (Gaps)

### 🔍 Research Track 1: [Name - e.g., Competitive Analysis]
- **What:** [Specific competitors or angles to analyze]
- **Why:** [Gap in library - e.g., "New brand not yet analyzed"]
- **Sources:** [Where research will be conducted]
- **Time:** ~[X] minutes

### 🔍 Research Track 2: [Name - e.g., Industry Data]
- **What:** [Specific data points or statistics needed]
- **Why:** [Gap or validation needed]
- **Sources:** [Industry reports, news, studies]
- **Time:** ~[X] minutes

### 🔍 Research Track 3: [Name - e.g., Consumer Psychology]
- **What:** [Specific psychological insights needed]
- **Why:** [New audience segment or unique angle]
- **Sources:** [Psychology research, forums, reviews]
- **Time:** ~[X] minutes

### 🔍 Research Track 4: [Name - e.g., Compliance]
- **What:** [Specific regulatory verification]
- **Why:** [New category or rule update check]
- **Sources:** [FTC, CFPB, state regulators]
- **Time:** ~[X] minutes

**Total New Research Time:** ~[XX] minutes

---

## TOTAL ESTIMATED TIME

- **Reusable research:** [X] minutes saved
- **New research:** [Y] minutes needed
- **Net research time:** [Y] minutes
- **Time savings vs. starting from scratch:** [X/(X+Y) * 100]%

---

## RESEARCH STRATEGY

1. **Parallel Execution:** All [N] research tracks run simultaneously
2. **Priority:** Focus on [highest priority gaps] first
3. **Validation:** Re-verify any library resources >[X] months old
4. **Savings:** All new findings saved back to library for future reuse

---

**Approve this research plan?**

[User can respond:]
- "Yes" → Proceed with research execution
- "Also research: [additional item]" → Add to plan, recalculate time
- "Skip: [item]" → Remove from plan, recalculate time
```

---

## Example (Filled)

```markdown
CHECKPOINT #2: RESEARCH PLAN

Based on resource library check and your approved determination:

---

## REUSABLE RESEARCH (From Library)

### ✅ Category Research
- **File:** debt-relief-research.md
- **Updated:** 2 months ago
- **Coverage:** Competitive landscape (5 major players), consumer behavior patterns, industry benchmarks
- **Time Saved:** ~8 minutes

### ✅ Compliance Rules
- **File:** financial-compliance.md
- **Updated:** 1 month ago
- **Coverage:** FTC Debt Relief Rule, prohibited claims, required disclosures, disclaimer templates
- **Time Saved:** ~5 minutes

### ✅ Consumer Psychology
- **File:** seniors-financial-psychology.md (from Grammy Notes)
- **Updated:** 2 months ago
- **Coverage:** Pain points (investment losses, monthly income focus), trust signals (FDIC-backed), CTA preferences
- **Time Saved:** ~6 minutes

### ✅ Visual Guidelines
- **File:** seniors-imagery.md
- **Updated:** 2 months ago
- **Coverage:** Model selection ("befuddled" not "disgruntled"), emotional tone
- **Time Saved:** ~2 minutes

### ✅ CTA Preferences
- **File:** cta-language-preferences.md
- **Updated:** 2 months ago
- **Coverage:** "Learn More" > "Transform", tier rankings
- **Time Saved:** ~2 minutes

**Total Reuse Time Savings:** ~23 minutes

---

## NEW RESEARCH NEEDED (Gaps)

### 🔍 Research Track 1: Mobile App Positioning
- **What:** How competitors position mobile app features in debt relief category
- **Why:** Your LP highlights mobile app as unique differentiator - need competitive context
- **Sources:** Competitor apps, app store reviews, fintech UX research
- **Time:** ~7 minutes

### 🔍 Research Track 2: 2025 Compliance Validation
- **What:** Verify FTC Debt Relief Rule hasn't changed in 2025
- **Why:** Library file from 1 month ago, ensure current
- **Sources:** FTC.gov, CFPB consumer finance updates
- **Time:** ~3 minutes

### 🔍 Research Track 3: Current Competitor Creative
- **What:** Fresh 2025 ad examples from top 3 competitors
- **Why:** Validate current messaging trends (library examples may be dated)
- **Sources:** Google Ads library, Facebook Ad library, competitor sites
- **Time:** ~5 minutes

**Total New Research Time:** ~15 minutes

---

## TOTAL ESTIMATED TIME

- **Reusable research:** 23 minutes saved
- **New research:** 15 minutes needed
- **Net research time:** 15 minutes
- **Time savings vs. starting from scratch:** 61% faster (23/38 * 100)

---

## RESEARCH STRATEGY

1. **Parallel Execution:** All 3 new research tracks run simultaneously
2. **Priority:** Mobile app positioning (highest priority - your unique differentiator)
3. **Validation:** Compliance verification concurrent with other tracks
4. **Savings:** All findings saved to resource-library/category-research/debt-relief-apps.md for future reuse

---

**Approve this research plan?**
```

---

# CHECKPOINT #3: FINAL BRIEF

**When:** After all research completed, before auto-invoking Layer 1 & 2
**Purpose:** User reviews comprehensive brief and approves copy generation
**User Responses:** "Proceed" / "Change: [edit]" / "Show full brief"

---

## Template

```markdown
CHECKPOINT #3: OFFER BRIEF COMPLETE

I've completed comprehensive research and generated your offer intelligence brief. Here's the summary:

---

## BRIEF SUMMARY

**Offer:** [Name/Description]
**Category:** [Category]
**Target Audience:** [Age range, situation summary]
**Primary Pain Point:** [Most acute pain identified]
**Unique Angle:** [Key differentiator from research]

---

## RESEARCH SCOPE

### Competitive Analysis
- **Analyzed:** [X] direct competitors, [Y] listicle examples
- **Positioning Opportunities Identified:**
  1. [Opportunity 1]
  2. [Opportunity 2]
  3. [Opportunity 3]

### Industry Data
- **Sources Consulted:** [Z] industry reports, news articles, studies
- **Key Statistics:**
  1. [Statistic 1 with number]
  2. [Statistic 2 with number]
  3. [Statistic 3 with number]

### Consumer Psychology
- **Pain Points Validated:** [N] primary pain points with evidence
- **Objections Identified:** [M] common objections with counter-strategies
- **Decision Triggers:** [List 2-3 key triggers]

### Compliance
- **Regulatory Bodies:** [FTC, CFPB, SEC, CMS, etc. - which apply]
- **Required Disclaimers:** [X] disclaimers identified
- **Prohibited Claims:** [Y] claims flagged to avoid

---

## CONFIDENCE ASSESSMENT

### ✅ HIGH CONFIDENCE
- [Area 1] - [Why - e.g., "Validated across 5 sources"]
- [Area 2] - [Why]
- [Area 3] - [Why]

### ⚠️ MEDIUM CONFIDENCE
- [Area 1] - [What's uncertain - e.g., "Limited data, logical inference"]
- [Area 2] - [What's uncertain]

### ⚠️ LOW CONFIDENCE / FLAGGED FOR REVIEW
- [Area 1] - [Gap or assumption - e.g., "Cost structure not disclosed on LP"]

---

## COPY RECOMMENDATIONS

### Lead Strategy
**Primary Hook:** [Pain / Aspiration / Logic / Social Proof]
- **Rationale:** [Why this approach based on research - 2-3 sentences]

### Primary CTA
**Recommended Text:** "[Exact button/link text]"
- **Rationale:** [Why this language based on audience research]

### Key Emphasis Points
1. **[Point 1]:** [Why emphasize - research support]
2. **[Point 2]:** [Why emphasize - research support]
3. **[Point 3]:** [Why emphasize - research support]

### Information Density
**Recommended Length:** [X-Y] words
- **Rationale:** [Based on example analysis and audience preference]

---

## COMPLIANCE ALERTS

### ⚠️ MUST INCLUDE
- [Required disclaimer 1]
- [Required disclosure 2]
- [Risk statement 3 if applicable]

### ❌ MUST NOT CLAIM
- [Prohibited claim 1]
- [Prohibited claim 2]
- [Prohibited claim 3]

[If applicable:]
### ⚠️ GRAY AREAS (Recommend Legal Review)
- [Gray area 1]
- [Gray area 2]

---

## TESTING STRATEGY

### Recommended Variations
1. **[Variation 1 Name]:** [Approach]
   - **Tests:** [Hypothesis]
   - **Expected to win with:** [Persona/situation]

2. **[Variation 2 Name]:** [Approach]
   - **Tests:** [Hypothesis]
   - **Expected to win with:** [Persona/situation]

3. **[Variation 3 Name]:** [Approach]
   - **Tests:** [Hypothesis]
   - **Expected to win with:** [Persona/situation]

### Primary Metric
[CTR / Conversion Rate / Form Completion / etc.]

---

## NEXT STEPS

If you approve this brief, I will **AUTOMATICALLY**:

1. ✅ **Invoke Layer 1** (analyze-listicle-offers)
   - Pre-populate all 50 discovery questions with answers from this brief
   - Generate complete Q&A analysis
   - [Estimated time: ~2-3 minutes]

2. ✅ **Invoke Layer 2** (write-listicle-copy)
   - Pass this brief + Layer 1 Q&A as context
   - Layer 2 conducts its own additional web research
   - Generate [X] copy variations
   - [Estimated time: ~10-15 minutes]

3. ✅ **Deliver FINISHED COPY** to you
   - All [X] variations ready to use
   - Testing recommendations
   - Compliance disclaimers included
   - Landing page alignment notes

**Total time to finished copy: ~15-20 minutes**

**You will receive publishable listicle copy - no manual skill runs needed.**

---

**What would you like to do?**

[User can respond:]
- "Proceed" → Auto-run Layer 1 & 2, deliver final copy
- "Change: [specific edit]" → Update brief, re-present Checkpoint #3
- "Show full brief" → View complete brief document (all sections)
- "More research: [topic]" → Conduct additional investigation first
```

---

## Example (Filled)

```markdown
CHECKPOINT #3: OFFER BRIEF COMPLETE

I've completed comprehensive research and generated your offer intelligence brief. Here's the summary:

---

## BRIEF SUMMARY

**Offer:** Debt Settlement via Mobile App Tracking
**Category:** Financial (Debt Relief)
**Target Audience:** 35-60, $10K+ unsecured debt, employed but struggling
**Primary Pain Point:** Collection calls + minimum payment futility (debt not shrinking)
**Unique Angle:** Real-time mobile app progress tracking (empowerment/control)

---

## RESEARCH SCOPE

### Competitive Analysis
- **Analyzed:** 5 direct competitors (Freedom Debt Relief, National Debt Relief, Accredited Debt Relief, Beyond Finance, ClearOne Advantage), 8 listicle examples
- **Positioning Opportunities Identified:**
  1. Mobile app visibility = unique differentiator (only 1 competitor has app)
  2. "Debt coach" personalization underutilized (trust signal opportunity)
  3. Competitors lead with "debt reduction %" - opportunity to lead with "control/empowerment"

### Industry Data
- **Sources Consulted:** 4 industry reports, 12 news articles, FTC consumer complaint data
- **Key Statistics:**
  1. Average American with credit card debt carries $6,501 balance (Experian 2025)
  2. Debt settlement reduces debt by 30-50% on average (AFCC data)
  3. 73% of consumers cite "stress relief" as primary benefit (Consumer Finance Survey 2025)

### Consumer Psychology
- **Pain Points Validated:** 5 primary pain points (collection calls, payment futility, shame, no end in sight, can't afford bankruptcy)
- **Objections Identified:** 4 objections (credit score impact, scam fear, too good to be true, upfront cost) with counter-strategies
- **Decision Triggers:** Financial crisis event (job loss, medical bill), tax refund season, New Year resolution timing

### Compliance
- **Regulatory Bodies:** FTC (Telemarketing Sales Rule - Debt Relief Amendment), CFPB
- **Required Disclaimers:** 3 disclaimers (credit impact, no guarantees, fee structure)
- **Prohibited Claims:** 5 prohibited claims (guaranteed results, guaranteed timeframes, immediate relief, no credit impact, government endorsement)

---

## CONFIDENCE ASSESSMENT

### ✅ HIGH CONFIDENCE
- Target audience - Validated across 5 competitors + industry data + FTC complaint patterns
- Compliance requirements - FTC Debt Relief Rule verified (no 2025 changes)
- Primary pain points - Consistent across consumer surveys, reviews, forum discussions

### ⚠️ MEDIUM CONFIDENCE
- Mobile app positioning - Limited competitive examples (only 1 competitor), but strong differentiation potential based on fintech UX research

### ⚠️ LOW CONFIDENCE / FLAGGED FOR REVIEW
- None - all major areas have strong research backing

---

## COPY RECOMMENDATIONS

### Lead Strategy
**Primary Hook:** Pain-focused (collection calls + payment futility) → Control (mobile app visibility)
- **Rationale:** Psychology research shows acute pain (collection calls) creates urgency, but empowerment angle (app control) provides hope. This combination addresses both fear and aspiration. Competitors lead with "debt reduction %" (logic), so leading with pain+control differentiates.

### Primary CTA
**Recommended Text:** "See How Much You Could Save"
- **Rationale:** Grammy Notes feedback: "Learn More" preferred over pushy language. This variation adds specificity ("how much") while maintaining low-pressure tone. Triggers curiosity about personalized calculation.

### Key Emphasis Points
1. **Real-time tracking:** Research shows visibility = empowerment (fintech UX principle), competitors lack this
2. **30-50% reduction:** Industry benchmark, specific numbers build credibility
3. **No upfront fees:** Addresses primary objection (scam fear, affordability)

### Information Density
**Recommended Length:** 200-250 words
- **Rationale:** Competitive analysis shows 200-300 words is standard for financial listicles. Grammy Notes (seniors) prefer moderate density (not overwhelming). This range balances detail with scan-ability.

---

## COMPLIANCE ALERTS

### ⚠️ MUST INCLUDE
- "Debt settlement may negatively impact your credit score"
- "Results vary. We cannot guarantee specific debt reduction amounts or timeframes"
- "Fees charged only after successful settlement. [X-Y%] of enrolled debt"

### ❌ MUST NOT CLAIM
- Guaranteed debt reduction percentages ("We WILL reduce your debt by 50%")
- Guaranteed timeframes ("Debt-free in 24 months guaranteed")
- Immediate relief ("Stop collection calls today")
- No credit impact ("Won't hurt your credit")
- Government endorsement ("FTC-approved" or "Government-backed")

---

## TESTING STRATEGY

### Recommended Variations
1. **Pain-Focused ("The 3AM Collection Call"):** Lead with acute stress scenario
   - **Tests:** Does vivid pain create urgency?
   - **Expected to win with:** High-stress users, recent financial crisis

2. **Control-Focused ("Track Every Dollar of Debt Relief"):** Lead with mobile app empowerment
   - **Tests:** Does unique differentiator drive clicks?
   - **Expected to win with:** Tech-comfortable users, control-seekers

3. **Logic-Focused ("The Math Behind Debt Freedom"):** Lead with 30-50% reduction specifics
   - **Tests:** Does rational proof outperform emotion?
   - **Expected to win with:** analytical decision-makers, skeptics

4. **Trust-Focused ("Your Personal Debt Coach Explains How"):** Lead with human support
   - **Tests:** Does relationship emphasis build credibility?
   - **Expected to win with:** Trust-focused users, scam-wary

5. **Aspiration-Focused ("Imagine Checking Your Phone and Seeing $0 Debt"):** Lead with future state
   - **Tests:** Does aspiration motivate more than pain?
   - **Expected to win with:** Hope-driven users, long-term thinkers

### Primary Metric
Click-through rate (CTR) to landing page, then monitor form completion rate

---

## NEXT STEPS

If you approve this brief, I will **AUTOMATICALLY**:

1. ✅ **Invoke Layer 1** (analyze-listicle-offers)
   - Pre-populate all 50 discovery questions with answers from this brief
   - Generate complete Q&A analysis
   - [Estimated time: ~2-3 minutes]

2. ✅ **Invoke Layer 2** (write-listicle-copy)
   - Pass this brief + Layer 1 Q&A as context
   - Layer 2 conducts its own additional web research
   - Generate 5 copy variations (pain, control, logic, trust, aspiration)
   - [Estimated time: ~10-15 minutes]

3. ✅ **Deliver FINISHED COPY** to you
   - All 5 variations ready to use (headlines, body copy, CTAs)
   - Testing recommendations with hypotheses
   - Compliance disclaimers included
   - Landing page alignment notes

**Total time to finished copy: ~15-20 minutes**

**You will receive publishable listicle copy - no manual skill runs needed.**

---

**What would you like to do?**
```

---

## Usage Notes

### When to Use Each Template

- **Checkpoint #1:** After material-analysis.md workflow complete
- **Checkpoint #2:** After resource-library-check.md workflow complete
- **Checkpoint #3:** After brief-generation.md workflow complete

### Handling User Responses

**"Yes" / "Proceed":**
- Move to next phase immediately
- No re-presentation needed

**"No, adjust: [X]" / "Change: [X]":**
- Update specified section
- Re-present checkpoint with changes highlighted
- Example: "Updated target audience age range from 35-60 → 25-40 per your feedback. Does this look better?"

**"More like: [Y]":**
- Treat as complete replacement of determination
- Re-analyze with new direction
- Re-present checkpoint

**"Also research: [Z]":**
- Add to research plan (Checkpoint #2)
- Recalculate time estimate
- Re-present updated plan

**"Skip: [A]":**
- Remove from research plan (Checkpoint #2)
- Recalculate time savings
- Re-present updated plan

**"Show full brief":**
- Present complete brief document (all 11 sections)
- Allow detailed review
- Accept section-specific edits

---

## Tone Guidelines

### Be Transparent
- Always show confidence levels (high/medium/low)
- Flag assumptions explicitly
- Cite sources when making claims

### Be Concise
- Summaries should be skimmable
- Detailed data in full brief, not checkpoint presentation
- Use bullet points over paragraphs

### Be Actionable
- Clear next steps at every checkpoint
- Specific response options (not open-ended "thoughts?")
- Time estimates for user planning

### Be Professional
- Avoid over-enthusiastic language ("Amazing findings!")
- Stick to facts and research
- Let data speak for itself

---

**These templates ensure consistent, professional user communication at each approval gate.**
