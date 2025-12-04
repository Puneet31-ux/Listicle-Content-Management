# Internal Install Helper - Team Sync System

Welcome to our team's workflow sync system! This guide will help you understand and use the automated sync features.

## What Is This?

The Internal Install Helper is a smart system that keeps our Claude Code workflows synchronized across the team. When someone creates a useful command or workflow, everyone can easily get it with one click!

## Quick Start

### For Team Members

When you pull updates and see this notification:

```
🎉 Hey! There are some hot new user features your team created and wants to share with you!

📦 Git Worktrees v1.1.0 (by Lizzie, 2025-12-04)
Changes: Added automatic cleanup command

Your local user settings: v1.0.0 (outdated)
Project settings: v1.1.0 (new!)

Want to sync your files and update user settings now?
[OK - Do it!] [Show me what changed] [Skip for now]
```

Just click **"OK - Do it!"** and you're synced! The system will:
- Back up your current settings (just in case)
- Add the new commands to your Claude Code
- Keep your personal customizations intact

### For Feature Creators (Like Lizzie)

When you create a useful workflow:

1. Add it to your `~/.claude/settings.json`
2. Claude Code will ask: "Push to linked repos?"
3. Say yes, and it automatically shares with the team!

The system handles all the git worktrees, commits, and PRs for you.

## Available Commands

### Sync Commands

- **`/sync-status`** - See what's synced and what's not across all repos
- **`/sync-pull`** - Manually pull updates from a repo to your settings
- **`/sync-push`** - Push your local changes to linked repos
- **`/sync-diff`** - See detailed differences before syncing

### Feature Management

- **`/features-list`** - Beautiful dashboard showing all your features
- **`/features-add`** - Add a feature from another repo or create new
- **`/features-discover`** - Find features your teammates have that you don't
- **`/features-share`** - Share your personal features with the team
- **`/features-organize`** - Manage favorites and clean up

## Key Concepts

### Favorites ⭐

Mark features as favorites and they'll **automatically** be added to new repos you work on. Super convenient!

To add a favorite:
```bash
/features-organize → Manage Favorites → Add feature to favorites
```

### Source of Truth

Lizzie's user settings (`~/.claude/settings.json`) is configured as the source of truth. This means:
- Lizzie creates/updates workflows
- System syncs them to project repos
- Team members get notifications on pull
- Everyone stays up to date!

### Sync Groups

Features are organized into "sync groups" like:
- `git-worktrees` - Git worktree automation
- `code-review-helpers` - PR review tools
- `testing-utilities` - Test automation

Each group has its own version, author, and changelog.

## Common Workflows

### Getting New Team Features

1. Run `git pull origin main`
2. If updates available, you'll see a friendly notification
3. Click "Show me what changed" to see details
4. Click "OK - Do it!" to sync
5. Done! New commands are ready to use

### Sharing Your Own Feature

1. Create your workflow in `~/.claude/settings.json`
2. Wait for Claude to ask: "Push to linked repos?"
3. Or manually run: `/sync-push`
4. Select which repos to share with
5. System creates PR automatically

### Adding External Features

Found a cool workflow in another repo?

1. Run `/features-add`
2. Choose "Another repo"
3. Provide the repo path
4. Select the feature you want
5. Choose if it should be a favorite
6. Choose which repos to share it with
7. Done!

### Discovering What's Available

```bash
/features-discover
```

Shows all features your teammates have that you don't have yet. One-click to add them!

## Safety Features

### Automatic Backups

Every time the system modifies your settings, it creates a backup:
```
~/.claude/settings.json.backup-20251204-150600
```

If something goes wrong, you can always restore from backup.

### Smart Detection

The system uses checksums to detect if you're already up to date. If you are, it **stays silent** - no annoying notifications when nothing changed!

### Opt-Out

Don't want a specific feature? You can opt-out in `.claude/settings.local.json`:

```json
{
  "sync": {
    "groups": {
      "some-feature": {
        "autoPull": false
      }
    }
  }
}
```

## File Locations

### User-Level (Your Personal Settings)
- `~/.claude/settings.json` - Your main configuration
- `~/.claude/features/` - Your feature storage
- `~/.claude/sync-registry.json` - Audit trail of all syncs

### Project-Level (Shared with Team)
- `.claude/sync-manifest.json` - Project's sync configuration
- `.claude/settings.json` - Shared commands
- `.claude/skills/internal-install-helper.md` - Auto-activation skill
- `.claude/docs/` - Documentation

## Troubleshooting

### "Sync failed: Worktree already exists"

This means a previous sync wasn't cleaned up. Fix it:
```bash
git worktree list  # See what worktrees exist
git worktree remove path/to/worktree  # Remove old one
```

Then try syncing again.

### "I don't see the notification after git pull"

Possible reasons:
1. You're already up to date (check with `/sync-status`)
2. The sync manifest didn't change in this pull
3. You might have opt-out configured

Run `/sync-pull` to manually check for updates.

### "How do I revert a sync?"

Your settings are backed up automatically. To restore:

```bash
# List backups
ls ~/.claude/settings.json.backup-*

# Restore from backup
cp ~/.claude/settings.json.backup-20251204-150600 ~/.claude/settings.json
```

## Best Practices

1. **Always review changes** - Click "Show me what changed" before "OK - Do it!"
2. **Mark useful features as favorites** - They'll auto-add to new repos
3. **Share your personal features** - If you use it a lot, the team probably will too!
4. **Check `/sync-status` weekly** - Stay in sync with your team
5. **Keep descriptions clear** - When creating features, write good descriptions

## Getting Help

- **Agent help**: Just ask Claude! "How does the sync system work?"
- **Technical docs**: `.claude/docs/INTERNAL-INSTALL-HELPER.xml` (for Claude to parse)
- **This guide**: `.claude/docs/SYNC_SYSTEM.md` (you're reading it!)
- **Worktree guide**: `.claude/docs/WORKTREE_GUIDE.md` (git worktree basics)

## Version History

- **v1.0.0** (2025-12-04) - Initial release
  - Bidirectional sync (user ↔ project)
  - Favorites management
  - Feature discovery
  - Auto-notifications on git pull
  - Safety features (backups, checksums, conflict resolution)

## Credits

Created by Lizzie for our independent contractor team. Designed to keep everyone's workflows in sync without the hassle!

Happy syncing! 🎉
