import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, ExternalLink } from "lucide-react";

const SocialLinks = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/charanreddy-27", label: "GitHub", color: "#333" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/chandacharanreddy", label: "LinkedIn", color: "#0077b5" },
    { icon: Instagram, href: "https://www.instagram.com/charan_reddy_27", label: "Instagram", color: "#E1306C" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    }
  };

  const titleChars = "Connect With Me".split("");

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="space-y-4 w-full max-w-md"
    >
      <motion.h3 
        variants={itemVariants}
        className="text-3xl font-semibold text-center relative"
      >
        <div className="overflow-hidden py-1">
          <div className="flex justify-center">
            {titleChars.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    delay: index * 0.03,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }}
                viewport={{ once: true }}
                className={`${char === " " ? "mr-2" : ""} relative inline-block cursor-default`}
                whileHover={{ 
                  y: -5, 
                  scale: 1.2, 
                  color: "#F76D57",
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
        </div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ width: 0, left: "50%" }}
          whileInView={{ width: "100%", left: "0%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        />
      </motion.h3>
      
      <motion.div 
        variants={containerVariants}
        className="flex justify-center gap-4"
      >
        {socialLinks.map(({ icon: Icon, href, label, color }, index) => (
          <motion.div
            key={href}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.15, 
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.5 }
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: {
                delay: 0.3 + index * 0.1,
                type: "spring",
                stiffness: 260,
                damping: 20
              }
            }}
            viewport={{ once: true }}
          >
            <motion.a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden flex items-center justify-center w-12 h-12 bg-secondary/20 hover:bg-primary text-white rounded-lg backdrop-blur-sm border border-white/10 shadow-lg"
              aria-label={label}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-20"
                style={{ backgroundColor: color }}
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <Icon className="w-5 h-5 relative z-10" />
              
              <motion.span
                className="absolute -bottom-6 left-0 right-0 text-xs text-center opacity-0 group-hover:opacity-100 group-hover:-bottom-1 transition-all duration-300"
              >
                {label}
              </motion.span>
              
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0"
                whileHover={{ 
                  opacity: 1,
                  x: ["100%", "-100%"],
                  transition: { duration: 0.5, ease: "easeInOut" }
                }}
              />
            </motion.a>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.a
        variants={itemVariants}
        href="https://charan-reddy.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 text-xs text-primary/80 hover:text-primary mt-1 transition-colors duration-300"
      >
        <span>View all profiles</span>
        <ExternalLink className="w-2.5 h-2.5" />
      </motion.a>
    </motion.div>
  );
};

export default SocialLinks;
