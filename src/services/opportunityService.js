/**
 * opportunityService.js — Mock API layer for Courses and Internships/Jobs.
 */

import dummyCourses from '../data/dummyCourses.js';
import dummyOpportunities from '../data/dummyOpportunities.js';
import { getProfile } from './profileService.js';
import { getRecommendations, getSkillGapAnalysis } from './careerService.js';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Returns a list of courses, prioritizing those that teach skills the student lacks.
 */
export async function getCourseRecommendations() {
  await delay(600);

  const profile = await getProfile();
  const profileSkills = profile.skills || [];
  
  // Attempt to get recommended focus areas from their top career match
  let focusSkills = [];
  try {
    const topCareers = await getRecommendations();
    if (topCareers.length > 0) {
      const topCareerGap = await getSkillGapAnalysis(topCareers[0].id);
      focusSkills = topCareerGap.recommendedFocus.map(s => s.toLowerCase());
    }
  } catch (error) {
    console.error("Failed to fetch focus skills for course ranking", error);
  }

  // Score each course
  const scoredCourses = dummyCourses.map(course => {
    let relevance = 'low';
    let score = 0;

    course.skillsTaught.forEach(skill => {
      const skillName = skill.toLowerCase();
      const hasSkill = profileSkills.find(ps => ps.name.toLowerCase() === skillName);
      
      // High relevance if the skill is specifically recommended by gap analysis
      if (focusSkills.includes(skillName)) {
        score += 10;
        relevance = 'high';
      } 
      // Medium relevance if it's a skill they don't have but wasn't explicitly flagged
      else if (!hasSkill) {
        score += 5;
        if (relevance === 'low') relevance = 'medium';
      }
      // Low relevance (score 0) if they already have the skill
    });

    return { ...course, relevance, score };
  });

  // Sort descending by score
  return scoredCourses.sort((a, b) => b.score - a.score);
}

/**
 * Returns a list of jobs/internships ranked by how well the student's skills match the requirements.
 */
export async function getOpportunityRecommendations() {
  await delay(600);

  const profile = await getProfile();
  const profileSkills = profile.skills || [];

  const scoredOpps = dummyOpportunities.map(opp => {
    let matchedCount = 0;

    opp.requiredSkills.forEach(reqSkill => {
      const hasSkill = profileSkills.find(ps => ps.name.toLowerCase() === reqSkill.toLowerCase());
      if (hasSkill) matchedCount++;
    });

    // Simple percentage calculation
    const totalRequired = opp.requiredSkills.length;
    const matchPercent = totalRequired > 0 ? Math.round((matchedCount / totalRequired) * 100) : 100;

    return { ...opp, matchPercent };
  });

  // Sort descending by match percent
  return scoredOpps.sort((a, b) => b.matchPercent - a.matchPercent);
}
