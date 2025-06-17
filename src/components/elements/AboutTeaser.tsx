import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Database, Brain, User, Award, BookOpen, Lightbulb, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const FloatingIcon = ({ icon: Icon, x, y, delay, size = 24 }) => (
  <motion.div
    className="absolute text-primary/30"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0.8],
      scale: [0, 1, 0.9],
      y: [0, -15, 0],
      rotate: [0, 15, 0]
    }}
    transition={{
      delay,
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse"
    }}
  >
    <Icon size={size} />
  </motion.div>
);

const AboutTeaser = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    });
    
    // Add spotlight effect with mouse movement
    if (containerRef.current) {
      const container = containerRef.current;
      
      const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = container.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        
        gsap.to(container, {
          '--x': `${x}px`,
          '--y': `${y}px`,
          duration: 0.3,
          ease: 'sine.out'
        });
      };
      
      container.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
      };
    }
    
    // Button hover animation
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, [controls]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  return (
    <section 
      ref={containerRef}
      className="py-24 relative overflow-hidden"
      style={{
        '--x': '50%',
        '--y': '50%',
      } as React.CSSProperties}
    >
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 rounded-3xl"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "linear"
        }}
      />
      
      {/* Spotlight effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(600px circle at var(--x) var(--y), rgba(147, 51, 234, 0.15), transparent 40%)',
        }}
      />
      
      {/* Floating icons with more variety */}
      <FloatingIcon icon={Code} x={8} y={25} delay={0} size={38} />
      <FloatingIcon icon={Database} x={92} y={65} delay={1.5} size={34} />
      <FloatingIcon icon={Brain} x={15} y={75} delay={0.8} size={36} />
      <FloatingIcon icon={Lightbulb} x={85} y={20} delay={2.2} size={32} />
      <FloatingIcon icon={Sparkles} x={25} y={30} delay={1.2} size={30} />
      <FloatingIcon icon={User} x={80} y={80} delay={0.5} size={35} />
      <FloatingIcon icon={BookOpen} x={40} y={85} delay={1.8} size={32} />
      <FloatingIcon icon={Award} x={75} y={40} delay={0.3} size={36} />
      
      {/* Decorative elements with more dynamic animations */}
      <motion.div 
        className="absolute left-0 top-1/4 w-40 h-40 rounded-full bg-primary/10 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <motion.div 
        className="absolute right-0 bottom-1/4 w-60 h-60 rounded-full bg-secondary/10 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      {/* Content container */}
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div 
            className="mb-8 inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.span
              className="text-xs md:text-sm uppercase tracking-widest font-semibold bg-primary/20 text-primary px-4 py-2 rounded-full"
              animate={{ 
                boxShadow: ['0 0 0 rgba(147, 51, 234, 0)', '0 0 20px rgba(147, 51, 234, 0.5)', '0 0 0 rgba(147, 51, 234, 0)'] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              About Me
            </motion.span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Curious about my <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">journey</span>?
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            From a B.Tech Computer Science student to a specialist in Data Science and AI-driven solutions. 
            I blend technical expertise with creative problem-solving to build impactful applications.
          </motion.p>
          
          <motion.div
            ref={buttonRef}
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="relative"
          >
            <Button 
              asChild
              size="lg" 
              className="group relative overflow-hidden hover:scale-110 transition-transform duration-300 text-lg py-6 px-8"
            >
              <Link to="/about">
                <span className="relative z-10 flex items-center gap-3">
                  Discover my journey
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.span>
                </span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                />
                
                {/* Animated particles around button */}
                <motion.span 
                  className="absolute -inset-1 rounded-lg opacity-30"
                  animate={{ 
                    boxShadow: ['0 0 0 rgba(147, 51, 234, 0)', '0 0 20px rgba(147, 51, 234, 0.8)', '0 0 0 rgba(147, 51, 234, 0)'] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Link>
            </Button>
            
            {/* Animated rings */}
            <motion.div
              className="absolute -inset-4 rounded-full border border-primary/20 pointer-events-none"
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -inset-8 rounded-full border border-primary/10 pointer-events-none"
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutTeaser; 