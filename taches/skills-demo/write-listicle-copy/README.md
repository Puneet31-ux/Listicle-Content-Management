# Write Listicle Copy Skill

**Layer 2 of the Listicle Conversion System**

This skill takes the deep-dive analysis from `analyze-listicle-offer` (Layer 1) and transforms it into high-converting listicle copy with interactive CTAs.

## Philosophy

This skill generates **deeply researched, psychologically-grounded copy**—not generic templates.

Core principles:
- **Depth over surface** - Every line connects to specific analysis answers
- **Active engagement** - Interactive CTAs trigger self-reflection and curiosity
- **Research-backed** - Always conducts web research for competitive intel and data
- **Conversion-focused** - Optimizes for the full journey: listicle → landing page → conversion
- **Multiple variations** - Tests different psychological approaches (pain vs aspiration vs logic)

## Directory Structure

```
write-listicle-copy/
├── SKILL.md                          # Main skill configuration
├── README.md                          # This file
├── workflows/
│   ├── write-financial-listicle.md   # Workflow for financial offers (debt, loans, credit)
│   ├── write-home-service-listicle.md    # Workflow for home services (future)
│   ├── write-health-wellness-listicle.md # Workflow for health/wellness (future)
│   └── ...                               # Additional category workflows
├── references/
│   ├── conversion-copywriting-principles.md  # Core copywriting framework
│   └── interactive-cta-frameworks.md         # CTA design patterns
└── examples/
    └── debt-relief-example.md         # Complete example output
```

## How It Works

### Step 1: Context Extraction
Reviews conversation history to find your completed `analyze-listicle-offer` Q&A.

### Step 2: Web Research
Conducts 4 parallel research tracks:
1. **Competitive analysis** - How do others position similar offers?
2. **Industry data** - Statistics, trends, success rates
3. **Consumer psychology** - Motivations, triggers, barriers
4. **Compliance** - Legal requirements, prohibited claims

### Step 3: Copy Generation
Creates 3-5 variations testing different approaches:
- **Pain-focused** - Leads with acute stress/struggle
- **Aspiration-focused** - Leads with desired future state
- **Logic-focused** - Leads with data and math
- **Urgency-focused** - Leads with consequence of inaction
- **Social proof-focused** - Leads with success stories

### Step 4: Comparison & Testing
Provides:
- Variation comparison matrix
- A/B testing recommendations
- Metrics to track
- Iteration playbook

### Step 5: Landing Page Alignment
Documents:
- What expectations each variation sets
- What the landing page must deliver
- Where misalignment risks exist

## Usage

### Basic Usage

```
/write-listicle-copy
```

