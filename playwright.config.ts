import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const PORT = Number(process.env.PORT ?? 3000);
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`;
const SNAPSHOT_DIR = process.env.PLAYWRIGHT_SNAPSHOT_DIR
  ? path.resolve(process.env.PLAYWRIGHT_SNAPSHOT_DIR)
  : path.resolve(__dirname, 'screenshots');

export default defineConfig({
  testDir: './tests/playwright',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  snapshotDir: SNAPSHOT_DIR,
  snapshotPathTemplate: '{snapshotDir}/{projectName}/{testFilePath}/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: 'yarn start',
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});