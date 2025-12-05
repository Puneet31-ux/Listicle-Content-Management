# Brief Generation Workflow

**Purpose:** Synthesize all material analysis and research findings into a comprehensive, structured offer brief that feeds Layer 1 and Layer 2.

**Input:** Material analysis results + research findings from 4 tracks
**Output:** Complete offer brief ready for Checkpoint #3 presentation
**Uses Template:** `references/brief-template.md`

---

## Overview

The brief is the **critical handoff document** between Layer 0 and the automated pipeline (Layer 1 → Layer 2). It must:

1. **Pre-answer all 50 Layer 1 discovery questions** with research-backed responses
2. **Provide Layer 2** with comprehensive offer intelligence for copy generation
3. **Include confidence assessments** (high/medium/low) for transparency
4. **Flag compliance concerns** explicitly
5. **Recommend copy strategies** based on research findings

**Quality Standard:** The brief should be so comprehensive that Layer 1 and Layer 2 require minimal additional research.

---

## Step 1: Compile Source Materials

Before generating the brief, gather all inputs:

### From Material Analysis (Phase 1)
- Offer LP analysis (value prop, mechanism, costs, eligibility)
- Target audience determination
- Unique differentiators
- CTA patterns from examples
- Positioning angle

### From Resource Library Check (Phase 2)
- Reusable category research
- Compliance rules
- Psychology patterns
- Listicle examples analysis
- Visual guidelines

### From New Research (Phase 3)
- Competitive analysis findings
- Industry data and statistics
- Consumer psychology insights
- Compliance verification

---

## Step 2: Map to Brief Template Structure

Use `references/brief-template.md` as skeleton. Fill each section systematically.

### Section 1: Offer Overview

**Sources to Pull From:**
- Material analysis → Offer LP extraction
- Competitive research → Market positioning
- Compliance research → Cost structure verification

**What to Include:**

```markdown
## OFFER OVERVIEW

### Classification
- **Category:** [Financial / Home Services / Health / Tech / Education / Automotive]
- **Offer Type:** [Specific within category - e.g., "Debt Settlement"]
- **Mechanism:** [How it works - 1-2 sentences from LP analysis]
- **Landing Page:** [URL provided by user]
- **Provider:** [Brand name or "Multiple providers" if category-level]

### Value Proposition
[1-2 sentence summary with SPECIFIC numbers if available]

Example: "Reduce unsecured debt by 30-50% through creditor negotiation, becoming debt-free in 24-48 months without bankruptcy."

### Cost Structure
[Pricing model, fees, payment terms from LP analysis]

Example: "Percentage-based fees (15-25% of enrolled debt), charged only after successful settlement. No upfront costs."

### Eligibility Requirements
**Minimum:**
- [Requirement 1 from LP]
- [Requirement 2 from LP]

**Disqualifiers:**
- [What makes someone ineligible]
```

**Synthesis Approach:**
- Extract exact numbers from LP analysis
- Validate cost structure against compliance rules (any fee restrictions?)
- Cross-reference eligibility with competitive analysis (is this standard or unique?)

---

### Section 2: Target Audience

**Sources to Pull From:**
- Material analysis → Audience determination
- Consumer psychology research → Pain points, motivators
- Category research → Demographics validation

**What to Include:**

```markdown
## TARGET AUDIENCE

### Primary Persona
- **Age:** [Range from analysis]
- **Income:** [Level/source from LP or research]
- **Situation:** [Current state - SPECIFIC]
- **Pain Point:** [Primary painful situation NOW - from psychology research]
- **Desired Outcome:** [What they want to achieve - from LP]
- **Emotional State:** [How they feel about problem - from psychology research]
- **Decision Stage:** [Awareness / Consideration / Decision - from LP analysis]

### Secondary Persona (if applicable)
[Alternative target with different profile]

### Anti-Persona
[Who this is explicitly NOT for - helps avoid wasted targeting]
```

**Synthesis Approach:**
- Primary persona = intersection of LP signals + psychology research
- Pain point should be ACUTE (happening NOW, not theoretical)
- Emotional state critical for copy angle (fear, shame, hope, etc.)
- Anti-persona prevents wasted effort (e.g., "Not for secured debt" for debt settlement)

---

### Section 3: User-Provided Context

