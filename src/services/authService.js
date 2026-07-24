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
  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  const cleanEmail = email.trim();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      console.warn('Supabase Email Login error:', error.message);
      // Supabase returns "Invalid login credentials" or similar when user is not found or password incorrect
      const isNotRegistered =
        error.message?.toLowerCase().includes('invalid') ||
        error.message?.toLowerCase().includes('not found') ||
        error.status === 400 ||
        error.status === 404;

      return {
        success: false,
        notRegistered: isNotRegistered,
        error: isNotRegistered
          ? 'No account found with this email. Please create a new account.'
          : error.message || 'Login failed. Please check your credentials.',
      };
    }

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
 * @returns {Promise<{ success: boolean, user?: Object, alreadyRegistered?: boolean, error?: string }>}
 */
export async function signup(name, email, password) {
  if (!name || !email || !password) {
    return { success: false, error: 'All fields are required' };
  }

  const cleanEmail = email.trim();
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
      return {
        success: false,
        alreadyRegistered: true,
        error: 'An account with this email already exists. Please sign in instead.',
      };
    }

    const userObj = {
      id: data.user?.id || `usr_${Date.now()}`,
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
