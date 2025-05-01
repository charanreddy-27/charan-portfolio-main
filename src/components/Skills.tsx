import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

import {
  Code,
  Database,
  Cloud,
  PenTool,
  Server,
  Laptop,
  Rocket,
  GitBranch,
  Layers,
  FrameIcon,
  Type,
  Terminal,
  BookOpen,
  Monitor,
  BarChart2,
  Globe,
  Layout,
} from "lucide-react";

type Skill = {
  name: string;
  icon: React.ReactNode;
  category: string;
};

const skills: Skill[] = [
  {
    name: "Python",
    icon: <Terminal className="h-10 w-10" />, // Alternative icon for Python
    category: "Languages",
  },
  {
    name: "Java",
    icon: <Code className="h-10 w-10" />, // Alternative icon for Java
    category: "Languages",
  },
  {
    name: "React",
    icon: <Monitor className="h-10 w-10" />, // Alternative icon for React
    category: "Frameworks",
  },
  {
    name: "NoSQL",
    icon: <Database className="h-10 w-10" />,
    category: "Database",
  },
  {
    name: "Power BI",
    icon: <BarChart2 className="h-10 w-10" />, // Alternative icon for Power BI
    category: "Data Visualization",
  },
  {
    name: "Figma",
    icon: <PenTool className="h-10 w-10" />,
    category: "Design",
  },
  {
    name: "WordPress",
    icon: <Globe className="h-10 w-10" />, // Alternative icon for WordPress
    category: "CMS",
  },
  {
    name: "Pandas",
    icon: <Layout className="h-10 w-10" />, // Alternative icon for Pandas
    category: "Libraries",
  },
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

  const half = Math.ceil(skills.length / 2);
  const firstHalf = skills.slice(0, half);
  const secondHalf = skills.slice(half);

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-heading font-bold mb-4"
        >
          Tools and Frameworks that Power my Creations
        </motion.h2>

        <div className="relative overflow-hidden py-12 flex flex-col gap-16">
          {/* First Marquee Row */}
          <div className="overflow-hidden">
            <div ref={marqueeRef1} className="flex gap-8 w-max animate-marquee">
              {firstHalf.map((skill, index) => (
                <div
                  key={`${skill.name}-${index}`}
                  className="flex flex-col items-center gap-2 min-w-[120px] hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="p-4 rounded-xl bg-card border border-primary/10 hover:bg-primary/10">
                    {skill.icon}
                  </div>
                  <span className="text-sm font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Second Marquee Row */}
          <div className="overflow-hidden">
            <div ref={marqueeRef2} className="flex gap-8 w-max animate-marquee-reverse">
              {secondHalf.map((skill, index) => (
                <div
                  key={`${skill.name}-${index}`}
                  className="flex flex-col items-center gap-2 min-w-[120px] hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="p-4 rounded-xl bg-card border border-primary/10 hover:bg-primary/10">
                    {skill.icon}
                  </div>
                  <span className="text-sm font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;