## Phase 3 – Next.js Starter

- **Live Preview:** https://flyrank-capstone.vercel.app/
- **Repository:** https://github.com/juliochrist/intern-flyrank-capstone

**Health Check:** `/health`

**Technologies:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, React Hook Form

### Architecture

- Server Components by default
- Client Components only for interactive UI (Navbar, SettingsForm)
- Responsive design at 375px, 768px, 1280px
- Design tokens via CSS custom properties

---

## Assignments

### Week 1

- [Workflow Audit](assignments/week-01/workflow-audit.md)
- [Portfolio Sitemap](assignments/week-01/portfolio-sitemap.md)
- [Pressure Test](assignments/week-01/pressure-test.md)
- [Proof Statement](assignments/week-01/proof-statement.md)

### Week 2

- [Frame It as Cases](assignments/week-02/frame-it-as-cases.md)
- [Prompt Ladder](assignments/week-02/prompt-ladder.md)
- [Prompting Fundamentals v2](assignments/week-02/prompting-fundamentals-v2.md)

### Week 3

- [Identity Kit](assignments/week-03/identity-kit.md)
- [Curate Your Images](assignments/week-03/curate-your-images.md)
- [Using AI Effectively in React Development](assignments/week-03/using-ai-effectively-react.md)
- [Build Core](assignments/week-03/build-core.md)
- [AI React Development Assignment](assignments/week-03/ai-react-development/prompts-used.md)
- [Documentation](assignments/week-03/ai-react-development/ai-assistance.md)
- [Prompt History](assignments/week-03/ai-react-development/prompts-used.md)
- [Manual Improvements](assignments/week-03/ai-react-development/manual-improvements.md)

### Week 4

- [Empty but Live](assignments/week-04/empty-but-live.md)
- [Three Roads](assignments/week-04/three-roads.md)
- [Workflow as a Service](assignments/week-04/workflow-as-a-service.md)
- [Agentic Systems & MCP](assignments/week-04/agent-and-mcp.md)

### Week 5

- [Ship the Ugly One](assignments/week-05/ship-the-ugly-one.md)
- [FL-06: Design Your Personal Agent](assignments/week-05/fl-06-personal-agent.md)
- [FL-07: Build the Agent](assignments/week-05/fl-07-build-agent.md)
- [FE-07: Tool Results and Structured Output](assignments/week-05/fe-07-tool-results.md)
- [FE-08: Error States, Empty States, and Edge Cases](assignments/week-05/fe-08-error-states.md)
- [PF-04: Personal Website Live on the FlyRank Domain](assignments/week-05/pf-04-personal-website.md)
- [Deployment Checklist](assignments/week-05/deployment-checklist.md)

### Agent Workspace

- [Agent Spec](agent/agent-spec.md)
- [Instructions](agent/instructions.md)
- [Eval Cases](agent/eval-cases.md)
- [Tool Map](agent/tool-map.md)
- [Build Log](agent/build-log.md)
- [Run Capture Notes](agent/run-capture-notes.md)
- [Demo Script](agent/demo.sh)

---

## FE-07 Tool Contract

The AI chat (`/chat`) exposes one server-side tool so the model can ground its answers in this project's own documentation instead of guessing.

**Tool name:** `searchProjectDocs`

**Purpose:** Searches a curated index of the project's documentation (internship assignments from weeks 1–5 plus the Study Coach agent workspace) and returns a structured summary of the documents that match a query.

**Input schema** (`lib/ai/tools.ts`):

| Field | Type | Notes |
|---|---|---|
| `query` | `string` | Required, 1–120 chars. |
| `scope` | `"all" \| "assignments" \| "agent"` | Optional, defaults to `"all"`. `assignments` limits to week 1–5 docs, `agent` to the agent workspace. |

**Return shape:**

```ts
{
  query: string;
  title: string;
  summary: string;
  findings: string[];
  matchedFiles: string[];
  matchedCount: number;
}
```

**Execution:** The tool is defined in `lib/ai/tools.ts` and passed to `streamText` in `app/api/chat/route.ts`. The model decides when to call it; execution happens server-side. No API keys or secrets are exposed to the client — the data source is `lib/ai/projectDocsData.ts`, a distilled snapshot of the repo's real markdown docs. The tool is deterministic (no external API): it ranks docs by keyword matches in title, summary, key points, and file path.

**Failure injection (testing only):** a query prefixed with `!fail` (e.g. `!fail test`) makes the tool throw, which streams a `tool-error` part and renders the designed error state in the UI without crashing the chat.

**Local verification without an API key:** run the server with `AI_MOCK=1` to swap in a deterministic mock model (`lib/ai/mockModel.ts`) that triggers the tool on docs queries and on `!fail`; otherwise `getModel()` (Claude) is used as usual.

**Example:** User asks *"What did I write about the Study Coach agent?"* → the model calls `searchProjectDocs({ query: "Study Coach agent", scope: "all" })` → the tool returns `{ matchedCount: 4, title: 'Project docs matching "Study Coach agent"', findings: [...], matchedFiles: [...] }` → the chat renders a **Project Docs Result Card** (structured component) and the model summarizes the findings in text.

See [assignments/week-05/fe-07-tool-results.md](assignments/week-05/fe-07-tool-results.md) for the full assignment write-up.

---

## FlyRank Internship Progress

- ✅ Week 1 Completed
- ✅ Week 2 Completed
- ✅ Week 3 Completed
- ✅ Week 4 Completed
- ✅ Week 5 Completed

### Week 3

- ✅ Identity Kit
- ✅ Curate Your Images
- ✅ Using AI Effectively in React Development
- ✅ Build Core
- ✅ AI React Development Assignment
  - ✅ Documentation
  - ✅ Prompt History
  - ✅ Manual Improvements

### Week 4

- ✅ Empty but Live
- ✅ Three Roads
- ✅ Workflow as a Service
- ✅ Agentic Systems & MCP

### Week 5

- ✅ Ship the Ugly One
- ✅ FL-06: Design Your Personal Agent
- ✅ FL-07: Build the Agent
- ✅ FE-07: Tool Results and Structured Output
- ✅ FE-08: Error States, Empty States, and Edge Cases
- ✅ PF-04: Personal Website Live on the FlyRank Domain
- ✅ Deployment Checklist

### Checkpoint 1

- ✅ AI Chat is production-ready with proper error, loading, and empty states
