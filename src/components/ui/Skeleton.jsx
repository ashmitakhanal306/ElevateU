import React from 'react';

/**
 * A reusable loading skeleton component.
 * Applies standard pulse animation and generic coloring.
 */
export default function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-border/60 rounded-xl ${className}`} />
  );
}
