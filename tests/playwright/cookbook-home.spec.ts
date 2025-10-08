import { expect, test } from '@playwright/test';
import type { Locator } from '@playwright/test';

const collectTileData = async (locator: Locator) => {
  return locator.evaluateAll((elements) => {
    return elements.map((element) => {
      const link = element as HTMLAnchorElement;
      const heading = element.querySelector('h2, h3, h4, h5, h6');
      const title = heading?.textContent?.trim() ?? '';
      const href = link.getAttribute('href') ?? link.getAttribute('to') ?? '';
      return { title, href };
    });
  });
};

test.describe('Cookbook home', () => {
  test('renders cookbook tiles with expected metadata and layout on desktop', async ({ page }) => {
    await page.goto('/ai-cookbook');

    await expect(page.getByTestId('cookbook-hero')).toBeVisible();

    const tiles = page.locator('.tile');
    await expect(tiles).not.toHaveCount(0);

    const tileData = await collectTileData(tiles);
    expect(tileData.length).toBeGreaterThan(0);

    for (const { title, href } of tileData) {
      expect(title).not.toEqual('');
      expect(href).toMatch(/\/ai-cookbook\//);
    }

    const gridMetrics = await tiles.evaluateAll((elements) => {
      if (elements.length === 0) return null;

      const sample = elements[0];
      const grid = sample.parentElement?.parentElement;
      if (!grid) return null;

      const gridRect = grid.getBoundingClientRect();
      const gridTemplate = getComputedStyle(grid).gridTemplateColumns.trim();
      const columnCount = gridTemplate ? gridTemplate.split(/\s+/).filter(Boolean).length : 0;
      const fractions = elements.map((el) => {
        const rect = el.getBoundingClientRect();
        return gridRect.width > 0 ? rect.width / gridRect.width : 0;
      });

      return { gridTemplate, columnCount, fractions };
    });

    expect(gridMetrics).not.toBeNull();
    expect(gridMetrics?.columnCount).toBe(3);

    for (const fraction of gridMetrics?.fractions ?? []) {
      expect(fraction).toBeGreaterThan(0.2);
      expect(fraction).toBeLessThan(0.38);
    }
  });

  test('stacks tiles into a single column on mobile viewports', async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 900 });
    await page.goto('/ai-cookbook');

    const tiles = page.locator('.tile');
    await expect(tiles).not.toHaveCount(0);

    const widthFractions = await tiles.evaluateAll((elements) =>
      elements.map((element) => {
        const tileRect = element.getBoundingClientRect();
        const grid = element.parentElement?.parentElement;
        const gridRect = grid?.getBoundingClientRect();
        const fraction = gridRect && gridRect.width > 0 ? tileRect.width / gridRect.width : 0;
        return Number(fraction.toFixed(2));
      })
    );

    for (const fraction of widthFractions) {
      expect(fraction).toBeGreaterThan(0.9);
      expect(fraction).toBeLessThan(1.05);
    }
  });
});
