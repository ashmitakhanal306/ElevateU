import React, { useId } from 'react';

/**
 * Reusable Checkbox component.
 * Integrates accessibility with React's useId and styles with design tokens.
 *
 * @param {Object} props
 * @param {string} [props.label] - Checkbox text label
 * @param {boolean} [props.checked] - Checked state
 * @param {function} [props.onChange] - Change handler callback
 * @param {boolean} [props.disabled] - Disabled state
 * @param {string} [props.className=''] - Custom wrapper CSS overrides
 * @param {Object} [props.ref] - Forwarded ref for input element
 */
export default function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  className = '',
  ref,
  ...props
}) {
  const id = useId();

  return (
    <div className={`flex items-start gap-2.5 text-left ${className}`}>
      <label className="relative flex items-center h-5 mt-0.5 select-none shrink-0 cursor-pointer">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        {/* Custom styled checkbox indicator */}
        <div 
          className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
            checked 
              ? 'bg-secondary border-secondary text-white' 
              : 'border-border bg-bg-surface hover:border-secondary/50 peer-focus-visible:border-secondary'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {checked && (
            <svg 
              className="h-3 w-3 fill-current" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
            </svg>
          )}
        </div>
      </label>
      {label && (
        <label
          htmlFor={id}
          className={`text-sm font-medium leading-tight select-none pt-0.5 cursor-pointer text-text-primary ${
            checked ? 'line-through opacity-70' : ''
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {label}
        </label>
      )}
    </div>
  );
}
