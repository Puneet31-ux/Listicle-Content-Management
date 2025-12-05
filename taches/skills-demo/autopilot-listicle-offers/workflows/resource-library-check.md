# Resource Library Check Workflow

**Purpose:** Scan the resource library for reusable research before conducting new research, saving time and maintaining consistency.

**When to Execute:** After initial material analysis (Phase 1), before presenting Research Plan at Checkpoint #2

**Output:** List of reusable resources + gaps requiring new research

---

## Step 1: Identify Offer Category

From material analysis, you've determined:
- **Primary Category:** [Financial / Home Services / Health / Tech / Education / Automotive]
- **Offer Type:** [Specific within category - e.g., "Debt Settlement" within Financial]
- **Target Audience:** [Age range, situation, demographics]

These attributes determine which library resources are relevant.

---

## Step 2: Scan Category Research

### Location
`resource-library/category-research/`

### Files to Check

**Pattern 1: Exact Category Match**
- Look for: `[category]-research.md`
- Example: `debt-relief-research.md` for debt settlement offers
- Example: `solar-installation-research.md` for solar offers

**Pattern 2: Offer Type Match**
- Look for: `[offer-type]-research.md`
- Example: `high-yield-savings-research.md` for savings account offers
- Example: `mortgage-refinance-research.md` for refinance offers

**Pattern 3: Broader Category**
- If no exact match, check parent category
- Example: For "Medicare Supplement", check `health-insurance-research.md`
- Example: For "Roof Replacement", check `home-services-research.md`

### What to Extract (If Found)

```markdown
✓ FOUND: [filename] (updated [date])

REUSABLE INSIGHTS:
- Competitive landscape: [X competitors analyzed]
- Market data: [Key statistics, market size, trends]
- Consumer behavior: [How target audience researches/decides]
- Industry benchmarks: [Success rates, timelines, typical costs]
- Common pain points: [Validated across sources]
- Common objections: [Skepticism patterns]
```

### If Not Found

```markdown
✗ NOT FOUND: [category]-research.md

NEW RESEARCH NEEDED:
- Competitive landscape (no existing analysis)
- Market data gathering
- Consumer behavior patterns
```

---

## Step 3: Scan Compliance Rules

### Location
`resource-library/compliance-rules/`

### Files to Check

**Pattern 1: Category-Specific Compliance**
- Look for: `[category]-compliance.md`
- Example: `financial-compliance.md` (FTC Debt Relief Rule, TILA, etc.)
- Example: `healthcare-compliance.md` (HIPAA, CMS Medicare marketing rules)
- Example: `home-services-compliance.md` (State contractor licensing, etc.)

**Pattern 2: Cross-Category Compliance**
- Check: `general-advertising-compliance.md` (FTC general rules)
- Check: `testimonial-compliance.md` (FTC endorsement guidelines)

### What to Extract (If Found)

```markdown
✓ FOUND: financial-compliance.md (updated [date])

REUSABLE RULES:
- Prohibited claims: [List specific no-go claims]
- Required disclosures: [Must-include disclaimers]
- Regulatory bodies: [FTC, CFPB, SEC, state regulators]
- Red flag words: [Terms to avoid]
- Disclosure templates: [Copy-paste ready disclaimers]
```

### If Not Found

```markdown
✗ NOT FOUND: [category]-compliance.md

NEW RESEARCH NEEDED:
- Regulatory landscape research
- Prohibited claims identification
- Required disclosures compilation
- Create compliance file for future reuse
```

---

## Step 4: Scan Consumer Psychology

### Location
`resource-library/consumer-psychology/`

### Files to Check

**Pattern 1: Audience-Specific Psychology**
- Look for: `[audience]-[category]-psychology.md`
- Example: `seniors-financial-psychology.md` (from Grammy Notes)
- Example: `young-families-home-psychology.md`
- Example: `retirees-health-psychology.md`

**Pattern 2: Category-Level Psychology**
- Look for: `[category]-psychology.md`
- Example: `debt-psychology.md` (general debt relief psychology)
- Example: `home-improvement-psychology.md`

**Pattern 3: Situation-Specific**
- Look for: `[situation]-psychology.md`
- Example: `financial-crisis-psychology.md`
- Example: `chronic-pain-psychology.md`

### What to Extract (If Found)

