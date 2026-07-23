import { create } from 'zustand';
import { saveUserSession, loadUserSession, clearUserSession } from '../utils/authStorage';

// TEMPORARY: this persists a dummy user object for development convenience only. Once a real backend issues actual session/JWT tokens, this MUST be replaced with httpOnly, secure cookies managed by the backend — never store real auth tokens in localStorage, as they become readable by any injected script (XSS risk). This comment is a required checkpoint before production launch.

/**
 * Module-level synchronous store initialization:
 * Runs once when the module is imported, restoring session state
 * BEFORE the first React render to prevent login/logout state flash.
 */
const initialUser = loadUserSession();

export const useAuthStore = create((set) => ({
  user: initialUser || null,
  isAuthenticated: !!initialUser,

  /**
   * Login action: computes user initials, updates state, and persists to authStorage.
   * @param {Object} userData - User object from auth service
   */
  login: (userData) => {
    const name = userData?.name || 'User';
    const initials = name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const enrichedUser = {
      id: userData?.id,
      name,
      email: userData?.email || '',
      initials,
    };

    saveUserSession(enrichedUser);
    set({ user: enrichedUser, isAuthenticated: true });
  },

  /**
   * Logout action: clears state and removes session from authStorage.
   */
  logout: () => {
    clearUserSession();
    set({ user: null, isAuthenticated: false });
  },
}));
