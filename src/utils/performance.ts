import { onCLS, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';
import { useEffect, useState } from 'react';

interface PerformanceData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  timestamp: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, PerformanceData> = new Map();
  private observers: ((data: PerformanceData) => void)[] = [];

  private constructor() {
    this.initializeWebVitals();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private initializeWebVitals() {
    const handleMetric = (metric: Metric) => {
      const data: PerformanceData = {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        timestamp: Date.now(),
      };

      this.metrics.set(metric.name, data);
      this.notifyObservers(data);

      // Log in development only
      if (process.env.NODE_ENV === 'development') {
        console.log(`${metric.name}:`, metric.value, metric.rating);
      }
    };

    // Initialize Web Vitals
    onCLS(handleMetric);
    onFCP(handleMetric);
    onLCP(handleMetric);
    onTTFB(handleMetric);
  }

  private notifyObservers(data: PerformanceData) {
    this.observers.forEach((callback) => callback(data));
  }

  subscribe(callback: (data: PerformanceData) => void) {
    this.observers.push(callback);
    return () => {
      const index = this.observers.indexOf(callback);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }

  getMetrics(): PerformanceData[] {
    return Array.from(this.metrics.values());
  }

  getMetric(name: string): PerformanceData | undefined {
    return this.metrics.get(name);
  }

  // Performance marks for custom timing
  markStart(name: string) {
    performance.mark(`${name}-start`);
  }

  markEnd(name: string) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    const measure = performance.getEntriesByName(name, 'measure')[0];
    if (measure && process.env.NODE_ENV === 'development') {
      console.log(`${name}: ${measure.duration.toFixed(2)}ms`);
    }
  }
}

// React hook for performance monitoring
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceData[]>([]);

  useEffect(() => {
    const monitor = PerformanceMonitor.getInstance();
    
    const unsubscribe = monitor.subscribe((data) => {
      setMetrics((prev) => {
        const filtered = prev.filter((m) => m.name !== data.name);
        return [...filtered, data];
      });
    });

    // Initialize with existing metrics
    setMetrics(monitor.getMetrics());
    
    return unsubscribe;
  }, []);

  return { metrics };
};

// Performance budget checker
export const checkPerformanceBudget = (metrics: PerformanceData[]) => {
  const budgets = {
    FCP: 1800, // First Contentful Paint - 1.8s
    LCP: 2500, // Largest Contentful Paint - 2.5s
    FID: 100,  // First Input Delay - 100ms
    CLS: 0.1,  // Cumulative Layout Shift - 0.1
    TTFB: 800, // Time to First Byte - 800ms
  };

  const violations: string[] = [];

  metrics.forEach((metric) => {
    const budget = budgets[metric.name as keyof typeof budgets];
    if (budget && metric.value > budget) {
      violations.push(`${metric.name}: ${metric.value} (budget: ${budget})`);
    }
  });

  return violations;
};

export default PerformanceMonitor;
