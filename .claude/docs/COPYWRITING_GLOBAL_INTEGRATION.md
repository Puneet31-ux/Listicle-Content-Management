# Making Master Copywriting Global + Self-Healing

## The Goal

1. **Global Availability** - Skill works across ALL projects without setup
2. **Automatic Application** - Runs on any copy/content work without being asked
3. **Self-Healing** - Learns from feedback and improves over time

---

## Architecture Options

### Option A: User-Level Skill (Recommended)

**How it works:**
- Skill files live in `~/.claude/skills/master-copywriting/`
- Global settings reference the skill
- Works in any project automatically

**Pros:**
- One source of truth
- Updates apply everywhere immediately
- No per-repo setup needed

**Cons:**
- Must manage at user level
- Harder to have project-specific variations

### Option B: Sync System Distribution

**How it works:**
- Skill lives in one repo (source of truth)
- Use existing sync system to push to all linked repos
- Each repo gets a copy in `.claude/skills/`

**Pros:**
- Works with your existing sync infrastructure
- Can have project-specific customizations
- Version controlled per-project

**Cons:**
- Requires sync push after updates
- Multiple copies to maintain

### Option C: Hybrid (Best of Both)

**How it works:**
- Core principles in global `~/.claude/settings.json` systemPrompt
- Detailed skill files in user-level `~/.claude/skills/`
- Project-specific layers in repo `.claude/skills/`

**Pros:**
- Global baseline always applies
- Project can add/override as needed
- Flexible and maintainable

---

## Implementation Plan: Hybrid Approach

### Step 1: Global System Prompt Addition

Add to `~/.claude/settings.json`:

```json
{
  "systemPromptAdditions": {
    "copywriting-baseline": {
      "description": "Always apply copywriting quality checks",
      "content": "## Copywriting Quality Standards (Always Apply)\n\nWhen writing ANY copy, content, headlines, or marketing text:\n\n1. **Never write in one pass** - Always review and refine\n2. **Check for AI patterns** - Em dashes (max 2), no \"it's important to note\", no \"in conclusion\"\n3. **Read aloud test** - Must sound like a person talking\n4. **Value density** - Every paragraph must teach something\n5. **Competitive thinking** - Is this better than what competitors would write?\n\nFor detailed copywriting work, reference ~/.claude/skills/master-copywriting/SKILL.md"
    }
  }
}
```

### Step 2: User-Level Skill Files

Create at `~/.claude/skills/master-copywriting/`:
- SKILL.md (main execution)
- references/ (all reference files)
- workflows/ (all workflow files)

### Step 3: Commands for Invocation

Add to `~/.claude/settings.json` commands:

```json
{
  "write-copy": {
    "description": "Generate copy using master copywriting system with all 7 passes",
    "prompt": "I need to write copy. Please read ~/.claude/skills/master-copywriting/SKILL.md and follow the complete workflow including: research phase, draft phase, all 7 review passes, competitive check, and final polish. Ask me what type of copy (listicle, blog, ad, email) and the topic before starting."
  },
  "check-copy": {
    "description": "Run copywriting quality checks on existing content",
    "prompt": "I have copy that needs review. Please read ~/.claude/skills/master-copywriting/SKILL.md and run all 7 passes on the content I provide: Structure, Value, AI Patterns, Human Voice, Competitive, Emotional, and Mobile. Give me a scorecard and specific fixes for each issue found."
  },
  "copy-feedback": {
    "description": "Log feedback to improve copywriting system",
    "prompt": "I have feedback on copy that was generated. Please:\n1. Document what worked/didn't work\n2. Identify if this reveals a gap in the copywriting system\n3. Suggest specific additions to the reference files or SKILL.md\n4. Ask if I want to apply the improvement now\n5. If yes, update the relevant file in ~/.claude/skills/master-copywriting/"
  }
}
```

### Step 4: Self-Healing Feedback Loop

Create `~/.claude/skills/master-copywriting/FEEDBACK_LOG.md`:

```markdown
# Copywriting System Feedback Log

## Purpose
Track what works, what doesn't, and improvements made.

## Format
Each entry:
- Date
- What was the copy task?
- What worked well?
- What didn't work?
- Improvement made (if any)
- File updated (if any)

---

## Entries

(Entries added via /copy-feedback command)
```

### Step 5: Register as User Feature

Add to `~/.claude/settings.json` userFeatures:

```json
{
  "master-copywriting": {
    "version": "1.0.0",
    "source": "Listicle-Content-Management",
    "author": "Bobby",
    "addedAt": "2025-12-05",
    "isFavorite": true,
    "sharedWithTeam": true,
    "linkedRepos": ["Listicle-Content-Management"],
    "autoApply": true,
    "systemPromptAddition": "copywriting-baseline"
  }
}
```

---

## How It Would Work Day-to-Day

### Scenario 1: Automatic Quality Check
You're working on ANY project and write some copy. The systemPrompt baseline automatically reminds Claude to check for AI patterns, read aloud, etc.

### Scenario 2: Full Copy Generation
```
/write-copy
```
Invokes the full skill with research, drafting, 7 passes, competitive check.

### Scenario 3: Review Existing Copy
```
/check-copy
[paste copy here]
```
Runs all 7 passes and gives scorecard + fixes.

### Scenario 4: Something Didn't Work
```
/copy-feedback
"The headline sounded too corporate. Need more casual language guidelines."
```
Logs the feedback, suggests improvement, optionally updates the skill.

---

## What We Need to Create

### New Files at User Level (`~/.claude/`)

1. **skills/master-copywriting/** - Copy entire skill folder
2. **settings.json updates** - Add commands, systemPrompt, userFeatures

### New Files at Project Level (`.claude/`)

1. **Project-specific workflows** - If this project needs special handling
2. **sync-manifest.json update** - Register as sync group

---

## Self-Healing Mechanism

The `/copy-feedback` command creates a continuous improvement loop:

```
User gives feedback
       ↓
Feedback logged to FEEDBACK_LOG.md
       ↓
System suggests improvement
       ↓
User approves
       ↓
Skill file updated
       ↓
Improvement applies to ALL future work
```

### Example Improvements That Could Be Added:

| Feedback | Improvement |
|----------|-------------|
| "Headlines too long" | Add length guidelines to headline-formulas.md |
| "Missing industry-specific language" | Add industry glossary reference |
| "CTA wasn't mobile-friendly" | Strengthen mobile section in cta-patterns.md |
| "Sounded too formal for this brand" | Add brand voice customization workflow |

---

## Next Steps

1. **Copy skill to user level** (`~/.claude/skills/master-copywriting/`)
2. **Update global settings** (add commands, systemPrompt)
3. **Create feedback log** file
4. **Test with a real copy task**
5. **Iterate based on first feedback**

---

## Questions to Decide

1. **Should baseline apply to ALL Claude interactions?**
   - If yes: Add to systemPrompt (always active)
   - If no: Only when /write-copy or /check-copy invoked

2. **Should project repos get a copy?**
   - If yes: Use sync system to distribute
   - If no: Keep only at user level

3. **How aggressive should auto-checking be?**
   - Aggressive: Claude always mentions copy issues, even if you didn't ask
   - Passive: Only checks when explicitly asked

Let me know which approach you want and I'll implement it.
