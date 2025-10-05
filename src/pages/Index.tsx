import { HomeSEO } from "@/components/SEO";
import Hero from "@/components/Hero";
import Project from "@/components/Project";
import Research from "@/components/Research";
import Skills from "@/components/Skills";
import BlogSection from "@/components/Blogs";
import AboutTeaser from "@/components/elements/AboutTeaser";


const Index = () => {
  return (
    <>
      <HomeSEO />
      <div className="min-h-screen bg-background text-foreground">
        <Hero />
        <Skills />
        <Research />
        <Project />
        <BlogSection />
        <AboutTeaser />
      </div>
    </>
  );
};

export default Index;