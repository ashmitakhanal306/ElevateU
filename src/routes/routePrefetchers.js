/**
 * routePrefetchers.js
 *
 * Standalone dynamic import functions used exclusively for background prefetching.
 * Kept separate from AppRoutes.jsx so Vite's React Fast Refresh works correctly
 * (mixing non-component exports with components breaks HMR).
 *
 * ⚠️ Keep this list in sync with all lazy-loaded pages in AppRoutes.jsx.
 */
export const routeImporters = [
  // ── Protected dashboard pages ──────────────────────────────────────────────
  () => import('../pages/Dashboard'),
  () => import('../pages/StudentProfile'),
  () => import('../pages/SkillAssessment'),
  () => import('../pages/AssessmentRunner'),
  () => import('../pages/AssessmentResults'),
  () => import('../pages/CareerRecommendations'),
  () => import('../pages/CareerDetail'),
  () => import('../pages/SkillGapAnalysis'),
  () => import('../pages/ResumeAnalysis'),
  () => import('../pages/CoursesPage'),
  () => import('../pages/JobsPage'),
  () => import('../pages/LearningRoadmap'),

  // ── Public pages ───────────────────────────────────────────────────────────
  () => import('../pages/HomePage'),
  () => import('../pages/NotFound'),

  // ── Marketing pages ────────────────────────────────────────────────────────
  () => import('../pages/marketing/AboutPage'),
  () => import('../pages/marketing/CareersPage'),
  () => import('../pages/marketing/BlogPage'),
  () => import('../pages/marketing/PricingPage'),
  () => import('../pages/marketing/CareerGuidePage'),
  () => import('../pages/marketing/HelpCenterPage'),
  () => import('../pages/marketing/StudentCommunityPage'),
  () => import('../pages/marketing/FAQsPage'),
  () => import('../pages/marketing/ContactPage'),
  () => import('../pages/marketing/TermsPage'),
  () => import('../pages/marketing/PrivacyPage'),
  () => import('../pages/marketing/CookiePolicyPage'),
];
