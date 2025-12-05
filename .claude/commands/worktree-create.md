# Worktree Create

Create a new git worktree with automatic branch creation and safety checks.

## Usage
```
/worktree-create <branch-name> [base-branch]
```

## What This Command Does

This command helps you create isolated development environments using git worktrees with built-in safety checks and best practices:

1. **Pre-Flight Safety Checks**
   - Verify current branch status (clean, no uncommitted changes)
   - Check if worktree directory already exists
   - Verify base branch exists and is up to date
   - Ensure git repository is in healthy state

2. **Worktree Creation**
   - Creates new branch from base-branch (defaults to main)
   - Creates worktree directory: `../<repo-name>-<branch-name>`
   - Links worktree to new branch

3. **Post-Creation Setup**
   - Optionally run `npm install` if package.json exists
   - Display worktree path and instructions
   - Show how to switch to the new worktree

## Agent Instructions

When user runs `/worktree-create <branch-name> [base-branch]`:

```bash
# 1. SAFETY CHECKS
# Check if we're in a git repository
git rev-parse --is-inside-work-tree

# Check current status - MUST be clean
STATUS=$(git status --porcelain)
if [ -n "$STATUS" ]; then
  echo "❌ ERROR: Working directory has uncommitted changes"
  echo ""
  echo "Please commit or stash your changes first:"
  git status --short
  exit 1
fi

# 2. VALIDATE BASE BRANCH
BASE_BRANCH=${2:-main}
git show-ref --verify --quiet refs/heads/$BASE_BRANCH
if [ $? -ne 0 ]; then
  echo "❌ ERROR: Base branch '$BASE_BRANCH' does not exist"
  echo ""
  echo "Available branches:"
  git branch -a
  exit 1
fi

# Fetch latest to ensure base branch is up to date
echo "📡 Fetching latest changes from remote..."
git fetch origin $BASE_BRANCH

# Check if base branch is behind remote
LOCAL=$(git rev-parse $BASE_BRANCH)
REMOTE=$(git rev-parse origin/$BASE_BRANCH 2>/dev/null)
if [ "$LOCAL" != "$REMOTE" ] && [ -n "$REMOTE" ]; then
  echo "⚠️  WARNING: Local '$BASE_BRANCH' is behind remote"
  echo ""
  echo "Update base branch first?"
  echo "[Yes - git pull] [No - continue anyway] [Cancel]"
  # Wait for user response
fi

# 3. CHECK IF BRANCH ALREADY EXISTS
BRANCH_NAME=$1
git show-ref --verify --quiet refs/heads/$BRANCH_NAME
if [ $? -eq 0 ]; then
  echo "❌ ERROR: Branch '$BRANCH_NAME' already exists"
  echo ""
  echo "Options:"
  echo "1. Use different branch name"
  echo "2. Delete existing branch: git branch -D $BRANCH_NAME"
  echo "3. Create worktree from existing branch: /worktree-switch $BRANCH_NAME"
  exit 1
fi

# 4. CHECK IF WORKTREE DIRECTORY ALREADY EXISTS
REPO_NAME=$(basename $(git rev-parse --show-toplevel))
WORKTREE_PATH="../${REPO_NAME}-${BRANCH_NAME}"

if [ -d "$WORKTREE_PATH" ]; then
  echo "❌ ERROR: Worktree directory already exists: $WORKTREE_PATH"
  echo ""
  echo "Options:"
  echo "1. Use different branch name"
  echo "2. Remove existing directory: rm -rf $WORKTREE_PATH"
  echo "3. Check existing worktrees: /worktree-list"
  exit 1
fi

# 5. CREATE WORKTREE
echo "🌳 Creating worktree for branch '$BRANCH_NAME'..."
echo ""
echo "Configuration:"
echo "  Branch: $BRANCH_NAME (new)"
echo "  Base: $BASE_BRANCH"
echo "  Path: $WORKTREE_PATH"
echo ""

git worktree add -b $BRANCH_NAME $WORKTREE_PATH $BASE_BRANCH

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Worktree created successfully!"
  echo ""
  echo "📁 Location: $WORKTREE_PATH"
  echo "🌿 Branch: $BRANCH_NAME"
  echo ""

  # 6. POST-CREATION SETUP
  # Check if package.json exists and offer to run npm install
  if [ -f "$WORKTREE_PATH/package.json" ]; then
    echo "📦 Detected package.json - Install dependencies?"
    echo "[Yes - npm install] [No - skip]"
    # If user approves:
    # cd $WORKTREE_PATH && npm install
  fi

  echo ""
  echo "🚀 Next steps:"
  echo "  1. Switch to worktree: cd $WORKTREE_PATH"
  echo "  2. Start working on your feature"
  echo "  3. When done: /worktree-cleanup (after merging)"
  echo ""
  echo "💡 Pro tip: Open worktree in new editor window:"
  echo "  code $WORKTREE_PATH"

else
  echo "❌ Failed to create worktree"
  exit 1
fi
```

## Best Practices Enforced

- ✅ Requires clean working directory (no uncommitted changes)
- ✅ Validates base branch exists
- ✅ Checks if base branch is up to date with remote
- ✅ Prevents duplicate branch names
- ✅ Prevents overwriting existing worktree directories
- ✅ Uses consistent naming convention: `<repo-name>-<branch-name>`
- ✅ Offers to install dependencies automatically
- ✅ Provides clear next steps and guidance

## Examples

```bash
# Create worktree for feature branch from main
/worktree-create feature/add-authentication

# Create worktree from specific base branch
/worktree-create hotfix/critical-bug production

# Result: Creates ../Listicle-Content-Management-feature-add-authentication/
```

## Troubleshooting

**Error: "Working directory has uncommitted changes"**
- Commit your changes: `git add . && git commit -m "message"`
- Or stash them: `git stash`

**Error: "Base branch does not exist"**
- Check available branches: `git branch -a`
- Use correct base branch name

**Error: "Branch already exists"**
- Choose different name
- Or delete existing: `git branch -D <branch-name>`

**Error: "Worktree directory already exists"**
- Use `/worktree-list` to see existing worktrees
- Remove old directory if no longer needed
