# Compliance & Regulatory Research Workflow

**Purpose:** Identify required disclosures, prohibited claims, and regulatory constraints to ensure copy is compliant and protects user from violations

**Input:** Offer category, offer type from material analysis
**Output:** Compliance requirements for offer brief
**Saves to:** `resource-library/compliance-rules/[category]-compliance.md`

---

## Overview

Compliance research serves four purposes:

1. **Risk Mitigation:** Identify what cannot be claimed to avoid FTC/regulatory violations
2. **Required Disclosures:** Determine what must be included (disclaimers, warnings)
3. **Ethical Boundaries:** Establish guidelines beyond legal minimums
4. **Copy Constraints:** Set guardrails for Layer 2 copy generation

**Critical Principle:** When in doubt, be MORE conservative (over-compliance is safer than under-compliance)

---

## Step 1: Identify Applicable Regulatory Bodies

### By Category

```markdown
## Financial Offers
- **FTC** (Federal Trade Commission) - General advertising, anti-deception
- **CFPB** (Consumer Financial Protection Bureau) - Financial products
- **SEC** (Securities and Exchange Commission) - Investment products
- **FDIC** (Federal Deposit Insurance Corporation) - Banking products
- **State Regulators** - Varies by state, especially for lending

## Health/Medical Offers
- **FDA** (Food and Drug Administration) - Health claims
- **CMS** (Centers for Medicare & Medicaid Services) - Medicare/Medicaid marketing
- **FTC** - General advertising, supplement claims
- **State Insurance Departments** - Insurance products

## Home Services Offers
- **FTC** - General advertising, "Green Guides" for environmental claims
- **State Contractor Licensing Boards** - Licensed services
- **DOE** (Department of Energy) - Energy efficiency claims
- **EPA** (Environmental Protection Agency) - Environmental claims

## General (All Categories)
- **FTC** - Truth in advertising, testimonial guidelines, endorsement disclosures
- **State Attorneys General** - Consumer protection laws vary by state
```

---

### Determine Primary Regulator

For the specific offer being analyzed:

```markdown
## [Offer Name] Regulatory Jurisdiction

**Primary Regulator:** [FTC / CFPB / CMS / etc.]
**Reason:** [Why this regulator has jurisdiction]

**Secondary Regulators:** [Other applicable bodies]

**Specific Rules/Acts:**
- [Rule 1 - e.g., "FTC Telemarketing Sales Rule - Debt Relief Amendment"]
- [Rule 2 - e.g., "Truth in Lending Act (TILA)"]
- [Rule 3 - e.g., "CMS Medicare Marketing Guidelines"]
```

---

## Step 2: Research Category-Specific Regulations

### Search Strategy

**Primary Searches:**
```
- "FTC [category] advertising rules"
- "[category] compliance requirements"
- "[specific regulator] [offer type] regulations"
- "[category] prohibited claims FTC"

Examples:
- "FTC debt relief advertising rules"
- "solar installation compliance requirements"
- "CMS Medicare supplement marketing regulations"
- "financial services prohibited claims FTC"
```

**Preferred Sources (Tier 1 - Official):**
- ✅ Regulator official websites (.gov domains)
  - FTC.gov
  - CFPB.gov
  - CMS.gov
  - FDA.gov
- ✅ Official guidance documents
- ✅ Consent decrees (reveal violations to avoid)

**Secondary Sources (Tier 2 - Trusted):**
- ⚠️ Industry trade association compliance guides
- ⚠️ Law firm alerts (verify against primary source)
- ⚠️ Compliance software providers

---

### WebSearch Approach

```
WebSearch(
  query: "FTC [category] advertising rules site:ftc.gov",
  prompt: "Find official regulatory guidance on advertising [category]:
  - What claims are prohibited?
  - What disclosures are required?
  - What recent enforcement actions exist?
  - What are the penalties for violations?

  Focus on official .gov sources. Extract specific rule citations."
)
```

---

## Step 3: Identify Prohibited Claims

### Research Question Framework

For the specific offer category, research:

**Question 1: What guarantees are prohibited?**
- Can we guarantee results?
- Can we guarantee timeframes?
- Can we guarantee specific outcomes?

**Question 2: What superlatives are restricted?**
- Can we say "best"?
- Can we claim "#1"?
- Can we use "only" or "exclusive"?

**Question 3: What comparisons are regulated?**
- Can we name competitors?
- Can we make superiority claims?
- What substantiation is required?

