/**
 * authService.js — Authentication API Layer with Supabase Integration
 */

import { supabase } from '../config/supabaseClient';

/**
 * Wraps setTimeout in a Promise to simulate network latency.
 * @param {number} ms - Delay in milliseconds
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


// ─── Auth Functions ───────────────────────────────────────────────────────────

/**
 * Login with email and password.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ success: boolean, user?: Object, error?: string }>}
 */
export async function loginWithEmail(email, password) {
  await delay(800);

  // Basic guard
  if (!email || !password) {
    return { success: false, error: 'Invalid credentials' };
  }

  return {
    success: true,
    user: { id: '1', name: 'Aditi Sharma', email },
  };
}


/**
 * Login with Google OAuth via Supabase.
 * Initiates the Google OAuth redirect flow.
 *
 * @returns {Promise<{ success: boolean, data?: Object, error?: string }>}
 */
export async function loginWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) {
      console.error('Supabase Google OAuth Error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Google OAuth Exception:', err);
    return { success: false, error: err.message || 'Failed to initiate Google authentication.' };
  }
}


/**
 * Get current active Supabase session.
 * @returns {Promise<Object|null>}
 */
export async function getSupabaseSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting Supabase session:', error);
    return null;
  }
  return session;
}


/**
 * Subscribe to Supabase auth state changes.
 * @param {Function} callback
 * @returns {{ data: { subscription: Object } }}
 */
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
}


/**
 * Sign out from Supabase session.
 */
export async function logoutSupabase() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Supabase SignOut error:', error);
  }
}


/**
 * Send a one-time password to a phone number.
 * @param {string} phone
 * @returns {Promise<{ success: boolean }>}
 */
export async function sendOtp(phone) {
  await delay(500);
  return { success: true };
}


/**
 * Verify an OTP code for the given phone number.
 * @param {string} phone
 * @param {string} otp
 * @returns {Promise<{ success: boolean, user?: Object, error?: string }>}
 */
export async function verifyOtp(phone, otp) {
  await delay(500);

  if (otp !== '123456') {
    return { success: false, error: 'Invalid OTP' };
  }

  return {
    success: true,
    user: { id: '4', name: 'Phone User', email: `${phone}@otp.auth` },
  };
}


/**
 * Register a new user account.
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ success: boolean, user?: Object }>}
 */
export async function signup(name, email, password) {
  await delay(800);

  return {
    success: true,
    user: { id: '3', name, email },
  };
}
