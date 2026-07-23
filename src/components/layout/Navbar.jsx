import React, { useState } from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import ThemeToggle from '../ui/ThemeToggle';
import Button from '../ui/Button';
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
            <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-secondary text-white font-extrabold text-xs shadow-sm shrink-0">
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
          <div className="flex items-center gap-3 pl-3 border-l border-border transition-colors duration-300">
            {/* User Avatar with Initials */}
            <div
              className="h-9 w-9 rounded-full bg-secondary/15 text-secondary border border-secondary/20 flex items-center justify-center font-bold text-xs select-none shadow-inner"
              title={user?.name}
            >
              {user?.initials || 'AM'}
            </div>

            {/* Logout controls (Desktop vs Mobile buttons) */}
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex gap-1.5"
              onClick={handleLogout}
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </Button>
            
            <button
              onClick={handleLogout}
              className="sm:hidden p-2 rounded-xl text-text-secondary hover:bg-bg-page hover:text-danger focus:outline-none transition-colors duration-200"
              aria-label="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

    </nav>
  );
}
