import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Database, Brain, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const FloatingIcon = ({ icon: Icon, x, y, delay, size = 24 }) => (
  <motion.div
    className="absolute text-primary/20"
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
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animated spotlight effect
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current!.getBoundingClientRect();
      
      const x = ((clientX - left) / width) * 100;
      const y = ((clientY - top) / height) * 100;
      
      containerRef.current!.style.setProperty('--mouse-x', `${x}%`);
      containerRef.current!.style.setProperty('--mouse-y', `${y}%`);
    };
    
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="py-32 relative overflow-hidden"
      style={{'--mouse-x': '50%', '--mouse-y': '50%'} as React.CSSProperties}
    >
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background to-background/90">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(
              circle 800px at var(--mouse-x) var(--mouse-y),
              rgba(147, 51, 234, 0.15),
              transparent 40%
            )`
          }}
        />
      </div>
      
      {/* Floating icons */}
      <FloatingIcon icon={Code} x={15} y={20} delay={0} size={38} />
      <FloatingIcon icon={Database} x={85} y={30} delay={1.5} size={34} />
      <FloatingIcon icon={Brain} x={25} y={70} delay={0.8} size={36} />
      <FloatingIcon icon={Star} x={75} y={60} delay={0.3} size={32} />
      
      {/* Animated background shapes */}
      <motion.div 
        className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-secondary/5 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <motion.div 
              className="inline-block mb-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full">
                About Me
              </span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                Curious
              </span> about my journey?
            </motion.h2>
            
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                From a <span className="text-primary font-medium">B.Tech Computer Science</span> student to a specialist in 
                <span className="text-primary font-medium"> Data Science</span> and <span className="text-primary font-medium">AI-driven solutions</span>. 
                I blend technical expertise with creative problem-solving to build impactful applications.
              </p>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.div 
                className="bg-card p-4 rounded-xl border border-border/50 shadow-lg"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-center">
                  <span className="text-3xl font-bold text-primary">8.60</span>
                  <p className="text-sm text-muted-foreground">CGPA</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-card p-4 rounded-xl border border-border/50 shadow-lg"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-center">
                  <span className="text-3xl font-bold text-primary">10+</span>
                  <p className="text-sm text-muted-foreground">Projects</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-card p-4 rounded-xl border border-border/50 shadow-lg"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-center">
                  <span className="text-3xl font-bold text-primary">5+</span>
                  <p className="text-sm text-muted-foreground">Tech Skills</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-card p-4 rounded-xl border border-border/50 shadow-lg"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-center">
                  <span className="text-3xl font-bold text-primary">3+</span>
                  <p className="text-sm text-muted-foreground">Years Exp.</p>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Skills */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">Python</span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">React</span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">Machine Learning</span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">MERN Stack</span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">Data Science</span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">AI Solutions</span>
            </motion.div>
            
            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative inline-block"
            >
              <motion.div
                className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary via-purple-500 to-secondary opacity-70 blur-sm"
                animate={{ 
                  opacity: [0.5, 0.8, 0.5],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              
              <Button 
                asChild
                size="lg" 
                className="relative bg-gradient-to-r from-primary to-purple-600 hover:from-primary hover:to-purple-500 px-8 py-7 text-lg"
              >
                <Link to="/about">
                  <span className="flex items-center gap-3 font-medium">
                    Discover my full story
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;
