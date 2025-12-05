# Features Help - Command Cheat Sheet

Quick reference for all feature management commands with examples and usage tips.

## Available Commands

### `/features-list`
**Beautiful dashboard showing all your user features**

**Usage:**
```bash
/features-list
```

**Shows:**
- ⭐ Favorites (auto-add to new repos)
- 🤝 Shared with team
- 🔒 Personal only features
- 🌐 Available from team (not installed yet)
- Summary statistics
- Quick action buttons

**Example Output:**
```
═══════════════════════════════════════════════════════
           YOUR USER FEATURES DASHBOARD
═══════════════════════════════════════════════════════

⭐ FAVORITES (Auto-add to new repos)
├─ git-worktrees v1.0.0
│  └─ Shared with: Listicle-Content-Management
│  └─ Source: Listicle-Content-Management (Lizzie)
│  └─ Last updated: 2025-12-04

🤝 SHARED WITH TEAM (In sync system)
├─ internal-install-helper v1.0.0
│  └─ Shared with: Listicle-Content-Management
│  └─ Source: Listicle-Content-Management

🔒 PERSONAL ONLY (Not shared - Consider sharing?)
├─ personal-snippets v1.0.0
│  └─ Note: Personal utility commands
│  └─ 💡 Suggestion: Share this! Has 15 useful commands
│  └─ [Share Now] [Keep Private]

🌐 AVAILABLE FROM TEAM (Discovered from repos)
├─ database-helpers v3.2.0
│  └─ Found in: other-project (TeammateBob)
│  └─ Description: PostgreSQL query helpers
│  └─ [Add to my settings] [Add as Favorite]

📊 SUMMARY
• Total features: 4 (1 favorite, 2 shared, 1 personal, 1 available)
• Linked repos: 1
• Source of truth: Your user settings
• Last sync check: 2 minutes ago

[Organize] [Discover More] [Share Personal Features]
```

---

### `/features-add`
**Add a new user feature to your collection**

**Usage:**
```bash
/features-add
```

**Interactive Flow:**
The agent will guide you through:

1. **Choose source:**
   - Current repo
   - Another repo
   - Create new

2. **If "Another repo":**
   - Enter repo path
   - See available sync groups
   - Select which to add
   - Choose if favorite
   - Choose if share with team

3. **If "Current repo":**
   - See features in current repo
   - Add to user settings
   - Choose if favorite

4. **If "Create new":**
   - Enter feature name
   - Define commands
   - Bundle with favorites

**Example Session:**
```
You: /features-add

Agent: "Add a new user feature!

       Where is this feature from?
       [Current repo] [Another repo] [Create new]"

You: Another repo

Agent: "Enter the repo path or URL:"

You: /Users/bobby/Documents/other-repo

Agent: "Found these sync groups:

       ✓ code-review-helpers v2.0.1 (ExternalDev)
         - /review-pr - Auto-review pull requests
         - /suggest-tests - Suggest test cases
         - /check-coverage - Check code coverage

       ✓ testing-utilities v1.5.0 (ExternalDev)
         - /run-tests - Run test suite
         - /generate-mocks - Generate mock data

       Which would you like to add?"

You: code-review-helpers

Agent: "Configure code-review-helpers:

       📦 code-review-helpers v2.0.1
       Author: ExternalDev
       Description: PR review automation

       Commands included:
       - /review-pr
       - /suggest-tests
       - /check-coverage

       ⭐ Add to Favorites? [Yes] [No]"

You: Yes

Agent: "🤝 Share with your team repos? [Yes] [No]

       If yes, which repos?
       [ ] Listicle-Content-Management
       [Select all]"

You: Yes, select all

Agent: "Adding feature...

       ✅ Copied to ~/.claude/settings.json
       ✅ Added to favorites
       ✅ Creating sync in Listicle-Content-Management...
       ✅ Updated sync-manifest.json
       ✅ Committed changes

       Added code-review-helpers to:
       - Your user settings (as favorite)
       - Listicle-Content-Management

       Team members will be notified on next pull!"
```

---

### `/features-discover`
**Find features your teammates have that you don't**

**Usage:**
```bash
/features-discover
```

**What it does:**
1. Scans all linked repositories
2. Reads their `.claude/sync-manifest.json`
3. Identifies features you don't have
4. Shows detailed information
5. Offers one-click installation

