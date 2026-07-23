/**
 * dashboardService.js — Mock Dashboard API layer.
 *
 * Mirrors:  GET /api/dashboard
 *
 * Replace only the body of getDashboardData() when connecting to a real backend.
 * All callers (Dashboard.jsx etc.) remain unchanged.
 */

import dummyDashboard from '../data/dummyDashboard.js';

/** Simulate network round-trip latency */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch the current user's dashboard summary data.
 * Returns a deep copy so callers cannot mutate the seed data.
 *
 * @returns {Promise<typeof dummyDashboard>}
 */
export async function getDashboardData() {
  await delay(600);
  
  // Simulate a 5% random failure rate for QA testing Error States
  if (Math.random() < 0.05) {
    throw new Error('Failed to fetch dashboard data. Server responded with 500.');
  }

  // JSON round-trip = cheap deep clone for plain data objects
  return JSON.parse(JSON.stringify(dummyDashboard));
}
