#!/usr/bin/env bash
# Study Coach Agent — Filesystem Connector Demo
#
# Usage:
#   ./agent/demo.sh summarize  "topic"     — find relevant docs and summarise
#   ./agent/demo.sh steps      "brief"     — turn a brief into next steps
#   ./agent/demo.sh draft      "changes"   — draft submission note
#   ./agent/demo.sh explain    "concept"   — explain concept from my docs
#   ./agent/demo.sh next       "status"    — what to do next
#
# Commands that search files: summarize, explain
# Commands that use your input directly: steps, draft, next
#
# This script outputs a ready-to-paste prompt for Claude Project.
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
  echo "  summarize \"topic\"   — search docs, output prompt to summarise"
  echo "  steps     \"brief\"   — output prompt to turn your brief into steps"
  echo "  draft     \"changes\" — output prompt to draft submission note"
  echo "  explain   \"concept\" — search docs, output prompt to explain"
  echo "  next      \"status\"  — output prompt for what to do next"
  exit 1
fi

echo "=== STUDY COACH AGENT ==="
echo "Action: $action"
echo "Query: $query"
echo ""

# Read example brief if present
BRIEF_TEXT=""
if [ -f "$INPUTS_DIR/example-brief.md" ]; then
  BRIEF_TEXT="$(cat "$INPUTS_DIR/example-brief.md")"
fi

# ── Commands that search the filesystem ──
if [ "$action" = "summarize" ] || [ "$action" = "explain" ]; then
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
    echo "I do not have that in your documents."
    echo "Available docs cover: workflow, MCP, validation, settings,"
    echo "identity kit, through-line, case studies, deployment."
    rm "$matches"
    exit 0
  fi

  echo "--- Sources found ---"
  sort -rn "$matches" | head -10 | while read -r count file; do
    relpath="${file#$REPO_ROOT/}"
    echo "  [$count matches] $relpath"
  done
  echo ""

  # Build document list (top 5)
  doc_list=""
  for f in "$ASSIGNMENTS_DIR"/week-0*/*.md "$ASSIGNMENTS_DIR"/week-0*/*/*.md; do
    if [ -f "$f" ]; then
      count=$(grep -ic "$query" "$f" 2>/dev/null || true)
      if [ "$count" -gt 0 ]; then
        relpath="${f#$REPO_ROOT/}"
        doc_list="$doc_list- $relpath"$'\n'
      fi
    fi
  done
  doc_list="$(echo "$doc_list" | head -5)"
  rm "$matches"
fi

echo "=== PROMPT FOR CLAUDE PROJECT ==="
echo "Paste this into Claude Project:"
echo ""

case "$action" in
  summarize)
    echo "I am working on: [assignment title]"
    echo ""
    echo "Documents loaded in this session:"
    echo "$doc_list"
    echo ""
    if [ -n "$BRIEF_TEXT" ]; then
      echo "Here is the assignment brief:"
      echo "$BRIEF_TEXT"
      echo ""
    fi
    echo "Read the assignment brief above and the loaded documents."
    echo "Summarise what I have already written that is relevant."
    echo "Include:"
    echo "1. What the assignment asks for"
    echo "2. What my existing docs cover (with file names)"
    echo "3. What gaps exist"
    ;;

  steps)
    echo "I am working on: $query"
    echo ""
    if [ -n "$BRIEF_TEXT" ]; then
      echo "Here is the assignment brief:"
      echo "$BRIEF_TEXT"
      echo ""
    fi
    echo "Read the assignment brief above. Then output a checklist"
    echo "of concrete next steps. For each step, reference which past"
    echo "document or pattern I should follow. Order by dependency."
    ;;

  draft)
    echo "I am working on: [assignment title]"
    echo ""
    echo "Files changed: $query"
    echo ""
    echo "Draft a 3-5 sentence submission note in my voice:"
    echo "- Direct and practical"
    echo "- First person"
    echo "- States what was created"
    echo "- Mentions any decisions or trade-offs"
    echo "- No filler"
    ;;

  explain)
    echo "I am working on: [assignment title]"
    echo ""
    echo "Documents loaded in this session:"
    echo "$doc_list"
    echo ""
    echo "Explain '$query' using ONLY what I wrote in my own"
    echo "documents. Use the most detailed source available."
    echo "If I did not write about it, say so."
    ;;

  next)
    echo "Just finished: $query"
    echo ""
    if [ -n "$BRIEF_TEXT" ]; then
      echo "The assignment asks for:"
      echo "$BRIEF_TEXT"
      echo ""
    fi
    echo "Based on what is done and what the assignment asks for,"
    echo "what should I do next? Output a dependency-ordered checklist."
    ;;
esac

echo ""
echo "=== End of demo ==="
