import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatEmptyState } from "./ChatEmptyState";

describe("ChatEmptyState", () => {
  it("renders the heading and the example prompts", () => {
    render(<ChatEmptyState onExampleClick={vi.fn()} />);

    expect(screen.getByRole("heading", { name: "AI Chat" })).toBeInTheDocument();
    expect(screen.getByText("Try asking")).toBeInTheDocument();

    const examples = screen.getAllByRole("button");
    expect(examples).toHaveLength(4);
    expect(examples[0]).toHaveTextContent(
      "Create a responsive navbar component with a mobile hamburger menu",
    );
  });

  it("calls onExampleClick with the prompt when an example is selected", async () => {
    const user = userEvent.setup();
    const onExampleClick = vi.fn();

    render(<ChatEmptyState onExampleClick={onExampleClick} />);

    await user.click(
      screen.getByRole("button", {
        name: /Explain React Server Components vs Client Components/,
      }),
    );

    expect(onExampleClick).toHaveBeenCalledWith(
      "Explain React Server Components vs Client Components with examples",
    );
  });
});