import dummyAssessments from '../data/dummyAssessments.js';
import { useAuthStore } from '../store/authStore';
import { logUserActivity } from '../utils/activityLogger';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getCompletedKey = () => {
  const user = useAuthStore.getState().user;
  return user ? `elevateu_completed_assessments_${user.id}` : 'elevateu_completed_assessments';
};

const getScoresKey = () => {
  const user = useAuthStore.getState().user;
  return user ? `elevateu_assessment_scores_${user.id}` : 'elevateu_assessment_scores';
};

export function getCompletedAssessments() {
  const user = useAuthStore.getState().user;
  try {
    const key = getCompletedKey();
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return new Set(parsed);
    }
  } catch (err) {
    console.warn('Failed to load completed assessments:', err);
  }
  if (user) {
    return new Set();
  }
  return new Set(['js-basics', 'comm-skills']);
}

export function getAssessmentScores() {
  const user = useAuthStore.getState().user;
  try {
    const key = getScoresKey();
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed) return parsed;
    }
  } catch (err) {
    console.warn('Failed to load assessment scores:', err);
  }
  if (user) {
    return {};
  }
  return { 'js-basics': 83, 'comm-skills': 75 };
}

export function saveCompletedAssessments(completedSet) {
  try {
    const key = getCompletedKey();
    localStorage.setItem(key, JSON.stringify(Array.from(completedSet)));
  } catch (err) {
    console.warn('Failed to save completed assessments:', err);
  }
}

export function saveAssessmentScores(scoresObj) {
  try {
    const key = getScoresKey();
    localStorage.setItem(key, JSON.stringify(scoresObj));
  } catch (err) {
    console.warn('Failed to save assessment scores:', err);
  }
}

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
  const completed = getCompletedAssessments();
  return dummyAssessments.map((a) => ({
    ...sanitizeAssessment(a),
    completed: completed.has(a.id),
  }));
}

/**
 * Get a single assessment by ID (without answers).
 */
export async function getAssessmentById(id) {
  await delay(400);
  const assessment = dummyAssessments.find((a) => a.id === id);
  if (!assessment) throw new Error('Assessment not found');
  
  const completed = getCompletedAssessments();
  return {
    ...sanitizeAssessment(assessment),
    completed: completed.has(id),
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
  const completed = getCompletedAssessments();
  completed.add(id);
  saveCompletedAssessments(completed);

  const scores = getAssessmentScores();
  scores[id] = result.score;
  saveAssessmentScores(scores);

  // Log activity
  const user = useAuthStore.getState().user;
  const assessment = dummyAssessments.find((a) => a.id === id);
  if (user && assessment) {
    logUserActivity(user.id, 'assessment', `Completed "${assessment.title}" quiz`);
  }

  return result;
}

