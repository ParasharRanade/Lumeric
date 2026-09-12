#!/usr/bin/env bash
# Watcher script that detects file changes in the repository,
# pulls/fetches remote updates, and pushes local changes automatically.

set -e

# Change to project root directory
cd "$(dirname "$0")"

CHECK_INTERVAL_SECONDS="${1:-5}"

echo "======================================================"
echo "⚡ Lumeric Git Auto-Sync Watcher Started"
echo "Watching directory: $(pwd)"
echo "Polling interval: ${CHECK_INTERVAL_SECONDS}s"
echo "Press [Ctrl+C] to stop."
echo "======================================================"

# Graceful exit handling
trap 'echo -e "\n🛑 Auto-sync stopped."; exit 0' SIGINT SIGTERM

while true; do
  # 1. Fetch from remote quietly
  git fetch origin main --quiet 2>/dev/null || true

  # 2. Check if remote has incoming changes to pull
  LOCAL=$(git rev-parse @ 2>/dev/null || echo "")
  REMOTE=$(git rev-parse @{u} 2>/dev/null || echo "$LOCAL")
  BASE=$(git merge-base @ @{u} 2>/dev/null || echo "$LOCAL")

  if [ -n "$LOCAL" ] && [ -n "$REMOTE" ] && [ "$LOCAL" != "$REMOTE" ]; then
    if [ "$LOCAL" = "$BASE" ]; then
      echo "📥 Remote changes detected. Pulling with rebase..."
      git pull --rebase origin main
      echo "✓ Pulled and up-to-date with remote."
    fi
  fi

  # 3. Check for local modifications (uncommitted changes)
  STATUS=$(git status --porcelain)
  if [ -n "$STATUS" ]; then
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    echo "⚡ Local changes detected at ${TIMESTAMP}:"
    git status -s

    echo "Staging changes..."
    git add -A

    COMMIT_MSG="Auto-commit updates ${TIMESTAMP}"
    echo "Committing: ${COMMIT_MSG}"
    git commit -m "${COMMIT_MSG}"

    echo "Pushing to origin main..."
    # If remote moved in the meantime, rebase before pushing
    git pull --rebase origin main --quiet 2>/dev/null || true
    git push origin main
    echo "✓ Pushed successfully to GitHub!"
    echo "------------------------------------------------------"
  else
    # 4. Check if local has committed changes that were not yet pushed
    if [ -n "$LOCAL" ] && [ -n "$REMOTE" ] && [ "$REMOTE" = "$BASE" ] && [ "$LOCAL" != "$REMOTE" ]; then
      echo "Pushing unpushed commits to origin main..."
      git push origin main
      echo "✓ Pushed successfully!"
      echo "------------------------------------------------------"
    fi
  fi

  sleep "$CHECK_INTERVAL_SECONDS"
done
