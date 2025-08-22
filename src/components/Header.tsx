import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Twitter,
  Home,
  FolderKanban,
  BookOpen,
  User,
  Award,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import ParticleBackground from "@/components/elements/ParticleBackground";
import { usePerformanceTracking, useOptimizedScroll } from "@/utils/monitoring";

const Navigation = () => {
  // Performance monitoring
  usePerformanceTracking('Navigation');
  
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  // Handle clicks outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      // Don't close if clicking on the hamburger button
      if (hamburgerRef.current && hamburgerRef.current.contains(target)) {
        return;
      }
      
      // Close if clicking outside the menu
      if (menuRef.current && !menuRef.current.contains(target) && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize scroll state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update header height on resize and ensure menu works when scrolled
  useEffect(() => {
    const handleResize = () => {
      // Force a re-render to update the header height reference
      setIsScrolled(prev => {
        const isCurrentlyScrolled = window.scrollY > 50;
        return isCurrentlyScrolled;
      });
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/projects", label: "Projects", icon: FolderKanban },
    { path: "/blog", label: "Blog", icon: BookOpen },
    { path: "/certificates", label: "Certificates", icon: Award },
    { path: "/about", label: "About", icon: User },
  ];

  // Hamburger button animations with will-change hint
  const topBarVariants = {
    closed: { 
      rotate: 0, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
      }
    },
    open: { 
      rotate: 45, 
      y: 6,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
      }
    }
  };
  
  const centerBarVariants = {
    closed: { 
      opacity: 1,
      transition: {
        duration: 0.2,
      }
    },
    open: { 
      opacity: 0,
      transition: {
        duration: 0.2,
      }
    }
  };
  
  const bottomBarVariants = {
    closed: { 
      rotate: 0, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
      }
    },
    open: { 
      rotate: -45, 
      y: -6,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
      }
    }
  };

  // Social icon hover animations
  const socialIconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.15, 
      rotate: [0, -10, 10, -5, 5, 0],
      transition: { 
        scale: { duration: 0.2 },
        rotate: { duration: 0.5, ease: "easeInOut" }
      }
    }
  };

  // Toggle menu handler - instant open/close
  const toggleMenu = () => {
    if (!isOpen) {
      // Scroll to top immediately and open menu
      window.scrollTo(0, 0);
      setIsOpen(true);
    } else {
      // Close menu immediately
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      ref={headerRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed w-full z-[59] transition-all duration-500 ${isScrolled
        ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3 shadow-lg"
        : "bg-transparent py-6"
        }`}
    >
      {/* Subtle particle background for the navbar */}
      {isScrolled && <ParticleBackground className="opacity-30" variant="default" />}
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-heading font-bold text-foreground relative group"
          >
            <span className="relative z-10">Portfolio</span>
            <motion.span 
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-x-0 bottom-0 h-2 bg-primary/10 transform origin-left" 
            />
          </Link>

          {/* Custom Hamburger Button */}
          <div className="lg:hidden relative z-[60]">
            <motion.button
              ref={hamburgerRef}
              onClick={toggleMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col justify-center items-center w-10 h-10 rounded-md focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <motion.span
                variants={topBarVariants}
                animate={isOpen ? "open" : "closed"}
                className="w-6 h-0.5 bg-foreground mb-1.5 transform origin-center will-change-transform"
              />
              <motion.span
                variants={centerBarVariants}
                animate={isOpen ? "open" : "closed"}
                className="w-6 h-0.5 bg-foreground mb-1.5 will-change-opacity"
              />
              <motion.span
                variants={bottomBarVariants}
                animate={isOpen ? "open" : "closed"}
                className="w-6 h-0.5 bg-foreground transform origin-center will-change-transform"
              />
            </motion.button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isItemHovered = hoveredItem === item.path;
                const isItemActive = isActive(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onMouseEnter={() => setHoveredItem(item.path)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onFocus={() => setHoveredItem(item.path)}
                    onBlur={() => setHoveredItem(null)}
                    className={`relative group flex items-center gap-2 text-base ${isActive(item.path)
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground focus:text-foreground"
                      } transition-colors duration-300 focus:outline-none`}
                    aria-label={`Navigate to ${item.label} page`}
                    aria-current={isItemActive ? "page" : undefined}
                  >
                    <motion.div
                      animate={{ 
                        scale: isItemHovered || isItemActive ? 1.1 : 1,
                        rotate: isItemHovered && !isItemActive ? [0, -10, 10, 0] : 0
                      }}
                      transition={{ 
                        scale: { duration: 0.2 }, 
                        rotate: { duration: 0.4 }
                      }}
                    >
                      <Icon className={`h-4 w-4 transition-colors duration-300 ${isActive(item.path) ? "text-primary" : "group-hover:text-primary group-focus:text-primary"
                        }`} aria-hidden="true" />
                    </motion.div>
                    <span className="relative">
                      {item.label}
                      <motion.span 
                        initial={{ scaleX: isItemActive ? 1 : 0 }}
                        animate={{ scaleX: isItemActive || isItemHovered ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform origin-left`} 
                      />
                    </span>
                  </Link>
                );
              })}
            </div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="default"
                className="relative group overflow-hidden flex items-center gap-2"
                asChild
                aria-label="Connect on LinkedIn"
              >
                <a
                  href="https://www.linkedin.com/in/chandacharanreddy/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center gap-2"
                >
                  <motion.div
                    whileHover={{ x: 2, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Linkedin className="h-4 w-4 relative z-10" />
                  </motion.div>
                  <span className="relative z-10">Connect</span>
                  <motion.span 
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-primary transform origin-left" 
                  />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Navigation Menu - No animations for instant opening */}
          {isOpen && (
            <div
              ref={menuRef}
              className="fixed inset-0 top-0 left-0 right-0 bottom-0 bg-background/95 backdrop-blur-md z-[55] flex flex-col lg:hidden overflow-y-auto"
              id="mobile-menu"
              aria-hidden={!isOpen}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Particle background for mobile menu */}
              <ParticleBackground className="opacity-40" variant="menu" />
              
              <div className="container mx-auto px-4 pt-20 pb-8 flex flex-col h-full">
                <div className="flex flex-col gap-6 items-center justify-center flex-1 mt-8">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isItemActive = isActive(item.path);
                    
                    return (
                      <div key={item.path}>
                        <Link
                          to={item.path}
                          className={`relative group flex items-center gap-3 text-xl ${
                            isItemActive
                              ? "text-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          } transition-colors duration-300 py-3`}
                          onClick={() => setIsOpen(false)}
                        >
                          <div>
                            <Icon className={`h-5 w-5 transition-transform duration-300 ${
                              isItemActive ? "text-primary" : "text-muted-foreground"
                            }`} />
                          </div>
                          <span className="relative">
                            {item.label}
                            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform origin-left ${isItemActive ? 'scale-x-100' : 'scale-x-0'}`} />
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex justify-center mt-8">
                  <div className="w-full max-w-xs">
                    <Button
                      variant="default"
                      className="relative group overflow-hidden flex items-center gap-2 w-full"
                      asChild
                      aria-label="Connect on LinkedIn"
                    >
                      <a
                        href="https://www.linkedin.com/in/chandacharanreddy/"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="flex items-center justify-center gap-2"
                      >
                        <div>
                          <Linkedin className="h-4 w-4 relative z-10" />
                        </div>
                        <span className="relative z-10">Connect on LinkedIn</span>
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-center gap-6 mt-8">
                  <a
                    href="https://github.com/charanreddy-27"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                    aria-label="Visit GitHub profile"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://twitter.com/chandacharanr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                    aria-label="Visit Twitter profile"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;