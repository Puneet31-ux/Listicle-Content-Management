# Consumer Psychology Research Workflow

**Purpose:** Understand target audience's pain points, motivators, objections, and decision-making psychology to inform emotionally resonant copy

**Input:** Target audience demographics, situation, primary pain from material analysis
**Output:** Psychology insights for offer brief
**Saves to:** `resource-library/consumer-psychology/[audience]-[category]-psychology.md`

---

## Overview

Psychology research serves five purposes:

1. **Pain Point Validation:** Confirm what's truly painful (vs. what we assume)
2. **Motivator Identification:** Understand what drives action
3. **Objection Mapping:** Discover skepticism points and how to address them
4. **Decision Trigger Analysis:** Learn what causes "now" vs "later" decisions
5. **Emotional Resonance:** Craft copy that connects on emotional level

**Quality Standard:** Every insight should be evidence-based (not assumptions)

---

## Step 1: Primary Pain Point Deep Dive

### Research Questions

- What is the #1 most painful aspect of their current situation?
- Is it financial pain, emotional pain, or both?
- What triggers the pain daily? (Specific scenarios)
- How do they describe the pain in their own words?

### Search Strategy

**Primary Searches:**
```
- "[problem] emotional impact study"
- "[audience] [problem] forum discussions"
- "[problem] reddit r/[relevant subreddit]"
- "[problem] consumer complaints FTC"

Examples:
- "credit card debt emotional impact study"
- "seniors financial stress forum discussions"
- "debt reddit r/personalfinance"
- "debt settlement FTC consumer complaints"
```

**Preferred Sources:**
- Psychology journals (PsycINFO, Journal of Consumer Psychology)
- Consumer forums (Reddit, Quora, niche community forums)
- Review sites (Trustpilot, ConsumerAffairs - look at complaints)
- FTC/CFPB complaint databases (reveals pain points)
- Academic research (qualitative studies)
- Social listening tools (if available)

---

### Data to Capture

```markdown
## Primary Pain Points (Evidence-Based)

### Pain Point 1: [Name - e.g., "Collection Call Stress"]

**Description:**
[Specific, visceral description of the pain]

**Evidence:**
- "[Direct quote from consumer forum/review]" - Source: [URL]
- "[Research finding with %]" - Source: [Study citation]
- Pattern: [X]% of [source] mention this pain point

**Emotional Impact:**
- Primary emotion: [Shame / Fear / Anger / Helplessness / etc.]
- Intensity: [How severe - use evidence like "keeps them awake at night"]
- Duration: [Is this constant or episodic?]

**Daily Triggers:**
- [Specific scenario 1 - e.g., "Phone rings at 8am"]
- [Specific scenario 2 - e.g., "Opening credit card statement"]
- [Specific scenario 3 - e.g., "Spouse asks about finances"]

**In Their Own Words:**
- "[Quote 1 from forum]"
- "[Quote 2 from review]"
- "[Quote 3 from social media]"

**Copy Application:**
- Opening hook potential: [How to use in first 1-2 sentences]
- Empathy statements: [How to show understanding]

---

### Pain Point 2: [Name]
[Same structure...]

### Pain Point 3: [Name]
[Same structure...]
```

---

### WebSearch Approach for Forums

```
WebSearch(
  query: "[problem] reddit OR forum OR \"community discussion\"",
  prompt: "Find real consumer discussions about [problem]:
  - Look for personal stories (not corporate content)
  - What words/phrases do people use to describe their pain?
  - What specific scenarios trigger distress?
  - What emotions come through? (shame, fear, hopelessness, etc.)

  Extract direct quotes. Note patterns if same pain mentioned repeatedly."
)
```

---

### WebSearch Approach for Research

```
WebSearch(
  query: "[problem] psychological impact study OR research",
  prompt: "Find academic or professional research on the psychological impact of [problem]:
  - Emotional consequences (stress, anxiety, depression, shame, etc.)
  - Behavioral impacts (sleep loss, relationship strain, etc.)
  - Prevalence data (what % experience each impact)

  Prefer recent studies (2020+). Cite sources fully."
)
```

---

## Step 2: Motivator & Aspirational State Research

### Research Questions

- What do they want to achieve? (Beyond surface goal)
- What does success look like to them? (Specific vision)
- What motivates action more: escaping pain or achieving aspiration?
- What would change in their daily life if problem solved?

### Search Strategy

**Primary Searches:**
```
- "[solution] before and after stories"
- "[category] success stories"
- "[problem] testimonial analysis"
- "[audience] goals [category]"

Examples:
- "debt freedom before and after stories"
- "debt settlement success testimonials"
- "seniors financial goals retirement"
```

