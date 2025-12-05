# Drop-In Healing Section

**Copy this section into any skill's SKILL.md to make it self-healing.**

---

## Self-Healing Integration

This skill uses the universal self-healing framework.

### How to Give Feedback

Use `/{skill-name}-feedback` or `/heal-log` to report issues.

### What Happens When You Give Feedback

1. **Extract VALUE LESSON**
   - Identify the specific issue
   - Determine root cause
   - Formulate the fix

2. **Apply Fix**
   - Add to SELF_HEALING.md with markers
   - Log to audit trail

3. **Improve Future Behavior**
   - System learns from the lesson
   - Same issue won't happen again

### Healing Categories

| Category | Use When |
|----------|----------|
| Output Quality | Result doesn't meet expectations |
| Format/Structure | Wrong format or organization |
| Tone/Voice | Wrong style or personality |
| Logic/Flow | Reasoning or sequence issues |
| Missing Elements | Expected content not included |
| False Positives | Flagged something that wasn't wrong |
| AI Patterns | Detectable AI writing patterns |

### VALUE LESSON Format

```markdown
<!-- HEALING_UPDATE
Date: {today}
Skill: {this-skill}
Issue: {what went wrong}
Lesson: {what we learned}
Category: {category}
Source: User feedback
Severity: {Critical|Important|Minor}
-->

{The actual fix, rule, or behavior change}

<!-- /HEALING_UPDATE -->
```

### Feedback Command Template

Add this command to your skill:

```markdown
### /{skill-name}-feedback

**When invoked:**

1. Ask: "What didn't work or needs improvement?"

2. Listen and extract:
   - What specifically went wrong?
   - What was expected?
   - How severe is this?

3. Extract VALUE LESSON:
   \`\`\`
   Issue: {specific problem}
   Root Cause: {why it happened}
   Lesson: {what to change}
   Category: {healing category}
   Severity: {Critical|Important|Minor}
   \`\`\`

4. Show proposed fix:
   \`\`\`
   I'll add this to SELF_HEALING.md:

   {the fix}

   Apply this fix? [Yes] [Edit first] [Cancel]
   \`\`\`

5. If approved:
   - Add with HEALING_UPDATE markers
   - Log to self-healing/AUDIT_LOG.md
   - Confirm: "VALUE LESSON captured!"

6. Offer:
   - "Should this apply to other skills too?"
   - If yes, propagate with cross-skill markers
```

---

## Quick Integration Steps

1. **Add to SKILL.md:** Copy the "Self-Healing Integration" section above

2. **Create SELF_HEALING.md:** Use the template from SKILL_TEMPLATE.md

3. **Add feedback command:** Include `/{skill}-feedback` in settings.json

4. **Define categories:** Customize categories for your skill's domain

5. **Test:** Give feedback and verify it's captured correctly

---

## Example: Adding to Existing Skill

Before:
```markdown
# My Skill - Main Workflow

## Commands
- /my-skill-do - Does the thing
```

After:
```markdown
# My Skill - Main Workflow

## Commands
- /my-skill-do - Does the thing
- /my-skill-feedback - Report issues to improve the skill

## Self-Healing Integration

This skill uses the universal self-healing framework.
[... rest of healing section ...]
```
