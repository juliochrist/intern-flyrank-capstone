"use client";

import { Chat } from "../../components/chat/Chat";

export default function ChatPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="border-b px-4 py-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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
          <div>
            <h1 className="text-sm font-semibold text-foreground">AI Chat</h1>
            <p className="text-xs text-muted-foreground">Powered by Claude</p>
          </div>
        </div>
      </div>
      <Chat />
    </div>
  );
}
