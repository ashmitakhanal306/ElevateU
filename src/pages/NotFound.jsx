import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Compass } from 'lucide-react';
/**
 * NotFound Page (404 Fallback).
 * Rendered when unmatched URL routes are entered.
 */
export default function NotFound() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-page px-6 py-12 transition-colors duration-300"><Card className="max-w-md w-full p-8 text-center border-border shadow-2xl bg-bg-surface">
        {/* Animated Icon Container */}
        <div className="mx-auto w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-8 animate-pulse">
          <Compass className="w-10 h-10" />
        </div>

        <h1 className="text-7xl font-black tracking-tight text-primary mb-2">
          404
        </h1>
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Page Not Found
        </h2>
        <p className="text-text-secondary text-sm mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')} 
            className="w-full sm:w-auto"
          >
            Go home
          </Button>
          {isAuthenticated && (
            <Button 
              variant="primary" 
              onClick={() => navigate('/dashboard')} 
              className="w-full sm:w-auto"
            >
              Go to dashboard
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
