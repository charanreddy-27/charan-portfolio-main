import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  isReducedMotion: boolean;
  isHighContrast: boolean;
  isFocusVisible: boolean;
  toggleReducedMotion: () => void;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider = ({ children }: AccessibilityProviderProps) => {
  // Check system preferences for reduced motion
  const getInitialReducedMotion = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  const [isReducedMotion, setIsReducedMotion] = useState(getInitialReducedMotion);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(true);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Handle keyboard navigation vs mouse navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('focus-visible');
        setIsFocusVisible(true);
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('focus-visible');
      setIsFocusVisible(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Apply accessibility classes to the document
  useEffect(() => {
    if (isReducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }

    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [isReducedMotion, isHighContrast]);

  const toggleReducedMotion = () => {
    setIsReducedMotion(prev => !prev);
    localStorage.setItem('reduced-motion', (!isReducedMotion).toString());
  };

  const toggleHighContrast = () => {
    setIsHighContrast(prev => !prev);
    localStorage.setItem('high-contrast', (!isHighContrast).toString());
  };

  // Load saved preferences
  useEffect(() => {
    const savedReducedMotion = localStorage.getItem('reduced-motion');
    const savedHighContrast = localStorage.getItem('high-contrast');

    if (savedReducedMotion !== null) {
      setIsReducedMotion(savedReducedMotion === 'true');
    }

    if (savedHighContrast !== null) {
      setIsHighContrast(savedHighContrast === 'true');
    }
  }, []);

  const value = {
    isReducedMotion,
    isHighContrast,
    isFocusVisible,
    toggleReducedMotion,
    toggleHighContrast,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

// Accessibility controls component
export const AccessibilityControls = () => {
  const { isReducedMotion, isHighContrast, toggleReducedMotion, toggleHighContrast } = useAccessibility();

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-background/80 backdrop-blur-md p-3 rounded-lg shadow-lg border border-border/50">
      <div className="flex flex-col gap-2">
        <button
          onClick={toggleReducedMotion}
          className={`p-2 rounded-md flex items-center gap-2 text-sm ${
            isReducedMotion ? 'bg-primary/20 text-primary' : 'bg-muted hover:bg-muted/80'
          }`}
          aria-pressed={isReducedMotion}
        >
          <span className="sr-only">Toggle reduced motion</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 5.5v13M16 5.5v13M12 3v18M20 12H4" />
          </svg>
          <span>Reduced Motion</span>
        </button>
        
        <button
          onClick={toggleHighContrast}
          className={`p-2 rounded-md flex items-center gap-2 text-sm ${
            isHighContrast ? 'bg-primary/20 text-primary' : 'bg-muted hover:bg-muted/80'
          }`}
          aria-pressed={isHighContrast}
        >
          <span className="sr-only">Toggle high contrast</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2v20M12 12h10" />
          </svg>
          <span>High Contrast</span>
        </button>
      </div>
    </div>
  );
};

export default AccessibilityProvider; 