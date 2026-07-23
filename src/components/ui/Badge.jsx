import React from 'react';

/**
 * Reusable Badge pill component.
 * Supports status variants matching the design colors: success, warning, danger, and info.
 * Note: 'info' maps to the 'accent' theme color token.
 *
 * @param {Object} props
 * @param {'success'|'warning'|'danger'|'info'} [props.variant='info'] - Badge color variation
 * @param {string} [props.className=''] - Custom Tailwind CSS classes
 */
export default function Badge({ children, variant = 'info', className = '', ...props }) {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold select-none border transition-colors duration-300';

  // Variant classes mapping to corresponding colors
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    danger: 'bg-danger/10 text-danger border-danger/20',
    info: 'bg-accent/10 text-accent border-accent/20',
  };

  return (
    <span
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
