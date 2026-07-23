import { test, expect } from '@playwright/test';

test.describe('ElevateU Core User Journey E2E', () => {

  /**
   * Test Isolation:
   * Set Math.random override via addInitScript.
   */
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      Math.random = () => 0.5;
    });
  });

  test('completes full user journey: signup -> assessment -> dashboard stat -> career match -> profile edit persistence -> logout guard', async ({ page }) => {
    
    // ── STEP 1: SIGNUP ────────────────────────────────────────────────────────
    // Visit /signup, clear storage, reload
    await page.goto('/signup');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload();
    await expect(page).toHaveURL(/\/signup/);

    // Fill signup form inputs using native input type selectors
    const nameInput = page.locator('input[type="text"]').first();
    await expect(nameInput).toBeVisible({ timeout: 10000 });
    await nameInput.fill('Playwright Test User');

    const emailInput = page.locator('input[type="email"]').first();
    await emailInput.fill('playwright.user@example.com');

    const passInputs = page.locator('input[type="password"]');
    await passInputs.nth(0).fill('StrongPassword123!');
    await passInputs.nth(1).fill('StrongPassword123!');

    // Submit form
    await page.getByRole('button', { name: /create account/i }).click();

    // Assert redirection to dashboard
    await expect(page).toHaveURL(/\/dashboard/);

    // Assert dashboard shows personalized greeting containing the name (auto-waits for skeleton to finish)
    await expect(page.getByText('Playwright Test User')).toBeVisible({ timeout: 10000 });


    // ── STEP 2: TAKE AN ASSESSMENT ────────────────────────────────────────────
    // Navigate to Skill Assessment page
    await page.goto('/assessment');
    await expect(page).toHaveURL(/\/assessment/);

    // Assert assessment card is visible after skeleton loading
    const startButton = page.getByRole('button', { name: /start assessment|retake/i }).first();
    await expect(startButton).toBeVisible({ timeout: 10000 });
    await startButton.click();

    // Verify question runner loads on first question
    await expect(page.getByText(/question 1 of/i)).toBeVisible({ timeout: 10000 });

    // Loop through all questions in the assessment
    let isQuizComplete = false;
    while (!isQuizComplete) {
      // Select the first option for the current question
      const firstOption = page.locator('.space-y-3 button').first();
      await expect(firstOption).toBeVisible();
      await firstOption.click();

      // Check if Submit button is active (final question) or Next button is present
      const submitBtn = page.getByRole('button', { name: /^submit$/i });
      const isSubmitVisible = await submitBtn.isVisible();

      if (isSubmitVisible) {
        await submitBtn.click();
        isQuizComplete = true;
      } else {
        const nextBtn = page.getByRole('button', { name: /^next$/i });
        await expect(nextBtn).toBeEnabled();
        await nextBtn.click();
      }
    }

    // Assert redirection to results page & score percentage display
    await expect(page).toHaveURL(/\/results/, { timeout: 10000 });
    await expect(page.getByText(/%/).first()).toBeVisible({ timeout: 10000 });


    // ── STEP 3: VERIFY DASHBOARD REFLECTS COMPLETED ASSESSMENT ────────────────
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/dashboard/);

    // Verify Assessments stat card is rendered with numerical progress after loading
    await expect(page.getByText(/Assessments/i).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/\/ \d+/).first()).toBeVisible({ timeout: 10000 });


    // ── STEP 4: CAREER RECOMMENDATIONS UNLOCK ─────────────────────────────────
    await page.goto('/career-recommendations');
    await expect(page).toHaveURL(/\/career-recommendations/);

    // Assert at least one career card is visible with match percentage after loading
    await expect(page.getByRole('heading', { name: 'Career Recommendations' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/%/).first()).toBeVisible({ timeout: 10000 });


    // ── STEP 5: EDIT AND PERSIST PROFILE CHANGE ───────────────────────────────
    await page.goto('/profile');
    await expect(page).toHaveURL(/\/profile/);

    // Wait for profile view to finish skeleton loading
    await expect(page.getByRole('button', { name: /edit profile/i })).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: /edit profile/i }).click();

    // Update location field to distinct test value
    const locationInput = page.locator('form input, input[type="text"]').first();
    await locationInput.fill('Playwright Test City');

    // Save profile changes
    await page.getByRole('button', { name: /save changes/i }).click();

    // Assert profile view displays updated location
    await expect(page.getByText('Playwright Test City')).toBeVisible({ timeout: 10000 });

    // Reload page entirely to verify persistence in mock store across page loads
    await page.reload();
    await expect(page.getByText('Playwright Test City')).toBeVisible({ timeout: 10000 });


    // ── STEP 6: LOGOUT AND PROTECTED ROUTE GUARD ──────────────────────────────
    // Click Sign Out from Navbar
    await page.getByRole('button', { name: /sign out/i }).click();

    // Assert redirection to /login
    await expect(page).toHaveURL(/\/login/);

    // Attempt direct navigation to protected route /dashboard
    await page.goto('/dashboard');

    // Assert protected route guard redirects back to /login
    await expect(page).toHaveURL(/\/login/);
  });

});
