import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { onAuthStateChange } from './services/authService';
import { useAuthStore } from './store/authStore';

/**
 * App root component.
 * Dynamic basename matches Vite's base URL environment parameter for seamless multi-platform deployment.
 * Listens for Supabase OAuth callback redirects & session events to synchronize global auth state.
 */
export default function App() {
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      if (session?.user && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED')) {
        login(session.user);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [login]);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </BrowserRouter>
  );
}
