import { useEffect, lazy, Suspense } from "react";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import CustomCursor from "./components/Cursor";
import Navigation from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Skeleton from "@/components/elements/SkeletonLoader";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import BackgroundPattern from "./components/elements/BackgroundPattern";

// Lazy-loaded components
const Index = lazy(() => import("./pages/Index"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ProjectPost = lazy(() => import("./pages/ProjectPost"));
const Projects = lazy(() => import("./pages/Projects"));
const Certifications = lazy(() => import("./pages/Certificates"));
const About = lazy(() => import("./pages/About"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-full max-w-3xl mx-auto px-4 py-12 space-y-8">
      <Skeleton variant="text" width="60%" height={40} />
      <div className="space-y-4">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton variant="card" />
        <Skeleton variant="card" />
      </div>
    </div>
  </div>
);

// ScrollToTop component to handle automatic scrolling
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

const App = () => {
  return (
    <AccessibilityProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CustomCursor />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* Background patterns */}
            <BackgroundPattern pattern="dots" opacity={0.03} />
            
            {/* Skip to content link for keyboard users */}
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>
            
            <Navigation />
            <ScrollToTop />
            
            <main id="main-content" tabIndex={-1} style={{ outline: "none" }} className="relative">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/project/:slug" element={<ProjectPost />} />
                  <Route path="/certificates" element={<Certifications />} />
                </Routes>
              </Suspense>
            </main>
            
            <BackToTop />
            <Footer />
            <Analytics debug={process.env.NODE_ENV === 'development'} />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
      <SpeedInsights />
    </AccessibilityProvider>
  );
};

export default App;