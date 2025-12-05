# 📋 YOUR COMPLETE LISTICLE COPYWRITING SYSTEM

## ✅ CONFIRMED: Files Are Synced & Ready

All copywriting files are properly synced to this project from your global settings:

```
.claude/skills/master-copywriting/
├── SKILL.md (Main execution workflow)
├── GLOBAL_BEHAVIOR.md (Smart throttling)
├── SELF_HEALING.md (Feedback log)
├── references/
│   ├── ai-pattern-removal.md ✅ (De-AI-ify copy)
│   ├── psychology-triggers.md (Behavioral psychology)
│   ├── headline-formulas.md (Headline patterns)
│   └── cta-patterns.md ✅ (Interactive CTAs)
└── workflows/
    └── write-listicle-copy.md ✅ (Listicle-specific workflow)
```

---

## 🎯 HOW THE SYSTEM WORKS FOR YOUR OFFERS

### Phase 0.1: Pre-Research Offer Setup ⏸️

**⚠️ TODO - LINK TO ANOTHER SKILL (Skipping for now - REMINDER NEEDED)**

This phase will call another SKILL with agent helper to gather:
- Most relevant info, angle, advertiser for the specific offer
- Offer link
- Any offer creatives available
- Company internal notes that might be important
- Campaign caps and restrictions

**Action Required:** Link this to the other section later.

---

## 🏆 COMPETITOR ANALYSIS FRAMEWORK (Moved Up for Early Review)

**IMPORTANT:** This analysis happens **during** the BrightData/Brave research phase and is **offer-type specific**. Different offer types require different competitive strategies.

### What We Extract from Competitors:

| Element | What It Extracts | Why It Matters |
|---------|-----------------|----------------|
| **Headlines** | Their hook strategy | Learn what grabs attention in this niche |
| **Opening** | How they grab attention | First 3 sentences determine read-through |
| **Structure** | Content organization | See what format works best |
| **Offer Placement** | Where they promote | Strategic positioning insights |
| **CTA Language** | Their call-to-action copy | What drives clicks in this category |
| **Interactive Elements** | Calculators, selectors, quizzes | Engagement tactics that work |
| **Unique Claims** | What makes them different | Competitive positioning angles |

### Then We Identify GAPS:

- ❌ What they're **NOT** saying (but should be)
- ❓ Where they're being **vague** (we'll be specific)
- 🔒 **Missing trust signals** (we'll add them)
- 💭 **Unaddressed objections** (we'll handle them)

### Final Review Phase:

At the end, we review these items again to ensure we're:
- ✅ Not plagiarizing
- ✅ Executing better than top competitors
- ✅ Matching or beating their strategies

---

### Phase 1: Research & Competitor Intelligence (Already Working!)

**✅ GPT-4o-mini analyzes competitors with 35-question framework**

#### BrightData Integration Strategy:

**Priority Order:**
1. **Check local cache first** - BrightData should save scraped competitor data locally for reuse
2. **Scrape once, reference many** - Build a library of competitor examples per offer type
3. **Use both APIs together:**
   - **Brave Search** - Finds competitor listicles and ads
   - **BrightData** - Scrapes exact copy, CTAs, and interactive elements from those URLs

**What Gets Extracted:**
- ✅ CTAs, offers, pain points, trust elements
- ✅ Interactive elements (calculators, selectors, maps)
- ✅ Headlines and opening hooks
- ✅ Structural patterns

#### Quality Score System Explanation:

**How It Works:**
```
Quality Score: 0-100 (Based on 6 factors)

1. Question Coverage (Max -20 points)
   - Checks if all questions were answered
   - Penalty if < 80% coverage

2. Evidence Rate (Max -15 points)
   - % of answers backed by evidence
   - Penalty if < 50% have proof

3. Copywriting Insights (Max -10 points)
   - % of answers with actionable copy insights
   - Penalty if < 50% provide insights

4. Answer Depth (Max -10 points)
   - Average answer length
   - Penalty if answers < 100 chars (too shallow)

5. Shallow Answers (Max -2 points each)
   - Penalty for answers < 50 chars

6. Missing Answers (Max -5 points each)
   - Penalty for completely unanswered questions

Scoring:
- 90-100: Excellent (deep, comprehensive)
- 75-89: Good (solid, usable)
- 60-74: Fair (acceptable, some gaps)
- < 60: Poor (triggers auto-upgrade to GPT-4o)
```

**What It Means:**
- **70-100:** Research is solid, ready for copywriting
- **60-69:** Acceptable but might need manual review
- **< 60:** Automatically re-runs with GPT-4o for better quality

**✅ Saves to markdown file** - Full research results with timestamp

---

### Phase 2: Generate 2-3 Listicle Variations (Copywriting Workflow)

**Before Phase 2 Starts:**
1. ✅ All Research completed (35-question analysis)
2. ✅ Competitor analysis reviewed
3. ✅ Master copy skills loaded
4. ✅ Begin copywriting for each offer

#### Smart Variation Selection:

**DO NOT default to Pain + Logic every time!**

Instead, **analyze the offer and competitors**, then pick the **TOP 2 BEST angles** from:

**Available Angles:**
- **Pain-Focused** - Opens with acute struggle, agitates problem, positions relief
- **Logic-Focused** - Opens with data/math, cost comparisons, rational framework
- **Aspiration-Focused** - Opens with desired future state, paints success picture
- **Urgency-Focused** - Opens with consequence of inaction, real deadlines
- **Social Proof-Focused** - Opens with success stories, statistics, proven path
- **Authority-Focused** - Opens with expert endorsement, credentials, legitimacy
- **Curiosity-Focused** - Opens with surprising fact, contradiction, mystery

**Selection Strategy:**
1. Review competitor examples and strategies
2. Identify which angles they're using (and missing)
3. Pick the **2 strongest angles** for this offer:
   - Most competitive advantage
   - Unique positioning opportunity
   - Best match for audience psychology
4. **Optional 3rd variation:** Only add if you identify a homerun angle that's clearly better

**Default only if nothing stands out:** Pain-Focused + Logic-Focused

---

### Phase 3: Interactive Elements & CTA Strategy

**CRITICAL CLARIFICATION:**

**All CTA Buttons Say "LEARN MORE"**
- This is the standardbutton text across all variations
- Keeps consistency and matches advertiser requirements

**Interactive Elements are DIFFERENT from button CTAs:**

These are contextual engagement tools placed throughout the listicle:

#### Interactive Selector Examples:

**State/ZIP Map Selector:**
```
"Find providers in your area"
[Interactive US map - click your state]
```

**Debt Amount Selector (6 buttons):**
```
"Select your total debt:"
[$5k-$10k] [$10k-$25k] [$25k-$50k]
[$50k-$75k] [$75k-$100k] [$100k+]
```

**Vehicle Type Selector:**
```
"What type of vehicle do you drive?"
[SUV] [Compact] [Truck] [Van] [Other]
```

**Qualification Checklist:**
```
"You may qualify if:"
☐ Credit score 600+
☐ Income $30k+
☐ Home value $150k+
[CHECK ELIGIBILITY]
```

#### Other Interactive Elements:

**Calculator:**
- "Estimate Your Monthly Savings"
- "Calculate Home Equity Available"

**Quiz/Assessment:**
- "Take 2-Minute Eligibility Quiz"
- "Find Your Best Match"

**These elements will be:**
- ✅ Designed in code (for preview testing)
- ✅ Styled to match actual listicle examples
- ✅ Generated based on competitor analysis
- ✅ Placed strategically throughout copy

---

### Phase 4: 7-Pass Copy-Check Process with UI Workflow

**UI Integration (Green "Ready to Publish" Column):**

When an offer moves to the final green column:
1. Research is complete and verified
2. Copywriting process begins
3. UI shows **"Start Copywriting"** button

#### Workflow with Buttons:

**Button 1: "Generate Draft" (Pass 1-2 - Automatic)**
- Runs automatically when clicked
- Generates top 2-3 variations
- Passes 1-2 run automatically (Structure + Value check)
- **Output:** Draft ready for preview

**Visual Preview:**
- Copy displays styled like actual listicle
- Shows headlines, body, CTAs, interactive elements
- Mobile and desktop views
- Can see what it looks like in production

**Button 2: "Run AI Removal" (Pass 3)**
- Click to run Pass 3 (AI Pattern Removal)
- Removes AI tells, cliches, hedging
- Shows before/after comparison

**Button 3: "Polish Copy" (Pass 4-7)**
- Click to run final polish passes
- Read-aloud test, competitive edge, emotional check
- Mobile optimization

#### Version Stacking System:

**How It Works:**
```
Copy Document Structure:
├── [LATEST] Version 3 (Pass 4-7 Complete)
├── Version 2 (Pass 3 Complete)
├── Version 1 (Pass 1-2 Draft)
└── [ARCHIVED] Version 0 (Original)
```

- Each pass creates a new version stacked on top
- Can roll back to previous version anytime
- Once final version selected, remove older versions
- Keep only the version you'll publish

**Pass Details:**

**Pass 1-2: Structure + Value** (Automatic Draft Phase)
- ✅ All 7 required sections present
- ✅ Every paragraph teaches something
- ✅ Actionable advice included
- ✅ Logical flow and hierarchy

**Pass 3: AI Pattern Removal** (CRITICAL - Manual Trigger)
- ✅ Em dash count: ≤ 2 total
- ✅ Zero AI cliche phrases ("important to note", "in conclusion", "let's dive in")
- ✅ Replace hedging ("might", "could", "may", "potentially")
- ✅ Vary sentence starts (no repetitive patterns)
- ✅ Break parallel structures (avoid robotic rhythm)

**Pass 4-7: Polish** (Manual Trigger if Needed)
- ✅ Read-aloud test (sounds natural when spoken)
- ✅ Competitive edge verification (better than top 3)
- ✅ Emotional resonance check (creates feeling)
- ✅ Mobile optimization (scannable, short paragraphs)

---

## 📝 OUTPUT FORMAT

For each offer, you receive:

### 1. **Research Summary**
   - Competitor analysis (10+ examples reviewed)
   - Gap identification (what they're missing)
   - Documented advantages (why we'll win)

### 2. **2-3 Complete Variations**
   - Different psychological approaches
   - All passed 7-pass checks
   - "Why This Works" explanations
   - Interactive elements designed

### 3. **🏆 TOP PICK Recommendation**
   **NEW: AI selects the best-performing variation**

   ```
   TOP PICK: Variation 2 (Logic-Focused)

   Why This Should Perform Best:
   - Matches competitor gap (they're all emotion, we bring data)
   - Audience is analytical (financial offer)
   - Testing hypothesis: Rational decision-makers in this niche
   - CTR prediction: 10-12% (vs. 8% baseline)

   Test Plan:
   - Run this variation first for 7 days
   - Track: CTR, interaction rate, conversion rate
   - If CTR < 9%, switch to Variation 1 (Pain-Focused)

   Self-Healing: Results feed back into selection algorithm
   ```

### 4. **Comparison Matrix**
   - Side-by-side variation comparison
   - Best for different audience segments
   - A/B testing recommendations

### 5. **Testing Recommendations**
   - Which to test first (based on TOP PICK)
   - Metrics to track:
     - CTR (target: 8-12%)
     - Interaction rate (target: 35%+)
     - Bounce rate (target: < 40%)
     - Conversion rate
   - Iteration plan based on results

### 6. **Landing Page Alignment**
   - Verifies message consistency
   - Identifies risks (bait & switch)
   - Recommendations for LP improvements

---

## 🚀 HOW TO USE IT

### Commands Available:
- `/copy-write` - Generate new listicle copy
- `/copy-check` - Review existing copy with scorecard
- `/copy-feedback` - Log improvements (self-healing)
- `/copy-help` - Show full system help

### Complete Workflow:

**In UI (http://localhost:3000):**

1. **Create Task** - Add offer details, competitor URLs
2. **Click "Generate Strategy"** - 35-question framework analyzes offer type
3. **Click "AI Research"** - BrightData + Brave scrape and analyze competitors
4. **Move to "Ready to Publish" column** - Triggers copywriting options

**In "Ready to Publish" Column:**

5. **Click "Generate Draft"** - Creates 2-3 variations (Pass 1-2 automatic)
6. **Preview in styled view** - See what it looks like as actual listicle
7. **Click "Run AI Removal"** - (Optional) Cleans up AI patterns (Pass 3)
8. **Click "Polish Copy"** - (Optional) Final refinement (Pass 4-7)
9. **Review TOP PICK** - AI recommends best variation with reasoning
10. **Select final version** - Archive other versions, publish winner

**OR via Claude Code:**

4. Run `/copy-write` - Generates all variations through all passes
5. System provides complete output with TOP PICK
6. Get comparison matrix + testing recommendations

---

## ✅ CRITICAL SUCCESS CRITERIA

Copy is complete when:
- [ ] Competitive research documented (10+ examples)
- [ ] 2-3 distinct variations created (smart angle selection)
- [ ] Each variation passed all 7 checks
- [ ] Em dash count ≤ 2 per variation
- [ ] Zero AI cliche phrases
- [ ] Read aloud sounds natural
- [ ] Better than top 3 competitors
- [ ] Landing page alignment verified
- [ ] Interactive elements designed and coded
- [ ] TOP PICK selected with reasoning
- [ ] Testing framework provided

---

## 🎯 YOUR GOAL ALIGNMENT

✅ Takes offers + listicle sources
✅ Writes BETTER ad copy than competitors
✅ Generates leads + conversions
✅ 2-3 copy examples per offer (smart selection)
✅ Different styles and approaches
✅ Interactive + engaging elements (maps, selectors, calculators)
✅ All CTAs say "Learn More" (standardized)
✅ Copy-check process refines AI patterns
✅ Fact-checks against competitors
✅ TOP PICK recommendation with self-healing

---

## 🔄 PENDING INTEGRATIONS

### ⚠️ Reminders for Later:

1. **Phase 0.1 - Pre-Research Offer Setup**
   - Need to link to another SKILL
   - Gather offer details, creatives, internal notes
   - Set up advertiser requirements and caps

2. **BrightData Local Caching**
   - Build local library of competitor examples
   - Scrape once, reference many times
   - Organize by offer type for faster research

3. **UI Buttons Implementation**
   - "Generate Draft" button in green column
   - "Run AI Removal" button
   - "Polish Copy" button
   - Visual preview styling (listicle layout)
   - Version stacking interface

4. **TOP PICK Self-Healing System**
   - Track which AI recommendations perform best
   - Feed results back into selection algorithm
   - Improve recommendations over time

---

## 📁 KEY FILES TO REVIEW

**Copywriting Workflow:**
`.claude/skills/master-copywriting/workflows/write-listicle-copy.md`

**AI Pattern Removal:**
`.claude/skills/master-copywriting/references/ai-pattern-removal.md`

**CTA Patterns:**
`.claude/skills/master-copywriting/references/cta-patterns.md`

**Quality Score Implementation:**
`src/app/api/research/route.ts` (lines 52-135)

**Research Results Example:**
`research-results/home-equity--heloc----lendingtree-2025-12-05T19:05:11.443Z.md`

---

## 📊 READY TO TEST?

The research system is working (80/100 quality score).
The copywriting system is synced and ready.

**Next Steps:**

1. ✅ Research phase tested and working
2. ⏳ Test copywriting workflow with `/copy-write` command
3. ⏳ Review TOP PICK recommendations
4. ⏳ Build UI buttons for streamlined workflow
5. ⏳ Implement version stacking system
6. ⏳ Create visual preview for listicle styling

**Test Now:**
1. Open http://localhost:3000
2. Create HELOC offer task
3. Run research (already tested ✅)
4. Run `/copy-write` to generate 2-3 variations with TOP PICK
5. Review the 7-pass checked output