**Sources to Pull From:**
- Original user input (URLs, assets)
- Material analysis findings

**What to Include:**

```markdown
## USER-PROVIDED CONTEXT

### Source Materials Analyzed
- **Offer URL:** [link]
- **Example Listicles:** [link1], [link2]
- **Creative Assets:** [Description of provided assets]

### Keywords & Terms Identified
- [Keyword 1 from LP/examples]
- [Keyword 2]
- [Industry-specific terms]

### User-Specified Preferences
- [Any specific direction user provided]
- [Corrections made at checkpoints]
```

**Synthesis Approach:**
- List all materials actually analyzed (transparency)
- Extract industry terminology for Layer 2 to use
- Note any user corrections from Checkpoint #1 or #2

---

### Section 4: Research Findings

This is the **largest section** - synthesize all 4 research tracks.

#### 4A: Competitive Landscape

**Sources to Pull From:**
- Competitive analysis research
- Listicle examples analysis

**What to Include:**

```markdown
## RESEARCH FINDINGS

### Competitive Landscape

**Top Competitors Analyzed:**
1. **[Competitor 1]** - [Key positioning / URL if available]
2. **[Competitor 2]** - [Key positioning]
3. **[Competitor 3]** - [Key positioning]
4. **[Competitor 4]** - [Key positioning]
5. **[Competitor 5]** - [Key positioning]

**Competitive Insights:**
- **Common Positioning:** [How most competitors position this offer type]
- **CTA Patterns:** [Most used button/link text across competitors]
- **Information Density:** [Brief vs detailed approaches]
- **Trust Signals:** [What competitors use to build credibility]
- **Gaps/Opportunities:** [What competitors are missing that we can exploit]

**Example URLs Analyzed:**
- [Competitor listicle 1]
- [Competitor ad example 1]
- [Additional examples]

**Saved to Library:**
✓ [Filename in resource-library] (for future reuse)
```

**Synthesis Approach:**
- Minimum 3-5 competitors for credible analysis
- Look for PATTERNS across competitors (not just individual tactics)
- Identify gaps = differentiation opportunities
- Save analysis for future reuse in library

---

#### 4B: Industry Data & Market Context

**Sources to Pull From:**
- Industry data research
- Category research from library

**What to Include:**

```markdown
### Industry Data & Market Context

**Market Size:**
- [Number of potential customers, market value, growth rate]
- Source: [Citation]

**Consumer Behavior:**
- [How target audience researches this category]
- [Decision-making timeline]
- [Typical objections or barriers]
- Source: [Citation]

**Success Benchmarks:**
- Industry average [metric]: [value]
- Typical conversion rate: [X%]
- Customer satisfaction: [rating/percentage]
- Source: [Citation]

**Relevant Statistics:**
1. [Statistic with specific number] - Source: [Citation]
2. [Statistic with specific number] - Source: [Citation]
3. [Statistic with specific number] - Source: [Citation]

**Saved to Library:**
✓ [Filename in resource-library]
```

**Synthesis Approach:**
- Prioritize statistics with specific numbers (credibility)
- Always cite sources (Layer 2 may reference in copy)
- Consumer behavior insights = how to structure copy journey
- Benchmarks help set realistic expectations

---

#### 4C: Consumer Psychology Insights

**Sources to Pull From:**
- Consumer psychology research
- Psychology patterns from library (e.g., Grammy Notes)

**What to Include:**

```markdown
### Consumer Psychology Insights

**Primary Pain Points (Research-Validated):**
1. **[Pain Point 1]:** [Description with emotional impact]
   - Evidence: [Research source or pattern observed]

2. **[Pain Point 2]:** [Description with emotional impact]
   - Evidence: [Research source]

3. **[Pain Point 3]:** [Description with emotional impact]
   - Evidence: [Research source]

**Key Motivators:**
- [What drives people to act - psychological triggers]
- [Aspirational states they're seeking]

**Common Objections:**
1. [Objection 1] - How to address: [Strategy]
2. [Objection 2] - How to address: [Strategy]
3. [Objection 3] - How to address: [Strategy]

**Decision Triggers:**
- [What causes people to act NOW vs later]
- [Urgency factors (if authentic)]

**Cognitive Biases to Leverage (Ethically):**
- [Loss aversion / Social proof / Authority / etc.]
- Application: [How to use in copy]

**Saved to Library:**
✓ [Filename in resource-library]
```