```markdown
✓ FOUND: seniors-financial-psychology.md (from Grammy Notes)

REUSABLE INSIGHTS:
- Primary pain points: [Validated pain patterns]
- Motivators: [What drives action]
- Decision-making patterns: [How they research/decide]
- Trust signals: [What builds credibility - e.g., FDIC-backed]
- Objections: [Common skepticism points]
- Cognitive biases: [Loss aversion, social proof needs, etc.]
```

### If Not Found

```markdown
✗ NOT FOUND: [audience]-psychology.md

NEW RESEARCH NEEDED:
- Audience psychology research
- Pain point validation
- Decision trigger identification
```

---

## Step 5: Scan Listicle Examples

### Location
`resource-library/listicle-examples/[category]/`

### Files to Check

**Pattern 1: Offer Type Examples**
- Look for: `[offer-type]-examples.md`
- Example: `debt-relief-examples.md`
- Example: `senior-discounts-examples.md`

**Pattern 2: Competitive Analysis**
- Look for: `[category]-competitive-analysis.md`
- Example: `senior-discounts-competitive-analysis.md` (analyzes 5+ listicles)

**Pattern 3: Similar Audience**
- Look for: Examples targeting same demographic
- Example: Senior-focused examples for any senior-targeted offer

### What to Extract (If Found)

```markdown
✓ FOUND: senior-discounts-competitive-analysis.md (updated [date])

REUSABLE PATTERNS:
- Title formulas: [Common winning patterns]
- Information density: [Brief/Moderate/Detailed - word counts]
- CTA language: [Most effective CTA text]
- Visual approach: [Image style preferences]
- Category organization: [How offers are grouped]
- Common differentiators: [How similar offers position themselves]
```

### If Not Found

```markdown
✗ NOT FOUND: [category] listicle examples

NEW RESEARCH NEEDED:
- Scrape and analyze 3-5 competitor listicles
- Extract copy patterns
- Save for future reuse
```

---

## Step 6: Scan Visual Guidelines

### Location
`resource-library/visual-guidelines/`

### Files to Check

**Audience-Specific Guidelines:**
- Look for: `[audience]-imagery.md`
- Example: `seniors-imagery.md` ("befuddled" not "disgruntled")

**CTA Language Preferences:**
- Check: `cta-language-preferences.md` (Grammy-tested CTA hierarchy)

### What to Extract (If Found)

```markdown
✓ FOUND: seniors-imagery.md

REUSABLE GUIDELINES:
- Model selection: "Befuddled/overwhelmed" NOT "disgruntled/ornery"
- Emotion to convey: "I could use some help" NOT "There's something wrong"

✓ FOUND: cta-language-preferences.md

PREFERRED CTAs:
- Tier 1: "Learn More" (Grammy feedback: "MUCH BETTER")
- Avoid: "Transform", "Get Ready to Transform" (confusing, pushy)
```

---

## Step 7: Calculate Time Savings

For each reusable resource, estimate time saved:

**Category Research:**
- If found: ~5-8 minutes saved (competitive analysis, market data)
- If not found: ~10-15 minutes needed

**Compliance Rules:**
- If found: ~3-5 minutes saved (research + template creation)
- If not found: ~5-10 minutes needed (regulatory research)

**Consumer Psychology:**
- If found: ~5-7 minutes saved (psychology research, pain point validation)
- If not found: ~8-12 minutes needed

**Listicle Examples:**
- If found: ~3-5 minutes saved per example (scraping + analysis)
- If not found: ~5-8 minutes per example needed

**Visual Guidelines:**
- If found: ~2-3 minutes saved (image research, A/B test data)
- If not found: ~5-7 minutes needed

### Example Calculation

```markdown
RESOURCE REUSE ANALYSIS:

✓ Reusing:
- seniors-financial-psychology.md → 7 minutes saved
- financial-compliance.md → 5 minutes saved
- seniors-imagery.md → 3 minutes saved
- cta-language-preferences.md → 2 minutes saved

Total time saved: ~17 minutes

✗ New research needed:
- Brand-specific differentiator analysis → 5 minutes
- 2025 compliance rule verification → 3 minutes
- Competitor positioning (this specific brand) → 7 minutes

Total new research time: ~15 minutes

NET: With library reuse, research phase takes 15 minutes instead of 32 minutes (53% faster)
```

---

## Step 8: Identify Research Gaps

Compare what's in library vs. what's needed for comprehensive brief.

### Required for Complete Brief

