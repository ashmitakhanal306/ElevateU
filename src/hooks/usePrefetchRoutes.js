import { useEffect } from 'react';

/**
 * usePrefetchRoutes
 *
 * Silently pre-downloads lazy-loaded route chunks during browser idle time
 * so that navigating between pages feels instant after the first load.
 *
 * Uses requestIdleCallback (with a setTimeout fallback) so it never competes
 * with the current page's rendering or user interactions.
 *
 * @param {Array<() => Promise<any>>} importers - Array of dynamic import functions, e.g. [() => import('../pages/Dashboard')]
 */
export function usePrefetchRoutes(importers) {
  useEffect(() => {
    const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));

    // Stagger each prefetch slightly so we don't fire them all simultaneously
    const ids = importers.map((importer, i) =>
      schedule(() => {
        // Only prefetch — discard the result, React.lazy will cache it internally
        importer().catch(() => {});
      }, { timeout: 2000 + i * 100 })
    );

    return () => {
      const cancel = window.cancelIdleCallback || clearTimeout;
      ids.forEach((id) => cancel(id));
    };
    // We only want this to run once on mount — importers array is stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
