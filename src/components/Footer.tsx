
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
    Array.from({ length: 10 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 30 + 20,
      opacity: Math.random() * 0.15 + 0.05,
    }))
  );

  useEffect(() => {
    if (!iconsContainerRef.current) return;

    const floatingIcons = gsap.utils.toArray<HTMLElement>(".footer-floating-icon");
    if (floatingIcons.length > 0) {
      floatingIcons.forEach((icon, index) => {
        gsap.to(icon, {
          y: "-=20",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.2,
        });
      });
    }

    return () => {
      gsap.killTweensOf(".footer-floating-icon");
    };
  }, []);

  return (
    <footer className="py-20 bg-background relative overflow-hidden">
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
                transform: `translate(-50%, -50%)`,
                width: `${position.size}px`,
                height: `${position.size}px`,
                opacity: position.opacity,
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactForm />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 flex flex-col items-center w-full px-6"
          >
            <SocialLinks />
            <ContactInfo />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex justify-center pt-8 mt-12 border-t border-border/50"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Charan Reddy. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
