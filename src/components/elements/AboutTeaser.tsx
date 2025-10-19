import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Code2, GraduationCap, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";

const StatCard = ({ value, label, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5, type: "spring", stiffness: 100 }}
    whileHover={{ scale: 1.05, y: -5 }}
    className="relative bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 text-center group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
  >
    {/* Animated gradient background */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-br from-primary/25 via-primary/15 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    />
    
    {/* Glow effect */}
    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
    
    {/* Large background icon */}
    <div className="absolute -bottom-4 -right-4 text-primary/10 group-hover:text-primary/20 transition-all duration-500 group-hover:rotate-12">
      <Icon className="w-24 h-24" strokeWidth={1} />
    </div>
    
    <div className="flex flex-col items-center space-y-3 relative z-10">
      {/* Icon with animation */}
      <motion.div
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
        className="p-3 bg-gradient-to-br from-primary/30 to-primary/20 rounded-xl group-hover:from-primary/40 group-hover:to-primary/30 transition-all duration-300 shadow-lg shadow-primary/20"
      >
        <Icon className="w-7 h-7 text-primary/90 group-hover:text-white transition-colors duration-200" strokeWidth={2.5} />
      </motion.div>
      
      {/* Value */}
      <div className="text-4xl font-bold bg-gradient-to-br from-white via-gray-100 to-gray-200 bg-clip-text text-transparent group-hover:from-primary group-hover:via-primary/80 group-hover:to-primary/60 transition-all duration-300">
        {value}
      </div>
      
      {/* Label */}
      <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest group-hover:text-primary/80 transition-colors duration-300">
        {label}
      </div>
    </div>

    {/* Corner accent */}
    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </motion.div>
);

const SkillBadge = ({ skill, delay }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8, y: 10 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4, type: "spring", stiffness: 120 }}
    whileHover={{ scale: 1.08, y: -3 }}
    className="inline-block px-6 py-3 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-md text-gray-200 rounded-full text-sm font-semibold border border-gray-700/50 hover:border-primary/50 transition-all duration-300 cursor-pointer relative overflow-hidden group shadow-md hover:shadow-lg"
  >
    {/* Animated background gradient */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-primary/25 via-primary/20 to-primary/25 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
      whileHover={{ 
        background: "linear-gradient(90deg, rgba(147, 51, 234, 0.3), rgba(147, 51, 234, 0.25), rgba(147, 51, 234, 0.3))",
      }}
    />
    
    {/* Sparkle icon on hover */}
    <motion.span 
      className="absolute top-1 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      initial={{ scale: 0 }}
      whileHover={{ scale: 1, rotate: 360 }}
      transition={{ duration: 0.5 }}
    >
      <Sparkles className="w-3 h-3 text-primary" />
    </motion.span>
    
    <span className="relative z-10 group-hover:text-white transition-colors duration-300">{skill}</span>
  </motion.span>
);

const AboutTeaser = () => {
  const stats = [
    { value: "8.60", label: "CGPA", icon: GraduationCap },
    { value: "15+", label: "Projects", icon: Code2 },
    { value: "5+", label: "Leadership", icon: Users },
    { value: "25+", label: "Tech Skills", icon: BarChart3 }
  ];

  const skills = [
    "Python", 
    "React.js", 
    "Machine Learning", 
    "MERN Stack", 
    "Data Science", 
    "AI Solutions",
    "Leadership",
    "Digital Marketing"
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-background/98 to-background relative overflow-hidden">
      {/* Enhanced background decorations */}
      <div className="absolute top-10 left-5 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse opacity-20" />
      <div className="absolute bottom-10 right-5 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse opacity-15" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-full blur-3xl opacity-30" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Decorative top element */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-primary/15 backdrop-blur-sm border border-primary/30 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary/90">About Me</span>
            <Sparkles className="w-4 h-4 text-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
          </motion.div>

          {/* Main Heading with enhanced animation */}
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, type: "spring", stiffness: 80 }}
          >
            <motion.span 
              className="inline-block bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent drop-shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Curious
            </motion.span>
            <span className="text-white"> about my </span>
            <motion.span 
              className="inline-block bg-gradient-to-r from-primary/70 via-primary/90 to-primary bg-clip-text text-transparent drop-shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              journey?
            </motion.span>
          </motion.h2>
          
          {/* Enhanced Description */}
          <motion.div
            className="max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              From a <span className="text-primary font-bold">B.Tech Computer Science</span> student to a 
              <span className="text-primary font-bold"> Chief Marketing Officer</span>, specializing in{" "}
              <span className="text-primary/80 font-bold">Data Science</span> and{" "}
              <span className="text-primary font-bold">AI-driven solutions</span>. 
              Leading <span className="text-primary/90 font-bold">400+ students</span> while blending technical expertise with creative problem-solving to build impactful applications.
            </p>
          </motion.div>
          
          {/* Stats Grid with enhanced layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-12">
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
          
          {/* Skills with better spacing */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.h3 
              className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
            >
              Core Expertise
            </motion.h3>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto">
              {skills.map((skill, index) => (
                <SkillBadge key={skill} skill={skill} delay={0.8 + index * 0.05} />
              ))}
            </div>
          </motion.div>
          
          {/* Enhanced CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="relative inline-block"
          >
            {/* Glow effect behind button */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-primary/30 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-300 rounded-2xl" />
            
            <Button 
              asChild
              size="lg"
              className="relative bg-gradient-to-r from-primary via-primary/95 to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary text-white px-10 py-6 text-base md:text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group border border-primary/30 hover:border-primary/50"
            >
              <Link to="/about" className="inline-flex items-center gap-3">
                <span>Discover My Full Story</span>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                >
                  <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser; 