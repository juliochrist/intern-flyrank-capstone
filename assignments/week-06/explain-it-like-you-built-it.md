# Week 6: Explain It Like You Built It — The AI Chat Flow

Pick one real feature from the project and explain how it works end-to-end until it is genuinely understood. Explain the AI chat: from the user's message → Next.js API route → AI SDK → streaming/tool execution → response rendered in the React UI — using only the actual implementation as reference.

## Submission (English)

> **The one feature:** an AI chat that answers questions about _my own project_ — grounded in real data, not guesses.
>
> **How it works, from start to finish:**
>
> When I send a message, the browser POSTs my full conversation history to a Next.js API route (`app/api/chat/route.ts`). The route translates that history from the "UI message" format the browser uses into the "model message" format the Claude API expects — including rebuilding the tool-call and tool-result pairs. Then it opens a streaming connection via the AI SDK's `streamText`.
>
> The key decision I made: Claude doesn't just answer from memory. It has a `searchProjectDocs` tool backed by a curated index of my actual project docs — the weeks 1–5 internship assignments and the personal Study Coach agent. When a question is about my project, Claude calls the tool, the server runs a keyword-ranked search (title, filename, and key points score the matches), and the structured result streams back to the UI.
>
> The UI is where you can see the whole thing working live. As the tool input streams in, the user sees a "Preparing analysis" spinner; then a card showing the query, findings, and sources; and finally Claude's answer built on top of that tool result. Because the tool is a `dynamicTool`, every state — streaming input, executing, success or failure — renders in real time instead of appearing as a finished block.
>
> To make this safe and testable I added three things: `stopWhen: isStepCount(3)` so the agent can never loop on tool calls forever; a mock model so the entire flow (including tool calls) can be demoed deterministically without spending API credits; and a sabotage helper that simulates network, rate-limit, and timeout failures so I could verify every error state of the UI.
>
> **What I actually learned building it:** the "AI chat" isn't one magic call — it's a round trip where the client and server speak different message formats, the tool executes server-side between two model steps, and streaming turns every stage of that loop into visible UI. Understanding that loop is what separates "calling the API" from "building the feature."

## Alternate version (Bahasa Indonesia)

> **Satu fitur yang saya jelaskan:** chat AI yang menjawab pertanyaan _tentang proyek saya sendiri_ — berbasis data, bukan tebakan.
>
> **Cara alur-nya, mulai sampai akhir:**
>
> Saat saya kirim pesan, browser meneruskan seluruh riwayat percakapan ke route API Next.js (`app/api/chat/route.ts`). Route itu menerjemahkan riwayat dari format "UI message" yang dipakai client ke format "model message" yang dipakai API Claude — termasuk membangun ulang pasangan tool-call dan tool-result. Lalu dia membuka koneksi streaming lewat AI SDK `streamText`.
>
> Keputusan penting yang saya buat: Claude tidak menjawab dari ingatannya saja. Dia memakai tool `searchProjectDocs` yang menempel pada indeks terkurasi dari dokumen proyek yang sebenarnya — assignment minggu 1–5 dan workspace Study Coach. Saat pertanyaan menyangkut proyek saya, Claude "memanggil" tool tersebut, server menjalankan pencarian dengan skor kata kunci (judul, nama file, dan poin-poin kunci dinilai), dan hasil yang terstruktur di-streaming balik ke UI.
>
> UI-lah tempat seluruh proses terlihat hidup. Selama input tool masuk, pengguna melihat spinner "Preparing analysis"; lalu muncul kartu berisi kueri, temuan, dan sumber; dan terakhir jawaban Claude yang dibangun di atas hasil tool tersebut. Karena tool-nya `dynamicTool`, setiap fase — stream masuk, eksekusi, selesai — dirender real time, bukan muncul sebagai blok yang sudah jadi.
>
> Supaya aman dan bisa diuji, saya menambahkan tiga hal: `stopWhen: isStepCount(3)` supaya agent tidak pernah berputar tanpa akhir pada panggilan tool; mock model supaya seluruh alur (termasuk setiap pemanggilan tool) bisa didemo secara deterministik tanpa membuang kredit API; dan sabotage helper yang mensimulasikan kegagalan jaringan, rate-limit, dan timeout untuk memverifikasi setiap state error di UI.
>
> **Hal yang benar-benar saya pelajari:** chat AI bukan satu panggilan ajaib — melainkan perjalanan hilir-mudik di mana client dan server memakai format pesan yang berbeda, tool dieksekusi di server di antara dua step model, dan streaming mengubah setiap tahap loop itu menjadi tampilan UI yang terlihat secara langsung. Memahami loop itulah yang membedakan "memanggil API" dengan "membangun fitur-nya".

## The feature, file by file

### 1. Client: `app/chat/page.tsx` → `components/chat/*`

- `app/chat/page.tsx` — the page shell; only renders `<Chat />` inside a layout header.
- `components/chat/Chat.tsx` — the orchestrator. Uses `useChat()` from `@ai-sdk/react` with a `DefaultChatTransport({ api: "/api/chat" })`. It holds `messages`, `status` (`submitted → streaming → ready/error`), and exposes `sendMessage()`, `stop()`, `regenerate()`. Also mounts the sabotage patch.
- `components/chat/ChatInput.tsx` — textarea; Enter sends, Shift+Enter is a newline; Stop button appears while busy; Regenerate shows after the first exchange.
- `components/chat/ChatMessage.tsx` — renders one `UIMessage`: user text as a bubble, assistant `text` parts through `ReactMarkdown` + `rehype-highlight`, and every `dynamic-tool` part forwarded to `ToolPart`.
- `components/chat/ToolPart.tsx` — renders the tool lifecycle: `input-streaming` (spinner + "Preparing analysis"), `input-available` (wrench + the query), `output-error` (red card + Retry), `output-available` (the result component).
- `components/chat/ProjectDocsResultCard.tsx` — the designed output card: title, match-count badge, summary, findings list, source chips. No raw JSON.
- `lib/sabotage.ts` — patches `window.fetch` to simulate network/5xx/429/timeout/slow/interrupt using `window.__SABOTAGE` or the `?sabotage=` URL param (FE-08/03).

