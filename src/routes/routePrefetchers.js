/**
 * routePrefetchers.js
 *
 * Standalone dynamic import functions used exclusively for background prefetching.
 * Kept separate from AppRoutes.jsx so Vite's React Fast Refresh works correctly
 * (mixing non-component exports with components breaks HMR).
 */
export const routeImporters = [
  () => import('../pages/Dashboard'),
  () => import('../pages/StudentProfile'),
  () => import('../pages/SkillAssessment'),
  () => import('../pages/AssessmentRunner'),
  () => import('../pages/AssessmentResults'),
  () => import('../pages/CareerRecommendations'),
  () => import('../pages/CareerDetail'),
  () => import('../pages/SkillGapAnalysis'),
  () => import('../pages/ResumeAnalysis'),
  () => import('../pages/CoursesAndJobs'),
  () => import('../pages/LearningRoadmap'),
];
