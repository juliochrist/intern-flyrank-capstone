# FE-07: Tool Results and Structured Output in the UI

Add one real server-side tool to the existing AI chat and render its full lifecycle in the UI.

## Tool Chosen

**`searchProjectDocs`** — searches this project's own documentation index.

## Why It Fits the Capstone

The capstone's personal agent concept is the "Study Coach" (FL-06 / FL-07): it answers questions about the intern's own writing by reading the project's docs. The agent's tool map (`agent/tool-map.md`) explicitly lists a local-filesystem connector as **planned**, not real — the `agent/demo.sh` script only simulates it.

`searchProjectDocs` makes that connector real inside the deployed chat: a deterministic, server-side tool that searches a distilled index of the repo's actual markdown documentation (assignments week 1–5 + agent workspace) and returns structured findings. It uses existing project data — no invented external API.

## Tool Input

Defined with a Zod schema in `lib/ai/tools.ts`:

| Field | Type | Validation |
|---|---|---|
| `query` | `string` | required, min 1, max 120 |
| `scope` | `"all" \| "assignments" \| "agent"` | optional, default `"all"` |

## Tool Output

```ts
{
  query: string;
  title: string;            // synthesized result title
  summary: string;          // what matched
  findings: string[];       // key points from matched docs (max 6)
  matchedFiles: string[];   // top matched file paths (max 3)
  matchedCount: number;     // total matches
}
```

The execute function ranks docs by keyword hits in title, summary, key points, and file path, then returns the top results. Zero matches returns a structured "no matching documents" result rather than an error.

## Data Source

`lib/ai/projectDocsData.ts` — a curated snapshot of the repo's markdown docs (16 entries covering the main assignments and agent files). Each entry has a title, section, file path, summary, and key points. This keeps the tool deterministic and identical in dev and production (no filesystem dependency in the serverless bundle).

## Four Lifecycle States (UI)

Rendered by `components/chat/ToolPart.tsx` inside `components/chat/ChatMessage.tsx`. Each state has a distinct visual treatment; no raw JSON is ever shown.

| State | Part | UI |
|---|---|---|
| input-streaming | `dynamic-tool` + `state: "input-streaming"` | Spinner + "Preparing analysis — Project docs search…" |
| input-available | `state: "input-available"` | Wrench icon + "Analyzing Project docs search / Searching: "query"" |
| output-available | `state: "output-available"` | Renders the structured **Project Docs Result Card** component |
| output-error | `state: "output-error"` | Red alert card "Project docs search failed" + technical detail + **Retry** button (regenerates the response) |

## Structured UI Component

`components/chat/ProjectDocsResultCard.tsx` renders the tool output as a designed component, not JSON:

- Header with title and match-count badge
- Summary line
- "Key findings" bulleted list (indigo dot markers)
- "Sources" chips with the matched file paths
- Handles the no-match case (matchedCount 0) and missing/empty fields gracefully

## Error Handling

A throwing tool execution is caught by the AI SDK and streamed to the client as a `tool-error` part → `state: "output-error"`. This:

- does not crash the chat
- shows a designed error card with a retry action
- preserves the conversation and lets the user keep chatting
- lets the model continue and respond about the failure

**Deterministic failure path:** a query starting with `!fail` (e.g. `!fail test`) makes `searchProjectDocs` throw, so the output-error state is reproducible on demand.

## Files

- Created: `lib/ai/tools.ts` (tool via `dynamicTool`), `lib/ai/projectDocsData.ts`, `components/chat/ToolPart.tsx`, `components/chat/ProjectDocsResultCard.tsx`, `lib/ai/mockModel.ts` (test-only mock model)
- Modified: `app/api/chat/route.ts`, `lib/ai/systemPrompt.ts`, `components/chat/ChatMessage.tsx`, `components/chat/Chat.tsx`, `components/chat/ChatEmptyState.tsx`, `package.json` (added `zod`), `README.md`

## Testing Performed

- [x] Tool search logic unit-tested (matches, no-match, schema validation, `!fail` throw)
- [x] `npx tsc --noEmit` passes
- [x] `npm run lint` passes
- [x] `npm run build` passes
- [x] Normal chat still works (non-tool prompts)
- [x] Tool executes server-side (route + tool module)
- [x] Model triggers the tool on a docs question — verified end-to-end in the browser via the deterministic mock model (`AI_MOCK=1`); live Claude confirmation pending a valid `ANTHROPIC_API_KEY`
- [x] input-streaming renders
- [x] input-available renders
- [x] output-available renders the structured card
- [x] output-error renders (via `!fail` query)
- [x] Retry button re-triggers the response (via `regenerate()`)
- [x] Tool failure does not crash the app; user can continue chatting
- [x] No raw JSON shown to the user
- [x] Mobile layout: tool cards use the same `max-w` bubble constraints, no horizontal overflow
- [x] No console errors during normal use

## Known Limitations

- The documentation index (`lib/ai/projectDocsData.ts`) is a curated snapshot; it can drift from the actual markdown files until updated.
- The model is not forced to call the tool — it decides based on the prompt and system instructions.
- Tool-level retry regenerates the whole response (via `regenerate()`) rather than re-running only the failed tool call.
- Verification of live model behavior depends on a valid `ANTHROPIC_API_KEY`.
- For local UI verification without a key, run the server with `AI_MOCK=1` to use `lib/ai/mockModel.ts`, a deterministic model that triggers the tool on docs queries (and `!fail` for the error state).
- Chat history is in-memory only (no persistence), unchanged from FE-08.
