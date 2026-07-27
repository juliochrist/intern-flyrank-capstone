# Design Your Personal Agent

**Name:** Julio Christianto
**Week:** 05
**Date:** July 2026
**Agent:** Study Coach grounded in my notes and assignment documents

---

## Job To Be Done

The agent helps me move faster through internship assignments by turning my own documentation into usable material. It does not generate new ideas — it summarises, connects, and translates what I have already written.

Specifically, the agent:

- **Summarises assignments** — Given a brief like "Write a one-page analysis of MCP vs workflows," the agent reads my existing docs (identity kit, through-line, case studies, past assignment files) and produces a condensed summary with the key points I already made, so I do not re-read five documents to recall what I wrote.
- **Turns briefs into next steps** — Given an open-ended task like "Design a personal agent," the agent reads the relevant source material, identifies what is already done, and outputs a checklist of concrete next actions.
- **Drafts submission notes** — Given a set of file changes or a feature description, the agent drafts the assignment submission body in my voice — direct, practical, no buzzwords — matching the tone used in weeks 1–5.
- **Explains unfamiliar concepts from my own docs** — When an assignment references a concept I have covered before (e.g. "Draft → Critique → Revise pipeline," "MCP," "Cross-field validation"), the agent finds where I wrote about it and explains it using my own examples and language.

---

## User and Usage Frequency

**User:** Me (Julio Christianto, Frontend AI Engineering Intern at FlyRank).

**Frequency:** 3–5 times per week, tied to assignment cycles. Each week has 1–2 major deliverables plus supporting documents. The agent is used at the start of a new week (summarise past context), during drafting (turn briefs into next steps), and before submission (draft submission notes).

**When in the workflow:**
1. Monday — Read the week's assignment brief, ask agent to summarise relevant past docs.
2. Mid-week — Agent helps break the brief into next steps and finds relevant examples from earlier weeks.
3. Friday — Agent drafts the submission note from the completed files.
4. Ad-hoc — When an assignment references a concept I wrote about weeks ago, ask agent to pull my own explanation instead of Googling.

---

## Tools and Data Needed

The agent needs access to the repository's documentation. It does not need the web, a codebase index, or any external API.

### Data Sources

| Source | What It Contains | Access Plan |
|---|---|---|
| **Claude Project knowledge base** | Uploaded identity kit, through-line, case studies, build-core doc, prompt templates | Upload once as reference documents. The Claude Project stores them permanently and the agent reads them on every session. This covers weeks 1–4. |
| **Assignment briefs** | The prompt or task description for each week's deliverable | Pasted into the chat at the start of each session. Not stored permanently — each week's brief is different. |
| **README.md** | Repository overview, architecture, assignment index, progress tracking | Uploaded to the Claude Project knowledge base once and kept current. |
| **Past assignment docs** | Full markdown files from `/assignments/week-01/` through `/assignments/week-05/` | The 20+ existing markdown files are too many to upload individually. Instead, I upload the most relevant 3–5 documents at the start of each session. For example, if this week is about agents, I upload the Week 4 agent-and-mcp.md. |

### What I Do Not Have

- No vector database or RAG pipeline. The agent relies on what is in the Claude Project knowledge base plus what I paste each session.
- No web search. The agent cannot fetch new information — it works exclusively from my uploaded content.
- No code execution. The agent reads and writes text. It does not run tests or compile code.

---

## Draft Instructions

These are the instructions I put in the Claude Project or paste at the start of a session.

