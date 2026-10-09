import React, { useState } from 'react';
import { Menu, LogOut, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import ThemeToggle from '../ui/ThemeToggle';

import { useNavigate } from 'react-router-dom';
// Vite requires static assets inside src/ to be imported as ES modules.
// If logo.png doesn't exist yet, the onError fallback below renders the "EU" badge instead.
import logoSrc from '../../assets/logo.png';

/**
 * Navbar layout component.
 * Features fixed top positioning, visual transitions, logo with error state fallback,
 * responsive toggles, and contextual actions based on auth state.
 *
 * @param {Object} props
 * @param {Function} props.onMenuToggle - Triggers mobile sidebar drawer visibility
 */
export default function Navbar({ onMenuToggle }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [logoFailed, setLogoFailed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-bg-surface border-b border-border flex items-center justify-between px-4 sm:px-6 z-40 transition-colors duration-300">
      
      {/* Brand logo & mobile menu triggers */}
      <div className="flex items-center gap-3">
        {isAuthenticated && (
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-xl text-text-secondary hover:bg-bg-page hover:text-text-primary focus:outline-none transition-colors duration-200"
            aria-label="Open navigation sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        
        <div className="flex items-center gap-3 group cursor-pointer select-none" onClick={() => navigate('/')}>
          {!logoFailed ? (
            <img
              src={logoSrc}
              alt="ElevateU Logo"
              className="h-8 w-auto object-contain"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-gradient-to-tr from-brand to-brand-2 text-white font-extrabold text-xs shadow-sm shrink-0">
              EU
            </div>
          )}
          <span className="hidden sm:inline-block text-xs text-text-secondary font-medium tracking-normal border-l border-border pl-3 mt-0.5">
            Elevate Your Skills. Define Your Future.
          </span>
        </div>
      </div>

      {/* Theme Toggling & User Profiles */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        
        {isAuthenticated && (
          <div className="flex items-center gap-3 pl-3 border-l border-border transition-colors duration-300 relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="h-9 w-9 rounded-full bg-secondary/15 text-secondary border border-secondary/20 flex items-center justify-center font-bold text-xs select-none shadow-inner cursor-pointer hover:ring-2 hover:ring-secondary/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary"
              title={user?.name || 'Your Profile'}
              aria-label="User menu"
              aria-expanded={menuOpen}
            >
              {user?.name ? (
                user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
              ) : (
                <User className="h-4 w-4" />
              )}
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <div className="absolute top-12 right-0 w-48 bg-bg-surface border border-border rounded-xl shadow-lg z-50 overflow-hidden flex flex-col py-1">
                  <button
                    onClick={() => { setMenuOpen(false); navigate('/profile'); }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-bg-page hover:text-text-primary text-left"
                  >
                    <User className="h-4 w-4" /> Profile
                  </button>
                  <div className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-bg-page hover:text-text-primary">
                    <ThemeToggle /> <span className="ml-1">Theme</span>
                  </div>
                  <div className="border-t border-border my-1" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger/10 text-left"
                  >
                    <LogOut className="h-4 w-4" /> Log out
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

    </nav>
  );
}
