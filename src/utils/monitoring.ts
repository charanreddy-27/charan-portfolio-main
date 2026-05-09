import { useEffect, useRef, useState, useCallback } from 'react';

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
    return recentMetrics.length > 0 
      ? recentMetrics.reduce((sum, m) => sum + m.renderTime, 0) / recentMetrics.length
      : 0;
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
  }, [componentName]);

  return PerformanceTracker.getInstance();
};

// Optimized scroll hook with requestAnimationFrame throttling
export const useOptimizedScroll = (callback: (scrollY: number) => void, delay: number = 16) => {
  const rafRef = useRef<number>();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastTimeRef = useRef<number>(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      
      if (now - lastTimeRef.current >= delay) {
        lastTimeRef.current = now;
        callback(window.scrollY);
      } else if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          callback(window.scrollY);
          rafRef.current = undefined;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [callback, delay]);
};

// Debounce hook for event handlers
export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

// Lazy load hook with Intersection Observer
export const useLazyLoad = (callback: () => void, options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [callback, options]);

  return ref;
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
    console.log('Performance Metrics:', {
      averageRenderTime: tracker.getAverageRenderTime().toFixed(2) + 'ms',
      metrics: tracker.getMetrics(),
    });
  }
};

// Request idle callback wrapper with fallback
export const scheduleIdleCallback = (callback: () => void) => {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback);
  } else {
    setTimeout(callback, 0);
  }
};

export default PerformanceTracker;