(Assumes you've already run `/analyze-listicle-offer` in the conversation)

### With Manual Analysis

If you haven't run the analysis skill, you can paste your Q&A when prompted.

### Example Workflow

1. Run `/analyze-listicle-offer` and answer all questions
2. Run `/write-listicle-copy`
3. Review the 3-5 variations generated
4. Choose 2 variations to A/B test
5. Implement on your site
6. Track metrics and iterate

## Output Format

Each variation includes:

**Strategic Approach:** Explanation of psychological angle

**Headline:** Attention-grabbing hook (10-15 words)

**Subheadline:** Supporting context (12-20 words)

**Opening Hook:** 2-4 sentences creating "this is me!" resonance

**Body Copy:** 150-250 words, structured and scannable
- What the offer does
- How it works
- Who qualifies
- What you could save/gain
- Why this works
- Social proof

**Interactive CTA:** Debt selector, calculator, ZIP entry, etc.

**CTA Button Text:** Action-oriented (e.g., "See My Savings")

**Risk Reversal:** Subtext below CTA (e.g., "No obligation • Won't affect credit")

**Why This Works:** Explanation of psychological strategy

## Key Features

### 1. Deep Analysis Integration
Every line of copy references specific analysis answers (Q1, Q5, Q13, etc.) ensuring grounding in actual offer details.

### 2. Interactive CTAs
Not passive "Learn More" links—active engagement:
- Debt amount selectors
- Savings calculators
- ZIP code entry
- Quiz starters
- Situation selectors

### 3. Web Research Always
Never generates copy without researching:
- Competitive examples
- Industry statistics
- Consumer psychology
- Legal compliance

### 4. Multiple Variations
Tests fundamental psychological approaches to find what resonates with your audience.

### 5. Landing Page Bridge
Ensures listicle promises align with landing page delivery to prevent bounces.

## Examples

See [debt-relief-example.md](examples/debt-relief-example.md) for complete example showing:
- 3 distinct variations (pain, aspiration, logic)
- Interactive CTA designs
- Comparison matrix
- Testing recommendations
- Landing page alignment notes

## File Descriptions

### Workflows

**write-financial-listicle.md** - Complete workflow for financial offers (debt relief, loans, credit cards, insurance). Includes:
- Analysis extraction requirements
- 4-track research protocol
- 5 variation strategies with frameworks
- Quality checklist
- Success criteria

*(Additional category workflows to be added)*

### References

**conversion-copywriting-principles.md** - Core copywriting framework covering:
- Resonance → Activation → Conversion model
- Depth over surface-level copy
- Information architecture (what to include/exclude)
- Emotional temperature management
- Benefit vs feature translation
- Objection preemption
- Voice and tone
- Scannability
- Authentic urgency

**interactive-cta-frameworks.md** - CTA design patterns including:
- 7 interactive CTA types (selectors, calculators, quizzes, etc.)
- Mobile optimization
- Personalization techniques
- Risk and friction reduction
- Testing framework
- Anti-patterns to avoid

### Examples

**debt-relief-example.md** - Shows complete skill output for debt relief offer with:
- Research summary
- 3 full variations
- Comparison matrix
- Testing recommendations
- Landing page alignment
- Source documentation

## Quality Standards

Copy must:
- ✅ Use specific numbers (not "save money" but "reduce debt by 30-50%")
- ✅ Reference actual pain points from analysis
- ✅ Include interactive CTA element
- ✅ Address top objection explicitly
- ✅ Be scannable (bullets, short paragraphs, white space)
- ✅ Use conversational language (second person "you")
- ✅ Set accurate expectations for landing page
- ✅ Include research-backed data points
- ❌ No generic templates or surface-level fluff
- ❌ No manipulation or fake urgency
- ❌ No overpromising or guarantees

## Extending This Skill

### Adding New Category Workflows

To add support for a new offer category (e.g., automotive, education):

1. Create `workflows/write-[category]-listicle.md`
2. Follow structure of `write-financial-listicle.md`
3. Customize:
   - Research tracks (category-specific sources)
   - Variation strategies (category-specific psychology)
   - CTA patterns (category-specific personalization)
   - Quality checklist (category-specific compliance)
4. Update routing table in `SKILL.md`

### Adding New Reference Files

Additional references could cover:
- Headline formulas by category
- Emotional temperature management
- Trust-building elements
- Objection handling by persona
- Mobile-first design patterns

### Adding More Examples

Create examples for:
- Different offer categories
- Different target personas
- Different traffic temperatures
- Different conversion goals

## Tips for Best Results

1. **Complete the analysis thoroughly** - The better your Q&A, the better the copy
2. **Answer all critical questions** - Q1, Q2, Q5, Q8, Q9, Q13, Q14, Q15, Q23 minimum
3. **Be specific in analysis** - "Collection calls 3+ times per day" > "debt stress"
4. **Review research** - The skill will present research before writing, validate it
5. **Test multiple variations** - Don't just pick one—A/B test 2-3
6. **Watch landing page bounce** - If high, listicle set wrong expectations
7. **Iterate based on data** - Use testing recommendations to optimize

## Success Metrics

Track these for each variation:
- **Click-through rate** (listicle → LP): Target 8-12% for financial offers
- **Interaction rate** (with CTA element): Target 35%+
- **Landing page bounce**: Target <40%
- **Conversion rate** (final action): Ultimate success metric
- **Time on page**: Engagement indicator

## Related Skills

- **analyze-listicle-offer** - Layer 1, runs before this skill
- Use that skill to generate the deep-dive questions and answers
- This skill consumes those answers to generate copy

## Limitations

- Currently only financial offer workflow fully implemented
- Requires completed analysis in conversation history (or manual paste)
- Web research quality depends on search result quality
- Cannot guarantee specific conversion rates (depends on offer, traffic, LP)

## Future Enhancements

- [ ] Add workflows for all 6 offer categories
- [ ] Add more reference files (headlines, objections, personas)
- [ ] Add examples for each category
- [ ] Add video listicle copy patterns
- [ ] Add email nurture sequence generation
- [ ] Add landing page copy alignment checker

## License & Usage

Part of the Claude Code Skills demo repository. Free to use, modify, and extend.
