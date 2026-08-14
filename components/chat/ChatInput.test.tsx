import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatInput } from "./ChatInput";

function renderChatInput(
  overrides: Partial<{
    input: string;
    onInputChange: (value: string) => void;
    onSend: (message: string) => void;
    onStop: () => void;
    onRegenerate: () => void;
    status: "submitted" | "streaming" | "ready" | "error";
    hasMessages: boolean;
  }> = {},
) {
  const props = {
    input: "",
    onInputChange: vi.fn(),
    onSend: vi.fn(),
    onStop: vi.fn(),
    onRegenerate: vi.fn(),
    status: "ready" as const,
    hasMessages: false,
    ...overrides,
  };
  const utils = render(<ChatInput {...props} />);
  return { ...utils, props };
}

describe("ChatInput", () => {
  it("disables the send button when the input is empty", () => {
    renderChatInput();

    expect(screen.getByRole("button", { name: "Send message" })).toBeDisabled();
  });

  it("submits the trimmed message and clears the textarea", async () => {
    const user = userEvent.setup();
    const { props } = renderChatInput({
      input: "  What is React?  ",
      onInputChange: vi.fn(),
    });

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(props.onSend).toHaveBeenCalledWith("What is React?");
  });

  it("does not submit while a request is in flight", () => {
    const { props } = renderChatInput({
      input: "Hello",
      status: "submitted",
    });

    fireEvent.submit(screen.getByRole("textbox", { name: "Chat message" }).closest("form")!);

    expect(props.onSend).not.toHaveBeenCalled();
  });

  it("switches to the stop button and disables the input while streaming", () => {
    renderChatInput({ input: "Hello", status: "streaming" });

    expect(screen.getByRole("button", { name: "Stop generation" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Send message" })).not.toBeInTheDocument();
    expect(screen.getByLabelText("Chat message")).toBeDisabled();
  });

  it("calls onStop when the stop button is pressed", async () => {
    const user = userEvent.setup();
    const { props } = renderChatInput({ input: "Hello", status: "submitted" });

    await user.click(screen.getByRole("button", { name: "Stop generation" }));

    expect(props.onStop).toHaveBeenCalledTimes(1);
  });

  it("shows regenerate only when there are messages and nothing is streaming", () => {
    const { rerender } = renderChatInput({ hasMessages: true });

    const regenerate = screen.getByRole("button", { name: "Regenerate last response" });
    expect(regenerate).toBeInTheDocument();

    rerender(
      <ChatInput
        input=""
        onInputChange={vi.fn()}
        onSend={vi.fn()}
        onStop={vi.fn()}
        onRegenerate={vi.fn()}
        status="streaming"
        hasMessages
      />,
    );

    expect(screen.queryByRole("button", { name: "Regenerate last response" })).not.toBeInTheDocument();
  });
});