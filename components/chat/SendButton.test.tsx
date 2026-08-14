import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SendButton, type SendButtonPhase } from "./SendButton";

function renderSendButton(
  overrides: Partial<{
    phase: SendButtonPhase;
    disabled: boolean;
    canStop: boolean;
    onSend: () => void;
    onStop: () => void;
    onRetry: () => void;
  }> = {},
) {
  const props = {
    phase: "idle" as SendButtonPhase,
    onSend: vi.fn(),
    onStop: vi.fn(),
    onRetry: vi.fn(),
    ...overrides,
  };
  const utils = render(<SendButton {...props} />);
  return { ...utils, props };
}

describe("SendButton", () => {
  it("renders the idle send control and fires onSend when clicked", async () => {
    const user = userEvent.setup();
    const { props } = renderSendButton();

    const button = screen.getByRole("button", { name: "Send message" });
    expect(button).not.toBeDisabled();

    await user.click(button);
    expect(props.onSend).toHaveBeenCalledTimes(1);
  });

  it("is disabled when idle and the input is empty", () => {
    renderSendButton({ disabled: true });

    const button = screen.getByRole("button", { name: "Send message" });
    expect(button).toBeDisabled();
  });

  it("shows the loading state with aria-busy and acts as the stop control", async () => {
    const user = userEvent.setup();
    const { props } = renderSendButton({ phase: "loading" });

    const button = screen.getByRole("button", { name: "Stop generation" });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Sending message")).toBeInTheDocument();

    await user.click(button);
    expect(props.onStop).toHaveBeenCalledTimes(1);
    expect(props.onSend).not.toHaveBeenCalled();
  });

  it("shows the success state and ignores clicks while it is visible", async () => {
    const user = userEvent.setup();
    const { props } = renderSendButton({ phase: "success" });

    const button = screen.getByRole("button", { name: "Message sent" });
    expect(button).not.toHaveAttribute("aria-busy");
    expect(screen.getByText("Message sent")).toBeInTheDocument();

    await user.click(button);
    expect(props.onSend).not.toHaveBeenCalled();
    expect(props.onStop).not.toHaveBeenCalled();
    expect(props.onRetry).not.toHaveBeenCalled();
  });

  it("shows the error state with a retry action", async () => {
    const user = userEvent.setup();
    const { props } = renderSendButton({ phase: "error" });

    const button = screen.getByRole("button", { name: "Retry sending" });
    expect(screen.getByText("Message failed to send")).toBeInTheDocument();

    await user.click(button);
    expect(props.onRetry).toHaveBeenCalledTimes(1);
    expect(props.onSend).not.toHaveBeenCalled();
  });

  it("activates with the keyboard (focus + Enter)", async () => {
    const user = userEvent.setup();
    const { props } = renderSendButton();

    const button = screen.getByRole("button", { name: "Send message" });
    button.focus();
    await user.keyboard("{Enter}");

    expect(props.onSend).toHaveBeenCalledTimes(1);
  });

  it("respects prefers-reduced-motion without losing state feedback", () => {
    const reducedMotionQuery = {
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
    window.matchMedia = vi.fn().mockReturnValue(reducedMotionQuery);

    const { unmount } = renderSendButton({ phase: "error" });

    const button = screen.getByRole("button", { name: "Retry sending" });
    expect(button).toHaveAttribute("data-reduced", "true");
    // State feedback is never removed when motion is: label + live text remain.
    expect(screen.getByText("Message failed to send")).toBeInTheDocument();
    expect(button).toHaveTextContent("Message failed to send");

    unmount();
  });
});