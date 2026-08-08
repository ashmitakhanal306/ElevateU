/**
 * Dashboard.jsx — Main application hub.
 *
 * Layout (top → bottom):
 *   1. Greeting header  — "Welcome back, {name}" + today's date
 *   2. Stat cards row   — 4 cards: Career Readiness (SVG ring), Assessments,
 *                          Courses, Skills Learned
 *   3. Charts row       — LineChart (readiness trend) | BarChart (skill scores)
 *   4. Recent Activity  — Icon + label + timestamp feed
 *   5. Quick Actions    — Outline buttons linking to key pages
 *
 * All Recharts charts use ResponsiveContainer and derive their colours from
 * ThemeContext so they adapt automatically to light/dark mode.
 *
 * Shows a matching pulsing skeleton while getDashboardData() resolves.
 */

import React, { useState, useEffect, useMemo } from 'react';
import SEO from '../components/SEO';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import {
  ClipboardCheck, BookOpen, FileText, Compass,
  Zap, TrendingUp, CheckCircle2, PlayCircle,
  Activity, ArrowRight,
} from 'lucide-react';

import { useAuth }  from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { getDashboardData } from '../services/dashboardService';
import { getOverallProgress } from '../services/roadmapService';
import { getProfile } from '../services/profileService';
import EditProfileModal from '../components/profile/EditProfileModal';
import Card   from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge  from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
// ─── Animated SVG Circular Progress Ring ─────────────────────────────────────

/**
 * Draws an SVG ring that animates from 0% to `value`% on mount.
 * Uses CSS variable colours so it respects the design token system.
 *
 * @param {number} value       - 0–100 percentage
 * @param {number} [size=104]  - Outer diameter in px
 * @param {number} [stroke=10] - Ring stroke width in px
 */
function CircularProgressRing({ value, size = 104, stroke = 10 }) {
  // Animate the ring fill on mount (deferred by 80ms to ensure paint)
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
      {/* -rotate-90 so the arc starts at the 12 o'clock position */}
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        {/* Track (background ring) */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={stroke}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="var(--color-secondary)"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      {/* Centred label (rotate back to upright) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-text-primary leading-none">{value}</span>
        <span className="text-[10px] font-semibold text-text-secondary mt-0.5">/ 100</span>
      </div>
    </div>
  );
}


// ─── Recharts custom tooltip ──────────────────────────────────────────────────

/**
 * Themed tooltip that reads bg/border from CSS variables directly.
 * Works in both light and dark mode without extra props.
 */
function ChartTooltip({ active, payload, label, valueLabel = 'Score' }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '10px 14px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        color: 'var(--color-text-primary)',
        fontSize: 13,
      }}
    >
      {label && (
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 4, fontWeight: 600 }}>
          {label}
        </p>
      )}
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color, fontWeight: 700 }}>
          {valueLabel}: {entry.value}
          {valueLabel === 'Score' ? '%' : ''}
        </p>
      ))}
    </div>
  );
}


// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Greeting skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Stat cards skeleton — 4 col on lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6 space-y-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-16 w-16 rounded-full mx-auto" />
            <Skeleton className="h-3 w-20 mx-auto" />
          </Card>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-56 w-full" />
        </Card>
        <Card className="p-6 space-y-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-56 w-full" />
        </Card>
      </div>

      {/* Activity + actions skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <Skeleton className="h-5 w-36" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-3 items-start">
              <Skeleton className="h-9 w-9 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </Card>
        <Card className="p-6 space-y-4">
          <Skeleton className="h-5 w-32" />
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-xl" />
          ))}
        </Card>
      </div>
    </div>
  );
}


// ─── Stat Card ────────────────────────────────────────────────────────────────

/**
 * Compact metric card used in the top row.
 * `children` renders the main visual (ring, number, bar, etc.)
 */
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


// ─── Recent Activity Icons ────────────────────────────────────────────────────

const ACTIVITY_META = {
  assessment: {
    Icon: ClipboardCheck,
    bg:   'bg-accent/10',
    text: 'text-accent',
  },
  course: {
    Icon: BookOpen,
    bg:   'bg-success/10',
    text: 'text-success',
  },
  resume: {
    Icon: FileText,
    bg:   'bg-warning/10',
    text: 'text-warning',
  },
};


// ─── Quick Actions Config ─────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  { label: 'Take an assessment',    path: '/assessment',             Icon: ClipboardCheck },
  { label: 'View career matches',   path: '/career-recommendations', Icon: Compass        },
  { label: 'Browse courses & jobs', path: '/courses',                Icon: BookOpen       },
  { label: 'Analyse my resume',     path: '/resume-analysis',        Icon: FileText       },
];


