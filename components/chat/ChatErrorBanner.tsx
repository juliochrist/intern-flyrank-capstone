"use client";

import { AlertTriangle, WifiOff, Clock, Ban, ServerCrash, RefreshCw } from "lucide-react";

interface ChatErrorBannerProps {
  error: Error;
  onRetry: () => void;
  isRetrying: boolean;
  onDismiss?: () => void;
}

type ErrorType = "network" | "api" | "rate-limit" | "timeout" | "aborted" | "unknown";

function classifyError(error: Error): ErrorType {
  const msg = error.message.toLowerCase();

  if (
    msg.includes("fetch") ||
    msg.includes("network") ||
    msg.includes("enotfound") ||
    msg.includes("econnrefused") ||
    msg.includes("networkerror")
  ) {
    return "network";
  }
  if (msg.includes("429") || msg.includes("rate limit") || msg.includes("too many requests")) {
    return "rate-limit";
  }
  if (
    msg.includes("abort") ||
    msg.includes("timeout") ||
    msg.includes("cancel") ||
    error.name === "AbortError"
  ) {
    return "timeout";
  }
  if (
    msg.includes("500") ||
    msg.includes("503") ||
    msg.includes("502") ||
    msg.includes("server error") ||
    msg.includes("api error")
  ) {
    return "api";
  }
  return "unknown";
}

const errorConfig: Record<ErrorType, { icon: typeof AlertTriangle; title: string; message: string }> = {
  network: {
    icon: WifiOff,
    title: "Connection Error",
    message: "Unable to reach the server. Please check your internet connection and try again.",
  },
  api: {
    icon: ServerCrash,
    title: "Server Error",
    message: "The server encountered an error. Please try again later.",
  },
  "rate-limit": {
    icon: Clock,
    title: "Rate Limit Exceeded",
    message: "You're sending requests too quickly. Please wait a moment before trying again.",
  },
  timeout: {
    icon: Ban,
    title: "Request Timed Out",
    message: "The request took too long to complete. Try a simpler prompt or try again.",
  },
  aborted: {
    icon: Ban,
    title: "Request Cancelled",
    message: "The request was cancelled.",
  },
  unknown: {
    icon: AlertTriangle,
    title: "Something Went Wrong",
    message: "An unexpected error occurred. Please try again.",
  },
};

export function ChatErrorBanner({ error, onRetry, isRetrying, onDismiss }: ChatErrorBannerProps) {
  const type = classifyError(error);
  const config = errorConfig[type];
  const Icon = config.icon;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="mx-auto mb-2 w-full max-w-3xl rounded-xl px-4 py-3"
      style={{
        background: "rgba(239,68,68,0.1)",
        border: "1px solid rgba(239,68,68,0.25)",
      }}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          <Icon className="h-4 w-4 text-[#ef4444]" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-[#fca5a5]">{config.title}</p>
          <p className="mt-0.5 text-xs text-[#ef4444]/80">{config.message}</p>
          {error.message !== config.message && (
            <p className="mt-1 text-[10px] text-[#ef4444]/50 font-mono truncate">
              {error.message}
            </p>
          )}
        </div>
        <div className="flex shrink-0 gap-2">
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss error"
              className="inline-flex items-center justify-center rounded-lg p-1.5 text-[#ef4444]/60 transition hover:bg-[rgba(239,68,68,0.15)] hover:text-[#ef4444]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={onRetry}
            disabled={isRetrying}
            aria-label="Retry request"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[#fca5a5] transition hover:bg-[rgba(239,68,68,0.15)] disabled:opacity-50"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isRetrying ? "animate-spin" : ""}`}
              aria-hidden="true"
            />
            {isRetrying ? "Retrying..." : "Retry"}
          </button>
        </div>
      </div>
    </div>
  );
}
