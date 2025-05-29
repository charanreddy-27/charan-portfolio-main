import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import BackgroundPattern, { GradientBackground } from '../components/BackgroundPatterns';
import InteractiveCard from '../components/elements/InteractiveCard';
import ContactForm from '../components/ContactForm';
import { LazyImage } from '../components/elements';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
    GraduationCap, 
    Briefcase, 
    CalendarIcon, 
    Building, 
    Award, 
    BookOpen, 
    Star, 
    Trophy, 
    MapPin, 
    Timer 
} from "lucide-react";
import educationData from "@/data/education";
import workData from "@/data/experience";

const AnimatedCharacter = ({ character, index }: { character: string, index: number }) => {
  return (
    <motion.span
      className="inline-block cursor-pointer"
      whileHover={{ 
        scale: 1.2, 
        color: "#ffffff", 
        textShadow: "0 0 8px rgba(255, 255, 255, 0.8)"
      }}
      transition={{ type: "spring", stiffness: 500, damping: 10 }}
    >
      {character === " " ? "\u00A0" : character}
    </motion.span>
  );
};

const AnimatedGradientCharacter = ({ character, index }: { character: string, index: number }) => {
  return (
    <motion.span
      className="inline-block cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-500"
      whileHover={{ 
        scale: 1.2,
        backgroundImage: "linear-gradient(to right, #a78bfa, #ec4899)",
        textShadow: "0 0 12px rgba(167, 139, 250, 0.8)"
      }}
      transition={{ type: "spring", stiffness: 500, damping: 10 }}
    >
      {character === " " ? "\u00A0" : character}
    </motion.span>
  );
};

const AboutCard = ({ title, description }) => (
    <Card className="bg-secondary/50 backdrop-blur-sm hover:bg-secondary/60 transition-all duration-300">
        <CardContent className="p-6">
            <h3 className="text-2xl font-heading font-bold mb-4 text-primary">
                {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
                {description}
            </p>
        </CardContent>
    </Card>
);

const TimelineItem = ({ icon: Icon, title, subtitle, details, content }) => (
    <Card className="relative bg-secondary/50 backdrop-blur-sm hover:bg-secondary/60 transition-all duration-300">
        <div className="absolute left-0 w-4 h-4 bg-primary rounded-full transform -translate-x-[34px] top-6" />
        <CardHeader>
            <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
                <Icon className="w-5 h-5" />
                {title}
            </CardTitle>
            <CardDescription>
                <div className="space-y-2 mt-2">
                    {details}
                </div>
            </CardDescription>
        </CardHeader>
        <CardContent>
            {content}
        </CardContent>
    </Card>
);

const Timeline = ({ title, icon: Icon, data, renderDetails, renderContent }) => (
    <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.5 }}
    >
        <motion.h2 
            className="text-3xl font-heading font-bold mb-8 flex items-center gap-2"
            whileHover={{ 
                scale: 1.02,
                color: "#a78bfa",
                transition: { type: "spring", stiffness: 300, damping: 10 }
            }}
        >
            <motion.div
                whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 }
                }}
            >
                <Icon className="text-primary w-8 h-8" />
            </motion.div>
            {title}
        </motion.h2>
        <div className="relative">
            <div className="absolute left-0 w-0.5 h-full bg-primary/20" />
            <div className="space-y-8 pl-6">
                {data.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <TimelineItem
                            icon={title === "Education" ? BookOpen : Building}
                            title={item.school || item.company}
                            subtitle={item.degree || item.position || ""}
                            details={renderDetails(item)}
                            content={renderContent(item)}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    </motion.div>
);

const About = () => {
  useEffect(() => {
    document.title = "About Me | Portfolio";
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="relative min-h-screen pt-24 pb-16">
      {/* Background patterns */}
      <BackgroundPattern type="dots" opacity={0.03} />
      <GradientBackground opacity={0.07} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
            <p className="text-xl text-muted-foreground">Get to know more about my journey and skills</p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3">
                <LazyImage
                  src="/path/to/profile-image.jpg"
                  alt="Charan Chanda"
                  placeholderSrc="/path/to/placeholder.jpg"
                  className="rounded-xl overflow-hidden"
                />
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">Hello, I'm Charan Chanda</h2>
                <p className="text-muted-foreground mb-4">
                  I'm a passionate developer with expertise in building modern web applications. 
                  With a strong foundation in both frontend and backend technologies, I create 
                  seamless, user-friendly experiences that solve real-world problems.
                </p>
                <p className="text-muted-foreground">
                  My journey in tech started with a curiosity about how things work, which evolved 
                  into a career building innovative solutions. I'm constantly learning and exploring 
                  new technologies to stay at the forefront of the industry.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">My Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: 'Frontend Development', description: 'React, Next.js, TypeScript' },
                { title: 'Backend Development', description: 'Node.js, Express, MongoDB' },
                { title: 'UI/UX Design', description: 'Figma, Tailwind CSS' },
                { title: 'Mobile Development', description: 'React Native, Flutter' },
                { title: 'DevOps', description: 'Docker, CI/CD, AWS' },
                { title: 'Data Analysis', description: 'Python, Pandas, Visualization' },
              ].map((skill, index) => (
                <InteractiveCard 
                  key={index} 
                  className="p-6"
                  hoverEffect={index % 3 === 0 ? 'tilt' : index % 3 === 1 ? 'glow' : 'border'}
                >
                  <h3 className="font-bold mb-2">{skill.title}</h3>
                  <p className="text-muted-foreground text-sm">{skill.description}</p>
                </InteractiveCard>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-6 text-center">Get In Touch</h2>
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;