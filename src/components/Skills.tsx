import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import {
  Activity,
  BarChart2,
  BarChart3,
  Binary,
  Box,
  Brain,
  BrainCircuit,
  Calculator,
  CircuitBoard,
  Cloud,
  Code,
  Command,
  Compass,
  Container,
  Cpu,
  Database,
  Eye,
  FileCode,
  FlaskConical,
  FrameIcon,
  Gauge,
  GitBranch,
  GitMerge,
  Globe,
  HardDrive,
  Hash,
  Layers,
  Layout,
  Lightbulb,
  Microscope,
  Monitor,
  MousePointer,
  Network,
  Package,
  Palette,
  PlayCircle,
  Puzzle,
  Rocket,
  Search,
  Server,
  Settings,
  Shield,
  Target,
  Terminal,
  TestTube,
  TrendingUp,
  Workflow,
  Wrench,
  Zap
} from "lucide-react";

const AnimatedCharacter = ({ character }: { character: string }) => {
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

const AnimatedGradientCharacter = ({ character }: { character: string }) => {
  return (
    <motion.span
      className="inline-block cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500"
      whileHover={{ 
        scale: 1.2,
        backgroundImage: "linear-gradient(to right, #fb923c, #ef4444)",
        textShadow: "0 0 12px rgba(251, 146, 60, 0.8)"
      }}
      transition={{ type: "spring", stiffness: 500, damping: 10 }}
    >
      {character === " " ? "\u00A0" : character}
    </motion.span>
  );
};

type Skill = {
  name: string;
  icon: React.ReactNode;
  category: string;
  color?: string;
};

const skills: Skill[] = [
  // Programming Languages
  {
    name: "Python",
    icon: <Terminal className="h-10 w-10" />,
    category: "Programming Languages",
    color: "text-blue-400"
  },
  {
    name: "JavaScript",
    icon: <FileCode className="h-10 w-10" />,
    category: "Programming Languages",
    color: "text-yellow-400"
  },
  {
    name: "TypeScript",
    icon: <Code className="h-10 w-10" />,
    category: "Programming Languages",
    color: "text-blue-500"
  },
  {
    name: "Java",
    icon: <Binary className="h-10 w-10" />,
    category: "Programming Languages",
    color: "text-red-500"
  },
  {
    name: "C",
    icon: <Cpu className="h-10 w-10" />,
    category: "Programming Languages",
    color: "text-purple-400"
  },
  {
    name: "SQL",
    icon: <Database className="h-10 w-10" />,
    category: "Programming Languages",
    color: "text-green-400"
  },
  {
    name: "MATLAB",
    icon: <Calculator className="h-10 w-10" />,
    category: "Programming Languages",
    color: "text-orange-400"
  },
  {
    name: "Embedded C",
    icon: <CircuitBoard className="h-10 w-10" />,
    category: "Programming Languages",
    color: "text-cyan-400"
  },

  // Web Development
  {
    name: "React.js",
    icon: <Monitor className="h-10 w-10" />,
    category: "Web Development",
    color: "text-cyan-400"
  },
  {
    name: "Next.js",
    icon: <Rocket className="h-10 w-10" />,
    category: "Web Development",
    color: "text-gray-400"
  },
  {
    name: "Node.js",
    icon: <Server className="h-10 w-10" />,
    category: "Web Development",
    color: "text-green-500"
  },
  {
    name: "Express.js",
    icon: <Network className="h-10 w-10" />,
    category: "Web Development",
    color: "text-gray-500"
  },
  {
    name: "HTML5",
    icon: <Globe className="h-10 w-10" />,
    category: "Web Development",
    color: "text-orange-500"
  },
  {
    name: "CSS3",
    icon: <Palette className="h-10 w-10" />,
    category: "Web Development",
    color: "text-blue-400"
  },
  {
    name: "REST APIs",
    icon: <GitMerge className="h-10 w-10" />,
    category: "Web Development",
    color: "text-indigo-400"
  },
  {
    name: "GraphQL",
    icon: <Hash className="h-10 w-10" />,
    category: "Web Development",
    color: "text-pink-400"
  },

  // Machine Learning & AI
  {
    name: "TensorFlow",
    icon: <Brain className="h-10 w-10" />,
    category: "Machine Learning & AI",
    color: "text-orange-400"
  },
  {
    name: "PyTorch",
    icon: <BrainCircuit className="h-10 w-10" />,
    category: "Machine Learning & AI",
    color: "text-red-400"
  },
  {
    name: "Scikit-learn",
    icon: <Target className="h-10 w-10" />,
    category: "Machine Learning & AI",
    color: "text-yellow-500"
  },
  {
    name: "Hugging Face",
    icon: <Lightbulb className="h-10 w-10" />,
    category: "Machine Learning & AI",
    color: "text-purple-400"
  },
  {
    name: "LangChain",
    icon: <Puzzle className="h-10 w-10" />,
    category: "Machine Learning & AI",
    color: "text-green-400"
  },
  {
    name: "OpenAI API",
    icon: <Zap className="h-10 w-10" />,
    category: "Machine Learning & AI",
    color: "text-emerald-400"
  },
  {
    name: "Computer Vision",
    icon: <Eye className="h-10 w-10" />,
    category: "Machine Learning & AI",
    color: "text-blue-500"
  },

  // Data Science & Analytics
  {
    name: "Pandas",
    icon: <Layout className="h-10 w-10" />,
    category: "Data Science & Analytics",
    color: "text-purple-500"
  },
  {
    name: "NumPy",
    icon: <BarChart3 className="h-10 w-10" />,
    category: "Data Science & Analytics",
    color: "text-blue-600"
  },
  {
    name: "Matplotlib",
    icon: <BarChart2 className="h-10 w-10" />,
    category: "Data Science & Analytics",
    color: "text-red-400"
  },
  {
    name: "Seaborn",
    icon: <TrendingUp className="h-10 w-10" />,
    category: "Data Science & Analytics",
    color: "text-teal-400"
  },
  {
    name: "Statistical Analysis",
    icon: <Activity className="h-10 w-10" />,
    category: "Data Science & Analytics",
    color: "text-indigo-500"
  },
  {
    name: "Data Mining",
    icon: <Search className="h-10 w-10" />,
    category: "Data Science & Analytics",
    color: "text-amber-500"
  },
  {
    name: "ETL Pipelines",
    icon: <Workflow className="h-10 w-10" />,
    category: "Data Science & Analytics",
    color: "text-violet-400"
  },

  // Databases
  {
    name: "MySQL",
    icon: <Database className="h-10 w-10" />,
    category: "Databases",
    color: "text-blue-500"
  },
  {
    name: "PostgreSQL",
    icon: <HardDrive className="h-10 w-10" />,
    category: "Databases",
    color: "text-blue-600"
  },
  {
    name: "Oracle",
    icon: <Box className="h-10 w-10" />,
    category: "Databases",
    color: "text-red-500"
  },
  {
    name: "Vector Databases",
    icon: <Compass className="h-10 w-10" />,
    category: "Databases",
    color: "text-purple-400"
  },
  {
    name: "MongoDB",
    icon: <Layers className="h-10 w-10" />,
    category: "Databases",
    color: "text-green-500"
  },

  // Cloud & DevOps
  {
    name: "Microsoft Azure",
    icon: <Cloud className="h-10 w-10" />,
    category: "Cloud & DevOps",
    color: "text-blue-400"
  },
  {
    name: "Docker",
    icon: <Container className="h-10 w-10" />,
    category: "Cloud & DevOps",
    color: "text-blue-500"
  },
  {
    name: "CI/CD Pipelines",
    icon: <GitMerge className="h-10 w-10" />,
    category: "Cloud & DevOps",
    color: "text-green-400"
  },
  {
    name: "Git",
    icon: <GitBranch className="h-10 w-10" />,
    category: "Cloud & DevOps",
    color: "text-orange-500"
  },
  {
    name: "GitHub Actions",
    icon: <PlayCircle className="h-10 w-10" />,
    category: "Cloud & DevOps",
    color: "text-gray-500"
  },
  {
    name: "Vercel",
    icon: <Rocket className="h-10 w-10" />,
    category: "Cloud & DevOps",
    color: "text-black"
  },

  // Testing & Tools
  {
    name: "Selenium",
    icon: <TestTube className="h-10 w-10" />,
    category: "Testing & Tools",
    color: "text-green-400"
  },
  {
    name: "Postman",
    icon: <Command className="h-10 w-10" />,
    category: "Testing & Tools",
    color: "text-orange-500"
  },
  {
    name: "Jest",
    icon: <FlaskConical className="h-10 w-10" />,
    category: "Testing & Tools",
    color: "text-red-400"
  },
  {
    name: "PyTest",
    icon: <Microscope className="h-10 w-10" />,
    category: "Testing & Tools",
    color: "text-blue-400"
  },
  {
    name: "Unit Testing",
    icon: <Shield className="h-10 w-10" />,
    category: "Testing & Tools",
    color: "text-emerald-400"
  },
  {
    name: "Agile/Scrum",
    icon: <Settings className="h-10 w-10" />,
    category: "Testing & Tools",
    color: "text-purple-400"
  },

  // Frameworks & Libraries
  {
    name: "Flask",
    icon: <Package className="h-10 w-10" />,
    category: "Frameworks & Libraries",
    color: "text-gray-400"
  },
  {
    name: "Django",
    icon: <FrameIcon className="h-10 w-10" />,
    category: "Frameworks & Libraries",
    color: "text-green-600"
  },
  {
    name: "FastAPI",
    icon: <Gauge className="h-10 w-10" />,
    category: "Frameworks & Libraries",
    color: "text-teal-400"
  },
  {
    name: "Spring Boot",
    icon: <Wrench className="h-10 w-10" />,
    category: "Frameworks & Libraries",
    color: "text-green-500"
  },
  {
    name: "TailwindCSS",
    icon: <MousePointer className="h-10 w-10" />,
    category: "Frameworks & Libraries",
    color: "text-cyan-400"
  }
];

const Skills = () => {
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duplicateSkills = (marqueeElement: HTMLDivElement) => {
      const originalContent = marqueeElement.innerHTML;
      marqueeElement.innerHTML = originalContent + originalContent; // Duplicate content
    };

    if (marqueeRef1.current) duplicateSkills(marqueeRef1.current);
    if (marqueeRef2.current) duplicateSkills(marqueeRef2.current);
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Create alternating rows from different categories
  const allSkillsFlat = Object.values(groupedSkills).flat();
  const half = Math.ceil(allSkillsFlat.length / 2);
  const firstHalf = allSkillsFlat.slice(0, half);
  const secondHalf = allSkillsFlat.slice(half);

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            {"Tools &".split("").map((char, index) => (
              <AnimatedCharacter key={index} character={char} index={index} />
            ))}
            <span className="mx-2"></span>
            {"Technologies".split("").map((char, index) => (
              <AnimatedGradientCharacter key={index} character={char} index={index} />
            ))}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive showcase of programming languages, frameworks, libraries, and tools 
            that power my development process and enable me to build robust, scalable solutions.
          </p>
        </motion.div>

        <div className="relative overflow-hidden py-12 flex flex-col gap-16">
          {/* First Marquee Row */}
          <div className="overflow-hidden">
            <div ref={marqueeRef1} className="flex gap-8 w-max animate-marquee">
              {firstHalf.map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${index}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center gap-3 min-w-[140px] cursor-pointer group"
                >
                  <div className={`p-4 rounded-xl bg-card border border-primary/10 hover:bg-primary/10 transition-all duration-300 shadow-md hover:shadow-lg group-hover:border-primary/30 ${skill.color || 'text-foreground'}`}>
                    {skill.icon}
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-medium block">{skill.name}</span>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {skill.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Second Marquee Row */}
          <div className="overflow-hidden">
            <div ref={marqueeRef2} className="flex gap-8 w-max animate-marquee-reverse">
              {secondHalf.map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${index}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center gap-3 min-w-[140px] cursor-pointer group"
                >
                  <div className={`p-4 rounded-xl bg-card border border-primary/10 hover:bg-primary/10 transition-all duration-300 shadow-md hover:shadow-lg group-hover:border-primary/30 ${skill.color || 'text-foreground'}`}>
                    {skill.icon}
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-medium block">{skill.name}</span>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {skill.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;