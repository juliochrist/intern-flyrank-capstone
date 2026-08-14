import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDocsResultCard } from "./ProjectDocsResultCard";
import { sampleDocsOutput } from "../../test/factories";

describe("ProjectDocsResultCard", () => {
  it("renders the full tool result: title, match count, summary, findings, and sources", () => {
    render(<ProjectDocsResultCard result={sampleDocsOutput} />);

    const card = screen.getByRole("status");
    expect(card).toHaveTextContent('Project docs matching "Study Coach agent"');
    expect(card).toHaveTextContent("4 matches");
    expect(card).toHaveTextContent(sampleDocsOutput.summary);
    expect(card).toHaveTextContent("Key findings");
    expect(card).toHaveTextContent(sampleDocsOutput.findings[0]);
    expect(card).toHaveTextContent(sampleDocsOutput.findings[1]);
    expect(card).toHaveTextContent("Sources");
    expect(card).toHaveTextContent("agent/agent-spec.md");
    expect(card).toHaveTextContent("agent/build-log.md");
  });

  it("uses the singular 'match' label for a single match", () => {
    render(
      <ProjectDocsResultCard
        result={{ ...sampleDocsOutput, matchedCount: 1, findings: [], matchedFiles: [] }}
      />,
    );

    expect(screen.getByRole("status")).toHaveTextContent("1 match");
  });

  it("renders the empty state when there are no findings", () => {
    render(
      <ProjectDocsResultCard
        result={{
          ...sampleDocsOutput,
          matchedCount: 0,
          findings: [],
          matchedFiles: [],
          title: "No matching documents",
        }}
      />,
    );

    expect(screen.getByRole("status")).toHaveTextContent("No matching documents");
    expect(screen.getByText("No findings to show. Try rewording the query.")).toBeInTheDocument();
    expect(screen.queryByText("Sources")).not.toBeInTheDocument();
  });
});