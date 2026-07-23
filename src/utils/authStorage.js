/**
 * authStorage.js — Utility helpers for managing dummy user session in localStorage.
 *
 * NOTE: For production, real session tokens MUST be stored in httpOnly cookies.
 * This localStorage helper is used for local mock persistence only.
 */

const STORAGE_KEY = 'elevateu_user';

/**
 * Saves the user object to localStorage as a JSON string.
 * @param {Object} user - User session object
 */
export function saveUserSession(user) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (err) {
    console.warn('Failed to save user session to localStorage:', err);
  }
}

/**
 * Reads and parses the user object from localStorage.
 * Returns null if missing or if JSON parsing fails.
 * @returns {Object|null} User object or null
 */
export function loadUserSession() {
  try {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (!storedUser) return null;
    const parsed = JSON.parse(storedUser);
    return parsed || null;
  } catch (err) {
    console.warn('Failed to restore auth session from localStorage:', err);
    return null;
  }
}

/**
 * Clears the user session key from localStorage.
 */
export function clearUserSession() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear user session from localStorage:', err);
  }
}
