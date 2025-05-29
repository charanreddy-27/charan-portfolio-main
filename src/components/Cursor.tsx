import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/utils/cn";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const trail = trailRef.current;

    if (!cursor || !follower || !trail) return;

    document.body.style.cursor = "none";

    const updatePosition = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Faster transitions for better performance
      gsap.to(cursor, { x: x - 8, y: y - 8, duration: 0.1 });
      gsap.to(follower, { x: x - 12, y: y - 12, duration: 0.15 });
      gsap.to(trail, { x: x - 16, y: y - 16, duration: 0.2 });
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

    document.addEventListener("mousemove", updatePosition);
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
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={cn(
          "fixed pointer-events-none z-50 w-4 h-4 rounded-full bg-primary/40 border-2 border-primary/80 mix-blend-difference scale-100",
          isIdle && "opacity-70"
        )}
      />
      <div
        ref={followerRef}
        className="fixed pointer-events-none z-40 w-6 h-6 rounded-full bg-primary/20 mix-blend-difference transition-transform"
      />
      <div
        ref={trailRef}
        className="fixed pointer-events-none z-30 w-8 h-8 rounded-full bg-primary/10 mix-blend-difference transition-transform"
      />
    </>
  );
};

export default CustomCursor;
