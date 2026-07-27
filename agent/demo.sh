#!/usr/bin/env bash
# Study Coach Agent — Filesystem Connector Demo
#
# Usage:
#   ./agent/demo.sh summarize  "query"     — find relevant docs and summarise
#   ./agent/demo.sh steps      "brief"     — turn a brief into next steps
#   ./agent/demo.sh draft      "files"     — draft submission note
#   ./agent/demo.sh explain    "concept"   — explain concept from my docs
#   ./agent/demo.sh next       "progress"  — what to do next
#
# This is a prompt-preparation script. It reads local assignment files
# and prepares structured context. The actual agent reasoning happens
# in Claude Project using the instructions in agent/instructions.md.
#
# No API keys. No external services. No backend.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSIGNMENTS_DIR="$REPO_ROOT/assignments"
INPUTS_DIR="$(dirname "$0")/inputs"

action="${1:-}"
query="${2:-}"

if [ -z "$action" ] || [ -z "$query" ]; then
  echo "Usage: $0 {summarize|steps|draft|explain|next} \"query\""
  echo ""
  echo "  summarize \"topic\"   — find relevant docs and summarise"
  echo "  steps     \"brief\"   — turn a brief into next steps"
  echo "  draft     \"files\"   — draft submission note from file changes"
  echo "  explain   \"concept\" — explain concept from my docs"
  echo "  next      \"status\"  — what to do next based on current state"
  exit 1
fi

echo "=== STUDY COACH AGENT ==="
echo "Action: $action"
echo "Query: $query"
echo ""

# ──────────────────────────────────────────────────
# Read example brief if present
# ──────────────────────────────────────────────────
if [ -f "$INPUTS_DIR/example-brief.md" ]; then
  echo "--- Reading brief from inputs ---"
  cat "$INPUTS_DIR/example-brief.md"
  echo ""
  echo "--- End of brief ---"
  echo ""
fi

# ──────────────────────────────────────────────────
# Find relevant files using grep
# ──────────────────────────────────────────────────
echo "--- Searching assignment files for: $query ---"
echo ""

# Build a list of relevant files sorted by relevance (match count)
matches=$(mktemp)
for f in "$ASSIGNMENTS_DIR"/week-0*/*.md "$ASSIGNMENTS_DIR"/week-0*/*/*.md; do
  if [ -f "$f" ]; then
    count=$(grep -ic "$query" "$f" 2>/dev/null || true)
    if [ "$count" -gt 0 ]; then
      echo "$count $f" >> "$matches"
    fi
  fi
done

if [ ! -s "$matches" ]; then
  echo "No documents found containing \"$query\"."
  echo ""
  echo "Documented gap: I do not have that in your documents."
  echo "Available docs cover: workflow, MCP, validation, settings,"
  echo "identity kit, through-line, case studies, deployment."
  echo ""
  rm "$matches"
  exit 0
fi

# Sort by relevance (highest match count first)
sort -rn "$matches" | head -10 | while read -r count file; do
  relpath="${file#$REPO_ROOT/}"
  echo "  [$count matches] $relpath"
done

echo ""

# ──────────────────────────────────────────────────
# Show top 3 most relevant files with excerpts
# ──────────────────────────────────────────────────
echo "--- Top sources ---"
echo ""

sort -rn "$matches" | head -3 | while read -r count file; do
  relpath="${file#$REPO_ROOT/}"
  echo "Source: $relpath ($count matches)"

  # Show first matching lines (up to 10)
  grep -in "$query" "$file" 2>/dev/null | head -10 | while read -r line; do
    echo "  > $line"
  done
  echo ""
done

rm "$matches"

# ──────────────────────────────────────────────────
# Action-specific output
# ──────────────────────────────────────────────────
echo "--- Prepared context ---"
echo ""
echo "Action: $action"
echo "Query: $query"
echo ""
echo "Documents identified: see above"
echo ""

case "$action" in
  summarize)
    echo "Next step: Upload the 3 most relevant docs above to Claude Project."
    echo "Then ask: \"Summarise what I wrote about '$query' in these documents.\""
    echo "The agent will produce a structured summary with source citations."
    ;;
  steps)
    echo "Next step: Open Claude Project with instructions loaded."
    echo "Paste the brief and ask: \"Turn this into next steps, referencing my past assignment structures.\""
    echo "The agent will output an ordered checklist."
    ;;
  draft)
    echo "Next step: Open Claude Project and paste the completed file list."
    echo "Ask: \"Draft a submission note in my voice for these changes.\""
    echo "The agent will produce a 3-5 sentence note matching my past style."
    ;;
  explain)
    echo "Next step: Find which documents above contain '$query'."
    echo "If the concept exists in my docs, open Claude Project and ask:"
    echo "\"Explain '$query' using ONLY what I wrote in my documents.\""
    echo "If not found: I do not have that in your documents."
    ;;
  next)
    echo "Next step: Review the current repo state (git status) and compare"
    echo "against the assignment deliverables list. Open Claude Project and"
    echo "ask: \"Based on what is done and what is missing, what should I do next?\""
    echo "The agent will produce a dependency-ordered checklist."
    ;;
esac

echo ""
echo "=== End of demo ==="