**Question 4: What health/safety claims are restricted?**
- Medical claims (requires FDA approval)
- Safety claims (must have evidence)
- Risk minimization claims (may be prohibited)

---

### Data to Capture

```markdown
## PROHIBITED CLAIMS: [Category]

### Guarantees

❌ **Cannot Guarantee:**
1. **Specific Results**
   - Example: "We WILL reduce your debt by 50%"
   - Regulation: [FTC Debt Relief Rule, 16 CFR 310.4]
   - Why Prohibited: Results vary by individual circumstances

2. **Specific Timeframes**
   - Example: "Debt-free in 24 months guaranteed"
   - Regulation: [Citation]
   - Why Prohibited: Cannot control creditor negotiation timelines

3. **[Additional Guarantee Prohibition]**
   - Example: [Specific prohibited claim]
   - Regulation: [Citation]
   - Why Prohibited: [Reason]

---

### Superlatives & Absolutes

❌ **Restricted Language:**
1. **"Best" without substantiation**
   - Requires: Proof across all competitors in measurable criteria
   - Source: [FTC Advertising Substantiation]

2. **"Only" or "Exclusive" if false**
   - Must be literally true
   - Source: [FTC Deception Policy Statement]

3. **"FDA-Approved" if not literally true**
   - FDA approval applies to drugs/devices, not general products
   - Source: [FDA guidelines]

---

### Comparative Claims

❌ **Prohibited Comparisons:**
1. **Unsubstantiated superiority claims**
   - Example: "Better than [Competitor X]"
   - Requires: Head-to-head testing or documented proof
   - Source: [FTC Comparative Advertising rules]

2. **Misleading "vs." comparisons**
   - Example: Comparing premium version to competitor's basic version
   - Requires: Apples-to-apples comparison
   - Source: [FTC guidelines]

---

### Category-Specific Prohibitions

❌ **[Category]-Specific Restricted Claims:**
1. **[Claim 1]**
   - Regulation: [Citation]
   - Penalty for Violation: [Fine amount, cease & desist, etc.]

2. **[Claim 2]**
   - Regulation: [Citation]
   - Penalty: [Consequence]

[Continue for all category-specific prohibitions]

---

### Red Flag Words/Phrases

List of words that trigger compliance scrutiny:

**High Risk (Avoid Unless Provable):**
- ❌ Guaranteed
- ❌ Proven
- ❌ Scientifically proven
- ❌ Clinically proven
- ❌ FDA-approved (unless literally true)
- ❌ Government-backed (unless literally true)
- ❌ Risk-free
- ❌ 100% [anything absolute]

**Medium Risk (Use with Substantiation):**
- ⚠️ Best
- ⚠️ #1
- ⚠️ Leading
- ⚠️ Trusted by millions
- ⚠️ Doctor-recommended
- ⚠️ Award-winning

**Safe Alternatives:**
- ✅ May [result]
- ✅ Potential [outcome]
- ✅ Typical [result]
- ✅ In our experience
- ✅ Many customers report
```

---

## Step 4: Identify Required Disclosures

### Research Question Framework

**Question 1: What must be disclosed upfront?**
- Fees/costs
- Material limitations
- Risks or side effects
- Results variability

**Question 2: Where must disclosures appear?**
- Proximity to claim
- Font size requirements
- Prominence requirements

**Question 3: What is the exact language required?**
- Specific disclaimer text
- Cannot paraphrase in some cases

---

### Data to Capture

