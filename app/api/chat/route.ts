import { streamText } from "ai";
import { getModel } from "@/lib/ai/claude";
import { getSystemPrompt } from "@/lib/ai/systemPrompt";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("messages array is required", { status: 400 });
    }

    const systemPrompt = getSystemPrompt();

    const result = streamText({
      model: getModel(),
      system: systemPrompt,
      messages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return new Response(message, { status: 500 });
  }
}
