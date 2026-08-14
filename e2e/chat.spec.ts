import { test, expect } from "@playwright/test";

test.describe("AI chat primary flow", () => {
  test("user sends a message and receives the mock assistant reply", async ({
    page,
  }) => {
    await page.goto("/chat");

    await expect(
      page.getByRole("heading", { name: "AI Chat", level: 1 }),
    ).toBeVisible();

    const input = page.getByLabel("Chat message");
    await expect(input).toBeVisible();

    await input.fill("Hello there");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(
      page.getByText("This is a deterministic mock reply", { exact: false }),
    ).toBeVisible({ timeout: 20_000 });
  });

  test("docs query triggers the searchProjectDocs tool and renders the result card", async ({
    page,
  }) => {
    await page.goto("/chat");

    const input = page.getByLabel("Chat message");
    await input.fill("What did I write about the Study Coach agent?");
    await page.getByRole("button", { name: "Send message" }).click();

    const resultCard = page.getByRole("status").filter({
      hasText: "Project docs matching",
    });
    await expect(resultCard).toBeVisible({ timeout: 20_000 });
    await expect(resultCard).toContainText("Key findings");
    await expect(resultCard).toContainText("Sources");

    await expect(
      page.getByText(
        "I ran the project docs search. The structured result above shows what I found in your documentation.",
      ),
    ).toBeVisible({ timeout: 20_000 });
  });
});