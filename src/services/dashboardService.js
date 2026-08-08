import { supabase } from '../config/supabaseClient';
import { computeRoadmapProgress, fetchActiveRoadmapDetail } from './roadmapService';
import { getProfile } from './profileService';
import { getCompletedAssessments, getAssessmentScores } from './assessmentService';
import { getUserActivities } from '../utils/activityLogger';
import { useAuthStore } from '../store/authStore';
import dummyDashboard from '../data/dummyDashboard.js';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** Returns true only when userId is a valid RFC 4122 UUID (safe to send to Supabase). */
const isUuid = (id) => typeof id === 'string' && UUID_REGEX.test(id);

/** Simulate network round-trip latency */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch the current user's dashboard summary data dynamically synchronized with Supabase.
 * Returns a copy of dummyDashboard scaled by the user's active roadmap progress.
 *
 * @returns {Promise<typeof dummyDashboard>}
 */
export async function getDashboardData() {
  await delay(600);
  
  // Simulate a 5% random failure rate for QA testing Error States
  if (Math.random() < 0.05) {
    throw new Error('Failed to fetch dashboard data. Server responded with 500.');
  }

  const user = useAuthStore.getState().user;
  let progress = 0;
  
  try {
    if (user && isUuid(user.id)) {
      // Only query Supabase when user has a real UUID (email/Google OAuth users).
      // Phone-OTP mock users have deterministic but valid-format UUIDs too, so this
      // catches them if they actually hit Supabase; the roadmap service's localStorage
      // fallback handles the case where no DB row exists.
      const { data: selRows } = await supabase
          .from('user_roadmap_selections')
          .select('roadmap_id')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .limit(1);

      if (selRows && selRows.length > 0) {
        progress = await computeRoadmapProgress(user.id, selRows[0].roadmap_id);
      }
    } else if (user) {
      // Non-UUID users: fall through to localStorage-backed roadmap service
      progress = await fetchActiveRoadmapDetail(user.id)
        .then(detail => detail
          ? computeRoadmapProgress(user.id, detail.roadmap.id)
          : 0
        )
        .catch(() => 0);
    }
  } catch (err) {
    console.error('Error fetching active roadmap progress for dashboard:', err);
  }

  // Deep clone dummy dashboard
  const data = JSON.parse(JSON.stringify(dummyDashboard));

  // Align headline readiness score
  data.careerReadinessScore = progress;

  // Align weekly growth trend leading to the current readiness score
  data.readinessHistory = [
    { week: 'W1', score: Math.round(progress * 0.2) },
    { week: 'W2', score: Math.round(progress * 0.4) },
    { week: 'W3', score: Math.round(progress * 0.6) },
    { week: 'W4', score: Math.round(progress * 0.8) },
    { week: 'W5', score: Math.round(progress * 0.9) },
    { week: 'W6', score: progress },
  ];

  // Dynamic assessments completed count
  const completedAssessmentsSet = getCompletedAssessments();
  data.assessmentsCompleted = completedAssessmentsSet.size;
  data.assessmentsTotal = 4; // We have 4 assessments in dummyAssessments

  // Dynamic courses completed and active calculated from topics of the active roadmap
  let coursesCompleted = 0;
  let coursesInProgress = 0;
  try {
    if (user) {
      const activeRoadmap = await fetchActiveRoadmapDetail(user.id).catch(() => null);
      if (activeRoadmap && activeRoadmap.topics) {
        activeRoadmap.topics.forEach((topic) => {
          const subs = topic.subtopics || [];
          if (subs.length > 0) {
            const completedSubs = subs.filter((s) => s.status === 'completed').length;
            if (completedSubs === subs.length) {
              coursesCompleted++;
            } else if (completedSubs > 0) {
              coursesInProgress++;
            }
          }
        });
      }
    }
  } catch (err) {
    console.error('Error computing active roadmap courses counts:', err);
  }
  data.coursesCompleted = coursesCompleted;
  data.coursesInProgress = coursesInProgress;

  // Fetch count of skills from profile dynamically
  let skillsLearnedCount = 0;
  let profile = null;
  try {
    profile = await getProfile().catch(() => null);
    if (profile && Array.isArray(profile.skills)) {
      skillsLearnedCount = profile.skills.length;
    }
  } catch (err) {
    console.error('Error fetching profile skills count for dashboard:', err);
  }
  data.skillsLearned = skillsLearnedCount;

  // Align Recharts skill breakdown scores dynamically based on completed assessment scores
  const assessmentScores = getAssessmentScores();
  const commScore = assessmentScores['comm-skills'] || 0;
  const probScore = assessmentScores['prob-solving'] || 0;
  
  // Leadership score grows as user adds experiences to their profile
  let leadershipScore = 0;
  if (profile && Array.isArray(profile.experience) && profile.experience.length > 0) {
    leadershipScore = Math.min(100, 30 + profile.experience.length * 20);
  }

  data.skillBreakdown = [
    { skill: 'Technical',       value: progress },
    { skill: 'Communication',   value: commScore },
    { skill: 'Problem Solving', value: probScore },
    { skill: 'Leadership',      value: leadershipScore },
  ];

  // Dynamic recent activities
  if (user) {
    data.recentActivity = getUserActivities(user.id);
  }

  return data;
}

