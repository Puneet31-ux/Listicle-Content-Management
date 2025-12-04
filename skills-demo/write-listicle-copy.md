---
name: write-listicle-copy
description: Generates high-converting listicle copy from analyzed offer questions and answers. Creates multiple variations with deep psychological resonance, interactive CTAs, and curiosity-driven engagement. Use after completing analyze-listicle-offer analysis.
skill_path: skills-demo/write-listicle-copy/SKILL.md
---

This skill generates conversion-optimized listicle copy based on the deep-dive analysis from the `analyze-listicle-offer` skill.

## When to Use

Use this skill when:
- You've completed the `/analyze-listicle-offer` analysis and have answered the questions
- You're ready to generate actual listicle copy from your analysis
- You want multiple variations to A/B test

## What It Does

1. **Extracts your analysis answers** from the conversation history
2. **Conducts web research** on competitive examples, industry data, and consumer psychology
3. **Generates 3-5 distinct copy variations** testing different psychological approaches
4. **Creates interactive CTAs** (debt selectors, calculators, ZIP entry, etc.)
5. **Provides testing framework** and landing page alignment guidance

## Requirements

- Must have run `/analyze-listicle-offer` in the current conversation
- OR provide your Q&A analysis directly when prompted

## Output

Each variation includes:
- Strategic approach explanation
- Headline & subheadline
- Opening hook
- Body copy (structured, scannable)
- Interactive CTA design
- Risk reversal language
- Psychological rationale

Plus:
- Variation comparison matrix
- A/B testing recommendations
- Landing page alignment notes
- Research sources

## Example

See `skills-demo/write-listicle-copy/examples/debt-relief-example.md` for a complete example output.
