# FL-07 — Build the Agent

**Name:** Julio Christianto
**Week:** 05
**Date:** July 2026
**Agent:** Study Coach grounded in my notes and assignment documents

---

## What the Agent Does

The study coach agent helps me move faster through internship assignments by turning my existing documentation into usable material. It does four jobs:

1. **Summarises assignments** — Given a brief, reads my relevant past docs and produces a condensed summary of what I already wrote.
2. **Turns briefs into next steps** — Given an open-ended task, identifies what is already done and outputs concrete next actions.
3. **Drafts submission notes** — Given file changes, drafts the submission in my voice: direct, practical, no buzzwords.
4. **Explains concepts from my own docs** — Finds where I wrote about a concept and explains it using my own examples and language.

The agent does not generate new ideas. It summarises, connects, and translates what I have already written.

---

## Platform

**Claude Project** with knowledge base (uploaded reference docs) and persistent instructions.

The Claude Project stores:
- Identity kit
- Through-line / content map
- Case studies
- Build-core documentation
- Prompt templates
- README

Each session, I upload the current assignment brief and 3–5 relevant past docs. The agent reads these alongside the persisted knowledge base and applies the instructions.

---

## Live Connection

**Filesystem connector** — demonstrated via `agent/demo.sh`.

The demo script reads local assignment markdown files, searches for relevant content by topic, and prepares structured context that would be fed to the agent in Claude Project. This is the "live connection": the script uses `grep` and `cat` to access actual repository files and show what the agent would see.

The script covers all 5 use cases:
- `./agent/demo.sh summarize "workflow"` — finds and summarises what I wrote about workflows
- `./agent/demo.sh steps "build an agent"` — turns a brief into next steps
- `./agent/demo.sh draft "file changes"` — prepares context for a submission note
- `./agent/demo.sh explain "cross-field validation"` — finds where I wrote about a concept
- `./agent/demo.sh next "current state"` — determines what to do next

In production, the filesystem connector would be an MCP tool. The demo script simulates this with bash.

---

## Agent Workspace

```
agent/
├── agent-spec.md          # JTBD, user, tools, guardrails
├── instructions.md         # Exact system prompt + per-task templates
├── eval-cases.md           # 6 pre-build test cases with pass/fail criteria
├── tool-map.md             # Tool inventory with access realities
├── build-log.md            # Real build log — what broke, what was cut
├── run-capture-notes.md    # Screen capture script for 2-min demo
├── demo.sh                 # Lightweight filesystem connector demo
├── inputs/
│   └── example-brief.md    # Sample brief for demo runs
└── outputs/                # (reserved for future demo output captures)
```

---

## End-to-End Run

A complete run goes like this:

1. Open Claude Project with persisted instructions and knowledge base.
2. Upload current assignment brief and 3–5 relevant past docs.
3. Ask the agent: "Summarise what I wrote about MCP and workflows in week 4."
4. Agent reads the uploaded docs, finds relevant sections, and produces a summary with source citations and open questions.
5. I review the output, upload additional docs if needed, or ask for next steps.

The demo script replaces steps 1–2 locally: it finds relevant files from the filesystem and prepares the context. Steps 3–5 happen in Claude Project.

---

## What Remains Rough

- **No real MCP connector yet.** The demo script uses `grep` over the filesystem. A true MCP filesystem tool would let the agent read files on demand during the conversation without me uploading them manually. This is the next upgrade.
- **No automated eval.** The 6 eval cases are documented with pass/fail criteria but are not scripted. Each case requires a manual session in Claude Project.
- **Knowledge base is not versioned.** If I update a reference doc, I need to re-upload it to Claude Project. There is no sync between the repo and the knowledge base.
- **Demo script is prompt-preparation, not agent execution.** The script collects context but does not call an AI. The actual agent reasoning happens in Claude Project. This is honest about what I built versus what I would need to build a fully automated loop.
- **One end-to-end automatic run is not yet captured.** The demo script shows the filesystem connector working. A full captured run in Claude Project with the agent processing all 5 use cases is still needed.

---

## What I Learned

**Building the narrowest version meant cutting the thing I wanted most.** I wanted a script that reads files and returns AI-processed output — a real end-to-end agent. Cutting that to a prompt-preparation script felt like shipping less. But the honest scope is: I have Claude Project for reasoning, I have local files for data, and the bridge between them is manual upload. Automating that bridge is the next build.

**The tool map was the most useful file to write.** Listing every tool and marking "real / planned / demo-only" forced me to be honest about what actually works. The demo script is a simulation of an MCP filesystem tool, not the real thing. Writing that down prevented me from claiming capabilities I do not have.

**Eval cases before building caught a design problem.** Case 5 (no document available) revealed that the agent must have a documented signal for "I checked and you do not have this." Without that case, I would not have added the gap-detection language to the instructions. Writing tests first worked.

**The FL-06 design spec was close but not exact.** I added a 6th eval case ("what should I do next") during the build because it came up naturally. The instructions needed per-task prompt templates (summarise, steps, draft, explain) that the spec did not specify. The build revealed gaps in the design.