**Example Output:**
```
🌐 AVAILABLE FROM TEAM

📦 database-helpers v3.2.0
   Author: TeammateBob
   Found in: other-project
   Date: 2025-12-01
   Description: PostgreSQL query helpers and utilities

   Commands included:
   - /db-query - Run database queries
   - /db-migrate - Run migrations
   - /db-seed - Seed database

   [Add to my settings] [Add as Favorite] [Tell me more]

📦 api-testing v2.1.0
   Author: TeammateSarah
   Found in: backend-repo
   Date: 2025-11-28
   Description: API testing and validation tools

   Commands included:
   - /test-api - Test API endpoints
   - /validate-schema - Validate API schemas

   [Add to my settings] [Add as Favorite] [Tell me more]

───────────────────────────────────────────────────────
Found 2 new features from your team!
```

---

### `/features-share`
**Share your personal features with team repos**

**Usage:**
```bash
/features-share
```

**What it does:**
1. Finds personal-only features (not shared yet)
2. Shows usage statistics
3. Lets you select which to share
4. Shows which repos to share with
5. Creates sync worktrees
6. Commits with attribution
7. Updates feature registry

**Example Session:**
```
You: /features-share

Agent: "Personal features available to share:

       📦 personal-snippets v1.0.0
          - 15 commands, 47 uses this month
          - Most used: /quick-format, /extract-imports
          - Source: local
          - Note: Personal utility commands

          [Share this] [Keep private] [Details]

       📦 experimental-tools v0.5.0
          - 3 commands, 5 uses this month
          - Source: local
          - Note: Still testing

          [Share this] [Keep private] [Details]"

You: Share "personal-snippets"

Agent: "Share personal-snippets with which repos?

       [ ] Listicle-Content-Management
       [ ] other-project
       [Select all]"

You: Select all

Agent: "Preview of changes:

       Listicle-Content-Management will get:
       - /quick-format - Format code snippets
       - /extract-imports - Extract import statements
       - /clean-console - Remove console logs
       [... 12 more commands]

       other-project will get:
       [same commands]

       Proceed? [Yes] [No]"

You: Yes

Agent: "Sharing personal-snippets...

       ✅ Created sync worktree: Listicle-sync
       ✅ Updated sync-manifest.json
       ✅ Committed: 'sync: Add personal-snippets v1.0.0 by Lizzie'
       ✅ Created sync worktree: other-project-sync
       ✅ Updated sync-manifest.json
       ✅ Committed: 'sync: Add personal-snippets v1.0.0 by Lizzie'

       Shared personal-snippets with:
       - Listicle-Content-Management
       - other-project

       Team will be notified on next pull!"
```

---

### `/features-organize`
**Manage favorites and organize user features**

**Usage:**
```bash
/features-organize
```

**Interactive Menu:**
Shows options for:
- 📌 Manage Favorites
- 🏷️ Update Metadata
- 🧹 Clean Up
- 🔗 Dependencies
- ⚙️ Settings

**Example Session:**
```
You: /features-organize

Agent: "🎯 ORGANIZE USER FEATURES

       What would you like to do?

       📌 Manage Favorites
          - Add feature to favorites
          - Remove from favorites
          - Reorder favorites
          Current favorites: git-worktrees, code-review-helpers

       🏷️  Update Metadata
          - Change feature description
          - Add/edit notes
          - Update version manually

       🧹 Clean Up
          - Remove unused features
          - Archive old versions
          - Clear sync history

       🔗 Dependencies
          - View feature dependencies
          - Check for conflicts
          - Resolve issues

       ⚙️  Settings
          - Configure auto-add for new repos
          - Set sync preferences
          - Manage linked repos

       [Select option]"

You: Manage Favorites

Agent: "📌 MANAGE FAVORITES

       Current favorites (auto-add to new repos):
       1. git-worktrees v1.0.0
       2. code-review-helpers v2.0.1

       Available to add:
       - personal-snippets v1.0.0
       - experimental-tools v0.5.0

       What would you like to do?
       [Add feature] [Remove favorite] [Reorder] [Back]"

You: Add feature

Agent: "Select feature to add to favorites:

       [ ] personal-snippets v1.0.0
       [ ] experimental-tools v0.5.0

       [Select]"

You: personal-snippets

Agent: "✅ Added personal-snippets to favorites!

       New favorites list:
       1. git-worktrees v1.0.0
       2. code-review-helpers v2.0.1
       3. personal-snippets v1.0.0

       This feature will now auto-suggest adding to new repos.

       Sync changes to linked repos? [Yes] [No]"
```

