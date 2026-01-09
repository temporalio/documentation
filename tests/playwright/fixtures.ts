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
    // Block all Amplitude and analytics requests by fulfilling with empty responses
    // This prevents timeouts that would occur if we abort the requests
    await context.route('**/*amplitude*/**', route => route.fulfill({ status: 200, body: '' }));
    await context.route('**/comms', route => route.fulfill({ status: 200, body: '' }));
    await context.route('**/*.amplitude.com/**', route => route.fulfill({ status: 200, body: '' }));
    await context.route('**/api.amplitude.com/**', route => route.fulfill({ status: 200, body: '' }));
    await context.route('**/api2.amplitude.com/**', route => route.fulfill({ status: 200, body: '' }));

    await use();
  }, { auto: true }], // Automatically runs for every test
});

export { expect } from '@playwright/test';
