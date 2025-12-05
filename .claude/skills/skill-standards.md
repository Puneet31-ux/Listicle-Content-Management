---
name: skill-standards
description: Auto-enforced standards for ALL skills - ensures consistent quality, self-healing, help commands, and setup prompts
skill_path: skills/skill-standards/SKILL.md
auto_apply: true
favorite: true
isFoundational: true
applyToNewSkills: true
version: 1.0.0
author: Bobby
---

# Skill Standards - Foundational Framework

## Overview

This skill ensures ALL other skills meet quality standards automatically. When ANY skill is created or modified, this framework validates and enforces required components.

## Commands

| Command | What It Does |
|---------|-------------|
| `/standards-check` | Validate a skill against all standards |
| `/standards-fix` | Auto-fix missing standards in a skill |
| `/standards-list` | Show all current standards |
| `/standards-add` | Propose a new standard |
| `/standards-feedback` | Report issues to improve standards |
| `/standards-help` | Show help and documentation |

## How It Works

### Always Active (systemPromptAddition)
The `skill-standards-enforce` systemPromptAddition runs automatically when:
- A new skill is created (via /heal-create or manually)
- A skill is modified
- A new favorite is added

### What Gets Checked
1. **Structure Standards** - Required files and commands
2. **Behavior Standards** - Auto-prompts, setup detection
3. **Documentation Standards** - Help commands, quick start
4. **Quality Standards** - Self-healing enabled

### Self-Healing
This skill uses self-healing. When standards are missed or need updating:
- Use `/standards-feedback` to report issues
- VALUE LESSONS are captured and applied
- Standards evolve based on real usage

## Files in This Skill

```
.claude/skills/skill-standards/
├── SKILL.md                    # Main workflow
├── STANDARDS_CHECKLIST.md      # All required standards
├── SELF_HEALING.md             # VALUE LESSONS
└── AUTO_ENFORCE.md             # Enforcement rules
```

## Sync Information

This skill is managed by the sync system:
- **Source of Truth:** User settings
- **Favorite:** Yes (auto-sync to new repos)
- **Foundational:** Yes (applies to all skills)
