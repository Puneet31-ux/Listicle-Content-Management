# Industry Data & Market Context Research Workflow

**Purpose:** Gather market statistics, consumer behavior data, and industry benchmarks to validate positioning and provide credible copy support

**Input:** Offer category, offer type, target audience from material analysis
**Output:** Industry intelligence for offer brief
**Saves to:** `resource-library/category-research/[category]-industry-data.md`

---

## Overview

Industry data research serves four purposes:

1. **Market Validation:** Confirm the market size and viability
2. **Statistical Support:** Provide specific numbers for copy credibility
3. **Consumer Behavior:** Understand how target audience researches and decides
4. **Benchmarks:** Set realistic expectations for success metrics

**Quality Standard:** Every statistic must have a source citation

---

## Step 1: Market Size & Growth Research

### Research Questions

- How many potential customers exist?
- What is the total market value?
- Is the market growing, stable, or declining?
- What demographic trends affect this market?

### Search Strategy

**Primary Searches:**
```
- "[category] market size 2025"
- "[offer type] industry report"
- "[category] consumer trends"
- "[audience] spending on [category]"

Examples:
- "debt relief market size 2025"
- "solar installation industry report"
- "senior financial services consumer trends"
```

**Preferred Sources:**
- Industry trade associations
- Market research firms (IBISWorld, Statista, Pew Research)
- Government data (Census, BLS, Federal Reserve)
- Major consultancies (McKinsey, Deloitte reports)
- Financial news (WSJ, Forbes, Bloomberg)

---

### Data to Capture

```markdown
## Market Size

**Total Addressable Market:**
- [Number] potential customers in [year]
- $[Value] total market value
- [X]% annual growth rate

**Source:** [Organization name, report title, date, URL]

**Demographic Breakdown (if available):**
- [X]% are [age range]
- [Y]% are [income level]
- [Z]% are [geographic region]

**Source:** [Citation]

**Trends:**
- [Trend 1 - growing/declining/stable]
- [Trend 2]
- [Trend 3]

**Source:** [Citation]
```

---

### WebSearch Approach

```
WebSearch(
  query: "[category] market size 2025 industry report",
  prompt: "Find recent market research with specific numbers on:
  - Total market size (number of customers or dollar value)
  - Growth trends (annual % growth)
  - Demographic data (who makes up this market)
  - Future projections

  Prioritize data from 2024-2025. Cite sources explicitly."
)
```

---

## Step 2: Consumer Behavior Research

### Research Questions

- How does the target audience research this category?
- What is their typical decision-making timeline?
- What sources do they trust?
- What barriers prevent them from taking action?

### Search Strategy

**Primary Searches:**
```
- "[audience] how they research [category]"
- "[category] consumer behavior study"
- "[audience] decision making [category]"
- "[category] purchase barriers"

Examples:
- "seniors how they research financial products"
- "homeowner solar installation decision making"
- "debt relief consumer behavior study"
```

**Preferred Sources:**
- Consumer surveys (Morning Consult, Harris Poll, Gallup)
- Academic research (Journal of Consumer Research, etc.)
- Industry whitepapers
- FTC consumer complaint data (reveals pain points)
- Forum/Reddit discussions (qualitative insights)

---

### Data to Capture

```markdown
## Consumer Behavior

**Research Patterns:**
- [X]% research online before deciding
- Average [N] sources consulted
- [Platform/channel] is primary research source

**Source:** [Citation]

**Decision Timeline:**
- Average [X] days/weeks from awareness to decision
- [Y]% decide within [timeframe]
- [Z]% comparison shop across [N] providers

**Source:** [Citation]

**Trust Factors (Ranked):**
1. [Factor 1 - e.g., "recommendations from friends/family"]
2. [Factor 2 - e.g., "online reviews"]
3. [Factor 3 - e.g., "professional certifications"]

**Source:** [Citation]

**Barriers to Action:**
- [Barrier 1 - e.g., "skepticism about legitimacy"] ([X]%)
- [Barrier 2 - e.g., "concern about cost"] ([Y]%)
- [Barrier 3 - e.g., "decision fatigue / too many options"] ([Z]%)

**Source:** [Citation]
```

---

### WebSearch Approach

