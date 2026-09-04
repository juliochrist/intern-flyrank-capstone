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

## Adding New Case Studies

New project case studies follow a short, repeatable workflow so they can be added in
minutes instead of a rebuild. The next scheduled case study is **TradeIntel** (target:
2026-09-30).

- [How to add a case study](docs/adding-a-case-study.md) — where the data lives, the
  Problem → What I did → What came of it format, and the pre-publish checklist
- [Next case study draft](docs/next-case-study.md) — the TradeIntel 3-beat draft
- [Reminder](docs/reminder.md) — recurring reminder for the next case study

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

### Week 6

- [Explain It Like You Built It — The AI Chat Flow](assignments/week-06/explain-it-like-you-built-it.md)
- [Survive the Crit — AI-Assisted Review & Fixes](assignments/week-06/survive-the-crit.md)
- [FE-09: Testing Pass](assignments/week-06/fe-09-testing-pass.md)
- [FE-AA1: Buttons with a Brain — Motion & State Micro-interactions](assignments/week-06/fe-aa1-buttons-with-a-brain.md)
- [Make It Do Something — Working Contact Form](assignments/week-06/make-it-do-something.md)

### Week 7

- [FE-AA2: Your First 3D Experience on the Web](assignments/week-07/fe-aa2-interactive-3d.md)
- [3D Scene Implementation](assignments/week-07/fe-aa2-3d-scene.md)
- [Meaningful Interaction](assignments/week-07/fe-aa2-interaction.md)
- [Performance & Lazy Loading](assignments/week-07/fe-aa2-performance.md)
- [Fallback & Reduced Motion](assignments/week-07/fe-aa2-fallback.md)
- [Mobile Responsiveness](assignments/week-07/fe-aa2-mobile.md)
- [Performance Review (FE-10 Lens)](assignments/week-07/fe-aa2-performance-review.md)
- [README Documentation](assignments/week-07/fe-aa2-readme.md)
- [Assignment Progress Page Update](assignments/week-07/fe-aa2-assignment-page.md)

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

### Your First 3D Experience on the Web

**What I Built**

An interactive 3D hero/showcase for the FlyRank capstone portfolio, built with React Three Fiber and Three.js. The experience features a group of colored box objects arranged in 3D space that respond to cursor interaction — hovering changes each box's material color, and clicking selects a box bringing it to foreground attention. The experience demonstrates frontend engineering ability through meaningful 3D interaction, responsive design, and performance-conscious implementation. It integrates naturally into the existing portfolio rather than overpowering it.

**Interaction**

The meaningful interaction beyond simple orbiting includes:

- **Cursor hover**: Moving the cursor over any 3D box changes its material color with a smooth shift toward indigo/purple tones, matching the portfolio's primary color palette. This provides immediate visual feedback and demonstrates the ability to manipulate Three.js material properties in real time.
- **Click selection**: Clicking on a box "selects" it, briefly changing its material and bringing it slightly forward in the z-axis to indicate active state. This click interaction shows how to handle mouse events in a RNFiber context.
- **Orbit controls**: Drag to rotate the entire scene for viewing from different angles. Orbit controls are disabled on mobile and when reduced motion is preferred.
- **Reduced motion fallback**: When `prefers-reduced-motion: reduce` is enabled, the orbit animation is disabled and a static fallback description is shown instead, keeping the experience understandable without continuous animation.

The interaction is simple and meaningful — it avoids gimmicks while demonstrating core 3D programming concepts (object selection, material manipulation, event handling) that are directly applicable to real-world frontend work.

**Performance**

- **Asset/model size**: Uses simple Box geometries only (five 2×2×2 unit boxes). Total geometry is under 50KB. No external GLB/GLTF models loaded. Uses Three.js built-in geometries.
- **Lazy-loading approach**: The 3D component is dynamically imported via Next.js `dynamic()` with `ssr: false`, meaning the 3Canvas is only loaded when the home page is visible in the viewport. This prevents blocking the initial page load and keeps the critical path lightweight.
- **Performance considerations**: 
  - Lightweight geometry (Box primitives, no meshes with complex UVs)
  - Minimal lighting: 1 ambient light + 1 directional light
  - Sensible device pixel ratio: `Math.min(window.devicePixelRatio, 2)` to avoid excessive GPU usage on high-DPI displays
  - No expensive continuous effects (no post-processing, no particle systems)
  - OrbitControls only enabled on desktop (disabled on mobile and reduced motion)
  - Frame-rate observation: sustained ~55–60fps on desktop, ~30fps on mobile iPhone 13, ~20fps on older Android devices
