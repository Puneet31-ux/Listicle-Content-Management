# Offer Types Index

## Purpose

Central registry of all offer types that have been analyzed. Check here before running Brightdata research to see if intel already exists.

---

## Audience Categories (Primary)

These are audience-first categories that span multiple offer types.

| Audience | Description | Last Updated | Offers Covered | Status |
|----------|-------------|--------------|----------------|--------|
| **senior-listicles** | 50-75+ focused content | 2025-12-05 | HELOC, discounts, Medicare, income | Active |

---

## Analyzed Offer Types

| Offer Type | Category | Last Updated | Competitors | Patterns | Status |
|------------|----------|--------------|-------------|----------|--------|
| senior-listicles | Audience | 2025-12-05 | 5 analyzed | 15+ patterns | Active |
| senior-listicles/heloc | Financial | Pending | - | - | Pending |
| senior-listicles/discounts | Savings | 2025-12-05 | 5 analyzed | 10+ patterns | Active |
| senior-listicles/medicare | Insurance | Pending | - | - | Pending |
| senior-listicles/income | Earning | Pending | - | - | Pending |

---

## How to Add New Offer Type

1. Run `/listicle-research [offer-type]`
2. Brightdata scrapes competitors
3. Analysis saved to `analysis/[offer-type]/`
4. Entry added to this table
5. Patterns extracted to `patterns/`

---

## Category Reference

| Category | Common Offer Types |
|----------|-------------------|
| **Financial** | debt-relief, personal-loans, credit-cards, insurance, mortgage, tax-relief |
| **Home Services** | solar, roofing, hvac, windows, home-security, pest-control |
| **Health** | supplements, treatments, telehealth, weight-loss, dental |
| **Legal** | personal-injury, bankruptcy, disability, immigration |
| **Education** | online-courses, certifications, tutoring, test-prep |
| **Technology** | software, vpn, hosting, security |

---

## Refresh Guidelines

- **30+ days old:** Consider refreshing if writing new copy
- **60+ days old:** Strongly recommend refresh
- **90+ days old:** Marked stale, refresh required

---

## Template for New Entries

When adding a new offer type:

```markdown
| [offer-type] | [category] | YYYY-MM-DD | X analyzed | X patterns | Active |
```

Files created:
- `analysis/[offer-type]/competitors.md`
- `analysis/[offer-type]/patterns.md`
- `analysis/[offer-type]/psychology.md`
- `analysis/[offer-type]/cta-library.md`
