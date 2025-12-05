# Skill Standards Checklist

This is the authoritative list of standards ALL skills must meet.

---

## Structure Standards (STR)

| ID | Standard | Check | Auto-Fix |
|----|----------|-------|----------|
| STR-001 | `/{skill}-help` command | settings.json has command | Yes |
| STR-002 | `SELF_HEALING.md` file | File exists in skill dir | Yes |
| STR-003 | `/{skill}-feedback` command | settings.json has command | Yes |
| STR-004 | Entry file | `.claude/skills/{skill}.md` exists | Yes |
| STR-005 | Main workflow | `SKILL.md` exists | No |

---

## Behavior Standards (BHV)

| ID | Standard | Check | Auto-Fix |
|----|----------|-------|----------|
| BHV-001 | Setup detection | SKILL.md has setup section | Yes |
| BHV-002 | Auto-prompt for action | SKILL.md has prompt patterns | Yes |
| BHV-003 | First-use guidance | Intro/welcome section exists | Yes |
| BHV-004 | Error recovery | Error handling patterns | Yes |

---

## Documentation Standards (DOC)

| ID | Standard | Check | Auto-Fix |
|----|----------|-------|----------|
| DOC-001 | Command table | Help has markdown table | Yes |
| DOC-002 | Quick start | Getting started section | Yes |
| DOC-003 | How it works | Explanation section | Partial |
| DOC-004 | Troubleshooting | Common issues section | Yes |

---

## Quality Standards (QUA)

| ID | Standard | Check | Auto-Fix |
|----|----------|-------|----------|
| QUA-001 | Self-healing enabled | STR-002 + categories | Yes |
| QUA-002 | Feedback loop | STR-003 + process doc | Yes |
| QUA-003 | Audit trail | Healing Log section | Yes |
| QUA-004 | Cross-skill learning | Propagation mention | Yes |

---

## Summary

**Total: 17 standards (16 auto-fixable)**

---

## Changelog

| Date | Version | Change |
|------|---------|--------|
| 2025-12-05 | 1.0.0 | Initial standards |
