
import { BlogPost } from './types';
import { tailwindBestPractices } from './tailwind-best-practices';
import { nextjsFeatures } from './nextjs-features';
import { nextjsPerformance } from './nextjs-performance';
import { gsapAnimations } from './gsap-animations';
import { tailwindDarkMode } from './tailwind-dark-mode';
import { hoverEffects } from './hover-effects';

export const blogPosts: BlogPost[] = [
  tailwindBestPractices,
  nextjsFeatures,
  nextjsPerformance,
  gsapAnimations,
  tailwindDarkMode,
  hoverEffects,
];

export type { BlogPost };
