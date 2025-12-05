# Material Analysis Workflow

**Purpose:** Analyze user-provided materials (offer URL, example listicles, creative assets) to extract insights for initial determination.

**Input:** Raw user message with URLs and optional assets
**Output:** Structured analysis ready for Checkpoint #1

---

## Step 1: Parse User Input

Extract the following from user's message:

### Required
- **Offer URL:** Primary landing page being promoted
  - Pattern match: `https?://[^\s]+` or explicit "Offer URL: [link]"
  - Validate URL is accessible

### Optional
- **Example Listicle URLs:** Similar offers or competitor examples
  - Pattern match: Multiple URLs or "Example Listicles: [link1], [link2]"
  - Can be 0-10 URLs

- **Creative Assets:** Pasted copy or attached documents
  - Look for pasted text blocks
  - Email copy, ad copy, banner headlines, etc.

### Flexible Parsing
If user just pastes URLs without labels:
- First URL = Offer URL (most likely)
- Subsequent URLs = Example listicles
- Any long text blocks = Creative assets

---

## Step 2: Fetch & Analyze Offer Landing Page

### Fetch the Offer URL
Use WebFetch to retrieve landing page content:

```
WebFetch(
  url: [offer_url],
  prompt: "Extract the following from this landing page:

  1. Core Offer Details:
     - What is being offered (product/service)
     - Value proposition (main benefit with numbers if stated)
     - How it works (mechanism/process)
     - Cost structure (pricing model, fees mentioned)
     - Eligibility requirements (who qualifies, age/income/situation)

  2. Target Audience Signals:
     - Who is this for (demographics mentioned)
     - What problem does it solve (pain points)
     - What outcome is promised (aspirational state)

  3. Unique Differentiators:
     - What makes this special vs competitors
     - Unique features or benefits
     - Brand positioning

  4. CTA & Conversion Elements:
     - Primary CTA text
     - CTA pattern (form, calculator, selector, etc.)
     - Trust signals (testimonials, guarantees, certifications)

  5. Compliance Indicators:
     - Any disclaimers present
     - Risk disclosures
     - Regulatory language

  Provide structured extraction of all available information."
)
```

### Categorize the Offer
Based on LP analysis, determine:

**Primary Category:**
- Financial (debt relief, loans, credit cards, savings, insurance)
- Home Services (solar, HVAC, roofing, remodeling)
- Health (Medicare, supplements, wellness)
- Tech (software, apps, devices)
- Education (courses, programs, degrees)
- Automotive (insurance, loans, services)
- Other (specify)

**Offer Type (Specific):**
- Within category, what specifically? (e.g., "Debt Settlement" within Financial)

**Mechanism:**
- How does it work? (e.g., "Creditor negotiation" for debt settlement)

---

## Step 3: Analyze Example Listicles (If Provided)

For each example URL provided:

### Fetch Example Content
```
WebFetch(
  url: [example_url],
  prompt: "Analyze this listicle for patterns:

  1. Structure:
     - How many offers are presented?
     - How are they organized (categories, value, alphabetical)?
     - What's the title formula?

  2. Copy Approach:
     - Tone (pain-focused, aspiration-focused, logic-driven)?
     - Information density (brief, moderate, detailed)?
     - How much text per offer?

  3. Visual & CTA Patterns:
     - CTA language used (what are the button texts)?
     - Visual style (imagery, icons, layout)
     - Trust signals present

  4. Positioning:
     - How are offers framed (benefits, features, comparison)?
     - What psychological triggers are used?

  Provide structured analysis showing patterns."
)
```

### Extract Positioning Patterns
Across all examples, identify:
- **Dominant Tone:** Pain, aspiration, logic, social proof?
- **Information Density:** Average word count per offer
- **CTA Pattern:** Most common CTA language
- **Visual Style:** Imagery approach (if discernible from text)

---

## Step 4: Analyze Creative Assets (If Provided)

If user pasted email copy, ad copy, or other creative:

### Extract Messaging Patterns
- **Headlines used:** What grabs attention?
- **Value propositions:** How is benefit stated?
- **Pain points mentioned:** What problems are called out?
- **CTAs used:** Button/link text
- **Trust signals:** Proof elements mentioned
- **Tone:** Voice and style

