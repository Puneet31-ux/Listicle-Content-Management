# Offer Type Organization & Progressive Research System

**Branch:** `feature/offer-type-organization`
**Worktree Path:** `/Users/bobby/Documents/Github_II/Listicle-Offer-Type-Organization`
**Priority:** HIGH - This is foundational infrastructure for all other features

---

## Feature Overview

Redesign the entire file organization and research system to be centered around **Offer Types** as master encyclopedia entries. This creates an intelligent knowledge base that grows smarter with every research task, A/B test result, and user feedback.

## Goals

1. **Offer Type Encyclopedia** - Each offer type has a master doc that serves as the single source of truth
2. **Progressive Research** - Research evolves through Discovery → Analysis → Synthesis phases
3. **Smart Detection** - Auto-detect similar offer types and prompt user to confirm relationships
4. **Self-Healing Knowledge** - Feedback, A/B results, and corrections automatically update the encyclopedia

---

## The Problem (Current System)

```
research-results/
├── home-equity-heloc-lendingtree-2025-12-05.md  # Just timestamped files
├── debt-relief-freedom-debt-2025-12-04.md       # No organization
└── home-equity-quicken-2025-12-03.md            # Related but disconnected
```

**Issues:**
- No connection between related research
- Knowledge is siloed per task
- Can't leverage past research for new offers
- No master reference to build expertise

---

## The Solution (New System)

```
research-results/
├── index.json                           # Master index of all offer types
├── offer-types/
│   ├── home-equity/
│   │   ├── _master.md                   # 📚 Encyclopedia entry (THE source of truth)
│   │   ├── _similar-types.json          # Links to related types (debt-relief, refinance)
│   │   ├── brands/
│   │   │   ├── lendingtree.md           # Brand-specific insights
│   │   │   ├── quicken-loans.md
│   │   │   └── rocket-mortgage.md
│   │   ├── research-sessions/
│   │   │   ├── 2025-12-05-discovery.md  # Individual research logs
│   │   │   └── 2025-12-05-analysis.md
│   │   ├── voice-of-customer/
│   │   │   └── aggregate-insights.md    # VOC data (from VOC feature)
│   │   ├── ab-tests/
│   │   │   ├── test-log.json            # All tests run
│   │   │   └── winning-patterns.md      # Documented winners
│   │   └── feedback/
│   │       └── 2025-12-05-user-notes.md # User corrections/feedback
│   │
│   ├── debt-relief/
│   │   ├── _master.md
│   │   ├── _similar-types.json          # Links to home-equity, bankruptcy
│   │   └── ...
│   │
│   └── _type-relationships.json         # Global similarity map
│
└── README.md
```

---

## Core Components

### 1. Master Encyclopedia Entry (`_master.md`)

Each offer type has ONE master doc that contains ALL accumulated knowledge:

```markdown
# Home Equity / HELOC - Master Reference

## Quick Facts
- **Industry:** Financial Services
- **Compliance Level:** High (TILA, state regulations)
- **Typical Audience:** Homeowners 45-65, $100K+ equity

## Market Overview
[Auto-updated from research]

## Top Competitors
| Brand | Positioning | Key Differentiator |
|-------|-------------|-------------------|
| LendingTree | Comparison marketplace | "Compare 5+ offers" |
| Quicken | Speed/convenience | "Close in 10 days" |

## Proven Winning Patterns
[Auto-updated from A/B test results]
- ✅ Number-specific headlines: +40% CTR
- ✅ "No monthly payments" messaging: +25% conversion

## Customer Language (VOC)
[Auto-updated from Voice of Customer feature]
- Pain points: "hidden fees", "too many calls"
- Desires: "know my rate upfront", "simple comparison"

## Compliance Requirements
[Auto-updated from Compliance Checker]
- Required: APR disclosure, Equal Housing Lender
- Avoid: "Guaranteed approval" claims

## Research History
- 2025-12-05: Initial discovery (15 sources)
- 2025-12-06: Deep analysis on LendingTree
- 2025-12-10: A/B test results integrated

---
*Last updated: 2025-12-10 | Confidence: 85%*
```

### 2. Progressive Research Model

**Replace Surface/Medium/Deep with:**

| Phase | Purpose | When to Use | Output |
|-------|---------|-------------|--------|
| **Discovery** | Find landscape, key players, quick facts | New offer type OR new brand | Competitor list, basic positioning, initial facts |
| **Analysis** | Deep-dive on specific competitors/sources | After discovery identifies key targets | Deconstructed strategies, extracted copy, CTAs |
| **Synthesis** | Build/update master encyclopedia | After analysis OR when A/B results come in | Updated `_master.md` with new insights |

