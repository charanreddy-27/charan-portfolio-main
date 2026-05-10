import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/utils/cn";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const trail = trailRef.current;

    if (!cursor || !follower || !trail) return;

    document.body.style.cursor = "none";

    // Inject optimized cursor styles with CSS transitions
    if (!document.getElementById('cursor-styles')) {
      const style = document.createElement('style');
      style.id = 'cursor-styles';
      style.textContent = `
        .cursor-dot, .cursor-follower, .cursor-trail {
          will-change: transform;
          contain: layout style paint;
        }
        .cursor-dot { transition: all 0.15s ease-out; }
        .cursor-follower { transition: all 0.2s ease-out; }
        .cursor-trail { transition: all 0.25s ease-out; }
      `;
      document.head.appendChild(style);
    }

    let lastX = 0, lastY = 0;

    const updatePosition = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      lastX = x;
      lastY = y;

      // Throttle updates using RAF
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      
      rafRef.current = requestAnimationFrame(() => {
        // Use CSS transforms for better GPU acceleration
        cursor!.style.transform = `translate(${x - 8}px, ${y - 8}px)`;
        follower!.style.transform = `translate(${x - 12}px, ${y - 12}px)`;
        trail!.style.transform = `translate(${x - 16}px, ${y - 16}px)`;
      });
    };

    const handleIdleState = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      setIsIdle(false);

      idleTimerRef.current = window.setTimeout(() => {
        setIsIdle(true);
        gsap.to(cursor, { scale: 1.2, opacity: 0.7, duration: 0.3 });
      }, 3000);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || !(target instanceof HTMLElement)) return;

      const tagName = target.tagName.toLowerCase();

      const cursorStyles: Record<string, any> = {
        a: { scale: 1.5, backgroundColor: "rgba(147, 51, 234, 0.6)" },
        button: { scale: 1.5, backgroundColor: "rgba(147, 51, 234, 0.6)" },
        img: { scale: 1.3, borderColor: "rgba(147, 51, 234, 0.8)" },
        p: { width: "4px", height: "24px", backgroundColor: "rgb(147, 51, 234)" },
        h1: { width: "4px", height: "24px", backgroundColor: "rgb(147, 51, 234)" },
      };

      if (cursorStyles[tagName]) {
        gsap.to(cursor, { ...cursorStyles[tagName], duration: 0.2 });
      }
    };

    const resetCursor = () => {
      gsap.to(cursor, {
        scale: 1,
        width: "16px",
        height: "16px",
        backgroundColor: "rgba(147, 51, 234, 0.4)",
        borderColor: "rgba(147, 51, 234, 0.8)",
        duration: 0.2,
      });
    };

    const handleClick = () => {
      gsap.fromTo(
        cursor,
        { scale: 0.8 },
        { scale: 1, duration: 0.15, ease: "power2.out" }
      );
    };

    document.addEventListener("mousemove", updatePosition, { passive: true });
    document.addEventListener("mousemove", handleIdleState);
    document.addEventListener("mouseenter", handleHover, true);
    document.addEventListener("mouseleave", resetCursor, true);
    document.addEventListener("click", handleClick);

    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousemove", handleIdleState);
      document.removeEventListener("mouseenter", handleHover, true);
      document.removeEventListener("mouseleave", resetCursor, true);
      document.removeEventListener("click", handleClick);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={cn(
          "cursor-dot fixed pointer-events-none z-50 w-4 h-4 rounded-full bg-primary/40 border-2 border-primary/80 mix-blend-difference scale-100",
          isIdle && "opacity-70"
        )}
      />
      <div
        ref={followerRef}
        className="cursor-follower fixed pointer-events-none z-40 w-6 h-6 rounded-full bg-primary/20 mix-blend-difference"
      />
      <div
        ref={trailRef}
        className="cursor-trail fixed pointer-events-none z-30 w-8 h-8 rounded-full bg-primary/10 mix-blend-difference"
      />
    </>
  );
};

export default CustomCursor;
