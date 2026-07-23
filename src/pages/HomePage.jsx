import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Footer from '../components/layout/Footer';
import ThemeToggle from '../components/ui/ThemeToggle';
import logoSrc from '../assets/logo.png';
// Import new sections
import HeroSection from '../components/home/HeroSection';
import StatsStrip from '../components/home/StatsStrip';
import FeaturesGrid from '../components/home/FeaturesGrid';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import CTABanner from '../components/home/CTABanner';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-bg-page transition-colors duration-300 overflow-x-hidden">
      {/* ─── Top Navigation ────────────────────────────────────────────────── */}
      <nav className="h-20 bg-bg-surface border-b border-border flex items-center justify-between px-6 sm:px-10 z-40 relative">
        {/* Logo Left */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => navigate('/')}
        >
          <img src={logoSrc} alt="ElevateU Logo" className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="flex items-center gap-2 pl-4 border-l border-border">
            {isAuthenticated ? (
              <Button variant="primary" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Log in
                </Button>
                <Button variant="primary" onClick={() => navigate('/signup')}>
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ─── Main Content ──────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col w-full">
        <HeroSection />
        <StatsStrip />
        <FeaturesGrid />
        <HowItWorks />
        <Testimonials />
        <CTABanner />
      </main>

      {/* ─── Footer ────────────────────────────────────────────────────────── */}
      <Footer />
      
    </div>
  );
}
