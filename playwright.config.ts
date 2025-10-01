import { devices, defineConfig } from "@playwright/test";

const DEFAULT_BASE_URL = "http://127.0.0.1:3000";

export default defineConfig({
  snapshotDir: "screenshots",
  testDir: "visuals",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  expect: {
    toMatchSnapshot: {
      maxDiffPixels: 100,
    },
    toHaveScreenshot: {
      maxDiffPixels: 100,
    },
    timeout: 30_000,
  },
  reporter: process.env.CI ? "blob" : "html",
  webServer: {
    command: "npm run serve -- --dir build --no-open --host 127.0.0.1 --port 3000",
    url: process.env.PLAYWRIGHT_BASE_URL ?? DEFAULT_BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.PLAYWRIGHT_BASE_URL ?? DEFAULT_BASE_URL,
        trace: process.env.CI ? "retain-on-failure" : "off",
        video: process.env.CI ? "retain-on-failure" : "off",
      },
    },
  ],
});
