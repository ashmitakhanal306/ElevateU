import { useAuthStore } from '../store/authStore';

/**
 * Custom hook wrapping Zustand useAuthStore.
 * Selects individual store properties to prevent infinite re-render loops.
 */
export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  return { user, isAuthenticated, login, logout };
};
