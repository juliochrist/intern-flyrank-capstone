"use client";

interface ThinkingIndicatorProps {
  visible: boolean;
}

export function ThinkingIndicator({ visible }: ThinkingIndicatorProps) {
  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="AI is thinking"
      className="flex items-start justify-start"
    >
      <div
        className="flex items-center gap-3 rounded-2xl px-5 py-4"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="flex gap-1.5">
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-[#6c63ff]"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-[#6c63ff]"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-[#6c63ff]"
            style={{ animationDelay: "300ms" }}
          />
        </div>
        <span className="text-xs font-medium text-[#64748b]">
          Thinking...
        </span>
      </div>
    </div>
  );
}
