# Sync System Help - Command Cheat Sheet

Quick reference for all sync commands with examples and usage tips.

## Available Commands

### `/sync-status`
**Check sync status across all repos and user settings**

**Usage:**
```bash
/sync-status
```

**Shows:**
- Linked repositories
- User features registry
- Version comparison (user vs project)
- Sync status indicators
- Total features count
- Quick action buttons

**Example Output:**
```
═══════════════════════════════════════════
          SYNC STATUS DASHBOARD
═══════════════════════════════════════════

📦 LINKED REPOSITORIES (2)

Listicle-Content-Management
├─ git-worktrees: v1.0.0 ✅ up-to-date
└─ internal-install-helper: v1.0.0 ✅ up-to-date

other-project-repo
├─ git-worktrees: v0.9.0 ⚠️  outdated (v1.0.0 available)
└─ internal-install-helper: ❌ not synced

📊 SUMMARY
• Total repos: 2
• Up to date: 1
• Need sync: 1
• Total features: 2 (1 favorite, 2 shared, 0 personal)

[Sync all] [Sync specific] [Manage favorites]
```

---

### `/sync-push`
**Push user-level changes to linked project repos (FULLY AUTOMATED)**

**Usage:**
```bash
/sync-push
```

**What it does:**
1. Detects changes in your `~/.claude/settings.json`
2. Shows which repos will receive updates
3. **Asks for your approval** before proceeding
4. **Automatically configures SSH** (generates keys if needed)
5. **Automatically sets up GitHub CLI** (gh)
6. Creates sync worktrees in each repo
7. Updates `.claude/settings.json` in each repo
8. Commits with proper attribution
9. Pushes to remote
10. **Automatically creates PRs** with detailed descriptions
11. Returns clickable PR URLs

