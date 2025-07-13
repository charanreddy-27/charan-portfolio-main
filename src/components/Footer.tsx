import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Database, PenTool, Figma, Code, Cpu, Layers, Server, Terminal, Globe, Cloud } from "lucide-react";
import gsap from "gsap";
import ContactForm from "./elements/ContactForm";
import SocialLinks from "./elements/SocialLinks";
import ContactInfo from "./elements/ContactInfo";

const Footer = () => {
  const iconsContainerRef = useRef<HTMLDivElement>(null);

  // Reduce the number of floating icons from 15 to 8 for better performance
  const [iconPositions] = useState(() =>
    Array.from({ length: 8 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 25 + 15,
      opacity: Math.random() * 0.15 + 0.05,
      rotation: Math.random() * 360,
    }))
  );

  useEffect(() => {
    if (!iconsContainerRef.current) return;

    const floatingIcons = gsap.utils.toArray<HTMLElement>(".footer-floating-icon");
    if (floatingIcons.length > 0) {
      // Create a single timeline for better performance
      const tl = gsap.timeline();
      
      floatingIcons.forEach((icon, index) => {
        // Use less intensive animations and longer durations
        tl.to(icon, {
          y: "-=15",
          rotation: "+=20",
          duration: 4 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
          force3D: true, // Hardware acceleration hint
        }, 0); // Start all animations at the same time
      });
    }

    return () => {
      gsap.killTweensOf(".footer-floating-icon");
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Simplify the animation by animating the whole word instead of individual characters
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const headingWords = ["Let's", "Connect"];
  
  return (
    <footer className="py-12 bg-background relative overflow-hidden">
      <div ref={iconsContainerRef} className="absolute inset-0 pointer-events-none">
        {iconPositions.map((position, index) => {
          const Icon = [Database, PenTool, Figma, Code, Cpu, Layers, Server, Terminal, Globe, Cloud][index % 10];
          return (
            <Icon
              key={index}
              className="footer-floating-icon text-primary absolute will-change-transform"
              style={{
                top: `${position.top}%`,
                left: `${position.left}%`,
                transform: `translate(-50%, -50%) rotate(${position.rotation}deg)`,
                width: `${position.size}px`,
                height: `${position.size}px`,
                opacity: position.opacity,
                filter: "blur(0.5px)",
              }}
            />
          );
        })}
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-8 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
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
            className="absolute -bottom-1 left-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent will-change-transform"
            initial={{ width: 0, x: "-50%" }}
            whileInView={{ width: "60%" }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          />
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full flex justify-center"
          >
            <ContactForm />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 flex flex-col items-center w-full"
          >
            <SocialLinks />
            <ContactInfo />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
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
