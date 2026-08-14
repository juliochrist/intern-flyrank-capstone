import { describe, expect, it, vi, beforeEach } from "vitest";

const chatMock = vi.hoisted(() => ({
  state: {
    messages: [] as Array<{ id: string; role: "user" | "assistant"; parts: { type: "text"; text: string }[] }>,
    status: "ready" as string,
    error: undefined as Error | undefined,
  },
  sendMessage: vi.fn(),
  stop: vi.fn(),
  regenerate: vi.fn(),
  useChat: vi.fn(),
}));

vi.mock("@ai-sdk/react", () => ({
  useChat: chatMock.useChat,
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chat } from "./Chat";

function setUseChat() {
  chatMock.useChat.mockImplementation(() => ({
    messages: chatMock.state.messages,
    status: chatMock.state.status,
    error: chatMock.state.error,
    sendMessage: chatMock.sendMessage,
    stop: chatMock.stop,
    regenerate: chatMock.regenerate,
  }));
}

describe("Chat", () => {
  beforeEach(() => {
    chatMock.state.messages = [];
    chatMock.state.status = "ready";
    chatMock.state.error = undefined;
    chatMock.sendMessage.mockReset();
    setUseChat();
  });

  it("shows the empty state when there are no messages", () => {
    render(<Chat />);

    expect(screen.getByRole("heading", { name: "AI Chat" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create a responsive navbar component/ }),
    ).toBeInTheDocument();
  });

  it("sends a user message and renders the assistant reply", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Chat />);

    const input = screen.getByLabelText("Chat message");
    await user.type(input, "What is React?");
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(chatMock.sendMessage).toHaveBeenCalledWith({ text: "What is React?" });
    expect(input).toHaveValue("");

    chatMock.state.status = "streaming";
    chatMock.state.messages = [
      { id: "u1", role: "user", parts: [{ type: "text", text: "What is React?" }] },
      { id: "a1", role: "assistant", parts: [{ type: "text", text: "This is a deterministic mock reply." }] },
    ];
    rerender(<Chat />);

    expect(
      await screen.findByText("This is a deterministic mock reply."),
    ).toBeInTheDocument();
    expect(screen.getByText("What is React?")).toBeInTheDocument();
  });

  it("renders the thinking skeleton while waiting for the first token", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Chat />);

    await user.type(screen.getByLabelText("Chat message"), "Hello");
    chatMock.state.status = "submitted";
    chatMock.state.messages = [
      { id: "u1", role: "user", parts: [{ type: "text", text: "Hello" }] },
    ];
    rerender(<Chat />);

    expect(screen.getByRole("status", { name: "AI is thinking" })).toBeInTheDocument();
    expect(screen.getByText("Thinking...")).toBeInTheDocument();
  });

  it("shows the error banner on failure and dismisses it", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Chat />);

    chatMock.state.error = new Error("Failed to fetch");
    chatMock.state.messages = [
      { id: "u1", role: "user", parts: [{ type: "text", text: "Hello" }] },
    ];
    rerender(<Chat />);

    expect(screen.getByRole("alert")).toHaveTextContent("Connection Error");

    await user.click(screen.getByRole("button", { name: "Dismiss error" }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});