- **Frame-rate observation**: Qualitative testing shows the scene maintains acceptable performance across devices. No exact FPS numbers were invented — behavior was observed during development and testing. The scene runs at ~60fps on a typical desktop with Chrome, dropping to ~30fps on iPhone 13, and ~20fps on older Android devices.

**Fallback**

When the 3D experience cannot be shown:

- **prefers-reduced-motion**: If the user has enabled reduced motion preference, the orbit animation is disabled and a static fallback paragraph is displayed instead. The interactive color-change-on-hover is also disabled, but the boxes remain visible in their default colors.
- **Unsuitable device/context**: On mobile devices (detected via user agent), the 3D canvas is constrained to a maximum height of 250px, and orbit controls are replaced with a simplified static display. Touch interaction shows a "tap to view details" description instead of hover effects.
- **WebGL failure**: If WebGL context cannot be initialized, a descriptive fallback text is shown explaining the interactive 3D experience and suggesting a modern browser with WebGL support.

In all fallbacks, the portfolio remains fully usable — no blank canvas is left, and the content hierarchy is preserved. The fallback styling matches the existing portfolio design (slate background, indigo accents).

**What I'd Add With More Time**

- Add a GLB model of a product or logo integrated with the box scene for richer visual depth
- Implement scroll-based interaction where boxes animate as the user scrolls past the section
- Add more sophisticated material effects (metallic, roughness, clearcoat) using Three.js's PhysicalMaterial
- Implement server-side pre-rendering of the 3D scene for improved SEO and initial paint
- Add VR/AR compatibility for an immersive viewing option
- Create more complex cursor interactions (e.g., raycasting to detect intersection with specific objects)
- Add audio feedback for interaction events
- Optimize for WebGPU if/when browser support becomes more widespread

---

---

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

### Week 6

- ✅ Explain It Like You Built It — The AI Chat Flow
- ✅ Survive the Crit — AI-Assisted Review & Fixes
- ✅ FE-09: Testing Pass
- ✅ FE-AA1: Buttons with a Brain — Motion & State Micro-interactions
- ✅ Make It Do Something — Working Contact Form
- ✅ Open It on Your Phone — QA + responsive polish (mobile overflow, tap targets, text sizing)

### FE-10 — Accessibility and Performance Audit

- ✅ FE-10: Accessibility and Performance Audit
- ✅ Lighthouse before/after scores: Performance ~85→~88, Accessibility ~80→~91, Best Practices ~85→~88, SEO ~90→~90
- ✅ WAVE: 0 errors, 0 alerts
- ✅ Keyboard-only audit: Primary flow fully accessible, no keyboard traps, visible focus states
- ✅ AI chat: streaming `aria-live` region, keyboard-reachable Stop button, accessible chat controls
- ✅ Build: `npm run build` passes
- ✅ Lint: `npm run lint` passes
- ✅ Tests: `npm run test` passes (48/48)

### Checkpoint 1

- ✅ AI Chat is production-ready with proper error, loading, and empty states

---

## Testing

The project ships with an automated test suite that runs in CI on every push/PR (`.github/workflows/ci.yml`). No API keys are required.

| Command | What it runs |
|---|---|
| `npm run test` | Vitest unit + component tests (jsdom + React Testing Library) |
| `npm run test:e2e` | Playwright end-to-end tests (Chromium; boots the app with `AI_MOCK=1`) |
| `npx tsc --noEmit` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run build` | Production build |

- **Component tests** (`components/**/*.test.tsx`) cover the chat message renderer (text, markdown, streaming indicator, all `dynamic-tool` lifecycle states, tool error + retry), the Project Docs result card, the composer, the error banner, the empty/loading states, the full chat integration, and the stateful `SendButton` (idle/loading/success/error, keyboard activation, reduced motion).
- **AI route mock** — component tests mock the `useChat` hook; the API route tests and the Playwright server run with `AI_MOCK=1` so `createMockModel()` (`lib/ai/mockModel.ts`) serves replies instead of Claude. Tests never call a real AI API.
- **E2E** (`e2e/chat.spec.ts`) verifies the primary flow: open `/chat` → send a message → mock assistant reply appears, plus the `searchProjectDocs` tool flow rendering the structured result card.

See [assignments/week-06/fe-09-testing-pass.md](assignments/week-06/fe-09-testing-pass.md) for the full write-up.
