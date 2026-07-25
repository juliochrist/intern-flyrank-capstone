import { anthropic } from "@ai-sdk/anthropic";

export const CLAUDE_MODEL = "claude-sonnet-4-20250514";

export function getModel(modelName: string = CLAUDE_MODEL) {
  return anthropic(modelName);
}