---

## Common Workflows

### Discovering Team Features

```bash
# 1. See what teammates have
/features-discover

# 2. Review features
# Agent shows all available features

# 3. Add the ones you want
# Click [Add to my settings]

# 4. Choose if favorite
# Agent asks if should be favorite

# Done! Features synced to your user settings
```

### Sharing Your Features

```bash
# 1. See your personal features
/features-list

# 2. Share with team
/features-share

# 3. Select feature to share
# Agent shows your personal features

# 4. Choose repos
# Agent asks which repos

# 5. Confirm
# Agent creates worktrees and syncs
```

### Managing Favorites

```bash
# 1. Open organize menu
/features-organize

# 2. Select "Manage Favorites"

# 3. Add/remove favorites
# Favorites auto-add to new repos

# 4. Sync changes
# Agent asks if should sync to repos
```

### Adding External Features

```bash
# 1. Start add flow
/features-add

# 2. Choose "Another repo"

# 3. Enter repo path
# Agent scans for features

# 4. Select feature
# Agent shows details

# 5. Mark as favorite
# Optional: auto-add to new repos

# 6. Share with team
# Optional: sync to your repos
```

---

## Quick Tips

**Favorites:**
- Auto-suggest adding to new repos
- Mark your most-used features
- Shared automatically when you share new features

**Discovery:**
- Run `/features-discover` weekly
- Stay up-to-date with team workflows
- One-click installation

**Sharing:**
- Share personal features that help your workflow
- Team gets notified on next pull
- Attribution preserved (shows your name)

**Organization:**
- Clean up unused features regularly
- Update metadata for better searchability
- Check for dependency conflicts

---

## Agent Guidance

The agent will help you with:

**Feature Discovery:**
1. Scan all linked repos
2. Find features you don't have
3. Show detailed information
4. Guide installation
5. Update registry

**Feature Sharing:**
1. Find personal features
2. Show usage statistics
3. Suggest popular ones to share
4. Create sync worktrees
5. Commit with attribution

**Feature Organization:**
1. Show interactive menu
2. Guide through each option
3. Validate changes
4. Update settings
5. Sync to repos if requested

**Example:**
```
You: "I want to share my snippets with the team"

Agent: "Great! Let me find your personal features...

       Found 2 personal features:
       1. personal-snippets - 15 commands, heavily used
       2. experimental-tools - 3 commands, rarely used

       personal-snippets looks popular! Share this one?
       [Yes] [No] [Show details first]"

You: Yes

Agent: "Which repos should get personal-snippets?

       [ ] Listicle-Content-Management
       [ ] other-project

       [Select all] [Select specific]"

You: Select all

Agent: "Perfect! I'll:
       1. Create sync worktrees in both repos
       2. Add personal-snippets to sync manifests
       3. Commit with your attribution
       4. Update your user feature registry

       Ready? [Yes] [Cancel]"

You: Yes

Agent: [Executes sharing...]

       "✅ Done! Shared with 2 repos.

       Team members will see:
       '🎉 New feature: personal-snippets v1.0.0 by Lizzie'

       when they pull!"
```

---

## Troubleshooting

**"No features found"**
- Check if repos have `.claude/sync-manifest.json`
- Use `/sync-status` to verify linked repos
- Ensure repos are properly configured

**"Feature already exists"**
- Feature is already in your settings
- Use `/features-list` to see installed features
- Try `/features-organize` to manage existing

**"Cannot share - not owner"**
- Only share features you created
- Use `/features-add` to add others' features
- Contact feature owner for updates

**"Sync failed during sharing"**
- Check if sync worktree already exists
- Use `git worktree list` to check
- Remove old worktree: `git worktree remove path`

---

## Need More Help?

**Ask the agent:**
- "Show me all my features"
- "Help me find team features"
- "I want to share my commands"
- "How do I organize favorites?"

**The agent will guide you step-by-step!**

**For command-specific help:**
```bash
/features-list      # See everything
/features-discover  # Find new features
/features-share     # Share yours
/features-organize  # Manage all
```
