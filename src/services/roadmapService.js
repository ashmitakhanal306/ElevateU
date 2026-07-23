/**
 * roadmapService.js — Mock API layer for the Personalized Learning Roadmap.
 */

import dummyRoadmap from '../data/dummyRoadmap.js';

// We keep an in-memory copy so we can simulate toggling steps during the session.
let roadmapData = JSON.parse(JSON.stringify(dummyRoadmap));

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Recalculates the status of a milestone based on its steps.
 */
function recalculateMilestoneStatus(milestone) {
  const totalSteps = milestone.steps.length;
  if (totalSteps === 0) return 'upcoming';

  const doneSteps = milestone.steps.filter(s => s.done).length;

  if (doneSteps === 0) return 'upcoming';
  if (doneSteps === totalSteps) return 'completed';
  return 'in-progress';
}

/**
 * Fetches the user's roadmap.
 */
export async function getRoadmap() {
  await delay(600);
  // Re-calculate statuses just in case they are out of sync in the seed data
  roadmapData.milestones.forEach(m => {
    m.status = recalculateMilestoneStatus(m);
  });
  return JSON.parse(JSON.stringify(roadmapData));
}

/**
 * Toggles a specific step within a milestone.
 * 
 * @param {string} milestoneId 
 * @param {string} stepId 
 * @returns {Promise<Object>} The updated milestone object.
 */
export async function toggleStep(milestoneId, stepId) {
  await delay(300);

  const milestone = roadmapData.milestones.find(m => m.id === milestoneId);
  if (!milestone) throw new Error('Milestone not found');

  const step = milestone.steps.find(s => s.id === stepId);
  if (!step) throw new Error('Step not found');

  // Toggle step
  step.done = !step.done;

  // Recalculate parent milestone status
  milestone.status = recalculateMilestoneStatus(milestone);

  return JSON.parse(JSON.stringify(milestone));
}

/**
 * Calculates overall progress based on the percentage of completed steps across all milestones.
 * 
 * @returns {Promise<number>} Progress percentage (0-100)
 */
export async function getOverallProgress() {
  await delay(300);

  let totalSteps = 0;
  let doneSteps = 0;

  roadmapData.milestones.forEach(m => {
    m.steps.forEach(s => {
      totalSteps++;
      if (s.done) doneSteps++;
    });
  });

  if (totalSteps === 0) return 0;
  return Math.round((doneSteps / totalSteps) * 100);
}
