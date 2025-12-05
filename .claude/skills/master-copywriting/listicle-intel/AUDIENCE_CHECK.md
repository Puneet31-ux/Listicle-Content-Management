# Audience Detection - Listicle Copy Checkbox

## Purpose

Every listicle copy request MUST go through audience detection to determine which knowledge base applies.

**Default:** Senior Listicle (our primary, most developed knowledge base)
**Override:** Check box if NOT senior listicle

---

## New Item Card Format

When starting ANY listicle copy task, complete this card:

```
╔════════════════════════════════════════════════════════════════╗
║  📋 LISTICLE COPY ITEM CARD                                    ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  OFFER TYPE: ____________________                              ║
║  (e.g., HELOC, discounts, Medicare, solar, debt-relief)       ║
║                                                                ║
║  ──────────────────────────────────────────────────────────── ║
║                                                                ║
║  🎯 AUDIENCE CHECK (Leave blank if Senior Listicle):          ║
║                                                                ║
║  [ ] NOT Senior Listicle - Different audience                 ║
║                                                                ║
║      If checked, specify audience:                            ║
║      ○ General Homeowners (not age-specific)                  ║
║      ○ Young Professionals (25-40)                            ║
║      ○ Families (parents with children)                       ║
║      ○ Small Business Owners                                  ║
║      ○ Other: ____________________                            ║
║                                                                ║
║  ──────────────────────────────────────────────────────────── ║
║                                                                ║
║  📁 KNOWLEDGE BASE TO LOAD:                                   ║
║                                                                ║
║  If Senior (box unchecked):                                   ║
║    ✓ analysis/senior-listicles/patterns.md                    ║
║    ✓ analysis/senior-listicles/psychology.md                  ║
║    ✓ analysis/senior-listicles/cta-library.md                 ║
║    ✓ analysis/senior-listicles/sub-offers/[offer].md          ║
║                                                                ║
║  If NOT Senior (box checked):                                 ║
║    ⚠ Check if audience-specific intel exists                  ║
║    ⚠ If not, offer to create OR use general patterns          ║
║                                                                ║
║  ──────────────────────────────────────────────────────────── ║
║                                                                ║
║  ADDITIONAL DETAILS:                                          ║
║  Landing Page URL: ____________________                       ║
║  Specific Product: ____________________                       ║
║  Notes: ____________________                                  ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

---

## Detection Logic

### Step 1: Ask About Audience

```
Starting listicle copy...

🎯 AUDIENCE CHECK

Is this for the SENIOR audience (50-75+)?
  [Yes - Senior] [No - Different Audience]

(Senior is our default - we have deep intel for this audience)
```

### Step 2: If Senior (Default)

```
✅ Senior Listicle - Loading full knowledge base

Loading:
- Senior patterns (headlines, structure, trust signals)
- Senior psychology (security, independence, dignity)
- Senior CTAs (low-friction, phone options)
- [Offer]-specific patterns

Ready to write with full senior intel.
```

### Step 3: If NOT Senior

```
⚠️ Non-Senior Audience Detected

You selected: [audience type]

Current intel status:
- Senior Listicles: ✅ Full knowledge base
- [Selected Audience]: ❌ No specific intel yet

Options:
[A] Create new audience category (run /listicle-research for this audience)
[B] Use general patterns (no audience-specific psychology)
[C] Adapt senior patterns (borrow structure, adjust tone/psychology)

Recommended: Option C for now, Option A if this becomes recurring
```

---

## Audience Categories

### Currently Available (Full Intel)

| Audience | Description | Intel Status | Sub-Offers |
|----------|-------------|--------------|------------|
| **senior-listicles** | 50-75+ focused | ✅ Complete | HELOC, discounts, Medicare, income |

### Pending (Need Research)

| Audience | Description | Intel Status | To Create |
|----------|-------------|--------------|-----------|
| general-homeowners | Age-neutral homeowner content | ❌ None | Run /listicle-research |
| young-professionals | 25-40 career/finance focused | ❌ None | Run /listicle-research |
| families | Parents with children | ❌ None | Run /listicle-research |
| small-business | Business owner focused | ❌ None | Run /listicle-research |

---

## What Changes Per Audience

### Psychology Triggers

| Trigger | Senior | Young Professional | Family |
|---------|--------|-------------------|--------|
| Security | Primary | Secondary | Primary |
| Independence | Primary | Primary | Secondary |
| Legacy | Important | Low | Important |
| Speed | Low | High | Medium |
| Social Proof | Important | Very High | High |
| Authority | High | Medium | High |
| FOMO | Low (avoid) | High | Medium |

### CTA Approach

| Element | Senior | Young Professional | Family |
|---------|--------|-------------------|--------|
| Phone Option | Essential | Optional | Helpful |
| Button Size | Large | Standard | Standard |
| Urgency | Gentle | Strong OK | Medium |
| Trust Subtext | Essential | Helpful | Important |
| Mobile-First | Important | Critical | Important |

### Tone

| Aspect | Senior | Young Professional | Family |
|--------|--------|-------------------|--------|
| Formality | Respectful | Casual | Warm |
| Contractions | Some | Many | Many |
| Emojis | Rarely | Sparingly | OK |
| Length | Longer OK | Scannable | Scannable |
| Jargon | Avoid | Industry OK | Avoid |

---

## How to Add New Audience

When a new audience becomes recurring:

### Step 1: Create Directory
```
listicle-intel/analysis/[audience-name]/
├── OVERVIEW.md
├── patterns.md
├── psychology.md
├── cta-library.md
└── sub-offers/
```

### Step 2: Research
```
/listicle-research [audience-name]

Search queries:
- "[audience] comparison sites"
- "best [offer] for [audience]"
- "[audience] [offer] reviews"
```

### Step 3: Extract Patterns
- Headline patterns specific to audience
- Psychology triggers that resonate
- CTA styles that convert
- Trust signals they respond to

### Step 4: Update Index
Add to AUDIENCE_CHECK.md and OFFER_TYPES.md

---

## Integration with Workflow

### In write-listicle-copy.md

**Phase 1: Context Gathering** now includes:
- Complete Item Card (with audience checkbox)
- Load appropriate knowledge base
- Note any intel gaps

### In settings.json

The `/listicle-write` command prompt updated to:
1. First ask: "Senior or different audience?"
2. If senior: Load full intel
3. If not: Check for audience intel, offer options

---

## Quick Reference

```
STARTING LISTICLE COPY?

1. Is it for seniors (50-75+)?
   YES → Full intel loaded automatically
   NO  → Complete audience checkbox, check intel status

2. If non-senior and no intel:
   - Use general patterns (fastest)
   - Adapt senior patterns (good middle ground)
   - Create new audience category (best for recurring)

3. Default assumption: SENIOR
   (Our most common and most developed category)
```

---

## Status

- **Created:** 2025-12-05
- **Primary Audience:** Senior Listicles (complete)
- **Secondary Audiences:** Pending research
- **Integration:** write-listicle-copy.md, settings.json
