import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook to detect when an element is in the viewport using IntersectionObserver.
 * Also respects prefers-reduced-motion.
 *
 * @param {Object} options - IntersectionObserver options
 * @returns {Object} - { ref, inView }
 */
export function useInView(options = { threshold: 0.1, triggerOnce: true }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (options.triggerOnce && ref.current) {
          observer.unobserve(ref.current);
        }
      } else if (!options.triggerOnce) {
        setInView(false);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.triggerOnce]);

  return { ref, inView };
}
