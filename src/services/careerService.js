/**
 * careerService.js — Mock API layer for the Career Recommendation Engine.
 */

import dummyCareers from '../data/dummyCareers.js';
import { getProfile } from './profileService.js';
import { getAssessments } from './assessmentService.js';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Helper to compare proficiency levels.
 * Returns true if studentLevel >= requiredLevel.
 */
function isLevelMet(studentLevel, requiredLevel) {
  const levels = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
  const s = levels[studentLevel] || 0;
  const r = levels[requiredLevel] || 0;
  return s >= r;
}

/**
 * Calculates a match percentage for a specific career based on the student's profile.
 * 
 * SCORING ALGORITHM (Mock):
 * - +15 for each overlapping interest
 * - +10 for each skill the student has at or above the required level
 * - Minimum floor of 30%
 * - Capped at 100%
 * 
 * Note: A real backend would use an ML model or more complex weighting here.
 */
function calculateMatchScore(career, profileInterests, profileSkills) {
  let score = 0;

  // 1. Score Interests (+15 each)
  const interestsMatch = career.matchingInterests.filter(interest => 
    profileInterests.includes(interest)
  );
  score += interestsMatch.length * 15;

  // 2. Score Skills (+10 each if level is met)
  career.requiredSkills.forEach(reqSkill => {
    // Find if the student has this skill
    const studentSkill = profileSkills.find(s => 
      s.name.toLowerCase() === reqSkill.name.toLowerCase()
    );

    if (studentSkill && isLevelMet(studentSkill.level, reqSkill.level)) {
      score += 10;
    }
  });

  // Apply floor and ceiling
  return Math.max(30, Math.min(100, score));
}

/**
 * Fetch a ranked list of recommended careers for the current user.
 */
export async function getRecommendations() {
  await delay(700);
  
  const profile = await getProfile();
  // In a real app, we might also parse completed assessments here to boost scores,
  // but for this mock, we rely directly on the profile skills.
  // const assessments = await getAssessments();
  
  const interests = profile.interests || [];
  const skills = profile.skills || [];

  const recommendations = dummyCareers.map(career => {
    const matchPercent = calculateMatchScore(career, interests, skills);
    return {
      ...career,
      matchPercent
    };
  });

  // Sort descending by match percent
  recommendations.sort((a, b) => b.matchPercent - a.matchPercent);

  return recommendations;
}

/**
 * Fetch detailed information for a specific career, including a skill gap analysis.
 */
export async function getCareerDetail(id) {
  await delay(400);

  const career = dummyCareers.find(c => c.id === id);
  if (!career) throw new Error('Career not found');

  const profile = await getProfile();
  const interests = profile.interests || [];
  const profileSkills = profile.skills || [];

  const matchPercent = calculateMatchScore(career, interests, profileSkills);

  // Perform a simple skill gap analysis
  const matchedSkills = [];
  const missingSkills = [];

  career.requiredSkills.forEach(reqSkill => {
    const studentSkill = profileSkills.find(s => 
      s.name.toLowerCase() === reqSkill.name.toLowerCase()
    );

    if (studentSkill && isLevelMet(studentSkill.level, reqSkill.level)) {
      matchedSkills.push(reqSkill);
    } else {
      missingSkills.push(reqSkill);
    }
  });

  return {
    ...career,
    matchPercent,
    matchedSkills,
    missingSkills
  };
}

/**
 * Perform a detailed skill gap analysis for a specific career path.
 * Maps current skills to required skills with a scoring system.
 */
export async function getSkillGapAnalysis(careerId) {
  await delay(500);

  const career = dummyCareers.find(c => c.id === careerId);
  if (!career) throw new Error('Career not found');

  const profile = await getProfile();
  const profileSkills = profile.skills || [];

  const levelScores = { 'Beginner': 33, 'Intermediate': 66, 'Advanced': 100 };

  const skillComparison = career.requiredSkills.map(reqSkill => {
    const studentSkill = profileSkills.find(s => 
      s.name.toLowerCase() === reqSkill.name.toLowerCase()
    );

    const currentLevel = studentSkill ? studentSkill.level : 'None';
    const currentScore = studentSkill ? (levelScores[studentSkill.level] || 0) : 0;
    const requiredScore = levelScores[reqSkill.level] || 0;
    
    // Gap is zero if student meets or exceeds requirement
    const gap = Math.max(0, requiredScore - currentScore);

    return {
      skill: reqSkill.name,
      currentLevel,
      requiredLevel: reqSkill.level,
      currentScore,
      requiredScore,
      gap
    };
  });

  // Overall readiness: weighted average of coverage
  const totalRequired = skillComparison.reduce((sum, s) => sum + s.requiredScore, 0);
  const totalCovered = skillComparison.reduce((sum, s) => sum + Math.min(s.currentScore, s.requiredScore), 0);
  const overallReadiness = totalRequired > 0 ? Math.round((totalCovered / totalRequired) * 100) : 100;

  // Focus areas: sort by gap descending, take top 3 with a gap > 0
  const recommendedFocus = skillComparison
    .filter(s => s.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 3)
    .map(s => s.skill);

  return {
    careerTitle: career.title,
    overallReadiness,
    skillComparison,
    recommendedFocus
  };
}

