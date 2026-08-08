import React, { useState, useEffect, useMemo, useCallback } from 'react';
import SEO from '../components/SEO';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import { Target, CheckCircle2, AlertCircle, ArrowRight, BookOpen, Map } from 'lucide-react';

import { getSkillGapAnalysis } from '../services/careerService';
import { fetchUserRoadmaps, setActiveRoadmap } from '../services/roadmapService';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';



// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }) {
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
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 4, fontWeight: 600 }}>
        {label}
      </p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color, fontWeight: 700 }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

// ─── Animated Readiness Ring ──────────────────────────────────────────────────

function ReadinessRing({ value, size = 120, stroke = 12 }) {
  const [fill, setFill] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setFill(value), 100);
    return () => clearTimeout(t);
  }, [value]);

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (fill / 100) * circumference;

  let colorClass = 'stroke-secondary';
  if (value >= 80) colorClass = 'stroke-success';
  else if (value < 50) colorClass = 'stroke-warning';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          className={colorClass}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-text-primary leading-none">{value}%</span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SkillGapAnalysis() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user } = useAuth();

  const C = useMemo(() => ({
    text:      'var(--color-text-secondary)',
    grid:      'var(--color-border)',
    primary:   'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    warning:   'var(--color-warning)',
    surface:   'var(--color-bg-surface)',
  }), [theme]);

  // ── User's roadmap selections ─────────────────────────────────────────────
  const [userRoadmaps, setUserRoadmaps] = useState([]);
  const [loadingRoadmaps, setLoadingRoadmaps] = useState(true);

  // The currently selected selection row id (not roadmap_id)
  const [selectedSelectionId, setSelectedSelectionId] = useState(null);
  const [activatingId, setActivatingId] = useState(null);

  // ── Skill gap analysis (static careerService, kept for chart data) ────────
  const [analysis, setAnalysis] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [errorAnalysis, setErrorAnalysis] = useState(false);

  // 1. Load user's roadmaps
  const loadUserRoadmaps = useCallback(async () => {
    if (!user) return;
    setLoadingRoadmaps(true);
    try {
      const rows = await fetchUserRoadmaps(user.id);
      setUserRoadmaps(rows);

      // Auto-select the active one (if any); otherwise pick the first
      const active = rows.find((r) => r.is_active);
      if (active) {
        setSelectedSelectionId(active.id);
      } else if (rows.length > 0) {
        setSelectedSelectionId(rows[0].id);
      }
    } catch (err) {
      console.error('Failed to load user roadmaps', err);
    } finally {
      setLoadingRoadmaps(false);
    }
  }, [user]);

  useEffect(() => { loadUserRoadmaps(); }, [loadUserRoadmaps]);

  // 2. Fetch skill gap analysis whenever the selected roadmap changes.
  //    We reuse the existing careerService mapping the selected roadmap
  //    to the closest dummy career in dummyCareers.js.
  const fetchAnalysis = useCallback(() => {
    if (!selectedSelectionId) return;
    setLoadingAnalysis(true);
    setErrorAnalysis(false);

    // Find the selected row to grab a career title and roadmap_id
    const row = userRoadmaps.find((r) => r.id === selectedSelectionId);
    if (!row) return;

    const title = row?.roadmaps?.title || 'Full Stack';
    const roadmapId = row?.roadmap_id;

    getSkillGapAnalysis(roadmapId)
      .then((data) => {
        setAnalysis(data);
        setLoadingAnalysis(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorAnalysis(true);
        setLoadingAnalysis(false);
      });
  }, [selectedSelectionId, userRoadmaps]);

  useEffect(() => {
    if (selectedSelectionId && userRoadmaps.length > 0) {
      fetchAnalysis();
    }
  }, [selectedSelectionId]); // eslint-disable-line react-hooks/exhaustive-deps

  // 3. Handle dropdown change → set as active in DB
  const handleRoadmapChange = async (e) => {
    const newSelId = e.target.value;
    setSelectedSelectionId(newSelId);

    if (!user) return;
    setActivatingId(newSelId);
    try {
      await setActiveRoadmap(user.id, newSelId);
      // Update local state to reflect new active
      setUserRoadmaps((prev) =>
        prev.map((r) => ({ ...r, is_active: r.id === newSelId }))
      );
    } catch (err) {
      console.error('Failed to set active roadmap', err);
    } finally {
      setActivatingId(null);
    }
  };


  // ── Render Helpers ──────────────────────────────────────────────────────────

  const renderSkeleton = () => (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="col-span-1 h-64" />
        <Skeleton className="col-span-2 h-64" />
      </div>
      <Skeleton className="h-48" />
    </div>
  );

  // No roadmaps added yet
  if (!loadingRoadmaps && userRoadmaps.length === 0) {
    return (
      <div className="space-y-6 pt-4 text-left">
        <SEO title="Skill Gap Analysis" noIndex={true} />
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-text-primary">
            Skill Gap Analysis
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Compare your current skills against career requirements.
          </p>
        </div>
        <EmptyState
          title="No roadmaps added yet"
          message="Go to Learning Roadmap, add at least one roadmap, then come back here to activate it and run your skill gap analysis."
          action={
            <Button
              variant="primary"
              className="gap-2 mt-2"
              onClick={() => navigate('/roadmap')}
            >
              <Map className="h-4 w-4" /> Go to Learning Roadmap
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-4 text-left">
      <SEO title="Skill Gap Analysis" noIndex={true} />

      {/* ── Header & Dropdown ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-text-primary">
            Skill Gap Analysis
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Compare your current skills against career requirements.
          </p>
        </div>

        {/* Roadmap Selector */}
        <div className="w-full sm:w-72">
          <label className="block text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wide">
            Active Roadmap
          </label>
          <div className="relative">
            <select
              id="roadmap-selector"
              value={selectedSelectionId || ''}
              onChange={handleRoadmapChange}
              disabled={loadingRoadmaps || activatingId !== null}
              className="w-full bg-bg-surface border border-border text-text-primary text-sm rounded-xl focus:ring-secondary focus:border-secondary block p-2.5 transition-colors duration-200 shadow-sm pr-8"
            >
              {loadingRoadmaps && <option>Loading your roadmaps…</option>}
              {!loadingRoadmaps && userRoadmaps.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.roadmaps?.title || r.roadmap_id}
                  {r.is_active ? ' ✓ Active' : ''}
                </option>
              ))}
            </select>
            {activatingId && (
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                <div className="h-4 w-4 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          <p className="text-[11px] text-text-secondary mt-1">
            Selecting a roadmap sets it as your active roadmap.
          </p>
        </div>
      </div>

      {/* ── Main Content ───────────────────────────────────────────────────── */}
      {errorAnalysis ? (
        <ErrorState onRetry={fetchAnalysis} />
      ) : loadingAnalysis || !analysis ? (
        renderSkeleton()
      ) : (
        <div className="space-y-6 mt-6">

          {/* Top Row: Overall Readiness & Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Overall Readiness Ring */}
            <Card className="p-6 col-span-1 flex flex-col items-center justify-center text-center">
              <h3 className="font-bold text-sm text-text-secondary uppercase tracking-wide mb-6">
                Overall Readiness
              </h3>
              <ReadinessRing value={analysis.overallReadiness} />
              <p className="text-sm text-text-primary font-medium mt-4">
                {analysis.careerTitle}
              </p>
            </Card>

            {/* Skill Comparison Bar Chart */}
            <Card className="p-6 col-span-1 lg:col-span-2">
              <h3 className="font-bold text-sm text-text-secondary uppercase tracking-wide mb-6">
                Current vs Required Proficiency
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analysis.skillComparison}
                    margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                    barGap={0}
                  >
                    <CartesianGrid strokeDasharray="4 4" stroke={C.grid} vertical={false} />
                    <XAxis
                      dataKey="skill"
                      stroke={C.text}
                      tick={{ fill: C.text, fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      stroke={C.text}
                      tick={{ fill: C.text, fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => {
                        if (v === 33) return 'Beg';
                        if (v === 66) return 'Int';
                        if (v === 100) return 'Adv';
                        return '';
                      }}
                    />
                    <Tooltip content={<ChartTooltip />} cursor={{ fill: C.grid, opacity: 0.4 }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: C.text }} />

                    <Bar dataKey="currentScore" name="Current Level" fill={C.secondary} radius={[4, 4, 0, 0]} barSize={16} />
                    <Bar dataKey="requiredScore" name="Required Level" fill={C.warning} radius={[4, 4, 0, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

          </div>

          {/* Bottom Row: Detailed Table & Focus Areas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Detailed Table */}
            <Card className="p-0 overflow-hidden col-span-1 lg:col-span-2 border border-border">
              <div className="p-5 border-b border-border bg-bg-surface">
                <h3 className="font-bold text-lg text-text-primary">Detailed Breakdown</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-text-secondary uppercase bg-bg-page border-b border-border">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Skill</th>
                      <th className="px-5 py-3 font-semibold">Current</th>
                      <th className="px-5 py-3 font-semibold">Required</th>
                      <th className="px-5 py-3 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.skillComparison.map((item, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-bg-page/50 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-text-primary whitespace-nowrap">
                          {item.skill}
                        </td>
                        <td className="px-5 py-3.5">
                          <Badge variant={item.currentLevel === 'None' ? 'danger' : 'info'}>
                            {item.currentLevel}
                          </Badge>
                        </td>
                        <td className="px-5 py-3.5">
                          <Badge variant="warning">{item.requiredLevel}</Badge>
                        </td>
                        <td className="px-5 py-3.5 text-right font-medium">
                          {item.gap === 0 ? (
                            <span className="flex items-center justify-end gap-1.5 text-success">
                              <CheckCircle2 className="h-4 w-4" /> Met
                            </span>
                          ) : (
                            <span className="flex items-center justify-end gap-1.5 text-warning">
                              <AlertCircle className="h-4 w-4" /> Gap
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Recommended Focus Areas */}
            <Card className="p-6 col-span-1 border-t-4 border-t-warning h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-warning" />
                <h3 className="font-bold text-lg text-text-primary">Recommended Focus</h3>
              </div>
              <p className="text-sm text-text-secondary mb-5">
                Based on your largest gaps, prioritize learning these skills to quickly improve your readiness.
              </p>

              {analysis.recommendedFocus.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-6">
                  <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center text-success">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium text-success">You're fully ready!</p>
                </div>
              ) : (
                <div className="space-y-3 flex-1">
                  {analysis.recommendedFocus.map((skill) => (
                    <div key={skill} className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-bg-page hover:border-warning/30 hover:bg-warning/5 transition-colors group">
                      <span className="font-semibold text-text-primary text-sm group-hover:text-warning transition-colors">
                        {skill}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/courses', { state: { filterSkill: skill } })}
                        className="p-1.5 rounded h-auto"
                        title="Find courses"
                      >
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-border">
                <Button
                  variant="primary"
                  className="w-full gap-2"
                  onClick={() => navigate('/courses')}
                >
                  Explore all courses <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>

          </div>
        </div>
      )}
    </div>
  );
}
