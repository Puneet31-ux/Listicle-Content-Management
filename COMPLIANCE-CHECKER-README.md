# Regulatory/Compliance Checker Feature

**Branch:** `feature/regulatory-compliance-checker`
**Worktree Path:** `/Users/bobby/Documents/Github_II/Listicle-Compliance-Checker`

---

## Feature Overview

Build an automated compliance checking system that flags regulatory issues in listicle offers before they go live.

## Goals

1. **Flag compliance issues automatically** - Scan offer copy for potential regulatory violations
2. **Industry-specific requirements** - Handle financial disclosures, health claims, FTC guidelines
3. **Risk assessment scoring** - Provide a risk score (1-10) with breakdown
4. **Integration** - Connect to existing research and copy generation pipeline

---

## Requirements

### Core Functionality

#### 1. Compliance Rule Engine
- [ ] Create rule definitions for common compliance areas:
  - **Financial Services:** APR disclosures, "results not typical" disclaimers, rate accuracy
  - **Health/Supplements:** FDA disclaimer requirements, no "cure" claims, clinical backing
  - **General Advertising:** FTC guidelines, testimonial rules, "free" offer requirements
  - **Data Privacy:** CCPA/GDPR consent language when applicable

#### 2. Automated Scanning
- [ ] Scan generated copy variations for compliance issues
- [ ] Check offer terms against regulatory requirements
- [ ] Flag missing required disclosures
- [ ] Identify potentially misleading claims

#### 3. Risk Assessment
- [ ] Score each offer 1-10 for compliance risk
- [ ] Categorize issues: Critical / Warning / Info
- [ ] Provide specific line-by-line flagging
- [ ] Suggest compliant alternatives

#### 4. Industry Detection
- [ ] Auto-detect offer industry from content
- [ ] Apply appropriate rule sets based on industry
- [ ] Support multiple industries per offer (e.g., financial + health)

---

## Technical Implementation

### New Files to Create

```
src/
├── lib/
│   ├── compliance/
│   │   ├── rules/
│   │   │   ├── financial.ts      # Financial services rules
│   │   │   ├── health.ts         # Health/supplement rules
│   │   │   ├── ftc-general.ts    # FTC advertising rules
│   │   │   └── privacy.ts        # CCPA/GDPR rules
│   │   ├── scanner.ts            # Main scanning engine
│   │   ├── risk-scorer.ts        # Risk assessment logic
│   │   └── types.ts              # Compliance types
├── app/
│   └── api/
│       └── compliance-check/
│           └── route.ts          # API endpoint
```

### API Endpoint

```typescript
// POST /api/compliance-check
{
  "content": "string",           // Copy to check
  "offerType": "financial",      // Optional: override auto-detection
  "strictMode": false            // Optional: flag all potential issues
}

// Response
{
  "riskScore": 7,
  "issues": [
    {
      "severity": "critical",
      "rule": "financial-apr-disclosure",
      "message": "APR disclosure required when mentioning rates",
      "location": { "start": 45, "end": 89 },
      "suggestion": "Add: 'APR varies from X% to Y% based on creditworthiness'"
    }
  ],
  "requiredDisclosures": [
    "Equal Housing Lender",
    "NMLS #12345"
  ],
  "industryDetected": "financial-mortgage"
}
```

### Integration Points

1. **Copy Generation** - Run compliance check after generating variations
2. **Task Cards** - Show compliance score badge on tasks
3. **Self-Healing** - Learn from compliance feedback to improve future copy

---

## Reference Materials

### FTC Guidelines
- https://www.ftc.gov/business-guidance/resources/advertising-faqs
- https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers

### Financial Services
- TILA (Truth in Lending Act) requirements
- CFPB advertising guidelines
- State-specific mortgage advertising rules

### Health Claims
- FDA disclaimer requirements
- FTC health claim substantiation

---

## Definition of Done

- [ ] Compliance scanner detects 90%+ of common violations
- [ ] Risk scores are consistent and actionable
- [ ] API integrates with existing copy generation flow
- [ ] UI shows compliance status on task cards
- [ ] At least 50 compliance rules implemented across industries
- [ ] Documentation for adding new rules

---

## Getting Started

```bash
# Navigate to this worktree
cd /Users/bobby/Documents/Github_II/Listicle-Compliance-Checker

# Install dependencies (shared with main project)
npm install

# Start development
npm run dev

# Run tests (once implemented)
npm test
```

---

## Team Notes

- This feature should NOT block copy generation, only flag issues
- Consider caching rule results for performance
- Keep rules in separate files for easy maintenance
- All rules should have clear documentation and examples

