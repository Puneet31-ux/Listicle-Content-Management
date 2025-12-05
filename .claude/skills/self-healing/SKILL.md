# Self-Healing Skill - Main Workflow

## Purpose

This skill provides the universal framework for self-healing across ALL skills. It defines how to capture feedback, extract lessons, apply fixes, and maintain audit trails.

---

## Command Workflows

### /heal-log - Log Feedback to Any Skill

**When invoked:**

1. **Identify Target Skill**
   ```
   Which skill needs healing?

   Recent skills used:
   - master-copywriting (last used: today)
   - [other skills...]

   Or type skill name:
   ```

2. **Gather Feedback**
   - What didn't work?
   - What was expected?
   - What actually happened?

3. **Extract VALUE LESSON**
   ```
   VALUE LESSON EXTRACTED:

   Issue: [specific problem]
   Root Cause: [why it happened]
   Lesson: [what we learned]
   Prevention: [how to avoid next time]
   Category: [AI Patterns / Format / Tone / Logic / Missing]
   ```

4. **Apply to Target Skill**
   - Find the skill's SELF_HEALING.md (or equivalent)
   - Add HEALING_UPDATE with markers
   - Log to AUDIT_LOG.md

5. **Confirm**
   ```
   ✅ Healing applied to {skill-name}

   Added to: .claude/skills/{skill}/SELF_HEALING.md
   Category: {category}

   This lesson will improve future {skill} behavior.
   ```

---

### /heal-status - Show Healing Stats

**Display:**

```
═══════════════════════════════════════════════════════
              SELF-HEALING STATUS DASHBOARD
═══════════════════════════════════════════════════════

📊 OVERALL STATS
├─ Total VALUE LESSONS captured: X
├─ Skills with healing enabled: Y
├─ Lessons this week: Z
└─ Most healed skill: {skill-name}

🏥 BY SKILL
├─ master-copywriting
│  ├─ Lessons: 5
│  ├─ Last healed: 2025-12-05
│  └─ Top category: AI Patterns
│
├─ {other-skill}
│  ├─ Lessons: 3
│  └─ Last healed: 2025-12-04

📈 HEALING TRENDS
├─ Most common issue type: {type}
├─ Average lessons per skill: X
└─ Skills needing attention: {list}

[View Details] [Review Lessons] [Export Report]
```

---

### /heal-review - Review Recent VALUE LESSONS

**Display:**

```
═══════════════════════════════════════════════════════
              RECENT VALUE LESSONS
═══════════════════════════════════════════════════════

📝 LESSON #1 (2025-12-05)
├─ Skill: master-copywriting
├─ Issue: Too many em dashes in output
├─ Lesson: Count em dashes explicitly, max 2 per piece
├─ Category: AI Patterns
└─ Impact: ✅ No em dash issues since

📝 LESSON #2 (2025-12-04)
├─ Skill: master-copywriting
├─ Issue: "Let's dive in" appearing in copy
├─ Lesson: Add to explicit ban list, check before output
├─ Category: AI Patterns
└─ Impact: ✅ Phrase eliminated

[Apply to other skills] [Archive] [Revert]
```

---

### /heal-create - Create New Self-Healing Skill

**Workflow:**

1. **Gather Skill Info**
   ```
   Let's create a new self-healing skill!

   Skill name: _______________
   Description: _______________
   Main purpose: _______________
   ```

2. **Generate Structure**
   - Create skill directory
   - Copy SKILL_TEMPLATE.md
   - Add HEALING_SECTION.md
   - Create empty SELF_HEALING.md with structure

3. **Define Healing Categories**
   ```
   What types of issues might this skill have?

   Suggested categories:
   [ ] Output Quality
   [ ] Format/Structure
   [ ] Tone/Voice
   [ ] Logic/Flow
   [ ] Missing Elements
   [ ] False Positives
   [ ] Performance

   Custom categories: _______________
   ```

4. **Initialize**
   - Add to sync-manifest
   - Add commands to settings
   - Create initial SELF_HEALING.md

5. **Confirm**
   ```
   ✅ Self-healing skill created!

   Location: .claude/skills/{skill-name}/
   Commands: /{skill}-*
   Healing: Enabled with {N} categories

   Next: Try your new skill and use /heal-log for feedback!
   ```

---

## VALUE LESSON Format

Every healing update MUST use this format:

```markdown
<!-- HEALING_UPDATE
Date: YYYY-MM-DD
Skill: {skill-name}
Issue: {what went wrong}
Lesson: {what we learned}
Category: {category}
Source: {User feedback | Auto-detected | Cross-skill}
Severity: {Critical | Important | Minor}
-->

{The actual fix, rule, or improvement}

<!-- /HEALING_UPDATE -->
```

---

## Cross-Skill Learning

When a lesson applies to multiple skills:

1. **Identify Pattern**
   - Is this issue skill-specific or universal?
   - Could other skills benefit?

2. **Propagate if Universal**
   - Log to AUDIT_LOG.md with cross-skill flag
   - Suggest application to related skills
   - User confirms which skills to update

3. **Example: AI Pattern Removal**
   - Lesson learned in copywriting: "Ban 'it's important to note'"
   - Applies to: All content-generating skills
   - Propagate to: blog-writing, email-writing, etc.

---

## Healing Categories (Universal)

These categories work for most skills:

| Category | Description | Example |
|----------|-------------|---------|
| **Output Quality** | Result not meeting standards | "Headlines too long" |
| **Format/Structure** | Wrong format or organization | "Missing sections" |
| **Tone/Voice** | Wrong tone or style | "Too formal" |
| **Logic/Flow** | Reasoning or sequence issues | "Steps out of order" |
| **Missing Elements** | Something expected wasn't included | "No CTA" |
| **False Positives** | Flagging things that aren't issues | "Flagged valid em dash" |
| **AI Patterns** | Detectable AI writing patterns | "Em dash overuse" |
| **Performance** | Speed or efficiency issues | "Too many passes" |

---

## Integration with Other Skills

### For Skill Authors

Add this to your skill's main file:

```markdown
## Self-Healing

This skill uses the self-healing framework.

### Feedback
Use `/heal-log` or `/{skill}-feedback` to report issues.

### Healing File
See `SELF_HEALING.md` for captured lessons.

### Categories
- {Your category 1}
- {Your category 2}
- {etc.}
```

### Required Files

Every self-healing skill needs:

1. **SELF_HEALING.md** - Captures VALUE LESSONS
2. **Feedback command** - Way to submit feedback
3. **Category definitions** - What types of issues to track

---

## Audit Trail

All healing actions are logged to `.claude/skills/self-healing/AUDIT_LOG.md`:

```markdown
## Healing Audit Log

### 2025-12-05

| Time | Skill | Action | Category | Details |
|------|-------|--------|----------|---------|
| 14:30 | master-copywriting | ADD | AI Patterns | Em dash limit rule |
| 12:15 | master-copywriting | ADD | Tone | Conversational check |

### 2025-12-04

| Time | Skill | Action | Category | Details |
|------|-------|--------|----------|---------|
| 16:45 | master-copywriting | ADD | AI Patterns | Cliche phrase list |
```

---

## The Healing Philosophy

1. **Feedback is a gift** - Every piece of feedback makes the system better
2. **Capture immediately** - Don't let lessons slip away
3. **Be specific** - Vague lessons don't help
4. **Track impact** - Verify fixes actually work
5. **Share across skills** - Universal lessons help everyone
6. **Audit everything** - Changes should be reversible
7. **Heal the healer** - This skill should also self-heal!
