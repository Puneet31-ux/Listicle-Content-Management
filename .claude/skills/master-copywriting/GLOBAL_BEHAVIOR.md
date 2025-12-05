# Global Behavior & Smart Throttling

## How This Skill Operates Globally

This skill applies baseline copywriting quality checks to ALL conversations. However, it's smart about when to engage deeply vs. when to back off.

---

## Smart Throttling System

### When to Apply FULL Process (7 Passes)

Apply complete copywriting workflow when:
- User explicitly asks for copy/content creation
- User invokes `/write-copy` or `/check-copy`
- Task is clearly marketing/advertising focused
- Creating listicles, blog posts, ad copy, emails, landing pages
- User asks to "write", "create", "draft" copy-related content

### When to Apply LIGHT Check Only

Apply quick baseline check (AI patterns, obvious issues) when:
- User is writing general content that isn't marketing-focused
- Documentation, README files, technical writing
- Code comments or commit messages
- Casual conversation that happens to include text

**Light check = Just mention obvious issues, don't run full 7 passes**

### When to PAUSE/Back Off

Do NOT apply copywriting checks when:
- User says "skip copy checks" or "no copy review"
- Task is purely technical (code, debugging, system admin)
- User is clearly frustrated with too many suggestions
- Same content has been checked 2+ times already
- User explicitly asks to "just do it" or "just write it"

**If user seems overwhelmed:** Say "I can pause the copy quality checks if you'd like. Just say 'skip copy checks' and I'll focus on getting it done."

---

## Engagement Levels

### Level 0: Silent
No copywriting engagement. User opted out or task is irrelevant.

### Level 1: Passive Notice
Quick note if obvious AI pattern detected:
> "Quick note: I spotted 4 em dashes - that's an AI tell. Want me to fix or skip?"

### Level 2: Active Check
Run 7 passes, provide scorecard, suggest fixes. User explicitly asked or task is clearly copy-focused.

### Level 3: Full Generation
Complete workflow: research, draft, 7 passes, variations, competitive analysis. Only when `/write-copy` invoked or user clearly requests comprehensive copy creation.

---

## Detection Logic

**Copy-related task indicators:**
- Keywords: "copy", "headline", "CTA", "ad", "email", "blog", "listicle", "content", "marketing"
- Context: Working on marketing site, ad campaign, content creation
- Request type: "Write me a...", "Create copy for...", "Help with headlines..."

**Technical task indicators:**
- Keywords: "code", "debug", "fix", "implement", "function", "API", "database"
- Context: Working on backend, debugging errors, writing code
- Request type: "Fix this bug...", "Implement...", "Why isn't this working..."

**When unclear:** Default to Level 1 (Passive Notice). Mention if something looks off, but don't push.

---

## User Override Commands

User can always control engagement:

| Command | Effect |
|---------|--------|
| "skip copy checks" | Pause all copywriting checks for this task |
| "full copy review" | Engage Level 2-3 regardless of task type |
| "just write it" | Skip passes, produce output quickly |
| "/write-copy" | Full Level 3 engagement |
| "/check-copy" | Level 2 on provided content |
| "more casual" | Reduce formality checks, allow more flexibility |

---

## Self-Awareness Prompts

If applying multiple rounds of checks to same content:

> "I've checked this copy twice now. Want me to move on, or is there something specific that's still not right?"

If user seems rushed:

> "I can do a quick draft without the full review process. Say 'quick version' if you need speed over polish."

If user pushes back on suggestions:

> "Got it - I'll back off on the copy suggestions. Let me know if you want them again later."

---

## Integration with Other Tasks

When doing a multi-step task that includes copy:

1. Do the technical work first
2. When reaching copy-related step, engage appropriate level
3. Don't let copy checks slow down the overall flow
4. Offer to "circle back for copy polish" after main task complete

Example:
> "I've built the landing page structure. The copy is placeholder for now. Want me to run the copywriting workflow on it, or handle that separately?"
