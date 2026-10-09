import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, User, ClipboardCheck, Compass, 
  BarChart3, FileText, BookOpen, Map, X 
} from 'lucide-react';

/**
 * Sidebar navigation component.
 * Stays fixed on desktop and turns into a slide-over overlay drawer on mobile viewports.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls visibility of the mobile slide-in menu drawer
 * @param {Function} props.onClose - Call to close the drawer menu
 */
export default function Sidebar({ isOpen, onClose }) {
  // Navigation items grouped into logical sections matching the user journey
  const navGroups = [
    {
      label: 'Discover',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/profile', label: 'Student Profile', icon: User },
        { path: '/assessment', label: 'Skill Assessment', icon: ClipboardCheck },
      ],
    },
    {
      label: 'Improve',
      items: [
        { path: '/career-recommendations', label: 'Career Matches', icon: Compass },
        { path: '/skill-gap', label: 'Skill Gap Analysis', icon: BarChart3 },
        { path: '/resume-analysis', label: 'Resume Analysis', icon: FileText },
      ],
    },
    {
      label: 'Apply',
      items: [
        { path: '/courses', label: 'Courses & Jobs', icon: BookOpen },
        { path: '/roadmap', label: 'Learning Roadmap', icon: Map },
      ],
    },
  ];

  // Dynamic CSS classes for active links targeting color tokens
  const linkClasses = ({ isActive }) => {
    const base = 'flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 select-none';
    if (isActive) {
      return `${base} bg-primary/10 text-primary dark:bg-accent/15 dark:text-accent`;
    }
    return `${base} text-text-secondary hover:text-text-primary hover:bg-bg-page`;
  };

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-45 md:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar Panel Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-bg-surface border-r border-border z-50 md:z-30 md:top-16 flex flex-col transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header Inside Drawer */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border md:hidden bg-bg-surface">
          <span className="font-extrabold text-text-primary text-sm tracking-wide">
            Navigation Menu
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-text-secondary hover:bg-bg-page hover:text-text-primary focus:outline-none transition-colors duration-200"
            aria-label="Close navigation panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Navigation List with Grouped Sections */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="px-4 mb-2 text-[11px] font-bold uppercase tracking-widest text-text-secondary/60">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={linkClasses}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
