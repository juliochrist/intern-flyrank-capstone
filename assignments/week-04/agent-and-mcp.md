# Agentic Systems & MCP

**Name:** Julio Christianto
**Week:** 04
**Date:** July 2026

---

## Workflow vs Agent

### What a Workflow Is

A workflow is a fixed sequence of steps. Each step has a defined input and output, and the path through the steps is predetermined. My FL-04 pipeline (Draft → Critique → Revise → Review) is a workflow. I decide the order, I decide what to check at each step, and the AI executes within the boundaries I set. The AI does not decide to skip the Critique step or add a new step — it follows the procedure I designed.

### What an Agent Is

An agent is a system that can make decisions, use tools, and adapt its behavior based on what it discovers. It does not follow a fixed path. Given a goal, an agent chooses which tools to call, in what order, and how to interpret results. An agent can loop, backtrack, or change its approach mid-task without a human pre-defining every step.

Anthropic's definition captures it well: an agent is a system where the model dynamically directs its own processes and tool usage to accomplish a task. The model decides the steps, not the developer.

### How They Are Different

| Aspect | Workflow | Agent |
|--------|----------|-------|
| Path | Fixed, predefined | Dynamic, model-decided |
| Tools | Called when the workflow says so | Called when the model decides it needs them |
| Adaptability | None — falls over on unexpected input | High — can change approach mid-task |
| Human role | Designs the steps | Sets the goal, reviews the outcome |
| Predictability | High — you know what will happen | Low — you know the goal, not the path |
| Complexity | Simple to build and debug | Complex to build, harder to debug |

### My FL-04 Pipeline Classification

My FL-04 pipeline (Draft → Critique → Revise) is a **workflow**, not an agent. Every step is pre-defined. I decide when to Draft, what criteria to Critique against, and what fixes to apply in Revise. The AI does not decide to add a step or change the order. It executes within the boundaries I set. This is the right choice for code generation — I want predictable output that I can review. An agent deciding to refactor unrelated files mid-task would be dangerous.

---

## What MCP Is

MCP (Model Context Protocol) is an open standard that defines how AI applications connect to external tools and data sources. It was created by Anthropic and works like a USB-C port for AI — one standardized connection that works with any compatible server.

MCP has three core concepts:

### Tools

Tools are functions an AI model can call to perform actions. Examples: reading a file, running a terminal command, searching the web, querying a database. The model does not execute the tool itself — it sends a tool call request, the client executes it, and the result is sent back to the model. Tools turn an AI from a text generator into an actor.

In the opencode environment I am using now, file reading (`read`), file searching (`glob`, `grep`), command execution (`bash`), and file editing (`edit`, `write`) are all MCP tools. The model requests a tool call, the client runs it, and the model sees the result. Without these tools, I could only generate text — I could not read the existing files, check the project structure, or run git commands.

### Resources

Resources are data sources the model can access. Unlike tools (which are actions), resources are data. Examples: a file on disk, a database row, a current weather reading, a GitHub issue. MCP standardises how the model requests and receives this data.

### Prompts

Prompts are reusable templates that can be stored on an MCP server. Instead of writing the same instructions every session, you define a prompt on the server and reference it by name. The model retrieves and uses it automatically.

### Why MCP Matters

Before MCP, every AI integration was custom. Connecting Claude to a codebase meant writing a one-off integration. Connecting it to a database meant a different integration. MCP replaces this with a standard protocol — anyone can build an MCP server for their tool or data source, and any MCP-compatible client can use it. This means:
- Tool builders write one server instead of N integrations
- AI applications switch tools without custom code
- Security is centralised (the server controls what the model can access)

---

## MCP Setup

### Connector / Server Used

I have two MCP connections active in my development environment:

**1. opencode (MCP Client with built-in tools)**

| Property | Value |
|----------|-------|
| Client | opencode (CLI AI tool) |
| Protocol | MCP (Model Context Protocol) |
| Tools provided | Read, Write, Edit, Glob, Grep, Bash, WebSearch, WebFetch, Task, Question |
| Connection to | Local filesystem and this project repository |
| Why chosen | opencode is the AI tool I use for development. Its tool system is built on MCP — every tool I invoke is an MCP tool call. The tools give me access to read files, write files, search code, and run commands that a plain chat session could not do. |

**2. Vercel AI SDK (`@ai-sdk/anthropic`)**

