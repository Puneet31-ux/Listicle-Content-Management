---
name: master-copywriting
description: Global copywriting skill with optimized 7-pass workflow, credit-efficient processing, AI pattern removal, and self-healing value capture
skill_path: skills/master-copywriting/SKILL.md
auto_apply: true
favorite: true
version: 1.1.0
author: Bobby
---

# Master Copywriting Skill

## Overview

This skill creates high-converting, human-sounding copy through an iterative healing process. It applies automatically to all copy/content work at appropriate engagement levels.

## Commands

| Command | What It Does |
|---------|-------------|
| `/copy-write` | Generate new copy with optimized 7-pass workflow |
| `/copy-check` | Review existing copy with scorecard |
| `/copy-feedback` | Log feedback to improve system (self-healing) |
| `/copy-help` | Show full system help + next steps |

## How It Works

**Optimized Pass Flow (Credit-Efficient):**
1. Passes 1-2 run together during drafting (Structure + Value)
2. Pass 3 goes deep on AI pattern removal
3. PAUSE for user preview
4. Passes 4-7 only run if user wants more polish

**Automatic Behavior:**
- Light checks apply to all copy/content automatically
- Say "skip copy checks" to pause
- Say "full copy review" for deep analysis

**Self-Healing:**
- Every feedback session captures VALUE LESSONS
- Lessons logged with dates in SELF_HEALING.md
- System gets better with each use

## Files in This Skill

```
.claude/skills/master-copywriting/
├── SKILL.md                    # Main execution workflow
├── GLOBAL_BEHAVIOR.md          # Smart throttling rules
├── SELF_HEALING.md             # Feedback log + improvements
├── MASTER_COPYWRITING_SYSTEM.md # Full philosophy
├── references/
│   ├── ai-pattern-removal.md   # AI tells & fixes
│   ├── psychology-triggers.md  # Behavioral psychology
│   ├── headline-formulas.md    # Headline patterns
│   └── cta-patterns.md         # CTA best practices
└── workflows/
    └── write-listicle-copy.md  # Listicle-specific workflow
```

## Core Principle

**Great copy is never written in one pass. It's healed through multiple focused checks, each looking for ONE thing.**

## Quick Start

1. Run `/copy-help` to see full documentation
2. Run `/copy-write` to generate new copy
3. Run `/copy-check` to review existing copy
4. Run `/copy-feedback` when something doesn't work

## Sync Information

This skill is managed by the sync system:
- **Source of Truth:** User settings (`~/.claude/settings.json`)
- **Maintainer:** Bobby (approval required for changes)
- **Version Control:** Changes via PR, alerts on unauthorized edits
