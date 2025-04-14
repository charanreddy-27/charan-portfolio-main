
import { ArrowUp } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const BackToTop = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const scrollToTop = () => {
    if (!buttonRef.current) return;

    gsap.to(window, {
      duration: 1.5,
      scrollTo: {
        y: 0,
        autoKill: false
      },
      ease: "power3.inOut",
    });
  };

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const showButton = () => {
      gsap.to(button, {
        opacity: window.scrollY > 500 ? 1 : 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    };

    window.addEventListener('scroll', showButton);
    return () => window.removeEventListener('scroll', showButton);
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary/90 text-primary-foreground opacity-0 transition-all duration-300 hover:scale-110"
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default BackToTop;
