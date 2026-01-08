import { test as base } from '@playwright/test';

/**
 * Custom test with auto-fixture that blocks analytics requests.
 * This ensures consistent behavior across all tests and prevents
 * amplitude tracking from interfering with visual comparisons.
 *
 * The auto fixture runs before every test automatically.
 */
export const test = base.extend<{ blockAnalytics: void }>({
  blockAnalytics: [async ({ context }, use) => {
    // Block all Amplitude and analytics requests
    await context.route('**/*amplitude*/**', route => route.abort());
    await context.route('**/comms', route => route.abort());
    await context.route('**/*.amplitude.com/**', route => route.abort());
    await context.route('**/api.amplitude.com/**', route => route.abort());
    await context.route('**/api2.amplitude.com/**', route => route.abort());

    await use();
  }, { auto: true }], // Automatically runs for every test
});

export { expect } from '@playwright/test';
