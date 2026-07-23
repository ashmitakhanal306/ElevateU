/**
 * dummyDashboard.js — Static seed data for the Dashboard feature.
 *
 * Shape is identical to what a real GET /api/dashboard endpoint would return.
 * dashboardService.js reads from this and all dashboard consumers read only
 * from dashboardService — so this file is the single place to change later.
 */

const dummyDashboard = {
  // ── Headline metric ─────────────────────────────────────────────────────────
  /** Overall career readiness percentage (0–100) */
  careerReadinessScore: 68,

  // ── Progress counters ────────────────────────────────────────────────────────
  assessmentsCompleted: 3,
  assessmentsTotal: 5,
  coursesInProgress: 2,
  coursesCompleted: 4,
  skillsLearned: 9,

  // ── Trend data for the LineChart (last 6 weeks) ──────────────────────────────
  readinessHistory: [
    { week: 'W1', score: 40 },
    { week: 'W2', score: 48 },
    { week: 'W3', score: 55 },
    { week: 'W4', score: 58 },
    { week: 'W5', score: 63 },
    { week: 'W6', score: 68 },
  ],

  // ── Skill breakdown for the horizontal BarChart ──────────────────────────────
  skillBreakdown: [
    { skill: 'Technical',       value: 72 },
    { skill: 'Communication',   value: 60 },
    { skill: 'Problem Solving', value: 78 },
    { skill: 'Leadership',      value: 45 },
  ],

  // ── Activity feed (most recent first) ────────────────────────────────────────
  recentActivity: [
    {
      type: 'assessment',
      label: 'Completed "JavaScript Basics" quiz',
      time: '2 days ago',
    },
    {
      type: 'course',
      label: 'Started "React Fundamentals" course',
      time: '4 days ago',
    },
    {
      type: 'resume',
      label: 'Uploaded resume for ATS review',
      time: '1 week ago',
    },
  ],
};

export default dummyDashboard;
