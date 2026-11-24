import { test, expect } from './fixtures';

test('shared navigation includes docs links, submenus and existing controls', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/workflows');
  const nav = page.getByRole('navigation', { name: 'Main', exact: true });
  await expect(nav.getByRole('link', { name: 'Docs', exact: true })).toHaveAttribute('aria-current', 'page');
  for (const name of ['Courses', 'SDKs', 'Durable AI', 'Try Free', 'Log In']) {
    await expect(nav.getByRole('link', { name, exact: true })).toBeVisible();
  }
  await expect(nav.getByRole('button', { name: 'Ask AI', exact: true })).toBeVisible();
  await expect(nav.getByRole('button', { name: /Search/ }).first()).toBeVisible();
  await expect(nav.getByRole('button', { name: /Switch between dark and light mode/ })).toBeVisible();

  const group = nav.locator('.universal-nav-desktop-group details').filter({ hasText: 'Use Cases' });
  const trigger = group.locator('summary');
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(group.getByText('By Industry', { exact: true })).toBeVisible();
  await expect(group.getByRole('link', { name: 'Financial Services', exact: true }))
    .toHaveAttribute('href', 'https://temporal.io/solutions/financial-services');
  await page.keyboard.press('Escape');
  await expect(group.getByText('By Industry', { exact: true })).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await nav.getByRole('link', { name: 'Docs', exact: true }).focus();
  await expect(group.getByText('By Industry', { exact: true })).not.toBeVisible();
  await expect(page.locator('body')).toHaveJSProperty('scrollWidth', 1920);
});

test('shared groups remain available in the mobile primary menu', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/workflows');
  await page.getByRole('button', { name: 'Toggle navigation bar' }).click();
  const sidebar = page.locator('.navbar-sidebar');
  const back = sidebar.getByRole('button', { name: /Back to main menu/ });
  await back.click();
  const group = sidebar.locator('details').filter({
    has: page.locator('summary').filter({ hasText: /^Platform$/ }),
  });
  await group.locator('summary').click();
  await expect(group.getByRole('link', { name: 'How Temporal Works', exact: true })).toBeVisible();
  await expect(sidebar.getByRole('link', { name: 'SDKs', exact: true })).toBeVisible();
  await expect(sidebar.getByRole('link', { name: 'Log In', exact: true })).toBeVisible();
});

for (const theme of ['light', 'dark'] as const) {
  test(`navigation fits at intermediate desktop widths in ${theme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme });
    await page.goto('/workflows');
    for (const width of [1599, 1280, 1024, 997]) {
      await page.setViewportSize({ width, height: 900 });
      const nav = page.getByRole('navigation', { name: 'Main', exact: true });
      await expect(nav.getByRole('link', { name: 'Durable AI', exact: true })).toBeVisible();
      await expect.poll(() => nav.evaluate((element) => {
        const height = parseFloat(getComputedStyle(document.documentElement)
          .getPropertyValue('--ifm-navbar-height')) * parseFloat(getComputedStyle(document.documentElement).fontSize);
        return Math.abs(element.getBoundingClientRect().height - height);
      })).toBeLessThan(1);
      await expect(page.locator('body')).toHaveJSProperty('scrollWidth', width);
      await expect(nav).toHaveCSS('background-color', theme === 'dark' ? 'rgb(20, 20, 20)' : 'rgb(255, 255, 255)');
    }
  });
}
