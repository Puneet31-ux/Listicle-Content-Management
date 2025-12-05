# autopilot-listicle-offers

**Description:** Fully automated listicle offer analysis and copy generation. Provide an offer URL, get final copy. The skill analyzes your offer, conducts research, generates comprehensive brief, and automatically runs the complete pipeline (Layer 1 → Layer 2) to deliver finished listicle copy variations - all from a single command.

---

<essential_principles>
## Core Philosophy

### 1. Expert Analyst, Not Interviewer
This skill ANALYZES and TELLS you what it found. It NEVER asks you to answer analytical questions. If you'd need to research something to answer, the skill does that research instead.

**Example of what this skill does:**
- You provide: Offer URL
- Skill determines: Category, target audience, positioning, differentiators
- You approve or redirect: "Yes, correct" or "No, it's more like ___"

### 2. Resource Reuse First
The skill maintains a knowledge base of previous research. Before conducting new research, it checks what's already known and tells you what can be reused vs. what needs fresh investigation.

### 3. Three Approval Checkpoints
You approve the direction at three key moments:
1. Initial Determination (category, audience, positioning)
2. Research Plan (what research to conduct)
3. Final Brief (complete analysis before copy generation)

**You're in control**, but the skill does the analytical heavy lifting.

### 4. Fully Automated Pipeline
After you approve the brief, the skill AUTOMATICALLY:
- Invokes Layer 1 (analyze-listicle-offers)
- Invokes Layer 2 (write-listicle-copy)
- Delivers final copy variations

**You run ONE command, you get FINISHED COPY.**

### 5. Continuous Learning
Every research run adds findings to the resource library. The knowledge base grows smarter with each use, saving time on future offers.
</essential_principles>

<intake>
## Welcome Message

Welcome to Autopilot Listicle Offers!

I'll help you create high-converting listicle copy from just an offer URL. Here's how this works:

**What I'll do:**
1. Analyze your offer landing page
2. Check my resource library for reusable research
3. Conduct targeted competitive and market research
4. Generate a comprehensive offer brief
5. Automatically create 5 copy variations for testing

**What you'll do:**
- Provide offer URL (+ optional example listicles)
- Approve my analysis at 3 checkpoints
- Receive finished copy (ready to publish)

**Time:** ~15-20 minutes from start to finished copy

---

### What I Need from You

