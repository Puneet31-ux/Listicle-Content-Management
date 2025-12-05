# Listicle Intel - How It Works

## Quick Reference

**Location:** `.claude/skills/master-copywriting/listicle-intel/`

**Purpose:** Research competitors with Brightdata, store patterns, reuse for future listicles without re-scraping.

---

## The Core Concept

```
FIRST TIME (per offer type):
/listicle-research debt-relief
    ↓
Brightdata scrapes 5-10 competitor listicles
    ↓
Patterns extracted & stored in analysis/debt-relief/
    ↓
One-time cost, reusable forever

EVERY TIME AFTER:
/listicle-write (for debt-relief)
    ↓
Loads stored intel from analysis/debt-relief/
    ↓
No Brightdata cost - uses stored patterns
    ↓
Better copy, lower credits
```

---

## Where to Add Source Links & Direction

### For Competitor Research Sources

**File:** `listicle-intel/RESEARCH_SOURCES.md` *(create this)*

Add URLs and notes for competitors you want analyzed:

```markdown
## Debt Relief Competitors to Analyze

### Priority Sources (scrape these first)
- https://example.com/best-debt-relief - Top ranking, good structure
- https://competitor.com/debt-consolidation - Strong CTAs
- https://review-site.com/debt-relief-reviews - Good psychology

### Search Queries to Run
- "best debt relief companies 2025"
- "debt consolidation comparison"
- "debt relief reviews"

### Notes
- Focus on: CTA language, offer positioning, trust signals
- Ignore: Sites with outdated info (pre-2024)
```

### For Offer-Type Specific Direction

**File:** `listicle-intel/analysis/{offer-type}/DIRECTION.md`

Add your strategic direction per offer type:

```markdown
## Debt Relief - Strategic Direction

### Our Angle
- Focus on speed of relief (faster than competitors claim)
- Emphasize no-judgment approach
- Target people who've tried DIY and failed

### Competitors We Beat On
- Company A: We have better rates
- Company B: We have faster process
- Company C: We have more options

### CTAs That Work for This Audience
- "See If You Qualify" (low commitment)
- "Check Your Options" (curiosity)
- Avoid: "Apply Now" (too aggressive for debt-shame audience)

### Psychology Notes
- This audience feels shame - use empathy
- They've tried things that failed - acknowledge that
- They want hope but are skeptical - use specific numbers
```

---

## File Structure Explained

```
listicle-intel/
│
├── HOW_IT_WORKS.md          ← YOU ARE HERE (system docs)
├── LISTICLE_INTEL.md        ← Main system workflow
├── OFFER_TYPES.md           ← Index of all analyzed offer types
├── SELF_HEALING.md          ← Feedback & improvements log
├── RESEARCH_SOURCES.md      ← ADD YOUR SOURCE LINKS HERE
│
├── analysis/                 ← Per-offer-type intel
│   └── {offer-type}/
│       ├── DIRECTION.md     ← YOUR STRATEGIC DIRECTION
│       ├── competitors.md   ← Raw scraped analysis
│       ├── patterns.md      ← Extracted headline/structure patterns
│       ├── psychology.md    ← Emotional triggers that work
│       └── cta-library.md   ← CTAs that convert
│
├── patterns/                 ← Universal patterns (all offer types)
│   ├── headline-patterns.md
│   ├── cta-patterns.md
│   ├── psychology-triggers.md
│   └── structure-patterns.md
│
└── lessons/                  ← Learned from feedback
    └── VALUE_LESSONS.md
```

---

## Commands Cheat Sheet

| Command | When to Use | Cost |
|---------|-------------|------|
| `/listicle-research [type]` | First time analyzing an offer type | Medium (Brightdata) |
| `/listicle-write` | Writing listicle copy | Free (uses stored) |
| `/listicle-patterns [type]` | Quick view of what works | Free |
| `/listicle-cta` | Need CTA variations | Free |
| `/listicle-feedback` | Something didn't work | Free |
| `/listicle-help` | How does this work? | Free |

---

## What "Refresh" Means

**30-day rule:** After 30 days, the system asks:
```
"Intel for [type] is 45 days old.
[Use existing] [Refresh with Brightdata]"
```

**Refresh = Re-run Brightdata** to get updated competitor data
- Competitors may have changed their copy
- New competitors may have emerged
- Market conditions may have shifted

**You can always skip refresh** if you know the intel is still good.

---

## Adding Your Own Sources

### Step 1: Create RESEARCH_SOURCES.md

```bash
# This file should be in listicle-intel/
```

### Step 2: Add URLs and Direction

```markdown
## [Offer Type] - Research Sources

### Competitors to Scrape
1. [URL] - [Why this one]
2. [URL] - [Why this one]

### Search Queries
- "[offer type] comparison"
- "best [offer type] 2025"

### Focus Areas
- What to extract: [specifics]
- What to ignore: [specifics]

### Our Competitive Edge
- [What we do better]
```

### Step 3: Run Research

```
/listicle-research [offer-type]
```

The system will:
1. Check RESEARCH_SOURCES.md for your URLs
2. Use Brightdata to scrape them
3. Also run the search queries you specified
4. Store everything in analysis/[offer-type]/

---

## Example Workflow

### First Time with Debt Relief:

1. **Add sources:**
   Create `RESEARCH_SOURCES.md` with debt relief URLs

2. **Add direction:**
   Create `analysis/debt-relief/DIRECTION.md` with strategy notes

3. **Run research:**
   ```
   /listicle-research debt-relief
   ```

4. **Write copy:**
   ```
   /listicle-write
   → "What offer type?" → debt-relief
   → System loads your stored intel
   → Writes copy using learned patterns
   ```

5. **Give feedback:**
   ```
   /listicle-feedback
   → "The CTA felt too aggressive"
   → System logs lesson, improves for next time
   ```

### Next Time with Debt Relief:

1. **Just write:**
   ```
   /listicle-write
   ```

   System automatically uses stored intel. No re-research needed.

---

## Frequently Asked Questions

### Q: Where do I put the competitor URLs I want analyzed?
**A:** Create `listicle-intel/RESEARCH_SOURCES.md` with your URLs and notes.

### Q: Where do I put my strategic direction for an offer type?
**A:** Create `listicle-intel/analysis/{offer-type}/DIRECTION.md`

### Q: How do I know what offer types have been analyzed?
**A:** Check `listicle-intel/OFFER_TYPES.md` - it's the index.

### Q: Can I add my own patterns manually?
**A:** Yes! Edit the files in `analysis/{offer-type}/` directly.

### Q: What if the generated copy doesn't match my direction?
**A:** Use `/listicle-feedback` to log what was wrong. The system learns.

### Q: Does this work for non-listicle copy?
**A:** No - this module only activates for listicle work. Use `/copy-write` for general copy.
