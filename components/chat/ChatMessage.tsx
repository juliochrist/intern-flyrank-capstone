"use client";

import { useMemo } from "react";
import type { UIMessage, DynamicToolUIPart } from "ai";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { ToolPart } from "./ToolPart";

interface ChatMessageProps {
  message: UIMessage;
  isStreaming?: boolean;
  onRetry?: () => void;
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

function isDynamicToolPart(
  part: UIMessage["parts"][number],
): part is DynamicToolUIPart {
  return part.type === "dynamic-tool";
}

export function ChatMessage({ message, isStreaming, onRetry }: ChatMessageProps) {
  const isUser = message.role === "user";
  const content = getTextContent(message);
  const createdAt = getCreatedAt(message);
  const time = useMemo(
    () => (createdAt ? formatTime(createdAt) : ""),
    [createdAt],
  );
  const toolParts = message.parts.filter(isDynamicToolPart);
  const hasToolParts = toolParts.length > 0;
  const showBubble = content.length > 0 || (isStreaming && !hasToolParts);

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
        {!isUser &&
          toolParts.map((part) => (
            <ToolPart key={part.toolCallId} part={part} onRetry={onRetry} />
          ))}
        {showBubble && (
          <div
            className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              isUser
                ? "bg-primary text-primary-foreground"
                : "text-[#D0D0E0]"
            }`}
            style={
              !isUser
                ? {
                    background: "rgba(35,33,44,0.35)",
                    border: "1px solid rgba(255,255,255,0.08)",
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
                        <pre className="mt-2 mb-2 overflow-x-auto rounded-lg bg-base p-4 text-xs leading-relaxed">
                          {children}
                        </pre>
                      );
                    },
                    code({ className, children, ...props }) {
                      const isInline = !className;
                      if (isInline) {
                        return (
                          <code
                            className="rounded bg-primary/20 px-1.5 py-0.5 text-[#B0A8FF]"
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
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.2s]" />
              </span>
            )}
          </div>
        )}
        {time && (
          <p className="px-1 text-[10px] text-muted-foreground">{time}</p>
        )}
      </div>
    </div>
  );
}
