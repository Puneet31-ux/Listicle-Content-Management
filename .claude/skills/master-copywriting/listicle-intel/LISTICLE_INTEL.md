# Listicle Intelligence System

## Purpose

This sub-skill ONLY activates when:
- User mentions "listicle" in conversation
- User invokes `/listicle-*` commands
- User is working on listicle-specific copy

**For all other copywriting:** Use standard master-copywriting workflow.

---

## Activation Triggers

### Auto-Activate When:
- "listicle" mentioned in request
- "comparison content" or "comparison copy" mentioned
- "offer list" or "offer comparison" mentioned
- Working in `taches/` directory (listicle project files)
- `/listicle-*` command invoked

### Stay Dormant When:
- General copywriting (blogs, ads, emails)
- Non-listicle content requests
- Standard `/copy-*` commands

---

## Brightdata Integration

### Research Commands

When activated, use Brightdata MCP tools to:

1. **Competitor Scraping:**
   ```
   mcp__brightdata__search_engine
   - Query: "[offer type] comparison" OR "best [category]"
   - Engine: google

   mcp__brightdata__scrape_as_markdown
   - Scrape top 5-10 results
   - Extract: headlines, CTAs, offer structures, psychology
   ```

2. **Offer Analysis:**
   ```
   For each competitor page:
   - Extract offer positioning
   - Note CTA language patterns
   - Identify psychology triggers used
   - Document structure approach
   ```

3. **Store Results:**
   ```
   Save to: listicle-intel/analysis/{offer-type}/
   - competitors.md (scraped analysis)
   - patterns.md (extracted patterns)
   - lessons.md (what works/doesn't)
   ```

---

## Research Workflow

### /listicle-research [offer-type]

**Step 1: Gather Sources**
```
Searching for [offer-type] competitors...

Using Brightdata to find:
- Top 10 "[offer-type] comparison" results
- Top 5 "[offer-type] reviews" results
- Top 5 "best [offer-type]" results

Found: [X] sources to analyze
```

**Step 2: Scrape & Analyze**
```
Scraping with Brightdata...

For each source, extracting:
- Headline approach
- Opening hook style
- CTA patterns
- Offer placement strategy
- Trust signals used
- Interactive elements
```

**Step 3: Pattern Extraction**
```
Analyzing patterns across all sources...

COMMON PATTERNS:
- [Pattern 1]: Used by X of Y competitors
- [Pattern 2]: Used by X of Y competitors

GAPS IDENTIFIED:
- [Gap 1]: No one is doing this
- [Gap 2]: Opportunity to differentiate

BEST PRACTICES:
- [Practice 1]: Works because...
- [Practice 2]: Works because...
```

**Step 4: Store for Reference**
```
Saving to listicle-intel/analysis/[offer-type]/

Files created:
- competitors.md (raw analysis)
- patterns.md (extracted patterns)
- opportunities.md (gaps we can exploit)
```

---

## Storage Structure

```
listicle-intel/
├── LISTICLE_INTEL.md          # This file
├── OFFER_TYPES.md             # Index of analyzed offer types
├── SELF_HEALING.md            # Listicle-specific healing
│
├── analysis/                   # Per-offer-type analysis
│   ├── debt-relief/
│   │   ├── competitors.md
│   │   ├── patterns.md
│   │   ├── psychology.md
│   │   └── cta-library.md
│   │
│   ├── solar/
│   │   └── ...
│   │
│   └── {offer-type}/
│       └── ...
│
├── patterns/                   # Cross-offer patterns
│   ├── headline-patterns.md
│   ├── cta-patterns.md
│   ├── psychology-triggers.md
│   └── structure-patterns.md
│
└── lessons/                    # Learned from feedback
    ├── what-works.md
    ├── what-fails.md
    └── VALUE_LESSONS.md
```

---

## Commands

| Command | What It Does | Credits |
|---------|-------------|---------|
| `/listicle-research [type]` | Scrape & analyze competitors for offer type | Medium (Brightdata) |
| `/listicle-write` | Write listicle using stored intel | Low |
| `/listicle-patterns` | Show patterns for offer type | Low |
| `/listicle-cta` | Generate CTAs using learned patterns | Low |
| `/listicle-feedback` | Log feedback, heal the intel | Low |
| `/listicle-help` | Show this help | Low |

---

## Credit-Efficient Usage

### When to Use Brightdata (Higher Credit Cost):
- First time analyzing a new offer type
- Refreshing stale data (>30 days old)
- User explicitly requests fresh research

### When to Use Stored Intel (Low/No Credit):
- Offer type already analyzed
- Writing copy for known category
- Quick pattern reference
- Generating variations

### Smart Throttling:
```
Before Brightdata scrape, check:
1. Does analysis/{offer-type}/ exist?
2. How old is the data?
3. Did user request fresh research?

If existing data < 30 days old:
  "I have recent analysis for [offer-type]. Use existing? [Yes] [Refresh]"
```

---

## Cross-Skill Healing

### When Listicle Intel Heals Other Skills:

If a VALUE LESSON learned here applies universally:
1. Mark as `propagate: true`
2. Apply to master-copywriting SELF_HEALING.md
3. Note in lessons/VALUE_LESSONS.md

### Example:
```markdown
<!-- HEALING_UPDATE
Date: 2025-12-05
Skill: listicle-intel
Issue: CTAs with "Learn More" had 40% lower CTR than specific CTAs
Lesson: Always use action-specific CTAs ("Get My Quote" vs "Learn More")
Category: CTA Patterns
Propagate: true → master-copywriting, ad-copy
Severity: Important
-->
Updated CTA patterns to require action-specific language.
<!-- /HEALING_UPDATE -->
```

---

## Integration with Master Copywriting

This sub-skill is a **module** of master-copywriting, not a replacement.

### Workflow Integration:
1. User mentions listicle → listicle-intel activates
2. Check for existing intel on offer type
3. If no intel → offer to research with Brightdata
4. If intel exists → use it for writing
5. Writing still follows master-copywriting 7-pass process
6. Feedback heals both listicle-intel AND master-copywriting if universal

### File References:
- Listicle workflow: `workflows/write-listicle-copy.md` (parent skill)
- Intel storage: `listicle-intel/` (this module)
- Shared references: `references/` (shared with parent)

---

## Quick Reference

### Starting a Listicle Project:
```
"I need to write a listicle for [offer-type]"

→ Listicle-intel activates
→ Checks for existing intel
→ Offers research if needed
→ Uses intel + master-copywriting process
→ Captures feedback for healing
```

### Updating Intel:
```
"Refresh the [offer-type] research"

→ Runs Brightdata scraping
→ Updates analysis/{offer-type}/
→ Notes changes from previous version
```

### Applying to Other Projects:
```
"Use the CTA patterns from listicle-intel for this ad"

→ Reads patterns/cta-patterns.md
→ Applies without full listicle workflow
→ Credits saved, knowledge shared
```
