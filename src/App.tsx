import { lazy, Suspense, useEffect } from "react";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CustomCursor from "./components/Cursor";
import Navigation from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import BackgroundPattern from "./components/elements/BackgroundPattern";
import { logPerformanceMetrics, usePerformanceTracking } from "@/utils/monitoring";
import WebVitalsDisplay from "@/components/WebVitalsDisplay";

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
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Simplified loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// ScrollToTop component
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

const App = () => {
  // Performance monitoring for the main app
  usePerformanceTracking('App');

  // Log performance metrics in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const timer = setTimeout(() => {
        logPerformanceMetrics();
      }, 3000); // Log after 3 seconds of app load

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AccessibilityProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CustomCursor />
          <Toaster />
          <BrowserRouter>
            <BackgroundPattern pattern="dots" opacity={0.03} />
            
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
            <Analytics />
            
            {/* Web Vitals Dashboard - Development only */}
            <WebVitalsDisplay />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
      <SpeedInsights />
    </AccessibilityProvider>
  );
};

export default App;