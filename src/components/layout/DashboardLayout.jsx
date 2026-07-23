import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ChatWidget from '../chatbot/ChatWidget';
import ErrorBoundary from '../ErrorBoundary';

/**
 * DashboardLayout component.
 * Integrates the Navbar, Sidebar, and page Outlet.
 * Manages mobile drawer toggle states and content area offsets.
 */
export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-page text-text-primary transition-colors duration-300">
      {/* Top Fixed Navbar */}
      <Navbar onMenuToggle={toggleSidebar} />

      {/* Layout Wrapper (displaces content below the fixed 16px/64px Navbar height) */}
      <div className="flex flex-1 pt-16 relative">
        {/* Responsive Side Panel */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Content area: Offset on desktop by the sidebar width (w-64) */}
        <div className="flex-1 flex flex-col md:pl-64 transition-all duration-300">
          <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto relative">
            <div key={location.pathname} className="animate-page">
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </div>
          </main>
        </div>
      </div>

      {/* Floating AI Chat Assistant */}
      <ChatWidget />
    </div>
  );
}