```typescript
type ResearchPhase = 'discovery' | 'analysis' | 'synthesis'

interface ResearchRequest {
  offerType: string
  brand?: string           // Optional: specific brand to research
  phase: ResearchPhase
  sourceUrls?: string[]    // For analysis phase
  newInsights?: object     // For synthesis phase (from A/B tests, feedback)
}
```

**Phase Flow:**
```
NEW OFFER ADDED
     ↓
[1. DISCOVERY] → Quick scan 5-10 sources
     ↓              - Identify competitors
     ↓              - Extract basic facts
     ↓              - Check if offer type exists
     ↓
[2. ANALYSIS] → Deep scrape key competitors
     ↓              - Full page content
     ↓              - Extract CTAs, offers, T&Cs
     ↓              - Compare against existing knowledge
     ↓
[3. SYNTHESIS] → Update master encyclopedia
                    - Merge new insights
                    - Update patterns
                    - Flag contradictions for review
```

### 3. Offer Type Detection & Similarity

When a new offer is added:

```typescript
// POST /api/detect-offer-type
{
  "title": "Compare HELOC Rates from Top Lenders",
  "description": "Home equity line of credit comparison tool"
}

// Response
{
  "detectedType": "home-equity",
  "confidence": 0.92,
  "existingType": true,
  "similarTypes": [
    { "type": "refinance", "similarity": 0.65 },
    { "type": "debt-consolidation", "similarity": 0.55 }
  ],
  "suggestedBrand": null,  // or detected brand name
  "promptUser": {
    "message": "This looks like a Home Equity offer. Is this correct?",
    "options": [
      { "action": "confirm", "label": "Yes, add to Home Equity" },
      { "action": "new_brand", "label": "Yes, but it's a new brand" },
      { "action": "different_type", "label": "No, it's a different type" },
      { "action": "new_type", "label": "Create new offer type" }
    ]
  }
}
```

**Similarity Detection Logic:**
- Keyword matching against existing types
- NLP similarity scoring
- Cross-reference with `_type-relationships.json`
- User confirmations improve the model over time

### 4. Self-Healing Integration

The master docs auto-update from multiple sources:

| Source | Trigger | Updates |
|--------|---------|---------|
| **Research** | After synthesis phase | Market overview, competitors |
| **A/B Tests** | When results logged | Winning patterns section |
| **VOC** | After VOC scraping | Customer language section |
| **Compliance** | After compliance check | Compliance requirements |
| **User Feedback** | Manual input | Any section + confidence adjustment |

```typescript
// Self-healing update structure
interface MasterDocUpdate {
  offerType: string
  section: 'overview' | 'competitors' | 'patterns' | 'voc' | 'compliance'
  source: 'research' | 'ab_test' | 'voc' | 'compliance' | 'user_feedback'
  content: string | object
  confidence: number  // 0-100
  timestamp: string
  replaceExisting: boolean  // false = merge, true = replace
}
```

---

## Technical Implementation

### New Files to Create

```
src/
├── lib/
│   ├── offer-types/
│   │   ├── index.ts              # Main exports
│   │   ├── detector.ts           # Offer type detection
│   │   ├── similarity.ts         # Similarity matching
│   │   ├── master-doc.ts         # Master doc read/write
│   │   ├── research-phases.ts    # Discovery/Analysis/Synthesis
│   │   ├── self-healing.ts       # Auto-update logic
│   │   └── types.ts              # TypeScript interfaces
├── app/
│   └── api/
│       ├── detect-offer-type/
│       │   └── route.ts          # Detection endpoint
│       ├── offer-type/
│       │   └── [type]/
│       │       └── route.ts      # CRUD for offer types
│       └── research/
│           └── route.ts          # UPDATE existing (add phases)
```

### Database/Storage Schema

**`research-results/index.json`:**
```json
{
  "version": "2.0",
  "lastUpdated": "2025-12-05T10:00:00Z",
  "offerTypes": [
    {
      "id": "home-equity",
      "name": "Home Equity / HELOC",
      "industry": "financial",
      "brands": ["lendingtree", "quicken-loans", "rocket-mortgage"],
      "researchCount": 15,
      "lastResearched": "2025-12-05T10:00:00Z",
      "confidence": 85,
      "similarTypes": ["refinance", "debt-consolidation"]
    }
  ],
  "typeRelationships": {
    "home-equity": {
      "related": ["refinance", "debt-consolidation"],
      "parent": "financial-services",
      "children": []
    }
  }
}
```

