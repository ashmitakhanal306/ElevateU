import { useEffect } from 'react';

/**
 * usePrefetchRoutes
 *
 * Silently pre-downloads lazy-loaded route chunks during browser idle time
 * so that navigating between pages feels instant after the first load.
 *
 * Uses requestIdleCallback (with a staggered setTimeout fallback) so it never competes
 * with the current page's rendering or user interactions.
 *
 * @param {Array<() => Promise<any>>} importers - Array of dynamic import functions
 */
export function usePrefetchRoutes(importers) {
  useEffect(() => {
    if (typeof window === 'undefined' || !Array.isArray(importers) || importers.length === 0) return;

    const hasIdle = typeof window.requestIdleCallback === 'function';
    const schedule = hasIdle
      ? (cb, delay) => window.requestIdleCallback(cb, { timeout: delay })
      : (cb, delay) => setTimeout(cb, delay);

    const cancel = hasIdle
      ? (id) => window.cancelIdleCallback(id)
      : (id) => clearTimeout(id);

    // Stagger prefetch requests starting after 1.5s so initial render is completely free
    const ids = importers.map((importer, i) =>
      schedule(() => {
        importer().catch(() => {});
      }, 1500 + i * 100)
    );

    return () => {
      ids.forEach((id) => cancel(id));
    };
  }, [importers]);
}
