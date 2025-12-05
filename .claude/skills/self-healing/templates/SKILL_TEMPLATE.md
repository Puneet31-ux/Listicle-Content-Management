# {SKILL_NAME} Skill Template

**Copy this template when creating a new self-healing skill.**

Replace all `{PLACEHOLDERS}` with your skill's values.

---

## File: .claude/skills/{skill-name}.md

```markdown
---
name: {skill-name}
description: {Brief description of what this skill does}
skill_path: skills/{skill-name}/SKILL.md
auto_apply: {true|false}
favorite: {true|false}
version: 1.0.0
author: {Your Name}
---

# {Skill Name} Skill

## Overview

{Describe what this skill does and why it exists.}

## Commands

| Command | What It Does |
|---------|-------------|
| `/{skill}-{action1}` | {Description} |
| `/{skill}-{action2}` | {Description} |
| `/{skill}-feedback` | Log feedback to improve the system |
| `/{skill}-help` | Show help and documentation |

## How It Works

{Explain the core workflow.}

## Self-Healing

This skill uses the self-healing framework. Feedback makes it better over time.

- Use `/{skill}-feedback` to report issues
- VALUE LESSONS are captured in `SELF_HEALING.md`
- All changes are logged in the audit trail

## Files in This Skill

\`\`\`
.claude/skills/{skill-name}/
├── SKILL.md                    # Main execution workflow
├── SELF_HEALING.md             # Captured VALUE LESSONS
└── {other files as needed}
\`\`\`

## Sync Information

This skill is managed by the sync system:
- **Source of Truth:** User settings
- **Maintainer:** {Maintainer Name}
- **Version Control:** Changes via PR
```

---

## File: .claude/skills/{skill-name}/SKILL.md

```markdown
# {Skill Name} - Main Workflow

## Purpose

{Describe the purpose of this skill.}

---

## Command Workflows

### /{skill}-{action1}

**When invoked:**

1. {Step 1}
2. {Step 2}
3. {Step 3}

---

### /{skill}-feedback

**When invoked:**

1. Ask: "What didn't work or needs improvement?"

2. Extract VALUE LESSON:
   - Issue: {what went wrong}
   - Lesson: {what we learned}
   - Category: {category}

3. Apply to SELF_HEALING.md with markers

4. Confirm: "VALUE LESSON captured. Future behavior improved."

---

## Self-Healing Integration

### Healing Categories for This Skill

| Category | Description |
|----------|-------------|
| {Category 1} | {When to use} |
| {Category 2} | {When to use} |
| Output Quality | General quality issues |
| False Positives | Over-corrections |

### Feedback Process

1. User provides feedback via `/{skill}-feedback`
2. Extract VALUE LESSON using standard format
3. Add to SELF_HEALING.md with HEALING_UPDATE markers
4. Log to self-healing/AUDIT_LOG.md
5. Confirm to user

---

## Integration Points

- **Self-Healing Framework:** Uses `.claude/skills/self-healing/CORE.md`
- **Audit Trail:** Logs to `.claude/skills/self-healing/AUDIT_LOG.md`
- **Cross-Skill Learning:** Lessons can propagate if universal
```

---

## File: .claude/skills/{skill-name}/SELF_HEALING.md

```markdown
# {Skill Name} - Self-Healing Log

This file captures VALUE LESSONS from user feedback.

---

## Healing Categories

| Category | Description |
|----------|-------------|
| {Category 1} | {Description} |
| {Category 2} | {Description} |
| Output Quality | General quality issues |
| False Positives | Flagging non-issues |

---

## VALUE LESSONS

### {Category 1}

<!-- Add lessons here as they are captured -->

### {Category 2}

<!-- Add lessons here as they are captured -->

### Output Quality

<!-- Add lessons here as they are captured -->

### False Positives

<!-- Add lessons here as they are captured -->

---

## Healing Log

| Date | Category | Issue | Fix Applied |
|------|----------|-------|-------------|
| {date} | {category} | {issue} | {fix} |

---

<!--
VALUE LESSON TEMPLATE:

<!-- HEALING_UPDATE
Date: YYYY-MM-DD
Skill: {skill-name}
Issue: {what went wrong}
Lesson: {what we learned}
Category: {category}
Source: User feedback
Severity: Important
- ->

{The actual fix or rule}

<!-- /HEALING_UPDATE - ->
-->
```

---

## Checklist for New Skills

- [ ] Create skill directory: `.claude/skills/{skill-name}/`
- [ ] Create entry file: `.claude/skills/{skill-name}.md`
- [ ] Create main workflow: `.claude/skills/{skill-name}/SKILL.md`
- [ ] Create healing file: `.claude/skills/{skill-name}/SELF_HEALING.md`
- [ ] Define healing categories specific to this skill
- [ ] Add `/{skill}-feedback` command
- [ ] Add to sync-manifest.json
- [ ] Add commands to settings.json
- [ ] Test the feedback loop

---

## Quick Start

1. Copy this template
2. Replace all `{placeholders}`
3. Customize for your skill
4. Add to sync system
5. Start using and healing!
