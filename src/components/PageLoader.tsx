import { useEffect, useState } from "react";

/**
 * Branded page loader with "CR" initials, orbital ring animation,
 * pulsing gradient glow, and a progress bar — replaces the generic spinner.
 */
const PageLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate perceived progress for better UX
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        // Fast at first, then slow down
        const increment = Math.max(1, 10 - Math.floor(prev / 10));
        return Math.min(prev + increment, 90);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-loader" role="status" aria-label="Loading page content">
      {/* Ambient glow backdrop */}
      <div className="page-loader__glow" />

      {/* Logo mark */}
      <div className="page-loader__mark">
        {/* Orbital ring */}
        <div className="page-loader__orbit" />

        {/* Inner initials */}
        <span className="page-loader__initials">CR</span>
      </div>

      {/* Progress bar */}
      <div className="page-loader__track">
        <div
          className="page-loader__bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading label */}
      <p className="page-loader__label">Loading&hellip;</p>

      {/* Screen reader text */}
      <span className="sr-only">Loading page, please wait.</span>
    </div>
  );
};

export default PageLoader;