**Preferred Sources:**
- Success stories (company testimonials, review sites)
- Goal-setting research (psychology journals)
- Aspiration studies (marketing research)
- Motivational psychology (intrinsic vs extrinsic motivators)

---

### Data to Capture

```markdown
## Motivators & Aspirational State

### Desired Outcome (Surface Level)
[What they say they want - e.g., "Get out of debt"]

### Deeper Aspiration (Emotional Driver)
[What they really want - e.g., "Sleep through the night without money anxiety"]

**Evidence:**
- "[Quote showing aspiration]" - Source: [URL]
- "[Research on what motivates this behavior]" - Source: [Citation]

### Life After Problem Solved

**Daily Life Changes:**
- [Change 1 - e.g., "Can answer phone without fear"]
- [Change 2 - e.g., "Can plan family vacation"]
- [Change 3 - e.g., "Can save for retirement"]

**Emotional State After:**
- [Emotion 1 - e.g., "Relief"]
- [Emotion 2 - e.g., "Pride"]
- [Emotion 3 - e.g., "Control"]

**Social/Relationship Benefits:**
- [Benefit 1 - e.g., "Less marriage stress"]
- [Benefit 2 - e.g., "Model financial responsibility for kids"]

**In Their Own Words:**
- "[Quote from success story]"
- "[Quote from testimonial]"

### Primary Motivator Type

- ⬜ Pain Avoidance (escaping current bad state)
- ⬜ Aspiration Seeking (achieving future good state)
- ☑ Mixed (both pain and aspiration drive action)

**Evidence:** [What suggests this motivator distribution]

**Copy Application:**
- Lead angle: [Should open with pain or aspiration?]
- Emphasis balance: [X% pain focus, Y% aspiration focus]
```

---

## Step 3: Objection & Skepticism Research

### Research Questions

- What makes them skeptical of solutions in this category?
- What "too good to be true" concerns exist?
- What past experiences create distrust?
- What specific fears prevent action?

### Search Strategy

**Primary Searches:**
```
- "[solution] scam concerns"
- "[category] consumer complaints"
- "is [solution] legit reddit"
- "[solution] vs [alternative] which is better"

Examples:
- "debt settlement scam concerns"
- "debt relief consumer complaints FTC"
- "is debt settlement legit reddit"
- "debt settlement vs bankruptcy which is better"
```

**Preferred Sources:**
- Scam awareness sites (BBB Scam Tracker, FTC warnings)
- Consumer complaint databases (FTC, CFPB, state attorneys general)
- Reddit skepticism threads
- Comparison content (reveals doubts people have)
- Review sites (1-star reviews = objections)

---

### Data to Capture

```markdown
## Objections & Skepticism

### Objection 1: [Name - e.g., "Scam Fear"]

**Objection Statement:**
"[How they express doubt - e.g., 'Sounds too good to be true']"

**Root Cause:**
[Why they feel this way - e.g., "Category has history of scams"]

**Evidence:**
- "[Quote from forum]" - Source: [URL]
- "[Data on scam prevalence]" - Source: [Citation]
- Pattern: [X]% of negative reviews cite this concern

**How to Address:**
- **Transparency:** [What to disclose upfront]
- **Proof:** [What evidence builds trust - e.g., BBB accreditation]
- **Risk Reversal:** [What guarantee/protection eases fear]

**In Their Own Words:**
- "[Quote 1]"
- "[Quote 2]"

---

### Objection 2: [Name]
[Same structure...]

### Objection 3: [Name]
[Same structure...]

---

## Common Objection Categories

### Financial Objections
- Cost concerns ("Can't afford it")
- Hidden fee fears ("What are they not telling me?")
- Value doubts ("Will this actually work?")

### Trust Objections
- Scam fears ("Is this legitimate?")
- Privacy concerns ("Will they sell my data?")
- Past bad experiences ("I've been burned before")

### Efficacy Objections
- Results doubts ("This won't work for MY situation")
- Timeframe concerns ("How long will this take?")
- Effort required ("Is this too complicated?")

### Social Objections
- Embarrassment ("What will people think?")
- Admission of failure ("I should handle this myself")
- Stigma ("Only desperate people use this")
```

---

## Step 4: Decision Trigger Analysis

### Research Questions

- What causes them to act NOW vs. continue suffering?
- Are there seasonal patterns? (Tax season, New Year, etc.)
- What crisis events trigger urgency?
- What "last straw" moments lead to action?

### Search Strategy

