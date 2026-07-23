import React from 'react';

/**
 * Reusable Card container component.
 * Uses bg-surface, border, and rounded styling that adapt to dark mode automatically.
 *
 * @param {Object} props
 * @param {string} [props.className=''] - Additional custom CSS class names
 */
export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-bg-surface border border-border rounded-2xl shadow-sm transition-all duration-300 ${
        props.onClick ? 'hover:shadow-md hover:border-secondary/30 cursor-pointer active:scale-[0.99]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
