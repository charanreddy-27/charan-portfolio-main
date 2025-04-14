import Hero from "@/components/Hero";
import Project from "@/components/Project";
import Research from "@/components/Research";
import Skills from "@/components/Skills";
import BlogSection from "@/components/Blogs";


const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <Skills />
      <Research />
      <Project />
      <BlogSection />
    </div>
  );
};

export default Index;