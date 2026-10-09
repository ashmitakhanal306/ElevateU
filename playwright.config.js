import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for ElevateU end-to-end tests.
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false, // Run core journey sequentially
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    headless: true,
  },
  projects: [
    {
      name: 'desktop-light',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        colorScheme: 'light',
      },
    },
    {
      name: 'desktop-dark',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        colorScheme: 'dark',
      },
    },
    {
      name: 'mobile-light',
      use: { 
        viewport: { width: 375, height: 667 },
        colorScheme: 'light',
        isMobile: true,
      },
    },
    {
      name: 'mobile-dark',
      use: { 
        viewport: { width: 375, height: 667 },
        colorScheme: 'dark',
        isMobile: true,
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
