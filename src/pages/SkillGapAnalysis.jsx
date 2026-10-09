import React, { useState, useEffect, useMemo, useCallback } from 'react';
import SEO from '../components/SEO';
import { useNavigate } from 'react-router-dom';
import SkillRadarChart, { ReadinessRing } from '../components/charts/SkillRadarChart';
import { Target, CheckCircle2, ArrowRight, BookOpen, Map } from 'lucide-react';

import { getSkillGapAnalysis } from '../services/careerService';
import { fetchUserRoadmaps, setActiveRoadmap } from '../services/roadmapService';

import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import PageHeader from '../components/ui/PageHeader';


// ─── Main Component ───────────────────────────────────────────────────────────
export default function SkillGapAnalysis() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const C = useMemo(() => ({
    text:      'var(--color-text-secondary)',
    grid:      'var(--color-border)',
    primary:   'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    warning:   'var(--color-warning)',
    surface:   'var(--color-bg-surface)',
  }), []);

  const [userRoadmaps, setUserRoadmaps] = useState([]);
  const [loadingRoadmaps, setLoadingRoadmaps] = useState(true);

  const [selectedSelectionId, setSelectedSelectionId] = useState(null);
  const [activatingId, setActivatingId] = useState(null);

  const [analysis, setAnalysis] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [errorAnalysis, setErrorAnalysis] = useState(false);

  const loadUserRoadmaps = useCallback(async () => {
    if (!user) return;
    setLoadingRoadmaps(true);
    try {
      const rows = await fetchUserRoadmaps(user.id);
      setUserRoadmaps(rows);

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

  const fetchAnalysis = useCallback(() => {
    if (!selectedSelectionId) return;
    setLoadingAnalysis(true);
    setErrorAnalysis(false);

    const row = userRoadmaps.find((r) => r.id === selectedSelectionId);
    if (!row) return;

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
  }, [selectedSelectionId, userRoadmaps.length, fetchAnalysis]);

  const handleRoadmapChange = async (e) => {
    const newSelId = e.target.value;
    setSelectedSelectionId(newSelId);

    if (!user) return;
    setActivatingId(newSelId);
    try {
      await setActiveRoadmap(user.id, newSelId);
      setUserRoadmaps((prev) =>
        prev.map((r) => ({ ...r, is_active: r.id === newSelId }))
      );
    } catch (err) {
      console.error('Failed to set active roadmap', err);
    } finally {
      setActivatingId(null);
    }
  };

  const renderSkeleton = () => (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="col-span-1 h-64" />
        <Skeleton className="col-span-2 h-64" />
      </div>
      <Skeleton className="h-48" />
    </div>
  );

  if (!loadingRoadmaps && userRoadmaps.length === 0) {
    return (
      <div className="space-y-6 pt-4 text-left">
        <SEO title="Skill Gap Analysis" noIndex={true} />
        <PageHeader 
          title="Skill Gap Analysis" 
          description="Compare your current skills against career requirements."
        />
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

  const missingSkills = analysis?.skillComparison?.filter(item => item.gap > 0) || [];

  return (
    <div className="space-y-6 pt-4 text-left pb-12">
      <SEO title="Skill Gap Analysis" noIndex={true} />

      {/* ── Header & Dropdown ─────────────────────────────────────────────── */}
      <PageHeader 
        title="Skill Gap Analysis" 
        description="Compare your current skills against career requirements."
        actions={
          <div className="w-full sm:w-72 mt-2 sm:mt-0 shrink-0 text-left">
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
          </div>
        }
      />

      {/* ── Main Content ───────────────────────────────────────────────────── */}
      {errorAnalysis ? (
        <ErrorState onRetry={fetchAnalysis} />
      ) : loadingAnalysis || !analysis ? (
        renderSkeleton()
      ) : (
        <div className="space-y-6 mt-6 animate-fade-in-up">

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

            <div className="col-span-1 lg:col-span-2">
              <SkillRadarChart data={analysis.skillComparison} colors={C} />
            </div>

          </div>

          {/* Bottom Row: Missing Skills & Focus Areas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Missing Skills */}
            <Card className="p-6 col-span-1 lg:col-span-2">
              <h3 className="font-bold text-sm text-text-secondary uppercase tracking-wide mb-4">
                Missing or Incomplete Skills
              </h3>
              {missingSkills.length === 0 ? (
                <EmptyState
                  title="No gaps found!"
                  message="You meet all the requirements for this career path."
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {missingSkills.map((item, idx) => (
                    <Badge key={idx} variant="warning" className="px-3 py-1.5 text-sm font-semibold">
                      {item.skill}
                    </Badge>
                  ))}
                </div>
              )}
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
