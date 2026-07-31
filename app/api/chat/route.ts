import { isStepCount, streamText } from "ai";
import type {
  DynamicToolUIPart,
  JSONValue,
  ModelMessage,
  UIMessage,
} from "ai";
import { getModel } from "@/lib/ai/claude";
import { getSystemPrompt } from "@/lib/ai/systemPrompt";
import { tools } from "@/lib/ai/tools";
import { createMockModel } from "@/lib/ai/mockModel";

export const maxDuration = 60;

function isTextPart(
  part: UIMessage["parts"][number],
): part is { type: "text"; text: string } {
  return part.type === "text";
}

type AssistantPart =
  | { type: "text"; text: string }
  | {
      type: "tool-call";
      toolCallId: string;
      toolName: string;
      input: unknown;
    }
  | {
      type: "tool-result";
      toolCallId: string;
      toolName: string;
      output:
        | { type: "json"; value: JSONValue }
        | { type: "error-json"; value: string };
    };

function toModelMessage(message: UIMessage): ModelMessage[] {
  switch (message.role) {
    case "system": {
      const text = message.parts.filter(isTextPart).map((p) => p.text).join("");
      return text ? [{ role: "system", content: text }] : [];
    }
    case "user": {
      const content = message.parts.filter(isTextPart).map((p) => ({
        type: "text" as const,
        text: p.text,
      }));
      return [{ role: "user", content }];
    }
    case "assistant": {
      const content: AssistantPart[] = [];
      const toolResults: {
        type: "tool-result";
        toolCallId: string;
        toolName: string;
        output: { type: "json"; value: JSONValue } | { type: "error-json"; value: string };
      }[] = [];
      for (const part of message.parts) {
        if (isTextPart(part)) {
          content.push({ type: "text", text: part.text });
        } else if (part.type === "dynamic-tool") {
          const tool = part as DynamicToolUIPart;
          if (tool.state === "input-streaming") continue;
          if (tool.state === "output-available") {
            toolResults.push({
              type: "tool-result",
              toolCallId: tool.toolCallId,
              toolName: tool.toolName,
              output: { type: "json", value: tool.output as JSONValue },
            });
          } else if (tool.state === "output-error") {
            toolResults.push({
              type: "tool-result",
              toolCallId: tool.toolCallId,
              toolName: tool.toolName,
              output: { type: "error-json", value: tool.errorText },
            });
          }
          const hasResult = toolResults.some(
            (r) => r.toolCallId === tool.toolCallId,
          );
          if (tool.providerExecuted !== true && hasResult) {
            content.push({
              type: "tool-call",
              toolCallId: tool.toolCallId,
              toolName: tool.toolName,
              input: tool.input,
            });
          }
        }
      }
      const messages: ModelMessage[] = [];
      if (content.length > 0) messages.push({ role: "assistant", content });
      if (toolResults.length > 0) messages.push({ role: "tool", content: toolResults });
      return messages;
    }
    default:
      return [];
  }
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("messages array is required", { status: 400 });
    }

    const systemPrompt = getSystemPrompt();

    const modelMessages = messages.flatMap(toModelMessage);

    const result = streamText({
      model: process.env.AI_MOCK === "1" ? createMockModel() : getModel(),
      system: systemPrompt,
      messages: modelMessages,
      tools,
      stopWhen: isStepCount(3),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return new Response(message, { status: 500 });
  }
}
