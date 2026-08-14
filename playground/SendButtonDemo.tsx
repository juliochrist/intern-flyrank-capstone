"use client";

import { useRef, useState } from "react";
import {
  SendButton,
  SEND_BUTTON_ERROR_MS,
  SEND_BUTTON_SUCCESS_MS,
  type SendButtonPhase,
} from "../components/chat/SendButton";

const LOADING_DURATION_MS = 1500;

export function SendButtonDemo() {
  const [phase, setPhase] = useState<SendButtonPhase>("idle");
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    const timer = setTimeout(() => {
      fn();
      clearTimers();
    }, ms);
    timersRef.current.push(timer);
  };

  const simulateSend = () => {
    clearTimers();
    setPhase("loading");
    schedule(() => setPhase("success"), LOADING_DURATION_MS);
    schedule(
      () => setPhase("idle"),
      LOADING_DURATION_MS + SEND_BUTTON_SUCCESS_MS,
    );
  };

  const simulateFailure = () => {
    clearTimers();
    setPhase("error");
    schedule(() => setPhase("idle"), SEND_BUTTON_ERROR_MS);
  };

  const simulateSuccess = () => {
    clearTimers();
    setPhase("success");
    schedule(() => setPhase("idle"), SEND_BUTTON_SUCCESS_MS);
  };

  const reset = () => {
    clearTimers();
    setPhase("idle");
  };

  return (
    <div>
      <div className="flex items-center gap-5">
        <SendButton
          phase={phase}
          onSend={simulateSend}
          onStop={reset}
          onRetry={simulateSend}
        />
        <p className="text-sm text-muted">
          Phase:{" "}
          <span className="font-mono text-[#B0A8FF]">{phase}</span>
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {[
          {
            label: "Simulate send (loading → success)",
            onClick: simulateSend,
          },
          { label: "Simulate failure", onClick: simulateFailure },
          { label: "Show success only", onClick: simulateSuccess },
          { label: "Reset to idle", onClick: reset },
        ].map(({ label, onClick }) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-medium text-foreground transition hover:-translate-y-0.5 hover:bg-white/10"
            style={{
              background: "rgba(35,33,44,0.35)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Everything here is deterministic — no AI API is involved. Clicking the
        main button runs a fixed loading→success sequence; clicking it again
        while loading aborts back to idle. The error trigger plays a brief
        shake, then the button becomes a retry and restores itself to idle.
        With{" "}
        <span className="font-mono text-foreground">
          prefers-reduced-motion
        </span>{" "}
        enabled, all animation is removed but every state signal (icon, colour,
        label) stays.
      </p>
    </div>
  );
}
