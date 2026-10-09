import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardCheck, BookOpen, Zap, TrendingUp, CheckCircle2, PlayCircle, ArrowRight
} from 'lucide-react';

import { useAuth }  from '../hooks/useAuth';
import { getDashboardData } from '../services/dashboardService';
import { getOverallProgress } from '../services/roadmapService';
import { getProfile } from '../services/profileService';
import EditProfileModal from '../components/profile/EditProfileModal';
import Card   from '../components/ui/Card';
import Badge  from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';

// Imported Extracted Components
import DashboardCharts from './DashboardCharts';
import DashboardActivity from './DashboardActivity';

// ─── Animated SVG Circular Progress Ring ─────────────────────────────────────
function CircularProgressRing({ value, size = 104, stroke = 10 }) {
  const [fill, setFill] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setFill(value), 80);
    return () => clearTimeout(t);
  }, [value]);

  const radius        = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset    = circumference - (fill / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-border)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="var(--color-secondary)" strokeWidth={stroke}
          strokeDasharray={circumference} strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-text-primary leading-none">{value}</span>
        <span className="text-xs font-semibold text-text-secondary mt-0.5">/ 100</span>
      </div>
    </div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6 space-y-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-16 w-16 rounded-full mx-auto" />
            <Skeleton className="h-3 w-20 mx-auto" />
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4"><Skeleton className="h-5 w-40" /><Skeleton className="h-56 w-full" /></Card>
        <Card className="p-6 space-y-4"><Skeleton className="h-5 w-40" /><Skeleton className="h-56 w-full" /></Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <Skeleton className="h-5 w-36" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-3 items-start">
              <Skeleton className="h-9 w-9 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-3 w-20" /></div>
            </div>
          ))}
        </Card>
        <Card className="p-6 space-y-4">
          <Skeleton className="h-5 w-32" />
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-10 w-full rounded-xl" />)}
        </Card>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, sub, accent, icon: Icon, children }) {
  return (
    <Card className="p-5 flex flex-col items-center text-center gap-3 hover:scale-[1.02] transition-transform duration-200">
      <div className="flex items-center gap-2 w-full justify-center">
        {Icon && (
          <div className={`p-1.5 rounded-lg ${accent}`}>
            <Icon className="h-4 w-4" />
          </div>
        )}
        <span className="text-xs font-bold text-text-secondary uppercase tracking-wide">
          {label}
        </span>
      </div>
      {children}
      {sub && <p className="text-xs text-text-secondary">{sub}</p>}
    </Card>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const { user }   = useAuth();
  const navigate   = useNavigate();

  const [data,    setData]    = useState(null);
  const [roadmapProgress, setRoadmapProgress] = useState(0);
  const [profile, setProfile] = useState(null);
  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(false);
  const [showSetupPrompt, setShowSetupPrompt] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  const fetchDashboard = () => {
    setLoading(true);
    setError(false);
    Promise.all([
      getDashboardData(),
      getOverallProgress(),
      getProfile().catch(() => null)
    ]).then(([d, progress, prof]) => {
      setData(d);
      setRoadmapProgress(progress);
      setProfile(prof);
      setLoading(false);

      if (prof && prof.isCompleted === false && showSetupPrompt) {
        setIsProfileSetupOpen(true);
      }
    }).catch(() => {
      setError(true);
      setLoading(false);
    });
  };

  const handleProfileSave = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsProfileSetupOpen(false);
    setShowSetupPrompt(false);
    fetchDashboard();
  };

  const handleProfileClose = () => {
    setIsProfileSetupOpen(false);
    setShowSetupPrompt(false);
  };

  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <DashboardSkeleton />;
  if (error) return <ErrorState onRetry={fetchDashboard} />;

  const {
    careerReadinessScore,
    assessmentsCompleted, assessmentsTotal,
    coursesInProgress, coursesCompleted,
    skillsLearned,
    readinessHistory,
    skillBreakdown,
    recentActivity,
  } = data;

  const hour = new Date().getHours();
  const salutation = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  // Determine Next Step
  let nextStepLabel = "Take your next assessment";
  let nextStepPath = "/assessment";
  let NextStepIcon = ClipboardCheck;
  
  if (assessmentsCompleted >= assessmentsTotal) {
    nextStepLabel = "Continue your roadmap";
    nextStepPath = "/roadmap";
    NextStepIcon = Compass;
  }

  return (
    <div className="space-y-6 text-left">
      <SEO title="Dashboard" noIndex={true} />
      
      {/* ── GREETING HEADER ────────────────────────────────────────────── */}
      <PageHeader 
        title={
          <>
            {salutation},{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {user?.name ?? 'there'}
            </span>
          </>
        }
        description={today}
        action={
          <Badge variant="info" className="text-xs font-semibold px-3 py-1">
            Roadmap Progress · {roadmapProgress}%
          </Badge>
        }
      />

      {/* ── NEXT STEP CARD ─────────────────────────────────────────────── */}
      <Card className="p-6 bg-gradient-to-r from-primary-soft to-bg-surface border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
            <NextStepIcon className="h-5 w-5 text-primary" />
            Your Next Step
          </h2>
          <p className="text-sm text-text-secondary mt-1 max-w-md leading-relaxed">
            Keep the momentum going! Completing this step will help us personalize your career journey and unlock new opportunities.
          </p>
        </div>
        <Button variant="primary" size="lg" className="w-full sm:w-auto shrink-0 gap-2 shadow-md shadow-primary/20" onClick={() => navigate(nextStepPath)}>
          {nextStepLabel}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Card>

      {/* ── STAT CARDS ROW ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Career Readiness" sub="Overall score" accent="bg-secondary/10 text-secondary" icon={TrendingUp}>
          <CircularProgressRing value={careerReadinessScore} />
        </StatCard>

        <StatCard label="Assessments" sub={`${assessmentsTotal - assessmentsCompleted} remaining`} accent="bg-accent/10 text-accent" icon={ClipboardCheck}>
          <div className="flex items-end gap-1 leading-none">
            <span className="text-4xl font-bold text-text-primary">{assessmentsCompleted}</span>
            <span className="text-xl font-bold text-text-secondary mb-0.5">/ {assessmentsTotal}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
            <div className="h-full rounded-full bg-accent transition-all duration-1000" style={{ width: `${(assessmentsCompleted / assessmentsTotal) * 100}%` }} />
          </div>
        </StatCard>

        <StatCard label="Courses" sub="Total enrolled" accent="bg-success/10 text-success" icon={BookOpen}>
          <div className="flex items-center gap-4 justify-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-success">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-3xl font-bold">{coursesCompleted}</span>
              </div>
              <span className="text-xs text-text-secondary font-semibold uppercase tracking-wide">done</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-warning">
                <PlayCircle className="h-4 w-4" />
                <span className="text-3xl font-bold">{coursesInProgress}</span>
              </div>
              <span className="text-xs text-text-secondary font-semibold uppercase tracking-wide">active</span>
            </div>
          </div>
        </StatCard>

        <StatCard label="Skills Learned" sub="Across all assessments" accent="bg-warning/10 text-warning" icon={Zap}>
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold text-text-primary">{skillsLearned}</span>
            <div className="flex gap-1 mt-2">
              {[...Array(Math.min(skillsLearned, 9))].map((_, i) => (
                <div key={i} className="h-1.5 w-1.5 rounded-full bg-warning" style={{ opacity: 0.4 + (i / 9) * 0.6 }} />
              ))}
            </div>
          </div>
        </StatCard>
      </div>

      {/* ── CHARTS ROW ─────────────────────────────────────────────────── */}
      <DashboardCharts readinessHistory={readinessHistory} skillBreakdown={skillBreakdown} />

      {/* ── ACTIVITY + QUICK ACTIONS ROW ───────────────────────────────── */}
      <DashboardActivity recentActivity={recentActivity} />

      {/* ── PROFILE SETUP ONBOARDING MODAL ── */}
      {isProfileSetupOpen && profile && (
        <EditProfileModal
          profile={profile}
          onClose={handleProfileClose}
          onSave={handleProfileSave}
        />
      )}
    </div>
  );
}
