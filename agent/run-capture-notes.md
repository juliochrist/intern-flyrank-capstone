# Study Coach Agent — Run Capture Notes

## Goal

Capture a 2-minute demo showing the study coach agent handling one real workflow: reading assignment docs and producing a structured summary.

---

## What the Run Should Show

1. Open the agent workspace — show `agent/` directory structure
2. Run the demo script with a sample query
3. Show the script reading local markdown files and extracting relevant content
4. Show the prepared context output — the prompt that would go into Claude Project
5. Close by showing the FL-07 submission doc

---

## Script Walkthrough

```bash
# Show the agent workspace
ls -la agent/

# Show the demo script
cat agent/demo.sh

# Run the demo — summarise what I wrote about workflows
./agent/demo.sh summarize "workflow"

# Run another — turn a brief into next steps
./agent/demo.sh steps "build a personal agent"

# Run the explain case
./agent/demo.sh explain "cross-field validation"
```

---

## What the Reviewer Should See

- The demo script finds real files from the repo (not fake data)
- Output includes file names and relevant excerpts
- The script documents which sources it used
- The output ends with open questions (matching the agent output format)

---

## Success Path

```
$ ./agent/demo.sh summarize "workflow"
=== STUDY COACH AGENT ===
Action: summarize
Query: workflow

Reading from agent/inputs/example-brief.md...
Reading from assignments/week-04/workflow-as-a-service.md...
Reading from assignments/week-04/agent-and-mcp.md...

=== SOURCES FOUND ===
1. assignments/week-04/workflow-as-a-service.md (lines 1-315)
2. assignments/week-04/agent-and-mcp.md (lines 1-205)

=== PREPARED CONTEXT ===
{structured summary of what I wrote about workflows}

=== OPEN QUESTIONS ===
{1-3 questions}
```

---

## What to Narrate During Capture

- "The agent reads from my actual assignment files — no fake data."
- "It collects the relevant sections and prepares them as context."
- "In production, this context goes into Claude Project where the agent processes it and returns the summary."
- "The demo shows the filesystem connector working. The reasoning step happens in Claude Project."
