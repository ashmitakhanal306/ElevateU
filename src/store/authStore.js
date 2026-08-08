import { create } from 'zustand';
import { saveUserSession, loadUserSession, clearUserSession } from '../utils/authStorage';
import { logoutSupabase } from '../services/authService';

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
   * Login action: parses user details (including Supabase OAuth metadata),
   * computes user initials, updates state, and persists to authStorage.
   * @param {Object} userData - User object from auth service or Supabase
   */
  login: (userData) => {
    const name =
      userData?.name ||
      userData?.user_metadata?.full_name ||
      userData?.user_metadata?.name ||
      (userData?.email ? userData.email.split('@')[0] : 'User');

    const avatar =
      userData?.avatar ||
      userData?.user_metadata?.avatar_url ||
      userData?.user_metadata?.picture ||
      '';

    const initials = name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';

    const enrichedUser = {
      id: userData?.id,
      name,
      email: userData?.email || '',
      avatar,
      initials,
    };

    saveUserSession(enrichedUser);
    set({ user: enrichedUser, isAuthenticated: true });
  },

  /**
   * Logout action: clears state, removes session from authStorage,
   * and terminates Supabase auth session.
   */
  logout: () => {
    logoutSupabase();
    clearUserSession();
    set({ user: null, isAuthenticated: false });
  },

  /**
   * Update active user details (e.g. name, email) and sync to storage.
   * @param {Object} updatedFields - Fields to update on the user object
   */
  updateUser: (updatedFields) => {
    set((state) => {
      if (!state.user) return {};
      const updatedUser = {
        ...state.user,
        ...updatedFields,
      };

      if (updatedFields.name) {
        const initials = updatedFields.name
          .split(' ')
          .filter(Boolean)
          .map((part) => part[0])
          .join('')
          .toUpperCase()
          .slice(0, 2) || 'U';
        updatedUser.initials = initials;
      }

      saveUserSession(updatedUser);
      return { user: updatedUser };
    });
  },
}));
