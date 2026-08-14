# Week 6: FE-09 — Testing Pass

Set up a real automated testing foundation for the AI chat and the rest of the project: Vitest + React Testing Library unit/component tests, an AI-route mock so tests never touch a real model, a Playwright end-to-end test of the primary chat flow, and a GitHub Actions CI pipeline that runs the whole suite on every push/PR.

No production behavior was changed. The chat implementation already handled every state correctly; the work in this pass is the test harness around it.

## Testing stack

| Tool | Purpose | Version |
|---|---|---|
| [Vitest](https://vitest.dev/) | Unit + component test runner | 4.x |
| [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) | JSX/TS transform for Vitest | 6.x |
| jsdom | DOM environment for component tests | 29.x |
| [@testing-library/react](https://testing-library.com/react) | Render + query components from a user's perspective | 16.x |
| @testing-library/jest-dom | Semantic DOM matchers (`toBeVisible`, `toHaveTextContent`, …) | 7.x |
| @testing-library/user-event | Realistic user interactions | 14.x |
| [@playwright/test](https://playwright.dev/) | End-to-end browser tests | 1.62 |

Configuration lives in `vitest.config.ts` (jsdom, project-root `@/*` alias, `test/setup.ts`) and `playwright.config.ts` (Chromium project, dev server booted with `AI_MOCK=1` on port 3100).

Scripts added to `package.json`:

- `npm run test` → `vitest run`
- `npm run test:watch` → `vitest`
- `npm run test:e2e` → `playwright test`

## What was tested

### The 6+ meaningful component tests

All component tests query by accessible role, label, or text — no `testID`, no CSS class dependencies.

1. **`components/chat/ChatMessage.test.tsx`** (9 tests) — the chat message renderer:
   - user text bubble
   - assistant markdown rendering (headings, bold, inline code)
   - streaming typing indicator (shown while streaming with no content, hidden once text arrives)
   - dynamic tool part: `input-streaming` ("Preparing analysis") state
   - dynamic tool part: `input-available` ("Analyzing Project docs search" + query) state
   - dynamic tool part: `output-available` → renders the **Project Docs result card**
   - dynamic tool part: `output-error` state with working retry action
   - message timestamp rendering

2. **`components/chat/ProjectDocsResultCard.test.tsx`** (3 tests) — the tool result component:
   - full result: title, match count, summary, key findings, sources
   - singular "1 match" label
   - empty state ("No findings to show…") when the tool returns nothing

3. **`components/chat/ChatInput.test.tsx`** (6 tests) — the composer:
   - send disabled on empty input
   - submits the trimmed message
   - guard against submitting while a request is in flight
   - streaming/submitted state swaps Send for Stop and disables the textarea
   - Stop button calls `onStop`
   - Regenerate only shows when there are messages and nothing is streaming

4. **`components/chat/ChatErrorBanner.test.tsx`** (6 tests) — the error classifier:
   - network error → "Connection Error"
   - 429/rate-limit → "Rate Limit Exceeded"
   - 5xx → "Server Error"
   - unknown → "Something Went Wrong"
   - retry and dismiss callbacks fire

5. **`components/chat/ChatEmptyState.test.tsx`** (2 tests) — heading + example prompts; clicking an example fills the prompt.

6. **`components/chat/ChatSkeleton.test.tsx`** (2 tests) — "AI is thinking" status is announced when visible, nothing rendered when hidden.

7. **`components/chat/Chat.test.tsx`** (4 tests) — integration test of the whole chat surface with `@ai-sdk/react`'s `useChat` mocked:
   - empty state shown initially
   - typing + submitting calls `sendMessage({ text })` and clears the input; the assistant reply renders
   - thinking skeleton appears while waiting for the first token
   - error banner appears on failure and dismisses

**Total: 32 component/integration tests + 3 API-route tests = 35 Vitest tests.**

### Playwright primary-flow test (`e2e/chat.spec.ts`)

1. **Basic message flow** — opens `/chat`, types "Hello there", submits, and verifies the assistant's mock reply appears.
2. **Tool flow** — asks about the Study Coach agent, verifies the `searchProjectDocs` tool executes server-side and the structured **Project Docs result card** (title, key findings, sources) renders, followed by the model's summary text.

Both are fully deterministic — the dev server is started with `AI_MOCK=1`, so they run against `createMockModel()` and never against Claude.

## How the AI route is mocked

- **Unit/integration:** `components/chat/Chat.test.tsx` mocks the `@ai-sdk/react` `useChat` hook entirely (the network boundary), so no fetch/API call is ever made. `app/api/chat/route.test.ts` calls the real `POST` handler with `process.env.AI_MOCK = "1", which swaps in `createMockModel()` from `lib/ai/mockModel.ts` — the same deterministic mock used for local demos. The route tests verify the response streams the mock reply, that a docs query triggers a `searchProjectDocs` tool call, and that a request without a `messages` array returns 400.
- **E2E:** `playwright.config.ts` boots `AI_MOCK=1 npm run dev`, so the real route executes against the mock model. No `ANTHROPIC_API_KEY` is required anywhere in the test suite.

## CI configuration

`.github/workflows/ci.yml` runs on every push to any branch and on every pull request:

1. `npx tsc --noEmit` — TypeScript check
2. `npm run lint` — ESLint
3. `npm run test` — Vitest
4. `npx playwright install --with-deps chromium` then `npx playwright test` — E2E
5. `npm run build` — production build

The workflow requires no secrets or API keys, and every step is a hard gate — any failure fails the job.

## Bugs discovered & fixed during testing

No production bugs were found — the existing chat implementation handled every state correctly. Every failure during the testing pass was in the test harness itself, and each was fixed rather than weakened:

| # | Failure | Root cause | Fix |
|---|---|---|---|
| 1 | "Found multiple elements" across many tests | Vitest is configured with `globals: false`, so `@testing-library/react`'s auto-cleanup never registered and DOM accumulated between tests | Added explicit `afterEach(cleanup)` in `test/setup.ts` |
| 2 | Chat integration tests always showed the empty state after "sending" | `mockReturnValue` captured the `messages` array *reference* at mock-set time, so rerenders read a stale empty array | Switched to `mockImplementation` so `useChat` reads the current state on every call |
| 3 | `getByRole("status", { name: … })` could not find live regions | jsdom/`dom-accessibility-api` computes an **empty accessible name** for `role="status"` regions even when they contain text (verified with a bare `<div role="status">hello</div>`) | Query the status element by role and assert on its text content — still role- and text-based, never class-based. *Note:* in real browsers live regions announce their content regardless, so this is a test-environment quirk, not an app bug. |
| 4 | "Unable to find an element with the text: Some" | RTL's `getByText` only matches an element's *direct* text nodes; text split across `<strong>`/`<code>` children isn't matched | Asserted on the message listitem's combined `textContent` |
| 5 | Playwright "strict mode violation: 2 elements" for heading "AI Chat" | Both the page `<h1>` and the empty-state `<h2>` match | Targeted the `<h1>` with `getByRole("heading", { level: 1 })` |
| 6 | Route test expected `text/plain` content-type | `toUIMessageStreamResponse()` streams `text/event-stream` | Corrected the expectation to `text/event-stream` |

## Final test results

- **Vitest:** 35/35 tests passed (8 files) — 32 component/integration + 3 API-route
- **Playwright:** 2/2 tests passed (Chromium)
- **TypeScript:** `npx tsc --noEmit` clean
- **Lint:** `npm run lint` — no warnings or errors
- **Build:** `npm run build` succeeds

## Files created / modified

- `vitest.config.ts` (new) — Vitest configuration
- `playwright.config.ts` (new) — Playwright configuration
- `test/setup.ts`, `test/factories.ts` (new) — test environment + message factories
- `components/chat/*.test.tsx` (new) — 7 test files
- `app/api/chat/route.test.ts` (new) — AI route mock tests
- `e2e/chat.spec.ts` (new) — primary chat flow E2E
- `.github/workflows/ci.yml` (new) — CI pipeline
- `package.json`, `package-lock.json` — test dependencies + scripts
- `.gitignore` — ignore Playwright `test-results/` and `playwright-report/`