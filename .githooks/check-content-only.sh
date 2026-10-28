#!/bin/sh
# Shared by pre-commit and pre-push. Usage: check-content-only.sh <file list on stdin>
root=$(git rev-parse --show-toplevel)
patterns=$(grep -v '^[[:space:]]*#' "$root/.githooks/content-files" | grep -v '^[[:space:]]*$')
bad=$(while IFS= read -r f; do
  [ -z "$f" ] && continue
  echo "$patterns" | while IFS= read -r p; do echo "$f" | grep -Eq "$p" && echo ok && break; done | grep -q ok || echo "  $f"
done)
if [ -n "$bad" ]; then
  echo ""
  echo "✋ This is an event branch: only content files may change here."
  echo "   These are shared code and belong on main:"
  echo "$bad"
  echo ""
  echo "   Make the change on main, then run scripts/sync-events.sh to bring it here."
  echo "   (Allowed paths are listed in .githooks/content-files)"
  exit 1
fi
