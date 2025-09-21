import React, { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Cloud, Code, Cpu, Database, Figma, Globe, Layers, PenTool, Server, Terminal } from "lucide-react";
import gsap from "gsap";
import ContactForm from "./elements/ContactForm";
import SocialLinks from "./elements/SocialLinks";
import ContactInfo from "./elements/ContactInfo";

const Footer = () => {
  const iconsContainerRef = useRef<HTMLDivElement>(null);

  // Memoize icon positions to prevent recalculation on every render
  const iconPositions = useMemo(() =>
    Array.from({ length: 6 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 20 + 12,
      opacity: Math.random() * 0.1 + 0.03,
      rotation: Math.random() * 360,
    })), []
  );

  // Memoize icon components array
  const iconComponents = useMemo(() => 
    [Database, PenTool, Figma, Code, Cpu, Layers, Server, Terminal, Globe, Cloud], 
    []
  );

  // Optimized GSAP animation with better performance settings
  useEffect(() => {
    if (!iconsContainerRef.current) return;

    const floatingIcons = gsap.utils.toArray<HTMLElement>(".footer-floating-icon");
    
    if (floatingIcons.length === 0) return;

    // Use GSAP's batch method for better performance with multiple elements
    const ctx = gsap.context(() => {
      floatingIcons.forEach((icon, index) => {
        // Use transform instead of individual properties for better performance
        gsap.set(icon, {
          willChange: "transform",
          transformOrigin: "center center",
        });

        // Create optimized animation with reduced complexity
        gsap.to(icon, {
          y: "-=10",
          rotation: "+=15",
          duration: 6 + Math.random() * 2, // Slower, less intensive animations
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
          force3D: true, // Enable hardware acceleration
        });
      });
    }, iconsContainerRef);

    return () => {
      ctx.revert(); // Clean up all animations in context
    };
  }, []);

  // Memoize animation variants to prevent recreation on every render
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Slightly faster stagger
        delayChildren: 0.2,
      },
    },
  }), []);

  // Memoize heading variants
  const headingVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4, // Slightly faster
        ease: "easeOut"
      }
    }
  }), []);

  // Memoize heading words to prevent recreation
  const headingWords = useMemo(() => ["Let's", "Connect"], []);
  
  return (
    <footer className="py-12 bg-background relative overflow-hidden" style={{ contain: "layout style paint", willChange: "transform" }}>
      {/* Optimized floating icons container */}
      <div ref={iconsContainerRef} className="absolute inset-0 pointer-events-none will-change-transform">
        {iconPositions.map((position, index) => {
          const Icon = iconComponents[index % iconComponents.length];
          return (
            <Icon
              key={index}
              className="footer-floating-icon text-primary absolute"
              style={{
                top: `${position.top}%`,
                left: `${position.left}%`,
                transform: `translate(-50%, -50%) rotate(${position.rotation}deg)`,
                width: `${position.size}px`,
                height: `${position.size}px`,
                opacity: position.opacity,
                filter: "blur(0.3px)",
                willChange: "transform",
              }}
            />
          );
        })}
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px", amount: 0.3 }}
        variants={containerVariants}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-8 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-center items-center gap-2">
            {headingWords.map((word, wordIndex) => (
              <motion.div 
                key={wordIndex} 
                className="flex"
                variants={headingVariants}
              >
                {word.split('').map((char, index) => (
                  <span
                    key={`${wordIndex}-${index}`}
                    className={`${char === 'C' ? "text-primary" : ""} relative inline-block cursor-default`}
                  >
                    {char}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="absolute -bottom-1 left-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ width: 0, x: "-50%" }}
            whileInView={{ width: "60%" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          />
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px", amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="w-full flex justify-center"
          >
            <ContactForm />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px", amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8 flex flex-col items-center w-full"
          >
            <SocialLinks />
            <ContactInfo />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex justify-center pt-6 mt-10 border-t border-border/50"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Charan Reddy. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
