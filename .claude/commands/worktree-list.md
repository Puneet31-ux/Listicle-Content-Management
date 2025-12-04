# Worktree List

List all active git worktrees with status and branch information.

## Usage
```
/worktree-list
```

## What This Command Does

Displays comprehensive information about all your active worktrees:

1. **Main Repository Status**
   - Current branch
   - Clean/dirty status
   - Last commit info

2. **All Worktrees**
   - Worktree path
   - Associated branch
   - Commit hash and message
   - Clean/dirty status
   - Behind/ahead of remote

3. **Health Check**
   - Identifies stale worktrees (merged branches)
   - Shows worktrees with uncommitted changes
   - Suggests cleanup actions

## Agent Instructions

When user runs `/worktree-list`:

```bash
# 1. VERIFY GIT REPOSITORY
git rev-parse --is-inside-work-tree > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "❌ ERROR: Not in a git repository"
  exit 1
fi

echo "═══════════════════════════════════════════════════════"
echo "           GIT WORKTREES DASHBOARD"
echo "═══════════════════════════════════════════════════════"
echo ""

# 2. SHOW MAIN REPOSITORY INFO
REPO_NAME=$(basename $(git rev-parse --show-toplevel))
CURRENT_BRANCH=$(git branch --show-current)
REPO_PATH=$(git rev-parse --show-toplevel)

echo "📂 Main Repository: $REPO_NAME"
echo "   Path: $REPO_PATH"
echo "   Branch: $CURRENT_BRANCH"

# Check status
STATUS=$(git status --porcelain)
if [ -z "$STATUS" ]; then
  echo "   Status: ✅ Clean"
else
  CHANGES=$(echo "$STATUS" | wc -l | xargs)
  echo "   Status: ⚠️  $CHANGES uncommitted changes"
fi

# Last commit
LAST_COMMIT=$(git log -1 --format="%h - %s (%cr)" 2>/dev/null)
echo "   Last commit: $LAST_COMMIT"
echo ""

# 3. LIST ALL WORKTREES
echo "───────────────────────────────────────────────────────"
echo "🌳 ACTIVE WORKTREES"
echo "───────────────────────────────────────────────────────"
echo ""

# Parse git worktree list
WORKTREE_COUNT=0
git worktree list --porcelain | while IFS= read -r line; do
  if [[ $line == worktree* ]]; then
    WORKTREE_PATH=${line#worktree }

    # Skip main repository (already shown above)
    if [ "$WORKTREE_PATH" = "$REPO_PATH" ]; then
      continue
    fi

    WORKTREE_COUNT=$((WORKTREE_COUNT + 1))
  elif [[ $line == branch* ]]; then
    BRANCH=${line#branch refs/heads/}

    echo "📁 Worktree #$WORKTREE_COUNT"
    echo "   Path: $WORKTREE_PATH"
    echo "   Branch: $BRANCH"

    # Get branch info
    cd "$WORKTREE_PATH"

    # Status check
    WT_STATUS=$(git status --porcelain)
    if [ -z "$WT_STATUS" ]; then
      echo "   Status: ✅ Clean"
    else
      WT_CHANGES=$(echo "$WT_STATUS" | wc -l | xargs)
      echo "   Status: ⚠️  $WT_CHANGES uncommitted changes"
    fi

    # Last commit
    WT_COMMIT=$(git log -1 --format="%h - %s (%cr)" 2>/dev/null)
    echo "   Last commit: $WT_COMMIT"

    # Check if ahead/behind remote
    git fetch origin $BRANCH 2>/dev/null
    LOCAL=$(git rev-parse $BRANCH 2>/dev/null)
    REMOTE=$(git rev-parse origin/$BRANCH 2>/dev/null)

    if [ -n "$REMOTE" ]; then
      AHEAD=$(git rev-list --count $REMOTE..$LOCAL 2>/dev/null)
      BEHIND=$(git rev-list --count $LOCAL..$REMOTE 2>/dev/null)

      if [ "$AHEAD" -gt 0 ] || [ "$BEHIND" -gt 0 ]; then
        echo "   Remote: "
        [ "$AHEAD" -gt 0 ] && echo "     ↑ $AHEAD commits ahead"
        [ "$BEHIND" -gt 0 ] && echo "     ↓ $BEHIND commits behind"
      else
        echo "   Remote: ✅ Up to date"
      fi
    else
      echo "   Remote: 📤 Not pushed yet"
    fi

    # Check if branch is merged
    git branch --merged main | grep -q "^[* ]*$BRANCH$"
    if [ $? -eq 0 ]; then
      echo "   ⚠️  MERGED into main - Consider cleanup"
    fi

    echo ""
  fi
done

# 4. HEALTH CHECK & SUGGESTIONS
echo "───────────────────────────────────────────────────────"
echo "🔍 HEALTH CHECK"
echo "───────────────────────────────────────────────────────"
echo ""

# Count total worktrees (excluding main)
TOTAL_WORKTREES=$(git worktree list | wc -l | xargs)
TOTAL_WORKTREES=$((TOTAL_WORKTREES - 1))

echo "Total active worktrees: $TOTAL_WORKTREES"
echo ""

# Find merged branches (candidates for cleanup)
echo "🧹 Cleanup Suggestions:"
MERGED_BRANCHES=$(git worktree list --porcelain | grep "branch refs/heads/" | sed 's/branch refs\/heads\///' | while read branch; do
  git branch --merged main | grep -q "^[* ]*$branch$" && echo "$branch"
done)

if [ -n "$MERGED_BRANCHES" ]; then
  echo "   These worktree branches are merged into main:"
  echo "$MERGED_BRANCHES" | while read branch; do
    echo "   - $branch → Use /worktree-cleanup to remove"
  done
else
  echo "   ✅ No merged worktrees found"
fi

echo ""

# Find worktrees with uncommitted changes
echo "⚠️  Uncommitted Changes:"
HAS_CHANGES=false
git worktree list --porcelain | grep "worktree" | while IFS= read -r line; do
  WT_PATH=${line#worktree }
  if [ -d "$WT_PATH" ]; then
    cd "$WT_PATH"
    WT_STATUS=$(git status --porcelain)
    if [ -n "$WT_STATUS" ]; then
      WT_BRANCH=$(git branch --show-current)
      echo "   - $WT_BRANCH has uncommitted changes"
      HAS_CHANGES=true
    fi
  fi
done

if [ "$HAS_CHANGES" = false ]; then
  echo "   ✅ All worktrees are clean"
fi

echo ""
echo "───────────────────────────────────────────────────────"
echo "💡 QUICK ACTIONS"
echo "   /worktree-create <name>    - Create new worktree"
echo "   /worktree-switch <branch>  - Switch to worktree"
echo "   /worktree-cleanup          - Remove merged worktrees"
echo "───────────────────────────────────────────────────────"
```

