# Study Coach Agent — Run Capture Notes

## Goal

Capture a 2-minute demo showing the study coach agent completing one real end-to-end workflow: reading local assignment files and outputting a ready-to-paste prompt for Claude Project.

---

## What the Run Should Show

1. Show `agent/` directory structure
2. Run `./agent/demo.sh summarize "workflow"` — finds real files, outputs prompt
3. Run `./agent/demo.sh steps "FL-07: Build the agent"` — outputs prompt with brief
4. Run `./agent/demo.sh explain "cross-field validation"` — finds concept docs
5. Run `./agent/demo.sh summarize "netlify"` — shows the gap-handling path
6. Open `agent/instructions.md` to show the system prompt that goes into Claude Project
7. Close by showing `agent/build-log.md` to document what was cut and why

---

## Script Walkthrough

```bash
# 1. Show the workspace
ls -la agent/

# 2. Summarise — searches files and outputs ready-to-paste prompt
./agent/demo.sh summarize "workflow"

# 3. Steps — outputs prompt with brief for next-steps generation
./agent/demo.sh steps "FL-07: Build the agent"

# 4. Explain — searches and outputs explain prompt
./agent/demo.sh explain "cross-field validation"

# 5. Gap handling — shows the no-doc response
./agent/demo.sh summarize "netlify deployment"

# 6. Show the instructions that live in Claude Project
cat agent/instructions.md
```

---

## What the Reviewer Should See

- The script reads real files from the repo (verified by file paths in output)
- All 5 action types produce usable prompts
- The gap case ("netlify") shows the honest "not in your documents" response
- The instructions.md contains the full system prompt that runs in Claude Project

---

## Success Path

```
$ ./agent/demo.sh summarize "workflow"
=== STUDY COACH AGENT ===
Action: summarize
Query: workflow

--- Sources found ---
  [13 matches] assignments/week-04/workflow-as-a-service.md
  [12 matches] assignments/week-04/agent-and-mcp.md
  ...

=== PROMPT FOR CLAUDE PROJECT ===
Paste this into Claude Project:

I am working on: [assignment title]

Documents loaded in this session:
- assignments/week-01/workflow-audit.md
- assignments/week-03/through-line.md
...

Read the assignment brief above and the loaded documents.
Summarise what I have already written that is relevant.
...
[end of prompt]

=== End of demo ===
```

---

## What to Narrate During Capture

- "The script reads from my actual assignment files — verified by the match counts and file paths."
- "It outputs a complete prompt ready to paste into Claude Project."
- "The prompt includes the document list, the brief, and the task-specific instructions."
- "The user copies this prompt, pastes it into Claude Project, and the agent responds."
- "That is the end-to-end run: filesystem read → prompt preparation → Claude Project reasoning."
- "The gap case proves the agent does not fabricate — if a topic is not in the docs, it says so."
- "The instructions.md is the configuration that lives inside Claude Project — it is not a simulation."
