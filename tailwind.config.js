/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Colors mapping to CSS variables in index.css (supporting light/dark mode)
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        border: 'var(--color-border)',
        'bg-page': 'var(--color-bg-page)',
        'bg-surface': 'var(--color-bg-surface)',
        'header-bg': 'var(--color-header-bg)',
      },
      // z-45 is used by the Sidebar mobile backdrop (sits between Navbar z-40 and Sidebar panel z-50)
      zIndex: {
        45: '45',
      },
    },
  },
  plugins: [],
}