// ─── Bar chart colours (one per skill) ───────────────────────────────────────
// These cycle through the theme palette for visual variety.

const BAR_PALETTE = ['var(--color-secondary)', 'var(--color-accent)', 'var(--color-success)', 'var(--color-warning)'];


// ─── Main Component ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const { user }   = useAuth();
  const navigate   = useNavigate();
  const { theme }  = useTheme(); // Consume theme context

  // Memoize the chart color variables configuration so it is only recalculated
  // when the theme toggles (light <-> dark), preventing unnecessary re-renders.
  const C = useMemo(() => {
    return {
      text:      'var(--color-text-secondary)',
      grid:      'var(--color-border)',
      primary:   'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      accent:    'var(--color-accent)',
      success:   'var(--color-success)',
      warning:   'var(--color-warning)',
      danger:    'var(--color-danger)',
      surface:   'var(--color-bg-surface)',
      border:    'var(--color-border)',
      textPrimary: 'var(--color-text-primary)',
    };
  }, [theme]);

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

  // Fetch dashboard data on mount
  useEffect(() => {
    fetchDashboard();
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

  // Greeting salutation based on time of day
  const hour = new Date().getHours();
  const salutation =
    hour < 12 ? 'Good morning' :
    hour < 17 ? 'Good afternoon' : 'Good evening';

  // Today's date formatted nicely
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="space-y-6 text-left">
      <SEO title="Dashboard" noIndex={true} />{/* ── GREETING HEADER ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {salutation},{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {user?.name ?? 'there'}
            </span>
          </h1>
          <p className="text-sm text-text-secondary mt-0.5">{today}</p>
        </div>
        <Badge variant="info" className="self-start sm:self-auto text-xs">
          Career Readiness · {roadmapProgress}%
        </Badge>
      </div>

      {/* ── STAT CARDS ROW ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* 1 · Career Readiness — circular ring */}
        <StatCard
          label="Career Readiness"
          sub="Overall score"
          accent="bg-secondary/10 text-secondary"
          icon={TrendingUp}
        >
          <CircularProgressRing value={roadmapProgress} />
        </StatCard>

        {/* 2 · Assessments */}
        <StatCard
          label="Assessments"
          sub={`${assessmentsTotal - assessmentsCompleted} remaining`}
          accent="bg-accent/10 text-accent"
          icon={ClipboardCheck}
        >
          {/* Large fraction */}
          <div className="flex items-end gap-1 leading-none">
            <span className="text-4xl font-black text-text-primary">{assessmentsCompleted}</span>
            <span className="text-xl font-bold text-text-secondary mb-0.5">/ {assessmentsTotal}</span>
          </div>
          {/* Thin progress bar */}
          <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-all duration-1000"
              style={{ width: `${(assessmentsCompleted / assessmentsTotal) * 100}%` }}
            />
          </div>
        </StatCard>

        {/* 3 · Courses */}
        <StatCard
          label="Courses"
          sub="Total enrolled"
          accent="bg-success/10 text-success"
          icon={BookOpen}
        >
          <div className="flex items-center gap-4 justify-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-success">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-3xl font-black">{coursesCompleted}</span>
              </div>
              <span className="text-[10px] text-text-secondary font-semibold uppercase tracking-wide">
                done
              </span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-warning">
                <PlayCircle className="h-4 w-4" />
                <span className="text-3xl font-black">{coursesInProgress}</span>
              </div>
              <span className="text-[10px] text-text-secondary font-semibold uppercase tracking-wide">
                active
              </span>
            </div>
          </div>
        </StatCard>

        {/* 4 · Skills Learned */}
        <StatCard
          label="Skills Learned"
          sub="Across all assessments"
          accent="bg-warning/10 text-warning"
          icon={Zap}
        >
          <div className="flex flex-col items-center">
            <span className="text-5xl font-black text-text-primary">{skillsLearned}</span>
            <div className="flex gap-1 mt-2">
              {[...Array(Math.min(skillsLearned, 9))].map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-warning"
                  style={{ opacity: 0.4 + (i / 9) * 0.6 }}
                />
              ))}
            </div>
          </div>
        </StatCard>

      </div>{/* end stat cards */}


      {/* ── CHARTS ROW ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left: Career Readiness Trend (LineChart) */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="h-5 w-5 text-secondary" />
            <h3 className="font-bold text-sm">Career Readiness Trend</h3>
            <span className="ml-auto text-xs text-text-secondary">Last 6 weeks</span>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <LineChart
              data={readinessHistory}
              margin={{ top: 4, right: 12, left: -16, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                stroke={C.grid}
                vertical={false}
              />
              <XAxis
                dataKey="week"
                stroke={C.text}
                tick={{ fill: C.text, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[30, 80]}
                stroke={C.text}
                tick={{ fill: C.text, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<ChartTooltip valueLabel="Score" />} cursor={{ stroke: C.grid, strokeWidth: 2 }} />
              <Line
                type="monotone"
                dataKey="score"
                stroke={C.secondary}
                strokeWidth={2.5}
                dot={{ fill: C.secondary, strokeWidth: 2, r: 4, stroke: C.surface }}
                activeDot={{ r: 6, fill: C.accent, stroke: C.surface, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Right: Skill Breakdown (horizontal BarChart) */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Activity className="h-5 w-5 text-accent" />
            <h3 className="font-bold text-sm">Skill Breakdown</h3>
            <span className="ml-auto text-xs text-text-secondary">Score out of 100</span>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart
              layout="vertical"
              data={skillBreakdown}
              margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                stroke={C.grid}
                horizontal={false}
              />
              <XAxis
                type="number"
                domain={[0, 100]}
                stroke={C.text}
                tick={{ fill: C.text, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}`}
              />
              <YAxis
                type="category"
                dataKey="skill"
                stroke={C.text}
                tick={{ fill: C.text, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={115}
              />
              <Tooltip
                content={<ChartTooltip valueLabel="Score" />}
                cursor={{ fill: C.grid, opacity: 0.4 }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {skillBreakdown.map((entry, index) => (
                  <Cell
                    key={entry.skill}
                    fill={BAR_PALETTE[index % BAR_PALETTE.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

      </div>{/* end charts row */}


      {/* ── ACTIVITY + QUICK ACTIONS ROW ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Activity feed */}
        <Card className="p-6">
          <h3 className="font-bold mb-5 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((item, idx) => {
              const meta = ACTIVITY_META[item.type] ?? ACTIVITY_META.assessment;
              const { Icon, bg, text } = meta;
              return (
                <div key={idx} className="flex items-start gap-3 group">
                  {/* Type icon */}
                  <div className={`p-2 rounded-xl ${bg} ${text} shrink-0 transition-transform duration-200 group-hover:scale-110`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary leading-snug truncate">
                      {item.label}
                    </p>
                    <p className="text-xs text-text-secondary mt-0.5">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Quick Actions panel */}
        <Card className="p-6">
          <h3 className="font-bold mb-5 flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-secondary" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {QUICK_ACTIONS.map(({ label, path, Icon }) => (
              <Button
                key={path}
                variant="outline"
                onClick={() => navigate(path)}
                className="flex items-center gap-3 w-full px-4 py-3 text-left font-semibold text-text-primary group active:scale-[0.98] h-auto border-border bg-bg-surface hover:bg-bg-page hover:border-secondary/40"
              >
                <div className="p-1.5 rounded-lg bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-200">
                  <Icon className="h-4 w-4" />
                </div>
                {label}
                <ArrowRight className="h-3.5 w-3.5 ml-auto text-text-secondary group-hover:text-secondary group-hover:translate-x-0.5 transition-all duration-200" />
              </Button>
            ))}
          </div>
        </Card>

      </div>{/* end activity + actions */}

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