**Synthesis Approach:**
- Pain points should be SPECIFIC not generic ("collection calls at 3am" not "stress")
- Evidence-based (not assumptions)
- Objections + how to address = critical for Layer 2 copy strategy
- Cognitive biases must be ethical (no manipulation)

---

#### 4D: Compliance & Regulatory

**Sources to Pull From:**
- Compliance research
- Compliance rules from library

**What to Include:**

```markdown
### Compliance & Regulatory

**Required Disclaimers:**
- [Disclaimer 1 - exact text or template]
- [Disclaimer 2]
- [Where to place them]

**Prohibited Claims:**
- ❌ [Cannot claim X]
- ❌ [Cannot guarantee Y]
- ❌ [Cannot promise Z]

**Ethical Boundaries:**
- [Industry best practices]
- [What to avoid even if technically legal]

**Regulatory Bodies:**
- [FTC / SEC / CMS / State regulators - which apply]

**Saved to Library:**
✓ [Filename in resource-library] (if new rules discovered)
```

**Synthesis Approach:**
- Specific > vague (exact prohibited claim language)
- Include disclaimer templates Layer 2 can copy-paste
- Flag ethical boundaries beyond legal minimums
- Identify applicable regulatory bodies for context

---

### Section 5: Positioning Strategy

**Sources to Pull From:**
- Competitive analysis (gaps = opportunities)
- Psychology research (what motivates action)
- Material analysis (unique differentiators)

**What to Include:**

```markdown
## POSITIONING STRATEGY

### Recommended Approach

**Primary Angle:**
[Pain-focused / Aspiration-focused / Logic-driven / Trust-based]

**Rationale:**
[Why this approach based on research - 2-3 sentences]

**Key Messages:**
1. [Core message 1]
2. [Core message 2]
3. [Core message 3]

### Differentiation Strategy

**Unique Selling Points:**
1. [USP 1 - specific to this offer]
2. [USP 2]
3. [USP 3]

**Competitive Positioning:**
[How to position vs competitors - premium/budget/innovative/reliable/etc.]
```

