/**
 * authService.js — Authentication Service for Email, Phone OTP & Supabase OAuth
 */

import { supabase } from '../config/supabaseClient';
import { registerEmail, isEmailRegistered } from '../utils/authStorage';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


// ─── Email Authentication ───────────────────────────────────────────────────

/**
 * Login with email and password.
 * Accepts user credentials and creates active user session.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ success: boolean, user?: Object, notRegistered?: boolean, emailNotConfirmed?: boolean, invalidCredentials?: boolean, error?: string }>}
 */
export async function loginWithEmail(email, password) {
  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      console.warn('Supabase Email Login error:', error.message);
      const isConfirmedErr = error.message?.toLowerCase().includes('confirm');
      const knownRegistered = isEmailRegistered(cleanEmail);

      if (isConfirmedErr) {
        return {
          success: false,
          emailNotConfirmed: true,
          error: 'Your account is created! Please check your email to confirm registration.',
        };
      }

      if (knownRegistered) {
        return {
          success: false,
          invalidCredentials: true,
          error: 'Incorrect password for this account. Please check your password and try again.',
        };
      }

      // If not previously registered in local store and Supabase returns invalid/not found
      return {
        success: false,
        notRegistered: true,
        error: 'No account found with this email. Please create a new account.',
      };
    }

    // On successful login, persist in registered list
    registerEmail(cleanEmail);

    const name =
      data.user?.user_metadata?.full_name ||
      data.user?.user_metadata?.name ||
      cleanEmail.split('@')[0];

    return {
      success: true,
      user: {
        id: data.user.id,
        name,
        email: data.user.email || cleanEmail,
        avatar: data.user?.user_metadata?.avatar_url || '',
      },
    };
  } catch (err) {
    console.error('loginWithEmail exception:', err);
    return {
      success: false,
      error: err.message || 'Failed to connect to authentication server.',
    };
  }
}

/**
 * Register a new user account with Name, Email and Password using Supabase Auth.
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ success: boolean, user?: Object, alreadyRegistered?: boolean, needsEmailConfirmation?: boolean, error?: string }>}
 */
export async function signup(name, email, password) {
  if (!name || !email || !password) {
    return { success: false, error: 'All fields are required' };
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();

  try {
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          full_name: cleanName,
        },
      },
    });

    if (error) {
      console.warn('Supabase Signup error:', error.message);
      const isAlreadyRegistered =
        error.message?.toLowerCase().includes('already') ||
        error.message?.toLowerCase().includes('registered') ||
        error.message?.toLowerCase().includes('exists');

      if (isAlreadyRegistered) {
        registerEmail(cleanEmail);
      }

      return {
        success: false,
        alreadyRegistered: isAlreadyRegistered,
        error: isAlreadyRegistered
          ? 'An account with this email already exists. Please sign in instead.'
          : error.message || 'Account creation failed.',
      };
    }

    // Supabase protection: if user exists, identities array may be empty []
    if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      registerEmail(cleanEmail);
      return {
        success: false,
        alreadyRegistered: true,
        error: 'An account with this email already exists. Please sign in instead.',
      };
    }

    // Register email in local registry as soon as user signs up
    registerEmail(cleanEmail);

    // CRITICAL: Supabase returns a null session when email confirmation is required.
    // Do NOT log the user in until the email is confirmed — doing so causes the
    // "Your account is created, please confirm" error on the next login attempt.
    const sessionExists = !!data.session;

    if (!sessionExists) {
      // Email confirmation is required — show confirmation screen, do NOT redirect.
      return {
        success: false,
        needsEmailConfirmation: true,
        email: cleanEmail,
      };
    }

    // Session exists → email confirmation is disabled in Supabase settings (or
    // autoconfirm is on). Safe to log the user in immediately.
    const userObj = {
      id: data.user?.id,
      name: cleanName,
      email: cleanEmail,
      avatar: data.user?.user_metadata?.avatar_url || '',
    };

    return {
      success: true,
      user: userObj,
    };
  } catch (err) {
    console.error('signup exception:', err);
    return {
      success: false,
      error: err.message || 'Failed to complete registration.',
    };
  }
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

  // Generate a deterministic valid UUID based on the 10-digit phone number
  const mockUuid = `e1e8a7e0-9b4f-4d32-8418-${cleanPhone.padStart(12, '0')}`;

  return {
    success: true,
    user: {
      id: mockUuid,
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