```markdown
## REQUIRED DISCLOSURES: [Category]

### Mandatory Disclaimer 1: [Name - e.g., "Credit Impact Disclosure"]

**Required Text (Exact or Equivalent):**
"[Exact disclaimer language or template]"

**Example:**
"Debt settlement may negatively impact your credit score and ability to obtain credit."

**Placement Requirements:**
- ✅ Must appear: [Where - e.g., "Near any claim about debt reduction"]
- ✅ Proximity: [How close - e.g., "Same page, not just footer"]
- ✅ Font size: [Requirement - e.g., "Not smaller than claim text"]
- ✅ Prominence: [Visibility - e.g., "Clear and conspicuous"]

**Regulation:** [Citation - e.g., FTC Debt Relief Rule]

**Consequence of Omission:** [Penalty - e.g., "FTC enforcement action, fines"]

---

### Mandatory Disclaimer 2: [Name]
[Same structure...]

---

## Disclosure Placement Best Practices

### ✅ COMPLIANT Placement:
- Immediately adjacent to claim (not separated by other content)
- Same font size or close to claim font size
- High contrast (readable)
- Not hidden in image overlay
- Not requiring extra clicks to reveal

### ❌ NON-COMPLIANT Placement:
- Buried at bottom of page
- Hidden in fine print (4pt font)
- Behind "click for details" link
- Low contrast (gray on gray)
- Separated from claim by paragraphs of other content

---

## Testimonial & Social Proof Disclosures

### FTC Endorsement Guidelines

**Required Disclosures:**
1. **If testimonial shows atypical results:**
   - ✅ Must disclose: "Results not typical" or show typical results

2. **If endorser was paid/compensated:**
   - ✅ Must disclose: Material connection (paid, free product, etc.)

3. **If expert endorsement:**
   - ✅ Expert must have actual expertise in relevant field
   - ✅ Expert must have actually used product/service (if implied)

**Placement:**
- At point of testimonial (not general disclaimer elsewhere)
- Clear and conspicuous
- Example: "Paid endorsement" or "Results not typical"

---

## Financial Disclosures (If Applicable)

### Investment/Financial Products

**Required Disclosures:**
1. **Risk Disclosures:**
   - "Past performance does not guarantee future results"
   - "All investments involve risk, including loss of principal"
   - "[Product] is not FDIC-insured" (if applicable)

2. **Fee Disclosures:**
   - All fees must be disclosed (cannot hide)
   - APR disclosure for credit products
   - Expense ratios for investment products

3. **Regulatory Status:**
   - If investment advisor, must disclose registration
   - If not FDIC-insured, must state explicitly
```

---

## Step 5: Research Recent Enforcement Actions

Learning from others' violations helps avoid same mistakes.

### Search Strategy

```
WebSearch(
  query: "FTC [category] enforcement action OR consent decree 2024 2025",
  prompt: "Find recent FTC enforcement actions in [category]:
  - What companies were cited?
  - What specific violations occurred?
  - What were the penalties?
  - What language/claims triggered enforcement?

  Focus on recent cases (2023-2025)."
)
```

---

### Data to Capture

```markdown
## RECENT ENFORCEMENT ACTIONS

### Case 1: [Company Name] ([Year])

**Violation:**
- [What they claimed that was prohibited]
- Example claim: "[Exact language that triggered violation]"

**Regulatory Action:**
- Regulator: [FTC / CFPB / etc.]
- Penalty: [Fine amount, injunction, etc.]
- Consent Decree: [Link to document]

**Lesson for Our Copy:**
- ❌ Avoid: [What not to say]
- ✅ Instead: [Compliant alternative]

---

### Case 2: [Company Name] ([Year])
[Same structure...]

---

## Common Violation Patterns

Based on enforcement history:

1. **[Violation Pattern 1 - e.g., "Unsubstantiated earnings claims"]**
   - How it happens: [Explanation]
   - How to avoid: [Strategy]

2. **[Violation Pattern 2]**
   - How it happens: [Explanation]
   - How to avoid: [Strategy]
```

---

## Step 6: Establish Ethical Boundaries

Beyond legal compliance, what's ethical?

```markdown
## ETHICAL GUIDELINES (Beyond Legal Minimums)

### Transparency Principles

1. **Disclose Material Facts**
   - Even if not legally required, disclose anything that would affect decision
   - Example: If success rate is only 40%, don't hide behind "may work"

2. **Avoid Manipulation**
   - Don't exploit cognitive biases unethically
   - Example: Don't use fake countdown timers or false scarcity

3. **Respect Vulnerability**
   - If audience is vulnerable (elderly, financially distressed, sick), extra care
   - Example: Don't pressure seniors with urgency tactics

---

### High-Risk Tactics to Avoid (Even If Legal)

❌ **Aggressive Urgency:**
- "Limited spots - only 3 left!"
- Countdown timers (unless genuinely limited)
- "Offer expires tonight!" (recurring nightly)

❌ **Fear Manipulation:**
- Exaggerating consequences of inaction
- Catastrophizing to create panic

❌ **False Intimacy:**
- "I'm just like you" when not true
- Fake personal stories

❌ **Bait and Switch:**
- Headline promises one thing, content delivers another
- Free offer that requires paid purchase

---

### Target Audience Considerations

**If targeting seniors (65+):**
- Avoid: Time pressure tactics
- Avoid: Complex financial jargon without explanation
- Require: Clear, large font disclosures
- Require: Prominent cost information

**If targeting financially distressed:**
- Avoid: Unrealistic promises ("Erase all debt!")
- Require: Upfront disclosure of risks
- Require: Clear explanation of alternatives

**If targeting medical conditions:**
- Avoid: Health claims without FDA approval
- Require: Clear distinction between symptom relief vs cure
- Require: "Consult your doctor" disclaimers
```

