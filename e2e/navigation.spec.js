import { test, expect } from '@playwright/test';

const MOCK_USER = {
  id: 'e1e8a7e0-9b4f-4d32-8418-009876543210',
  name: 'Playwright Test User',
  email: 'playwright.user@elevateu.in',
  avatar: '',
  initials: 'PT',
};

test.describe('Navigation Routing Tests', () => {

  test('public navigation links load correctly', async ({ page }) => {
    await page.goto('/');
    
    // Desktop navigation
    await page.click('text=Pricing');
    await expect(page).toHaveURL(/.*\/pricing/);
    
    await page.click('text=About');
    await expect(page).toHaveURL(/.*\/about/);

    // Return home
    await page.goto('/');

    // Check hash links
    await page.click('text=Features');
    await expect(page).toHaveURL(/.*#features/);

    await page.click('text=How it works');
    await expect(page).toHaveURL(/.*#how-it-works/);
  });

  test('sidebar tabs load correctly for authenticated user', async ({ page }) => {
    await page.goto('/');
    await page.evaluate((user) => {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem('elevateu_user', JSON.stringify(user));
    }, MOCK_USER);

    // Go to dashboard to see sidebar
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*\/dashboard/);

    // Click through each sidebar link
    const sidebarLinks = [
      { label: 'Profile', url: /.*\/profile/ },
      { label: 'Skill Assessment', url: /.*\/assessment/ },
      { label: 'Career Matches', url: /.*\/career-recommendations/ },
      { label: 'Skill Gaps', url: /.*\/skill-gap/ },
      { label: 'Learning Roadmap', url: /.*\/roadmap/ },
      { label: 'Courses', url: /.*\/courses/ },
      { label: 'Resume Analysis', url: /.*\/resume-analysis/ },
      { label: 'Jobs', url: /.*\/jobs/ }
    ];

    for (const link of sidebarLinks) {
      await page.click(`aside nav >> text=${link.label}`);
      await expect(page).toHaveURL(link.url);
    }
  });

});
