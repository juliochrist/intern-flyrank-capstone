import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatMessage } from "./ChatMessage";
import {
  assistantMessage,
  dynamicToolPart,
  sampleDocsOutput,
  userMessage,
} from "../../test/factories";

describe("ChatMessage", () => {
  it("renders user text in a bubble", () => {
    render(<ChatMessage message={userMessage("u1", "Hello from the user")} />);

    expect(
      screen.getByRole("listitem").querySelector(".whitespace-pre-wrap"),
    ).toHaveTextContent("Hello from the user");
  });

  it("renders assistant markdown content as formatted text", () => {
    const message = assistantMessage(
      "a1",
      "# Heading\n\nSome **bold** and `inline code`",
    );

    render(<ChatMessage message={message} />);

    expect(screen.getByRole("heading", { name: "Heading" })).toBeInTheDocument();
    expect(screen.getByText("bold")).toBeInTheDocument();
    expect(screen.getByText("inline code")).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toHaveTextContent(
      "Some bold and inline code",
    );
  });

  it("shows the typing indicator while streaming with no content yet", () => {
    const message = assistantMessage("a1", "", { parts: [] });

    render(<ChatMessage message={message} isStreaming />);

    const dots = screen
      .getByRole("listitem")
      .querySelectorAll(".animate-bounce");
    expect(dots.length).toBe(3);
  });

  it("does not show the typing indicator once streaming content has arrived", () => {
    const message = assistantMessage("a1", "Partial reply");

    render(<ChatMessage message={message} isStreaming />);

    expect(
      screen.getByRole("listitem").querySelectorAll(".animate-bounce"),
    ).toHaveLength(0);
  });

  it("renders the tool input-streaming lifecycle state", () => {
    const message = assistantMessage("a1", "", {
      parts: [
        dynamicToolPart({ state: "input-streaming", input: undefined }),
      ],
    });

    render(<ChatMessage message={message} />);

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Preparing analysis");
    expect(status).toHaveTextContent("Project docs search…");
  });

  it("renders the tool input-available state with the query summary", () => {
    const message = assistantMessage("a1", "", {
      parts: [
        dynamicToolPart({
          state: "input-available",
          input: { query: "Study Coach agent", scope: "all" },
        }),
      ],
    });

    render(<ChatMessage message={message} />);

    expect(screen.getByText("Analyzing Project docs search")).toBeInTheDocument();
    expect(screen.getByText(/Study Coach agent/)).toBeInTheDocument();
  });

  it("renders the tool output as a Project Docs result card", () => {
    const message = assistantMessage("a1", "", {
      parts: [
        dynamicToolPart({
          state: "output-available",
          input: { query: "Study Coach agent", scope: "all" },
          output: sampleDocsOutput,
        }),
      ],
    });

    render(<ChatMessage message={message} />);

    expect(
      screen.getByText('Project docs matching "Study Coach agent"'),
    ).toBeInTheDocument();
    expect(screen.getByText("4 matches")).toBeInTheDocument();
    expect(screen.getByText(sampleDocsOutput.findings[0])).toBeInTheDocument();
  });

  it("renders the tool error state with a retry action", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    const message = assistantMessage("a1", "", {
      parts: [
        dynamicToolPart({
          state: "output-error",
          input: { query: "!fail test", scope: "all" },
          errorText: "Simulated tool failure",
        }),
      ],
    });

    render(<ChatMessage message={message} onRetry={onRetry} />);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Project docs search failed");
    expect(alert).toHaveTextContent("Simulated tool failure");

    await user.click(screen.getByRole("button", { name: "Retry response" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("shows the message timestamp when one is provided", () => {
    const createdAt = new Date("2026-01-01T10:30:00");
    render(<ChatMessage message={userMessage("u1", "Hello", createdAt)} />);

    expect(screen.getByText(/10:30/)).toBeInTheDocument();
  });
});