**Automation Features:**
- SSH key generation (if you don't have keys)
- SSH key setup guidance (shows you how to add to GitHub)
- GitHub CLI authentication
- PR creation with changelogs
- No manual work required!

**Example Output:**
```
Detected changes in git-worktrees sync group.

Push to linked repos?
- Listicle-Content-Management ✓ (has sync manifest)
- other-project-repo ✓ (has sync manifest)

[Yes to all] [Select specific] [Cancel]

> Yes to all

Checking SSH setup...
✅ SSH keys found
✅ SSH connection working
✅ Remote uses SSH

Checking GitHub CLI...
✅ gh installed
✅ Authenticated

Creating sync worktrees...
✅ Listicle-Content-Management-sync created
✅ other-project-repo-sync created

Pushing updates...
✅ Committed to Listicle-Content-Management
✅ Committed to other-project-repo

Creating PRs...
✅ PR created: https://github.com/owner/Listicle/pull/123
✅ PR created: https://github.com/owner/other/pull/124

───────────────────────────────────────────
✅ Sync complete! Pushed to 2 repos:

- Listicle-Content-Management: https://github.com/owner/Listicle/pull/123
- other-project-repo: https://github.com/owner/other/pull/124

Team members will be notified on next pull.
```

**First-time SSH Setup:**
If you don't have SSH configured, the agent will:
1. Generate SSH keys automatically
2. Show your public key
3. Provide link to GitHub settings
4. Wait for you to add the key
5. Test the connection
6. Convert remote URLs to SSH format

---

### `/sync-pull`
**Pull project-level changes to your user settings**

**Usage:**
```bash
/sync-pull
```

**What it does:**
1. Reads `.claude/sync-manifest.json` in current repo
2. Compares with your `~/.claude/settings.json`
3. Shows detailed diff of changes
4. Asks for confirmation
5. Creates backup before applying
6. Merges changes to user settings
7. Updates user feature registry

**Safety Features:**
- Automatic backup: `~/.claude/settings.json.backup-{timestamp}`
- Shows exactly what will change
- Asks for confirmation
- Can be rolled back

**Example Output:**
```
📝 Changes in git-worktrees sync group:

NEW COMMAND:
+ /worktree-cleanup
+   Description: Auto cleanup merged worktrees
+   Script: Safely remove merged branches

VERSION: v1.0.0 → v1.1.0
AUTHOR: Lizzie
DATE: 2025-12-04

Files to update:
- ~/.claude/settings.json (add 1 command)
- ~/.claude/commands/worktree-cleanup.md (new file)

[Apply changes] [Skip]

> Apply changes

Creating backup...
✅ Backup: ~/.claude/settings.json.backup-20251204-120000

Syncing changes...
✅ Updated ~/.claude/settings.json
✅ Copied worktree-cleanup.md to ~/.claude/commands/

✅ Sync complete! You're now on v1.1.0
```

---

### `/sync-diff`
**Show detailed differences before syncing**

**Usage:**
```bash
/sync-diff
```

**Shows:**
- NEW commands added
- UPDATED commands changed
- REMOVED commands deleted
- Version changes
- Author and date
- Breaking changes (if any)

**Example Output:**
```diff
📝 Changes in git-worktrees sync group:

NEW COMMAND:
+ /worktree-cleanup
+   Description: Clean up merged worktrees safely
+   Script: ~/.claude/commands/worktree-cleanup.md

UPDATED COMMAND:
~ /worktree-create
~   Now includes automatic npm install after creation
~   Added dependency detection

REMOVED COMMAND:
- /worktree-delete
-   Replaced by /worktree-cleanup

VERSION: v1.0.0 → v1.1.0
AUTHOR: Lizzie
DATE: 2025-12-04

⚠️  BREAKING CHANGES:
- /worktree-delete command removed
- Use /worktree-cleanup instead

[Apply changes] [Skip]
```

---

## Common Workflows

### As Maintainer (Lizzie) - Pushing Updates

```bash
# 1. Update your user settings
# Edit ~/.claude/settings.json

# 2. Push to all linked repos
/sync-push

# Agent automatically:
# - Configures SSH
# - Sets up GitHub CLI
# - Creates worktrees
# - Commits changes
# - Creates PRs
# - Returns PR URLs

# 3. Review and merge PRs
# Click the PR URLs and merge
```

### As Team Member - Pulling Updates

```bash
# 1. Pull from main
git pull origin main

# 2. Agent automatically detects changes
# Shows friendly notification:
# "🎉 New features available from Lizzie!"

# 3. Review changes
/sync-diff

# 4. Apply updates
/sync-pull

# Or click: [OK - Do it!] from notification
```

### Checking Sync Status

```bash
/sync-status

# See:
# - Which repos are up to date
# - Which need syncing
# - Your feature count
# - Quick actions
```

---

## Quick Tips

**For Maintainers:**
- Always use `/sync-push` after updating user settings
- Review PR descriptions before merging
- SSH and GitHub CLI are auto-configured
- PRs are created automatically!

**For Team Members:**
- Run `/sync-status` to check if updates available
- Use `/sync-diff` before applying changes
- Backups are created automatically
- You can always roll back

**Automation:**
- SSH keys generated if missing
- GitHub CLI installed guidance provided
- PRs created with detailed descriptions
- No manual git commands needed!

---

## Agent Guidance

When you run sync commands, the agent will:

**For /sync-push:**
1. Detect what changed
2. Ask for approval
3. Check SSH setup (auto-configure if needed)
4. Check GitHub CLI (guide installation if needed)
5. Create worktrees automatically
6. Commit and push
7. Create PRs with changelogs
8. Return clickable PR links

**For /sync-pull:**
1. Compare versions
2. Show detailed diff
3. Ask for confirmation
4. Create backup
5. Apply changes
6. Confirm completion

**Example Interactive Session:**
```
You: /sync-push

Agent: "Detected changes in git-worktrees sync group.

       Push to linked repos?
       - Listicle-Content-Management ✓
       - other-project ✓

       [Yes to all] [Select specific] [Cancel]"

You: Yes to all

Agent: "Checking SSH setup...

       ❌ SSH keys not found

       I'll generate SSH keys for you now.

       Generating SSH key...
       ✅ SSH key generated!

       Your public key:
       ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGq...

       Please add this key to GitHub:
       1. Go to: https://github.com/settings/ssh/new
       2. Paste the key above
       3. Click 'Add SSH key'

       Press Enter when done..."

You: [Enter]

Agent: "Testing SSH connection...
       ✅ SSH working!

       Converting remote URLs to SSH...
       ✅ Remote URLs updated

       Checking GitHub CLI...
       ✅ gh installed
       ✅ Authenticated

       Creating sync worktrees...
       [progress continues...]"
```

---

## Troubleshooting

**"SSH Permission denied"**
```bash
# Get your public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: https://github.com/settings/ssh/new
# Then run sync command again
```

**"GitHub CLI not found"**
```bash
# macOS
brew install gh

# Then authenticate
gh auth login
```

**"Sync failed: Worktree already exists"**
```bash
# Check existing worktrees
git worktree list

# Remove old sync worktree
git worktree remove path/to/repo-sync
```

**"Already up to date"**
- No changes detected
- Use `/sync-diff` to see what would sync
- Check `/sync-status` for version info

---

## Need More Help?

**Ask the agent:**
- "Help me sync my changes to repos"
- "How do I pull team updates?"
- "What's the sync status?"
- "Show me what changed"

**The agent will guide you through each step!**
