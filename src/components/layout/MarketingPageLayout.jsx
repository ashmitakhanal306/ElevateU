import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Reusable layout for public marketing pages.
 * Includes Navbar, Header Band, Content Area, and Footer.
 * Also handles smooth scrolling to anchor links (e.g. /#features) on mount.
 */
export default function MarketingPageLayout({ title, subtitle, children }) {
  const location = useLocation();

  // Scroll to hash on mount or when location hash changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Add a slight delay to ensure rendering is complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onMenuToggle={() => {}} />

      <main className="flex-1 pt-16 flex flex-col">
        {/* Standard Header Band */}
        {(title || subtitle) && (
          <div className="bg-bg-page border-b border-border py-16 px-6 sm:px-10 text-center">
            <div className="max-w-4xl mx-auto">
              {title && (
                <h1 className="text-4xl sm:text-5xl font-black text-text-primary tracking-tight mb-4">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-xl text-text-secondary leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 py-12">
          {children || <Outlet />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
