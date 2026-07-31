"use client";

import { Loader2, RefreshCw, TriangleAlert, Wrench } from "lucide-react";
import type { DynamicToolUIPart } from "ai";
import { ProjectDocsResultCard } from "./ProjectDocsResultCard";

interface ToolPartProps {
  part: DynamicToolUIPart;
  onRetry?: () => void;
}

function getInputSummary(input: unknown): string {
  if (input && typeof input === "object" && !Array.isArray(input)) {
    const { query, scope } = input as Record<string, unknown>;
    if (typeof query === "string" && query.trim()) {
      return scope && scope !== "all" ? `${query} (${String(scope)})` : query;
    }
    const keys = Object.keys(input);
    return keys.length > 0 ? keys.join(", ") : "empty input";
  }
  return "empty input";
}

export function ToolPart({ part, onRetry }: ToolPartProps) {
  const toolLabel = part.toolName === "searchProjectDocs" ? "Project docs search" : part.toolName;

  if (part.state === "input-streaming") {
    return (
      <div
        className="flex items-center gap-2.5 rounded-xl px-4 py-3"
        role="status"
        aria-live="polite"
        style={{
          background: "rgba(35,33,44,0.35)",
          border: "1px solid rgba(124,106,255,0.2)",
        }}
      >
        <Loader2 className="h-4 w-4 animate-spin text-[#7C6AFF]" aria-hidden="true" />
        <div className="text-xs text-[#D0D0E0]">
          <span className="font-medium text-[#f1f5f9]">Preparing analysis</span>
          <span className="text-[#64748b]"> — {toolLabel}…</span>
        </div>
      </div>
    );
  }

  if (part.state === "input-available") {
    return (
      <div
        className="flex items-start gap-2.5 rounded-xl px-4 py-3"
        role="status"
        aria-live="polite"
        style={{
          background: "rgba(35,33,44,0.35)",
          border: "1px solid rgba(124,106,255,0.2)",
        }}
      >
        <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-[#7C6AFF]" aria-hidden="true" />
        <div className="min-w-0 text-xs text-[#D0D0E0]">
          <p className="font-medium text-[#f1f5f9]">Analyzing {toolLabel}</p>
          <p className="mt-0.5 truncate text-[#94a3b8]">
            Searching: &ldquo;{getInputSummary(part.input)}&rdquo;
          </p>
        </div>
      </div>
    );
  }

  if (part.state === "output-error") {
    return (
      <div
        className="rounded-xl px-4 py-3"
        role="alert"
        style={{
          background: "rgba(239,68,68,0.08)",
          border: "1px solid rgba(239,68,68,0.25)",
        }}
      >
        <div className="flex items-start gap-2.5">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#ef4444]" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-[#fca5a5]">
              {toolLabel} failed
            </p>
            <p className="mt-0.5 text-xs text-[#ef4444]/80">
              Something went wrong while running the tool. You can continue
              chatting or retry the response.
            </p>
            {part.errorText && (
              <p className="mt-1 truncate font-mono text-[10px] text-[#ef4444]/50">
                {part.errorText}
              </p>
            )}
          </div>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              aria-label="Retry response"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#fca5a5] transition hover:bg-[rgba(239,68,68,0.15)]"
            >
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  if (part.state === "output-available") {
    const output = part.output;
    if (
      part.toolName === "searchProjectDocs" &&
      output &&
      typeof output === "object" &&
      "query" in output &&
      "title" in output
    ) {
      const result = output as {
        query: string;
        title: string;
        summary: string;
        findings: string[];
        matchedFiles: string[];
        matchedCount: number;
      };
      return <ProjectDocsResultCard result={result} />;
    }
    return (
      <div
        className="rounded-xl px-4 py-3 text-xs text-[#D0D0E0]"
        style={{
          background: "rgba(35,33,44,0.35)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span className="font-medium text-[#f1f5f9]">{toolLabel}</span>
        <span className="text-[#64748b]"> returned a result.</span>
      </div>
    );
  }

  return null;
}
