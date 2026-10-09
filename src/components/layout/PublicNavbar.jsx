import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import ThemeToggle from '../ui/ThemeToggle';
import Button from '../ui/Button';
import logoSrc from '../../assets/logo.png';

export default function PublicNavbar() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  // Handle Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Features', href: '/#features' },
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 sm:h-20 bg-bg-surface border-b border-border z-40 transition-colors duration-300">
      <div className="flex items-center justify-between px-6 sm:px-10 h-full">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
          {!logoFailed ? (
            <img
              src={logoSrc}
              alt="ElevateU Logo"
              className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-gradient-to-tr from-brand to-brand-2 text-white font-extrabold text-xs shadow-sm shrink-0">
              EU
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.href.startsWith('/#') ? (
              <a key={link.label} href={link.href} className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200">
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.href} className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200">
                {link.label}
              </Link>
            )
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <div className="pl-4 border-l border-border flex items-center gap-2">
            {isAuthenticated ? (
              <Button variant="primary" onClick={() => navigate('/dashboard')} className="text-sm px-4 py-2">
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Log in
                </Button>
                <Button variant="primary" onClick={() => navigate('/signup')} className="text-sm px-4 py-2">
                  Get started
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-text-secondary hover:bg-bg-page focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-bg-surface border-b border-border shadow-lg p-4 flex flex-col gap-4 z-50">
          {navLinks.map((link) => (
            link.href.startsWith('/#') ? (
              <a
                key={link.label}
                href={link.href}
                className="text-base font-medium text-text-secondary hover:text-text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="text-base font-medium text-text-secondary hover:text-text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          ))}
          <div className="border-t border-border pt-4 flex flex-col gap-3">
            {isAuthenticated ? (
              <Button variant="primary" onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false); }}>
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>
                  Log in
                </Button>
                <Button variant="primary" onClick={() => { navigate('/signup'); setMobileMenuOpen(false); }}>
                  Get started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
