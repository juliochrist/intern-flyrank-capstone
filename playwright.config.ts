import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `AI_MOCK=1 npm run dev -- --port ${PORT}`,
    url: `http://127.0.0.1:${PORT}/chat`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});