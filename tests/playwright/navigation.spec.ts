import { test, expect } from './fixtures';

test('shared navigation includes only API links, submenus and existing controls', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/workflows');
  const nav = page.getByRole('navigation', { name: 'Main', exact: true });
  await expect(nav.getByRole('link', { name: 'Docs', exact: true })).toHaveAttribute('aria-current', 'page');
  for (const name of ['Pricing', 'Try Free', 'Log In']) {
    await expect(nav.getByRole('link', { name, exact: true })).toBeVisible();
  }
  for (const name of ['Courses', 'SDKs', 'Durable AI']) {
    await expect(nav.locator('.universal-nav-links').getByRole('link', { name, exact: true })).toHaveCount(0);
  }
  const askAi = nav.getByRole('button', { name: 'Ask AI', exact: true });
  await expect(askAi).toBeVisible();
  await expect(askAi).toHaveCSS('background-image',
    'linear-gradient(135deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%)');
  const search = nav.getByRole('button', { name: /Search/ }).first();
  const theme = nav.getByRole('button', { name: /Switch between dark and light mode/ });
  const controls = [search, theme, askAi,
    nav.getByRole('link', { name: 'Try Free', exact: true }),
    nav.getByRole('link', { name: 'Log In', exact: true })];
  await search.focus();
  for (let index = 0; index < controls.length; index += 1) {
    await expect(controls[index]).toBeFocused();
    if (index + 1 < controls.length) {
      const current = await controls[index].boundingBox();
      const next = await controls[index + 1].boundingBox();
      expect(current!.x + current!.width).toBeLessThanOrEqual(next!.x);
      await page.keyboard.press('Tab');
    }
  }

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
  const primaryMenu = sidebar.locator('.navbar-sidebar__item').first();
  for (const name of ['Courses', 'SDKs', 'Durable AI']) {
    await expect(primaryMenu.getByRole('link', { name, exact: true })).toHaveCount(0);
  }
  await expect(sidebar.getByRole('link', { name: 'Log In', exact: true })).toBeVisible();
});

test('desktop hover menus stay open while moving into the submenu', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/workflows');
  const group = page.locator('.universal-nav-desktop-group details').filter({ hasText: 'Use Cases' });
  await group.locator('summary').hover();
  const link = group.getByRole('link', { name: 'Financial Services', exact: true });
  await expect(link).toBeVisible();
  await link.hover();
  await expect(link).toBeVisible();
  const triggerBox = await group.locator('summary').boundingBox();
  const panelBox = await group.locator('.universal-nav-submenu').boundingBox();
  expect(panelBox!.y).toBeCloseTo(triggerBox!.y + triggerBox!.height, 0);
  await page.locator('.navbar__inner .navbar__brand').hover();
  await expect(link).not.toBeVisible();
});

for (const theme of ['light', 'dark'] as const) {
  test(`navigation fits at intermediate desktop widths in ${theme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme });
    await page.goto('/workflows');
    for (const width of [1920, 1600, 1440, 1439, 1280, 1024, 997]) {
      await page.setViewportSize({ width, height: 900 });
      const nav = page.getByRole('navigation', { name: 'Main', exact: true });
      await expect(nav.locator('.universal-nav-links > :last-child')).toBeVisible();
      await expect.poll(() => nav.evaluate((element) => {
        const height = parseFloat(getComputedStyle(document.documentElement)
          .getPropertyValue('--ifm-navbar-height')) * parseFloat(getComputedStyle(document.documentElement).fontSize);
        return Math.abs(element.getBoundingClientRect().height - height);
      })).toBeLessThan(1);
      await expect(page.locator('body')).toHaveJSProperty('scrollWidth', width);
      await expect(nav).toHaveCSS('background-color', theme === 'dark' ? 'rgb(20, 20, 20)' : 'rgb(255, 255, 255)');
      const lastLink = await nav.locator('.universal-nav-links > :last-child').boundingBox();
      const firstAction = await nav.getByRole('button', { name: /Search/ }).first().boundingBox();
      expect(lastLink!.x + lastLink!.width <= firstAction!.x || lastLink!.y + lastLink!.height <= firstAction!.y)
        .toBeTruthy();
      if (width >= 1440) {
        const logo = await nav.locator('.navbar__inner .navbar__logo').boundingBox();
        const firstLink = await nav.locator('.universal-nav-links > :first-child').boundingBox();
        const controls = await nav.locator('.navbar__items--right').boundingBox();
        const menuCenter = (firstLink!.x + lastLink!.x + lastLink!.width) / 2;
        const availableCenter = (logo!.x + logo!.width + controls!.x) / 2;
        expect(Math.abs(menuCenter - availableCenter)).toBeLessThan(1);
      }
    }
  });

  test(`mobile controls fit without exposing desktop CTAs in ${theme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme });
    await page.goto('/workflows');
    for (const width of [996, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      const nav = page.getByRole('navigation', { name: 'Main', exact: true });
      await expect(nav.locator('.navbar__items .universal-nav-cta:visible')).toHaveCount(0);
      await expect(nav.getByRole('button', { name: 'Ask AI', exact: true })).toBeVisible();
      await expect(nav.getByRole('button', { name: /Search/ }).first()).toBeVisible();
      await expect(nav.locator('.navbar__inner .navbar__brand')).toBeVisible();
      await expect(page.locator('body')).toHaveJSProperty('scrollWidth', width);
      const logo = await nav.locator('.navbar__inner .navbar__brand').boundingBox();
      const actions = await nav.locator('.navbar__items--right').boundingBox();
      expect(logo!.x + logo!.width).toBeLessThanOrEqual(actions!.x);
    }
  });
}
