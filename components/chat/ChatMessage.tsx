"use client";

import { useMemo } from "react";
import type { UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

interface ChatMessageProps {
  message: UIMessage;
  isStreaming?: boolean;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getTextContent(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => (part as { type: "text"; text: string }).text)
    .join("");
}

function getCreatedAt(message: UIMessage): Date | undefined {
  if ("createdAt" in message && message.createdAt instanceof Date) {
    return message.createdAt;
  }
  return undefined;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user";
  const content = getTextContent(message);
  const createdAt = getCreatedAt(message);
  const time = useMemo(
    () => (createdAt ? formatTime(createdAt) : ""),
    [createdAt],
  );

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      role="listitem"
    >
      <div
        className={`flex max-w-[85%] flex-col gap-1 sm:max-w-[75%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "bg-[#6c63ff] text-white"
              : "text-[#cbd5e1]"
          }`}
          style={
            !isUser
              ? {
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }
              : undefined
          }
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{content}</p>
          ) : (
            <div className="prose prose-sm prose-invert max-w-none prose-code:before:content-none prose-code:after:content-none">
              <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                  pre({ children }) {
                    return (
                      <pre className="mt-2 mb-2 overflow-x-auto rounded-lg bg-[#0a0a0f] p-4 text-xs leading-relaxed">
                        {children}
                      </pre>
                    );
                  },
                  code({ className, children, ...props }) {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code
                          className="rounded bg-[rgba(108,99,255,0.15)] px-1.5 py-0.5 text-[#a5b4fc]"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
          {isStreaming && content === "" && (
            <span className="inline-flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#6c63ff]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#6c63ff] [animation-delay:0.1s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#6c63ff] [animation-delay:0.2s]" />
            </span>
          )}
        </div>
        {time && (
          <p className="px-1 text-[10px] text-[#64748b]">{time}</p>
        )}
      </div>
    </div>
  );
}
