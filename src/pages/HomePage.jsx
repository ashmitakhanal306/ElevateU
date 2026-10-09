import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Footer from '../components/layout/Footer';
import PublicNavbar from '../components/layout/PublicNavbar';
// Import new sections
import HeroSection from '../components/home/HeroSection';
import FeaturesGrid from '../components/home/FeaturesGrid';
import HowItWorks from '../components/home/HowItWorks';
import CTABanner from '../components/home/CTABanner';

export default function HomePage() {
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
      <PublicNavbar />

      {/* ─── Main Content ──────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col w-full">
        <HeroSection />
        <FeaturesGrid />
        <HowItWorks />
        <CTABanner />
      </main>

      {/* ─── Footer ────────────────────────────────────────────────────────── */}
      <Footer />
      
    </div>
  );
}
