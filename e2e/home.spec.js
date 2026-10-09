import { test, expect } from '@playwright/test';

test('Home Page Visuals', async ({ page, colorScheme }) => {
  await page.goto('/');
  
  if (colorScheme === 'dark') {
    await page.evaluate(() => document.documentElement.classList.add('dark'));
  }

  // Wait for animations
  await page.waitForTimeout(1000);
  
  await expect(page).toHaveScreenshot('home-visual.png', { fullPage: true, maxDiffPixels: 300 });
});
