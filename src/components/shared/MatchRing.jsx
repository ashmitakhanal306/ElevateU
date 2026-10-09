import React, { useState, useEffect } from 'react';

export default function MatchRing({ value, size = 48, stroke = 4 }) {
  const [fill, setFill] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setFill(value), 100);
    return () => clearTimeout(t);
  }, [value]);

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (fill / 100) * circumference;

  let colorClass = 'stroke-danger';
  if (value >= 70) colorClass = 'stroke-success';
  else if (value >= 40) colorClass = 'stroke-warning';

  return (
    <div className="relative inline-flex items-center justify-center shrink-0">
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
      <div className="absolute inset-0 flex flex-col items-center justify-center text-xs font-bold text-text-primary">
        {value}%
      </div>
    </div>
  );
}
