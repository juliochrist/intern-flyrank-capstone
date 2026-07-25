"use client";

import { useEffect, useRef, useState } from "react";

const SCROLL_THRESHOLD = 100;

interface ScrollToBottomProps {
  children: React.ReactNode;
  isStreaming: boolean;
}

export function ScrollToBottom({ children, isStreaming }: ScrollToBottomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [userScrolledUp, setUserScrolledUp] = useState(false);
  const isAutoScrolling = useRef(false);

  const isNearBottom = () => {
    const el = containerRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < SCROLL_THRESHOLD;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (isAutoScrolling.current) return;
      setUserScrolledUp(!isNearBottom());
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isStreaming && !userScrolledUp) {
      const el = containerRef.current;
      if (!el) return;
      isAutoScrolling.current = true;
      el.scrollTop = el.scrollHeight;
      requestAnimationFrame(() => {
        isAutoScrolling.current = false;
      });
    }
  }, [isStreaming, userScrolledUp]);

  useEffect(() => {
    if (!isStreaming && !userScrolledUp) {
      const el = containerRef.current;
      if (!el) return;
      el.scrollTop = el.scrollHeight;
    }
  }, [isStreaming, userScrolledUp]);

  const jumpToLatest = () => {
    const el = containerRef.current;
    if (!el) return;
    isAutoScrolling.current = true;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    setUserScrolledUp(false);
    requestAnimationFrame(() => {
      isAutoScrolling.current = false;
    });
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 pb-4 pt-4"
      >
        {children}
      </div>
      {userScrolledUp && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <button
            type="button"
            onClick={jumpToLatest}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-[#f1f5f9] shadow-lg transition hover:-translate-y-0.5"
            style={{
              background: "rgba(108,99,255,0.9)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            Jump to latest
          </button>
        </div>
      )}
    </div>
  );
}
