import { test, expect } from '@playwright/test';

test.describe('Dashboard Page Visuals', () => {
  // Use a mock local storage to start signed in
  test.use({
    storageState: async (opts, applyFixture) => {
      // We can bypass storageState and just execute the script in the page
      await applyFixture({ cookies: [], origins: [] });
    }
  });

  test('Dashboard Visuals', async ({ page, colorScheme }) => {
    await page.goto('/');
    
    // Fake login using the correct elevateu_user key
    await page.evaluate(() => {
      localStorage.setItem('elevateu_user', JSON.stringify({
        id: 'mock-user-123',
        name: 'Test User',
        email: 'test@example.com',
        initials: 'TU'
      }));
    });

    await page.goto('/dashboard');

    if (colorScheme === 'dark') {
      await page.evaluate(() => document.documentElement.classList.add('dark'));
    }

    // Wait for data to load / charts to render
    await page.waitForTimeout(1500);

    await expect(page).toHaveScreenshot('dashboard-visual.png', { fullPage: true, maxDiffPixels: 300 });
  });
});
