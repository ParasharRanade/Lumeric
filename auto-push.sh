#!/usr/bin/env bash
# Auto-commit and push script for Lumeric repository

set -e

# Change to project root directory
cd "$(dirname "$0")"

# Check if there are any working tree changes
if [[ -z $(git status --porcelain) ]]; then
  echo "✓ Working tree is clean. Nothing to commit."
  # Check if local is ahead of remote
  git fetch origin main --quiet 2>/dev/null || true
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

# Optional commit message argument, default to timestamped message
COMMIT_MSG="${1:-"Update project changes $(date '+%Y-%m-%d %H:%M:%S')"}"

echo "Staging changes..."
git add -A

echo "Committing: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

echo "Pushing to origin main..."
git push origin main

echo "✓ Changes successfully pushed to GitHub!"
