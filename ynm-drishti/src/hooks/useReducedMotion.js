import { useState, useEffect } from 'react';

/**
 * Hook to detect if user prefers reduced motion
 * Respects accessibility settings
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if matchMedia is available
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
};

/**
 * Returns animation props that respect reduced motion preferences
 */
export const useAccessibleAnimation = (normalAnimation, reducedAnimation = {}) => {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? reducedAnimation : normalAnimation;
};

export default useReducedMotion;
