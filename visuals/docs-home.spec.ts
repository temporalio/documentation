import { expect, test } from "@playwright/test";

const basePath = "/";

// Disable animations so captured screenshots are stable.
const screenshotOptions = {
  animations: "disabled" as const,
  fullPage: true,
};

test.describe("Documentation visuals", () => {
  test("homepage", async ({ page }) => {
    await page.goto(basePath);
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveScreenshot("homepage.png", screenshotOptions);
  });
});
