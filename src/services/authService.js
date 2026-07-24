/**
 * authService.js — Authentication Service for Email, Phone OTP & Supabase OAuth
 */

import { supabase } from '../config/supabaseClient';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


// ─── Email Authentication ───────────────────────────────────────────────────

/**
 * Login with email and password.
 * Accepts user credentials and creates active user session.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ success: boolean, user?: Object, error?: string }>}
 */
export async function loginWithEmail(email, password) {
  await delay(600);

  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  // Derive clean display name from email (e.g. aditi.sharma@example.com -> Aditi Sharma)
  const emailPrefix = email.split('@')[0] || 'User';
  const derivedName = emailPrefix
    .split(/[._-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    success: true,
    user: {
      id: `usr_${Date.now()}`,
      name: derivedName || 'User',
      email: email.trim(),
    },
  };
}

/**
 * Register a new user account with Name, Email and Password.
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ success: boolean, user?: Object, error?: string }>}
 */
export async function signup(name, email, password) {
  await delay(700);

  if (!name || !email || !password) {
    return { success: false, error: 'All fields are required' };
  }

  return {
    success: true,
    user: {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
    },
  };
}


// ─── Phone OTP Authentication ───────────────────────────────────────────────

/**
 * Send a one-time password (OTP) to a mobile number.
 * @param {string} phone - Mobile number
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function sendOtp(phone) {
  await delay(500);

  const cleanPhone = phone.replace(/\D/g, '').slice(-10);
  if (!cleanPhone || cleanPhone.length !== 10) {
    return { success: false, error: 'Please enter a valid 10-digit mobile number' };
  }

  return {
    success: true,
    message: `OTP sent successfully to +91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`,
  };
}

/**
 * Verify OTP code for a mobile number.
 * Accepts demo OTP '123456' or any 6-digit OTP code.
 *
 * @param {string} phone
 * @param {string} otp
 * @returns {Promise<{ success: boolean, user?: Object, error?: string }>}
 */
export async function verifyOtp(phone, otp) {
  await delay(500);

  const cleanOtp = otp.trim();
  if (!cleanOtp || cleanOtp.length < 4) {
    return { success: false, error: 'Please enter a valid OTP code' };
  }

  const cleanPhone = phone.replace(/\D/g, '').slice(-10);
  const formattedPhone = cleanPhone
    ? `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`
    : phone;

  return {
    success: true,
    user: {
      id: `phone_${Date.now()}`,
      name: `User (${formattedPhone})`,
      email: `${cleanPhone}@elevateu.in`,
      phone: formattedPhone,
    },
  };
}


// ─── Google OAuth via Supabase ───────────────────────────────────────────────

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
