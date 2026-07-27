# Study Coach Agent — Build Log

**Build dates:** July 2026
**Starting spec:** FL-06 (assignments/week-05/fl-06-personal-agent.md)

---

## Build 1 — Agent Workspace Files

**Goal:** Create the configuration pack that would go into a Claude Project.

**What was created:**
- `agent/agent-spec.md` — Condensed spec from FL-06
- `agent/instructions.md` — System prompt + per-task prompt templates
- `agent/eval-cases.md` — 6 eval cases (5 from FL-06 + 1 bonus)
- `agent/tool-map.md` — Realistic tool inventory with access realities
- `agent/build-log.md` — This file
- `agent/run-capture-notes.md` — Demo screen capture script

**What changed from spec:**
- FL-06 spec called for 5 eval cases. Added a 6th ("What should I do next") because it is a realistic workflow question that came up during my own usage. Kept the original 5 intact.
- FL-06 spec had a "Risks and Guardrails" section. Split it into agent-spec.md (concise guardrails) and instructions.md (enforced via system prompt). The spec document kept the detailed version.

**Status:** Complete.

---

## Build 2 — Demo Script

**Goal:** Create a lightweight local demo showing the filesystem connector.

**What was created:**
- `agent/demo.sh` — Bash script that takes a command + query, reads local assignment files via `grep`, and outputs structured context
- `agent/inputs/example-brief.md` — A sample assignment brief for demo runs

**What broke:**
- First attempt tried to use `fzf` for interactive selection. Cut because `fzf` is not installed by default on macOS. Switched to positional arguments.
- Second attempt included AI processing via `curl` to an API. Cut because the agent spec says "no backend required" — a working demo should not depend on an API key. The script now outputs the prepared context only, which is the honest scope.

**What was cut from spec and why:**
- "Live MCP connector" — Setting up a real MCP filesystem server requires Claude Desktop and MCP configuration. This is documented as the next step but not implemented in this build. The demo script simulates what MCP would provide.
- "Full end-to-end agent loop" — A script that reads files, processes them with AI, and returns output would require an API key and backend. The honest scope is: a prompt-preparation script that collects context from local files. The actual agent reasoning happens in Claude Project.

**Status:** Complete within scope. Demo script shows the data flow. Agent reasoning is documented but not automated.

---

## Build 3 — FL-07 Submission Doc

**Goal:** Write the submission-facing writeup.

**What was created:**
- `assignments/week-05/fl-07-build-agent.md`

**What changed from spec:**
- Added honest section: "What I Cut and Why" — documents every decision to keep the build narrow.

**Status:** Complete.

---

---

## Build 4 — Tighten End-to-End Run (Revision)

**Goal:** Make one complete end-to-end run work without changing architecture.

**What changed:**

| File | Change | Reason |
|---|---|---|
| `agent/demo.sh` | Outputs exact prompt text ready for Claude Project | Previously output generic "Next step: upload and ask" instructions. Now outputs the actual prompt with doc list, brief, and task template — copy, paste, run. |
| `agent/demo.sh` | Split commands into filesystem-search (summarize, explain) and direct-prompt (steps, draft, next) | `steps "FL-07"` and `draft "added files"` failed because they searched files for the query string, but the query is a brief or description, not a search term. Fixed by only searching files for summarize and explain. |
| `agent/demo.sh` | Gap case outputs correct response | If a topic has no matches, outputs "I do not have that in your documents" with the available coverage list. |
| `agent/run-capture-notes.md` | Updated success path to match actual script output | Previously described a simplified output format that did not match what the script produces. Now matches real output with match counts, file paths, and the full prompt template. |

**What was cut and why:**
- "Add excerpts to the prompt output" — Considered showing actual matching lines in the prompt text. Cut because (1) the prompt would be too long to paste, (2) Claude Project already has the full docs, it does not need excerpts. The doc list is sufficient.
- "Script the eval cases" — Considered an automated pass/fail runner. Cut because each eval case requires a Claude Project session to judge output quality. A script cannot determine whether the agent's summary "uses my own definitions" — that is a human judgment.

**What was tested (all pass):**

| Command | Query | Result |
|---|---|---|
| `./agent/demo.sh summarize "workflow"` | workflow | Finds 9 files, outputs prompt with doc list |
| `./agent/demo.sh steps "FL-07: Build the agent"` | FL-07: Build the agent | Outputs prompt with brief included |
| `./agent/demo.sh draft "added agent workspace"` | added agent workspace | Outputs prompt with file changes |
| `./agent/demo.sh explain "cross-field validation"` | cross-field validation | Finds 9 files, outputs prompt with doc list |
| `./agent/demo.sh next "FL-06 done"` | FL-06 done | Outputs prompt with status |
| `./agent/demo.sh summarize "netlify"` | netlify | Outputs gap response (1 incidental match, agent handles nuance) |

**Status:** Complete. All 5 required capabilities work. One end-to-end path is verified: filesystem read → prompt output → (manual paste) → Claude Project reasoning.

---

## Still Needs Improvement

- [ ] Real MCP filesystem connector — requires Claude Desktop + MCP server config
- [ ] Live agent session recording — a captured run in Claude Project showing the agent handling all 5 use cases
- [ ] Automated eval — a script that runs all eval cases and checks pass/fail against criteria
- [ ] Knowledge base document index — a maintained list of which docs are in the Claude Project knowledge base
