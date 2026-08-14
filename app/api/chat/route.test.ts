import { afterEach, describe, expect, it } from "vitest";
import { POST } from "./route";

function chatRequest(messages: unknown): Request {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ messages }),
  });
}

const userMessages = [
  {
    id: "m1",
    role: "user",
    parts: [{ type: "text", text: "Hello" }],
  },
];

describe("POST /api/chat", () => {
  afterEach(() => {
    delete process.env.AI_MOCK;
  });

  it("returns a streamed UI message response from the mock model without an API key", async () => {
    process.env.AI_MOCK = "1";

    const response = await POST(chatRequest(userMessages));

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/event-stream");

    const body = await response.text();
    expect(body.length).toBeGreaterThan(0);
    expect(body).toContain("deterministic mock reply");
  });

  it("executes the searchProjectDocs tool via the mock model when asked about the docs", async () => {
    process.env.AI_MOCK = "1";

    const response = await POST(
      chatRequest([
        {
          id: "m1",
          role: "user",
          parts: [{ type: "text", text: "What did I write about the Study Coach agent?" }],
        },
      ]),
    );

    expect(response.status).toBe(200);
    const body = await response.text();
    expect(body).toContain("searchProjectDocs");
  });

  it("rejects a request without a messages array", async () => {
    process.env.AI_MOCK = "1";

    const response = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({}),
      }),
    );

    expect(response.status).toBe(400);
    expect(await response.text()).toContain("messages array is required");
  });
});