From `references/brief-template.md`, the brief requires:

1. **Competitive Landscape** (5 competitors analyzed)
2. **Industry Data** (market size, consumer behavior, benchmarks)
3. **Consumer Psychology** (pain points, motivators, objections, decision triggers)
4. **Compliance** (required disclosures, prohibited claims, regulatory bodies)
5. **Positioning Strategy** (unique angles, differentiation, messaging)
6. **Preliminary Answers** to Layer 1's 50 questions

### Gap Analysis Template

```markdown
## RESEARCH GAPS

### High Confidence (Library has complete coverage)
- ✅ [Topic]: Covered by [resource file]
- ✅ [Topic]: Covered by [resource file]

### Medium Confidence (Library has partial coverage)
- ⚠️ [Topic]: Partial coverage in [resource file], needs [specific update]
- ⚠️ [Topic]: General data exists, brand-specific angle missing

### Low Confidence (Library has no coverage)
- ❌ [Topic]: No existing research, new investigation required
- ❌ [Topic]: Category not yet researched

### New Research Priority

**High Priority (Critical for Brief):**
1. [Gap #1] - Estimated time: [X minutes]
2. [Gap #2] - Estimated time: [X minutes]

**Medium Priority (Improves Brief Quality):**
3. [Gap #3] - Estimated time: [X minutes]

**Low Priority (Nice to Have):**
4. [Gap #4] - Estimated time: [X minutes]
```

---

## Step 9: Date Validation

Check if library resources are current or need updating.

### Freshness Thresholds

**Compliance Rules:**
- **Critical if:** >6 months old (regulations change)
- **Action:** Re-verify current rules before relying on file

**Category Research:**
- **Critical if:** >6 months old (market shifts, new competitors)
- **Action:** Validate key statistics still accurate

**Consumer Psychology:**
- **Generally stable:** Can reuse for 1-2 years
- **Exception:** Major economic/social shifts (pandemic, recession, etc.)

**Listicle Examples:**
- **Critical if:** >3 months old (copy trends shift quickly)
- **Action:** Pull fresh examples to validate patterns still apply

**Visual Guidelines:**
- **Generally stable:** Reuse for 1-2 years unless A/B test data suggests change

### Date Check Template

```markdown
## FRESHNESS CHECK

✓ CURRENT (Safe to Reuse):
- financial-compliance.md (updated 1 month ago)
- seniors-financial-psychology.md (updated 2 months ago, no major shifts)

⚠️ VALIDATE BEFORE USE:
- debt-relief-research.md (updated 7 months ago - check competitor landscape)

❌ OUTDATED (Do Not Reuse):
- debt-relief-examples.md (updated 14 months ago - copy trends shifted)
```

---

## Step 10: Prepare Checkpoint #2 Presentation

Structure findings for user approval.

### Template

```markdown
CHECKPOINT #2: RESEARCH PLAN

Based on resource library check and material analysis:

---

## REUSABLE RESEARCH (From Library)

### ✅ Category Research
- **File:** [filename]
- **Updated:** [date]
- **Coverage:** [What it includes]
- **Time Saved:** ~[X] minutes

### ✅ Compliance Rules
- **File:** [filename]
- **Updated:** [date]
- **Coverage:** [Prohibited claims, required disclosures, etc.]
- **Time Saved:** ~[X] minutes

### ✅ Consumer Psychology
- **File:** [filename]
- **Updated:** [date]
- **Coverage:** [Pain points, motivators, decision patterns]
- **Time Saved:** ~[X] minutes

### ✅ Listicle Examples
- **File:** [filename]
- **Updated:** [date]
- **Coverage:** [Copy patterns, CTA language, structure]
- **Time Saved:** ~[X] minutes

### ✅ Visual Guidelines
- **Files:** [filename(s)]
- **Coverage:** [Image approach, CTA preferences]
- **Time Saved:** ~[X] minutes

**Total Reuse Time Savings:** ~[XX] minutes

---

## NEW RESEARCH NEEDED (Gaps)

### 🔍 Research Track 1: Competitive Analysis
- **What:** [Specific competitors or positioning angles]
- **Why:** [Gap in library - new brand, fresh examples, etc.]
- **Sources:** [Where we'll research]
- **Time:** ~[X] minutes

### 🔍 Research Track 2: Industry Data
- **What:** [Specific data points or statistics]
- **Why:** [Not in library or needs validation]
- **Sources:** [Industry reports, news, etc.]
- **Time:** ~[X] minutes

### 🔍 Research Track 3: Consumer Psychology
- **What:** [Specific psychological insights]
- **Why:** [New audience segment or unique situation]
- **Sources:** [Psychology research, forums, reviews]
- **Time:** ~[X] minutes

### 🔍 Research Track 4: Compliance
- **What:** [Specific regulatory check]
- **Why:** [Rule validation, new category, etc.]
- **Sources:** [FTC, CFPB, state regulators]
- **Time:** ~[X] minutes

**Total New Research Time:** ~[XX] minutes

---

## TOTAL ESTIMATED TIME

- Reusable research: [X] minutes saved
- New research: [Y] minutes needed
- **Net research time:** [Y] minutes (vs [X+Y] without library)
- **Time savings:** [X/(X+Y) * 100]%

---

## RESEARCH STRATEGY

1. **Parallel Execution:** All 4 research tracks run simultaneously
2. **Priority:** Focus on high-priority gaps first
3. **Validation:** Re-verify any library resources >6 months old
4. **Savings:** All new findings saved back to library for future use

---

**Approve this research plan?**
- "Yes" - Proceed with research
- "Also research: [additional item]" - Add to plan
- "Skip: [item]" - Remove from plan
```

