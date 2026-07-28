"use client";

interface ChatSkeletonProps {
  visible: boolean;
}

export function ChatSkeleton({ visible }: ChatSkeletonProps) {
  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="AI is thinking"
      className="flex items-start justify-start"
    >
      <div
        className="flex w-full max-w-[75%] flex-col gap-3 rounded-2xl px-5 py-4"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="flex items-center gap-3">
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
          <span className="text-xs font-medium text-[#64748b]">Thinking...</span>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-[rgba(255,255,255,0.08)]" />
          <div className="h-3 w-3/4 animate-pulse rounded bg-[rgba(255,255,255,0.08)]" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-[rgba(255,255,255,0.08)]" />
        </div>
      </div>
    </div>
  );
}