| Property | Value |
|----------|-------|
| Client | Next.js chat app (`app/api/chat/route.ts`) |
| Protocol | AI SDK standard (streaming text + tool calls) |
| Connection to | Anthropic Claude (via `@ai-sdk/anthropic`) |
| Model | `claude-sonnet-4-20250514` |
| Why chosen | This is the AI integration built into the capstone project. It provides a chat interface where Claude can generate streaming responses. The `streamText` function from the Vercel AI SDK supports tool calls, meaning this endpoint could be extended with MCP tools — it already has the infrastructure. |

Neither Claude Desktop nor the capstone project have external MCP servers configured (there are no MCP server entries in `claude_desktop_config.json`). The MCP interaction I am documenting is the opencode tool system, which is the active MCP-powered interface I use to develop this project.

---

## Three Tool-Based Tasks

These are tasks performed during this Week 4 session that required MCP tools — a plain chat without tool access could not do them.

### Task 1: Inspecting the Project Structure

**What tool was called:** `Read` (directory), `Glob` (file pattern matching)

**What happened:** I needed to understand the existing Week 4 files and project structure before writing new documentation. I read the `assignments/week-04/` directory listing, searched for all files matching `**/*mcp*` and `**/*claude*` across the repository, and read the `claude_desktop_config.json` to check for existing MCP configuration. The Read tool returned file contents I could reference directly. The Glob tool returned matching file paths across the entire project tree.

**Why plain chat could not do this:** A plain chat AI cannot list files in a directory or search for files by pattern. It can only generate text based on its training data or what the user explicitly tells it. Without the Read and Glob tools, I would have to manually type every file path and content into the conversation.

**Screenshot placeholder:** `![Read tool returning project directory listing](./workflow-assets/images/mcp-task-read.png)`

---

### Task 2: Searching for MCP Configuration Across System Paths

**What tool was called:** `Bash` (shell commands)

**What happened:** I needed to check multiple system locations for MCP configuration files that standard file search tools might not cover. I ran `ls -la ~/.config/opencode/`, `ls -la ~/.opencode/`, `ls -la ~/Library/Application\ Support/Claude/`, and `ls -la ~/.claude/` in sequence. The Bash tool executed each command in the shell and returned directory listings, file sizes, and timestamps. I found the Claude Desktop config at `~/Library/Application Support/Claude/claude_desktop_config.json` and confirmed it had no MCP servers configured.

**Why plain chat could not do this:** A plain chat AI cannot execute shell commands. It cannot inspect the filesystem outside what the user explicitly shares. Without the Bash tool, I would not know which config files exist, whether they contain MCP entries, or where to find them.

**Screenshot placeholder:** `![Bash tool showing Claude Desktop config directory contents](./workflow-assets/images/mcp-task-bash.png)`

---

### Task 3: Reading and Analysing the Claude Desktop Configuration

**What tool was called:** `Read` (file content)

**What happened:** After finding the `claude_desktop_config.json` file at the system path, I needed to read its full contents to check for MCP server configurations, tool permissions, and any existing connectors. The Read tool returned the entire JSON file. I could see the config has preferences for cowork mode, web search, and workspace settings — but no `mcpServers` block, confirming no MCP servers are connected to Claude Desktop on this machine.

**Why plain chat could not do this:** I found the file via a Bash command (Tool Task 2), and then needed to read it. A plain chat cannot open and read a file from the filesystem on request. Even if I described the file from memory, I could not verify its actual contents or quote exact keys.

**Screenshot placeholder:** `![Read tool returning claude_desktop_config.json contents](./workflow-assets/images/mcp-task-config.png)`

---

## Explainer

### What an Agent Is

An agent is an AI system that can pursue a goal by deciding its own steps, calling tools, and adapting based on results. The key difference between an agent and a chatbot is autonomy. A chatbot waits for the next user message. An agent receives a goal and proceeds — it reads files, runs commands, evaluates outcomes, and adjusts its approach without being told exactly how at each step.

Agents are not magical. They work within boundaries defined by their tools and system prompts. An agent with access to a file system and a terminal can navigate a codebase, identify patterns, and make changes. An agent with access to a database can query, analyse, and summarise data. The power is not that the AI is smarter — it is that the AI can *act* on what it reads and writes.