**Primary Searches:**
```
- "when do people [take action] timing"
- "[solution] decision making process"
- "[problem] breaking point stories"
- "[category] seasonal trends"

Examples:
- "when do people seek debt relief timing"
- "debt settlement decision making factors"
- "credit card debt breaking point"
- "financial services seasonal trends"
```

**Preferred Sources:**
- Psychology research (decision-making studies)
- Seasonal trend data (Google Trends, industry reports)
- Crisis moment stories (forums, testimonials)
- Behavioral economics research

---

### Data to Capture

```markdown
## Decision Triggers

### Crisis Events (Immediate Triggers)
1. **[Event 1 - e.g., "Job Loss"]**
   - Urgency level: High (act within days/weeks)
   - Evidence: [Citation]

2. **[Event 2 - e.g., "Medical Emergency"]**
   - Urgency level: High
   - Evidence: [Citation]

3. **[Event 3 - e.g., "Collection Lawsuit Threat"]**
   - Urgency level: Critical
   - Evidence: [Citation]

### Seasonal Patterns
- **[Season/Period 1]:** [Behavior pattern - e.g., "New Year resolution timing"]
  - Evidence: [Google Trends data, industry report]

- **[Season/Period 2]:** [e.g., "Tax refund season"]
  - Evidence: [Citation]

### "Last Straw" Moments
- "[Moment 1 - e.g., 'Called 5 times in one day by collectors']"
  - Source: [Forum quote or pattern]

- "[Moment 2]"
  - Source: [Citation]

### Decision Timeline
- **Awareness to Consideration:** [X] days/weeks
- **Consideration to Decision:** [Y] days/weeks
- **Total Cycle:** [Z] days/weeks
- Source: [Research or behavioral data]

### Urgency Factors (Authentic Only)
- ⬜ Time-based (enrollment period, deadline)
- ⬜ Consequence-based (problem worsening)
- ⬜ Opportunity-based (limited availability)
- ☑ Crisis-based (acute situation demanding resolution)

**Evidence:** [What creates authentic urgency - NOT false scarcity]

**Copy Application:**
- When to introduce urgency: [Appropriate timing]
- How to frame urgency: [Language that's honest, not manipulative]
```

---

## Step 5: Cognitive Biases & Psychological Levers

### Relevant Biases for This Category

Common biases that apply to consumer decisions:

```markdown
## Cognitive Biases to Leverage (Ethically)

### Bias 1: Loss Aversion
**What it is:** People feel losses ~2x more strongly than equivalent gains

**Application to [Offer]:**
- Emphasize what they're LOSING by not acting (continued debt accumulation)
- Frame offer as preventing loss, not just achieving gain

**Ethical Guardrail:** Don't manufacture false loss ("Limited spots!" when untrue)

---

### Bias 2: Social Proof
**What it is:** People look to others' behavior to guide their own

**Application to [Offer]:**
- Show how many others have used this ([X] customers served)
- Testimonials from similar people ("I was skeptical too...")
- Normalize the problem ("73% of Americans with debt feel stress - you're not alone")

**Ethical Guardrail:** All social proof must be real, testimonials must reflect typical results

---

### Bias 3: Authority
**What it is:** People defer to credible experts/authorities

**Application to [Offer]:**
- Highlight certifications (BBB, industry accreditation)
- Reference regulatory oversight (FTC-regulated)
- Expert endorsements if available

**Ethical Guardrail:** Don't imply false government endorsement

---

### Bias 4: Present Bias
**What it is:** People overweight immediate costs/benefits vs future

**Application to [Offer]:**
- Emphasize immediate relief (stop collection calls)
- Make future benefits concrete ("Imagine checking your phone in 6 months...")

**Ethical Guardrail:** Don't promise "immediate" results if untrue

---

### Bias 5: Anchoring
**What it is:** First number seen becomes reference point

**Application to [Offer]:**
- Start with total debt amount ($25,000) then show settlement ($12,500)
- Anchor on worst alternative (bankruptcy) to make this seem better

**Ethical Guardrail:** Anchors must be accurate, not inflated

---

[Continue for relevant biases: Scarcity, Reciprocity, Commitment/Consistency, etc.]
```

---

## Step 6: Synthesize Psychology Profile

Create cohesive psychological profile of target audience.

