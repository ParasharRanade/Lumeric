#!/usr/bin/env bash
# Auto-fetch, commit, and push script for Lumeric repository

set -e

# Change to project root directory
cd "$(dirname "$0")"

echo "Fetching latest changes from origin..."
git fetch origin main --quiet 2>/dev/null || true

# Check remote status relative to local
LOCAL=$(git rev-parse @ 2>/dev/null || echo "")
REMOTE=$(git rev-parse @{u} 2>/dev/null || echo "$LOCAL")
BASE=$(git merge-base @ @{u} 2>/dev/null || echo "$LOCAL")

if [ -n "$LOCAL" ] && [ -n "$REMOTE" ] && [ "$LOCAL" != "$REMOTE" ]; then
  if [ "$LOCAL" = "$BASE" ]; then
    echo "📥 Incoming remote changes detected. Pulling..."
    git pull --rebase origin main
    echo "✓ Local updated from remote."
  fi
fi

# Check if there are any working tree changes
if [[ -z $(git status --porcelain) ]]; then
  echo "✓ Working tree is clean. Nothing to commit."
  # Check if local is ahead of remote and needs pushing
  LOCAL=$(git rev-parse @)
  REMOTE=$(git rev-parse @{u} 2>/dev/null || echo "$LOCAL")
  if [ "$LOCAL" != "$REMOTE" ]; then
    echo "Pushing unpushed commits..."
    git push origin main
    echo "✓ Pushed successfully."
  else
    echo "✓ Local and remote are in sync."
  fi
  exit 0
fi

# Commit message argument, default to timestamped message
COMMIT_MSG="${1:-"Update project changes $(date '+%Y-%m-%d %H:%M:%S')"}"

echo "Staging changes..."
git add -A

echo "Committing: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

echo "Rebasing with remote if any new remote commits arrived..."
git pull --rebase origin main --quiet 2>/dev/null || true

echo "Pushing to origin main..."
git push origin main

echo "✓ Changes successfully pushed to GitHub!"
