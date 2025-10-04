import { useEffect, useRef, useState } from 'react';

// ===== PERFORMANCE MONITORING =====

interface PerformanceMetrics {
  renderTime: number;
  componentCount: number;
  memoryUsage?: number;
  timestamp: number;
}

class PerformanceTracker {
  private static instance: PerformanceTracker;
  private metrics: PerformanceMetrics[] = [];
  private renderStart: number = 0;

  static getInstance(): PerformanceTracker {
    if (!PerformanceTracker.instance) {
      PerformanceTracker.instance = new PerformanceTracker();
    }
    return PerformanceTracker.instance;
  }

  startRender(componentName: string) {
    if (process.env.NODE_ENV === 'development') {
      this.renderStart = performance.now();
      performance.mark(`${componentName}-render-start`);
    }
  }

  endRender(componentName: string) {
    if (process.env.NODE_ENV === 'development') {
      const renderTime = performance.now() - this.renderStart;
      performance.mark(`${componentName}-render-end`);
      performance.measure(`${componentName}-render`, `${componentName}-render-start`, `${componentName}-render-end`);
      
      if (renderTime > 16) { // More than 16ms = potential frame drop
        console.warn(`⚠️ Slow render: ${componentName} took ${renderTime.toFixed(2)}ms`);
      }

      this.metrics.push({
        renderTime,
        componentCount: document.querySelectorAll('*').length,
        memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
        timestamp: Date.now(),
      });
    }
  }

  getMetrics(): PerformanceMetrics[] {
    return this.metrics.slice(-50); // Keep last 50 metrics
  }

  getAverageRenderTime(): number {
    const recentMetrics = this.getMetrics().slice(-10);
    return recentMetrics.reduce((sum, m) => sum + m.renderTime, 0) / recentMetrics.length;
  }
}

// ===== REACT HOOKS =====

// Performance monitoring hook
export const usePerformanceTracking = (componentName: string) => {
  useEffect(() => {
    const tracker = PerformanceTracker.getInstance();
    tracker.startRender(componentName);
    
    return () => {
      tracker.endRender(componentName);
    };
  });

  return PerformanceTracker.getInstance();
};

// Optimized scroll hook with throttling
export const useOptimizedScroll = (callback: (scrollY: number) => void, delay: number = 16) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callback(window.scrollY);
      }, delay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [callback, delay]);
};



// Media query hook with performance optimization
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

// ===== RESPONSIVE HOOKS =====
export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

// ===== PERFORMANCE UTILITIES =====

export const logPerformanceMetrics = () => {
  if (process.env.NODE_ENV === 'development') {
    const tracker = PerformanceTracker.getInstance();
    console.table(tracker.getMetrics());
  }
};

export default PerformanceTracker;
