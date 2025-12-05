# Example: How master-copywriting Uses Self-Healing

This document shows how the master-copywriting skill implements self-healing.

---

## Structure

```
.claude/skills/master-copywriting/
├── SKILL.md                    # Main workflow
├── GLOBAL_BEHAVIOR.md          # Auto-apply rules
├── SELF_HEALING.md             # ← Healing file
├── MASTER_COPYWRITING_SYSTEM.md
├── references/
│   ├── ai-pattern-removal.md
│   ├── psychology-triggers.md
│   ├── headline-formulas.md
│   └── cta-patterns.md
└── workflows/
    └── write-listicle-copy.md
```

---

## Healing Categories (Skill-Specific)

master-copywriting uses these custom categories:

| Category | Description |
|----------|-------------|
| AI Patterns | Em dashes, cliches, robotic tone |
| Length-Format | Word count, structure issues |
| Tone-Voice | Conversational vs formal |
| Missing Elements | CTAs, headlines, hooks |
| False Positives | Flagging valid content |

---

## Example VALUE LESSONS

### AI Patterns Lesson

```markdown
<!-- HEALING_UPDATE
Date: 2025-12-05
Skill: master-copywriting
Issue: Output contained 5 em dashes, felt AI-generated
Lesson: Explicitly count em dashes, enforce max of 2 per piece
Category: AI Patterns
Source: User feedback
Severity: Important
-->

**Em Dash Limit Rule:**
- Count em dashes (—) in output
- Maximum allowed: 2 per piece
- If over limit: Replace with periods, commas, or restructure
- Check applies in Pass 3 (AI Pattern Removal)

<!-- /HEALING_UPDATE -->
```

### Cliche Phrase Lesson

```markdown
<!-- HEALING_UPDATE
Date: 2025-12-05
Skill: master-copywriting
Issue: Copy started with "Let's dive in" - obvious AI tell
Lesson: Maintain explicit ban list of AI cliche phrases
Category: AI Patterns
Source: User feedback
Severity: Important
-->

**Banned Phrases (Never Use):**
- "Let's dive in"
- "It's important to note"
- "In conclusion"
- "At the end of the day"
- "That being said"
- "First and foremost"

Check these in Pass 3 before output.

<!-- /HEALING_UPDATE -->
```

---

## Feedback Command Implementation

In settings.json:

```json
"copy-feedback": {
  "description": "Log feedback to improve the copywriting system (self-healing)",
  "prompt": "I have feedback to improve the copywriting system. Read .claude/skills/master-copywriting/SELF_HEALING.md.\n\n## FEEDBACK PROCESS\n\n### Step 1: Gather Feedback\nAsk: 'What didn't work or needs improvement?'\n\n### Step 2: Extract VALUE LESSON\nFrom the feedback, identify:\n- The specific issue\n- Why it happened (gap in system)\n- The lesson learned\n- How to prevent it next time\n\n### Step 3: Categorize\n- AI Patterns / Length-Format / Tone-Voice / Missing Elements / False Positives\n\n### Step 4: Propose Fix\nShow exactly:\n- Which file to update\n- What to add (the VALUE LESSON)\n- The HEALING_UPDATE markers that will wrap it\n\n### Step 5: Apply (Auto-Approved)\nUnless user says stop:\n- Add the fix with HEALING_UPDATE markers including date\n- Add entry to HEALING_LOG section\n- Confirm: 'Value lesson captured. Future copy will be better.'"
}
```

---

## Cross-Skill Propagation Example

The "em dash limit" lesson could apply to other content skills:

```markdown
<!-- HEALING_UPDATE
Date: 2025-12-05
Skill: blog-writing
Issue: Em dash overuse (same as copywriting)
Lesson: Limit em dashes to 2 per piece
Category: AI Patterns
Source: Cross-skill from master-copywriting
Original Date: 2025-12-05
Severity: Important
-->

Apply same em dash limit as master-copywriting:
- Max 2 em dashes per piece
- Check before output

<!-- /HEALING_UPDATE -->
```

---

## Audit Trail Entry

When healing is applied:

```markdown
| Date | Time | Skill | Action | Category | Severity | Details |
|------|------|-------|--------|----------|----------|---------|
| 2025-12-05 | 14:30 | master-copywriting | ADD | AI Patterns | Important | Em dash limit (max 2) |
| 2025-12-05 | 14:35 | master-copywriting | ADD | AI Patterns | Important | Cliche phrase ban list |
| 2025-12-05 | 15:00 | blog-writing | PROPAGATE | AI Patterns | Important | Em dash limit from copywriting |
```

---

## Key Takeaways

1. **Custom Categories**: master-copywriting defines skill-specific categories
2. **Specific Lessons**: Each lesson is actionable and checkable
3. **Markers Used**: All updates wrapped in HEALING_UPDATE
4. **Audit Trail**: Changes logged for tracking
5. **Cross-Skill Ready**: Lessons can propagate to related skills

This is the pattern all skills should follow.
