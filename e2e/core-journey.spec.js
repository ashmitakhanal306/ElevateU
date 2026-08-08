import { test, expect } from '@playwright/test';

/**
 * ElevateU Core User Journey E2E Tests
 *
 * Two tests:
 *   1. signup-form — validates the signup form UI and that it shows the email-confirmation
 *      notice (does NOT assert /dashboard redirect since Supabase now requires email confirmation).
 *
 *   2. protected-journey — injects a pre-confirmed mock auth session (via localStorage) to
 *      simulate a fully logged-in user, then exercises every protected page.
 *
 * WHY localStorage injection instead of real Supabase admin pre-confirmation:
 *   - Keeps tests hermetic and fast — no network dependency on Supabase admin API in CI.
 *   - Mirrors how authStore.js restores sessions: it reads from localStorage on boot.
 *   - The signup real-flow is still exercised in Test 1 (form validation, submission, error/success UI).
 */

// ─── Shared mock user — mirrors the shape saved by authStore.login() ─────────
const MOCK_USER = {
  id: 'e1e8a7e0-9b4f-4d32-8418-009876543210',
  name: 'Playwright Test User',
  email: 'playwright.user@elevateu.in',
  avatar: '',
  initials: 'PT',
};

test.describe('ElevateU Core User Journey E2E', () => {

  // Override Math.random so the 5% error-state threshold in services is never hit
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      Math.random = () => 0.5;
    });
  });

  // ── TEST 1: SIGNUP FORM VALIDATION ─────────────────────────────────────────
  test('signup form validates and submits, shows email-confirmation notice', async ({ page }) => {
    // Clear all storage and navigate to /signup
    await page.goto('/signup');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload();
    await expect(page).toHaveURL(/\/signup/);

    // The signup form should be visible
    const nameInput = page.locator('input[type="text"]').first();
    await expect(nameInput).toBeVisible({ timeout: 10000 });

    // Fill in valid signup details with a unique email to avoid duplicate errors
    await nameInput.fill('Playwright Test User');

    const emailInput = page.locator('input[type="email"]').first();
    await emailInput.fill(`pw-test-${Date.now()}@example.com`);

    const passInputs = page.locator('input[type="password"]');
    await passInputs.nth(0).fill('StrongPassword123!');
    await passInputs.nth(1).fill('StrongPassword123!');

    // Submit the form
    await page.getByRole('button', { name: /create account/i }).click();

    // With real Supabase, the app shows an email-confirmation notice instead of
    // redirecting to /dashboard immediately. We allow 3s for the Supabase round-trip.
    await page.waitForTimeout(3000);
    const currentUrl = page.url();
    const isStillOnSignup = /\/signup/.test(currentUrl);
    const isOnDashboard = /\/dashboard/.test(currentUrl);

    // Either outcome is acceptable — the key assertion is no JS crash occurred
    expect(isStillOnSignup || isOnDashboard).toBe(true);

    if (isStillOnSignup) {
      // The confirmation message must be visible on the signup page
      const successMsg = page.getByText(/check your email|confirm|sent|verify/i);
      await expect(successMsg).toBeVisible({ timeout: 8000 });
    }
  });


  // ── TEST 2: FULL PROTECTED JOURNEY (pre-injected mock auth session) ─────────
  test('protected journey: assessment → dashboard stat → career match → profile edit → logout guard', async ({ page }) => {

    // ── SETUP: Inject mock auth session into localStorage ─────────────────────
    // authStore.js reads 'elevateu_user' from localStorage synchronously on module init,
    // so setting it before the first navigation makes the app treat the user as logged in.
    await page.goto('/');
    await page.evaluate((user) => {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem('elevateu_user', JSON.stringify(user));
    }, MOCK_USER);

    // Navigate to /dashboard — should succeed because isAuthenticated will be true
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });

    // Assert greeting shows the injected user's name
    await expect(page.getByText('Playwright Test User')).toBeVisible({ timeout: 10000 });


    // ── STEP 1: TAKE AN ASSESSMENT ────────────────────────────────────────────
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
      const firstOption = page.locator('.space-y-3 button').first();
      await expect(firstOption).toBeVisible();
      await firstOption.click();

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


    // ── STEP 2: VERIFY DASHBOARD REFLECTS COMPLETED ASSESSMENT ────────────────
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/dashboard/);

    // Verify Assessments stat card shows numerical progress (e.g. "1 / 4")
    await expect(page.getByText(/Assessments/i).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/\/ \d+/).first()).toBeVisible({ timeout: 10000 });


    // ── STEP 3: CAREER RECOMMENDATIONS ───────────────────────────────────────
    await page.goto('/career-recommendations');
    await expect(page).toHaveURL(/\/career-recommendations/);

    // Assert at least one career card is visible with a match percentage
    await expect(page.getByRole('heading', { name: 'Career Recommendations' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/%/).first()).toBeVisible({ timeout: 10000 });


    // ── STEP 4: EDIT AND PERSIST PROFILE CHANGE ──────────────────────────────
    await page.goto('/profile');
    await expect(page).toHaveURL(/\/profile/);

    // Wait for skeleton loading to finish
    await expect(page.getByRole('button', { name: /edit profile/i })).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: /edit profile/i }).click();

    // Update the location field to a distinct test value
    const locationInput = page.locator('form input, input[type="text"]').first();
    await locationInput.fill('Playwright Test City');

    // Save profile changes
    await page.getByRole('button', { name: /save changes/i }).click();

    // Assert profile view now shows the updated location
    await expect(page.getByText('Playwright Test City')).toBeVisible({ timeout: 10000 });

    // Reload to confirm localStorage persistence survives a page refresh
    await page.reload();
    await expect(page.getByText('Playwright Test City')).toBeVisible({ timeout: 10000 });


    // ── STEP 5: LOGOUT AND PROTECTED ROUTE GUARD ─────────────────────────────
    await page.getByRole('button', { name: /sign out/i }).click();

    // Assert Navbar triggers redirect to /login
    await expect(page).toHaveURL(/\/login/);

    // Direct navigation to a protected route must be blocked
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });

});

