import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, Circle, ArrowRight, BookOpen, 
  ChevronDown, ChevronUp, Calendar, Loader2 
} from 'lucide-react';
import Checkbox from '../components/ui/Checkbox';
import Button from '../components/ui/Button';
import { getRoadmap, toggleStep, getOverallProgress } from '../services/roadmapService';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';

// ─── Progress Bar Component ───────────────────────────────────────────────────

function ProgressBar({ progress }) {
  return (<div className="flex flex-col gap-2 w-full max-w-md">
      <div className="flex justify-between items-center text-sm font-semibold">
        <span className="text-text-primary">Overall Progress</span>
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

// ─── Status Icon Component ────────────────────────────────────────────────────

function MilestoneIcon({ status }) {
  if (status === 'completed') {
    return (
      <div className="relative z-10 h-10 w-10 bg-success/10 border-2 border-success rounded-full flex items-center justify-center shrink-0 shadow-sm shadow-success/10">
        <CheckCircle2 className="h-5 w-5 text-success" />
      </div>
    );
  }
  
  if (status === 'in-progress') {
    return (
      <div className="relative z-10 h-10 w-10 bg-bg-surface border-2 border-secondary rounded-full flex items-center justify-center shrink-0 shadow-sm shadow-secondary/20">
        <div className="h-3.5 w-3.5 bg-secondary rounded-full animate-pulse" />
      </div>
    );
  }

  // upcoming
  return (
    <div className="relative z-10 h-10 w-10 bg-bg-surface border-2 border-border rounded-full flex items-center justify-center shrink-0">
      <Circle className="h-4 w-4 text-border" />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LearningRoadmap() {
  const navigate = useNavigate();
  
  const [roadmap, setRoadmap] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Track which milestones are expanded.
  // By default, let's expand the first in-progress one, or just track them in a set.
  const [expandedIds, setExpandedIds] = useState(new Set());

  // Pending updates for individual steps to show loading spinners
  const [togglingStepId, setTogglingStepId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      const [roadmapData, progressVal] = await Promise.all([
        getRoadmap(),
        getOverallProgress()
      ]);
      setRoadmap(roadmapData);
      setProgress(progressVal);

      // Auto-expand the first in-progress milestone
      const inProgress = roadmapData.milestones.find(m => m.status === 'in-progress');
      if (inProgress) {
        setExpandedIds(new Set([inProgress.id]));
      } else if (roadmapData.milestones.length > 0) {
        // fallback expand the first one
        setExpandedIds(new Set([roadmapData.milestones[0].id]));
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleMilestone = (id) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleToggleStep = async (milestoneId, stepId) => {
    if (togglingStepId) return; // prevent double clicks
    
    setTogglingStepId(stepId);
    try {
      // 1. Backend update
      const updatedMilestone = await toggleStep(milestoneId, stepId);
      
      // 2. Refresh overall progress
      const newProgress = await getOverallProgress();
      
      // 3. Update local state
      setRoadmap(prev => ({
        ...prev,
        milestones: prev.milestones.map(m => m.id === milestoneId ? updatedMilestone : m)
      }));
      setProgress(newProgress);
      
    } catch (err) {
      console.error(err);
    } finally {
      setTogglingStepId(null);
    }
  };

  // Formatter for date
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="space-y-6 pt-4 max-w-4xl mx-auto">
        <Skeleton className="h-10 w-64 mb-8" />
        <Skeleton className="h-24 mb-12" />
        <div className="space-y-12 pl-4 border-l-2 border-border">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-32 -ml-10 w-[calc(100%+2.5rem)]" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState onRetry={loadData} />;
  }

  if (!roadmap) {
    return (
      <EmptyState title="No roadmap found" message="We couldn't generate a learning roadmap for you yet." />
    );
  }

  return (
    <div className="space-y-8 pt-4 max-w-4xl mx-auto pb-12">
      <SEO title="Learning Roadmap" noIndex={true} />
      
      {/* ─── Header ────────────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-text-primary mb-2">
          Your Learning Roadmap
        </h1>
        <p className="text-sm text-text-secondary flex items-center gap-2">
          Target Career: <Badge variant="primary" className="font-bold">{roadmap.targetCareer}</Badge>
        </p>
      </div>

      <Card className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-br from-bg-surface to-bg-page border-border shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-text-primary">Journey Progress</h2>
          <p className="text-sm text-text-secondary mt-1 max-w-md">
            Complete milestones step-by-step to bridge your skill gaps and reach your target career.
          </p>
        </div>
        <div className="w-full md:w-auto flex-1 flex md:justify-end">
          <ProgressBar progress={progress} />
        </div>
      </Card>

      {/* ─── Timeline ──────────────────────────────────────────────────────── */}
      <div className="relative pt-6">
        {/* The vertical line behind the icons */}
        <div className="absolute left-5 top-10 bottom-10 w-0.5 bg-border z-0" />

        <div className="space-y-8 relative z-10">
          {roadmap.milestones.map((milestone, idx) => {
            const isExpanded = expandedIds.has(milestone.id);
            const isCompleted = milestone.status === 'completed';
            
            return (
              <div key={milestone.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 relative">
                
                {/* Timeline Icon */}
                <div className="shrink-0 flex sm:flex-col items-center gap-4 sm:gap-2">
                  <MilestoneIcon status={milestone.status} />
                  {/* On mobile, show date next to icon if we want, but it's cleaner inside the card. */}
                </div>

                {/* Milestone Content */}
                <Card 
                  className={`flex-1 transition-all duration-300 overflow-hidden ${
                    milestone.status === 'in-progress' ? 'border-secondary/30 shadow-md' : 
                    isCompleted ? 'border-border bg-bg-page/50' : 'border-border'
                  }`}
                >
                  {/* Header (Clickable to toggle) */}
                  <div 
                    className="p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-bg-page/50 transition-colors"
                    onClick={() => toggleMilestone(milestone.id)}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <Badge 
                          variant={
                            milestone.status === 'completed' ? 'success' : 
                            milestone.status === 'in-progress' ? 'info' : 'secondary'
                          }
                          className="text-[10px] uppercase tracking-wider"
                        >
                          {milestone.status.replace('-', ' ')}
                        </Badge>
                        <span className="text-xs font-semibold text-text-secondary flex items-center gap-1.5 bg-bg-page px-2 py-0.5 rounded-full border border-border">
                          <Calendar className="h-3 w-3" /> {formatDate(milestone.deadline)}
                        </span>
                      </div>
                      <h3 className={`text-lg font-bold leading-tight ${isCompleted ? 'text-text-secondary' : 'text-text-primary'}`}>
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-text-secondary mt-1">
                        Skill focus: <span className="font-semibold">{milestone.relatedSkill}</span>
                      </p>
                    </div>
                    <div className="shrink-0 text-text-secondary p-1">
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </div>

                  {/* Expanded Checklist */}
                  {isExpanded && (
                    <div className="border-t border-border bg-bg-surface p-5">
                      <div className="space-y-3">
                        {milestone.steps.map(step => (
                          <div 
                            key={step.id} 
                            className={`p-3 rounded-lg border transition-all ${
                              step.done 
                                ? 'bg-success/5 border-success/20 text-text-secondary' 
                                : 'bg-bg-page border-border text-text-primary hover:border-secondary/50 hover:bg-secondary/5'
                            }`}
                          >
                            <div className="relative">
                              <Checkbox 
                                checked={step.done}
                                onChange={() => handleToggleStep(milestone.id, step.id)}
                                disabled={togglingStepId !== null}
                                label={step.label}
                              />
                              
                              {/* Spinner overlay if this specific step is toggling */}
                              {togglingStepId === step.id && (
                                <div className="absolute inset-0 bg-bg-page/80 rounded flex items-center justify-center">
                                  <Loader2 className="h-4 w-4 animate-spin text-secondary" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Course Link if present */}
                      {milestone.linkedCourseId && (
                        <div className="mt-5 flex justify-end">
                          <Button 
                            variant="ghost"
                            size="sm"
                            onClick={(e) => { e.stopPropagation(); navigate('/courses'); }}
                            className="flex items-center gap-1.5 text-xs font-bold text-secondary hover:text-primary transition-colors bg-secondary/10 px-3 py-1.5 rounded-full h-auto"
                          >
                            <BookOpen className="h-3.5 w-3.5" /> View related course <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
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
