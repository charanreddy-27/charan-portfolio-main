import { motion } from "framer-motion";
import { memo } from "react";

/**
 * Gradient preset type for AnimatedGradientCharacter.
 * Uses a curated set of harmonious gradients that match the purple primary brand.
 */
export type GradientPreset = "primary" | "accent" | "highlight";

/**
 * Predefined gradient configurations.
 * Kept to 3 harmonious presets that complement the purple primary brand color.
 */
const GRADIENT_PRESETS: Record<
  GradientPreset,
  { className: string; hoverGradient: string; glowColor: string }
> = {
  /** violet → purple — default, matches the primary brand */
  primary: {
    className: "from-violet-400 to-purple-500",
    hoverGradient: "linear-gradient(to right, #a78bfa, #a855f7)",
    glowColor: "rgba(167, 139, 250, 0.8)",
  },
  /** purple → pink — warmer accent for variety */
  accent: {
    className: "from-purple-400 to-pink-500",
    hoverGradient: "linear-gradient(to right, #c084fc, #ec4899)",
    glowColor: "rgba(192, 132, 252, 0.8)",
  },
  /** blue → violet — cooler complement */
  highlight: {
    className: "from-blue-400 to-violet-500",
    hoverGradient: "linear-gradient(to right, #60a5fa, #8b5cf6)",
    glowColor: "rgba(96, 165, 250, 0.8)",
  },
};

// ─── AnimatedCharacter ──────────────────────────────────────────────────────
// A single character that scales up with a white glow on hover.
// Used for the "plain" part of section headings (e.g. "My", "Latest", "About").

interface AnimatedCharacterProps {
  character: string;
}

export const AnimatedCharacter = memo(({ character }: AnimatedCharacterProps) => {
  return (
    <motion.span
      className="inline-block cursor-pointer will-change-transform"
      whileHover={{
        scale: 1.2,
        color: "#ffffff",
        textShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 12 }}
      layout={false}
    >
      {character === " " ? "\u00A0" : character}
    </motion.span>
  );
});

AnimatedCharacter.displayName = 'AnimatedCharacter';

// ─── AnimatedGradientCharacter ──────────────────────────────────────────────
// A single character rendered with a gradient fill that intensifies on hover.
// Used for the "highlighted" part of section headings (e.g. "Projects", "Me").

interface AnimatedGradientCharacterProps {
  character: string;
  gradient?: GradientPreset;
}

export const AnimatedGradientCharacter = memo(({
  character,
  gradient = "primary",
}: AnimatedGradientCharacterProps) => {
  const preset = GRADIENT_PRESETS[gradient];

  return (
    <motion.span
      className={`inline-block cursor-pointer bg-clip-text text-transparent bg-gradient-to-r ${preset.className} will-change-transform`}
      whileHover={{
        scale: 1.2,
        backgroundImage: preset.hoverGradient,
        textShadow: `0 0 12px ${preset.glowColor}`,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 12 }}
      layout={false}
    >
      {character === " " ? "\u00A0" : character}
    </motion.span>
  );
});

AnimatedGradientCharacter.displayName = 'AnimatedGradientCharacter';

// ─── AnimatedHeading ────────────────────────────────────────────────────────
// Convenience wrapper: renders a two-part heading where the first part uses
// plain AnimatedCharacter and the second part uses AnimatedGradientCharacter.
// Eliminates the repetitive .split('').map() boilerplate in every page.

interface AnimatedHeadingProps {
  /** The plain (white) part of the heading */
  plainText: string;
  /** The gradient-highlighted part of the heading */
  gradientText: string;
  /** Which gradient preset to use for the highlighted text */
  gradient?: GradientPreset;
}

export const AnimatedHeading = memo(({
  plainText,
  gradientText,
  gradient = "primary",
}: AnimatedHeadingProps) => {
  return (
    <>
      <div className="mr-3">
        {plainText.split("").map((char, index) => (
          <AnimatedCharacter key={index} character={char} />
        ))}
      </div>
      <div>
        {gradientText.split("").map((char, index) => (
          <AnimatedGradientCharacter
            key={index}
            character={char}
            gradient={gradient}
          />
        ))}
      </div>
    </>
  );
});

AnimatedHeading.displayName = 'AnimatedHeading';