```
You are a study coach grounded in my internship documentation.

You work ONLY from the documents I upload or paste — the identity kit,
through-line, case studies, build-core documentation, past assignment
files, and the README.

Your job is to help me complete FlyRank internship assignments by
working with what I have already written, not by introducing new
information.

Rules:
- Base every claim on my uploaded documents. If you cannot find it
  in my docs, say "I do not have that in your documents" — do not
  guess or use general knowledge.
- Never add buzzwords. My writing is direct and practical. If the
  output sounds like "synergy" or "leverage" or "empower," remove it.
- Use the Draft → Critique → Revise pattern from my workflow docs.
  First draft an answer, then critique it against my past work for
  tone and accuracy, then revise.
- When summarising an assignment, always include:
  1. What the assignment asks for
  2. What I have already written that is relevant
  3. What is still missing
- When explaining a concept, find where I wrote about it in my own
  docs first. Use my examples and language. Only supplement with
  general knowledge if I specifically ask for "outside help."
- When drafting submission text, match the tone of my week-01 through
  week-05 docs: direct, honest, first-person, no filler.

Output format for all responses:
- First, say which documents you used ("Based on your through-line doc
  and your case studies file...")
- Then, deliver the answer
- End with 1–3 open questions or decisions I still need to make
```

---

## Five Eval Cases

### Case 1 — Summarise a Past Assignment

**Input:** "Summarise what I wrote about MCP and workflows in week 4."

**Expected behaviour:** The agent reads the uploaded `agent-and-mcp.md` and `workflow-as-a-service.md` files and produces a 3–4 paragraph summary covering my definition of workflows vs agents, how MCP works, and which parts of my pipeline could become agentic.

**Success:** The summary includes my specific examples (opencode tools, Vercel AI SDK, the `watch` vs `getValues` bug from the Critique step). It uses my own definitions, not textbook definitions. It ends with questions about what I still need to decide.

**Failure:** The agent produces a generic explanation of MCP from its training data, uses terms I never used, or omits my specific examples (opencode, the Draft → Critique → Revise pipeline).

---

### Case 2 — Turn a Brief Into Next Steps

**Input:** "The next assignment is: 'Design Your Personal Agent.' I need to write a one-to-two page design doc. What are the next steps?"

**Expected behaviour:** The agent reads the assignment description and produces a checklist of concrete actions. It should reference how past weeks structured similar documents (e.g. "Week 4 agent-and-mcp.md used the format: definition → comparison → reflection") and suggest an outline.

**Success:** The checklist includes specific file paths, section headers, and references to which past documents I should re-read.

**Failure:** The agent gives generic advice like "start with an introduction and end with a conclusion." It does not reference my actual assignment structure from past weeks.

---

### Case 3 — Draft Submission Note

**Input:** "I just completed the personal agent design doc. Files changed: assignments/week-05/fl-06-personal-agent.md (new), README.md (updated). Draft the submission note in my voice."

**Expected behaviour:** The agent reads the new file and produces a 3–4 sentence submission note in my documented voice: direct, first-person, mentions what was created, and any decisions made. It avoids "I am excited to submit" or "Please find attached."

