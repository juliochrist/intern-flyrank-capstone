# Week 6: FE-AA1 — Buttons with a Brain: Motion & State Micro-interactions

A deep-dive into button state design: the AI chat's send control was rebuilt as a single morphing `SendButton` that moves through `idle → loading → success → error → idle` with deliberate motion, then back to a stable state. Every state keeps its feedback readable without motion (icon, colour, label, and live-region text) so the design respects `prefers-reduced-motion`.

## What changed

### Before: two controls, no feedback

`ChatInput` previously swapped between a separate **Send** button (when idle) and a **Stop** button (while busy). Once a message completed you got no confirmation at all — the interface silently snapped back to ready.

### After: one button with a lifecycle

`components/chat/SendButton.tsx` is a single, reusable button driven by an explicit `phase` prop:

| Phase | Visual | Accessible name | Action |
|---|---|---|---|
| `idle` | Indigo gradient, Send icon, hover lift + glow | "Send message" | submit |
| `loading` | Indigo, spinner (or square "stop" while streaming), `aria-busy` | "Stop generation" | abort |
| `success` | Green, checkmark pop | "Message sent" | no-op (1.4 s) |
| `error` | Red, shake, warning icon | "Retry sending" | retry (2.6 s) |

`ChatInput` drives the phase through a small state machine (`feedback = idle|success|error`) plus the streaming `status` from `useChat`. The success/error phases are timed constants — `SEND_BUTTON_SUCCESS_MS = 1400`, `SEND_BUTTON_ERROR_MS = 2600` — then the button returns to idle on its own.

### Guardrails in the composer

- **Rapid-click guard** (`submittingRef`): a second Enter/click while a send is already starting is dropped, so one message never fires twice.
- **Stop vs. success**: pressing Stop aborts the run and is **not** followed by a false "Message sent" flash (`stoppedRef`).
- **Focus management**: the textarea re-focuses when a request finishes so keyboard users can continue immediately.
- Feedback timers are cleared on unmount and before any new submission.

## Motion decisions

- **What moves is limited to `transform` and `opacity`** — the button has a fixed 44px footprint and a fixed 20px icon slot, so state changes never shift layout.
- **Icon crossfade** (`.sb-icon` → `.sb-icon-on`, 180 ms ease) keeps all four icons mounted; only opacity/scale change.
- **Success checkmark "pop"** uses a springy overshoot curve `cubic-bezier(0.34, 1.56, 0.64, 1)` (260 ms) — scale 0.4 → 1.15 → 1.
- **Spinner** is a CSS rotation keyframe (`0.9s linear infinite`) rather than a JS interval, so it pauses with the page and costs nothing.
- **Error shake** is a 450 ms `cubic-bezier(0.36, 0.07, 0.19, 0.97)` translateX sequence; short enough to not feel punishing.
- **Hover glow** is a `box-shadow` on a dedicated `.sb-glow` layer faded in with opacity — no repaint of the button body on hover.
- Static state shadows change colour per state (indigo/green/red) as an extra non-motion signal.

## Accessibility

- Every phase keeps a distinct accessible name and a distinct icon+colour, so the state is never communicated by colour alone.
- The morph is a real `<button type="button">` with `aria-label` per phase — no unlabelled icon changes, no wrapper click handlers.
- `aria-busy` is set during loading; a visually hidden `role="status"` + `aria-live="polite"` region announces "Sending message", "Message sent", or "Message failed to send".
- The button is keyboard operable and matches the app's global `:focus-visible` ring.
- Reduced motion is handled twice:
  1. **Progressive enhancement**: a `usePrefersReducedMotion()` hook (matches `(prefers-reduced-motion: reduce)`) sets `data-reduced="true"`, which disables transitions, the hover lift, the spinner, the pop, and the shake — while keeping every colour/icon/label state signal.
  2. **No-JS fallback**: the same rules are repeated under a plain `@media (prefers-reduced-motion: reduce)` block in CSS.

## Demo & tests

- `playground/SendButtonDemo.tsx` (rendered on `/playground`) exercises the full lifecycle deterministically — no AI API involved. Buttons: simulate send (loading → success), simulate failure (shake → retry → idle), show success only, reset. The button itself also acts as its own stop control while loading.
- `components/chat/SendButton.test.tsx` (7 tests): idle send, disabled on empty, loading + `aria-busy` + stop action, success no-op, error retry, keyboard activation, and reduced-motion (`data-reduced`) with state feedback preserved.
- `components/chat/ChatInput.test.tsx` extended (12 tests): Enter vs Shift+Enter, rapid-click dedup, streaming morphs Send into Stop, stop skips the success flash, success and error feedback appear after a completed/failed send and auto-reset on their timers.
- Full suite green: **48 Vitest tests, 2 Playwright E2E, `tsc`, ESLint, and `next build`** all pass.

## Files

- `components/chat/SendButton.tsx` (new) — the stateful button + `usePrefersReducedMotion`.
- `app/globals.css` — `.sb-*` keyframes/classes + reduced-motion overrides.
- `components/chat/ChatInput.tsx` — composer rewritten to drive the phase state machine.
- `playground/SendButtonDemo.tsx` (new) + `app/playground/page.tsx` — deterministic demo section.
- `components/chat/SendButton.test.tsx` (new) + `components/chat/ChatInput.test.tsx` — tests.

## Reflection

The most valuable part was the **stop-vs-success race**: a naive "request finished → show success" rule would fire a green "Message sent" even after the user aborted mid-stream. Making the success flash an explicit outcome of the orchestration (not of the button) is what keeps it honest. And designing reduced motion in from the start — rather than layering it on at the end — meant the state signals were already complete without any animation at all.