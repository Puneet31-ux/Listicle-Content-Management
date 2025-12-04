---
name: analyze-listicle-offers
description: Generates deep-dive analysis questions for listicle offers to understand reader psychology, pain points, motivators, and CTAs before writing copy. Use when analyzing offers for listicle content, understanding target audiences, or planning conversion-focused copy.
---

<essential_principles>
## Core Listicle Psychology

### 1. Offer-to-Reader Resonance
Successful listicles create "this is me" moments. The reader must see themselves in the offer description before they act. Analysis must identify every possible reader persona and their specific pain points.

### 2. CTA Engagement Over Generic Links
Strong CTAs activate the reader immediately (selecting debt amount, choosing location, etc.) rather than passive "learn more" links. This triggers:
- Self-reflection (how much debt DO I have?)
- Curiosity (what will happen when I click?)
- Automatic progression without conscious decision fatigue

### 3. Information Balance
Too little info → reader arrives at landing page confused/disappointed
Too much info → copy becomes overwhelming, reader never clicks

The analysis must identify the MINIMUM information needed to qualify the reader and the MAXIMUM information that maintains curiosity.

### 4. Behavioral Psychology Foundations
- **Dopamine trigger**: When readers see themselves in the story, dopamine releases, creating trust and emotional connection
- **Automatic action**: Engaged interactions (clicking personalized options) bypass rational decision-making
- **Storytelling immersion**: Readers in "character role" mode convert better than passive observers

### 5. Conversion = Sale, Not Click
Success is measured at offer conversion (form fill, survey, purchase), not listicle click. Analysis must trace the full journey from listicle → landing page → conversion.
</essential_principles>

<intake>
What type of offer are you analyzing?

1. **Financial** (debt relief, loans, credit cards, insurance, investments)
2. **Home Services** (roofing, HVAC, solar, remodeling, real estate)
3. **Health & Wellness** (medical devices, treatments, insurance, supplements)
4. **Technology** (software, devices, subscriptions, services)
5. **Education** (courses, certifications, training programs)
6. **Automotive** (vehicles, insurance, repairs, warranties)
7. **Other** (describe the category)

**Provide the offer category number OR paste offer details.**

Wait for response before proceeding.
</intake>

<routing>
| Response | Workflow |
|----------|----------|
| 1, "financial", "debt", "loan", "credit", "insurance", "invest" | workflows/analyze-financial-offers.md |
| 2, "home", "roof", "hvac", "solar", "remodel", "real estate" | workflows/analyze-home-service-offers.md |
| 3, "health", "wellness", "medical", "treatment", "supplement" | workflows/analyze-health-wellness-offers.md |
| 4, "tech", "software", "device", "subscription", "saas" | workflows/analyze-technology-offers.md |
| 5, "education", "course", "training", "certification" | workflows/analyze-education-offers.md |
| 6, "auto", "vehicle", "car", "automotive", "warranty" | workflows/analyze-automotive-offers.md |
| 7, "other" | Ask for category details, then route to most similar workflow |

**After reading the workflow, follow it exactly.**
</routing>

<reference_index>
## Domain Knowledge

All in `references/`:

**Psychology:** behavioral-psychology-principles.md, dopamine-triggers.md
**CTAs:** cta-patterns.md, engagement-mechanics.md
**Copywriting:** information-balance.md, storytelling-techniques.md
**Personas:** reader-persona-framework.md, pain-point-mapping.md
**Conversion:** landing-page-bridge.md, conversion-pathway-analysis.md
</reference_index>

<workflows_index>
| Workflow | Purpose |
|----------|---------|
| analyze-financial-offers.md | Deep-dive questions for financial products and services |
| analyze-home-service-offers.md | Deep-dive questions for home improvement and real estate |
| analyze-health-wellness-offers.md | Deep-dive questions for health, medical, and wellness offers |
| analyze-technology-offers.md | Deep-dive questions for tech products and software |
| analyze-education-offers.md | Deep-dive questions for courses and training programs |
| analyze-automotive-offers.md | Deep-dive questions for vehicle-related offers |
</workflows_index>

<success_criteria>
Analysis is complete when:
- 30-50 deep-dive questions generated specific to offer category
- Questions cover all key areas: pain points, motivators, psychology, CTAs, personas, conversion pathway
- Questions are actionable and pull out specific details about the offer
- Output includes structured framework for organizing answers
- Clear guidance on using analysis to write listicle copy
</success_criteria>
