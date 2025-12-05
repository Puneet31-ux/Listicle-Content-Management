# Research Sources - Add Your Links Here

## Purpose

This is where you add URLs and strategic direction for competitor research. When you run `/listicle-research [offer-type]`, the system checks here first.

---

## How to Use This File

1. Add a section for each offer type
2. List competitor URLs to scrape
3. Add search queries to run
4. Note your strategic focus

---

## Template (Copy & Customize)

```markdown
## [Offer Type]

### Competitors to Scrape
| URL | Why This One | Priority |
|-----|--------------|----------|
| https://... | Top ranking for main keyword | High |
| https://... | Strong CTAs we can learn from | High |
| https://... | Good trust signals | Medium |

### Search Queries to Run
- "[offer type] comparison 2025"
- "best [offer type] companies"
- "[offer type] reviews"

### Focus Areas
**Extract:**
- Headline approaches
- CTA language
- Trust signals
- Offer positioning

**Ignore:**
- Outdated content (pre-2024)
- Sites with thin content
- Obvious affiliate spam

### Our Competitive Edge
- We beat on: [specific advantage]
- Our angle: [positioning]
- Avoid: [what not to do]
```

---

## Audience Categories

### Senior Listicles (Primary Focus)

**Status:** Analyzed - Patterns Extracted

**Description:** Senior-focused listicles across ALL offer types. This is our primary audience category.

#### Competitors Analyzed
| URL | Type | Priority | Status |
|-----|------|----------|--------|
| https://askchapter.org/magazine/budgeting-financial-wellness-tips/saving-money/best-discounts-for-seniors | Discounts | High | Analyzed |
| https://www.theseniorlist.com/senior-discounts/ | Discounts | High | Analyzed |
| https://www.moneytalksnews.com/slideshows/amazing-senior-discounts-for/ | Discounts | High | Analyzed |
| https://www.seniorlifestyle.com/resources/blog/top-senior-discounts/ | Discounts | Medium | Analyzed |
| https://www.seniorliving.org/finance/senior-discounts/ | Discounts | Medium | Analyzed |

#### Search Queries to Run
- "senior discounts 2025"
- "best discounts for seniors"
- "AARP discounts list"
- "senior savings tips"
- "how seniors can save money"

#### Sub-Offer Types (Within Senior Category)
- **HELOC/Home Equity** - LendingTree, Bankrate senior pages
- **Medicare/Insurance** - Medicare.gov, eHealth, Boomer Benefits
- **Discounts** - AARP, TheseniorList, RetireGuide
- **Income/Earning** - FlexJobs, AARP Work, RetiredBrains
- **Savings** - Senior financial blogs, government sites

#### Focus Areas
**Extract:**
- Headline patterns (year, numbers, benefit)
- Trust signals (AARP, BBB, author bylines)
- CTA language (low-friction, phone options)
- Psychology (dignity, independence, security)
- Structure (category organization, jump links)

**Ignore:**
- Condescending content
- Scammy-looking pages
- Outdated info (pre-2024)

#### Our Competitive Edge
- More comprehensive offer comparison
- Cleaner, more scannable format
- Personalization (age, location, needs)
- Mobile-first design
- Honest about what's discontinued

#### Analysis Files
```
analysis/senior-listicles/
├── OVERVIEW.md (category deep-dive)
├── patterns.md (extracted patterns)
├── psychology.md (senior triggers)
├── cta-library.md (proven CTAs)
└── sub-offers/ (offer-specific)
```

---

## Offer Types

### Debt Relief

**Status:** Not yet researched

#### Competitors to Scrape
| URL | Why This One | Priority |
|-----|--------------|----------|
| *(add your URLs here)* | | |

#### Search Queries to Run
- "best debt relief companies 2025"
- "debt consolidation comparison"
- "debt relief reviews"
- "credit card debt help options"

#### Focus Areas
**Extract:**
- How they handle shame/embarrassment
- Qualification language
- Speed/timeline promises
- Trust signals (BBB, reviews, years in business)

**Ignore:**
- Generic financial advice sites
- News articles without offer structure

#### Our Competitive Edge
*(add your notes here)*

---

### Solar

**Status:** Not yet researched

#### Competitors to Scrape
| URL | Why This One | Priority |
|-----|--------------|----------|
| *(add your URLs here)* | | |

#### Search Queries to Run
- "best solar companies 2025"
- "solar panel installation comparison"
- "solar reviews by state"
- "solar cost calculator"

#### Focus Areas
**Extract:**
- Local vs national positioning
- Savings calculator approaches
- Incentive/rebate messaging
- Installation timeline promises

#### Our Competitive Edge
*(add your notes here)*

---

### Insurance

**Status:** Not yet researched

#### Competitors to Scrape
| URL | Why This One | Priority |
|-----|--------------|----------|
| *(add your URLs here)* | | |

#### Search Queries to Run
- "best [type] insurance comparison"
- "cheap [type] insurance quotes"
- "[type] insurance reviews 2025"

#### Focus Areas
**Extract:**
- Quote process simplicity
- Price comparison approaches
- Trust signals
- Bundle messaging

#### Our Competitive Edge
*(add your notes here)*

---

### Home Services (Roofing, HVAC, etc.)

**Status:** Not yet researched

#### Competitors to Scrape
| URL | Why This One | Priority |
|-----|--------------|----------|
| *(add your URLs here)* | | |

#### Search Queries to Run
- "best [service] companies near me"
- "[service] cost comparison"
- "[service] contractor reviews"

#### Focus Areas
**Extract:**
- Local trust signals
- Free estimate positioning
- Warranty/guarantee messaging
- Before/after approaches

#### Our Competitive Edge
*(add your notes here)*

---

## Adding New Offer Types

1. Copy the template above
2. Fill in your URLs and notes
3. Run `/listicle-research [new-offer-type]`
4. System creates `analysis/[new-offer-type]/` folder
5. Update OFFER_TYPES.md index

---

## Notes

- **High Priority URLs** get scraped first
- **Search queries** supplement your URLs with what's ranking now
- **Focus Areas** guide what patterns to extract
- **Competitive Edge** gets baked into your copy direction
