# Reminder: Add Next Case Study (TradeIntel)

**This file is the recurring-reminder artifact.** Every time this Claude Project / agent
session is opened, check the status of the TradeIntel case study before doing anything else.

## The reminder

> **Due:** 2026-09-30
> **Task:** Add the TradeIntel case study to the portfolio.
> **Draft lives at:** `docs/next-case-study.md`
> **How-to lives at:** `docs/adding-a-case-study.md`

## What to do when this reminder fires

1. Open `docs/next-case-study.md` and check the 3-beat draft.
2. Fill the open questions (data sources, sentiment analysis location, real metrics).
3. Follow `docs/adding-a-case-study.md` end-to-end: write-up → projects array → screenshot
   → pre-publish checklist → tsc/lint/build.
4. Update `docs/next-case-study.md` to reflect the next project (or delete it if no next case).

## GitHub Issue

The `gh` CLI was **not authenticated** when this file was created, so the issue could not be
created programmatically. Create it with:

```bash
gh auth login
gh issue create \
  --title "Add next case study: TradeIntel" \
  --assignee @me \
  --label reminder \
  --due-date 2026-09-30 \
  --body "Draft: docs/next-case-study.md. How-to: docs/adding-a-case-study.md."
```

If you'd rather not use `gh`, add a manual calendar/reminder for 2026-09-30 with the same
title. The single source of truth for the draft is `docs/next-case-study.md`, not the issue.