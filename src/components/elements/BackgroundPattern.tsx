import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

type PatternType = 'dots' | 'grid' | 'waves' | 'noise';

interface BackgroundPatternProps {
  pattern?: PatternType;
  className?: string;
  animate?: boolean;
  color?: string;
  opacity?: number;
  inverted?: boolean;
}

const BackgroundPattern: React.FC<BackgroundPatternProps> = ({
  pattern = 'dots',
  className,
  animate = false,
  color = 'currentColor',
  opacity = 0.05,
  inverted = false,
}) => {
  const getSvgString = (): string => {
    switch (pattern) {
      case 'dots':
        return `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="1" fill="${color}" /></svg>`;
      case 'grid':
        return `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h20v20H0z" fill="none" stroke="${color}" stroke-width="0.5" /></svg>`;
      case 'waves':
        return `<svg width="100" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M0 10 Q 25 0, 50 10 T 100 10" fill="none" stroke="${color}" stroke-width="0.5" /></svg>`;
      case 'noise':
        return '';
      default:
        return '';
    }
  };

  return (
    <motion.div
      className={cn(
        'absolute inset-0 pointer-events-none overflow-hidden -z-10',
        pattern === 'noise' ? 'bg-noise' : '',
        className
      )}
      style={{
        opacity,
        filter: inverted ? 'invert(1)' : undefined,
        backgroundImage: pattern !== 'noise' ? `url("data:image/svg+xml,${encodeURIComponent(getSvgString())}")` : undefined,
        backgroundSize: pattern === 'waves' ? '100px 20px' : '20px 20px',
      }}
      animate={animate ? {
        backgroundPosition: ['0px 0px', '20px 20px'],
      } : undefined}
      transition={animate ? {
        backgroundPosition: {
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        },
      } : undefined}
      aria-hidden="true"
    />
  );
};

export default BackgroundPattern; 