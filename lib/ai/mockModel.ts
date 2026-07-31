import { MockLanguageModelV4 } from "ai/test";
import type {
  LanguageModelV4Prompt,
  LanguageModelV4StreamPart,
  LanguageModelV4Usage,
} from "@ai-sdk/provider";

const parts = (input: LanguageModelV4StreamPart[]) => input;

function lastUserText(prompt: LanguageModelV4Prompt): string {
  let text = "";
  for (const message of prompt) {
    if (message.role === "user") {
      for (const part of message.content) {
        if (part.type === "text") text = part.text;
      }
    }
  }
  return text;
}

const usage: LanguageModelV4Usage = {
  inputTokens: { total: 10, noCache: 10, cacheRead: 0, cacheWrite: 0 },
  outputTokens: { total: 4, text: 4, reasoning: 0 },
};

const finishStop: LanguageModelV4StreamPart = {
  type: "finish",
  usage,
  finishReason: { unified: "stop", raw: "stop" },
};

const finishTool: LanguageModelV4StreamPart = {
  type: "finish",
  usage,
  finishReason: { unified: "tool-calls", raw: "tool_calls" },
};

function textStream(reply: string): LanguageModelV4StreamPart[] {
  return parts([
    { type: "stream-start", warnings: [] },
    { type: "text-start", id: "t1" },
    { type: "text-delta", id: "t1", delta: reply },
    { type: "text-end", id: "t1" },
    finishStop,
  ]);
}

function toolStream(input: string): LanguageModelV4StreamPart[] {
  const toolCallId = "mock-tool-call-1";
  const inputJson = JSON.stringify(JSON.parse(input));
  const chunks: string[] = [];
  for (let i = 0; i < inputJson.length; i += 8) {
    chunks.push(inputJson.slice(i, i + 8));
  }
  return parts([
    { type: "stream-start", warnings: [] },
    {
      type: "tool-input-start",
      id: toolCallId,
      toolName: "searchProjectDocs",
      dynamic: true,
    },
    ...chunks.map((delta) => ({ type: "tool-input-delta" as const, id: toolCallId, delta })),
    { type: "tool-input-end", id: toolCallId },
    { type: "tool-call", toolCallId, toolName: "searchProjectDocs", input },
    finishTool,
  ]);
}

function enqueueDelayed(
  controller: ReadableStreamDefaultController<LanguageModelV4StreamPart>,
  partsToStream: LanguageModelV4StreamPart[],
  delayMs: number,
) {
  let i = 0;
  const timer = setInterval(() => {
    if (i < partsToStream.length) {
      controller.enqueue(partsToStream[i]);
      i += 1;
    } else {
      clearInterval(timer);
      controller.close();
    }
  }, delayMs);
}

export function createMockModel() {
  return new MockLanguageModelV4({
    provider: "mock",
    modelId: "mock-tool-model",
    doStream: async (options) => {
      const prompt = options.prompt;
      const lastMessage = prompt[prompt.length - 1];

      if (lastMessage != null && lastMessage.role === "tool") {
        return {
          stream: new ReadableStream<LanguageModelV4StreamPart>({
            start(controller) {
              enqueueDelayed(
                controller,
                textStream(
                  "I ran the project docs search. The structured result above shows what I found in your documentation.",
                ),
                40,
              );
            },
          }),
        };
      }

      const userText = lastUserText(prompt).toLowerCase();

      if (userText.includes("!fail")) {
        return {
          stream: new ReadableStream<LanguageModelV4StreamPart>({
            start(controller) {
              enqueueDelayed(
                controller,
                toolStream(JSON.stringify({ query: "!fail test", scope: "all" })),
                40,
              );
            },
          }),
        };
      }

      if (userText.includes("study coach")) {
        return {
          stream: new ReadableStream<LanguageModelV4StreamPart>({
            start(controller) {
              enqueueDelayed(
                controller,
                toolStream(JSON.stringify({ query: "Study Coach agent", scope: "all" })),
                40,
              );
            },
          }),
        };
      }

      return {
        stream: new ReadableStream<LanguageModelV4StreamPart>({
          start(controller) {
            enqueueDelayed(
              controller,
              textStream(
                "This is a deterministic mock reply. Ask me about the project docs (try 'Study Coach agent') to trigger the search tool.",
              ),
              40,
            );
          },
        }),
      };
    },
  });
}