```markdown
## Comprehensive Psychology Profile: [Audience]

### Identity & Self-Image
**How they see themselves:**
- [Positive self-view despite problem - e.g., "Responsible person hit by bad luck"]

**How problem affects identity:**
- [Identity threat - e.g., "Feels like failure, shame about debt"]

**How solution relates to identity:**
- [Identity restoration - e.g., "Using this = taking control, being responsible again"]

---

### Emotional Journey (Current State → Desired State)

**Current Emotional State:**
- Primary emotion: [Fear / Shame / Anger / Helplessness]
- Secondary emotions: [List 2-3 others]
- Intensity: [Scale or description]

**Transition Emotions (During Solution):**
- Initial: [Skepticism / Hope / Relief]
- Mid-process: [Progress / Control / Validation]

**Desired End State:**
- Primary emotion: [Peace / Pride / Freedom / Control]
- Transformation: [From X to Y]

---

### Decision-Making Style

**Rational vs. Emotional:**
- ☐ Primarily rational (needs data, logic, proof)
- ☐ Primarily emotional (needs empathy, stories, connection)
- ☑ Mixed (needs both emotional connection AND logical validation)

**Risk Tolerance:**
- [High / Medium / Low]
- Evidence: [What suggests this]

**Information Preference:**
- ☑ Want details (prefer comprehensive info)
- ☐ Want summary (prefer brief overview)
- ☐ Adaptive (depends on trust level)

---

### Copy Strategy Implications

**Lead Angle:**
[Pain / Aspiration / Logic / Trust - which opens best based on psychology]

**Tone:**
[Empathetic / Authoritative / Conversational / etc.]

**Emphasis Balance:**
- [X]% Pain acknowledgment
- [Y]% Solution explanation
- [Z]% Aspiration painting

**Trust-Building Priority:**
1. [Trust signal 1 - e.g., Transparency about process]
2. [Trust signal 2 - e.g., Social proof from similar people]
3. [Trust signal 3 - e.g., Authority markers]
```

---

## Step 7: Check Grammy Notes (If Applicable)

If target audience includes seniors, cross-reference Grammy Notes.

```markdown
## Grammy Notes Cross-Reference

### Validated Patterns
- ✅ [Pattern from Grammy Notes confirmed by research]
- ✅ [Pattern confirmed]

### New Insights
- [Insight from research NOT in Grammy Notes - add to library]

### Contradictions (if any)
- ⚠️ Grammy says [X], but research shows [Y]
- Resolution: [Which is more credible, or note both perspectives]
```

---

## Step 8: Save to Resource Library

**Location:** `resource-library/consumer-psychology/[audience]-[category]-psychology.md`

**Template:** (Similar to data structure above, comprehensive psychology profile)

---

## Step 9: Feed Findings into Offer Brief

Map psychology insights to brief sections:

### → Section 4C: Consumer Psychology Insights

```markdown
**Primary Pain Points (Research-Validated):**
1. **[Pain 1]:** [Description]
   - Evidence: [Source]
2. **[Pain 2]:** [Description]
   - Evidence: [Source]
3. **[Pain 3]:** [Description]
   - Evidence: [Source]

**Key Motivators:**
- [Motivator 1]
- [Motivator 2]

**Common Objections:**
1. [Objection 1] - How to address: [Strategy]
2. [Objection 2] - How to address: [Strategy]

**Decision Triggers:**
- [Trigger 1]
- [Trigger 2]

**Cognitive Biases to Leverage (Ethically):**
- [Bias 1] - Application: [How to use]
- [Bias 2] - Application: [How to use]

**Saved to Library:** ✓ [filename]
```

### → Layer 1 Questions Pre-Population

```markdown
**Q5: What is the #1 most painful thing happening RIGHT NOW?**
[Answer from Pain Point 1 research]

**Q6: What emotions drive their search?**
[Answer from Emotional Journey research]

**Q7: What makes them skeptical?**
[Answer from Objection 1 research]

**Q8: Life after problem solved?**
[Answer from Aspirational State research]

[etc. for all psychology-related questions]
```

---

## Quality Checklist

- [ ] At least 3 pain points validated with evidence
- [ ] Objections have counter-strategies (not just identified)
- [ ] Decision triggers identified (not manufactured urgency)
- [ ] Direct quotes from target audience captured
- [ ] Cognitive biases have ethical guardrails
- [ ] Psychology profile is evidence-based (not assumptions)
- [ ] Findings saved to resource library
- [ ] Grammy Notes cross-referenced (if applicable)

---

## Time Estimate

**Pain Point Research:** ~15-20 minutes
**Motivator Research:** ~10-15 minutes
**Objection Research:** ~10-15 minutes
**Decision Trigger Research:** ~10 minutes
**Synthesis:** ~10-15 minutes
**Documentation:** ~10 minutes

**Total:** ~55-85 minutes
**With Library Reuse:** ~20-30 minutes (if audience already researched)

---

**This workflow ensures emotionally intelligent copy that resonates with target audience's actual psychology.**
