/**
 * authService.js — Mock Authentication API Layer
 *
 * All functions mirror the signature of real API calls:
 *   async fn(...args) → { success: boolean, user?: Object, error?: string }
 *
 * To switch to a real backend, replace only the body of each function.
 * The rest of the app (Login.jsx, Signup.jsx, etc.) needs no changes.
 */

// ─── Helper ───────────────────────────────────────────────────────────────────

/**
 * Wraps setTimeout in a Promise to simulate network latency.
 * @param {number} ms - Delay in milliseconds
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


// ─── Auth Functions ───────────────────────────────────────────────────────────

/**
 * Login with email and password.
 * Simulates an 800ms network round-trip.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ success: boolean, user?: Object, error?: string }>}
 */
export async function loginWithEmail(email, password) {
  await delay(800);

  // Basic guard — real API would validate credentials server-side
  if (!email || !password) {
    return { success: false, error: 'Invalid credentials' };
  }

  return {
    success: true,
    user: { id: '1', name: 'Aditi Sharma', email },
  };
}


/**
 * Login with Google OAuth (simulated).
 * Simulates a 600ms redirect + token exchange.
 *
 * @returns {Promise<{ success: boolean, user?: Object }>}
 */
export async function loginWithGoogle() {
  await delay(600);

  return {
    success: true,
    user: { id: '2', name: 'Google User', email: 'user@gmail.com' },
  };
}


/**
 * Send a one-time password to a phone number.
 * Simulates a 500ms SMS dispatch.
 *
 * @param {string} phone - Phone number to send OTP to
 * @returns {Promise<{ success: boolean }>}
 */
export async function sendOtp(phone) {
  await delay(500);

  // In production this would trigger an SMS gateway call
  return { success: true };
}


/**
 * Verify an OTP code for the given phone number.
 * Simulates a 500ms server-side check.
 * Demo shortcut: OTP must be '123456'.
 *
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
 * Simulates an 800ms server write + response.
 *
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
