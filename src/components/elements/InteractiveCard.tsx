import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from "../../utils/cn";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: 'tilt' | 'lift' | 'glow' | 'border' | 'none';
  clickEffect?: boolean;
  disabled?: boolean;
  as?: React.ElementType;
  href?: string;
  onClick?: () => void;
}

const InteractiveCard = ({
  children,
  className = '',
  hoverEffect = 'tilt',
  clickEffect = true,
  disabled = false,
  as = 'div',
  href,
  onClick,
  ...props
}: InteractiveCardProps & React.HTMLAttributes<HTMLElement>) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const Component = as;
  const isLink = as === 'a' || href;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || hoverEffect !== 'tilt') return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const getTiltTransform = () => {
    if (!cardRef.current || !isHovered || hoverEffect !== 'tilt') return {};
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (centerY - mousePosition.y) / 20;
    const rotateY = (mousePosition.x - centerX) / 20;
    
    return {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
    };
  };

  const getHoverStyles = () => {
    switch (hoverEffect) {
      case 'lift':
        return isHovered ? { transform: 'translateY(-8px)' } : {};
      case 'glow':
        return isHovered ? { boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)' } : {};
      case 'border':
        return isHovered ? { borderColor: 'rgba(147, 51, 234, 0.8)' } : {};
      case 'tilt':
        return getTiltTransform();
      default:
        return {};
    }
  };

  const variants = {
    initial: { scale: 1 },
    hover: { scale: hoverEffect === 'none' ? 1 : 1.02 },
    tap: { scale: clickEffect ? 0.98 : 1 },
    disabled: { opacity: 0.7, scale: 1 },
  };

  const cardProps = {
    ref: cardRef,
    className: cn(
      'relative overflow-hidden transition-all duration-300 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50',
      isHovered && hoverEffect === 'border' && 'border-primary/80',
      disabled && 'opacity-70 cursor-not-allowed',
      className
    ),
    style: {
      ...getHoverStyles(),
      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onMouseMove: handleMouseMove,
    ...props,
  };

  const linkProps = isLink ? {
    href,
    target: href?.startsWith('http') ? '_blank' : undefined,
    rel: href?.startsWith('http') ? 'noopener noreferrer' : undefined,
  } : {};

  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileHover={disabled ? "disabled" : "hover"}
      whileTap={disabled || !clickEffect ? "initial" : "tap"}
      onClick={disabled ? undefined : onClick}
    >
      <Component {...cardProps} {...linkProps}>
        {children}
        
        {hoverEffect === 'glow' && isHovered && (
          <div className="absolute inset-0 -z-10 bg-primary opacity-20 blur-xl rounded-xl" />
        )}
      </Component>
    </motion.div>
  );
};

export default InteractiveCard; 