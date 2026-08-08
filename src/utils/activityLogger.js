/**
 * activityLogger.js — Utility helper to manage user activity feeds in localStorage.
 */

/**
 * Log a new activity for a specific user.
 * @param {string} userId - User ID
 * @param {'assessment'|'course'|'resume'} type - Type of activity
 * @param {string} label - Description of the activity
 */
export function logUserActivity(userId, type, label) {
  if (!userId) return;
  try {
    const key = `elevateu_activity_${userId}`;
    const stored = localStorage.getItem(key);
    let activities = [];
    if (stored) {
      activities = JSON.parse(stored);
    }
    
    // Add new activity at the top
    activities.unshift({
      type,
      label,
      time: 'Just now'
    });
    
    // Limit to 5 items
    const trimmed = activities.slice(0, 5);
    localStorage.setItem(key, JSON.stringify(trimmed));
  } catch (err) {
    console.warn('Failed to log user activity:', err);
  }
}

/**
 * Fetch the activity feed for a user.
 * @param {string} userId
 * @returns {Array} List of activities
 */
export function getUserActivities(userId) {
  if (!userId) return [];
  try {
    const key = `elevateu_activity_${userId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.warn('Failed to load user activities:', err);
  }
  
  // Return default welcome activity if none exists
  return [
    {
      type: 'resume',
      label: 'Created account & started career journey',
      time: 'Just now'
    }
  ];
}
