import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Button component supporting standard variants and sizes.
 * Designed with smooth state transitions, scale changes, and focus indicators.
 *
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'} [props.variant='primary'] - Visual style variant
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Sizing variant
 * @param {string} [props.className=''] - Additional Tailwind classes
 * @param {boolean} [props.isLoading=false] - Whether the button is in a loading state
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  isLoading = false,
  disabled,
  ...props
}) {
  // Common styling for buttons (focus, disable, click feedback)
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95';

  // Theme-aware variant styles utilizing the color design tokens
  const variants = {
    primary: 'bg-primary hover:bg-primary/90 text-white shadow-sm ring-offset-bg-page focus:ring-primary',
    secondary: 'bg-secondary hover:bg-secondary/90 text-white shadow-sm ring-offset-bg-page focus:ring-secondary',
    outline: 'border border-border bg-bg-surface hover:bg-bg-page text-text-primary ring-offset-bg-surface focus:ring-secondary',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-page ring-offset-bg-surface focus:ring-secondary',
  };

  // Size styles
  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-xl',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin shrink-0" />}
      {children}
    </button>
  );
}
