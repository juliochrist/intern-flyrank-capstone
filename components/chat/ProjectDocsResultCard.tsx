"use client";

import { FileText, ListChecks, SearchX } from "lucide-react";

interface ProjectDocsResultCardProps {
  result: {
    query: string;
    title: string;
    summary: string;
    findings: string[];
    matchedFiles: string[];
    matchedCount: number;
  };
}

export function ProjectDocsResultCard({ result }: ProjectDocsResultCardProps) {
  const hasFindings = result.findings.length > 0;
  const hasFiles = result.matchedFiles.length > 0;

  return (
    <div
      className="w-full overflow-hidden rounded-xl text-left"
      role="status"
      style={{
        background: "rgba(35,33,44,0.6)",
        border: "1px solid rgba(124,106,255,0.25)",
      }}
    >
      <div
        className="flex items-center gap-2 border-b px-4 py-2.5"
        style={{ borderColor: "rgba(124,106,255,0.2)" }}
      >
        <FileText className="h-4 w-4 text-[#7C6AFF]" aria-hidden="true" />
        <p className="truncate text-xs font-semibold text-[#f1f5f9]">
          {result.title}
        </p>
        <span
          className="ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
          style={{ background: "rgba(124,106,255,0.15)", color: "#B0A8FF" }}
        >
          {result.matchedCount} {result.matchedCount === 1 ? "match" : "matches"}
        </span>
      </div>

      <div className="space-y-3 px-4 py-3">
        <p className="text-xs leading-relaxed text-[#D0D0E0]">{result.summary}</p>

        {hasFindings ? (
          <div>
            <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium text-[#7C6AFF] uppercase tracking-wider">
              <ListChecks className="h-3.5 w-3.5" aria-hidden="true" />
              Key findings
            </p>
            <ul className="space-y-1.5">
              {result.findings.map((finding, index) => (
                <li
                  key={`${index}-${finding}`}
                  className="flex items-start gap-2 text-xs leading-relaxed text-[#D0D0E0]"
                >
                  <span
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                    style={{ background: "#7C6AFF" }}
                    aria-hidden="true"
                  />
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-lg px-3 py-2.5">
            <SearchX className="h-4 w-4 shrink-0 text-[#64748b]" aria-hidden="true" />
            <p className="text-xs text-[#94a3b8]">
              No findings to show. Try rewording the query.
            </p>
          </div>
        )}

        {hasFiles && (
          <div className="border-t pt-2.5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <p className="mb-1 text-[10px] font-medium text-[#64748b] uppercase tracking-wider">
              Sources
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {result.matchedFiles.map((file) => (
                <li
                  key={file}
                  className="rounded-md px-2 py-1 font-mono text-[10px] text-[#94a3b8]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {file}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
