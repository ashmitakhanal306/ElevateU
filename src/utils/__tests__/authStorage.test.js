import { describe, it, expect, beforeEach } from 'vitest';
import { saveUserSession, loadUserSession, clearUserSession } from '../authStorage';

describe('authStorage session helpers', () => {
  const mockUser = {
    // Use a valid UUID format to match the shape produced by authStore.login()
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'Jane Doe',
    email: 'jane@example.com',
    initials: 'JD',
  };

  beforeEach(() => {
    localStorage.clear();
  });

  /**
   * Test 1: Verifies saveUserSession serializes user object and writes to localStorage under key 'elevateu_user'.
   * Why it matters: Ensures user credentials/session state persist correctly across page refreshes.
   */
  it('saveUserSession stores the correct JSON string under elevateu_user key', () => {
    saveUserSession(mockUser);
    const storedRaw = localStorage.getItem('elevateu_user');
    expect(storedRaw).not.toBeNull();
    expect(JSON.parse(storedRaw)).toEqual(mockUser);
  });

  /**
   * Test 2: Verifies loadUserSession returns parsed user object when valid data exists in localStorage.
   * Why it matters: Ensures active user session is properly restored when app initializes.
   */
  it('loadUserSession returns parsed user object when valid data exists in localStorage', () => {
    localStorage.setItem('elevateu_user', JSON.stringify(mockUser));
    const result = loadUserSession();
    expect(result).toEqual(mockUser);
  });

  /**
   * Test 3: Verifies loadUserSession returns null when localStorage is empty.
   * Why it matters: Ensures logged-out/guest state is correctly recognized without errors.
   */
  it('loadUserSession returns null when nothing is stored in localStorage', () => {
    const result = loadUserSession();
    expect(result).toBeNull();
  });

  /**
   * Test 4: Verifies loadUserSession handles malformed JSON safely by returning null without crashing.
   * Why it matters: Protects app startup from crashing if localStorage content is corrupted or altered.
   */
  it('loadUserSession returns null (without throwing an unhandled exception) when stored JSON is invalid', () => {
    localStorage.setItem('elevateu_user', 'invalid{json:data');
    let result;
    expect(() => {
      result = loadUserSession();
    }).not.toThrow();
    expect(result).toBeNull();
  });

  /**
   * Test 5: Verifies clearUserSession completely removes the session key from localStorage.
   * Why it matters: Guarantees user logout wipes stored session data completely.
   */
  it('clearUserSession removes the elevateu_user key entirely from localStorage', () => {
    localStorage.setItem('elevateu_user', JSON.stringify(mockUser));
    clearUserSession();
    expect(localStorage.getItem('elevateu_user')).toBeNull();
  });
});
