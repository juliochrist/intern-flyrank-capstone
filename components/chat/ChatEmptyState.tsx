"use client";

const EXAMPLE_PROMPTS = [
  "Create a responsive navbar component with a mobile hamburger menu",
  "Explain React Server Components vs Client Components with examples",
  "Show me a form with validation using React Hook Form and Zod",
];

interface ChatEmptyStateProps {
  onExampleClick: (prompt: string) => void;
}

export function ChatEmptyState({ onExampleClick }: ChatEmptyStateProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/25">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7C6AFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-foreground">AI Chat</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Ask me anything about frontend engineering.
        </p>

        <div className="mt-8 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Try asking
          </p>
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => onExampleClick(prompt)}
              className="w-full rounded-xl px-4 py-3 text-left text-sm text-[#D0D0E0] transition hover:text-foreground"
              style={{
                background: "rgba(35,33,44,0.35)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
