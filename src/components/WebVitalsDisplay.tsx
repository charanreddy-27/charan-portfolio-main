import React, { useState } from 'react';
import PerformanceMonitor, { checkPerformanceBudget, usePerformanceMonitor } from '../utils/performance';

// Web Vitals Dashboard Component
export const WebVitalsDisplay = () => {
  const { metrics } = usePerformanceMonitor();
  const violations = checkPerformanceBudget(metrics);
  const [isOpen, setIsOpen] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  const getScoreColor = (rating: string) => {
    switch (rating) {
      case 'good': return '#0CCE6B';
      case 'needs-improvement': return '#FFA400';
      case 'poor': return '#FF4E42';
      default: return '#666';
    }
  };

  const getScoreLabel = (rating: string) => {
    switch (rating) {
      case 'good': return '✅ Good';
      case 'needs-improvement': return '⚠️ Needs Improvement';
      case 'poor': return '❌ Poor';
      default: return '⏳ Loading...';
    }
  };

  const formatValue = (name: string, value: number) => {
    switch (name) {
      case 'CLS':
        return value.toFixed(3);
      case 'FID':
      case 'FCP':
      case 'LCP':
      case 'TTFB':
        return `${Math.round(value)}ms`;
      default:
        return value.toString();
    }
  };

  const webVitalsInfo = {
    FCP: 'First Contentful Paint - When first text/image appears',
    LCP: 'Largest Contentful Paint - When main content loads',
    FID: 'First Input Delay - Time to interactive',
    CLS: 'Cumulative Layout Shift - Visual stability',
    TTFB: 'Time to First Byte - Server response time'
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          background: 'rgba(0, 0, 0, 0.9)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '20px',
          cursor: 'pointer',
          zIndex: 10001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
        }}
        title={isOpen ? 'Close Web Vitals Dashboard' : 'Open Web Vitals Dashboard'}
        aria-label={isOpen ? 'Close Web Vitals Dashboard' : 'Open Web Vitals Dashboard'}
      >
        {isOpen ? '✕' : '📊'}
      </button>

      {/* Dashboard Panel */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            bottom: '80px',
            left: '20px',
            background: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            fontFamily: 'monospace',
            fontSize: '12px',
            maxWidth: '400px',
            zIndex: 10000,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
          className="web-vitals-dashboard"
        >
          <h3 style={{ margin: '0 0 15px 0', color: '#60A5FA', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🚀 Web Vitals Dashboard
            <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 'normal' }}>
              (Dev Only)
            </span>
          </h3>
          
          {metrics.length === 0 ? (
            <div style={{ color: '#FFA400' }}>⏳ Loading Web Vitals...</div>
          ) : (
            <>
              <div style={{ marginBottom: '15px' }}>
                {Object.entries(webVitalsInfo).map(([key, description]) => {
                  const metric = metrics.find(m => m.name === key);
                  return (
                    <div key={key} style={{ 
                      marginBottom: '8px', 
                      padding: '8px', 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '5px'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                      }}>
                        <strong style={{ color: '#E5E7EB' }}>{key}:</strong>
                        {metric ? (
                          <span style={{ 
                            color: getScoreColor(metric.rating),
                            fontWeight: 'bold'
                          }}>
                            {formatValue(key, metric.value)}
                          </span>
                        ) : (
                          <span style={{ color: '#666' }}>-</span>
                        )}
                      </div>
                      <div style={{ 
                        fontSize: '10px', 
                        color: '#9CA3AF', 
                        marginTop: '2px' 
                      }}>
                        {description}
                      </div>
                      {metric && (
                        <div style={{ 
                          fontSize: '10px', 
                          color: getScoreColor(metric.rating),
                          marginTop: '2px'
                        }}>
                          {getScoreLabel(metric.rating)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {violations.length > 0 && (
                <div style={{
                  backgroundColor: 'rgba(255, 78, 66, 0.2)',
                  padding: '10px',
                  borderRadius: '5px',
                  borderLeft: '3px solid #FF4E42'
                }}>
                  <div style={{ color: '#FF4E42', fontWeight: 'bold', marginBottom: '5px' }}>
                    ⚠️ Performance Issues:
                  </div>
                  {violations.map((violation, index) => (
                    <div key={index} style={{ color: '#FCA5A5', fontSize: '10px' }}>
                      • {violation}
                    </div>
                  ))}
                </div>
              )}

              <div style={{ 
                marginTop: '10px', 
                fontSize: '10px', 
                color: '#6B7280',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                paddingTop: '8px'
              }}>
                📊 Collected: {metrics.length} metrics
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

// Web Vitals Hook for custom usage
export const useWebVitals = () => {
  const { metrics } = usePerformanceMonitor();
  
  const getWebVital = (name: string) => {
    return metrics.find(m => m.name === name);
  };

  const getAllWebVitals = () => {
    return {
      FCP: getWebVital('FCP'),
      LCP: getWebVital('LCP'),
      FID: getWebVital('FID'),
      CLS: getWebVital('CLS'),
      TTFB: getWebVital('TTFB'),
    };
  };

  const getOverallScore = () => {
    const vitals = Object.values(getAllWebVitals()).filter(Boolean);
    if (vitals.length === 0) return null;

    const scores = vitals.map(vital => {
      switch (vital?.rating) {
        case 'good': return 100;
        case 'needs-improvement': return 50;
        case 'poor': return 0;
        default: return 0;
      }
    });

    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  return {
    metrics,
    getWebVital,
    getAllWebVitals,
    getOverallScore,
    violations: checkPerformanceBudget(metrics),
  };
};

// Performance Logger Utility
export const logWebVitals = () => {
  const monitor = PerformanceMonitor.getInstance();
  const metrics = monitor.getMetrics();
  
  console.group('🚀 Web Vitals Report');
  
  if (metrics.length === 0) {
    console.warn('⏳ No Web Vitals data collected yet. Wait a moment and try again.');
    console.groupEnd();
    return;
  }

  const webVitals = ['FCP', 'LCP', 'FID', 'CLS', 'TTFB'];
  
  webVitals.forEach(name => {
    const metric = metrics.find(m => m.name === name);
    if (metric) {
      const icon = metric.rating === 'good' ? '✅' : 
                   metric.rating === 'needs-improvement' ? '⚠️' : '❌';
      
      console.log(`${icon} ${name}: ${
        name === 'CLS' ? metric.value.toFixed(3) : `${Math.round(metric.value)}ms`
      } (${metric.rating})`);
    } else {
      console.log(`⏳ ${name}: Not yet measured`);
    }
  });

  // Performance budget check
  const violations = checkPerformanceBudget(metrics);
  if (violations.length > 0) {
    console.warn('🚨 Performance Budget Violations:');
    violations.forEach(violation => console.warn(`  • ${violation}`));
  } else {
    console.log('✅ All Web Vitals within performance budget!');
  }

  console.groupEnd();
};

// Real-time Web Vitals Tracker
export const startWebVitalsTracking = () => {
  const monitor = PerformanceMonitor.getInstance();
  
  console.log('🚀 Web Vitals tracking started...');
  
  return monitor.subscribe((data) => {
    const icon = data.rating === 'good' ? '✅' : 
                 data.rating === 'needs-improvement' ? '⚠️' : '❌';
    
    const value = data.name === 'CLS' ? 
                  data.value.toFixed(3) : 
                  `${Math.round(data.value)}ms`;
    
    console.log(`${icon} ${data.name}: ${value} (${data.rating})`);
  });
};

export default WebVitalsDisplay;
