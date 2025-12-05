# Auto-Enforcement Rules

This document defines when and how skill standards are automatically enforced.

---

## Triggers

### 1. Skill Creation
When ANY new skill is created (via /heal-create or manually):
- Run full standards check
- Prompt for missing items
- Auto-fix what's possible

### 2. Skill Modification
When skill files are edited:
- Quick validation check
- Alert if standards broken

### 3. New Favorite Added
When a favorite is added to settings:
- Ask: "Should this be a standard for ALL skills?"
- If yes, add to STANDARDS_CHECKLIST.md

---

## Enforcement Flow

```
Skill Created/Modified
        ↓
   Standards Check
        ↓
  Missing Items? ──No──→ Done
        ↓ Yes
   Show Report
        ↓
  "[Fix All] [Fix Some] [Skip]"
        ↓
   Apply Fixes
        ↓
   Log to Audit
```

---

## Auto-Fix Templates

### Help Command Template
```json
"{skill}-help": {
  "description": "Show {skill} commands and help",
  "prompt": "Show help for {skill}. Display command table and usage."
}
```

### Feedback Command Template
```json
"{skill}-feedback": {
  "description": "Report issues to improve {skill}",
  "prompt": "Log feedback for {skill}. Read SELF_HEALING.md and capture VALUE LESSON."
}
```
