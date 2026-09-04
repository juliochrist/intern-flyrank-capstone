"use client";

import { useState, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ChatEmptyState } from "./ChatEmptyState";
import { ChatErrorBanner } from "./ChatErrorBanner";
import { ChatSkeleton } from "./ChatSkeleton";
import { ScrollToBottom } from "./ScrollToBottom";
import { sabotage } from "../../lib/sabotage";

export function Chat() {
  const [input, setInput] = useState("");
  const [dismissedError, setDismissedError] = useState(false);

  const { messages, sendMessage, stop, status, error, regenerate } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  useEffect(() => {
    sabotage.patch();
    return () => sabotage.unpatch();
  }, []);

  useEffect(() => {
    if (error) {
      setDismissedError(false);
    }
  }, [error]);

  const hasMessages = messages.length > 0;
  const lastMessage = messages[messages.length - 1];
  const isBusy = status === "submitted" || status === "streaming";
  const hasTextContent = (msg: typeof lastMessage) =>
    msg?.parts?.some(
      (p) => p.type === "text" && (p as { type: "text"; text: string }).text.length > 0,
    );
  const hasToolContent = (msg: typeof lastMessage) =>
    msg?.parts?.some(
      (p) =>
        p.type === "dynamic-tool" &&
        (p.state === "output-available" || p.state === "output-error"),
    );
  const hasContent = (msg: typeof lastMessage) =>
    hasTextContent(msg) || hasToolContent(msg);
  const isWaitingForFirstToken =
    status === "submitted" ||
    (status === "streaming" && lastMessage?.role === "assistant" && !hasContent(lastMessage));

  const finishedButEmpty =
    status === "ready" &&
    lastMessage?.role === "assistant" &&
    hasMessages &&
    !hasContent(lastMessage);

  const showError = error && !dismissedError;

  const handleExampleClick = (prompt: string) => {
    setInput(prompt);
  };

  const handleRetry = () => {
    regenerate();
  };

  const handleDismissError = () => {
    setDismissedError(true);
  };

  const handleSend = (message: string) => {
    sendMessage({ text: message });
  };

  return (
    <div className="flex h-full flex-col">
      {!hasMessages && !showError ? (
        <ChatEmptyState onExampleClick={handleExampleClick} />
      ) : (
        <ScrollToBottom isStreaming={isBusy}>
<div
          className="mx-auto max-w-3xl space-y-4"
          role="log"
          aria-label="Chat messages"
          aria-live="polite"
        >
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onRetry={handleRetry}
                isStreaming={
                  isBusy &&
                  message.role === "assistant" &&
                  message.id === lastMessage?.id
                }
              />
            ))}
            <ChatSkeleton visible={!!isWaitingForFirstToken} />
            {finishedButEmpty && (
              <div
                className="flex items-start justify-start"
                role="status"
                aria-live="polite"
              >
                <div
                  className="rounded-2xl px-5 py-4 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <p className="font-medium text-[#f1f5f9]">
                    No response generated
                  </p>
                  <p className="mt-1 text-xs text-[#64748b]">
                    The assistant didn&apos;t produce a response. Try rewording
                    your prompt or asking a different question.
                  </p>
                </div>
              </div>
            )}
          </div>
        </ScrollToBottom>
      )}

      {showError && (
        <ChatErrorBanner
          error={error}
          onRetry={handleRetry}
          isRetrying={isBusy}
          onDismiss={handleDismissError}
        />
      )}

      <ChatInput
        input={input}
        onInputChange={setInput}
        onSend={handleSend}
        onStop={stop}
        onRegenerate={() => regenerate()}
        status={status}
        hasMessages={hasMessages}
      />
    </div>
  );
}
