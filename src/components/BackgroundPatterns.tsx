import React from 'react';
import { motion } from 'framer-motion';

type PatternType = 'dots' | 'grid' | 'waves' | 'noise';

interface BackgroundPatternProps {
  type?: PatternType;
  color?: string;
  opacity?: number;
  className?: string;
  animate?: boolean;
}

const BackgroundPattern = ({
  type = 'dots',
  color = 'currentColor',
  opacity = 0.05,
  className = '',
  animate = true,
}: BackgroundPatternProps) => {
  const getPattern = () => {
    switch (type) {
      case 'dots':
        return (
          <pattern
            id="dots-pattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill={color} />
          </pattern>
        );
      case 'grid':
        return (
          <pattern
            id="grid-pattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke={color}
              strokeWidth="0.5"
            />
          </pattern>
        );
      case 'waves':
        return (
          <pattern
            id="waves-pattern"
            x="0"
            y="0"
            width="100"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10"
              fill="none"
              stroke={color}
              strokeWidth="0.5"
            />
          </pattern>
        );
      case 'noise':
        return (
          <filter id="noise-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0.05 0"
            />
          </filter>
        );
      default:
        return null;
    }
  };

  const renderNoiseRect = () => {
    if (type === 'noise') {
      return (
        <motion.rect
          initial={{ opacity: 0 }}
          animate={{ opacity }}
          transition={{ duration: 1 }}
          width="100%"
          height="100%"
          filter="url(#noise-filter)"
        />
      );
    }
    return (
      <motion.rect
        initial={{ opacity: 0 }}
        animate={{ opacity }}
        transition={{ duration: 1 }}
        width="100%"
        height="100%"
        fill={`url(#${type}-pattern)`}
      />
    );
  };

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        className="w-full h-full"
      >
        <defs>{getPattern()}</defs>
        {renderNoiseRect()}
      </svg>
    </div>
  );
};

// Animated gradient background
export const GradientBackground = ({
  className = '',
  opacity = 0.15,
  colors = ['#6d28d9', '#4f46e5', '#8b5cf6'],
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`}>
      <motion.div
        className="absolute -inset-[100px] opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity }}
        transition={{ duration: 1.5 }}
      >
        {colors.map((color, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full blur-3xl"
            style={{
              backgroundColor: color,
              width: '40%',
              height: '40%',
              left: `${25 + index * 20}%`,
              top: `${20 + index * 15}%`,
              zIndex: -1,
            }}
            animate={{
              x: [0, 10, -10, 0],
              y: [0, -10, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 10 + index * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default BackgroundPattern; 