### Identify Brand Positioning
- Premium vs budget messaging
- Direct vs indirect approach
- Emotional vs rational appeal

---

## Step 5: Initial Determinations

Synthesize all analyzed materials into structured determinations:

### Offer Classification
```markdown
- **Category:** [Financial/Home Services/Health/etc.]
- **Offer Type:** [Specific type, e.g., "Debt Settlement"]
- **Primary Mechanism:** [How it works, e.g., "Creditor negotiation"]
- **Value Proposition:** [Main benefit with numbers if available]
- **Cost Structure:** [Pricing model, e.g., "Percentage-based fees"]
- **Eligibility:** [Who qualifies, basic requirements]
```

### Target Audience
```markdown
- **Demographics:** [Age, income level, situation]
- **Situation:** [Current state, e.g., "$10K+ unsecured debt"]
- **Primary Pain:** [Specific painful situation NOW]
- **Income Level:** [If indicated - employed, fixed income, etc.]
- **Desired Outcome:** [What they want to achieve]
```

### Positioning Angle (from examples)
```markdown
- **Tone:** [Pain-focused / Aspiration-focused / Logic-driven / Mixed]
- **Information Density:** [Brief / Moderate / Detailed]
- **CTA Pattern:** [Interactive selector / Calculator / Direct form / "Learn More"]
- **Visual Style:** [Relatable imagery / Data-focused / Benefit illustrations]
```

### Unique Elements (from offer LP)
```markdown
- [List 2-5 differentiators that make this offer unique]
- [Brand-specific features]
- [Competitive advantages identified]
```

---

## Step 6: Resource Library Check

Before presenting to user, scan resource library for relevant existing research:

### Check Category Research
Look in `resource-library/category-research/` for:
- `[category]-research.md` (e.g., `debt-relief-research.md`)
- Any files matching offer type

### Check Compliance Rules
Look in `resource-library/compliance-rules/` for:
- `[category]-compliance.md` (e.g., `financial-compliance.md`)

### Check Psychology Patterns
Look in `resource-library/consumer-psychology/` for:
- Audience-specific files (e.g., `seniors-financial-psychology.md`)
- Category-specific files

### Check Example Listicles
Look in `resource-library/listicle-examples/[category]/` for:
- Similar offer examples
- Competitive analyses

### Check Visual Guidelines
Look in `resource-library/visual-guidelines/` for:
- Audience-specific guidelines (e.g., `seniors-imagery.md`)
- CTA preferences (e.g., `cta-language-preferences.md`)

---

## Step 7: Prepare Checkpoint #1 Output

Structure findings for user approval:

```markdown
CHECKPOINT #1: INITIAL DETERMINATION

Based on analysis of your offer landing page [and example listicles]:

## OFFER CLASSIFICATION
- Category: [X]
- Offer Type: [Specific]
- Primary Mechanism: [How it works]
- Value Proposition: [Main benefit]
- Cost Structure: [Pricing model if known]

## TARGET AUDIENCE (determined from LP)
- Age: [Range]
- Situation: [Current state]
- Primary Pain: [Specific painful situation NOW]
- Income: [If indicated]
- Desired Outcome: [What they want]

## POSITIONING ANGLE (from example analysis)
- Tone: [Pain/Aspiration/Logic/Mixed]
- Information Density: [Brief/Moderate/Detailed - X words]
- CTA Pattern: [Pattern observed]
- Visual Style: [Approach]

## UNIQUE ELEMENTS (from your LP)
- [Unique feature 1]
- [Unique feature 2]
- [Unique feature 3]

## RESOURCE LIBRARY CHECK
✓ Found: [Resource 1 - with date]
✓ Found: [Resource 2 - with date]
✗ Not found: [Gap to research]

**Does this match what you're promoting, or should I adjust anything?**
```

---

## Edge Cases & Handling

### Case 1: Offer URL Not Accessible
**Symptom:** WebFetch fails or returns error
**Action:**
- Inform user URL couldn't be fetched
- Ask for alternative URL or request user to paste LP copy
- Can still proceed with example analysis if provided

