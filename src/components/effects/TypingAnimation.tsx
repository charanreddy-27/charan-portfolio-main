import { useEffect, useState } from 'react';

interface TypingAnimationProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
  className?: string;
}

const TypingAnimation = ({
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

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const currentText = texts[currentIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), delayBetweenTexts);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      }, deletingSpeed);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);

  return (
    <span className={className}>
      <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        {displayText}
      </span>
      <span 
        className={`inline-block w-0.5 h-[1em] bg-gradient-to-b from-primary to-purple-500 ml-1 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        } transition-opacity`}
        style={{ verticalAlign: 'middle' }}
      >
        |
      </span>
    </span>
  );
};

export default TypingAnimation;
