
import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

const SocialLinks = () => {
  return (
    <div className="space-y-4 w-full max-w-md text-center">
      <h3 className="text-2xl font-semibold">Connect With Me</h3>
      <div className="flex justify-center gap-4">
        {[
          { icon: Github, href: "https://github.com/charanreddy-27", label: "GitHub" },
          { icon: Linkedin, href: "https://www.linkedin.com/in/chandacharanreddy", label: "LinkedIn" },
          { icon: Twitter, href: "https://x.com/charanreddycha9", label: "Twitter" }
        ].map(({ icon: Icon, href, label }) => (
          <motion.a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden hover:scale-105 transition-transform duration-300 flex items-center justify-center w-12 h-12 bg-primary/20 hover:bg-primary text-white rounded-lg backdrop-blur-sm"
            aria-label={label}
          >
            <Icon className="w-6 h-6" />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
