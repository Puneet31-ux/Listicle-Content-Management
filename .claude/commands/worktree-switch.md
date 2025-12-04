# Worktree Switch

Switch to an existing worktree or create one from an existing branch.

## Usage
```
/worktree-switch <branch-name>
```

## What This Command Does

Helps you navigate between worktrees and creates worktrees from existing branches:

1. **Find Worktree**
   - Checks if branch already has worktree
   - Shows current location if exists
   - Offers to create if doesn't exist

2. **Create from Existing Branch**
   - Validates branch exists
   - Creates worktree directory
   - Links to existing branch

3. **Navigation Help**
   - Shows worktree path
   - Provides CD command
   - Suggests editor commands

## Agent Instructions

When user runs `/worktree-switch <branch-name>`:

```bash
# 1. VERIFY GIT REPOSITORY
git rev-parse --is-inside-work-tree > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "❌ ERROR: Not in a git repository"
  exit 1
fi

BRANCH_NAME=$1

if [ -z "$BRANCH_NAME" ]; then
  echo "❌ ERROR: Branch name required"
  echo ""
  echo "Usage: /worktree-switch <branch-name>"
  echo ""
  echo "Available branches:"
  git branch -a
  exit 1
fi

echo "🔍 Searching for worktree with branch: $BRANCH_NAME"
echo ""

# 2. CHECK IF BRANCH EXISTS
git show-ref --verify --quiet refs/heads/$BRANCH_NAME
BRANCH_EXISTS=$?

if [ $BRANCH_EXISTS -ne 0 ]; then
  echo "❌ ERROR: Branch '$BRANCH_NAME' does not exist"
  echo ""
  echo "Available branches:"
  git branch
  echo ""
  echo "💡 To create new worktree with new branch, use:"
  echo "   /worktree-create $BRANCH_NAME"
  exit 1
fi

# 3. CHECK IF WORKTREE ALREADY EXISTS FOR THIS BRANCH
REPO_NAME=$(basename $(git rev-parse --show-toplevel))
EXPECTED_PATH="../${REPO_NAME}-${BRANCH_NAME}"

# Check all worktrees to find if branch is checked out
EXISTING_WORKTREE=$(git worktree list --porcelain | grep -B1 "branch refs/heads/$BRANCH_NAME" | grep "^worktree" | sed 's/worktree //')

if [ -n "$EXISTING_WORKTREE" ]; then
  # Worktree exists
  echo "✅ Found worktree for '$BRANCH_NAME'"
  echo ""
  echo "📁 Location: $EXISTING_WORKTREE"
  echo ""

  # Check status
  cd "$EXISTING_WORKTREE"
  STATUS=$(git status --porcelain)
  LAST_COMMIT=$(git log -1 --format="%h - %s (%cr)")

  echo "📊 Status:"
  if [ -z "$STATUS" ]; then
    echo "   ✅ Clean working tree"
  else
    CHANGES=$(echo "$STATUS" | wc -l | xargs)
    echo "   ⚠️  $CHANGES uncommitted changes"
  fi
  echo "   Last commit: $LAST_COMMIT"
  echo ""

  echo "🚀 To switch to this worktree:"
  echo ""
  echo "   cd $EXISTING_WORKTREE"
  echo ""
  echo "💡 Or open in editor:"
  echo "   code $EXISTING_WORKTREE"
  echo ""

  exit 0
fi

# 4. WORKTREE DOESN'T EXIST - OFFER TO CREATE
echo "⚠️  No worktree found for branch '$BRANCH_NAME'"
echo ""
echo "This branch exists but is not checked out in any worktree."
echo ""
echo "Would you like to create a worktree for this branch?"
echo ""
echo "Configuration:"
echo "  Branch: $BRANCH_NAME (existing)"
echo "  Path: $EXPECTED_PATH"
echo ""
echo "[Yes - Create worktree] [No - Just show info] [Cancel]"

# WAIT FOR USER RESPONSE
# If user approves:

echo ""
echo "🌳 Creating worktree for existing branch..."
echo ""

# 5. CREATE WORKTREE FROM EXISTING BRANCH
git worktree add $EXPECTED_PATH $BRANCH_NAME

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Worktree created successfully!"
  echo ""
  echo "📁 Location: $EXPECTED_PATH"
  echo "🌿 Branch: $BRANCH_NAME (existing)"
  echo ""

  # Check if package.json exists and offer npm install
  if [ -f "$EXPECTED_PATH/package.json" ]; then
    echo "📦 Detected package.json - Install dependencies?"
    echo "[Yes - npm install] [No - skip]"
    # If user approves:
    # cd $EXPECTED_PATH && npm install
  fi

  echo ""
  echo "🚀 Next steps:"
  echo "  1. Switch to worktree: cd $EXPECTED_PATH"
  echo "  2. Continue work on this branch"
  echo ""
  echo "💡 Pro tip: Open in editor:"
  echo "  code $EXPECTED_PATH"

else
  echo "❌ Failed to create worktree"
  echo ""
  echo "Possible reasons:"
  echo "  - Directory already exists: $EXPECTED_PATH"
  echo "  - Branch is already checked out elsewhere"
  echo ""
  echo "Use /worktree-list to see existing worktrees"
  exit 1
fi
```

## Best Practices Enforced

- ✅ Validates branch exists before attempting
- ✅ Checks for existing worktree first (avoids duplicates)
- ✅ Shows status of existing worktree if found
- ✅ Asks confirmation before creating new worktree
- ✅ Provides clear navigation instructions
- ✅ Uses consistent naming convention
- ✅ Offers to install dependencies

## Examples

```bash
# Switch to existing worktree
/worktree-switch feature/add-authentication
# Result: Shows path to existing worktree

# Create worktree from existing branch
/worktree-switch hotfix/bug-fix
# Result: Creates worktree if doesn't exist yet

# Try to switch to non-existent branch
/worktree-switch feature/doesnt-exist
# Result: Error with list of available branches
```

## Use Cases

**1. Resume work on feature branch**
```bash
/worktree-switch feature/my-feature
# Shows existing worktree location or creates it
```

**2. Work on teammate's branch**
```bash
git fetch origin
git checkout -b feature/teammate-branch origin/feature/teammate-branch
/worktree-switch feature/teammate-branch
# Creates worktree for remote branch
```

**3. Quick access to worktree**
```bash
/worktree-switch feature/in-progress
# Get path to jump directly to worktree
```

## Troubleshooting

**Error: "Branch does not exist"**
- Check available branches: `git branch -a`
- Fetch from remote: `git fetch origin`
- Create new branch: `/worktree-create <branch>`

**Error: "Failed to create worktree"**
- Directory may exist: `ls ../<repo>-<branch>`
- Branch may be checked out: `/worktree-list`
- Use different approach: `/worktree-create` for new branch

**Worktree exists but at different path**
- Use `/worktree-list` to find actual path
- Navigate using the path shown
