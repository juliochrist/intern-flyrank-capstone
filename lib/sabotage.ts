"use client";

type SabotageMode =
  | "network-error"
  | "api-error"
  | "rate-limit"
  | "timeout"
  | "slow"
  | "mid-stream-interrupt"
  | null;

const SABOTAGE_KEY = "__SABOTAGE";

function getMode(): SabotageMode {
  if (typeof window === "undefined") return null;
  const fromWindow = (window as unknown as Record<string, unknown>)[SABOTAGE_KEY] as
    | SabotageMode
    | undefined;
  if (fromWindow) return fromWindow;
  const params = new URLSearchParams(window.location.search);
  return (params.get("sabotage") as SabotageMode) || null;
}

function isEnabled(): boolean {
  return getMode() !== null;
}

function patchFetch() {
  if (typeof window === "undefined") return;
  const originalFetch = window.fetch;
  if ((window as unknown as Record<string, unknown>).__originalFetch) return;
  (window as unknown as Record<string, unknown>).__originalFetch = originalFetch;

  window.fetch = async function sabotageFetch(
    input: RequestInfo | URL,
    init?: RequestInit,
  ) {
    const mode = getMode();
    if (!mode) return originalFetch(input, init);

    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    if (!url.includes("/api/chat")) return originalFetch(input, init);

    switch (mode) {
      case "network-error":
        await new Promise((r) => setTimeout(r, 200));
        throw new TypeError("Failed to fetch (sabotaged)");

      case "api-error":
        await new Promise((r) => setTimeout(r, 200));
        return new Response(
          JSON.stringify({ error: "Internal server error (sabotaged)" }),
          { status: 500, statusText: "Internal Server Error" },
        );

      case "rate-limit":
        await new Promise((r) => setTimeout(r, 200));
        return new Response(
          JSON.stringify({ error: "Too many requests (sabotaged)" }),
          { status: 429, statusText: "Too Many Requests" },
        );

      case "timeout":
        await new Promise((r) => setTimeout(r, 30000));
        const controller = new AbortController();
        controller.abort();
        throw new DOMException("The operation was aborted (sabotaged)", "AbortError");

      case "slow":
        await new Promise((r) => setTimeout(r, 8000));
        return originalFetch(input, init);

      case "mid-stream-interrupt": {
        const response = await originalFetch(input, init);
        const reader = response.body?.getReader();
        if (!reader) return response;

        const stream = new ReadableStream({
          async start(controller) {
            const chunks: Uint8Array[] = [];
            let total = 0;
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              chunks.push(value);
              total += value.length;
              if (total > 200) break;
            }
            for (const chunk of chunks) {
              controller.enqueue(chunk);
            }
            controller.close();
          },
        });

        return new Response(stream, {
          headers: response.headers,
          status: response.status,
        });
      }

      default:
        return originalFetch(input, init);
    }
  };
}

function unpatchFetch() {
  if (typeof window === "undefined") return;
  const original = (window as unknown as Record<string, unknown>).__originalFetch as
    | typeof fetch
    | undefined;
  if (original) {
    window.fetch = original;
    delete (window as unknown as Record<string, unknown>).__originalFetch;
  }
}

function setMode(mode: SabotageMode) {
  if (typeof window === "undefined") return;
  (window as unknown as Record<string, unknown>)[SABOTAGE_KEY] = mode;
  if (mode) {
    patchFetch();
  } else {
    unpatchFetch();
  }
}

export const sabotage = {
  getMode,
  isEnabled,
  setMode,
  patch: patchFetch,
  unpatch: unpatchFetch,
};
