import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, BarChart3, Code2, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const StatCard = ({ value, label, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
    whileHover={{ y: -8, scale: 1.05 }}
    className="bg-gradient-to-br from-card/70 to-card/50 backdrop-blur-lg border border-border/40 rounded-xl p-6 text-center group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
  >
    {/* Gradient overlay on hover */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      initial={false}
    />
    
    {/* Animated background icon */}
    <motion.div 
      className="absolute -top-2 -right-2 text-primary/5 group-hover:text-primary/10 transition-colors duration-300"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <Icon className="w-16 h-16" />
    </motion.div>
    
    <div className="flex flex-col items-center space-y-3 relative z-10">
      <motion.div
        whileHover={{ scale: 1.2, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon className="w-8 h-8 text-primary/70 group-hover:text-primary transition-colors duration-300" />
      </motion.div>
      <motion.div 
        className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
        whileHover={{ scale: 1.1 }}
      >
        {value}
      </motion.div>
      <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{label}</div>
    </div>
  </motion.div>
);

const SkillBadge = ({ skill, delay }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.3, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5, type: "spring", stiffness: 200 }}
    whileHover={{ 
      scale: 1.1, 
      y: -4,
      boxShadow: "0 10px 25px rgba(147, 51, 234, 0.2)"
    }}
    whileTap={{ scale: 0.95 }}
    className="inline-block px-5 py-2.5 bg-gradient-to-r from-muted/60 to-muted/40 backdrop-blur-sm text-foreground rounded-full text-sm font-medium border border-border/30 hover:border-primary/30 transition-all duration-300 cursor-pointer relative overflow-hidden group"
  >
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      initial={false}
    />
    <span className="relative z-10">{skill}</span>
  </motion.span>
);

const AboutTeaser = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  
  const stats = [
    { value: "8.60", label: "CGPA", icon: GraduationCap },
    { value: "15+", label: "Projects", icon: Code2 },
    { value: "25+", label: "Tech Skills", icon: BarChart3 },
    { value: "3+", label: "Years Exp.", icon: Award }
  ];

  const skills = ["Python", "React", "Machine Learning", "MERN Stack", "Data Science", "AI Solutions"];

  return (
    <section ref={containerRef} className="py-8 md:py-12 bg-gradient-to-b from-background via-background/95 to-background relative overflow-hidden">
      {/* Subtle background decorations */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 100 }}
            style={{ y, opacity }}
          >
            <motion.span 
              className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Curious
            </motion.span>
            <span className="text-foreground"> about my journey?</span>
          </motion.h2>
          
          {/* Description */}
          <motion.div
            className="max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              From a <span className="text-primary font-semibold">B.Tech Computer Science</span> student to a specialist in{" "}
              <span className="text-primary font-semibold">Data Science</span> and{" "}
              <span className="text-primary font-semibold">AI-driven solutions</span>. 
              I blend technical expertise with creative problem-solving to build impactful applications that solve real-world challenges.
            </p>
          </motion.div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
            {stats.map((stat, index) => (
              <StatCard 
                key={index}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                delay={0.3 + index * 0.1}
              />
            ))}
          </div>
          
          {/* Skills */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {skills.map((skill, index) => (
              <SkillBadge key={skill} skill={skill} delay={0.8 + index * 0.05} />
            ))}
          </motion.div>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.6, type: "spring", stiffness: 100 }}
            className="relative"
          >
            {/* Animated glow effect */}
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl blur-xl opacity-0 group-hover:opacity-100"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <Button 
              asChild
              size="lg"
              className="relative bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-8 py-3.5 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link to="/about" className="inline-flex items-center gap-3">
                Discover my full story
                <motion.span
                  className="group-hover:translate-x-1 transition-transform duration-200"
                  whileHover={{ scale: 1.2 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser; 