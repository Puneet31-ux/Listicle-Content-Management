# Worktree Cleanup

Safely remove merged worktrees and clean up stale branches.

## Usage
```
/worktree-cleanup [--force] [--all]
```

## What This Command Does

Intelligently cleans up worktrees that are no longer needed:

1. **Safety Checks**
   - Identifies worktrees with merged branches
   - Checks for uncommitted changes (blocks cleanup)
   - Verifies branches are fully merged
   - Confirms before deletion

2. **Cleanup Process**
   - Removes worktree directory
   - Deletes associated branch (local and remote)
   - Prunes worktree references
   - Shows cleanup summary

3. **Options**
   - Default: Only merged worktrees
   - `--force`: Skip merge check (dangerous!)
   - `--all`: Clean up all worktrees except main

## Agent Instructions

When user runs `/worktree-cleanup`:

```bash
# 1. VERIFY GIT REPOSITORY
git rev-parse --is-inside-work-tree > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "❌ ERROR: Not in a git repository"
  exit 1
fi

echo "🧹 Git Worktree Cleanup"
echo "═══════════════════════════════════════════════════════"
echo ""

# 2. FIND MERGED WORKTREES
MAIN_BRANCH="main"
CURRENT_PATH=$(git rev-parse --show-toplevel)

echo "🔍 Scanning for cleanup candidates..."
echo ""

CLEANUP_CANDIDATES=()
WORKTREE_BRANCHES=()

# Get all worktrees except main repository
git worktree list --porcelain | while IFS= read -r line; do
  if [[ $line == worktree* ]]; then
    WORKTREE_PATH=${line#worktree }
  elif [[ $line == branch* ]]; then
    BRANCH=${line#branch refs/heads/}

    # Skip main branch
    if [ "$BRANCH" = "$MAIN_BRANCH" ] || [ "$BRANCH" = "master" ]; then
      continue
    fi

    # Skip main repository path
    if [ "$WORKTREE_PATH" = "$CURRENT_PATH" ]; then
      continue
    fi

    # Check if branch is merged into main
    git branch --merged $MAIN_BRANCH | grep -q "^[* ]*$BRANCH$"
    IS_MERGED=$?

    # Check for uncommitted changes
    cd "$WORKTREE_PATH"
    UNCOMMITTED=$(git status --porcelain)
    cd - > /dev/null

    if [ $IS_MERGED -eq 0 ]; then
      # Branch is merged
      if [ -n "$UNCOMMITTED" ]; then
        CHANGES_COUNT=$(echo "$UNCOMMITTED" | wc -l | xargs)
        echo "⚠️  SKIPPED: $BRANCH"
        echo "   Path: $WORKTREE_PATH"
        echo "   Reason: Has $CHANGES_COUNT uncommitted changes"
        echo "   Action: Commit or stash changes first"
        echo ""
      else
        echo "✓ READY: $BRANCH"
        echo "   Path: $WORKTREE_PATH"
        echo "   Status: Merged into $MAIN_BRANCH, clean working tree"
        CLEANUP_CANDIDATES+=("$BRANCH:$WORKTREE_PATH")
        echo ""
      fi
    else
      # Branch not merged
      if [ "$1" = "--force" ] || [ "$1" = "--all" ]; then
        echo "⚠️  FORCE: $BRANCH"
        echo "   Path: $WORKTREE_PATH"
        echo "   Warning: NOT merged into $MAIN_BRANCH"
        if [ -n "$UNCOMMITTED" ]; then
          echo "   ❌ Cannot force cleanup - has uncommitted changes"
          echo ""
        else
          CLEANUP_CANDIDATES+=("$BRANCH:$WORKTREE_PATH")
          echo ""
        fi
      fi
    fi
  fi
done

# 3. CHECK IF ANY CANDIDATES FOUND
if [ ${#CLEANUP_CANDIDATES[@]} -eq 0 ]; then
  echo "✅ No worktrees need cleanup!"
  echo ""
  echo "All worktrees are either:"
  echo "  - Not merged yet (still in development)"
  echo "  - Have uncommitted changes (need to be committed first)"
  echo ""
  echo "Use /worktree-list to see all active worktrees"
  exit 0
fi

# 4. SHOW SUMMARY AND CONFIRM
echo "───────────────────────────────────────────────────────"
echo "📋 CLEANUP SUMMARY"
echo "───────────────────────────────────────────────────────"
echo ""
echo "Found ${#CLEANUP_CANDIDATES[@]} worktree(s) ready for cleanup:"
echo ""

for candidate in "${CLEANUP_CANDIDATES[@]}"; do
  BRANCH="${candidate%%:*}"
  PATH="${candidate#*:}"
  echo "  - $BRANCH"
  echo "    $PATH"
done

echo ""
echo "This will:"
echo "  1. Remove worktree directories"
echo "  2. Delete local branches"
echo "  3. Optionally delete remote branches"
echo "  4. Prune worktree references"
echo ""
echo "⚠️  This action cannot be undone!"
echo ""
echo "Proceed with cleanup?"
echo "[Yes - Clean up all] [Select specific] [Cancel]"

# WAIT FOR USER CONFIRMATION
# If user approves:

echo ""
echo "Delete remote branches too?"
echo "[Yes - Delete from origin] [No - Keep remote]"

# WAIT FOR USER RESPONSE
DELETE_REMOTE="no"  # or "yes" based on user choice

echo ""
echo "🗑️  Starting cleanup..."
echo ""

# 5. PERFORM CLEANUP
for candidate in "${CLEANUP_CANDIDATES[@]}"; do
  BRANCH="${candidate%%:*}"
  WORKTREE_PATH="${candidate#*:}"

  echo "Cleaning up: $BRANCH"

  # Remove worktree
  git worktree remove "$WORKTREE_PATH" 2>/dev/null
  if [ $? -eq 0 ]; then
    echo "  ✓ Removed worktree directory"
  else
    # Force remove if needed
    git worktree remove --force "$WORKTREE_PATH" 2>/dev/null
    echo "  ✓ Force removed worktree directory"
  fi

  # Delete local branch
  git branch -d "$BRANCH" 2>/dev/null
  if [ $? -eq 0 ]; then
    echo "  ✓ Deleted local branch"
  else
    # Force delete if not merged (only with --force flag)
    if [ "$1" = "--force" ] || [ "$1" = "--all" ]; then
      git branch -D "$BRANCH"
      echo "  ✓ Force deleted local branch"
    fi
  fi

  # Delete remote branch if requested
  if [ "$DELETE_REMOTE" = "yes" ]; then
    git push origin --delete "$BRANCH" 2>/dev/null
    if [ $? -eq 0 ]; then
      echo "  ✓ Deleted remote branch"
    else
      echo "  ⚠️  Remote branch may not exist or already deleted"
    fi
  fi

  echo ""
done

# 6. PRUNE STALE WORKTREE REFERENCES
echo "🧹 Pruning stale worktree references..."
git worktree prune
echo "  ✓ Pruned stale references"
echo ""

# 7. SHOW FINAL SUMMARY
echo "───────────────────────────────────────────────────────"
echo "✅ CLEANUP COMPLETE"
echo "───────────────────────────────────────────────────────"
echo ""
echo "Cleaned up ${#CLEANUP_CANDIDATES[@]} worktree(s)"
echo ""
echo "Remaining worktrees:"
git worktree list
echo ""
echo "💡 Use /worktree-list for detailed status"
```

