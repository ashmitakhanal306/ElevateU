import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Dynamic base URL: '/ElevateU/' for GitHub Actions workflow deployment, '/' for Vercel and local dev
  base: process.env.GITHUB_ACTIONS ? '/ElevateU/' : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    exclude: ['**/e2e/**', '**/node_modules/**'],
  },
})