### 2. Server: `app/api/chat/route.ts`

The only endpoint. It:

1. Reads `{ messages }` from the request body — the entire `UIMessage[]` conversation history.
2. `messages.flatMap(toModelMessage)` converts each UI message into `ModelMessage`s. This is the critical translation layer: the UI format (parts with `text` / `dynamic-tool`) is not what Anthropic speaks. The converter rebuilds assistant `tool-call` + `tool-result` pairs from `dynamic-tool` parts, skips `input-streaming` parts that carry no final text, and packs results into a `role: "tool"` message.
3. Calls `streamText({ model, system, messages, tools, stopWhen: isStepCount(3) })`.
4. Returns `result.toUIMessageStreamResponse()` — a streaming `UIMessage` protocol response that `useChat` parses on the client.

### 3. AI layer: `lib/ai/*`

- `claude.ts` — model factory: `anthropic("claude-sonnet-4-20250514")` from `@ai-sdk/anthropic`.
- `systemPrompt.ts` — instructs the model to call `searchProjectDocs` instead of guessing what the repo contains.
- `tools.ts` — the `searchProjectDocs` tool via `dynamicTool`, with a zod input schema (`query`, `scope`) and a deterministic `searchProjectDocs` executor that ranks `PROJECT_DOCS` by keyword hits in title (3), file path (2), key points (2), and summary (1). `!fail` prefix forces a throw to test the error path.
- `projectDocsData.ts` — the curated index: 16 entries covering the assignments (weeks 3–5) and the Study Coach agent workspace.
- `mockModel.ts` — a `MockLanguageModelV4` used with `AI_MOCK=1`: it emulates the two-step loop so the whole flow (including tool calls and the `!fail` error path) works deterministically without an `ANTHROPIC_API_KEY`.

### 4. The wire / streaming contract

- The client and the model speak different message formats; `toModelMessage` is the bridge.
- `dynamicTool` (not a plain `tool`) streams the model's tool input token-by-token → this produces the `input-streaming` → `input-available` UI states, then the server executes the tool, and `output-streamed` → `output-available` returns to the card.
- `stopWhen: isStepCount(3)` guarantees the agent loop stops after 3 model steps (a normal docs exchange takes 2: tool call → final answer), acting as a circuit-breaker against infinite tool calls.

## Key concepts to own before claiming this feature

1. **Two message formats.** "UI messages" (what browser↔server exchange) vs "model messages" (what Anthropic speaks). `toModelMessage` is the translation layer that also rebuilds assistant `tool-call` + `tool-result` pairs.
2. **Where tools run.** The search/ranking executes server-side inside the route; the client only renders streamed JSON pieces into a designed card. Nothing AI-related runs in the client.
3. **The agent loop / steps.** Claude isn't limited to answering once. A step can end in a tool call; the tool executes; the result is fed back into the stream; the model is invoked again with `role: "tool"` history. `isStepCount(3)` is the loop-breaker.
4. **`dynamicTool` vs `tool`.** `dynamicTool` streams the model's in-flight tool input to the UI. The state sequence in `ToolPart` (`input-streaming → input-available → output-available`) is literally the streaming pipeline of the model's tool call.
5. **The "RAG" is a hardcoded array.** `projectDocsData.ts` is static JSON + keyword scoring in `tools.ts`; that's what makes the system prompt's "report only" grounded and is also the source of its limits.
6. **`!fail` and the mock model** exist to reproduce every streaming and error state deterministically during development.

## Files involved

- Client: `app/chat/page.tsx`, `components/chat/Chat.tsx`, `ChatInput.tsx`, `ChatMessage.tsx`, `ToolPart.tsx`, `ProjectDocsResultCard.tsx`, `ChatErrorBanner.tsx`, `ChatSkeleton.tsx`, `ChatEmptyState.tsx`, `ScrollToBottom.tsx`, `ThinkingIndicator.tsx`, `lib/sabotage.ts`
- Server: `app/api/chat/route.ts`, `lib/ai/claude.ts`, `lib/ai/systemPrompt.ts`, `lib/ai/tools.ts`, `lib/ai/projectDocsData.ts`, `lib/ai/mockModel.ts`
- Guardrails: `maxDuration = 60`, `stopWhen: isStepCount(3)`

## Testing performed

- [x] `npx tsc --noEmit` passes
- [x] `npm run lint` passes
- [x] `npm run build` passes
- [ ] Manual verification of a normal message → streamed answer (non-tool prompt)
- [ ] Manual verification of the tool flow with `AI_MOCK=1` (search → result card → final answer overlay)
- [ ] Tool error path via `!fail` (output-error card + Retry)
- [ ] Error states via `sabotage.ts` (`network-error`, `api-error`, `rate-limit`, `timeout`, `slow`, `mid-stream-interrupt`)

## Known limitations

- Chat history is in-memory per session (`useChat`); no persistence between visits.
- The doc index (`projectDocsData.ts`) is a curated snapshot and can drift from the markdown files until manually updated.
- Error classification in `ChatErrorBanner` relies on string matching against the error message, not HTTP status introspection.
- Live-model verification requires a valid `ANTHROPIC_API_KEY`; `AI_MOCK=1` is the deterministic alternative.
