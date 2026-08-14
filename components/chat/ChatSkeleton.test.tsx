import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatSkeleton } from "./ChatSkeleton";

describe("ChatSkeleton", () => {
  it("renders nothing when hidden", () => {
    const { container } = render(<ChatSkeleton visible={false} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("announces the thinking state while waiting for the first token", () => {
    render(<ChatSkeleton visible />);

    expect(screen.getByRole("status", { name: "AI is thinking" })).toBeInTheDocument();
    expect(screen.getByText("Thinking...")).toBeInTheDocument();
  });
});