**Success:** The note matches the tone of my past submission docs. It includes specific details from the actual file (the agent's JTBD, the eval cases, the platform choice).

**Failure:** The note is buzzwordy, uses third person, or makes claims about the agent that are not in the design doc.

---

### Case 4 — Explain a Concept From My Own Docs

**Input:** "Explain what 'cross-field validation' means. Use only what I wrote in my own documents."

**Expected behaviour:** The agent finds the relevant passage from the Prompt Ladder or Prompting Fundamentals docs where I documented the `watch` vs `getValues` bug in the SettingsForm. It explains cross-field validation using that specific example — password confirmation validation, the `getValues` fix, and why the bug survived the Draft step.

**Success:** The explanation is grounded in my actual code and my actual bug. It does not introduce general definitions of cross-field validation from the internet.

**Failure:** The agent explains cross-field validation in general terms ("cross-field validation means validating one field based on the value of another"). It does not reference my SettingsForm example or the `getValues` bug.

---

### Case 5 — No Document Available

**Input:** "What did I write about deploying to Netlify?"

**Expected behaviour:** The agent checks the uploaded documents (which cover Vercel deployment only) and responds: "I do not have that in your documents. Your deployment documentation covers Vercel (see empty-but-live.md and build-core.md). If you wrote about Netlify in a file I have not seen, upload it and I can review it."

**Success:** The agent correctly identifies the gap and does not fabricate an answer. It suggests what IS available.

**Failure:** The agent guesses about Netlify deployment based on general knowledge, invents a document that does not exist, or describes Vercel steps as if they apply to Netlify.

---

## Risks and Guardrails

### What the Agent Must Confirm Before Acting

- Confirm which documents are loaded before answering. If I ask a question and the relevant doc is not uploaded, the agent must say so — not proceed with training data.
- Confirm the assignment brief. "I see you are working on the personal agent design doc. I have your week-4 MCP doc and your workflow-as-a-service doc loaded. Is this the right context?"

### What It Must Never Do

- Never invent a document or claim I wrote something I did not. The agent works exclusively from uploaded content.
- Never change the tone. If I write direct and practical, the agent must not "professionalise" my voice into corporate-speak.
- Never skip the citation step. Every response must begin with which documents were used.

### What It Should Ask For When Uncertain

- "I found two relevant sections — one in your workflow-as-a-service doc and one in your prompt-ladder doc. Which one should I use as the primary source?"
- "Your past submission docs use slightly different formats. Should I match the week-4 format or the week-3 format?"
- "The assignment brief mentions 'deployment considerations' but I do not see a deployment doc loaded. Do you want me to proceed without it, or should you upload it?"

### What It Should Not Hallucinate

- Project statuses ("you completed this last week" — the agent does not know my actual status unless I tell it).
- Colleague or reviewer names. The agent has no information about who reviewed my work.
- Links or URLs to my projects. The agent should only reference URLs that appear in the uploaded documents.
- Timeline or deadline information. The agent does not know when assignments are due.

---

## Platform Choice

**Chosen platform:** Claude Project with connectors and skills.

### Why This Platform

Claude Project is the best fit for three reasons:

1. **No backend required.** I do not need to set up a server, database, or API. The Claude Project stores reference documents (identity kit, through-line, case studies, build-core, prompt templates) and my instructions persist across sessions. This matches my actual infrastructure — I have no backend, no database, and no budget for one.

2. **Knowledge base fits my use case.** The study coach agent needs access to 10–20 pages of Markdown documentation. Claude Project's knowledge base can hold this comfortably. I upload the key docs once and they are available in every session. I do not need a vector database, RAG pipeline, or embeddings.

3. **The Draft → Critique → Revise workflow is already built.** My Week 4 pipeline was designed for Claude. The study coach agent is an extension of that same workflow — it drafts from my documents, critiques against my tone and accuracy rules, and revises before outputting. Staying in Claude Project means the instructions I already wrote (draft prompt template, critique prompt, revise prompt) transfer directly.

### Alternative Considered and Rejected

**Custom GPT (ChatGPT):** I considered building a custom GPT with uploaded documentation. I rejected it because my workflow documentation, prompt templates, and most of my development work use Claude. ChatGPT was used for comparison runs (Prompting Fundamentals V5) but is not my primary tool. Maintaining two agent configurations across two platforms creates drift — fixes to the instructions in one do not sync to the other. Since I use Claude for drafting and critique, the agent should live where the workflow lives.

**Not considered:** n8n, scripted agents, Claude Cowork. All three require setup time and ongoing maintenance that is disproportionate to the agent's scope. A Claude Project with uploaded docs and saved instructions takes 15 minutes to configure and requires zero maintenance.

---

## Final Spec Summary

The study coach agent is a set of persistent instructions inside my Claude Project, paired with uploaded copies of my key internship documents (identity kit, through-line, case studies, build-core, prompt templates, past assignment docs). When I start a new assignment, I upload the current brief and the 3–5 most relevant past documents, then ask the agent to summarise, plan, draft, or explain — always grounded in what I already wrote. The agent uses my Draft → Critique → Revise workflow internally, cites its sources before every answer, and refuses to guess when it does not have the document. It is not an autonomous system. It is a faster way to navigate and reuse my own work.
