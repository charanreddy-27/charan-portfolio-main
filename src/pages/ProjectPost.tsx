import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projectsdata } from "@/data/projects";

const ProjectPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projectsdata.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Project not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-12 hover:bg-secondary/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>

        <div className="max-w-4xl mx-auto space-y-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-12">
            {project.title}
          </h1>

          <div className="aspect-video w-full bg-secondary/20 rounded-lg mb-16">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="prose prose-invert max-w-none space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-8">Overview</h2>
              <p className="text-lg">{project.overview}</p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-8">Challenges</h2>
              <ul className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="text-lg">{challenge}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-8">Solution</h2>
              <p className="text-lg">{project.solution}</p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-8">Outcome</h2>
              <p className="text-lg">{project.outcome}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPost;