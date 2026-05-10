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
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Inject cursor blinking CSS animation once
  useMemo(() => {
    if (!document.getElementById('typing-cursor-styles')) {
      const style = document.createElement('style');
      style.id = 'typing-cursor-styles';
      style.textContent = `
        @keyframes typing-cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .typing-cursor {
          animation: typing-cursor-blink 1s infinite steps(1);
          will-change: opacity;
          contain: layout;
        }
      `;
      document.head.appendChild(style);
    }
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
        className="typing-cursor inline-block w-0.5 h-[1em] bg-gradient-to-b from-primary to-purple-500 ml-1"
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
