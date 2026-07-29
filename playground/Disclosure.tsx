"use client";

import { useId, useRef, useState } from "react";

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function Disclosure({ title, children, defaultOpen = false, className = "" }: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className={`rounded-2xl ${className}`}>
      <h3>
        <button
          type="button"
          id={buttonId}
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-foreground transition hover:bg-white/3"
          style={{
            borderRadius: open ? "1rem 1rem 0 0" : "1rem",
          }}
        >
          <span>{title}</span>
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
            className="shrink-0 text-muted-foreground transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight ?? 0}px` : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="border-t px-5 py-4 text-sm leading-relaxed text-muted" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export function Accordion({ children, className = "" }: AccordionProps) {
  return (
    <div
      className={`divide-y overflow-hidden rounded-2xl ${className}`}
      style={{
        background: "rgba(35,33,44,0.35)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      {children}
    </div>
  );
}
