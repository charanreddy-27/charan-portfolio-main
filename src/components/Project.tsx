import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { projectsdata } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const Project = () => {
  const projects = projectsdata.slice(0, 3);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [showViewAll, setShowViewAll] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    const totalPanels = projects.length;
    const panelWidth = window.innerWidth;

    container.style.width = `${totalPanels * 100}%`;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: `+=${panelWidth * (totalPanels - 1)}`,
        scrub: 1,
        onUpdate: (self) => {
          setShowViewAll(self.progress > 0.95);
        }
      }
    });

    tl.to(container, {
      x: `-${(totalPanels - 1) * panelWidth}px`,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-screen overflow-hidden bg-gradient-to-br from-background via-background/90 to-background"
      >
        <div ref={containerRef} className="flex h-full absolute top-0 left-0">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`w-screen h-full flex items-center justify-center project-${index}`}
            >
              <div className="w-[90vw] h-[80vh] relative bg-secondary/10 rounded-2xl overflow-hidden backdrop-blur-md hover:bg-secondary/20 transition-all duration-500 group">
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
                    <Button
                      onClick={() => navigate(`/project/${project.slug}`)}
                      size="lg"
                      className="group/btn bg-primary/20 hover:bg-primary backdrop-blur-sm mb-5"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                    <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                      {project.title}
                    </h3>
                    <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-4 py-2 text-sm bg-primary/20 text-primary rounded-full backdrop-blur-sm"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showViewAll && (
          <Button
            onClick={() => navigate("/project")}
            className="group relative bg-primary/50 hover:bg-primary text-primary-foreground transition-all duration-500 overflow-hidden bottom-16 right-8 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            View All Projects
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        )}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-center text-muted-foreground flex items-center gap-2">
          <ChevronDown className="w-6 h-6" />
          <p className="text-sm">Scroll Down for More</p>
        </div>


      </section>
    </>
  );
};

export default Project;
