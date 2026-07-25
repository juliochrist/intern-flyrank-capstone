"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ThinkingIndicator } from "./ThinkingIndicator";
import { ScrollToBottom } from "./ScrollToBottom";

export function Chat() {
  const { messages, sendMessage, stop, status, error, regenerate } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const hasMessages = messages.length > 0;
  const lastMessage = messages[messages.length - 1];
  const isBusy = status === "submitted" || status === "streaming";
  const hasTextContent = (msg: typeof lastMessage) =>
    msg?.parts?.some((p) => p.type === "text" && (p as { type: "text"; text: string }).text.length > 0);
  const isWaitingForFirstToken =
    status === "submitted" ||
    (status === "streaming" && lastMessage?.role === "assistant" && !hasTextContent(lastMessage));

  return (
    <div className="flex h-full flex-col">
      {hasMessages ? (
        <ScrollToBottom isStreaming={isBusy}>
          <div className="mx-auto max-w-3xl space-y-4" role="log" aria-label="Chat messages">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isStreaming={
                  isBusy &&
                  message.role === "assistant" &&
                  message.id === lastMessage?.id
                }
              />
            ))}
            <ThinkingIndicator visible={!!isWaitingForFirstToken} />
          </div>
        </ScrollToBottom>
      ) : (
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(108,99,255,0.1)] ring-1 ring-[rgba(108,99,255,0.2)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6c63ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-[#f1f5f9]">
              AI Chat
            </h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Ask me anything about frontend engineering.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mx-auto mb-2 max-w-3xl rounded-xl bg-error/10 px-4 py-2 text-xs text-error"
          style={{ border: "1px solid rgba(239,68,68,0.2)" }}
        >
          {error.message || "An error occurred. Please try again."}
        </div>
      )}

      <ChatInput
        onSend={(message) => sendMessage({ text: message })}
        onStop={stop}
        onRegenerate={regenerate}
        status={status}
        hasMessages={hasMessages}
      />
    </div>
  );
}
