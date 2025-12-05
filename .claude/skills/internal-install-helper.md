# Internal Install Helper Skill

## Purpose
Auto-detect and manage sync operations between user-level and project-level Claude Code configurations across team members and repositories.

## Activation Triggers

This skill activates automatically when:

1. **User modifies `~/.claude/settings.json`**
   - Detect changes to sync groups
   - Prompt: "Push to linked project repos?"

2. **User runs `git pull` in a repository**
   - Post-merge hook triggers check
   - Compare `.claude/sync-manifest.json` with user settings
   - Show notification if updates available

3. **User opens a repository** for the first time
   - Check if user has favorites configured
   - Check if repo lacks sync-manifest.json
   - Offer to add user's favorite workflows

4. **User runs sync-related commands**
   - `/sync-push` - Push user changes to repos
   - `/sync-pull` - Pull repo changes to user
   - `/sync-status` - Show sync status
   - `/sync-diff` - Show differences
   - `/features-*` - Feature management commands

## How It Works

### On User Settings Change

```typescript
// Pseudo-code for activation logic
if (fileChanged('~/.claude/settings.json')) {
  const changes = detectSyncGroupChanges();

  if (changes.length > 0) {
    const linkedRepos = getUserLinkedRepos();

    prompt(`Detected changes in ${changes[0].groupName} sync group. Push to linked repos?

    ${linkedRepos.map(r => `- ${r.name} ✓ (has sync manifest)`).join('\n')}

    [Yes] [No] [Show changes first]`);

    if (userApproves) {
      // AUTOMATIC SSH SETUP
      await ensureSSHConfigured();

      // AUTOMATIC GH CLI SETUP
      await ensureGHCLIConfigured();

      // PUSH AND CREATE PRS
      await pushChangesToRepos(changes, linkedRepos);
    }
  }
}

// SSH Configuration Check
async function ensureSSHConfigured() {
  // 1. Check if SSH keys exist
  const keysExist = exists('~/.ssh/id_ed25519');

  if (!keysExist) {
    // Generate SSH keys automatically
    exec('ssh-keygen -t ed25519 -C "user@project" -f ~/.ssh/id_ed25519 -N ""');
    showPublicKeyInstructions();
    await waitForUserToAddKey();
  }

  // 2. Test SSH connection
  const sshWorks = await testSSH();

  if (!sshWorks) {
    showPublicKeyInstructions();
    await waitForUserToAddKey();
  }

  // 3. Ensure git remote uses SSH
  const remoteUrl = exec('git remote get-url origin');

  if (remoteUrl.startsWith('https://')) {
    const sshUrl = convertToSSH(remoteUrl);
    exec(`git remote set-url origin ${sshUrl}`);
  }
}

// GH CLI Configuration Check
async function ensureGHCLIConfigured() {
  // 1. Check if gh is installed
  const ghInstalled = exec('which gh');

  if (!ghInstalled) {
    prompt('Install GitHub CLI for automatic PR creation: brew install gh');
    return false;
  }

  // 2. Check if authenticated
  const authenticated = exec('gh auth status');

  if (!authenticated) {
    prompt('Authenticating with GitHub CLI...');
    exec('gh auth login');
  }

  return true;
}
```

### On Git Pull (Post-Merge)

```typescript
// Pseudo-code for pull detection
if (gitPostMerge && fileChanged('.claude/sync-manifest.json')) {
  const manifest = readProjectManifest();
  const userSettings = readUserSettings();

  for (const [groupName, groupData] of manifest.syncGroups) {
    const userVersion = userSettings.userFeatures[groupName]?.version;
    const projectVersion = groupData.version;

    if (!userVersion) {
      // First time seeing this feature
      showWelcomeNotification(groupName, groupData);
    } else if (userVersion !== projectVersion) {
      // Update available
      showUpdateNotification(groupName, userVersion, projectVersion, groupData);
    } else {
      // Already up to date - silent
      log(`✓ Sync check passed - ${groupName} already up to date`);
    }
  }
}
```

### On New Repository Open

```typescript
// Pseudo-code for new repo detection
if (isNewRepository() && userHasFavorites()) {
  const favorites = getUserFavorites();
  const hasManifest = exists('.claude/sync-manifest.json');

  if (!hasManifest && shouldAutoAdd()) {
    // Auto-add favorites
    prompt(`🎁 Adding your favorite workflows to this repo...`);
    await addFavoritesToRepo(favorites);
    success(`✅ Added ${favorites.join(' + ')} to this repo!`);
  } else if (!hasManifest) {
    // Ask to add
    prompt(`Welcome to ${repoName}!

    🎯 You have user-level workflows available:
    ${favorites.map(f => `- ${f} v${getVersion(f)}`).join('\n')}

    Add these to this repo?
    [Add All] [Select...] [Skip] [Always Skip for this repo]`);
  }
}
```

## Notification Templates

### Update Available (Friendly)
```
🎉 Hey! There are some hot new user features your team created and wants to share with you!

📦 {groupName} v{newVersion} (by {author}, {date})
Changes: {changesSummary}

Your local user settings: v{oldVersion} (outdated)
Project settings: v{newVersion} (new!)

Want to sync your files and update user settings now?
[OK - Do it!] [Show me what changed] [Skip for now]
```