```
WebSearch(
  query: "[audience] [category] consumer behavior research",
  prompt: "Find consumer research data on how [audience] makes decisions about [category]:
  - Where do they research? (online vs offline, which platforms)
  - How long does decision take? (days, weeks, months)
  - What factors influence their decision? (price, trust, convenience, etc.)
  - What prevents them from taking action? (objections, barriers, fears)

  Look for specific percentages or survey data. Cite sources."
)
```

---

## Step 3: Success Benchmarks & Performance Data

### Research Questions

- What are industry average conversion rates?
- What customer satisfaction levels are typical?
- How long do customers typically engage?
- What percentage achieve desired outcomes?

### Search Strategy

**Primary Searches:**
```
- "[category] conversion rate benchmark"
- "[offer type] success rate statistics"
- "[category] customer satisfaction data"
- "[offer type] industry benchmarks"

Examples:
- "debt settlement success rate statistics"
- "solar installation customer satisfaction"
- "high-yield savings account conversion benchmarks"
```

**Preferred Sources:**
- Industry benchmark reports
- Trade association data
- Public company investor presentations (reveal metrics)
- Customer review aggregators (Trustpilot, ConsumerAffairs)
- Regulatory filings (SEC, FTC consent decrees reveal data)

---

### Data to Capture

```markdown
## Success Benchmarks

**Conversion Metrics:**
- Industry average conversion rate: [X]%
- Top performers achieve: [Y]%
- Low performers: [Z]%

**Source:** [Citation]

**Customer Satisfaction:**
- Average rating: [X]/5 or [Y]% satisfied
- Net Promoter Score: [NPS]
- Typical complaint rate: [X]%

**Source:** [Citation]

**Outcome Success:**
- [X]% of customers achieve [desired outcome]
- Average time to result: [N] months
- Typical [metric] improvement: [X-Y%]

**Source:** [Citation]

**Customer Lifetime Value (if available):**
- Average customer engagement: [X] months/years
- Repeat usage: [Y]%

**Source:** [Citation]
```

---

### WebSearch Approach

```
WebSearch(
  query: "[category] conversion rate customer satisfaction benchmarks",
  prompt: "Find industry performance data:
  - Typical conversion rates (what % of prospects become customers)
  - Customer satisfaction metrics (ratings, NPS, complaint rates)
  - Success rates (what % achieve desired outcome)
  - Industry leaders vs laggards

  Specific numbers preferred. Cite sources."
)
```

---

## Step 4: Relevant Statistics for Copy

### Research Questions

- What compelling statistics exist that copy can reference?
- What numbers would surprise or resonate with target audience?
- What data validates the offer's value proposition?

### Search Strategy

**Primary Searches:**
```
- "[category] statistics 2025"
- "[audience] [problem] statistics"
- "[category] by the numbers"
- "[problem] prevalence data"

Examples:
- "credit card debt statistics 2025"
- "seniors investment loss data"
- "homeowner energy costs by the numbers"
```

**Preferred Sources:**
- Federal Reserve (financial data)
- Census Bureau (demographic data)
- BLS (employment, spending data)
- Health agencies (health data - CDC, CMS)
- Industry associations (category-specific stats)

---

### Data to Capture

**Criteria for Inclusion:**
- ✅ Specific number (not vague "many" or "most")
- ✅ Recent (2023-2025 preferred)
- ✅ Credible source (government, major research firm, trade association)
- ✅ Relevant to target audience
- ✅ Supports offer value proposition OR validates pain point

```markdown
## Relevant Statistics (for Copy Use)

### Market/Problem Statistics

1. **[Statistic with specific number]**
   - Context: [Why this matters]
   - Source: [Full citation with URL]
   - Copy Application: [How to use - e.g., "Opens with this stat to validate pain"]

2. **[Statistic]**
   - Context: [Why this matters]
   - Source: [Citation]
   - Copy Application: [Usage suggestion]

[Continue for 5-10 key statistics]

### Solution/Outcome Statistics

1. **[Statistic showing offer effectiveness]**
   - Context: [What this proves]
   - Source: [Citation]
   - Copy Application: [Usage suggestion]

[Continue for relevant stats]
```

---

### WebSearch Approach

```
WebSearch(
  query: "[problem] statistics [year] [authoritative source]",
  prompt: "Find compelling statistics about [problem/category]:
  - Prevalence (how many people affected)
  - Impact (financial cost, emotional toll, time lost, etc.)
  - Solution effectiveness (success rates, average improvements)

  Must be specific numbers from credible sources. Include full citations with URLs."
)
```

