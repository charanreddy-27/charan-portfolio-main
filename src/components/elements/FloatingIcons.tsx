import { useEffect, useRef, memo, useMemo } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/utils/monitoring";
import {
    Cloud,
    Code,
    Cpu,
    Database,
    Figma,
    Globe,
    Layers,
    PenTool,
    Server,
    Terminal,
} from "lucide-react";

const FloatingIcons = memo(() => {
    const iconsContainerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();
    const contextRef = useRef<gsap.Context | null>(null);

    // Memoize icon positions to avoid recalculation
    const iconPositions = useMemo(() => 
        Array.from({ length: 10 }).map(() => ({
            top: Math.random() * 100,
            left: Math.random() * 100,
            size: Math.random() * 50 + 40,
        })), 
    []);

    useEffect(() => {
        if (!iconsContainerRef.current || prefersReducedMotion) return;

        // Use GSAP context for better cleanup
        contextRef.current = gsap.context(() => {
            const floatingIcons = gsap.utils.toArray<HTMLElement>(".floating-icon");
            
            if (floatingIcons.length > 0) {
                // Batch animations for better performance
                floatingIcons.forEach((icon, index) => {
                    gsap.to(icon, {
                        y: "-=30",
                        duration: 3 + Math.random() * 2, // Vary duration for natural feel
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: index * 0.15,
                        // GPU acceleration
                        force3D: true,
                    });
                });
            }
        }, iconsContainerRef.current);

        return () => {
            if (contextRef.current) {
                contextRef.current.revert();
            }
        };
    }, [prefersReducedMotion]);

    const IconComponent = [
        Database,
        PenTool,
        Figma,
        Code,
        Cpu,
        Layers,
        Server,
        Terminal,
        Globe,
        Cloud,
    ];

    return (
        <div 
            ref={iconsContainerRef} 
            className="absolute inset-0 pointer-events-none overflow-hidden"
            role="presentation"
            aria-hidden="true"
        >
            {iconPositions.map((position, index) => {
                const Icon = IconComponent[index % 10];

                return (
                    <Icon
                        key={index}
                        className="floating-icon text-primary opacity-20 absolute will-change-transform"
                        style={{
                            top: `${position.top}%`,
                            left: `${position.left}%`,
                            transform: `translate(-50%, -50%)`,
                            width: `${position.size}px`,
                            height: `${position.size}px`,
                            backfaceVisibility: 'hidden',
                            perspective: 1000,
                        }}
                        aria-hidden="true"
                    />
                );
            })}
        </div>
    );
});

FloatingIcons.displayName = 'FloatingIcons';

export default FloatingIcons;