---

## Step 7: Create Compliance Checklist

Operational checklist for Layer 2 to use.

```markdown
## PRE-PUBLICATION COMPLIANCE CHECKLIST

### Claims Verification
- [ ] All percentage/dollar claims have substantiation
- [ ] No guarantees of results (unless truly guaranteed)
- [ ] No guarantees of timeframes (unless contractually guaranteed)
- [ ] Comparative claims are provable
- [ ] Superlatives ("best", "#1") have proof

### Disclosure Verification
- [ ] Required disclaimers present and conspicuous
- [ ] Credit impact disclosed (if financial product)
- [ ] FDIC status clear (if banking product)
- [ ] Risk disclosures present (if investment)
- [ ] Fee disclosures complete (if applicable)
- [ ] State-specific requirements met (if applicable)

### Testimonial Verification
- [ ] Real customers (not actors) OR disclosed if actors
- [ ] Typical results shown OR "not typical" disclosed
- [ ] Paid endorsements disclosed
- [ ] No misleading implications

### Visual/Design Verification
- [ ] Disclaimers readable (font size, contrast)
- [ ] Disclaimers not buried or hidden
- [ ] Clear connection between claim and disclaimer
- [ ] Mobile-friendly disclosure visibility

### Ethical Verification
- [ ] No false urgency or scarcity
- [ ] No fear manipulation
- [ ] Vulnerable audiences protected
- [ ] Transparent about costs and process

---

## APPROVAL REQUIREMENTS

### Internal Review (Before Publishing)
- [ ] Compliance team review
- [ ] Legal team review (for high-risk categories)
- [ ] User testing (disclaimers clear to layperson?)

### Documentation
- [ ] Substantiation on file for all claims
- [ ] Source citations documented
- [ ] Approval trail maintained
```

---

## Step 8: Create Disclaimer Templates

Copy-paste ready disclaimers for Layer 2.

```markdown
## DISCLAIMER TEMPLATES: [Category]

### Template 1: General Disclaimer
```
[Category] services may not be suitable for everyone. Results vary based on individual circumstances. Consult a [professional type] before making decisions.

[Company] is [licensing/registration status]. [Regulatory disclosure if required].
```

### Template 2: Results Disclaimer
```
Results shown are not typical and individual results will vary. The testimonials on this page represent exceptional results, which do not apply to the average customer. [Typical results data if available].
```

### Template 3: [Category-Specific Disclaimer]
```
[Exact template based on regulatory requirement]
```

---

## Disclaimer Placement Guide

**For listicle copy:**
- Primary disclaimer: Immediately after CTA
- Secondary disclaimers: Inline where specific claims made
- General disclaimer: Footer (if not covering specific claims)

**Mobile considerations:**
- Disclaimers must be visible without scrolling past content
- Not hidden in collapsed sections
```

---

## Step 9: Check Existing Library Resources

Before finalizing, check if compliance file already exists.

**Location:** `resource-library/compliance-rules/[category]-compliance.md`

**If Found:**
- Validate rules still current (check for regulatory updates)
- Add any new findings from this research
- Update "Last Reviewed" date

**If Not Found:**
- Create new file using template below

---

## Step 10: Save to Resource Library

**Template:**

```markdown
# [Category] Compliance & Regulatory Guidelines

**Last Updated:** [Date]
**Applies to:** [Specific offer types within category]
**Primary Regulators:** [List]
**Sources:** [List primary regulatory sources]

---

## Critical Compliance Rules

[All content from Steps 3-8 above]

---

## When in Doubt

### Red Flag Triggers (Requires Legal Review)
- Claims involving government programs
- Specific guaranteed outcomes
- Health claims (if financial product mentions health)
- Comparisons to named competitors
- New product categories (unclear regulatory status)

### Safe Harbor Approach
1. Use "may" not "will"
2. Disclose prominently (near claim)
3. Cite sources (if using statistics)
4. Link to full terms (easily accessible)
5. Avoid superlatives ("best", "only", "guaranteed")
6. Test with compliance team before launch

---

## Resources

### Regulatory Websites
- [FTC.gov/advertising]
- [CFPB.gov]
- [Relevant regulator links]

### When to Consult Legal
- ALWAYS for high-risk categories (financial, health, legal services)
- Annual review of compliance procedures
- When regulations change
- When entering new markets/states

---

## Usage Instructions

Layer 2 (write-listicle-copy) should:
1. Check this file BEFORE writing copy
2. Use Prohibited Claims as "do not write" list
3. Use Required Disclosures as "must include" checklist
4. Use Templates for exact disclaimer language
5. Flag any gray areas for user review

---

**Last Reviewed:** [Date]
**Next Review:** [Date 6 months out - regulations change]
```