---

## Step 5: Cross-Validate Data

Before including statistics in brief, verify:

### Source Credibility Check

**Tier 1 (Highest Trust):**
- ✅ Government agencies (Census, BLS, Fed, CDC, FTC, etc.)
- ✅ Academic peer-reviewed research
- ✅ Major market research firms (Pew, Gallup, Statista)

**Tier 2 (Trusted with Caveats):**
- ⚠️ Industry trade associations (may have bias, but often accurate)
- ⚠️ Major consultancies (McKinsey, Deloitte - may be paywalled summaries)
- ⚠️ Financial news (WSJ, Bloomberg - verify original source)

**Tier 3 (Verify Heavily):**
- ⚠️ Company reports (investor presentations - may cherry-pick data)
- ⚠️ Blog posts citing studies (verify the original study exists)
- ⚠️ Press releases (often promotional)

**Tier 4 (Do Not Use):**
- ❌ Random blogs with no source
- ❌ Social media claims
- ❌ "Studies show..." with no study named
- ❌ Competitor marketing materials

---

### Recency Check

**Acceptable Recency:**
- 2024-2025: ✅ Use without caveat
- 2022-2023: ⚠️ Use with date disclosure ("2023 data shows...")
- 2020-2021: ⚠️ Only if no newer data exists, note "pre-pandemic" if relevant
- Pre-2020: ❌ Do not use unless timeless (e.g., historical event)

---

### Consistency Check