**Required:**
- Offer URL (the landing page you're promoting)

**Optional (but helpful):**
- Example listicle URLs (similar offers or competitors)
- Creative assets (email copy, ad copy, banners)

**Not needed:**
- Answers to analytical questions
- Category determination
- Audience research
- Competitor analysis

I'll figure all that out through analysis and research.

---

### How to Provide Input

**Format 1 (Structured):**
```
Offer URL: https://example-offer.com
Example Listicles: https://example-list1.com, https://example-list2.com
Creative Assets: [paste copy or attach doc]
```

**Format 2 (Flexible):**
Just paste everything in one message - I'll parse it out.

---

Ready to begin? Share your offer URL and any optional context you have.
</intake>

<routing>
## Workflow Execution

This skill follows a 6-phase automated workflow:

### Phase 1: Material Intake & Initial Analysis
→ workflows/material-analysis.md

**Actions:**
1. Extract offer URL, example URLs, assets from user input
2. Fetch and analyze offer landing page
3. Fetch and analyze example listicles (if provided)
4. Scan resource library for reusable research

**Output:** Initial analysis ready for Checkpoint #1

---

### Phase 2: Initial Determination (CHECKPOINT #1)
→ references/approval-checkpoint-templates.md (Checkpoint 1)

**Present to user:**
- Offer classification (category, mechanism, value prop)
- Target audience determination
- Positioning angle (from example analysis)
- Reusable resources found

**User responds:**
- "Yes, proceed"
- "No, adjust: [corrections]"
- "More like: [alternative]"

**If corrections needed:** Update analysis and re-present

---

### Phase 3: Research Planning (CHECKPOINT #2)
→ workflows/resource-library-check.md
→ references/approval-checkpoint-templates.md (Checkpoint 2)

**Present to user:**
- What research will be REUSED (from library)
- What NEW research is needed (gaps)
- Search strategy for new research
- Estimated time

**User responds:**
- "Yes" (proceed with plan)
- "Also research: [additional item]"

---

### Phase 4: Automated Research Execution
Parallel execution:
→ workflows/research-competitive-analysis.md
→ workflows/research-industry-data.md
→ workflows/research-consumer-psychology.md
→ workflows/research-compliance.md

**Actions:**
1. Execute approved research plan across 4 tracks
2. Save findings to resource library for future reuse
3. Synthesize findings into structured brief

---

### Phase 5: Brief Presentation (CHECKPOINT #3)
→ workflows/brief-generation.md
→ references/approval-checkpoint-templates.md (Checkpoint 3)
→ references/brief-template.md

**Present to user:**
- Complete offer brief (all sections)
- Confidence assessment (high/medium/low areas)
- Recommendations for copy angles
- Compliance alerts (if applicable)

**User responds:**
- "Proceed" (auto-run Layer 1 & 2)
- "Change: [specific edits]" (update brief, re-present)

---

### Phase 6: Automated Pipeline Execution
→ workflows/layer-integration.md

**Actions (FULLY AUTOMATED, NO USER INTERVENTION):**

1. **Invoke Layer 1 (analyze-listicle-offers):**
   - Pass offer brief as context
   - Pre-populate all 50 discovery questions
   - Generate complete Q&A analysis

2. **Invoke Layer 2 (write-listicle-copy):**
   - Pass offer brief + Layer 1 Q&A
   - Layer 2 conducts its own web research
   - Generate 5 copy variations

3. **Return final copy to user:**
   - 5 variations (pain-focused, aspiration-focused, logic-focused, etc.)
   - Testing recommendations
   - Landing page alignment notes
   - Compliance disclaimers

**User receives:** FINISHED LISTICLE COPY ready to publish

</routing>

<reference_index>
## Supporting Documentation

### Core Workflow
- **material-analysis.md** - How to analyze offer LP and examples
- **resource-library-check.md** - Scan library for reusable research
- **brief-generation.md** - Synthesize analysis + research into brief
- **layer-integration.md** - Auto-invoke Layer 1 & 2 for final copy

### Research Methodologies
- **research-competitive-analysis.md** - Find and analyze competitors
- **research-industry-data.md** - Market data gathering
- **research-consumer-psychology.md** - Psychology insights
- **research-compliance.md** - Regulatory research

### Reference Materials
- **brief-template.md** - Structured brief format
- **approval-checkpoint-templates.md** - Templates for 3 user approvals
- **grammy-notes.md** - User research insights (seniors)

### Resource Library (Reusable Knowledge)
- **listicle-examples/** - Scraped/analyzed example listicles by category
- **category-research/** - Reusable category-level research
- **compliance-rules/** - Category-specific compliance guidelines
- **consumer-psychology/** - Psychology patterns by audience segment
- **visual-guidelines/** - Imagery and CTA preferences

</reference_index>

<success_criteria>
## Workflow Complete When:

### Checkpoint #1 (Initial Determination)
- [ ] Offer URL fetched and analyzed
- [ ] Category, audience, positioning determined
- [ ] Resource library scanned
- [ ] User approved or corrected determinations

### Checkpoint #2 (Research Plan)
- [ ] Reusable research identified
- [ ] New research gaps specified
- [ ] Search strategy defined
- [ ] User approved research plan

### Checkpoint #3 (Final Brief)
- [ ] All research completed across 4 tracks
- [ ] Findings saved to resource library
- [ ] Comprehensive brief generated
- [ ] Confidence assessment provided
- [ ] User approved brief

### Final Delivery
- [ ] Layer 1 invoked automatically (50 questions answered)
- [ ] Layer 2 invoked automatically (copy variations generated)
- [ ] 5 copy variations delivered to user
- [ ] Testing recommendations provided
- [ ] Compliance disclaimers included
- [ ] User receives FINISHED COPY

**Success = User goes from offer URL → publishable listicle copy in one skill run**
</success_criteria>

<key_behaviors>
## Critical Operational Patterns

### 1. NEVER Interview the User
- ❌ Don't ask: "Who is the target audience?"
- ✅ Instead: Analyze LP, determine audience, TELL user your findings

- ❌ Don't ask: "What makes this offer unique?"
- ✅ Instead: Compare to competitors, identify differentiators, TELL user

- ❌ Don't ask: "What's the primary pain point?"
- ✅ Instead: Research audience psychology, determine pain, TELL user

**Rule:** If user would need to research to answer, YOU do that research.

### 2. Resource Library First
Before conducting ANY new research:
1. Check resource-library/ for relevant existing research
2. Tell user what can be reused (with dates)
3. Only research gaps not already covered
4. Save all new findings back to library

**Rule:** Never duplicate research that exists in the library.

### 3. Explicit Approval Gates
At each checkpoint:
1. Present findings clearly (offer brief format)
2. Ask for explicit approval ("Proceed?" or "Adjust?")
3. Wait for user response before continuing
4. Accept corrections gracefully

**Rule:** Never assume approval - always wait for user confirmation.

### 4. Transparency About Confidence
When presenting analysis or brief:
- Mark HIGH confidence areas (validated across sources)
- Mark MEDIUM confidence areas (some data, needs validation)
- Mark LOW confidence areas (gaps, educated guesses)

**Rule:** Never hide uncertainty - flag it for user review.

### 5. Automated Pipeline Execution
After Checkpoint #3 approval:
1. Do NOT ask user to run Layer 1 or Layer 2 manually
2. Use Skill tool to invoke analyze-listicle-offers automatically
3. Pass brief as context to pre-populate answers
4. Use Skill tool to invoke write-listicle-copy automatically
5. Return FINAL COPY (not intermediate outputs)

**Rule:** User runs THIS skill once, gets finished copy once - no manual layer execution needed.

</key_behaviors>

<troubleshooting>
## Common Scenarios

### Scenario 1: User Provides Minimal Info (Just URL)
**Approach:**
- Fetch and analyze LP thoroughly
- Rely heavily on resource library for category knowledge
- Conduct comprehensive new research for brand-specific elements
- Flag medium/low confidence areas in brief
- Still proceed to final copy (with disclaimers)

**Message to user:**
"You provided just the URL, which is perfect. I'll analyze the landing page in detail and fill in gaps with research. Some areas may have medium confidence - I'll flag those for your review at Checkpoint #3."

---

### Scenario 2: User Provides Rich Context (URL + Examples + Assets)
**Approach:**
- Analyze all provided materials
- Less reliance on new research (materials provide context)
- Higher confidence across the board
- Faster execution

**Message to user:**
"Excellent context! With the URL, examples, and creative assets, I can build a high-confidence brief quickly. Expect strong validation across all areas."

---

### Scenario 3: No Reusable Research in Library (New Category)
**Approach:**
- Acknowledge this is new territory
- Conduct comprehensive research across all 4 tracks
- Save everything to library for future use
- Slightly longer execution time

**Message to user:**
"This is the first [category] offer I've analyzed, so I'll need to conduct comprehensive research. This will take a bit longer (~10 minutes), but future [category] offers will be much faster as I'll reuse this research."

---

### Scenario 4: User Corrects Determination at Checkpoint #1
**Approach:**
- Thank user for correction
- Update analysis based on feedback
- Re-present Checkpoint #1 for confirmation
- Proceed only after approval

**Example:**
User: "No, it's more like 25-40 age range, not 35-60"
Skill: "Got it! Updating target audience to 25-40. Here's the revised determination: [shows updated analysis]. Does this match better?"

---

### Scenario 5: User Wants Additional Research at Checkpoint #2
**Approach:**
- Add requested research to plan
- Update time estimate
- Proceed with expanded research

**Example:**
User: "Also research: competitor X specifically"
Skill: "Added competitor X to analysis. Updated research plan: [shows plan with X included]. Estimated time: ~7 minutes (was ~5). Proceed?"

---

### Scenario 6: User Requests Brief Changes at Checkpoint #3
**Approach:**
- Make requested edits to brief
- Re-save to library if structural changes
- Re-present updated brief
- Proceed only after approval

**Example:**
User: "Change: Primary pain is affordability, not complexity"
Skill: "Updated! Primary pain changed from complexity → affordability. Updated brief: [shows changes]. This affects copy recommendations (will emphasize cost savings over simplicity). Proceed?"

</troubleshooting>

<examples>
## Example Execution

See `examples/` folder for full conversation transcripts:
- **debt-relief-intake-example.md** - Complete debt relief offer workflow
- **solar-installation-intake.md** - Home services category workflow
- **medicare-supplement-brief.md** - Regulated category (health insurance)

Quick example:

**User:**
```
Offer URL: https://example-debt-relief.com
Example Listicles: https://2025.topdiscountsforseniors.com/default/
```

**Skill: Checkpoint #1**
```
ANALYSIS COMPLETE

Offer Classification:
- Category: Financial (Debt Settlement)
- Mechanism: Creditor negotiation
- Value Proposition: Reduce unsecured debt 30-50% in 24-48 months

Target Audience:
- Age: 35-60, $10K+ unsecured debt
- Primary Pain: Minimum payment trap, collection calls

Resource Library Check:
✓ Found: Debt relief research (updated 2 months ago)
✓ Found: Financial compliance rules (FTC)

Proceed?
```

**User:** Yes, proceed

**Skill: Checkpoint #2**
```
RESEARCH PLAN

REUSING:
- Debt relief psychology, compliance, competitor analysis
- Time savings: ~8 minutes

NEW RESEARCH:
1. Brand-specific differentiators
2. 2025 compliance updates

Estimated time: ~5 minutes

Proceed?
```

**User:** Yes

**Skill: Checkpoint #3**
```
OFFER BRIEF COMPLETE

[Full brief with all sections]

Confidence: HIGH
Recommendations: Lead with pain (collection calls), emphasize specificity

Proceed to copy generation?
```

**User:** Proceed

**Skill: Final Delivery**
```
[Automatically runs Layer 1 & 2]

COMPLETE! 5 COPY VARIATIONS READY:

1. Pain-Focused ("The Collection Call That Changed Everything")
2. Control-Focused ("Finally Track Your Debt In Real Time")
3. Logic-Focused ("The Math That Sets You Free")
4. Trust-Focused ("Your Personal Debt Coach Is Waiting")
5. Aspiration-Focused ("Imagine Life Without Debt Stress")

[Full copy for each variation]

Testing Recommendation: Start with Variation #2 (unique differentiator)

Ready to publish!
```

</examples>

<routing_logic>
## Skill Execution Flow

```
START
  ↓
Material Intake (parse user input)
  ↓
Fetch & Analyze (LP, examples, library check)
  ↓
CHECKPOINT #1: Present Initial Determination
  ├─ User approves → Continue
  └─ User corrects → Update & re-present
  ↓
CHECKPOINT #2: Present Research Plan
  ├─ User approves → Continue
  ├─ User adds items → Update plan & continue
  └─ User rejects → Revise plan & re-present
  ↓
Execute Research (4 parallel tracks)
  ↓
Generate Brief
  ↓
Save Findings to Library
  ↓
CHECKPOINT #3: Present Final Brief
  ├─ User approves → Continue
  └─ User requests changes → Edit & re-present
  ↓
AUTO-INVOKE Layer 1 (analyze-listicle-offers)
  ↓
AUTO-INVOKE Layer 2 (write-listicle-copy)
  ↓
DELIVER: Final Copy (5 variations + recommendations)
  ↓
END
```

**User touches:** 3 approval points
**Skill automation:** Everything else (including Layer 1 & 2 execution)

</routing_logic>

---

**Last Updated:** December 2025
**Version:** 1.0 (MVP)
