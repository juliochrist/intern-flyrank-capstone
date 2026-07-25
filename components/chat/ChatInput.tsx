"use client";

import { useRef, useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop: () => void;
  onRegenerate: () => void;
  status: "submitted" | "streaming" | "ready" | "error";
  hasMessages: boolean;
}

export function ChatInput({
  onSend,
  onStop,
  onRegenerate,
  status,
  hasMessages,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isBusy = status === "submitted" || status === "streaming";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() && !isBusy) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isBusy) {
        onSend(input.trim());
        setInput("");
      }
    }
  };

  return (
    <div
      className="border-t px-4 py-4"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl gap-3">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            rows={1}
            disabled={isBusy}
            aria-label="Chat message"
            className="w-full resize-none rounded-xl bg-[rgba(255,255,255,0.05)] px-4 py-3 pr-12 text-sm text-[#f1f5f9] outline-none transition placeholder:text-[#64748b] focus:ring-2 focus:ring-[#6c63ff]/50 disabled:opacity-40"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        </div>

        <div className="flex shrink-0 gap-2">
          {isBusy ? (
            <button
              type="button"
              onClick={onStop}
              aria-label="Stop generation"
              className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                boxShadow: "0 4px 16px rgba(239,68,68,0.3)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim() || isBusy}
              aria-label="Send message"
              className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              style={{
                background:
                  "linear-gradient(135deg, #6c63ff 0%, #5a52e0 100%)",
                boxShadow: "0 4px 16px rgba(108,99,255,0.3)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {!isBusy && hasMessages && (
        <div className="mx-auto mt-2 flex max-w-3xl justify-center">
          <button
            type="button"
            onClick={onRegenerate}
            aria-label="Regenerate last response"
            className="inline-flex items-center gap-1.5 text-xs text-[#64748b] transition hover:text-[#94a3b8]"
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