## Best Practices Enforced

- ✅ Shows comprehensive status for all worktrees
- ✅ Identifies merged branches (cleanup candidates)
- ✅ Highlights uncommitted changes
- ✅ Shows remote tracking status (ahead/behind)
- ✅ Provides clear, actionable suggestions
- ✅ Easy-to-read dashboard format

## Example Output

```
═══════════════════════════════════════════════════════
           GIT WORKTREES DASHBOARD
═══════════════════════════════════════════════════════

📂 Main Repository: Listicle-Content-Management
   Path: /Users/bobby/Documents/Github_II/Listicle-Content-Management
   Branch: main
   Status: ✅ Clean
   Last commit: abc123 - Update README (2 hours ago)

───────────────────────────────────────────────────────
🌳 ACTIVE WORKTREES
───────────────────────────────────────────────────────

📁 Worktree #1
   Path: /Users/bobby/Documents/Github_II/Listicle-Content-Management-feature-auth
   Branch: feature/add-authentication
   Status: ⚠️  3 uncommitted changes
   Last commit: def456 - Add login form (1 hour ago)
   Remote: ↑ 2 commits ahead

📁 Worktree #2
   Path: /Users/bobby/Documents/Github_II/Listicle-Content-Management-internal-install-helper
   Branch: feature/internal-install-helper
   Status: ✅ Clean
   Last commit: 759b41e - Add user approval (30 minutes ago)
   Remote: ✅ Up to date

───────────────────────────────────────────────────────
🔍 HEALTH CHECK
───────────────────────────────────────────────────────

Total active worktrees: 2

🧹 Cleanup Suggestions:
   ✅ No merged worktrees found

⚠️  Uncommitted Changes:
   - feature/add-authentication has uncommitted changes

───────────────────────────────────────────────────────
💡 QUICK ACTIONS
   /worktree-create <name>    - Create new worktree
   /worktree-switch <branch>  - Switch to worktree
   /worktree-cleanup          - Remove merged worktrees
───────────────────────────────────────────────────────
```
