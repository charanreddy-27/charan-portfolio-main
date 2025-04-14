import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

import {
  Code, Database, Cloud, PenTool, Server, Laptop, Rocket,
  GitBranch, Layers, FrameIcon, Type, Terminal, Database as DbIcon
} from "lucide-react";

type Skill = {
  name: string;
  icon: React.ReactNode;
  category: string;
};

const skills: Skill[] = [
  {
    name: "Next.js",
    icon: <Code className="h-10 w-10" />,
    category: "Frameworks",
  },
  {
    name: "Tailwind CSS",
    icon: <Terminal className="h-10 w-10" />,
    category: "Frameworks",
  },
  {
    name: "Google Cloud",
    icon: <Cloud className="h-10 w-10" />,
    category: "Cloud",
  },
  {
    name: "Figma",
    icon: <PenTool className="h-10 w-10" />,
    category: "Design",
  },
  {
    name: "Docker",
    icon: <Server className="h-10 w-10" />,
    category: "DevOps",
  },
  {
    name: "Neo4j",
    icon: <DbIcon className="h-10 w-10" />,
    category: "Database",
  },
  {
    name: "GSAP",
    icon: <Laptop className="h-10 w-10" />,
    category: "Animation",
  },
  {
    name: "Vercel",
    icon: <Rocket className="h-10 w-10" />,
    category: "DevOps",
  },
  {
    name: "Git",
    icon: <GitBranch className="h-10 w-10" />,
    category: "DevOps",
  },
  {
    name: "Kubernetes",
    icon: <Layers className="h-10 w-10" />,
    category: "DevOps",
  },
  {
    name: "React",
    icon: <FrameIcon className="h-10 w-10" />,
    category: "Frameworks",
  },
  {
    name: "TypeScript",
    icon: <Type className="h-10 w-10" />,
    category: "Languages",
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
        {/* <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground mb-12"
        >
          Tools and frameworks that power my creations
        </motion.p> */}

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