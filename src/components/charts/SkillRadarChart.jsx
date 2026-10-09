import React, { useState, useEffect } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, Legend
} from 'recharts';
import Card from '../ui/Card';

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
export function ReadinessRing({ value, size = 120, stroke = 12 }) {
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
        <span className="text-3xl font-bold text-text-primary leading-none">{value}%</span>
      </div>
    </div>
  );
}

// ─── Radar Chart Panel ──────────────────────────────────────────────────────────
export default function SkillRadarChart({ data, colors }) {
  return (
    <Card className="p-6 h-full flex flex-col">
      <h3 className="font-bold text-sm text-text-secondary uppercase tracking-wide mb-6">
        Current vs Required Proficiency
      </h3>
      <div className="flex-1 min-h-[250px] sm:min-h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke={colors.grid} />
            <PolarAngleAxis dataKey="skill" tick={{ fill: colors.text, fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: colors.text, fontSize: 10 }} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px', color: colors.text }} />
            <Radar name="Required Level" dataKey="requiredScore" stroke={colors.grid} fill={colors.grid} fillOpacity={0.4} />
            <Radar name="Current Level" dataKey="currentScore" stroke={colors.primary} fill={colors.primary} fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
