"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  Loader2,
  Send,
  Square,
  TriangleAlert,
} from "lucide-react";

export type SendButtonPhase = "idle" | "loading" | "success" | "error";

export const SEND_BUTTON_SUCCESS_MS = 1400;
export const SEND_BUTTON_ERROR_MS = 2600;

interface SendButtonProps {
  phase: SendButtonPhase;
  disabled?: boolean;
  /** When true while loading, the control shows the explicit stop affordance (a stream is running). */
  canStop?: boolean;
  onSend?: () => void;
  onStop?: () => void;
  onRetry?: () => void;
  className?: string;
}

const STATUS_TEXT: Record<SendButtonPhase, string> = {
  idle: "",
  loading: "Sending message",
  success: "Message sent",
  error: "Message failed to send",
};

function getLabel(phase: SendButtonPhase): string {
  switch (phase) {
    case "loading":
      return "Stop generation";
    case "success":
      return "Message sent";
    case "error":
      return "Retry sending";
    default:
      return "Send message";
  }
}

function usePrefersReducedMotion(): boolean {
  // Start false on both server and first client render so SSR and hydration
  // produce identical HTML (the server cannot know the preference). The effect
  // below sets the real value right after mount, and the CSS @media
  // (prefers-reduced-motion: reduce) fallback covers the gap in between.
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export function SendButton({
  phase,
  disabled = false,
  canStop = false,
  onSend,
  onStop,
  onRetry,
  className = "",
}: SendButtonProps) {
  const reducedMotion = usePrefersReducedMotion();

  const isLoading = phase === "loading";
  const isDisabled = phase === "idle" && disabled;
  const label = getLabel(phase);

  const background =
    phase === "success"
      ? "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)"
      : phase === "error"
        ? "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
        : isDisabled
          ? "rgba(255,255,255,0.08)"
          : "linear-gradient(135deg, #7C6AFF 0%, #6A58E8 100%)";

  const shadow =
    phase === "success"
      ? "0 4px 16px rgba(34,197,94,0.3)"
      : phase === "error"
        ? "0 4px 16px rgba(239,68,68,0.3)"
        : isDisabled
          ? "none"
          : "0 4px 16px rgba(124,106,255,0.35)";

  const handleClick = () => {
    if (isLoading) {
      onStop?.();
      return;
    }
    if (phase === "success") return;
    if (phase === "error") {
      onRetry?.();
      return;
    }
    if (!isDisabled) onSend?.();
  };

  const iconClass = (active: boolean, extra = "") =>
    `sb-icon absolute inset-0 ${active ? "sb-icon-on" : ""} ${extra}`.trim();

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={label}
      aria-busy={isLoading || undefined}
      data-reduced={reducedMotion ? "true" : undefined}
      className={`sb-btn ${phase === "error" ? "sb-shake" : ""} ${className}`}
      style={{ background, boxShadow: shadow }}
    >
      <span className="sb-glow" aria-hidden="true" />
      <span className="relative h-5 w-5">
        <Send className={iconClass(phase === "idle")} aria-hidden="true" />
        {canStop ? (
          <Square className={iconClass(isLoading)} aria-hidden="true" />
        ) : (
          <Loader2
            className={iconClass(
              isLoading,
              isLoading ? "sb-spinner" : "",
            )}
            aria-hidden="true"
          />
        )}
        <Check
          className={iconClass(
            phase === "success",
            phase === "success" ? "sb-icon-on--pop" : "",
          )}
          aria-hidden="true"
        />
        <TriangleAlert
          className={iconClass(phase === "error")}
          aria-hidden="true"
        />
      </span>
      <span className="sr-only" role="status" aria-live="polite">
        {STATUS_TEXT[phase]}
      </span>
    </button>
  );
}