---

## Step 11: Feed Findings into Offer Brief

Map compliance research to brief sections:

### → Section 4D: Compliance & Regulatory

```markdown
**Required Disclaimers:**
- [Disclaimer 1 from Step 4]
- [Disclaimer 2 from Step 4]

**Prohibited Claims:**
- ❌ [Prohibited claim 1 from Step 3]
- ❌ [Prohibited claim 2 from Step 3]
- ❌ [Prohibited claim 3 from Step 3]

**Ethical Boundaries:**
- [Guideline 1 from Step 6]
- [Guideline 2 from Step 6]

**Regulatory Bodies:**
- [Primary regulator from Step 1]
- [Secondary regulators]

**Saved to Library:** ✓ [filename]
```

### → Section 9: Compliance Alerts

```markdown
## COMPLIANCE ALERTS

### ⚠️ MUST INCLUDE
- [Required disclaimer 1 - exact text]
- [Required disclaimer 2 - exact text]
- [Risk statement if applicable]

### ❌ MUST NOT CLAIM
- [Prohibited claim 1]
- [Prohibited claim 2]
- [Prohibited claim 3]

### ⚠️ GRAY AREAS (Recommend Legal Review)
- [Any uncertain areas flagged]
```

---

## Quality Checklist

- [ ] Primary regulator identified with specific rules cited
- [ ] At least 3-5 prohibited claims documented
- [ ] All required disclaimers have exact text
- [ ] Disclaimer placement requirements specified
- [ ] Recent enforcement actions researched (if available)
- [ ] Ethical boundaries beyond legal minimums established
- [ ] Disclaimer templates created (copy-paste ready)
- [ ] Compliance checklist provided for Layer 2
- [ ] Findings saved to resource library
- [ ] Sources fully cited (.gov links preferred)

---

## Time Estimate

**Regulatory Research:** ~15-20 minutes
**Prohibited Claims:** ~10-15 minutes
**Required Disclosures:** ~15-20 minutes
**Enforcement Actions:** ~10 minutes
**Documentation:** ~10 minutes

**Total:** ~60-75 minutes
**With Library Reuse:** ~15-20 minutes (if category already researched, just validate + update)

---

## Edge Cases

### Case 1: Heavily Regulated Category (Medicare, Financial, Legal)

**Action:**
- Expand research time significantly
- Recommend legal review explicitly in brief
- Provide conservative disclaimer templates
- Flag high-risk nature prominently

**Brief Note:**
```
⚠️ HIGH-RISK COMPLIANCE CATEGORY

This category is heavily regulated by [regulators]. STRONGLY RECOMMEND legal review before publishing any copy.

Conservative approach taken in all recommendations. When in doubt, we've chosen more restrictive interpretation.
```

---

### Case 2: No Clear Regulatory Guidance

**Action:**
- Apply general FTC advertising principles
- Look for analogous categories with clear rules
- Be conservative (if unclear, don't make claim)
- Flag uncertainty explicitly

**Brief Note:**
```
⚠️ UNCLEAR REGULATORY STATUS

Limited regulatory guidance specific to [offer type]. Applied general FTC truth-in-advertising principles.

RECOMMENDATION: Consult legal counsel to establish compliant approach for this emerging category.
```

---

### Case 3: State-Specific Variations

**Action:**
- Document federal baseline
- Note major state variations (CA, NY, TX often stricter)
- Recommend geo-targeting compliance variations
- Flag if targeting specific states

**Example:**
```
COMPLIANCE VARIES BY STATE

Federal (FTC): [Requirements]
California (stricter): [Additional requirements]
New York (stricter): [Additional requirements]

If targeting specific states, customize disclaimers accordingly.
```

---

**This workflow ensures legal compliance while protecting user from regulatory violations and maintaining ethical standards.**