If multiple sources provide same statistic:
- ✅ If numbers align (within 5%), cite most credible source
- ⚠️ If numbers diverge significantly, note discrepancy and cite both
- ❌ If contradictory, flag for user review (don't make judgment call)

**Example:**
```
⚠️ CONFLICTING DATA: Average Credit Card Debt

Source A (Experian 2025): $6,501
Source B (Federal Reserve 2024): $6,088
Source C (Industry blog): $8,200 (no primary source cited)

RECOMMENDATION: Use Experian ($6,501) - most recent, Tier 1 source. Federal Reserve close enough to validate. Discard industry blog (no source).
```

---

## Step 6: Extract Insights from Data

Raw statistics are insufficient - interpret what they mean.

### Insight Framework

For each major finding, answer:
1. **What does this number mean?** (Plain English explanation)
2. **Why does this matter for our audience?** (Relevance)
3. **How should this inform copy?** (Application)

**Example:**

```markdown
### STATISTIC
"73% of Americans with credit card debt report significant stress related to their debt." (American Psychological Association, 2024)

### INTERPRETATION
**What it means:** Nearly 3 out of 4 people with debt experience stress (not just financial inconvenience - emotional toll)

**Why it matters:** Our target audience (35-60, $10K+ debt) is very likely experiencing this stress. They're not alone - it's the majority experience.

**Copy application:**
- Validates pain point (stress is real and prevalent)
- Opens with empathy ("You're not alone - 73% feel this stress")
- Positions offer as stress relief, not just financial transaction
- Emotional angle is data-backed (not manipulation)
```

---

## Step 7: Save to Resource Library

Create reusable industry data file.

**Location:** `resource-library/category-research/[category]-industry-data.md`

**Template:**

```markdown
# [Category] Industry Data & Market Context

**Research Date:** [Date]
**Category:** [Category]
**Sources Consulted:** [X]
**Last Updated:** [Date]

---

## Market Size & Growth

**Total Market:**
- [Market size data]
- [Growth trends]
- [Demographic breakdown]

**Sources:** [Citations]

---

## Consumer Behavior

**Research Patterns:**
- [How audience researches]

**Decision Timeline:**
- [How long decisions take]

**Trust Factors:**
- [What builds credibility]

**Barriers to Action:**
- [What prevents action]

**Sources:** [Citations]

---

## Success Benchmarks

**Conversion Metrics:**
- [Industry averages]

**Customer Satisfaction:**
- [Satisfaction data]

**Outcome Success:**
- [What % achieve results]

**Sources:** [Citations]

---

## Key Statistics (Copy-Ready)

### Problem/Pain Point Statistics
1. [Statistic] - Source: [Citation]
2. [Statistic] - Source: [Citation]
[...]

### Solution/Outcome Statistics
1. [Statistic] - Source: [Citation]
2. [Statistic] - Source: [Citation]
[...]

---

## Insights & Implications

### Insight 1: [Finding]
- **Data:** [Statistic]
- **Interpretation:** [What it means]
- **Copy Application:** [How to use]

### Insight 2: [Finding]
- **Data:** [Statistic]
- **Interpretation:** [What it means]
- **Copy Application:** [How to use]

[Continue for key insights]

---

## Update History

- **[Date]:** Initial research
- **[Date]:** Updated with 2025 data
- **[Date]:** Added [new finding]

**Next Review:** [Date 6 months out]

---

## Source Bibliography

1. [Full citation 1 with URL]
2. [Full citation 2 with URL]
[...]
```

---

## Step 8: Feed Findings into Offer Brief

Map industry data to brief sections:

### → Section 4B: Industry Data & Market Context

```markdown
**Market Size:**
- [Data from Step 1]
- Source: [Citation]

**Consumer Behavior:**
- [Data from Step 2]
- Source: [Citation]

**Success Benchmarks:**
- [Data from Step 3]
- Source: [Citation]

**Relevant Statistics:**
1. [Statistic from Step 4] - Source: [Citation]
2. [Statistic from Step 4] - Source: [Citation]
3. [Statistic from Step 4] - Source: [Citation]

**Saved to Library:** ✓ [filename]
```

### → Section 8: Recommendations for Copy

```markdown
**Statistics to Emphasize:**
1. [Stat that validates pain] - Opens with empathy
2. [Stat that shows solution effectiveness] - Builds credibility
3. [Stat that shows prevalence] - "You're not alone" messaging
```

---

## Quality Checklist

Before moving to next research track, verify:

- [ ] All statistics have source citations
- [ ] Sources are Tier 1 or Tier 2 credibility
- [ ] Data is recent (2023-2025 preferred)
- [ ] Conflicting data reconciled or flagged
- [ ] At least 5-10 copy-ready statistics captured
- [ ] Insights extracted (not just raw numbers)
- [ ] Findings saved to resource library
- [ ] Full bibliography included

---

## Edge Cases

### Case 1: No Recent Data Available

**Symptom:** Most recent data is 3+ years old

**Action:**
- Use most recent available, disclose age
- Note caveat in brief ("2021 data - may have shifted post-pandemic")
- Flag for update when newer data published

**Brief Note:**
```
⚠️ MEDIUM CONFIDENCE: Market Size

Most recent industry report from 2022. Market may have shifted. Recommend validating key assumptions with client or conducting primary research.
```

---

### Case 2: Paywall Blocks Access

**Symptom:** Best sources (IBISWorld, etc.) require paid subscription

**Action:**
- Look for executive summaries (often free)
- Check if library resources include subscription access
- Use secondary sources that cite the primary (validate claims)
- Note limitation in brief

**Alternative Sources:**
- Company investor presentations (public companies must disclose metrics)
- News articles summarizing reports (cite news article, note original source)
- Government equivalents (often free, if available)

---

### Case 3: Statistics Conflict with User's Experience

**Symptom:** Data says X, but user's offer positioning suggests Y

**Action:**
- Present both perspectives
- Note discrepancy
- Ask user for clarification at checkpoint

**Example:**
```
CONFLICT:

INDUSTRY DATA: "Average debt settlement reduces debt by 30-50%" (AFCC 2024)
YOUR LP CLAIMS: "Reduce debt up to 60%"

QUESTION: Is your offer outperforming industry average? If so, what's different? If not, should LP claim be adjusted to industry standard for credibility?
```

---

## Time Estimate

**Market Size Research:** ~10-15 minutes
- WebSearch + source validation: 5-7 minutes
- Data extraction: 5-8 minutes

**Consumer Behavior Research:** ~10-15 minutes
- Finding quality sources: 5-7 minutes
- Analysis: 5-8 minutes

**Benchmarks & Statistics:** ~10-15 minutes
- Gathering stats: 5-8 minutes
- Validation: 5-7 minutes

**Documentation:** ~5-10 minutes
- Save to library
- Map to brief

**Total:** ~35-55 minutes
**With Library Reuse:** ~10-20 minutes (if category already researched, just validate + update)

---

**This workflow ensures data-driven copy recommendations backed by credible research.**
