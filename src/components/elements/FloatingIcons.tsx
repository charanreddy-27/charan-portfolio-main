import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
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
} from "lucide-react";

const FloatingIcons = () => {
    const iconsContainerRef = useRef<HTMLDivElement>(null);

    const iconPositions = Array.from({ length: 10 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 50 + 40,
    }));

    useEffect(() => {
        if (!iconsContainerRef.current) return;

        const floatingIcons = gsap.utils.toArray<HTMLElement>(".floating-icon");
        if (floatingIcons.length > 0) {
            floatingIcons.forEach((icon, index) => {
                gsap.to(icon, {
                    y: "-=30",
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                    delay: index * 0.2,
                });
            });
        }
    }, []);

    return (
        <div ref={iconsContainerRef} className="absolute inset-0 pointer-events-none">
            {iconPositions.map((position, index) => {
                const Icon = [
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
                ][index % 10];

                return (
                    <Icon
                        key={index}
                        className="floating-icon text-primary opacity-20 absolute"
                        style={{
                            top: `${position.top}%`,
                            left: `${position.left}%`,
                            transform: `translate(-50%, -50%)`,
                            width: `${position.size}px`,
                            height: `${position.size}px`,
                        }}
                    />
                );
            })}
        </div>
    );
};

export default FloatingIcons;