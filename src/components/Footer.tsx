import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Database, PenTool, Figma, Code, Cpu, Layers, Server, Terminal, Globe, Cloud } from "lucide-react";
import gsap from "gsap";
import ContactForm from "./elements/ContactForm";
import SocialLinks from "./elements/SocialLinks";
import ContactInfo from "./elements/ContactInfo";

const Footer = () => {
  const iconsContainerRef = useRef<HTMLDivElement>(null);

  const [iconPositions] = useState(() =>
    Array.from({ length: 15 }).map(() => ({
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
      floatingIcons.forEach((icon, index) => {
        gsap.to(icon, {
          y: "-=20",
          rotation: "+=30",
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.15,
        });
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

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const headingText = "Let's Connect";
  
  return (
    <footer className="py-12 bg-background relative overflow-hidden">
      <div ref={iconsContainerRef} className="absolute inset-0 pointer-events-none">
        {iconPositions.map((position, index) => {
          const Icon = [Database, PenTool, Figma, Code, Cpu, Layers, Server, Terminal, Globe, Cloud][index % 10];
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
                filter: "blur(0.5px)",
              }}
            />
          );
        })}
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-4 relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center items-center">
              {headingText.split('').map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 100
                  }}
                  className={`${char === 'C' ? "text-primary" : ""} relative inline-block cursor-default`}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.2, 
                    color: char === 'C' ? "#ffffff" : "#F76D57",
                    transition: { duration: 0.2 }
                  }}
                >
                  {char}
                  {char !== ' ' && (
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.span>
              ))}
            </div>
            <motion.div 
              className="absolute -bottom-1 left-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ width: 0, x: "-50%" }}
              whileInView={{ width: "60%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full flex justify-center"
          >
            <ContactForm />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
