import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Layout Shells & ErrorBoundary (Loaded statically to prevent shell flicker)
import DashboardLayout from '../components/layout/DashboardLayout';
import ErrorBoundary from '../components/ErrorBoundary';
import PageLoader from '../components/ui/PageLoader';

// Static Imports (Kept synchronous as they are the entry portals)
import Login from '../pages/Login';
import Signup from '../pages/Signup';

// Lazy-Loaded Public Views
const HomePage = React.lazy(() => import('../pages/HomePage'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

// Lazy-Loaded Protected Views
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const StudentProfile = React.lazy(() => import('../pages/StudentProfile'));
const SkillAssessment = React.lazy(() => import('../pages/SkillAssessment'));
const AssessmentRunner = React.lazy(() => import('../pages/AssessmentRunner'));
const AssessmentResults = React.lazy(() => import('../pages/AssessmentResults'));
const CareerRecommendations = React.lazy(() => import('../pages/CareerRecommendations'));
const CareerDetail = React.lazy(() => import('../pages/CareerDetail'));
const SkillGapAnalysis = React.lazy(() => import('../pages/SkillGapAnalysis'));
const ResumeAnalysis = React.lazy(() => import('../pages/ResumeAnalysis'));
const CoursesAndJobs = React.lazy(() => import('../pages/CoursesAndJobs'));
const LearningRoadmap = React.lazy(() => import('../pages/LearningRoadmap'));

// Lazy-Loaded Marketing Pages
const AboutPage = React.lazy(() => import('../pages/marketing/AboutPage'));
const CareersPage = React.lazy(() => import('../pages/marketing/CareersPage'));
const BlogPage = React.lazy(() => import('../pages/marketing/BlogPage'));
const PricingPage = React.lazy(() => import('../pages/marketing/PricingPage'));
const CareerGuidePage = React.lazy(() => import('../pages/marketing/CareerGuidePage'));
const HelpCenterPage = React.lazy(() => import('../pages/marketing/HelpCenterPage'));
const StudentCommunityPage = React.lazy(() => import('../pages/marketing/StudentCommunityPage'));
const FAQsPage = React.lazy(() => import('../pages/marketing/FAQsPage'));
const ContactPage = React.lazy(() => import('../pages/marketing/ContactPage'));
const TermsPage = React.lazy(() => import('../pages/marketing/TermsPage'));
const PrivacyPage = React.lazy(() => import('../pages/marketing/PrivacyPage'));
const CookiePolicyPage = React.lazy(() => import('../pages/marketing/CookiePolicyPage'));

/**
 * ProtectedRoute component wrapper.
 * Inspects global auth state via useAuth hook; intercepts unauthorized access attempts,
 * and forces redirection to the login gateway.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

/**
 * Main application routing configuration.
 * All route page components are lazy-loaded and wrapped inside React.Suspense
 * to optimize initial bundle delivery performance.
 */
export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Root Entrypoint - unconditionally renders public HomePage */}
        <Route path="/" element={<ErrorBoundary><HomePage /></ErrorBoundary>} />

        {/* Public Pages (Synchronous) */}
        <Route path="/login" element={<ErrorBoundary><Login /></ErrorBoundary>} />
        <Route path="/signup" element={<ErrorBoundary><Signup /></ErrorBoundary>} />
        
        {/* Marketing Pages (Code-Split) */}
        <Route path="/about" element={<ErrorBoundary><AboutPage /></ErrorBoundary>} />
        <Route path="/careers" element={<ErrorBoundary><CareersPage /></ErrorBoundary>} />
        <Route path="/blog" element={<ErrorBoundary><BlogPage /></ErrorBoundary>} />
        <Route path="/pricing" element={<ErrorBoundary><PricingPage /></ErrorBoundary>} />
        <Route path="/career-guide" element={<ErrorBoundary><CareerGuidePage /></ErrorBoundary>} />
        <Route path="/help-center" element={<ErrorBoundary><HelpCenterPage /></ErrorBoundary>} />
        <Route path="/community" element={<ErrorBoundary><StudentCommunityPage /></ErrorBoundary>} />
        <Route path="/faqs" element={<ErrorBoundary><FAQsPage /></ErrorBoundary>} />
        <Route path="/contact" element={<ErrorBoundary><ContactPage /></ErrorBoundary>} />
        <Route path="/terms" element={<ErrorBoundary><TermsPage /></ErrorBoundary>} />
        <Route path="/privacy" element={<ErrorBoundary><PrivacyPage /></ErrorBoundary>} />
        <Route path="/cookies" element={<ErrorBoundary><CookiePolicyPage /></ErrorBoundary>} />

        {/* Protected Pages - wrapped in layouts and validation checks.
            DashboardLayout internally wraps its <Outlet /> inside an ErrorBoundary to protect sub-routes. */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/assessment" element={<SkillAssessment />} />
          <Route path="/assessment/:assessmentId" element={<AssessmentRunner />} />
          <Route path="/assessment/:assessmentId/results" element={<AssessmentResults />} />
          <Route path="/career-recommendations" element={<CareerRecommendations />} />
          <Route path="/career-recommendations/:careerId" element={<CareerDetail />} />
          <Route path="/skill-gap" element={<SkillGapAnalysis />} />
          <Route path="/roadmap" element={<LearningRoadmap />} />
          <Route path="/resume-analysis" element={<ResumeAnalysis />} />
          <Route path="/courses" element={<CoursesAndJobs />} />
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
