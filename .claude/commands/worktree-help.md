# Worktree Help - Command Cheat Sheet

Quick reference for all git worktree commands with examples and usage tips.

## Available Commands

### `/worktree-create <branch-name>`
**Create a new git worktree with comprehensive safety checks**

**Usage:**
```bash
/worktree-create feature/add-authentication
/worktree-create hotfix/bug-fix
/worktree-create experiment/new-idea
```

**What it does:**
- Creates isolated worktree directory at `../<repo>-<branch>`
- Verifies clean working directory
- Prevents duplicate worktrees
- Auto-installs dependencies (npm/yarn)
- Provides navigation commands

**Branch Naming Tips:**
- Use descriptive names: `feature/user-login`, `fix/navbar-crash`
- Avoid spaces: Use hyphens or underscores
- Common prefixes: `feature/`, `fix/`, `hotfix/`, `experiment/`

**Need help?** Just type `/worktree-create` and the agent will:
1. Ask for your branch name
2. Validate the name format
3. Run safety checks
4. Create the worktree
5. Give you the exact `cd` command to switch

---

### `/worktree-list`
**See all active worktrees with health monitoring**

**Usage:**
```bash
/worktree-list
```

**Shows:**
- Main repository status
- All active worktrees with paths
- Uncommitted changes warnings
- Last commit for each worktree
- Cleanup suggestions
- Total disk usage

**Example Output:**
```
🌳 Git Worktrees Dashboard
═══════════════════════════════════════════

📂 MAIN REPOSITORY
   Path: ~/Documents/Github_II/Listicle-Content-Management
   Branch: main
   Status: ✅ Clean

🌿 ACTIVE WORKTREES (2)

1. feature/add-auth
   📁 ../Listicle-Content-Management-feature-add-auth
   📊 3 uncommitted changes
   📝 Last: abc123 - Add login form (2 hours ago)

2. hotfix/navbar
   📁 ../Listicle-Content-Management-hotfix-navbar
   ✅ Clean working tree
   📝 Last: def456 - Fix navbar bug (1 day ago)
```

---

### `/worktree-cleanup`
**Safely remove merged worktrees**

**Usage:**
```bash
/worktree-cleanup                # Safe mode - only merged branches
/worktree-cleanup --force        # Remove all (use with caution!)
```

**What it does:**
- Scans for merged branches
- Blocks if uncommitted changes exist
- Asks for confirmation before deleting
- Removes worktree directory
- Deletes local branch
- Optionally deletes remote branch
- Prunes stale references

**Safety Features:**
- Won't delete branches with uncommitted work
- Won't delete unmerged branches (unless --force)
- Shows exactly what will be deleted
- Asks for confirmation

---

### `/worktree-switch <branch-name>`
**Switch to existing worktree or create from existing branch**

**Usage:**
```bash
/worktree-switch feature/existing-branch
/worktree-switch main
```

**What it does:**
- Checks if worktree already exists for the branch
- If exists: Shows location and status
- If doesn't exist but branch exists: Offers to create worktree
- If branch doesn't exist: Shows available branches

**Example:**
```bash
# Switch to existing worktree
/worktree-switch feature/auth
# Result: Shows path to existing worktree

# Create worktree from existing branch
/worktree-switch hotfix/bug
# Result: Creates worktree if branch exists
```

---

## Common Workflows

### Starting New Feature
```bash
/worktree-create feature/my-feature
# Agent guides you through:
# 1. Validates branch name
# 2. Creates worktree
# 3. Shows cd command: cd ../repo-feature-my-feature
```

### Checking Status
```bash
/worktree-list
# See all your active worktrees and their status
```

### Resuming Work
```bash
/worktree-switch feature/in-progress
# Agent shows you where the worktree is
# Gives you the cd command
```

### Cleaning Up After Merge
```bash
/worktree-cleanup
# Agent finds merged branches
# Asks for confirmation
# Cleans up automatically
```

---

## Quick Tips

**Branch Naming Best Practices:**
- `feature/description` - New features
- `fix/issue-name` - Bug fixes
- `hotfix/critical-bug` - Urgent fixes
- `experiment/idea` - Experimental work
- `refactor/component-name` - Code refactoring

**Worktree Locations:**
- Main repo: `~/path/to/repo/`
- Worktrees: `~/path/to/repo-branch-name/`
- Pattern: `{repo-name}-{branch-name}`

**Common Commands:**
```bash
# Create worktree
/worktree-create feature/new-feature

# See all worktrees
/worktree-list

# Clean up merged
/worktree-cleanup

# Switch to worktree
/worktree-switch feature/existing
```

---

## Need More Help?

**For specific command:**
- Just type the command without arguments
- Agent will guide you through step-by-step

**For worktree-create:**
```bash
/worktree-create
# Agent asks: "What branch name?"
# You: "add-user-login"
# Agent: Validates, creates, guides you
```

**For troubleshooting:**
- Check `/worktree-list` to see current state
- Agent shows warnings for uncommitted changes
- Provides cleanup suggestions

---

## Agent Guidance

When you run any worktree command, the agent will:

1. **Validate** - Check if it's safe to proceed
2. **Guide** - Ask for missing information
3. **Execute** - Run the command with safety checks
4. **Navigate** - Provide exact commands to switch directories
5. **Suggest** - Offer next steps

**Example Interactive Session:**
```
You: /worktree-create

Agent: "Let's create a new worktree! What branch name would you like?"

You: "add authentication"

Agent: "I'll format that as: feature/add-authentication

       Safety checks:
       ✅ Working directory clean
       ✅ No duplicate worktree exists
       ✅ Valid branch name

       Create worktree? [Yes] [Change name] [Cancel]"

You: Yes

Agent: "✅ Created worktree!

       📁 Location: ../Listicle-Content-Management-feature-add-authentication
       🌿 Branch: feature/add-authentication

       To switch to your new worktree:
       cd ../Listicle-Content-Management-feature-add-authentication

       Want me to install dependencies? [Yes] [No]"
```

---

## Troubleshooting

**"Worktree already exists"**
- Use `/worktree-list` to see existing worktrees
- Use `/worktree-switch <branch>` to find it
- Or delete with `/worktree-cleanup`

**"Working directory not clean"**
- Commit or stash your changes first
- Then try again

**"Branch already exists"**
- Use `/worktree-switch` instead of create
- Or choose a different branch name

**Need help?** Just ask the agent:
- "Help me create a worktree"
- "What worktrees do I have?"
- "How do I clean up old worktrees?"