---

## Edge Cases

### Case 1: Empty Library (First Run)

**Symptom:** No resources found in any category

**Action:**
- Inform user this is first run for this category
- Emphasize future runs will be much faster
- Conduct comprehensive research across all 4 tracks
- Save everything to library

**Message:**
```
This is the first [category] offer I've analyzed. The resource library is empty for this category.

I'll conduct comprehensive research (estimated ~25-30 minutes) to build a complete knowledge base. Future [category] offers will be much faster as I'll reuse this research.

Research plan: [Full 4-track breakdown]

Proceed?
```

---

### Case 2: Outdated Resources

**Symptom:** Resources exist but are >6 months old

**Action:**
- Flag for validation
- Conduct fresh research to verify
- Update library files with new data
- Show comparison (what changed vs what stayed the same)

**Message:**
```
RESOURCE CHECK:
✓ Found: debt-relief-research.md (updated 8 months ago)

⚠️ VALIDATION NEEDED: Market may have shifted in 8 months

PLAN:
1. Reuse stable elements (pain points, psychology patterns)
2. Refresh competitive landscape (check for new players)
3. Validate statistics (debt levels, success rates)
4. Update file with 2025 data

This approach saves ~10 minutes while ensuring accuracy.

Proceed?
```

---

### Case 3: Partial Match

**Symptom:** Library has broader category but not specific offer type

**Action:**
- Use broader category as baseline
- Conduct targeted research for specific differences
- Create new offer-type file for future reuse

**Example:**
```
FOUND: home-services-research.md (general)
NOT FOUND: solar-installation-research.md (specific)

PLAN:
1. Reuse home-services psychology, visual guidelines
2. NEW research: Solar-specific competitive landscape
3. NEW research: Solar industry data (savings claims, payback periods)
4. NEW research: Solar compliance (state-specific rules)
5. Save solar-specific findings as new file

Estimated time: 15 minutes (vs 25 without home-services baseline)

Proceed?
```

---

## Quality Checklist

Before presenting Checkpoint #2, verify:

- [ ] All 5 resource library folders checked (category-research, compliance-rules, consumer-psychology, listicle-examples, visual-guidelines)
- [ ] Date validation performed (flag anything >6 months for compliance, >3 months for examples)
- [ ] Time savings calculated and communicated
- [ ] Research gaps clearly identified with priorities
- [ ] New research strategy specified (sources, time estimates)
- [ ] User-friendly presentation (not overwhelming with details)
- [ ] Clear approval question at end

---

## Output Format

**Checkpoint #2 ready to present to user with:**
1. List of reusable resources (files, dates, coverage, time saved)
2. List of research gaps (what's missing, why needed, how long)
3. Total time estimate (with vs without library)
4. Research strategy (4 parallel tracks)
5. Approval question

**User can respond:**
- "Yes" → Proceed to research execution
- "Also research: [item]" → Add to plan, recalculate time
- "Skip: [item]" → Remove from plan
- "More detail on: [item]" → Explain specific research track

---

**This workflow ensures maximum reuse of existing knowledge while transparently showing what new research is required.**
