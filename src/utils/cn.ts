import { twMerge } from "tailwind-merge";

/**
 * Merge multiple class names with Tailwind CSS support
 * @param inputs - Class names to merge
 * @returns Merged class names
 */
export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(
    inputs
      .filter(Boolean)
      .join(" ")
  );
} 