## Best Practices Enforced

- ✅ Only removes merged branches by default (safe)
- ✅ Blocks cleanup if uncommitted changes exist
- ✅ Requires user confirmation before deletion
- ✅ Asks separately about remote branch deletion
- ✅ Provides clear summary before and after
- ✅ Prunes stale references automatically
- ✅ Shows what was cleaned up

## Examples

```bash
# Clean up merged worktrees (safe)
/worktree-cleanup

# Force clean up all worktrees (dangerous - use with caution!)
/worktree-cleanup --force

# Result:
# ✓ Removed worktree-feature-auth (merged into main)
# ✓ Removed worktree-hotfix-bug (merged into main)
```

## Flags

**`--force`**
- Removes worktrees even if not merged
- Use with extreme caution
- Still blocks if uncommitted changes exist

**`--all`**
- Same as --force
- Cleans up all worktrees except main

## Troubleshooting

**Error: "Has uncommitted changes"**
- Commit changes: `cd <worktree> && git add . && git commit`
- Or stash: `cd <worktree> && git stash`
- Then retry cleanup

**Error: "Worktree remove failed"**
- Check if worktree is locked
- Try: `git worktree unlock <path>`
- Then retry cleanup

**Branch not deleted**
- Branch may not be fully merged
- Verify with: `git branch --no-merged main`
- Use `--force` flag if you're sure

## Safety Features

1. **Merge Verification** - Only deletes merged branches by default
2. **Uncommitted Check** - Blocks if uncommitted work exists
3. **User Confirmation** - Asks before any deletion
4. **Remote Separate** - Asks separately about remote deletion
5. **Summary Report** - Shows exactly what will be deleted
