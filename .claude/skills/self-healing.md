---
name: self-healing
description: Universal self-healing framework for all skills - captures VALUE LESSONS, maintains audit trails, and ensures continuous improvement
skill_path: skills/self-healing/SKILL.md
auto_apply: true
favorite: true
version: 1.0.0
author: Bobby
---

# Self-Healing Skill Framework

## Overview

This is the **meta-skill** that powers self-healing in ALL other skills. Every skill you create should inherit from this framework.

## Commands

| Command | What It Does |
|---------|-------------|
| `/heal-log` | Log feedback to any skill's healing system |
| `/heal-status` | Show healing stats across all skills |
| `/heal-review` | Review recent VALUE LESSONS and their impact |
| `/heal-create` | Create a new self-healing skill from template |
| `/heal-help` | Show this help + healing philosophy |

## Core Principle

**Every skill should get better with use. Feedback isn't a bug report - it's a gift that makes the system smarter.**

## How It Works

1. **VALUE LESSON Capture**: When something doesn't work, extract the lesson
2. **HEALING_UPDATE Markers**: Wrap changes with date/source/issue for tracking
3. **Audit Trail**: Every change is logged and reversible
4. **Cross-Skill Learning**: Lessons from one skill can improve others

## The Healing Cycle

```
User Feedback → Extract Lesson → Categorize → Apply Fix → Log Entry → Verify
      ↑                                                              ↓
      └──────────────── Continuous Improvement ←─────────────────────┘
```

## Files in This Skill

```
.claude/skills/self-healing/
├── SKILL.md                    # Main execution workflow
├── CORE.md                     # Universal healing patterns
├── AUDIT_LOG.md                # Cross-skill healing history
├── templates/
│   ├── SKILL_TEMPLATE.md       # Template for new self-healing skills
│   └── HEALING_SECTION.md      # Drop-in healing section for any skill
└── examples/
    └── master-copywriting.md   # Example: how copywriting uses healing
```

## For Skill Authors

When creating ANY new skill:

1. Use `/heal-create` to generate from template
2. Include the HEALING_SECTION.md in your skill
3. Define your skill's healing categories
4. Your skill is now self-healing!

## Sync Information

This skill is managed by the sync system:
- **Source of Truth:** User settings (`~/.claude/settings.json`)
- **Maintainer:** Bobby (approval required for changes)
- **Auto-Apply:** Yes - healing checks run on all skill feedback
