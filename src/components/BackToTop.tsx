import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        setScrollProgress(progress);
        setIsVisible(scrollTop > 300);
      }, 50); // Throttle to every 50ms for smooth progress
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  };

  // Calculate circle progress (circumference)
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-8 right-8 z-40"
        >
          <motion.button
            onClick={scrollToTop}
            onKeyDown={handleKeyDown}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all duration-300 group"
            aria-label={`Scroll back to top (${Math.round(scrollProgress)}% scrolled)`}
            role="button"
            tabIndex={0}
          >
            {/* Progress Circle SVG */}
            <svg
              className="absolute inset-0 -rotate-90 w-full h-full"
              style={{ transform: "rotate(-90deg)" }}
            >
              {/* Background circle */}
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-primary-foreground/20"
              />
              {/* Progress circle */}
              <motion.circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                className="text-primary-foreground"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                }}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.1 }}
              />
            </svg>

            {/* Arrow Icon */}
            <motion.div
              className="relative z-10"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUp className="h-5 w-5" />
            </motion.div>

            {/* Tooltip */}
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-md bg-foreground text-background text-sm whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              Back to top ({Math.round(scrollProgress)}%)
            </motion.span>
          </motion.button>

          {/* Scroll Progress Bar (linear) */}
          <motion.div
            className="absolute bottom-full mb-2 right-0 w-12 h-1 bg-muted rounded-full overflow-hidden"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 48 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="h-full bg-primary"
              style={{ width: `${scrollProgress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${scrollProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
