import React, { useId } from 'react';

/**
 * Reusable Input component with labels and error handling.
 * Integrates accessibility with React's useId and styles with design tokens.
 *
 * @param {Object} props
 * @param {string} [props.label] - Field label text
 * @param {string} [props.error] - Optional validation error message
 * @param {string} [props.type='text'] - Input type (text, password, email, etc)
 * @param {string} [props.className=''] - Custom CSS class overrides
 */
export default function Input({
  label,
  error,
  type = 'text',
  className = '',
  ref,
  ...props
}) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold text-text-secondary select-none tracking-wide"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        className={`w-full px-4 py-2.5 text-sm rounded-xl bg-bg-surface border ${
          error
            ? 'border-danger focus:ring-danger/25 focus:border-danger'
            : 'border-border focus:ring-secondary/25 focus:border-secondary'
        } text-text-primary placeholder-text-secondary/40 focus:outline-none focus:ring-4 transition-all duration-200 disabled:opacity-50 disabled:bg-bg-page/50 ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs font-medium text-danger select-none">
          {error}
        </span>
      )}
    </div>
  );
}
