# Self-Healing System

## How This Skill Improves Itself

This skill has a built-in feedback loop. When something doesn't work well, the system can update itself with proper audit trails.

---

## The Feedback Loop

```
User notices issue with copy output
            ↓
User provides feedback (via /copy-feedback or conversation)
            ↓
System analyzes what went wrong
            ↓
System proposes specific improvement
            ↓
User approves
            ↓
System updates relevant file with audit marker
            ↓
Improvement applies to ALL future work
            ↓
Entry logged in HEALING_LOG section below
```

---

## Audit Marker Format

When the system updates any file, it adds markers like this:

```markdown
<!-- HEALING_UPDATE
Date: 2024-12-05
Issue: Headlines were too long for mobile
Change: Added character limit guidelines
Source: User feedback on Project X
Approved: Yes
-->

[The actual content change here]

<!-- /HEALING_UPDATE -->
```

This makes it easy to:
- Find all auto-updates quickly (search for `HEALING_UPDATE`)
- See when and why each change was made
- Revert if something goes wrong
- Understand the evolution of the system

---

## What Can Be Self-Healed

### Reference Files (Low Risk)
- Add new examples
- Add new formulas
- Expand existing sections
- Add industry-specific guidelines

### Workflow Files (Medium Risk)
- Add new check items to passes
- Adjust thresholds
- Add new workflow steps
- Expand checklists

### Core SKILL.md (Higher Risk - Requires More Approval)
- Changes to fundamental process
- Adding/removing phases
- Changing core principles

---

## Self-Healing Process

### Step 1: Identify Issue
User provides feedback like:
- "That headline was too long"
- "The copy sounded too formal for this brand"
- "Missing [specific thing]"
- "This check caught a false positive"

### Step 2: Analyze Root Cause
System determines:
- Which file is responsible?
- Is this a gap or a bug?
- Is it pattern-based (will happen again) or one-off?

### Step 3: Propose Fix
System suggests specific change:
- What file to update
- What to add/modify
- Why this fixes the issue

### Step 4: Get Approval
System asks:
> "I'd like to add [specific change] to [file]. This will help catch [issue] in future. Approve this improvement? [Yes/No/Show me first]"

### Step 5: Apply with Audit
If approved:
1. Add HEALING_UPDATE markers around change
2. Make the change
3. Log in HEALING_LOG below

### Step 6: Verify
On next similar task, system confirms:
> "Applied the improvement from last time. Does this look better?"

---

## Rollback Process

If a self-healing change causes problems:

1. Search for `HEALING_UPDATE` in affected file
2. Find the problematic change by date/description
3. Remove content between markers (or revert)
4. Log rollback in HEALING_LOG

---

## HEALING_LOG

All self-healing actions are logged here for audit purposes.

### Log Format
```
## [DATE] - [SHORT DESCRIPTION]
- **Issue:** What wasn't working
- **File Updated:** Which file was changed
- **Change Made:** What was added/modified
- **Approved By:** User confirmation
- **Status:** Active / Rolled Back / Superseded
- **Notes:** Any additional context
```

---

### Healing Entries

<!-- HEALING_LOG_START -->

## 2024-12-05 - Initial System Creation
- **Issue:** No copywriting system existed
- **File Updated:** All files (initial creation)
- **Change Made:** Created complete master copywriting skill
- **Approved By:** User (Bobby)
- **Status:** Active
- **Notes:** Base system extracted from Top8forWeightloss and Listicle-Content-Management projects

<!-- HEALING_LOG_END -->

---

## Improvement Categories

Track patterns in feedback to identify systemic issues:

### Category: AI Patterns
Issues related to copy sounding AI-generated
- Em dash overuse
- Cliche phrases
- Robotic tone

### Category: Length/Format
Issues related to copy being too long/short/dense
- Headline length
- Paragraph density
- Mobile readability

### Category: Tone/Voice
Issues related to copy tone not matching brand
- Too formal
- Too casual
- Wrong audience

### Category: Missing Elements
Issues where something important was missing
- Specific CTA type
- Industry terminology
- Compliance requirement

### Category: False Positives
Issues where checks flagged good copy as bad
- Overly strict rules
- Context-blind checks

---

## How to Trigger Self-Healing

### Via Command
```
/copy-feedback
```
Then describe what didn't work.

### Via Conversation
Just tell me:
- "That didn't work because..."
- "Next time, make sure to..."
- "This copy needs more..."
- "The check for X was wrong because..."

I'll recognize it as feedback and propose improvements.

### Via Pattern Recognition
If I notice the same issue appearing multiple times, I'll proactively suggest:
> "I've seen this issue 3 times now. Want me to add a check for it?"
