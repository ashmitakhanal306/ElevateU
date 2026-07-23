/**
 * env.js — Consolidated Configuration Interface
 *
 * Exposes environment variables injected by Vite during build/dev cycles.
 * Standardizes fallbacks so services degrade gracefully if variables are omitted.
 */

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
