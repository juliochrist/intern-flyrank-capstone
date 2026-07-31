import { dynamicTool } from "ai";
import { z } from "zod";
import { PROJECT_DOCS, type ProjectDocEntry } from "./projectDocsData";

export const searchProjectDocsSchema = z.object({
  query: z
    .string()
    .min(1, "Query is required.")
    .max(120, "Keep the query under 120 characters."),
  scope: z
    .enum(["all", "assignments", "agent"])
    .optional()
    .default("all")
    .describe("Which documentation to search: internship assignments, the personal agent workspace, or everything."),
});

export type SearchProjectDocsInput = z.infer<typeof searchProjectDocsSchema>;

export interface SearchProjectDocsOutput {
  query: string;
  title: string;
  summary: string;
  findings: string[];
  matchedFiles: string[];
  matchedCount: number;
}

const FAILURE_TRIGGER = "!fail";
const MAX_FINDINGS = 6;
const MAX_RESULT_DOCS = 3;

function isInScope(entry: ProjectDocEntry, scope: SearchProjectDocsInput["scope"]): boolean {
  if (scope === "agent") return entry.section === "Agent";
  if (scope === "assignments") return entry.section !== "Agent";
  return true;
}

function rankDocs(
  entries: ProjectDocEntry[],
  query: string,
): ProjectDocEntry[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  return entries
    .map((entry) => {
      const title = entry.title.toLowerCase();
      const summary = entry.summary.toLowerCase();
      const file = entry.file.toLowerCase();
      const points = entry.keyPoints.map((p) => p.toLowerCase());

      let score = 0;
      for (const term of terms) {
        if (title.includes(term)) score += 3;
        if (file.includes(term)) score += 2;
        if (points.some((p) => p.includes(term))) score += 2;
        if (summary.includes(term)) score += 1;
      }
      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ entry }) => entry);
}

export function searchProjectDocs({ query, scope }: SearchProjectDocsInput): SearchProjectDocsOutput {
  const trimmed = query.trim();

  if (trimmed.toLowerCase().startsWith(FAILURE_TRIGGER)) {
    throw new Error(
      "Simulated tool failure: the searchProjectDocs tool failed to read the documentation index. (Triggered by the !fail test prefix.)",
    );
  }

  const matches = rankDocs(PROJECT_DOCS.filter((entry) => isInScope(entry, scope)), trimmed);
  const topDocs = matches.slice(0, MAX_RESULT_DOCS);

  const findings = topDocs.flatMap((doc) => doc.keyPoints).slice(0, MAX_FINDINGS);
  const matchedFiles = topDocs.map((doc) => doc.file);

  if (topDocs.length === 0) {
    return {
      query: trimmed,
      title: "No matching documents",
      summary: `No documentation in this project matched "${trimmed}". Try a broader term such as "agent", "chat", "settings", or "identity kit".`,
      findings: [],
      matchedFiles: [],
      matchedCount: 0,
    };
  }

  return {
    query: trimmed,
    title: `Project docs matching "${trimmed}"`,
    summary: `Found ${matches.length} matching document${matches.length === 1 ? "" : "s"} in the project index. Top result: ${topDocs[0].title}.`,
    findings,
    matchedFiles,
    matchedCount: matches.length,
  };
}

export const tools = {
  searchProjectDocs: dynamicTool({
    description:
      "Searches the project's own documentation index — internship assignments (weeks 1-5) and the personal Study Coach agent workspace. Returns a structured summary of the documents that match the query, including key findings. Use it whenever the user asks about this project's docs, past assignments, the agent, the identity kit, or portfolio decisions. Call it instead of guessing what is in the repository.",
    inputSchema: searchProjectDocsSchema,
    execute: async (input) =>
      searchProjectDocs(input as SearchProjectDocsInput),
  }),
};
