import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
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

afterEach(() => {
  vi.useRealTimers();
});

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

  it("sends on Enter without Shift and not on Shift+Enter", async () => {
    const user = userEvent.setup();
    const { props } = renderChatInput({ input: "Hello" });

    const textarea = screen.getByLabelText("Chat message");
    await user.click(textarea);
    await user.keyboard("{Shift>}{Enter}{/Shift}");

    expect(props.onSend).not.toHaveBeenCalled();

    await user.keyboard("{Enter}");

    expect(props.onSend).toHaveBeenCalledWith("Hello");
  });

  it("prevents duplicate submissions on rapid clicks", async () => {
    const user = userEvent.setup();
    const { props } = renderChatInput({ input: "Hello" });

    const send = screen.getByRole("button", { name: "Send message" });
    await user.click(send);
    await user.click(send);

    expect(props.onSend).toHaveBeenCalledTimes(1);
  });

  it("does not submit while a request is in flight", () => {
    const { props } = renderChatInput({
      input: "Hello",
      status: "submitted",
    });

    fireEvent.submit(
      screen.getByRole("textbox", { name: "Chat message" }).closest("form")!,
    );

    expect(props.onSend).not.toHaveBeenCalled();
  });

  it("switches to the stop control and disables the input while streaming", () => {
    renderChatInput({ input: "Hello", status: "streaming" });

    expect(
      screen.getByRole("button", { name: "Stop generation" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Send message" }),
    ).not.toBeInTheDocument();
    expect(screen.getByLabelText("Chat message")).toBeDisabled();
  });

  it("calls onStop when the stop control is pressed", async () => {
    const user = userEvent.setup();
    const { props } = renderChatInput({ input: "Hello", status: "submitted" });

    await user.click(screen.getByRole("button", { name: "Stop generation" }));

    expect(props.onStop).toHaveBeenCalledTimes(1);
  });

  it("shows success feedback after a completed send and returns to idle", () => {
    vi.useFakeTimers();
    const { props, rerender } = renderChatInput({ input: "Hello" });

    rerender(<ChatInput {...props} status="submitted" />);
    rerender(<ChatInput {...props} status="ready" />);

    expect(
      screen.getByRole("button", { name: "Message sent" }),
    ).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1400);
    });

    expect(
      screen.getByRole("button", { name: "Send message" }),
    ).toBeInTheDocument();
  });

  it("shows error feedback after a failed send and supports retry", async () => {
    const user = userEvent.setup();
    const { props, rerender } = renderChatInput({ input: "Hello" });

    rerender(<ChatInput {...props} status="submitted" />);
    rerender(<ChatInput {...props} status="error" />);

    const retry = screen.getByRole("button", { name: "Retry sending" });
    expect(screen.getByText("Message failed to send")).toBeInTheDocument();

    await user.click(retry);
    expect(props.onRegenerate).toHaveBeenCalledTimes(1);
  });

  it("returns to idle after the error feedback duration", () => {
    vi.useFakeTimers();
    const { props, rerender } = renderChatInput({ input: "Hello" });

    rerender(<ChatInput {...props} status="submitted" />);
    rerender(<ChatInput {...props} status="error" />);

    expect(screen.getByRole("button", { name: "Retry sending" })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2600);
    });

    expect(screen.getByRole("button", { name: "Send message" })).toBeInTheDocument();
  });

  it("does not show success feedback after an explicit stop", () => {
    const { props, rerender } = renderChatInput({
      input: "Hello",
      status: "submitted",
    });

    const stop = screen.getByRole("button", { name: "Stop generation" });
    fireEvent.click(stop);
    expect(props.onStop).toHaveBeenCalledTimes(1);

    rerender(<ChatInput {...props} status="ready" />);

    expect(
      screen.getByRole("button", { name: "Send message" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Message sent" }),
    ).not.toBeInTheDocument();
  });

  it("shows regenerate only when there are messages and nothing is streaming", () => {
    const { rerender } = renderChatInput({ hasMessages: true });

    const regenerate = screen.getByRole("button", {
      name: "Regenerate last response",
    });
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

    expect(
      screen.queryByRole("button", { name: "Regenerate last response" }),
    ).not.toBeInTheDocument();
  });
});