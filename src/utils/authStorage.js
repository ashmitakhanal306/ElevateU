/**
 * authStorage.js — Utility helpers for persisting the enriched Supabase auth session
 * in localStorage between page loads.
 *
 * NOTE: This stores only the normalized user object (id, name, email, initials, avatar)
 * — NOT the raw JWT or refresh token. Those are managed by @supabase/supabase-js internally.
 * For production hardening, consider storing only the user ID here and re-fetching from Supabase.
 */

const STORAGE_KEY = 'elevateu_user';
const REGISTERED_EMAILS_KEY = 'elevateu_registered_emails';

/**
 * Saves the user object to localStorage as a JSON string.
 * @param {Object} user - User session object
 */
export function saveUserSession(user) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    if (user?.email) {
      registerEmail(user.email);
    }
  } catch (err) {
    console.warn('Failed to save user session to localStorage:', err);
  }
}

/**
 * Registers an email address in local persistence registry.
 * @param {string} email
 */
export function registerEmail(email) {
  if (!email) return;
  try {
    const clean = email.trim().toLowerCase();
    const existing = JSON.parse(localStorage.getItem(REGISTERED_EMAILS_KEY) || '[]');
    if (!existing.includes(clean)) {
      existing.push(clean);
      localStorage.setItem(REGISTERED_EMAILS_KEY, JSON.stringify(existing));
    }
  } catch (err) {
    console.warn('Failed to register email in localStorage:', err);
  }
}

/**
 * Checks if an email address is registered in local persistence registry.
 * @param {string} email
 * @returns {boolean}
 */
export function isEmailRegistered(email) {
  if (!email) return false;
  try {
    const clean = email.trim().toLowerCase();
    const existing = JSON.parse(localStorage.getItem(REGISTERED_EMAILS_KEY) || '[]');
    return existing.includes(clean);
  } catch (err) {
    return false;
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
