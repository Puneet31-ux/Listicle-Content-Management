# Voice of Customer Integration Feature

**Branch:** `feature/voice-of-customer`
**Worktree Path:** `/Users/bobby/Documents/Github_II/Listicle-Voice-Customer`

---

## Feature Overview

Integrate real customer language from reviews, forums, and social media into the research and copy generation pipeline. Extract actual phrases customers use to describe their problems and desires.

## Goals

1. **Scrape customer feedback sources** - Reviews, forums, Reddit, social media
2. **Extract actual customer language** - Exact phrases, not paraphrased
3. **Identify unmet needs** - What customers want but aren't getting
4. **Feed insights into copy** - Use real language in generated variations

---

## Requirements

### Core Functionality

#### 1. Source Scraping
- [ ] Product review sites (Trustpilot, G2, Capterra, BBB)
- [ ] Forum discussions (Reddit, Quora, niche forums)
- [ ] Social media mentions (Twitter/X, Facebook groups)
- [ ] App store reviews (for relevant offers)
- [ ] Amazon reviews (for product-based offers)

#### 2. Language Extraction
- [ ] Extract verbatim customer quotes
- [ ] Identify recurring phrases/terminology
- [ ] Categorize by sentiment (positive/negative/neutral)
- [ ] Tag by topic (pricing, quality, support, etc.)

#### 3. Pain Point Analysis
- [ ] Cluster common complaints
- [ ] Identify unmet needs and desires
- [ ] Rank pain points by frequency
- [ ] Track competitor-specific complaints

#### 4. Integration with Copy Generation
- [ ] Feed extracted language to copy generator
- [ ] Use customer phrases in headlines and hooks
- [ ] Address identified pain points directly
- [ ] Mirror customer vocabulary in CTAs

---

## Technical Implementation

### New Files to Create

```
src/
├── lib/
│   ├── voice-of-customer/
│   │   ├── scrapers/
│   │   │   ├── trustpilot.ts     # Trustpilot reviews
│   │   │   ├── reddit.ts         # Reddit discussions
│   │   │   ├── bbb.ts            # BBB complaints
│   │   │   └── generic.ts        # Generic review scraper
│   │   ├── analyzer.ts           # NLP analysis
│   │   ├── language-extractor.ts # Quote extraction
│   │   ├── pain-point-clusterer.ts
│   │   └── types.ts
├── app/
│   └── api/
│       └── voice-of-customer/
│           └── route.ts          # API endpoint
```

### API Endpoint

```typescript
// POST /api/voice-of-customer
{
  "brand": "LendingTree",
  "offerType": "home-equity",
  "sources": ["trustpilot", "reddit", "bbb"], // Optional: specific sources
  "maxResults": 100
}

// Response
{
  "extractedLanguage": {
    "painPoints": [
      {
        "phrase": "hidden fees that weren't disclosed upfront",
        "frequency": 23,
        "sentiment": "negative",
        "source": "trustpilot",
        "context": "Many reviewers mentioned..."
      }
    ],
    "desires": [
      {
        "phrase": "just want a straightforward comparison",
        "frequency": 15,
        "sentiment": "neutral"
      }
    ],
    "positiveLanguage": [
      {
        "phrase": "saved me $200/month",
        "frequency": 8,
        "sentiment": "positive"
      }
    ]
  },
  "topPhrases": [
    "too many calls from lenders",
    "easy to compare rates",
    "wish they showed actual rates"
  ],
  "unmetNeeds": [
    {
      "need": "Rate transparency before submitting info",
      "evidence": ["wish they showed...", "had to give my info first..."],
      "opportunity": "Highlight upfront rate visibility in copy"
    }
  ],
  "vocabularyMap": {
    "customerTerms": ["home equity loan", "HELOC", "cash out"],
    "avoidTerms": ["second mortgage", "debt"] // Negative associations
  }
}
```

### Data Storage

Voice of Customer data should be stored in the new offer-type organization:

```
research-results/
└── offer-types/
    └── home-equity/
        └── voice-of-customer/
            ├── lendingtree-voc-2025-12.md
            └── aggregate-insights.md  # Combined insights
```

---

## Integration Points

1. **Research Pipeline** - Run VOC analysis alongside competitor research
2. **Copy Generation** - Include VOC phrases in the prompt context
3. **Self-Healing** - Update VOC insights when A/B tests reveal winning language
4. **Compliance** - Check extracted claims can be substantiated

---

## Scraping Strategy

### Ethical Considerations
- Respect robots.txt
- Rate limit requests
- Don't store PII from reviews
- Attribute sources appropriately

### Priority Sources by Offer Type

| Offer Type | Primary Sources |
|------------|-----------------|
| Financial | BBB, Trustpilot, NerdWallet comments, Reddit r/personalfinance |
| Health | Amazon reviews, Reddit health subs, Trustpilot |
| Software | G2, Capterra, Reddit, Twitter |
| E-commerce | Amazon, Trustpilot, Reddit |

---

## Definition of Done

- [ ] Scrape at least 3 major review sources
- [ ] Extract 50+ unique customer phrases per brand
- [ ] Cluster pain points with 80%+ accuracy
- [ ] Integrate VOC data into copy generation prompt
- [ ] Store VOC data in offer-type folder structure
- [ ] UI to view/edit extracted insights

---

## Getting Started

```bash
# Navigate to this worktree
cd /Users/bobby/Documents/Github_II/Listicle-Voice-Customer

# Install dependencies
npm install

# Start development
npm run dev
```

---

## Team Notes

- Focus on EXACT quotes, not paraphrased summaries
- Build a "phrase library" that grows over time
- Consider using Claude/GPT for NLP analysis of raw reviews
- Cache scraped data to avoid repeated requests
- Some sources may need Bright Data for JavaScript-rendered content

