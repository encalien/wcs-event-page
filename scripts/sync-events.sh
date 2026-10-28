#!/bin/sh
# Merges main into every local events/* branch, so shared fixes reach all events.
# Stops at the first conflict so you can resolve it (then: git commit, and run this again).
set -e
start=$(git symbolic-ref --short HEAD)
if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  echo "You have uncommitted changes. Commit or stash them first."; exit 1
fi
for b in $(git for-each-ref --format='%(refname:short)' refs/heads/events/); do
  echo "→ $b"
  git checkout -q "$b"
  git merge --no-edit main || { echo "Conflict on $b. Resolve, git commit, then rerun."; exit 1; }
done
git checkout -q "$start"
echo "All event branches are up to date with main. Push them with: git push origin --all"
