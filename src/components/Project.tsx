import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { projectsdata } from "@/data/projects";
import { AnimatedCharacter, AnimatedGradientCharacter } from "./elements/AnimatedText";
import type { ProjectCategory } from "@/types";

// Category badge styling
const getCategoryStyles = (category: ProjectCategory) => {
  const styles: Record<ProjectCategory, { bg: string; text: string; label: string }> = {
    "web-app": { bg: "bg-blue-500/20", text: "text-blue-300", label: "Web" },
    "mobile-app": { bg: "bg-purple-500/20", text: "text-purple-300", label: "Mobile" },
    "data-science": { bg: "bg-amber-500/20", text: "text-amber-300", label: "Data" },
    "machine-learning": { bg: "bg-emerald-500/20", text: "text-emerald-300", label: "ML" },
    "ai": { bg: "bg-pink-500/20", text: "text-pink-300", label: "AI" },
    "iot": { bg: "bg-cyan-500/20", text: "text-cyan-300", label: "IoT" },
    "other": { bg: "bg-gray-500/20", text: "text-gray-300", label: "Other" },
  };
  return styles[category];
};

const Project = () => {
  const projects = projectsdata.slice(0, 2); // Show only 2
  const navigate = useNavigate();
  const myText = "My";
  const projectsText = "Projects";

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background/90 to-background">
      <div className="container mx-auto px-4">

        {/* Animated Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 flex flex-wrap justify-center"
        >
          <div className="mr-3">
            {myText.split('').map((char, index) => (
              <AnimatedCharacter key={index} character={char} />
            ))}
          </div>
          <div>
            {projectsText.split('').map((char, index) => (
              <AnimatedGradientCharacter key={index} character={char} gradient="highlight" />
            ))}
          </div>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10" role="region" aria-label="Featured projects">
          {projects.map((project, index) => {
            const categoryStyle = getCategoryStyles(project.category);
            return (
            <article
              key={project.id}
              className="w-full h-[60vh] relative bg-secondary/10 rounded-2xl overflow-hidden backdrop-blur-md hover:bg-secondary/25 transition-all duration-500 group border border-primary/10 hover:border-primary/30"
              aria-labelledby={`project-title-${index}`}
            >
              <div className="absolute inset-0">
                <img
                  src={project.image}
                  alt={`Screenshot of ${project.title} project showing ${project.description}`}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-all duration-500 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background/95" />
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`inline-block px-3 py-1 text-xs md:text-sm font-semibold rounded-full backdrop-blur-md border border-primary/20 ${categoryStyle.bg} ${categoryStyle.text}`}>
                  {categoryStyle.label}
                </span>
              </div>

              {/* Default State: Title + Tech Stack */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                <div className="flex-1" />
                
                {/* Title - Visible by default, scales down on hover */}
                <div className="transform group-hover:translate-y-32 transition-transform duration-500 space-y-3">
                  <h3 
                    id={`project-title-${index}`}
                    className="text-2xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 line-clamp-2"
                  >
                    {project.title}
                  </h3>
                  
                  {/* Tech Stack - Visible by default */}
                  <div className="flex flex-wrap gap-1.5" role="list" aria-label="Technologies used">
                    {project.tools.slice(0, 4).map((tool) => (
                      <span
                        key={tool}
                        role="listitem"
                        className="px-2 py-0.5 text-xs bg-primary/15 text-primary/80 rounded-full backdrop-blur-sm border border-primary/20"
                      >
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 4 && (
                      <span className="px-2 py-0.5 text-xs text-primary/60">
                        +{project.tools.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Hover Reveal State: Description + CTA */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex-1" />
                
                <div className="space-y-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-sm md:text-base text-muted-foreground/90 line-clamp-3">
                    {project.description}
                  </p>

                  <Button
                    onClick={() => {
                      navigate(`/project/${project.slug}`);
                    }}
                    size="sm"
                    className="group/btn bg-primary/30 hover:bg-primary backdrop-blur-sm border border-primary/40 hover:border-primary text-primary-foreground hover:text-white w-full md:w-auto"
                    aria-describedby={`project-title-${index}`}
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </article>
            );
          })}
        </div>

        {/* View All Projects Button */}
        <div className="mt-16 text-center">
        <Button
  onClick={() => navigate("/projects")}
  className="group bg-primary/50 hover:bg-primary text-primary-foreground transition-all duration-500 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 mx-auto"
>
  View All Projects
  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
</Button>

        </div>
      </div>
    </section>
  );
};

export default Project;
