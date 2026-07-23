/**
 * profileService.js — Mock Profile API layer.
 *
 * Mirrors the shape of a real REST API:
 *   GET  /api/profile       → getProfile()
 *   PUT  /api/profile       → updateProfile(data)
 *
 * The in-memory `profileStore` persists updates within the browser session
 * (survives HMR). To switch to a real backend, replace only the internals
 * of each exported function — all callers remain unchanged.
 */

import dummyProfile from '../data/dummyProfile.js';

// ─── Utility ──────────────────────────────────────────────────────────────────

/** Simulate network latency */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Deep-clone via JSON round-trip (sufficient for plain-data objects) */
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));


// ─── In-memory / LocalStorage store ───────────────────────────────────────────

/**
 * Load initial profile store from localStorage, falling back to dummyProfile.
 */
const loadProfileStore = () => {
  try {
    const stored = localStorage.getItem('elevateu_profile');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed) return parsed;
    }
  } catch (err) {
    console.warn('Failed to load profile store from localStorage:', err);
  }
  return deepClone(dummyProfile);
};

let profileStore = loadProfileStore();


// ─── Exported API functions ───────────────────────────────────────────────────

/**
 * Fetch the current user profile.
 * Returns a deep copy so callers cannot accidentally mutate the store.
 *
 * @returns {Promise<Object>} Profile data shaped like dummyProfile
 */
export async function getProfile() {
  await delay(500);

  // Simulate a 5% random failure rate for QA testing Error States
  if (Math.random() < 0.05) {
    throw new Error('Failed to fetch profile data. Network error.');
  }

  // Refresh profileStore from localStorage if updated in another context
  profileStore = loadProfileStore();

  return deepClone(profileStore);
}


/**
 * Persist updated profile data.
 * Performs a shallow merge at the top level (personal, education, skills, …).
 * Each top-level section from updatedData fully replaces the matching section
 * in the store (arrays are replaced wholesale, not item-patched).
 *
 * @param {Partial<typeof dummyProfile>} updatedData - Sections to overwrite
 * @returns {Promise<{ success: boolean, profile: Object }>}
 */
export async function updateProfile(updatedData) {
  await delay(500);

  // Merge: keep existing sections not present in updatedData
  profileStore = {
    ...profileStore,
    ...updatedData,
    // personal is a nested object — spread one level deeper so partial
    // personal updates don't wipe untouched fields
    personal: {
      ...profileStore.personal,
      ...(updatedData.personal ?? {}),
    },
  };

  try {
    localStorage.setItem('elevateu_profile', JSON.stringify(profileStore));
  } catch (err) {
    console.warn('Failed to save profile store to localStorage:', err);
  }

  return { success: true, profile: deepClone(profileStore) };
}
