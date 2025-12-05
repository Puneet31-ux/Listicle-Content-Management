# Self-Healing Core Patterns

## Universal Healing Rules

These patterns apply to ALL self-healing skills.

---

## The VALUE LESSON Extraction Process

When feedback is received, follow this exact process:

### Step 1: Acknowledge
```
"Thank you for that feedback. Let me extract the VALUE LESSON."
```

### Step 2: Ask Clarifying Questions (if needed)
- What specifically didn't work?
- What did you expect instead?
- How important is this fix? (Critical/Important/Minor)

### Step 3: Extract Components

| Component | Question to Answer |
|-----------|-------------------|
| **Issue** | What exactly went wrong? |
| **Root Cause** | Why did the system do this? |
| **Lesson** | What should change? |
| **Prevention** | How do we stop this happening again? |
| **Category** | What type of issue is this? |
| **Severity** | How bad is this problem? |

### Step 4: Formulate the Fix

The fix should be:
- **Specific** - Not vague or general
- **Actionable** - Something the system can check for
- **Testable** - Can verify it works
- **Reversible** - Can undo if wrong

### Step 5: Apply with Markers

```markdown
<!-- HEALING_UPDATE
Date: {today}
Skill: {skill-name}
Issue: {specific issue}
Lesson: {what we learned}
Category: {category}
Source: User feedback
Severity: {Critical|Important|Minor}
-->

{THE ACTUAL FIX - a rule, check, pattern, or behavior change}

<!-- /HEALING_UPDATE -->
```

### Step 6: Log to Audit Trail

Add entry to AUDIT_LOG.md with timestamp.

### Step 7: Confirm

```
✅ VALUE LESSON captured!

Issue: {issue}
Fix: {what was added}
Location: {file path}

This will improve future behavior.
```

---

## Healing Categories (Standard)

Use these unless skill-specific categories are defined:

### Output Quality
- Result doesn't meet expectations
- Quality issues in deliverable
- Mistakes in output

### Format/Structure
- Wrong format used
- Missing sections
- Poor organization
- Incorrect structure

### Tone/Voice
- Too formal/informal
- Wrong personality
- Inconsistent voice
- Doesn't match brand

### Logic/Flow
- Steps out of order
- Reasoning errors
- Missing logic
- Contradictions

### Missing Elements
- Expected content not included
- Skipped requirements
- Incomplete output

### False Positives
- Flagged something that wasn't an issue
- Over-corrected
- Unnecessary changes

### AI Patterns
- Detectable AI writing patterns
- Em dash overuse
- Cliche phrases
- Robotic tone

### Performance
- Too slow
- Too many steps
- Inefficient process
- Resource heavy

---

## Severity Levels

### Critical
- System unusable
- Major errors
- Must fix immediately
- Blocks workflow

### Important
- Noticeable issue
- Affects quality
- Should fix soon
- User complained

### Minor
- Small annoyance
- Nice to have
- Low priority
- Edge case

---

## Cross-Skill Learning Rules

### When to Propagate

A lesson should propagate to other skills when:

1. **Universal Pattern** - Applies to all content generation
   - Example: "Never use 'it's important to note'"

2. **Shared Functionality** - Multiple skills do similar things
   - Example: All skills that write headlines

3. **Common Mistake** - Likely to happen in other contexts
   - Example: Em dash overuse

### How to Propagate

1. **Identify affected skills**
   - Which other skills might have this issue?

2. **Check if already fixed**
   - Don't duplicate existing fixes

3. **Adapt the lesson**
   - May need skill-specific wording

4. **Apply with cross-skill marker**
   ```markdown
   <!-- HEALING_UPDATE
   Date: {today}
   Skill: {this-skill}
   Issue: {issue}
   Lesson: {lesson}
   Category: {category}
   Source: Cross-skill from {original-skill}
   Original Date: {original date}
   Severity: {severity}
   -->
   ```

5. **Log propagation**
   - Note in AUDIT_LOG.md that lesson was propagated

---

## The Healing Feedback Loop

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   User Feedback                                         │
│        │                                                │
│        ▼                                                │
│   ┌─────────────┐                                       │
│   │   Extract   │                                       │
│   │   VALUE     │                                       │
│   │   LESSON    │                                       │
│   └──────┬──────┘                                       │
│          │                                              │
│          ▼                                              │
│   ┌─────────────┐    ┌─────────────┐                   │
│   │  Categorize │───▶│   Apply     │                   │
│   │             │    │   Fix       │                   │
│   └─────────────┘    └──────┬──────┘                   │
│                             │                           │
│          ┌──────────────────┴──────────────────┐       │
│          │                                      │       │
│          ▼                                      ▼       │
│   ┌─────────────┐                       ┌─────────────┐│
│   │   Log to    │                       │  Propagate  ││
│   │   Audit     │                       │  to Other   ││
│   │   Trail     │                       │  Skills?    ││
│   └─────────────┘                       └─────────────┘│
│          │                                      │       │
│          └──────────────────┬───────────────────┘       │
│                             │                           │
│                             ▼                           │
│                      ┌─────────────┐                    │
│                      │   Verify    │                    │
│                      │   Fix       │                    │
│                      │   Works     │                    │
│                      └──────┬──────┘                    │
│                             │                           │
│                             ▼                           │
│                      Better Future                      │
│                      Behavior                           │
│                             │                           │
│                             └────────────▶ Loop ────────┘
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Healing Anti-Patterns

### DON'T Do These:

1. **Vague Lessons**
   - Bad: "Be better at writing"
   - Good: "Check headline length, max 80 chars"

2. **Unactionable Fixes**
   - Bad: "Try harder"
   - Good: "Add explicit check for X before Y"

3. **Over-Corrections**
   - Bad: Ban all em dashes
   - Good: Limit to 2 per piece

4. **Missing Context**
   - Bad: Just the rule, no explanation
   - Good: Rule + why + when it applies

5. **No Audit Trail**
   - Bad: Change file without markers
   - Good: Always use HEALING_UPDATE markers

6. **Forgetting to Verify**
   - Bad: Apply fix, never check if it works
   - Good: Track impact, adjust if needed

---

## Healing This Skill

Yes, the self-healing skill should also self-heal!

If the healing process itself has issues:
1. Use `/heal-log` targeting `self-healing`
2. Extract the meta-lesson
3. Apply to CORE.md or SKILL.md
4. The healer gets healed

---

## Quick Reference

### Marker Template
```markdown
<!-- HEALING_UPDATE
Date: YYYY-MM-DD
Skill: skill-name
Issue: what went wrong
Lesson: what we learned
Category: category-name
Source: User feedback | Auto-detected | Cross-skill
Severity: Critical | Important | Minor
-->

THE FIX GOES HERE

<!-- /HEALING_UPDATE -->
```

### Audit Log Entry
```markdown
| Time | Skill | Action | Category | Details |
|------|-------|--------|----------|---------|
| HH:MM | skill-name | ADD/UPDATE/REMOVE | category | brief description |
```

### Confirmation Message
```
✅ VALUE LESSON captured!

Issue: {issue}
Fix: {what was added}
Location: {file path}
Category: {category}

This will improve future behavior.
```
