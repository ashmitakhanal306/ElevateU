import React, { useState, useEffect, useMemo } from 'react';
import SEO from '../components/SEO';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, Cell 
} from 'recharts';
import { Target, CheckCircle2, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';

import { getRecommendations, getSkillGapAnalysis } from '../services/careerService';
import { useTheme } from '../hooks/useTheme';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';



// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (<div
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
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Memoize the chart color variables configuration so it is only recalculated
  // when the theme toggles (light <-> dark), preventing unnecessary re-renders.
  const C = useMemo(() => {
    return {
      text:      'var(--color-text-secondary)',
      grid:      'var(--color-border)',
      primary:   'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      warning:   'var(--color-warning)',
      surface:   'var(--color-bg-surface)',
    };
  }, [theme]);

  // Selected career ID (from router state or dropdown)
  const [selectedCareerId, setSelectedCareerId] = useState(location.state?.careerId || null);
  
  // Data state
  const [careersList, setCareersList] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  
  // Loading states
  const [loadingList, setLoadingList] = useState(true);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [errorAnalysis, setErrorAnalysis] = useState(false);

  // 1. Fetch the list of careers to populate the dropdown
  useEffect(() => {
    getRecommendations().then((data) => {
      setCareersList(data);
      setLoadingList(false);
      
      // Auto-select top match if nothing is pre-selected
      if (!selectedCareerId && data.length > 0) {
        setSelectedCareerId(data[0].id);
      }
    });
  }, []); // Only run once on mount

  // 2. Fetch the analysis whenever selectedCareerId changes
  const fetchAnalysis = () => {
    if (!selectedCareerId) return;
    
    setLoadingAnalysis(true);
    setErrorAnalysis(false);
    getSkillGapAnalysis(selectedCareerId)
      .then((data) => {
        setAnalysis(data);
        setLoadingAnalysis(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorAnalysis(true);
        setLoadingAnalysis(false);
      });
  };

  useEffect(() => {
    fetchAnalysis();
  }, [selectedCareerId]);

  // Handle dropdown change
  const handleCareerChange = (e) => {
    setSelectedCareerId(e.target.value);
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

  return (
    <div className="space-y-6 pt-4 text-left">
      <SEO title="Skill Gap Analysis" noIndex={true} />
      
      {/* ── Header & Dropdown ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-text-primary">
            Skill Gap Analysis
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Compare your current skills against career requirements.
          </p>
        </div>
        
        {/* Career Selector */}
        <div className="w-full sm:w-64">
          <select
            value={selectedCareerId || ''}
            onChange={handleCareerChange}
            disabled={loadingList}
            className="w-full bg-bg-surface border border-border text-text-primary text-sm rounded-xl focus:ring-secondary focus:border-secondary block p-2.5 transition-colors duration-200 shadow-sm"
          >
            {loadingList && <option>Loading careers...</option>}
            {!loadingList && careersList.map(c => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.matchPercent}% Match)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Main Content ───────────────────────────────────────────────────── */}
      {loadingAnalysis || !analysis ? (
        renderSkeleton()
      ) : errorAnalysis ? (
        <ErrorState onRetry={fetchAnalysis} />
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
