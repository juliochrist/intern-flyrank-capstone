"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  SendButton,
  SEND_BUTTON_ERROR_MS,
  SEND_BUTTON_SUCCESS_MS,
  type SendButtonPhase,
} from "./SendButton";

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: (message: string) => void;
  onStop: () => void;
  onRegenerate: () => void;
  status: "submitted" | "streaming" | "ready" | "error";
  hasMessages: boolean;
}

type FeedbackPhase = "idle" | "success" | "error";

export function ChatInput({
  input,
  onInputChange,
  onSend,
  onStop,
  onRegenerate,
  status,
  hasMessages,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isBusy = status === "submitted" || status === "streaming";
  const isEmpty = !input.trim();

  const [feedback, setFeedback] = useState<FeedbackPhase>("idle");
  const prevStatusRef = useRef(status);
  const submittingRef = useRef(false);
  const stoppedRef = useRef(false);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearFeedbackTimer = useCallback(() => {
    if (feedbackTimerRef.current != null) {
      clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
  }, []);

  // Release the duplicate-submission guard and drive success/error feedback.
  useEffect(() => {
    const wasBusy =
      prevStatusRef.current === "submitted" ||
      prevStatusRef.current === "streaming";
    const nowBusy = status === "submitted" || status === "streaming";

    if (!nowBusy) submittingRef.current = false;

    if (wasBusy && !nowBusy) {
      clearFeedbackTimer();
      if (status === "error") {
        setFeedback("error");
        feedbackTimerRef.current = setTimeout(
          () => setFeedback("idle"),
          SEND_BUTTON_ERROR_MS,
        );
      } else if (stoppedRef.current) {
        stoppedRef.current = false;
        setFeedback("idle");
      } else {
        setFeedback("success");
        feedbackTimerRef.current = setTimeout(
          () => setFeedback("idle"),
          SEND_BUTTON_SUCCESS_MS,
        );
      }
    }

    prevStatusRef.current = status;
  }, [status, clearFeedbackTimer]);

  useEffect(() => clearFeedbackTimer, [clearFeedbackTimer]);

  useEffect(() => {
    if (!isBusy && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isBusy]);

  const doSend = () => {
    if (isEmpty || isBusy || submittingRef.current) return;
    submittingRef.current = true;
    clearFeedbackTimer();
    setFeedback("idle");
    onSend(input.trim());
    onInputChange("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    doSend();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      doSend();
    }
  };

  const handleStop = () => {
    stoppedRef.current = true;
    onStop();
  };

  const phase: SendButtonPhase = isBusy
    ? "loading"
    : feedback === "success"
      ? "success"
      : feedback === "error"
        ? "error"
        : "idle";

  return (
    <div
      className="border-t px-4 py-4"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl gap-3">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            rows={1}
            disabled={isBusy}
            aria-label="Chat message"
            className="w-full resize-none rounded-xl px-4 py-3 pr-12 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 disabled:opacity-40"
            style={{
              background: "rgba(35,33,44,0.35)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
        </div>

        <div className="flex shrink-0 items-center">
          <SendButton
            phase={phase}
            disabled={isEmpty}
            canStop={status === "streaming"}
            onSend={doSend}
            onStop={handleStop}
            onRetry={onRegenerate}
          />
        </div>
      </form>

      {!isBusy && hasMessages && (
        <div className="mx-auto mt-2 flex max-w-3xl justify-center">
          <button
            type="button"
            onClick={onRegenerate}
            aria-label="Regenerate last response"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-muted"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            Regenerate
          </button>
        </div>
      )}
    </div>
  );
}