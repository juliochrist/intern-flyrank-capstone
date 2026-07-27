# Study Coach Agent — Tool Map

---

| Tool / Source | What It Provides | How the Agent Uses It | Real / Planned |
|---|---|---|---|
| **Claude Project knowledge base** | Uploaded reference docs: identity kit, through-line, case studies, build-core, prompt templates, README | Persistent context — available every session without re-uploading | Real — configured in Claude Project web UI |
| **Local filesystem (assignments/)** | All past assignment markdown files | Read via `grep` + `cat` in the demo script to find and surface relevant content | Real — `agent/demo.sh` reads from this repo |
| **Current session chat** | Assignment brief pasted by me | Primary interaction channel — I paste the brief, agent responds | Real — standard Claude chat |
| **Per-session uploads** | 3–5 most relevant past docs chosen for the current task | Uploaded at session start; agent reads them alongside persisted knowledge base | Real — Claude Project file upload |
| **agent/demo.sh** | Lightweight demo script | Not used by the agent itself — it is a standalone demonstration of the filesystem connector pattern | Demo only — shows what a live MCP filesystem tool would do |

---

## Access Realities

| Claim | Reality |
|---|---|
| "The agent reads my files automatically" | Only in the demo script. In production, I upload files manually to Claude Project. |
| "The agent has full repo access" | No. The agent only sees what is in its knowledge base or what I paste. |
| "MCP connector is live" | Not yet. The demo script simulates what an MCP filesystem tool would provide. Setting up a real MCP server for this repo is the next step. |
