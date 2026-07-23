import { useThemeStore } from '../store/themeStore';

/**
 * Custom hook wrapping Zustand useThemeStore.
 * Selects individual store properties to prevent infinite re-render loops.
 */
export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return { theme, toggleTheme };
};
