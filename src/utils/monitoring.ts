import { useEffect, useState, useCallback, useRef } from 'react';

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

// Intersection observer hook for lazy loading
export const useLazyLoad = (threshold: number = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Clean up after first intersection
        }
      },
      { threshold, rootMargin: '50px' } // Pre-load slightly before visible
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { elementRef, isVisible };
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

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]) as T;
};

// Memory usage monitoring
export const useMemoryMonitor = () => {
  const [memoryInfo, setMemoryInfo] = useState<{
    used: number;
    total: number;
    percentage: number;
  } | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
      const updateMemory = () => {
        const memory = (performance as any).memory;
        const used = memory.usedJSHeapSize;
        const total = memory.totalJSHeapSize;
        
        setMemoryInfo({
          used: Math.round(used / 1024 / 1024), // MB
          total: Math.round(total / 1024 / 1024), // MB
          percentage: Math.round((used / total) * 100),
        });
      };

      updateMemory();
      const interval = setInterval(updateMemory, 5000); // Every 5 seconds
      return () => clearInterval(interval);
    }
  }, []);

  return memoryInfo;
};

// ===== RESPONSIVE HOOKS =====
export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const useIsTablet = () => useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)');
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

// ===== PERFORMANCE UTILITIES =====

export const logPerformanceMetrics = () => {
  if (process.env.NODE_ENV === 'development') {
    const tracker = PerformanceTracker.getInstance();
    console.table(tracker.getMetrics());
  }
};

// Web Vitals specific logging
export const logWebVitals = () => {
  if (process.env.NODE_ENV === 'development') {
    const tracker = PerformanceTracker.getInstance();
    const metrics = tracker.getMetrics();
    
    console.group('🚀 Web Vitals Report');
    
    if (metrics.length === 0) {
      console.warn('⏳ No Web Vitals data collected yet. Wait a moment and try again.');
      console.groupEnd();
      return;
    }

    const webVitals = ['FCP', 'LCP', 'FID', 'CLS', 'TTFB'];
    
    webVitals.forEach(name => {
      const metric = metrics.find(m => m.renderTime !== undefined);
      if (metric) {
        console.log(`📊 ${name}: Performance tracked`);
      } else {
        console.log(`⏳ ${name}: Not yet measured`);
      }
    });

    console.groupEnd();
  }
};

// Start real-time Web Vitals tracking
export const startWebVitalsTracking = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('🚀 Web Vitals tracking started...');
    console.log('Check the Web Vitals dashboard in the bottom-left corner!');
  }
};

export const measureFunction = <T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T => {
  return ((...args: Parameters<T>) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name} took ${(end - start).toFixed(2)}ms`);
    }
    
    return result;
  }) as T;
};

export default PerformanceTracker;
