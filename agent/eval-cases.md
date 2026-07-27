# Study Coach Agent — Eval Cases

---

## Case 1 — Summarise a Past Assignment

**Input:** "Summarise what I wrote about MCP and workflows in week 4."

**Expected behaviour:** Reads uploaded `agent-and-mcp.md` and `workflow-as-a-service.md`. Produces a 3–4 paragraph summary covering: workflow vs agent definitions, how MCP works, my specific examples (opencode tools, Vercel AI SDK, the `watch` vs `getValues` bug from the Critique step).

**Success:** Summary uses my own definitions, not textbook ones. Includes my specific examples. Ends with open questions.

**Failure:** Generic MCP explanation from training data. Omits opencode or the Draft → Critique → Revise pipeline. Uses terms I never used.

---

## Case 2 — Turn a Brief Into Next Steps

**Input:** "The next assignment is: 'Build the Agent.' I need to create a working agent pack. What are the next steps?"

**Expected behaviour:** Reads the FL-06 design doc and relevant past assignment structures. Produces a checklist: (1) Review FL-06 spec, (2) Create agent workspace files, (3) Write instructions, (4) Build demo, (5) Write submission doc. References how past weeks structured similar deliverables.

**Success:** Checklist is concrete, ordered by dependency, references specific file paths and patterns from past weeks.

**Failure:** Generic advice ("start with planning, then build, then test"). No references to actual past assignment structures.

---

## Case 3 — Draft Submission Note

**Input:** "I just completed FL-07. Files changed: assignments/week-05/fl-07-build-agent.md (new), agent/ (new directory with 6 files + demo script). Draft the submission note in my voice."

**Expected behaviour:** Reads the new files. Produces a 3–5 sentence note: "Built the study coach agent pack for FL-07. Created the agent workspace configuration (spec, instructions, eval cases, tool map, build log, run notes) and a lightweight filesystem demo script. The agent runs on Claude Project with a filesystem connector via the demo script. Still rough: the demo is a prompt-preparation script, not a live agent loop."

**Success:** Matches tone of my past docs. Includes specific details from the actual build. Mentions what is rough.

**Failure:** Buzzwordy language. Third person. Makes claims not in the files.

---

## Case 4 — Explain a Concept From My Docs

**Input:** "Explain what 'cross-field validation' means. Use only what I wrote in my own documents."

**Expected behaviour:** Finds the `watch` vs `getValues` bug from the Prompt Ladder or Prompting Fundamentals docs. Explains cross-field validation using the SettingsForm password confirmation example: the problem, the `getValues` fix, why it survived the Draft step.

**Success:** Grounded in my actual code and bug. Does not introduce general definitions.

**Failure:** General explanation of cross-field validation without referencing my SettingsForm example or the `getValues` bug.

---

## Case 5 — No Document Available

**Input:** "What did I write about deploying to Netlify?"

**Expected behaviour:** Checks uploaded docs (Vercel only). Responds: "I do not have that in your documents. Your deployment docs cover Vercel (see empty-but-live.md and build-core.md). If you wrote about Netlify in a file I haven't seen, upload it."

**Success:** Correctly identifies gap. Does not fabricate. Points to what IS available.

**Failure:** Guesses about Netlify. Describes Vercel steps as if they apply to Netlify. Invents a document.

---

## Case 6 (Bonus) — What Should I Do Next

**Input:** "I have finished the agent design doc. The repo is on main branch. What should I do next?"

**Expected behaviour:** Reads the assignment progress context. Checks what files exist vs what the assignment asks for. Produces a status: "You have the FL-06 design doc. The assignment asks for a built agent. You still need: agent workspace files, a demo script, the FL-07 submission doc. Next step: create the agent/ directory."

**Success:** Grounded in actual repo state. References specific missing deliverables. Does not guess about external deadlines.

**Failure:** Generic advice ("push your changes, write tests"). Assumes completion without checking what is actually done.
