import { create } from 'zustand';

/**
 * Module-level theme initialization:
 * Runs immediately at module import time before React renders,
 * applying initial theme class to <html> element to avoid visual flash.
 */
const initialTheme = 'light';
if (typeof document !== 'undefined') {
  document.documentElement.classList.toggle('dark', initialTheme === 'dark');
}

export const useThemeStore = create((set) => ({
  theme: initialTheme,

  /**
   * Toggle theme action:
   * Flips theme between 'light' and 'dark', directly updating document element class.
   */
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
      return { theme: newTheme };
    });
  },
}));
