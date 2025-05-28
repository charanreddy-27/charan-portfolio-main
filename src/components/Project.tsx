import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projectsdata } from "@/data/projects";
import { motion } from "framer-motion";

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
      className="inline-block cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
      whileHover={{ 
        scale: 1.2,
        backgroundImage: "linear-gradient(to right, #60a5fa, #a855f7)",
        textShadow: "0 0 12px rgba(96, 165, 250, 0.8)"
      }}
      transition={{ type: "spring", stiffness: 500, damping: 10 }}
    >
      {character === " " ? "\u00A0" : character}
    </motion.span>
  );
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
              <AnimatedCharacter key={index} character={char} index={index} />
            ))}
          </div>
          <div>
            {projectsText.split('').map((char, index) => (
              <AnimatedGradientCharacter key={index} character={char} index={index} />
            ))}
          </div>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="w-full h-[80vh] relative bg-secondary/10 rounded-2xl overflow-hidden backdrop-blur-md hover:bg-secondary/20 transition-all duration-500 group"
            >
              <div className="absolute inset-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-all duration-500 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background/90" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl md:text-4xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                    {project.title}
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground mb-4 max-w-2xl">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 text-sm bg-primary/20 text-primary rounded-full backdrop-blur-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <Button
                    onClick={() => navigate(`/project/${project.slug}`)}
                    size="lg"
                    className="group/btn bg-primary/20 hover:bg-primary backdrop-blur-sm"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
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
