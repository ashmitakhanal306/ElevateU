import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

/**
 * ThemeToggle button component.
 * Uses Sun/Moon icons from lucide-react and toggles dark mode via ThemeContext.
 * Includes elegant hover micro-animations (rotation/tilt) and active scale feedback.
 *
 * @param {Object} props
 * @param {string} [props.className=''] - Custom Tailwind CSS classes
 */
export default function ThemeToggle({ className = '', ...props }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2.5 rounded-xl border border-border bg-bg-surface hover:bg-bg-page text-text-primary shadow-sm transition-all duration-300 active:scale-90 group focus:outline-none focus:ring-2 focus:ring-secondary/50 ${className}`}
      aria-label="Toggle Theme"
      {...props}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-accent transition-transform duration-500 group-hover:rotate-90" />
      ) : (
        <Moon className="h-5 w-5 text-secondary transition-transform duration-500 group-hover:-rotate-12" />
      )}
    </button>
  );
}
