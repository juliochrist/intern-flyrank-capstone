import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatErrorBanner } from "./ChatErrorBanner";

function renderBanner(error: Error, overrides: Partial<{ isRetrying: boolean; onDismiss: () => void }> = {}) {
  return render(
    <ChatErrorBanner
      error={error}
      onRetry={vi.fn()}
      isRetrying={overrides.isRetrying ?? false}
      onDismiss={overrides.onDismiss}
    />,
  );
}

describe("ChatErrorBanner", () => {
  it("classifies a fetch failure as a network error", () => {
    renderBanner(new Error("Failed to fetch"));

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Connection Error");
    expect(alert).toHaveTextContent("Unable to reach the server");
  });

  it("classifies a 429 response as a rate-limit error", () => {
    renderBanner(new Error("Too many requests"));

    expect(screen.getByRole("alert")).toHaveTextContent("Rate Limit Exceeded");
  });

  it("classifies a 500 response as a server error", () => {
    renderBanner(new Error("Internal Server Error"));

    expect(screen.getByRole("alert")).toHaveTextContent("Server Error");
  });

  it("falls back to the generic message for unknown errors", () => {
    renderBanner(new Error("Something odd happened"));

    expect(screen.getByRole("alert")).toHaveTextContent("Something Went Wrong");
  });

  it("calls onRetry when retry is pressed", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(
      <ChatErrorBanner error={new Error("boom")} onRetry={onRetry} isRetrying={false} />,
    );

    await user.click(screen.getByRole("button", { name: "Retry request" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("calls onDismiss when the dismiss button is pressed", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    renderBanner(new Error("boom"), { onDismiss });

    await user.click(screen.getByRole("button", { name: "Dismiss error" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});