import { useEffect, useState, useMemo, useRef, memo } from 'react';

interface TypingAnimationProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
  className?: string;
}

const TypingAnimation = memo(({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 2000,
  className = ''
}: TypingAnimationProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const cursorIntervalRef = useRef<NodeJS.Timeout>();

  // Optimize cursor blinking with CSS animation instead of state updates
  // Only create blinking effect if needed
  useMemo(() => {
    // Add CSS animation if not already added
    if (!document.getElementById('cursor-blink-animation')) {
      const style = document.createElement('style');
      style.id = 'cursor-blink-animation';
      style.textContent = `
        @keyframes cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .typing-cursor-animated {
          animation: cursor-blink 1s infinite;
          will-change: opacity;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    // Cursor blinking with RAF instead of interval (better performance)
    let lastBlink = Date.now();
    let animationFrameId: number;

    const updateCursor = () => {
      const now = Date.now();
      if (now - lastBlink > 530) {
        setShowCursor((prev) => !prev);
        lastBlink = now;
      }
      animationFrameId = requestAnimationFrame(updateCursor);
    };

    animationFrameId = requestAnimationFrame(updateCursor);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const currentText = texts[currentIndex];

    if (!isDeleting && displayText === currentText) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), delayBetweenTexts);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    } else if (isDeleting) {
      timeoutRef.current = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      }, deletingSpeed);
    } else {
      timeoutRef.current = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }, typingSpeed);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayText, isDeleting, currentIndex, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);

  return (
    <span className={className}>
      <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent will-change-transform">
        {displayText}
      </span>
      <span 
        className={`inline-block w-0.5 h-[1em] bg-gradient-to-b from-primary to-purple-500 ml-1 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        } transition-opacity will-change-opacity`}
        style={{ verticalAlign: 'middle' }}
      >
        |
      </span>
    </span>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for memo - only re-render if texts change
  return (
    JSON.stringify(prevProps.texts) === JSON.stringify(nextProps.texts) &&
    prevProps.typingSpeed === nextProps.typingSpeed &&
    prevProps.deletingSpeed === nextProps.deletingSpeed &&
    prevProps.delayBetweenTexts === nextProps.delayBetweenTexts &&
    prevProps.className === nextProps.className
  );
});

TypingAnimation.displayName = 'TypingAnimation';

export default TypingAnimation;
