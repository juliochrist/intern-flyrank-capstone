import type { DynamicToolUIPart, UIMessage } from "ai";

export function textPart(text: string): { type: "text"; text: string } {
  return { type: "text", text };
}

export function userMessage(
  id: string,
  text: string,
  createdAt = new Date("2026-01-01T10:00:00"),
): UIMessage {
  return {
    id,
    role: "user",
    parts: [textPart(text)],
    createdAt,
  } as UIMessage;
}

export function assistantMessage(
  id: string,
  text: string,
  options: {
    createdAt?: Date;
    parts?: UIMessage["parts"];
  } = {},
): UIMessage {
  return {
    id,
    role: "assistant",
    parts: options.parts ?? [textPart(text)],
    ...(options.createdAt ? { createdAt: options.createdAt } : {}),
  } as UIMessage;
}

export function dynamicToolPart(
  partial: Partial<DynamicToolUIPart> & { state: DynamicToolUIPart["state"] },
): DynamicToolUIPart {
  return {
    type: "dynamic-tool",
    toolName: "searchProjectDocs",
    toolCallId: "tool-1",
    ...partial,
  } as DynamicToolUIPart;
}

export const sampleDocsOutput = {
  query: "Study Coach agent",
  title: 'Project docs matching "Study Coach agent"',
  summary:
    "Found 4 matching documents in the project index. Top result: FL-07 Build the Agent.",
  findings: [
    "The agent workspace lives in agent/ with a spec, instructions, eval cases, and a build log.",
    "The demo script reads local assignment files and prepares structured context for Claude Project.",
  ],
  matchedFiles: ["agent/agent-spec.md", "agent/build-log.md"],
  matchedCount: 4,
};