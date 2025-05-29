import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Handle clicks outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    return () => window.removeEventListener("scroll", handleScroll);
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

  // Enhanced animations
  const menuVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Hamburger button animations
  const topBarVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 6 }
  };
  
  const centerBarVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 }
  };
  
  const bottomBarVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -6 }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
        ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3 shadow-lg"
        : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-heading font-bold text-foreground relative group"
          >
            <span className="relative z-10">Portfolio</span>
            <span className="absolute inset-x-0 bottom-0 h-2 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Link>

          {/* Custom Hamburger Button */}
          <div className="lg:hidden relative z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col justify-center items-center w-10 h-10 rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              <motion.span
                variants={topBarVariants}
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
                className="w-6 h-0.5 bg-foreground mb-1.5 transform origin-center"
              />
              <motion.span
                variants={centerBarVariants}
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
                className="w-6 h-0.5 bg-foreground mb-1.5"
              />
              <motion.span
                variants={bottomBarVariants}
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
                className="w-6 h-0.5 bg-foreground transform origin-center"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative group flex items-center gap-2 text-base ${isActive(item.path)
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                      } transition-colors duration-300`}
                  >
                    <Icon className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${isActive(item.path) ? "text-primary" : "group-hover:text-primary"
                      }`} />
                    <span className="relative">
                      {item.label}
                      <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${isActive(item.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`} />
                    </span>
                  </Link>
                );
              })}
            </div>

            <Button
              variant="default"
              className="relative group overflow-hidden flex items-center gap-2"
              asChild
            >
              <a
                href="https://www.linkedin.com/in/chandacharanreddy/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-2"
              >
                <Linkedin className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5" />
                <span className="relative z-10">Connect</span>
                <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            </Button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={menuRef}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={menuVariants}
                className="fixed inset-0 top-[72px] bg-background/95 backdrop-blur-md z-40 flex flex-col lg:hidden overflow-y-auto"
              >
                <div className="container mx-auto px-4 py-8 flex flex-col h-full">
                  <motion.div
                    className="flex flex-col gap-6 items-center justify-center flex-1"
                    variants={itemVariants}
                  >
                    {navItems.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.path}
                          variants={itemVariants}
                          custom={index}
                        >
                          <Link
                            to={item.path}
                            className={`relative group flex items-center gap-3 text-xl ${
                              isActive(item.path)
                                ? "text-foreground font-medium"
                                : "text-muted-foreground hover:text-foreground"
                            } transition-colors duration-300 py-3`}
                            onClick={() => setIsOpen(false)}
                          >
                            <Icon className={`h-5 w-5 transition-transform duration-300 ${
                              isActive(item.path) ? "text-primary" : "text-muted-foreground"
                            }`} />
                            <span className="relative">
                              {item.label}
                              <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
                                isActive(item.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                              }`} />
                            </span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                  
                  <motion.div 
                    className="flex justify-center mt-8"
                    variants={itemVariants}
                  >
                    <Button
                      variant="default"
                      className="relative group overflow-hidden flex items-center gap-2 w-full max-w-xs"
                      asChild
                    >
                      <a
                        href="https://www.linkedin.com/in/chandacharanreddy/"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="flex items-center justify-center gap-2"
                      >
                        <Linkedin className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5" />
                        <span className="relative z-10">Connect on LinkedIn</span>
                        <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </a>
                    </Button>
                  </motion.div>
                  
                  <motion.div 
                    className="flex justify-center gap-6 mt-8"
                    variants={itemVariants}
                  >
                    <a
                      href="https://github.com/chandacharanreddy"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href="https://twitter.com/chandacharanr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;