**Synthesis Approach:**
- Primary angle based on psychology research (what resonates)
- Rationale shows reasoning (not arbitrary)
- USPs from material analysis (what's actually unique about this offer)
- Positioning considers competitive landscape (gaps to exploit)

---

### Section 6: Preliminary Answers to Layer 1 Questions

This is **CRITICAL** - pre-populate all 50 discovery questions from analyze-listicle-offers.

**Sources to Pull From:**
- All previous brief sections
- Cross-reference with analyze-listicle-offers/workflows/analyze-financial-offers.md

**Structure:**

```markdown
## PRELIMINARY ANSWERS TO LAYER 1 QUESTIONS

### Core Offer Mechanics (Q1-4)

**Q1: What is the specific financial/functional benefit with numbers?**
[Answer from Offer Overview value prop]

**Q2: Who exactly qualifies and who doesn't?**
[Answer from Eligibility Requirements]

**Q3: What's the actual process from click to benefit?**
[Answer from Mechanism + LP analysis]

**Q4: What are all costs, fees, and financial commitments?**
[Answer from Cost Structure]

---

### Reader Psychology & Pain Points (Q5-12)

**Q5: What is the #1 most painful thing happening to them RIGHT NOW?**
[Answer from Consumer Psychology - Primary Pain Point #1]

**Q6: What emotions drive their search for this solution?**
[Answer from Consumer Psychology - Emotional State]

**Q7: What makes them skeptical or think "too good to be true"?**
[Answer from Consumer Psychology - Common Objections]

**Q8: What does life look like after their problem is solved?**
[Answer from Target Audience - Desired Outcome]

**Q9: How does using this offer affect their self-image?**
[Answer from Consumer Psychology - Identity considerations]

**Q10: What social proof would convince them this works?**
[Answer from Competitive Analysis - Trust Signals]

**Q11: What feels risky or scary about taking action?**
[Answer from Consumer Psychology - Risk perception]

**Q12: What specific situation would trigger them to act NOW?**
[Answer from Consumer Psychology - Decision Triggers]

---

### CTA & Engagement Mechanics (Q13-18)

**Q13: What specific details should we ask to trigger self-reflection?**
[Answer from LP analysis - CTA patterns]

**Q14: What is the user actually DOING when they click the CTA?**
[Answer from LP analysis - conversion action]

**Q15: What fears need to be removed to reduce risk?**
[Answer from Consumer Psychology - Objections]

**Q16: Is there authentic urgency? If so, what creates it?**
[Answer from Industry Data - seasonal factors, enrollment periods, etc.]

**Q17: What interactive elements would engage this audience?**
[Answer from Listicle Examples - CTA patterns observed]

**Q18: What mobile experience considerations matter?**
[Answer from Target Audience - tech savviness, usage patterns]

---

### Information Balance (Q19-22)

**Q19: What MUST they know upfront to make an informed decision?**
[Answer from Compliance - Required Disclosures]

**Q20: What info is better saved for the landing page?**
[Answer from Material Analysis - LP detail level]

**Q21: Where should we filter out unqualified users?**
[Answer from Eligibility Requirements]

**Q22: How much detail is too much for this audience?**
[Answer from Listicle Examples - Information Density patterns]

---

### Reader Personas (Q23-26)

**Q23: Detailed primary persona profile**
[Answer from Target Audience - Primary Persona]

**Q24: Secondary persona (if applicable)**
[Answer from Target Audience - Secondary Persona]

**Q25: Anti-persona (who to NOT target)**
[Answer from Target Audience - Anti-Persona]

**Q26: How does life stage affect their needs?**
[Answer from Consumer Psychology - Life stage considerations]

---

### Conversion Pathway (Q27-30)

**Q27: What expectation does the listicle set that the LP must deliver?**
[Answer from Material Analysis - LP vs Example alignment]

**Q28: What MUST the landing page have to convert?**
[Answer from Competitive Analysis - Essential LP elements]

**Q29: What actions indicate conversion success?**
[Answer from LP analysis - Form fill, call, app download, etc.]

**Q30: Where might users drop off and how to prevent it?**
[Answer from Consumer Psychology - Objections + barriers]
```

**Synthesis Approach:**
- Every answer should reference specific research findings
- No vague answers (e.g., not "varies" but specific scenarios)
- Cross-reference ensures consistency (e.g., Q5 pain point = Q8 desired outcome flip side)
- Flag any questions with LOW confidence explicitly

---

### Section 7: Confidence Assessment

**Sources to Pull From:**
- Data quality from research
- Number of sources corroborating findings
- Age of library resources

**What to Include:**

```markdown
## CONFIDENCE ASSESSMENT

### High Confidence Areas (Validated Across Multiple Sources)
- ✅ [Area 1]: [Why high confidence - e.g., "Validated across 5 competitors + industry report"]
- ✅ [Area 2]: [Why high confidence]
- ✅ [Area 3]: [Why high confidence]

### Medium Confidence Areas (Some Data, Needs Validation)
- ⚠️ [Area 1]: [What's uncertain - how to validate]
- ⚠️ [Area 2]: [What's uncertain]

### Low Confidence / Flagged for Review
- ⚠️ [Area 1]: [Gaps in data - user input needed]
- ⚠️ [Area 2]: [Contradictory information - needs clarification]
```

**Synthesis Approach:**
- **High confidence:** 3+ sources agree, recent data, validated patterns
- **Medium confidence:** 1-2 sources, logical inference, needs A/B test
- **Low confidence:** Assumption, contradictory data, or pure speculation
- Always be transparent (never hide uncertainty)

---

### Section 8: Recommendations for Copy

**Sources to Pull From:**
- Positioning Strategy
- Consumer Psychology
- Competitive Analysis (gaps)

**What to Include:**

```markdown
## RECOMMENDATIONS FOR COPY

### Lead Strategy
**Primary Hook:**
[Pain / Aspiration / Logic / Social Proof - which to lead with and why]

**Example Opening:**
"[Draft opening line based on research]"

### Key Emphasis Points
1. **[Point 1]:** [Why emphasize this - what research supports it]
2. **[Point 2]:** [Why emphasize - research support]
3. **[Point 3]:** [Why emphasize - research support]

### CTA Recommendations
**Primary CTA:** "[Exact button text]"
- Rationale: [Why this language based on audience research]

**Secondary CTA:** "[Alternative]"
- Use case: [When to use this version]

### Trust Signal Priority
1. [Trust signal 1 - most important for this audience]
2. [Trust signal 2]
3. [Trust signal 3]

### Information Density
**Recommended length:** [X-Y words]
- Rationale: [Based on example analysis and audience preference]
```

**Synthesis Approach:**
- Lead strategy = psychology research (what motivates)
- Emphasis points = competitive gaps + USPs
- CTA language = visual guidelines + example analysis
- Trust signals = psychology research + compliance requirements

---

### Section 9: Compliance Alerts

**Sources to Pull From:**
- Compliance research

**What to Include:**

```markdown
## COMPLIANCE ALERTS

### Must Include
- ⚠️ [Required disclaimer 1]
- ⚠️ [Required disclosure 2]
- ⚠️ [Risk statement 3]

### Must NOT Claim
- ❌ [Prohibited claim 1]
- ❌ [Prohibited claim 2]
- ❌ [Prohibited claim 3]

### Review Recommended
- ⚠️ [Gray area 1 - suggest legal review]
- ⚠️ [Gray area 2]
```

**Synthesis Approach:**
- Pull directly from compliance research
- Use exact language (Layer 2 can copy-paste)
- Flag gray areas proactively (protect user)

---

### Section 10: Testing Recommendations

**Sources to Pull From:**
- Positioning Strategy (multiple valid angles)
- Consumer Psychology (different motivators)

**What to Include:**

```markdown
## TESTING RECOMMENDATIONS

### Variations to Test
1. **[Variation 1 Name]:** [Approach - e.g., "Pain-Focused"]
   - Tests: [Hypothesis this tests]
   - Expected to win with: [Persona/situation]

2. **[Variation 2 Name]:** [Approach]
   - Tests: [Hypothesis]
   - Expected to win with: [Persona/situation]

3. **[Variation 3 Name]:** [Approach]
   - Tests: [Hypothesis]
   - Expected to win with: [Persona/situation]

### Metrics to Track
- **Primary:** [CTR / Conversion Rate / etc.]
- **Secondary:** [Time on page / Interaction rate / etc.]
- **Learning:** [What we'll learn from each metric]

### Iteration Guidance
- If [Variation X] wins → [What to try next]
- If [Variation Y] wins → [What to try next]
- If results are mixed → [How to interpret]
```

**Synthesis Approach:**
- Recommend 3-5 variations (Layer 2 will generate these)
- Each variation tests different psychological approach
- Metrics tied to business goals
- Iteration guidance shows strategic thinking

---

### Section 11: Metadata

**Sources to Pull From:**
- All research conducted

**What to Include:**

```markdown
## METADATA

### Research Sources
- [Source 1 - URL or publication]
- [Source 2]
- [Source 3]

### Research Conducted
- **Competitive analysis:** [X competitors, Y examples analyzed]
- **Industry data:** [Z sources consulted]
- **Consumer psychology:** [N studies/insights referenced]
- **Compliance:** [Regulations reviewed]

### Saved to Resource Library
- ✓ [Filename 1] → `resource-library/[category]/[filename]`
- ✓ [Filename 2] → `resource-library/[category]/[filename]`
- ✓ [Filename 3] → `resource-library/[category]/[filename]`

### Time Savings (Future Runs)
- Reusable research: ~[X] minutes saved on next [category] offer
- Library assets: [List what can be reused]
```

**Synthesis Approach:**
- Cite ALL sources (transparency + Layer 2 may reference)
- Quantify research scope (shows thoroughness)
- Document library savings for next run

---

## Step 3: Quality Assurance

Before presenting brief at Checkpoint #3, verify:

### Completeness Check
- [ ] All 11 sections filled (Offer Overview → Metadata)
- [ ] All 50 Layer 1 questions pre-answered
- [ ] Confidence assessment provided for each major area
- [ ] Compliance alerts explicit and actionable
- [ ] Copy recommendations specific (not vague)

### Consistency Check
- [ ] Target audience pain point (Section 2) matches Q5 answer
- [ ] Value proposition (Section 1) matches Q1 answer
- [ ] Cost structure (Section 1) matches Q4 answer
- [ ] Positioning strategy (Section 5) aligns with psychology insights (Section 4C)
- [ ] CTA recommendations (Section 8) match visual guidelines

### Specificity Check
- [ ] No vague numbers (not "many" but "73%", not "most" but "8 out of 10")
- [ ] No generic pain points ("stress" → "collection calls at 3am waking household")
- [ ] No placeholder text ([FILL IN] should be replaced)
- [ ] All "e.g." examples replaced with actual research findings

### Evidence Check
- [ ] Every claim has source citation
- [ ] Psychology insights backed by research (not assumptions)
- [ ] Competitive analysis based on actual examples (URLs listed)
- [ ] Statistics have sources (industry reports, studies, etc.)

### Actionability Check
- [ ] Layer 1 can use pre-answered questions without additional research
- [ ] Layer 2 has clear copy direction (lead strategy, emphasis, CTAs)
- [ ] Compliance alerts are copy-paste ready
- [ ] Testing recommendations specify exact variations

---

## Step 4: Prepare Checkpoint #3 Presentation

Format the brief for user review.

### Presentation Template

```markdown
CHECKPOINT #3: OFFER BRIEF COMPLETE

I've completed comprehensive research and generated your offer intelligence brief. Here's a summary:

---

## BRIEF SUMMARY

**Offer:** [Name/Type]
**Category:** [Category]
**Target Audience:** [Age range, situation]
**Primary Pain Point:** [Specific pain]
**Unique Angle:** [Key differentiator]

---

## RESEARCH SCOPE

**Competitive Analysis:**
- [X] competitors analyzed
- [Y] listicle examples reviewed
- Positioning opportunities identified: [List 2-3]

**Industry Data:**
- [Z] sources consulted
- Key statistics: [List 2-3 most relevant]

**Consumer Psychology:**
- [N] pain points validated
- [M] objections identified with counter-strategies
- Decision triggers mapped

**Compliance:**
- [Regulatory body] rules verified
- [X] required disclaimers identified
- [Y] prohibited claims flagged

---

## CONFIDENCE ASSESSMENT

### ✅ HIGH CONFIDENCE
- [Area 1] - [Why]
- [Area 2] - [Why]
- [Area 3] - [Why]

### ⚠️ MEDIUM CONFIDENCE
- [Area 1] - [What's uncertain]

### ⚠️ LOW CONFIDENCE / FLAGGED
- [Area 1] - [Gap or assumption]

---

## COPY RECOMMENDATIONS

**Lead Strategy:** [Pain/Aspiration/Logic/Trust] - [Why based on research]

**Primary CTA:** "[Exact text]" - [Rationale]

**Key Emphasis:**
1. [Point 1] - [Why]
2. [Point 2] - [Why]
3. [Point 3] - [Why]

**Information Density:** [X-Y] words (based on [audience] preference)

---

## COMPLIANCE ALERTS

### ⚠️ MUST INCLUDE
- [Required disclaimer 1]
- [Required disclosure 2]

### ❌ MUST NOT CLAIM
- [Prohibited claim 1]
- [Prohibited claim 2]

[Gray areas flagged for review if applicable]

---

## TESTING STRATEGY

Recommend testing [X] variations:
1. **[Variation 1]:** [Approach] - Tests [hypothesis]
2. **[Variation 2]:** [Approach] - Tests [hypothesis]
3. **[Variation 3]:** [Approach] - Tests [hypothesis]

Expected winner: [Variation X] based on [research insight]

---

## NEXT STEPS

If you approve this brief, I will AUTOMATICALLY:

1. ✅ Invoke Layer 1 (analyze-listicle-offers)
   - Pre-populate all 50 questions with answers from this brief
   - Generate complete Q&A analysis

2. ✅ Invoke Layer 2 (write-listicle-copy)
   - Pass this brief + Layer 1 Q&A as context
   - Layer 2 conducts its own additional research
   - Generate [X] copy variations

3. ✅ Deliver FINISHED COPY to you
   - All variations ready to use
   - Testing recommendations
   - Compliance disclaimers
   - Landing page alignment notes

**You will receive publishable listicle copy - no manual layer runs needed.**

---

**Review the full brief?** (I can share the complete document)

**Or proceed to copy generation?**
- "Proceed" - Auto-run Layer 1 & 2
- "Change: [specific edit]" - Update brief first
- "Show full brief" - See complete document
```

---

## Step 5: Handle User Feedback

### User Says "Proceed"
→ Move to `workflows/layer-integration.md`
→ Auto-invoke Layer 1 and Layer 2
→ Deliver final copy

### User Says "Change: [X]"
→ Edit specified section of brief
→ Re-present Checkpoint #3 with changes highlighted
→ Wait for approval

### User Says "Show full brief"
→ Present complete brief document (all 11 sections)
→ Allow detailed review
→ Accept section-specific edits

### User Says "More research on: [X]"
→ Conduct additional targeted research
→ Update relevant brief sections
→ Re-present Checkpoint #3

---

## Edge Cases

### Case 1: Conflicting Research Findings

**Symptom:** Different sources contradict each other

**Action:**
- Flag explicitly in confidence assessment
- Present both perspectives in brief
- Note which is more credible (source quality, recency)
- Recommend A/B testing both approaches

**Example:**
```
⚠️ MEDIUM CONFIDENCE: Primary Pain Point

FINDING A: Industry report suggests "high interest rates" is primary pain
FINDING B: Grammy Notes research shows "monthly payment amount" more acute

RECOMMENDATION: Test both angles. Grammy Notes (primary research) may be more accurate than industry survey (secondary research).
```

---

### Case 2: Missing Critical Information

**Symptom:** User-provided LP lacks key details (e.g., no cost structure)

**Action:**
- Flag gap explicitly
- Make educated inference if possible (mark as LOW confidence)
- Note assumption in brief
- Recommend user validation

**Example:**
```
⚠️ LOW CONFIDENCE: Cost Structure

Landing page does not disclose fees. Based on competitive analysis, similar offers charge [X-Y%].

ASSUMPTION: Assuming similar fee structure.

ACTION REQUIRED: User should validate actual fee structure before copy generation.
```

---

### Case 3: High-Risk Compliance Category

**Symptom:** Heavily regulated category (healthcare, finance, legal)

**Action:**
- Expand compliance section significantly
- Flag for legal review proactively
- Include conservative recommendations
- Provide multiple disclaimer options

**Example:**
```
⚠️ HIGH-RISK COMPLIANCE CATEGORY: Medicare Supplement

REGULATORY BODIES:
- CMS (Medicare marketing rules)
- State insurance departments

⚠️ LEGAL REVIEW RECOMMENDED before publishing any copy

CONSERVATIVE APPROACH:
- Avoid all guarantee language
- Include CMS-mandated disclaimer on every page
- Link to Medicare.gov for full plan comparison
```

---

## Quality Checklist (Final)

Before presenting Checkpoint #3:

- [ ] Brief uses template structure (all 11 sections)
- [ ] All 50 Layer 1 questions pre-answered
- [ ] Every claim has source citation
- [ ] Confidence levels explicitly marked (high/medium/low)
- [ ] Compliance alerts actionable (exact disclaimers provided)
- [ ] Copy recommendations specific (not vague)
- [ ] Consistency verified (pain point = desired outcome flip side)
- [ ] No placeholder text ([FILL IN] replaced)
- [ ] No generic language ("stress" → specific scenario)
- [ ] Testing strategy includes 3-5 variations
- [ ] Metadata complete (sources, library saves, time savings)
- [ ] User-friendly summary prepared for Checkpoint #3
- [ ] Next steps clearly explained (auto-invocation)

---

## Output

**Checkpoint #3 ready to present with:**
1. User-friendly summary (not overwhelming)
2. Confidence assessment (transparent about gaps)
3. Clear copy direction (Layer 2 has what it needs)
4. Compliance alerts (protect user from violations)
5. Next steps (automatic Layer 1 & 2 execution)
6. Approval question

**Complete brief saved as:**
`[working-directory]/OFFER-BRIEF-[offer-name]-[date].md`

**User can respond:**
- "Proceed" → Auto-run pipeline
- "Change: [edit]" → Update brief
- "Show full brief" → Review complete document
- "More research: [topic]" → Additional investigation

---

**This brief is the foundation of automated copy generation. Quality here determines quality of final output.**
