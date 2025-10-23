import { useEffect, useRef } from "react";
import { ArrowDown, Download, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import FloatingIcons from "./elements/FloatingIcons";
import TypingAnimation from "./effects/TypingAnimation";
import { usePerformanceTracking, usePrefersReducedMotion } from "@/utils/monitoring";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // Performance monitoring
  usePerformanceTracking('Hero');
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !buttonsRef.current || !scrollIndicatorRef.current) {
      return;
    }

    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion) {
      // Simple fade-in for reduced motion users
      gsap.set([headingRef.current, buttonsRef.current, scrollIndicatorRef.current], { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Only apply SplitType to the heading, not the typing animation
      const titleText = new SplitType(headingRef.current!, {
        types: "chars",
        tagName: "span",
      });

      if (titleText.chars) {
        titleText.chars.forEach((char) => {
          char.addEventListener("mouseenter", () => {
            gsap.to(char, {
              scale: 1.4,
              color: "#9333EA",
              duration: 0.3,
              ease: "power2.out",
            });
          });

          char.addEventListener("mouseleave", () => {
            gsap.to(char, {
              scale: 1,
              color: "inherit",
              duration: 0.3,
              ease: "power2.in",
            });
          });
        });
      }

      const tl = gsap.timeline();

      tl.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          typingRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          buttonsRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          scrollIndicatorRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]); // Add dependency

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden text-center px-4"
    >
      <FloatingIcons />

      <div className="relative z-10">
        <h1
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6"
        >
          Hi, I'm <span className="text-primary">Charan Reddy</span>.
        </h1>
        <div 
          ref={typingRef}
          className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6"
        >
          <TypingAnimation 
            texts={[
              "In the World of Static - I Create Dynamic."
            ]}
            typingSpeed={80}
            deletingSpeed={40}
            delayBetweenTexts={999999}
            className="inline-block"
          />
        </div>
        <div
          ref={buttonsRef}
          className="flex flex-wrap gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="group relative overflow-hidden hover:scale-105 transition-transform duration-300 flex items-center gap-2"
            onClick={() => window.open("https://github.com/charanreddy-27", "_blank")}
          >
            <Github className="w-5 h-5 text-white group-hover:text-gray-300" />
            <span className="relative z-10">View on GitHub</span>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="group relative overflow-hidden hover:scale-105 transition-transform duration-300 flex items-center gap-2"
            onClick={() => window.open("https://drive.google.com/file/d/1TQ105Q_lL_gpoGQT9F5WVJVFIb7Q1sSm/view?usp=sharing", "_blank")}
          >
            <Download className="w-5 h-5 group-hover:text-primary" />
            <span className="relative z-10">Download CV</span>
          </Button>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span
          className="text-sm text-muted-foreground cursor-pointer"
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
        >
          Scroll
        </span>
        <ArrowDown
          className="w-6 h-6 text-primary animate-bounce cursor-pointer"
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
        />
      </div>
    </section>
  );
};

export default Hero;