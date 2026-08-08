import dummyCareers from '../data/dummyCareers.js';
import { getProfile } from './profileService.js';
import { getAssessments } from './assessmentService.js';
import { supabase } from '../config/supabaseClient';
import { computeRoadmapProgress } from './roadmapService';
import { useAuthStore } from '../store/authStore';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isUuid = (id) => typeof id === 'string' && UUID_REGEX.test(id);


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

  // Apply ceiling (no floor)
  return Math.min(100, score);
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
export async function getSkillGapAnalysis(roadmapId) {
  await delay(500);

  // 1. Fetch current user from authStore
  const user = useAuthStore.getState().user;
  if (!user) throw new Error('User not authenticated');

  // 2. Fetch the roadmap from database
  const { data: roadmap, error: rmErr } = await supabase
    .from('roadmaps')
    .select('id, title, category')
    .eq('id', roadmapId)
    .single();

  // Fallback to static dummy career lookup if not in DB
  if (rmErr || !roadmap) {
    const career = dummyCareers.find(c => c.id === roadmapId) || dummyCareers[0];
    const levelScores = { 'Beginner': 33, 'Intermediate': 66, 'Advanced': 100 };
    const skillComparison = career.requiredSkills.map(reqSkill => {
      const requiredScore = levelScores[reqSkill.level] || 0;
      return {
        skill: reqSkill.name,
        currentLevel: 'None',
        requiredLevel: reqSkill.level,
        currentScore: 0,
        requiredScore,
        gap: requiredScore
      };
    });
    return {
      careerTitle: career.title,
      overallReadiness: 0,
      skillComparison,
      recommendedFocus: skillComparison.slice(0, 3).map(s => s.skill)
    };
  }

  // 3. Fetch topics ordered
  const { data: topics, error: topErr } = await supabase
    .from('roadmap_topics')
    .select('id, title, order_index')
    .eq('roadmap_id', roadmapId)
    .order('order_index');

  if (topErr) throw topErr;

  let skillComparison = [];

  if (topics && topics.length > 0) {
    const topicIds = topics.map(t => t.id);

    // 4. Fetch all subtopics for these topics
    const { data: subtopics, error: subErr } = await supabase
      .from('roadmap_subtopics')
      .select('id, topic_id, title, order_index')
      .in('topic_id', topicIds)
      .order('order_index');

    if (subErr) throw subErr;

    // 5. Fetch completed subtopics for this user
    const subtopicIds = (subtopics || []).map(s => s.id);
    let completedSubtopicIds = new Set();

    if (subtopicIds.length > 0) {
      if (!isUuid(user.id)) {
        const progressKey = `elevateu_subtopic_progress_${user.id}`;
        try {
          const progressMap = JSON.parse(localStorage.getItem(progressKey) || '{}');
          subtopicIds.forEach(sid => {
            if (progressMap[sid] === 'completed') {
              completedSubtopicIds.add(sid);
            }
          });
        } catch (e) {}
      } else {
        const { data: progress, error: progErr } = await supabase
          .from('user_subtopic_progress')
          .select('subtopic_id')
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .in('subtopic_id', subtopicIds);

        if (progErr) throw progErr;
        (progress || []).forEach(p => completedSubtopicIds.add(p.subtopic_id));
      }
    }

    // Group subtopics by topic_id
    const subtopicsByTopic = {};
    (subtopics || []).forEach(s => {
      if (!subtopicsByTopic[s.topic_id]) subtopicsByTopic[s.topic_id] = [];
      subtopicsByTopic[s.topic_id].push(s);
    });

    const totalTopics = topics.length;

    skillComparison = topics.map((topic, index) => {
      const subs = subtopicsByTopic[topic.id] || [];
      const totalSubs = subs.length;
      const completedSubs = subs.filter(s => completedSubtopicIds.has(s.id)).length;

      // Calculate progress of this specific topic
      const topicProgressPercent = totalSubs === 0 ? 0 : (completedSubs / totalSubs) * 100;

      // Determine required level dynamically based on order index (later topics require more advanced knowledge)
      const pct = index / Math.max(1, totalTopics - 1);
      let requiredLevel = 'Intermediate';
      let requiredScore = 66;
      if (pct < 0.25) {
        requiredLevel = 'Beginner';
        requiredScore = 33;
      } else if (pct > 0.75) {
        requiredLevel = 'Advanced';
        requiredScore = 100;
      }

      // Calculate current level dynamically from topic progress
      let currentScore = 0;
      let currentLevel = 'None';
      if (topicProgressPercent >= 100) {
        currentLevel = 'Advanced';
        currentScore = 100;
      } else if (topicProgressPercent >= 50) {
        currentLevel = 'Intermediate';
        currentScore = 66;
      } else if (topicProgressPercent > 0) {
        currentLevel = 'Beginner';
        currentScore = 33;
      }

      const gap = Math.max(0, requiredScore - currentScore);

      return {
        skill: topic.title, // Topic title is the skill name
        currentLevel,
        requiredLevel,
        currentScore,
        requiredScore,
        gap
      };
    });
  }

  // Calculate overall readiness (average of coverage)
  const totalRequired = skillComparison.reduce((sum, s) => sum + s.requiredScore, 0);
  const totalCovered = skillComparison.reduce((sum, s) => sum + Math.min(s.currentScore, s.requiredScore), 0);
  const overallReadiness = totalRequired > 0 ? Math.round((totalCovered / totalRequired) * 100) : 0;

  // Recommended Focus (sort by gap descending, up to 3)
  const recommendedFocus = skillComparison
    .filter(s => s.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 3)
    .map(s => s.skill);

  return {
    careerTitle: roadmap.title,
    overallReadiness,
    skillComparison,
    recommendedFocus
  };
}


