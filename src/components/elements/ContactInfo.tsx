import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Copy, Check, ExternalLink } from "lucide-react";
import { useToast } from "@/utils/use-toast";

const ContactInfo = () => {
  const { toast } = useToast();
  const [emailCopied, setEmailCopied] = React.useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("charanreddychanda@gmail.com");
    toast({ description: "Email copied to clipboard!" });
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const titleChars = "Contact Info".split("");

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
                    delay: index * 0.05,
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

      <motion.div variants={itemVariants} className="relative">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCopyEmail}
          className="group relative overflow-hidden flex justify-between items-center gap-3 bg-secondary/20 hover:bg-primary text-white w-full px-4 py-3 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <div className="bg-primary/30 p-1.5 rounded-md">
              <Mail className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">charanreddychanda@gmail.com</span>
          </div>
          
          <motion.div
            animate={emailCopied ? { rotate: [0, 360] } : {}}
            transition={{ duration: 0.5 }}
            className="bg-white/10 p-1 rounded-md"
          >
            {emailCopied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </motion.div>
          
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-primary"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
        
        <motion.div 
          className="absolute -right-1 -top-1 bg-primary text-[10px] px-1.5 py-0.5 rounded-full text-white"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          Click to copy
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="tel:+917842525284"
          className="group relative overflow-hidden flex justify-between items-center gap-3 bg-secondary/20 hover:bg-primary text-white w-full px-4 py-3 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <div className="bg-primary/30 p-1.5 rounded-md">
              <Phone className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">+91 7842525284</span>
          </div>
          
          <div className="bg-white/10 p-1 rounded-md">
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
          
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-primary"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div 
            className="absolute inset-0 bg-white/5 opacity-0"
            whileHover={{ 
              opacity: 1,
              x: ["100%", "-100%"],
              transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity }
            }}
          />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default ContactInfo;
