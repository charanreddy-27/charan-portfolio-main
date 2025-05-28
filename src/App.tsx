import { useEffect } from "react";
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
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ProjectPost from "./pages/ProjectPost";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certificates";
import About from "./pages/About";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

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
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CustomCursor />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation />
            <ScrollToTop /> {/* Automatically scroll to top on route change */}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project/:slug" element={<ProjectPost />} />
              <Route path="/certificates" element={<Certifications />} />
            </Routes>
            <BackToTop />
            <Footer />
            <Analytics debug={process.env.NODE_ENV === 'development'} />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
      {/* Add this just once, anywhere globally */}
      <SpeedInsights />
    </>
  );
};

export default App;