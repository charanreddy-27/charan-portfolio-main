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
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 0.5,
        })), 
    []);

    // Inject CSS keyframes for floating animation
    useMemo(() => {
        if (!document.getElementById('floating-icons-styles')) {
            const style = document.createElement('style');
            style.id = 'floating-icons-styles';
            style.textContent = `
                @keyframes float-icon {
                    0%, 100% { transform: translateY(0px) translateZ(0); }
                    50% { transform: translateY(-30px) translateZ(0); }
                }
                .floating-icon {
                    will-change: transform;
                    contain: paint layout;
                }
            `;
            document.head.appendChild(style);
        }
    }, []);

    useEffect(() => {
        if (!iconsContainerRef.current || prefersReducedMotion) return;

        // Use GSAP context for better cleanup and performance
        contextRef.current = gsap.context(() => {
            const floatingIcons = gsap.utils.toArray<HTMLElement>(".floating-icon");
            
            if (floatingIcons.length > 0) {
                // Batch animations for better performance using timeline
                floatingIcons.forEach((icon, index) => {
                    const position = iconPositions[index];
                    gsap.to(icon, {
                        y: "-=30",
                        duration: position.duration,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: position.delay,
                        // GPU acceleration settings
                        force3D: true,
                        transformOrigin: "center center",
                    });
                });
            }
        }, iconsContainerRef.current);

        return () => {
            if (contextRef.current) {
                contextRef.current.revert();
            }
        };
    }, [prefersReducedMotion, iconPositions]);

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
                        className="floating-icon text-primary opacity-20 absolute"
                        style={{
                            top: `${position.top}%`,
                            left: `${position.left}%`,
                            transform: `translate(-50%, -50%) translateZ(0)`,
                            width: `${position.size}px`,
                            height: `${position.size}px`,
                            backfaceVisibility: 'hidden',
                            perspective: 1000,
                            WebkitFontSmoothing: 'antialiased',
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