# Skill Standards - Main Workflow

## Purpose

Ensure ALL skills meet foundational quality standards automatically. No skill should be created without these essentials.

---

## Command Workflows

### /standards-check

**When invoked:**

1. Ask: "Which skill to check?" (or check all)

2. For each skill, validate against STANDARDS_CHECKLIST.md:
   ```
   Checking {skill-name}...

   STRUCTURE
   ├─ [✓] /{skill}-help command exists
   ├─ [✗] SELF_HEALING.md missing
   ├─ [✓] /{skill}-feedback command exists
   └─ [✓] Entry file exists

   BEHAVIORS
   ├─ [✗] No setup detection found
   ├─ [✓] Auto-prompt for dependencies
   └─ [✓] First-use guidance present

   DOCUMENTATION
   ├─ [✓] Command table in help
   ├─ [✗] Quick start section missing
   └─ [✓] Troubleshooting tips present

   Score: 7/10 standards met
   ```

3. Offer: "[Fix Now] [Show Details] [Skip]"

---

### /standards-fix

**When invoked:**

1. Run /standards-check first to identify issues

2. For each missing standard:
   ```
   Missing: SELF_HEALING.md

   I can auto-generate this based on the skill type.
   The skill appears to be: {content/code/analysis/automation}

   [Generate Now] [Customize First] [Skip]
   ```

3. Apply fixes with appropriate markers:
   - Generate SELF_HEALING.md using self-healing templates
   - Add missing commands to settings.json
   - Create help sections if missing
   - Add setup detection if applicable

4. Confirm:
   ```
   ✅ Fixed {skill-name}!

   Added:
   - SELF_HEALING.md (5 custom categories)
   - /{skill}-feedback command
   - Quick start section

   Now at: 10/10 standards met
   ```

---

### /standards-list

**When invoked:**

Display all current standards:

```
═══════════════════════════════════════════════════════
              SKILL STANDARDS CHECKLIST
═══════════════════════════════════════════════════════

📋 STRUCTURE (Required Files & Commands)
├─ /{skill}-help command
├─ SELF_HEALING.md file
├─ /{skill}-feedback command
├─ Entry file (.claude/skills/{skill}.md)
└─ Main workflow file (SKILL.md)

🔄 BEHAVIORS (Auto-Triggers)
├─ Setup detection (check dependencies on first use)
├─ Auto-prompt when action needed
├─ First-use guidance (welcome message)
└─ Error recovery suggestions

📖 DOCUMENTATION (User Guidance)
├─ Command table (| Command | Description |)
├─ Quick start section
├─ How it works explanation
└─ Troubleshooting tips

🏥 QUALITY (Continuous Improvement)
├─ Self-healing enabled
├─ Feedback loop active
├─ Audit trail logging
└─ Cross-skill learning ready

Total: 17 standards across 4 categories
```

---

### /standards-add

**When invoked:**

1. Ask:
   ```
   Propose a new standard!

   What should ALL skills include?

   Category: [Structure] [Behaviors] [Documentation] [Quality]
   Standard: _______________
   Why it matters: _______________
   ```

2. Validate:
   - Is this universal (applies to all skills)?
   - Does it overlap with existing standards?
   - Is it enforceable/checkable?

3. If approved:
   - Add to STANDARDS_CHECKLIST.md
   - Add to AUTO_ENFORCE.md
   - Log as VALUE LESSON
   - Notify: "New standard added! Existing skills may need updates."

4. Offer to check existing skills against new standard

---

### /standards-feedback

**When invoked:**

1. Ask: "What's wrong with the current standards?"

2. Gather feedback:
   - Standard too strict?
   - Standard missing?
   - Standard unclear?
   - False positive (flagged something valid)?

3. Extract VALUE LESSON:
   ```
   Issue: {what went wrong}
   Lesson: {what we learned}
   Category: {Standards | Enforcement | Documentation | False Positive}
   ```

4. Apply to SELF_HEALING.md with markers

5. Consider: "Should this change how we check skills?"

---

### /standards-help

**When invoked:**

Display complete help:

```
SKILL STANDARDS FRAMEWORK
=========================

Purpose: Ensure ALL skills meet quality standards automatically.

Commands:
| Command | What It Does |
|---------|-------------|
| /standards-check | Validate a skill against standards |
| /standards-fix | Auto-fix missing standards |
| /standards-list | Show all current standards |
| /standards-add | Propose a new standard |
| /standards-feedback | Report issues |
| /standards-help | Show this help |

How It Works:
1. When ANY skill is created → standards-check runs automatically
2. Missing standards trigger prompts → "Add this? [Yes/No]"
3. /standards-fix can batch-fix multiple skills
4. Standards themselves are self-healing

The 4 Categories:
- STRUCTURE: Required files and commands
- BEHAVIORS: Auto-prompts and setup detection
- DOCUMENTATION: Help and guidance
- QUALITY: Self-healing and improvement

Adding New Standards:
When you add a new favorite that's "foundational", you'll be asked:
"Should this be a standard for ALL skills?"
If yes, it gets added to the enforcement checklist.

Files:
.claude/skills/skill-standards/
├── SKILL.md (this file)
├── STANDARDS_CHECKLIST.md
├── SELF_HEALING.md
└── AUTO_ENFORCE.md
```

---

## Self-Healing Integration

### Healing Categories for This Skill

| Category | Description |
|----------|-------------|
| Standards | A standard is wrong or needs updating |
| Enforcement | Detection/prompting isn't working right |
| Documentation | Help or guidance is unclear |
| False Positives | Flagged something that was actually fine |

### Feedback Process

1. User provides feedback via `/standards-feedback`
2. Extract VALUE LESSON using standard format
3. Add to SELF_HEALING.md with HEALING_UPDATE markers
4. Log to skill-standards AUDIT section
5. Propagate to AUTO_ENFORCE.md if enforcement-related

---

## Integration Points

- **Self-Healing Framework:** Uses `.claude/skills/self-healing/CORE.md`
- **Skill Creation:** Integrates with `/heal-create`
- **Favorites System:** Prompts when new favorites could be standards
- **Sync System:** Synced as a favorite to all linked repos
