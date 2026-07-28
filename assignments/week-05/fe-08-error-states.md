# FE-08: Error States, Empty States, and Edge Cases

Make the AI chat production-ready by handling every state a user might encounter.

## Handled Edge Cases

### Empty State
- Friendly welcome screen with icon, title, and description when no messages exist
- 3 clickable example prompts that auto-fill the input field
- Example prompts cover common frontend engineering topics

### Empty Input
- Send button is disabled when input is empty or whitespace-only
- Send button uses muted styling when disabled (no gradient, no shadow)
- `trim()` check prevents whitespace-only submissions
- Button state changes visually to indicate disabled/enabled

### Loading State
- `ChatSkeleton` component shows animated pulse placeholders matching final message layout
- Bouncing dots indicator shows "Thinking..." status
- Three skeleton lines prevent layout shift while waiting for first token
- Skeletons disappear once streaming begins

### Streaming State
- Message content streams in real-time via `@ai-sdk/react` `useChat`
- Stop Generation button (red) interrupts the stream mid-response
- Partial response remains visible when generation is stopped
- Auto-scroll keeps newest content in view; manual scroll-up pauses auto-scroll
- "Jump to latest" button appears when user scrolls up during streaming

### Error State
Handles 5 distinct error types with specific messaging and icons:

| Error Type | Detection | UI Icon | Message |
|---|---|---|---|
| Network failure | `fetch` / `NetworkError` / `ENOTFOUND` | `WifiOff` | "Unable to reach the server. Please check your internet connection." |
| API failure | 500/502/503 status or "server error" | `ServerCrash` | "The server encountered an error. Please try again later." |
| Rate limit (429) | 429 status or "rate limit" / "too many requests" | `Clock` | "You're sending requests too quickly. Please wait a moment." |
| Timeout | `AbortError` / "timeout" / "abort" | `Ban` | "The request took too long to complete. Try a simpler prompt." |
| Aborted | `AbortError` / "cancel" | `Ban` | "The request was cancelled." |
| Unknown | Fallback | `AlertTriangle` | "An unexpected error occurred. Please try again." |

Each error shows:
- Error-type icon (color-coded red)
- Human-readable title and description
- Technical error message (collapsed, monospace)
- **Retry** button (calls `reload()` — retries ONLY the failed request)
- **Dismiss** button (hides the error banner)
- Retry works when clicked multiple times (debounced internally by `isBusy` state)
- Full `role="alert"` / `aria-live="assertive"` accessibility

### Route Error Boundary (`app/error.tsx`)
- Catches unhandled render errors in route segments
- Shows friendly UI with error icon and message
- **Try Again** button calls `reset()` to re-render
- **Go Home** button navigates to `/`
- Shows error `digest` ID for debugging

### No Results State
- Detects when assistant finishes streaming with empty text content
- Shows inline message: "No response generated"
- Suggests rewording the prompt or asking a different question

### Responsive Fixes
- Messages use `max-w-[85%]` on mobile, `max-w-[75%]` on `sm:` and above
- Input bar is sticky at the bottom with proper `border-t` separation
- Scroll container uses `min-h-0 flex-1 flex-col` pattern for proper flexbox scrolling
- No horizontal overflow on code blocks (uses `overflow-x-auto`)
- Navbar uses mobile hamburger menu at `md:` breakpoint
- Error banners wrap properly on small screens

## Sabotage Checklist

Sabotage helpers are available at `lib/sabotage.ts`. They intercept `/api/chat` fetch requests and simulate failures.

### How to trigger

**Via browser console:**
```js
// Network failure
window.__SABOTAGE = "network-error"

// API failure (500)
window.__SABOTAGE = "api-error"

// Rate limit (429)
window.__SABOTAGE = "rate-limit"

// Slow response (8s delay)
window.__SABOTAGE = "slow"

// Mid-stream interruption (cuts off after ~200 bytes)
window.__SABOTAGE = "mid-stream-interrupt"

// Timeout (30s hang then abort)
window.__SABOTAGE = "timeout"

// Disable sabotage
window.__SABOTAGE = null
```

**Via URL parameter:**
```
/chat?sabotage=network-error
/chat?sabotage=api-error
/chat?sabotage=rate-limit
/chat?sabotage=timeout
/chat?sabotage=slow
/chat?sabotage=mid-stream-interrupt
```

### Test scenarios

| Scenario | Sabotage Mode | Expected Behavior |
|---|---|---|
| User has no internet | `network-error` | Error banner: "Connection Error" + Retry button |
| Server is down | `api-error` | Error banner: "Server Error" + Retry button |
| User spams requests | `rate-limit` | Error banner: "Rate Limit Exceeded" + Retry button |
| Network is slow | `slow` | Skeleton shows, then response appears after delay |
| Connection drops mid-stream | `mid-stream-interrupt` | Partial response shown, stop button works |
| Request times out | `timeout` | Error banner: "Request Timed Out" + Retry button |

### Helper API

```ts
import { sabotage } from "@/lib/sabotage";

// Check current mode
sabotage.getMode() // => "network-error" | null

// Check if sabotage is active
sabotage.isEnabled() // => boolean

// Set mode (also patches fetch)
sabotage.setMode("network-error")

// Clear mode and restore fetch
sabotage.setMode(null)

// Manually patch/unpatch
sabotage.patch()
sabotage.unpatch()
```

## What was fixed

- [x] Empty state shows example prompts that auto-fill input
- [x] Send button disables properly on empty/whitespace input
- [x] Loading state uses skeleton placeholders matching message layout
- [x] Auto-scroll works during streaming; manual scroll-up respected
- [x] Stop Generation button interrupts and preserves partial content
- [x] Error banner shows distinct messaging per error type
- [x] Retry button retries only the failed request (uses `reload()`)
- [x] Retry works on multiple clicks (no double-send)
- [x] Error dismiss button hides banner
- [x] Route error boundary catches render errors
- [x] No results state detected and explained
- [x] Mobile layout: sticky input, proper widths, no overflow
- [x] Sabotage helpers for testing all error scenarios
- [x] No console errors
- [x] No TypeScript errors
- [x] No ESLint errors

## Known limitations

- Error messages are client-side only; no server-side error classification
- Sabotage helpers only work in development/testing (set `__SABOTAGE` or URL param)
- No persistent chat history between sessions (in-memory only via `useChat`)
- Code block syntax highlighting depends on `rehype-highlight` CSS (no highlight theme imported in current CSS)
- Rate limit detection relies on error message string matching rather than HTTP status code introspection (limited by `useChat` error shape)

## Screenshots

<!-- TODO: Add screenshots -->

| State | Screenshot |
|---|---|
| Empty state | `[screenshot-placeholder]` |
| Loading skeleton | `[screenshot-placeholder]` |
| Streaming response | `[screenshot-placeholder]` |
| Error banner (network) | `[screenshot-placeholder]` |
| Error banner (rate limit) | `[screenshot-placeholder]` |
| No results | `[screenshot-placeholder]` |
| Route error boundary | `[screenshot-placeholder]` |
| Mobile layout | `[screenshot-placeholder]` |