### First Time Welcome
```
👋 Welcome! This repo has shared team workflows available:

📦 {groupName} v{version} (by {author}, {date})
Description: {description}

This will add commands to your local Claude Code setup so you can use
these workflows across all your repos!

Add to your user settings?
[Yes - Add it!] [Tell me more] [No thanks]
```

### Changes Detail View
```
📝 Changes in {groupName} sync group:

NEW COMMAND:
+ /{commandName}
+   Description: {description}
+   Script: {shortScript}

UPDATED COMMAND:
~ /{commandName}
~   {changeSummary}

REMOVED COMMAND:
- /{commandName}

Files to update in your user settings:
- ~/.claude/settings.json (add X command, update Y command)
- ~/.zshrc (optional: add {function} shortcut)

[OK - Update now] [Skip]
```

## Safety Checks

Before any sync operation:

1. **Checksum Verification**
   - Compare SHA-256 checksums
   - Skip if already up to date (silent)

2. **Backup Creation**
   - Always backup `~/.claude/settings.json` before modifying
   - Format: `settings.json.backup-{YYYYMMDD-HHMMSS}`
   - Keep last 10 backups

3. **Conflict Detection**
   - Check if user has local modifications
   - Offer resolution options if conflicts found

4. **Opt-Out Respect**
   - Check `.claude/settings.local.json` for opt-out
   - Skip if `sync.disabled = true` or group-specific disable

## Documentation Reference

When user asks about sync system, refer to:
- `.claude/docs/INTERNAL-INSTALL-HELPER.xml` - Complete technical documentation
- Parse XML to answer specific questions
- Provide accurate, context-aware responses

## Example User Interactions

**User**: "How does the sync system work?"
**Agent**: *Parses INTERNAL-INSTALL-HELPER.xml overview section*
"The sync system works bidirectionally:
1. When you update your ~/.claude/settings.json, I detect changes and offer to push to linked repos
2. When team members pull repos with sync updates, they get friendly notifications
3. Uses worktrees to isolate sync operations
4. Always creates backups before modifying settings
Want me to explain any specific part in detail?"

**User**: "What happens when I pull updates?"
**Agent**: *Parses team-member-pulls-updates flow*
"When you git pull, here's what happens:
1. I check if .claude/sync-manifest.json changed
2. If yes, I compare versions with your local settings
3. If you have an older version, you see: '🎉 Hey! Hot new features...'
4. You can click [OK - Do it!] to auto-sync, or [Show changes] to see details first
5. If you're already up to date, I stay silent - no notification needed!"

**User**: "Show me my features"
**Agent**: *Executes /features-list command*
*Shows dashboard with: Favorites, Shared with Team, Personal Only, Available from Team, Summary*

## Integration with Commands

This skill works hand-in-hand with these commands:
- `/sync-push` - Manual push trigger
- `/sync-pull` - Manual pull trigger
- `/sync-status` - Show sync state
- `/sync-diff` - Show detailed diff
- `/features-list` - Feature dashboard
- `/features-add` - Add new features
- `/features-share` - Share personal features
- `/features-discover` - Find team features
- `/features-organize` - Manage favorites

## Performance Considerations

- Checksum checks are fast (no full file comparison needed)
- Silent when already up to date (no user interruption)
- Worktree operations isolated (no impact on main working tree)
- Async operations for multi-repo sync

## Error Handling

If errors occur:
1. Show clear error message with context
2. Suggest resolution steps
3. Never leave user settings in broken state
4. Always have backup available for rollback

Example:
```
❌ Sync failed: Could not create worktree

The worktree path already exists. This usually means a previous sync wasn't cleaned up.

Options:
1. Clean up old worktree: git worktree remove {path}
2. Skip this repo for now
3. Show me the worktree status

[Clean up] [Skip] [Show status]
```

## Logging

All sync operations are logged to:
- `~/.claude/sync-registry.json` - Master audit trail
- Console (if debug mode enabled)

Log format:
```json
{
  "timestamp": "2025-12-04T15:30:00Z",
  "operation": "sync-push",
  "groupName": "git-worktrees",
  "version": "1.1.0",
  "author": "Lizzie",
  "repos": ["Listicle-Content-Management"],
  "status": "success"
}
```

## Auto-Activation Examples

1. **Scenario**: Lizzie edits ~/.claude/settings.json, adds new /worktree-cleanup command
   **Activation**: Immediately after file save
   **Action**: Show "Push to linked repos?" prompt

2. **Scenario**: Contractor runs `git pull origin main`, sync-manifest.json updated
   **Activation**: Post-merge hook completion
   **Action**: Compare versions, show notification if outdated

3. **Scenario**: Lizzie opens brand-new repo in Claude Code
   **Activation**: On repository open
   **Action**: Check for favorites, offer to add to new repo

4. **Scenario**: It's been a week, Lizzie has heavily-used personal feature
   **Activation**: Weekly maintenance check
   **Action**: Suggest sharing: "Your team might love this!"

## Success Criteria

Skill is working correctly when:
- ✅ User changes detected within 1 second
- ✅ No false positives (silent when already up to date)
- ✅ Clear, friendly notifications (not technical jargon)
- ✅ Always creates backups before modifications
- ✅ Respects opt-out settings
- ✅ Handles errors gracefully
- ✅ Logs all operations for audit trail