### API Changes

**Update `/api/research` to support phases:**

```typescript
// POST /api/research
{
  "topic": "LendingTree HELOC",
  "offerType": "home-equity",        // NEW: link to offer type
  "brand": "lendingtree",            // NEW: specific brand
  "phase": "analysis",               // NEW: discovery | analysis | synthesis
  "sourceUrls": ["https://..."],
  "previousPhase": "discovery-id"    // NEW: chain research sessions
}

// Response includes
{
  // ... existing fields ...
  "offerType": "home-equity",
  "phase": "analysis",
  "masterDocUpdated": true,
  "nextRecommendedPhase": "synthesis"
}
```

---

## User Flow

### Adding a New Offer

```
1. User creates new task: "Freedom Debt Relief - Debt Settlement"
                              ↓
2. System runs detection → "Detected: debt-relief (89% confidence)"
                              ↓
3. UI prompts: "This looks like a Debt Relief offer. Confirm?"
   - [Yes, Debt Relief] → Add to existing type
   - [New Brand] → Create new brand under debt-relief
   - [Different Type] → Show type picker
   - [New Type] → Create new offer type
                              ↓
4. User confirms → Task linked to offer type
                              ↓
5. Research button shows: "Start Discovery" (or "Continue Analysis" if discovery done)
```

### Research Progression

```
Task Card: "LendingTree HELOC"
Offer Type: home-equity

[Research Status]
├── Discovery: ✅ Complete (2025-12-05)
├── Analysis: ⏳ In Progress
└── Synthesis: ⬜ Pending

[Actions]
├── "Continue Analysis" → Deep scrape specific URLs
├── "View Master Doc" → Opens _master.md
└── "Similar Research" → Shows debt-relief, refinance research
```

---

## Migration Plan

### Phase 1: Create New Structure
- [ ] Create `research-results/offer-types/` folder
- [ ] Create `index.json` with schema
- [ ] Create first `_master.md` template

### Phase 2: Update Research API
- [ ] Add `phase` parameter
- [ ] Add `offerType` parameter  
- [ ] Update save logic to use new paths

### Phase 3: Add Detection
- [ ] Implement offer type detector
- [ ] Add similarity matching
- [ ] Create user confirmation flow

### Phase 4: Self-Healing Integration
- [ ] Connect A/B test results → master doc
- [ ] Connect VOC → master doc
- [ ] Connect compliance → master doc
- [ ] Connect user feedback → master doc

### Phase 5: UI Updates
- [ ] Add offer type badge to task cards
- [ ] Show research phase progress
- [ ] Add "View Master Doc" action
- [ ] Add type confirmation dialog

---

## Integration with Other Features

| Feature | Integration Point |
|---------|------------------|
| **Compliance Checker** | Updates `_master.md` compliance section |
| **Voice of Customer** | Updates `_master.md` customer language section |
| **A/B Test Insights** | Updates `_master.md` winning patterns section |
| **Copy Generation** | Reads from `_master.md` for context |
| **Self-Healing System** | Orchestrates all updates to master docs |

---

## Definition of Done

- [ ] New folder structure created and documented
- [ ] `index.json` schema implemented
- [ ] `_master.md` template created
- [ ] Research API supports phases (discovery/analysis/synthesis)
- [ ] Offer type detection working with 80%+ accuracy
- [ ] Similarity matching finds related types
- [ ] User confirmation flow implemented in UI
- [ ] Self-healing updates master docs automatically
- [ ] Migration path for existing research files
- [ ] All 4 features integrate with this system

---

## Getting Started

```bash
# Navigate to this worktree
cd /Users/bobby/Documents/Github_II/Listicle-Offer-Type-Organization

# Install dependencies
npm install

# Start development
npm run dev

# Create initial structure
mkdir -p research-results/offer-types
```

---

## Team Notes

- This is the **foundation** for all other features - prioritize accordingly
- The `_master.md` is the single source of truth - all features write to it
- Detection doesn't need to be perfect - user confirmation handles edge cases
- Consider versioning master docs for rollback capability
- The progressive research model replaces the old surface/medium/deep system entirely
- Cross-reference similar types to leverage existing research (e.g., home-equity insights might apply to refinance)

---

## Related PRs/Worktrees

Once this is complete, the following features depend on it:
1. `feature/regulatory-compliance-checker` - Writes to compliance section
2. `feature/voice-of-customer` - Writes to VOC section
3. `feature/ab-test-insights` - Writes to winning patterns section

