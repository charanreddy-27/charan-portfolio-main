import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, ExternalLink } from "lucide-react";

const SocialLinks = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/charanreddy-27", label: "GitHub", color: "#333" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/chandacharanreddy", label: "LinkedIn", color: "#0077b5" },
    { icon: Instagram, href: "https://www.instagram.com/charan.reddy27/", label: "Instagram", color: "#E1306C" }
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

  // Simplify by using the whole title instead of character-by-character animation
  const titleVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback();
    }
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="space-y-4 w-full max-w-md"
    >
      <motion.h3 
        variants={titleVariant}
        className="text-3xl font-semibold text-center relative"
      >
        <div className="overflow-hidden py-1">
          <div className="flex justify-center">
            <span className="relative inline-block">Connect With Me</span>
          </div>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent will-change-transform"
          initial={{ width: 0, left: "50%" }}
          whileInView={{ width: "100%", left: "0%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        />
      </motion.h3>
      
      <motion.div 
        variants={containerVariants}
        className="flex justify-center gap-4"
        role="navigation"
        aria-label="Social media links"
      >
        {socialLinks.map(({ icon: Icon, href, label, color }, index) => (
          <motion.div
            key={href}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.1, 
              transition: { duration: 0.3 }
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
            className="hover-lift focus-ring will-change-transform"
          >
            <motion.a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden flex items-center justify-center w-12 h-12 bg-secondary/20 hover:bg-primary text-white rounded-lg backdrop-blur-sm border border-white/10 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={`Visit my ${label} profile`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, () => window.open(href, '_blank', 'noopener,noreferrer'))}
            >
              {/* Remove the animated background */}
              
              <Icon className="w-5 h-5 relative z-10" />
              
              <motion.span
                className="absolute -bottom-6 left-0 right-0 text-xs text-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-hover:-bottom-1 group-focus:-bottom-1 transition-all duration-300"
              >
                {label}
              </motion.span>
            </motion.a>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.a
        variants={itemVariants}
        href="https://charan-reddy.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 text-xs text-primary/80 hover:text-primary hover-underline focus-ring mt-1 transition-colors duration-300"
        aria-label="View all social media profiles"
        tabIndex={0}
      >
        <span>View all profiles</span>
        <ExternalLink className="w-2.5 h-2.5" />
      </motion.a>
    </motion.div>
  );
};

export default SocialLinks;
