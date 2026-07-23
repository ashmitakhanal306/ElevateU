/**
 * assessmentService.js — Mock API layer for Skill Assessments.
 */

import dummyAssessments from '../data/dummyAssessments.js';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock completed state (in a real app, this comes from a database)
const completedAssessments = new Set(['js-basics', 'comm-skills']);

/**
 * Strips sensitive data (answers) from an assessment before sending to client.
 */
const sanitizeAssessment = (assessment) => {
  return {
    ...assessment,
    questions: assessment.questions.map((q) => {
      const { correctIndex, ...rest } = q;
      return rest;
    }),
  };
};

/**
 * Get all available assessments (without answers).
 */
export async function getAssessments() {
  await delay(500);
  return dummyAssessments.map((a) => ({
    ...sanitizeAssessment(a),
    completed: completedAssessments.has(a.id),
  }));
}

/**
 * Get a single assessment by ID (without answers).
 */
export async function getAssessmentById(id) {
  await delay(400);
  const assessment = dummyAssessments.find((a) => a.id === id);
  if (!assessment) throw new Error('Assessment not found');
  
  return {
    ...sanitizeAssessment(assessment),
    completed: completedAssessments.has(id),
  };
}

/**
 * Calculates score, correct count, total questions, skill level, and breakdown
 * for a given assessment and set of answers.
 * Synchronous pure function with no side effects or delay.
 *
 * @param {string} id - Assessment ID
 * @param {Object} answers - Map of questionId -> selected option index (e.g. { q1: 1, q2: 2 })
 * @returns {Object} { score, correctCount, totalQuestions, skillLevel, breakdown }
 */
export function calculateScore(id, answers = {}) {
  const assessment = dummyAssessments.find((a) => a.id === id);
  if (!assessment) throw new Error('Assessment not found');

  let correctCount = 0;
  const breakdown = [];

  assessment.questions.forEach((q) => {
    const isCorrect = answers && answers[q.id] === q.correctIndex;
    if (isCorrect) correctCount++;
    breakdown.push({
      questionId: q.id,
      text: q.text,
      correct: isCorrect,
    });
  });

  const totalQuestions = assessment.questions.length;
  const score = Math.round((correctCount / totalQuestions) * 100);

  let skillLevel = 'Beginner';
  if (score >= 80) {
    skillLevel = 'Advanced';
  } else if (score >= 50) {
    skillLevel = 'Intermediate';
  }

  return {
    score,
    correctCount,
    totalQuestions,
    skillLevel,
    breakdown,
  };
}

/**
 * Submit answers for an assessment and get the score.
 * 
 * @param {string} id - Assessment ID
 * @param {Object} answers - Map of questionId -> selected option index
 */
export async function submitAssessment(id, answers) {
  await delay(700);

  const result = calculateScore(id, answers);

  // Mark as completed
  completedAssessments.add(id);

  return result;
}

