import React, { useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import { TrendingUp, Activity } from 'lucide-react';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';


/**
 * Themed tooltip that reads bg/border from CSS variables directly.
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

// Helper for semantic bar colors based on score
function getSemanticColor(score) {
  if (score >= 80) return 'var(--color-success)';
  if (score < 50) return 'var(--color-warning)';
  return 'var(--color-primary)';
}

export default function DashboardCharts({ readinessHistory, skillBreakdown }) {

  const C = useMemo(() => {
    return {
      text:      'var(--color-text-secondary)',
      grid:      'var(--color-border)',
      primary:   'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      accent:    'var(--color-accent)',
      surface:   'var(--color-bg-surface)',
    };
  }, []);

  // Empty state check
  const hasHistory = readinessHistory && readinessHistory.length > 0;
  const hasSkills = skillBreakdown && skillBreakdown.length > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Career Readiness Trend (LineChart) */}
      <Card className="p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="h-5 w-5 text-secondary" />
          <h3 className="font-bold text-sm">Career Readiness Trend</h3>
          <span className="ml-auto text-xs text-text-secondary">Last 6 weeks</span>
        </div>
        
        {!hasHistory ? (
          <EmptyState
            icon={TrendingUp}
            title="No history yet"
            message="Take assessments to see your trend over time."
          />
        ) : (
          <ResponsiveContainer width="100%" height={210}>
            <LineChart
              data={readinessHistory}
              margin={{ top: 4, right: 12, left: -16, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="4 4" stroke={C.grid} vertical={false} />
              <XAxis dataKey="week" stroke={C.text} tick={{ fill: C.text, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} stroke={C.text} tick={{ fill: C.text, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
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
        )}
      </Card>

      {/* Right: Skill Breakdown (horizontal BarChart) */}
      <Card className="p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-5">
          <Activity className="h-5 w-5 text-accent" />
          <h3 className="font-bold text-sm">Skill Breakdown</h3>
          <span className="ml-auto text-xs text-text-secondary">Score out of 100</span>
        </div>
        
        {!hasSkills ? (
          <EmptyState
            icon={Activity}
            title="No skills analyzed"
            message="Complete your profile and take an assessment to see your skills."
          />
        ) : (
          <ResponsiveContainer width="100%" height={210}>
            <BarChart
              layout="vertical"
              data={skillBreakdown}
              margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="4 4" stroke={C.grid} horizontal={false} />
              <XAxis type="number" domain={[0, 100]} stroke={C.text} tick={{ fill: C.text, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}`} />
              <YAxis type="category" dataKey="skill" stroke={C.text} tick={{ fill: C.text, fontSize: 11 }} axisLine={false} tickLine={false} width={115} />
              <Tooltip content={<ChartTooltip valueLabel="Score" />} cursor={{ fill: C.grid, opacity: 0.4 }} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {skillBreakdown.map((entry) => (
                  <Cell key={entry.skill} fill={getSemanticColor(entry.value)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>
    </div>
  );
}