The hardest part of building an agent is not the AI — it is defining the loop: what the agent should do when it hits an error, how long it should try before asking for help, and what it should never do without human approval. These boundaries are what make an agent useful rather than dangerous.

### What MCP Is

MCP (Model Context Protocol) is the standard that makes agents practical. Before MCP, every tool integration was a custom adapter. You wanted Claude to read your database? Write a plugin. You wanted it to search your codebase? Write another plugin. Every integration was bespoke, fragile, and tied to one AI provider.

MCP standardises the interface. An MCP server declares: "here are my tools, here are my resources, here are my prompts." Any MCP-compatible client — Claude Desktop, opencode, an IDE plugin, a custom app — can discover and use them. The server controls access. The client routes tool calls. The model uses tools by name.

For my work, MCP means the tools I rely on (reading files, searching code, running commands) are not custom to this project. They work the same way in any MCP client. If I switch from opencode to another MCP-compatible tool next week, the same servers connect without rewiring.

### What My FL-04 Workflow Would Need to Become an Agent

My current pipeline has three steps I control and one the AI executes:

```
Human: define task + criteria → AI: Draft → Human: review → AI: Revise
```

To become an agent, the AI would need:

1. **File system tools:** Read the project's existing files, check imports, verify types — not just generate text but inspect what already exists.
2. **Linter / type checker access:** Run `tsc --noEmit` or `next lint` automatically after generating code, catch errors, and self-correct without me pointing them out.
3. **Git awareness:** Know which files changed, stage only the intended ones, generate the commit message.
4. **Decision boundary:** Decide when the output is good enough vs when it needs another revise cycle. This is the hardest part — knowing when to stop.

The Draft step would stay the same (structured prompt + generation). But instead of me manually running the Critique, the agent would:
- Read the generated files
- Run `npx tsc --noEmit` to catch type errors
- Run `npx next lint` to catch lint errors
- Compare the output against the quality criteria stored as a resource

Then it would decide: pass the output, or loop back to Revise with the error list attached. I would only be pulled in when the agent cannot resolve an error after N attempts, or when the final output needs a human review before commit.

### One Concrete Agent Upgrade for My Pipeline

**Auto-Critique Agent for the Revise step.**

Currently, after the Draft step, I manually read through the output, check for TypeScript errors, check accessibility attributes, and test edge cases. This takes 10–15 minutes per run.

An Auto-Critique agent would:

1. Read every generated file
2. Run `npx tsc --noEmit` to catch type errors
3. Run `npx next lint` to catch lint errors
4. Run a checklist prompt against the quality criteria (stored as an MCP resource)
5. If issues found, automatically loop to Revise with the error list as context
6. If no issues found, present the output for human review

This would cut the Critique step from 10–15 minutes to under 1 minute for the easy cases (obvious type errors, missing imports) and leave me only the hard cases (business logic, design decisions).

The Vercel AI SDK in `app/api/chat/route.ts` already supports tool calls via `streamText`. Adding an MCP server that exposes `read_file`, `run_lint`, and `run_typecheck` tools would make this possible without changing the chat infrastructure.

---

## Reflection

- **Workflows and agents are not ranked — they are different tools.** A workflow is better when predictability matters (code generation). An agent is better when exploration matters (debugging, research). My FL-04 pipeline is correctly a workflow. Forcing agent autonomy into it would add risk without benefit.
- **MCP made local tool access standard.** Before understanding MCP, I thought each AI tool had its own plugin system. Realising that Read, Glob, Grep, and Bash are all MCP tools using the same protocol means I can use them in any MCP-compatible client without re-learning interfaces.
- **An agent can do what a workflow cannot: recover from errors without human intervention.** My current pipeline stops at every Critique step and waits for me. An agent could auto-fix a type error, re-lint, and continue — I would only see the final output. This is the practical difference that matters most.
- **The hardest part of agents is not building them — it is setting boundaries.** An agent with file system and terminal access could do real damage if its instructions are not precise enough. My FL-04 pipeline would need explicit rules: "never delete files, never modify dependencies, never run arbitrary install scripts, ask before creating new files outside the specified structure."
- **I would add one MCP server next: a linter/typechecker tool.** Running `tsc` and `lint` inside the Critique step automatically would catch the issues I currently find manually (like the `watch` vs `getValues` bug from the Prompt Ladder). The Vercel AI SDK already supports tool calls — wiring an MCP server with linting tools would be a small, practical next step.
