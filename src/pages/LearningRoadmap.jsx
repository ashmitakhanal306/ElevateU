import React, { useState, useEffect, useCallback } from 'react';
import SEO from '../components/SEO';
import {
  CheckCircle2, Circle, BookOpen,
  ChevronDown, ChevronUp, Loader2,
  PlusCircle, LayoutGrid, Map, CheckCheck
} from 'lucide-react';
import Checkbox from '../components/ui/Checkbox';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import { useAuth } from '../hooks/useAuth';
import {
  fetchAllRoadmaps,
  fetchUserSelectedIds,
  addRoadmapSelection,
  fetchActiveRoadmapDetail,
  toggleSubtopicProgress,
  computeRoadmapProgress,
} from '../services/roadmapService';

// ─── Category colour map ──────────────────────────────────────────────────────
const CATEGORY_VARIANTS = {
  Engineering: 'info',
  Design: 'primary',
  Management: 'warning',
};

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ progress }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <div className="flex justify-between items-center text-sm font-semibold">
        <span className="text-text-primary">Journey Progress</span>
        <span className="text-secondary">{progress}%</span>
      </div>
      <div className="h-3 w-full bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-secondary rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// ─── Topic Icon ───────────────────────────────────────────────────────────────
function TopicIcon({ allDone, anyDone }) {
  if (allDone) {
    return (
      <div className="relative z-10 h-10 w-10 bg-success/10 border-2 border-success rounded-full flex items-center justify-center shrink-0 shadow-sm shadow-success/10">
        <CheckCircle2 className="h-5 w-5 text-success" />
      </div>
    );
  }
  if (anyDone) {
    return (
      <div className="relative z-10 h-10 w-10 bg-bg-surface border-2 border-secondary rounded-full flex items-center justify-center shrink-0 shadow-sm shadow-secondary/20">
        <div className="h-3.5 w-3.5 bg-secondary rounded-full animate-pulse" />
      </div>
    );
  }
  return (
    <div className="relative z-10 h-10 w-10 bg-bg-surface border-2 border-border rounded-full flex items-center justify-center shrink-0">
      <Circle className="h-4 w-4 text-border" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── Section 1: Browse Roadmaps Grid ─────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
function BrowseSection({ userId, onAdded }) {
  const [roadmaps, setRoadmaps] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [addingId, setAddingId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const [all, sel] = await Promise.all([
        fetchAllRoadmaps(),
        fetchUserSelectedIds(userId),
      ]);
      setRoadmaps(all);
      setSelectedIds(sel);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  const handleAdd = async (roadmapId) => {
    if (addingId) return;
    setAddingId(roadmapId);
    try {
      await addRoadmapSelection(userId, roadmapId);
      setSelectedIds((prev) => new Set([...prev, roadmapId]));
      onAdded?.();
    } catch (err) {
      console.error(err);
    } finally {
      setAddingId(null);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-36" />
        ))}
      </div>
    );
  }

  if (error) return <ErrorState onRetry={load} />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {roadmaps.map((rm) => {
        const isAdded = selectedIds.has(rm.id);
        const isAdding = addingId === rm.id;

        return (
          <Card
            key={rm.id}
            className={`p-5 flex flex-col gap-3 transition-all duration-200 ${
              isAdded
                ? 'border-success/30 bg-success/5'
                : 'hover:border-secondary/40 hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-text-primary text-base leading-tight">{rm.title}</h3>
                <Badge
                  variant={CATEGORY_VARIANTS[rm.category] || 'secondary'}
                  className="mt-1.5 text-[10px] uppercase tracking-wider"
                >
                  {rm.category}
                </Badge>
              </div>
              {isAdded && (
                <div className="shrink-0 h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCheck className="h-4 w-4 text-success" />
                </div>
              )}
            </div>

            <div className="mt-auto pt-1">
              {isAdded ? (
                <p className="text-xs font-semibold text-success flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Added to My Roadmaps
                </p>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAdd(rm.id)}
                  disabled={isAdding}
                  className="w-full gap-2 text-xs font-bold"
                  id={`add-roadmap-${rm.id}`}
                >
                  {isAdding ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <PlusCircle className="h-3.5 w-3.5" />
                  )}
                  {isAdding ? 'Adding…' : 'Add to My Roadmaps'}
                </Button>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── Section 2: Active Roadmap Detail ────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
function DetailSection({ userId }) {
  const [detail, setDetail] = useState(null);   // fetchActiveRoadmapDetail result
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [togglingId, setTogglingId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchActiveRoadmapDetail(userId);
      setDetail(data);
      if (data) {
        const p = await computeRoadmapProgress(userId, data.roadmap.id);
        setProgress(p);
        // Auto-expand first topic
        if (data.topics.length > 0) {
          setExpandedIds(new Set([data.topics[0].id]));
        }
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  const toggleTopic = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleToggleSubtopic = async (topicId, subtopic) => {
    if (togglingId) return;
    setTogglingId(subtopic.id);
    try {
      const newStatus = await toggleSubtopicProgress(userId, subtopic.id, subtopic.status);

      // Update local state optimistically
      setDetail((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          topics: prev.topics.map((t) => {
            if (t.id !== topicId) return t;
            return {
              ...t,
              subtopics: t.subtopics.map((s) =>
                s.id === subtopic.id ? { ...s, status: newStatus } : s
              ),
            };
          }),
        };
      });

      // Recompute progress
      const newProgress = await computeRoadmapProgress(userId, detail.roadmap.id);
      setProgress(newProgress);
    } catch (err) {
      console.error(err);
    } finally {
      setTogglingId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 pt-4">
        <Skeleton className="h-24" />
        <div className="space-y-8 pl-4 border-l-2 border-border">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 -ml-10 w-[calc(100%+2.5rem)]" />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <ErrorState onRetry={load} />;

  if (!detail) {
    return (
      <EmptyState
        title="No active roadmap"
        message="Add a roadmap above, then activate it in Skill Gap Analysis to see your learning journey here."
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Journey Progress Card */}
      <Card className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-br from-bg-surface to-bg-page border-border shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-text-primary">Journey Progress</h2>
          <p className="text-sm text-text-secondary mt-1 max-w-md">
            Roadmap: <span className="font-semibold text-text-primary">{detail.roadmap.title}</span>
            {' · '}
            <Badge variant={CATEGORY_VARIANTS[detail.roadmap.category] || 'secondary'} className="text-[10px]">
              {detail.roadmap.category}
            </Badge>
          </p>
        </div>
        <div className="w-full md:w-auto flex-1 flex md:justify-end">
          <ProgressBar progress={progress} />
        </div>
      </Card>

      {/* Topics Timeline */}
      <div className="relative pt-6">
        <div className="absolute left-5 top-10 bottom-10 w-0.5 bg-border z-0" />

        <div className="space-y-8 relative z-10">
          {detail.topics.map((topic) => {
            const isExpanded = expandedIds.has(topic.id);
            const completedCount = topic.subtopics.filter((s) => s.status === 'completed').length;
            const totalCount = topic.subtopics.length;
            const allDone = totalCount > 0 && completedCount === totalCount;
            const anyDone = completedCount > 0;

            return (
              <div key={topic.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 relative">

                {/* Timeline Icon */}
                <div className="shrink-0 flex sm:flex-col items-center gap-4 sm:gap-2">
                  <TopicIcon allDone={allDone} anyDone={anyDone} />
                </div>

                {/* Topic Card */}
                <Card
                  className={`flex-1 transition-all duration-300 overflow-hidden ${
                    anyDone && !allDone
                      ? 'border-secondary/30 shadow-md'
                      : allDone
                      ? 'border-border bg-bg-page/50'
                      : 'border-border'
                  }`}
                >
                  {/* Header */}
                  <div
                    className="p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-bg-page/50 transition-colors"
                    onClick={() => toggleTopic(topic.id)}
                    id={`topic-${topic.id}`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <Badge
                          variant={allDone ? 'success' : anyDone ? 'info' : 'secondary'}
                          className="text-[10px] uppercase tracking-wider"
                        >
                          {allDone ? 'Completed' : anyDone ? 'In Progress' : 'Not Started'}
                        </Badge>
                        {totalCount > 0 && (
                          <span className="text-xs font-semibold text-text-secondary bg-bg-page px-2 py-0.5 rounded-full border border-border">
                            {completedCount}/{totalCount} subtopics
                          </span>
                        )}
                      </div>
                      <h3 className={`text-lg font-bold leading-tight ${allDone ? 'text-text-secondary' : 'text-text-primary'}`}>
                        {topic.title}
                      </h3>
                    </div>
                    <div className="shrink-0 text-text-secondary p-1">
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </div>

                  {/* Expanded Subtopics */}
                  {isExpanded && (
                    <div className="border-t border-border bg-bg-surface p-5">
                      {topic.subtopics.length === 0 ? (
                        <p className="text-sm text-text-secondary italic">No subtopics for this topic.</p>
                      ) : (
                        <div className="space-y-3">
                          {topic.subtopics.map((sub) => {
                            const isDone = sub.status === 'completed';
                            return (
                              <div
                                key={sub.id}
                                className={`p-3 rounded-lg border transition-all ${
                                  isDone
                                    ? 'bg-success/5 border-success/20 text-text-secondary'
                                    : 'bg-bg-page border-border text-text-primary hover:border-secondary/50 hover:bg-secondary/5'
                                }`}
                              >
                                <div className="relative">
                                  <Checkbox
                                    checked={isDone}
                                    onChange={() => handleToggleSubtopic(topic.id, sub)}
                                    disabled={togglingId !== null}
                                    label={sub.title}
                                    id={`subtopic-${sub.id}`}
                                  />
                                  {togglingId === sub.id && (
                                    <div className="absolute inset-0 bg-bg-page/80 rounded flex items-center justify-center">
                                      <Loader2 className="h-4 w-4 animate-spin text-secondary" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── Main Page ────────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
export default function LearningRoadmap() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('browse');
  // Key to force DetailSection to re-fetch after a roadmap is added
  const [detailKey, setDetailKey] = useState(0);

  if (!user) {
    return (
      <EmptyState
        title="Not signed in"
        message="Please sign in to view your learning roadmaps."
      />
    );
  }

  const tabs = [
    { id: 'browse', label: 'Browse Roadmaps', icon: LayoutGrid },
    { id: 'detail', label: 'My Active Roadmap', icon: Map },
  ];

  return (
    <div className="space-y-8 pt-4 max-w-5xl mx-auto pb-12">
      <SEO title="Learning Roadmap" noIndex={true} />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-text-primary mb-2">
          Learning Roadmap
        </h1>
        <p className="text-sm text-text-secondary">
          Browse available roadmaps, add them to your profile, and track your progress.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-bg-surface border border-border rounded-xl p-1 w-fit">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            id={`tab-${id}`}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === id
                ? 'bg-secondary text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-page'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'browse' ? (
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            Add any roadmap below to track it. Then activate it in{' '}
            <span className="font-semibold text-text-primary">Skill Gap Analysis</span> to see your
            detailed progress here.
          </p>
          <BrowseSection
            userId={user.id}
            onAdded={() => setDetailKey((k) => k + 1)}
          />
        </div>
      ) : (
        <DetailSection key={detailKey} userId={user.id} />
      )}
    </div>
  );
}