**Message:**
"I couldn't access the offer URL. Can you either:
A) Provide an alternative URL
B) Paste the key content from the landing page
C) Proceed with analysis based on example listicles only (lower confidence)"

### Case 2: No Example Listicles Provided
**Symptom:** User only provides offer URL
**Action:**
- Analyze offer LP thoroughly
- Rely on resource library for positioning patterns
- Proceed with medium confidence on positioning angle

**Note in Checkpoint #1:**
"Positioning angle based on resource library patterns (no examples provided for comparison)"

### Case 3: Offer Doesn't Clearly Fit a Category
**Symptom:** LP is vague or multi-category
**Action:**
- Make best guess based on dominant element
- Flag as medium confidence
- Ask user for clarification at Checkpoint #1

**Message:**
"This offer appears to span multiple categories [X and Y]. I've classified it as [X] based on the dominant element, but please correct if this isn't accurate."

### Case 4: LP Has Minimal Information
**Symptom:** Landing page is very short or vague
**Action:**
- Extract what's available
- Flag gaps explicitly
- Rely heavily on research to fill in blanks

**Note in Checkpoint #1:**
"Landing page has limited detail. I'll conduct comprehensive research to fill in gaps about [list gaps]."

### Case 5: Example Listicles Don't Match Offer Category
**Symptom:** User provides unrelated examples
**Action:**
- Analyze them anyway (may show desired style)
- Note the category mismatch
- Ask user if style transfer is intentional

**Message:**
"The example listicles are from [category X] while your offer is [category Y]. Are you looking to apply [X]'s style to [Y], or should I find [Y]-specific examples?"

---

## Quality Checklist

Before proceeding to Checkpoint #1, verify:

- [ ] Offer category determined with confidence level noted
- [ ] Target audience has specific demographics (not vague)
- [ ] Primary pain point identified (not generic)
- [ ] Value proposition extracted (with numbers if available)
- [ ] At least 1-2 unique elements identified
- [ ] Resource library checked for all relevant categories
- [ ] Reusable resources listed with dates
- [ ] Gaps flagged for new research
- [ ] Confidence levels clear (high/medium/low per area)

**If all checked → Present Checkpoint #1 to user**

---

## Output Format Template

```markdown
CHECKPOINT #1: INITIAL DETERMINATION

Based on analysis of [your offer landing page / your offer LP + example listicles / provided materials]:

OFFER CLASSIFICATION:
- Category: [Category]
- Offer Type: [Specific type]
- Mechanism: [How it works - 1 sentence]
- Value Proposition: [Main benefit, with numbers if available]
- Cost Structure: [Pricing model or "Not specified"]

TARGET AUDIENCE (determined from LP):
- Age: [Range or "Not specified"]
- Situation: [Specific current state]
- Primary Pain: [Specific painful situation NOW]
- Income: [Level/source if indicated, or "Not specified"]
- Desired Outcome: [What they want to achieve - specific]

POSITIONING ANGLE (from example analysis):
[If examples provided:]
- Tone: [Pain/Aspiration/Logic/Mixed - based on examples]
- Information Density: [Brief/Moderate/Detailed (X-Y words per offer)]
- CTA Pattern: [Most common pattern observed]
- Visual Style: [Approach used in examples]

[If NO examples:]
- Based on resource library patterns for [category]
- Recommend: [Suggested approach based on library knowledge]

UNIQUE ELEMENTS (from your LP):
- [Differentiator 1 - specific]
- [Differentiator 2 - specific]
- [Differentiator 3 - specific]
[Or: "Limited unique elements identified - will research competitive differentiation"]

RESOURCE LIBRARY CHECK:
✓ Found: [Resource name] (updated [date])
✓ Found: [Resource name] (updated [date])
✗ Not found: [Gap] (will research)

CONFIDENCE ASSESSMENT:
- High confidence: [List areas]
- Medium confidence: [List areas]
- Low confidence: [List areas]

**Does this match what you're promoting, or should I adjust anything?**

[User can respond: "Yes, proceed" / "No, adjust: [corrections]" / "More like: [alternative]"]
```

---

**Next Step:** If user approves → Proceed to Research Planning (Checkpoint #2)
**If user corrects:** Update determinations and re-present Checkpoint #1
