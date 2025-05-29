import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import type { ISourceOptions, MoveDirection } from "tsparticles-engine";

interface ParticleBackgroundProps {
  className?: string;
  variant?: "menu" | "default";
}

const ParticleBackground = ({ className = "", variant = "default" }: ParticleBackgroundProps) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const menuConfig: ISourceOptions = {
    fullScreen: false,
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: "#6d28d9",
      },
      links: {
        color: "#6d28d9",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      collisions: {
        enable: false,
      },
      move: {
        direction: "none" as MoveDirection,
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 0.5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 20,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  const defaultConfig: ISourceOptions = {
    fullScreen: false,
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: "#6d28d9",
      },
      links: {
        color: "#6d28d9",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      collisions: {
        enable: false,
      },
      move: {
        direction: "none" as MoveDirection,
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 40,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  };

  const config = variant === "menu" ? menuConfig : defaultConfig;

  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Particles
        id={`tsparticles-${variant}`}
        init={particlesInit}
        options={config}
        className="h-full w-full"
      />
    </div>
  );
};

export default ParticleBackground; 