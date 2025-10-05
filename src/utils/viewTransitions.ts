// View Transitions API Helper
// Provides smooth page transitions with fallback for unsupported browsers

/**
 * Check if View Transitions API is supported
 */
export const isViewTransitionSupported = (): boolean => {
  return typeof document !== 'undefined' && 'startViewTransition' in document;
};

/**
 * Perform a view transition with fallback
 * @param callback - Function to execute during transition
 * @returns Promise that resolves when transition completes
 */
export const withViewTransition = async (callback: () => void | Promise<void>): Promise<void> => {
  if (!isViewTransitionSupported()) {
    // Fallback: just execute the callback
    await callback();
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = document as any;
    const transition = doc.startViewTransition(async () => {
      await callback();
    });

    await transition.ready;
    await transition.finished;
  } catch (error) {
    // Fallback if transition fails
    console.warn('View transition failed, falling back:', error);
    await callback();
  }
};

/**
 * Navigate with view transition
 * @param navigate - React Router navigate function
 * @param path - Path to navigate to
 */
export const navigateWithTransition = async (
  navigate: (path: string) => void,
  path: string
): Promise<void> => {
  await withViewTransition(() => {
    navigate(path);
  });
};

/**
 * Add view transition class to element for animation control
 * @param element - HTML element
 * @param name - Transition name
 */
export const setViewTransitionName = (element: HTMLElement | null, name: string): void => {
  if (!element) return;
  element.style.viewTransitionName = name;
};

/**
 * Remove view transition class from element
 * @param element - HTML element
 */
export const removeViewTransitionName = (element: HTMLElement | null): void => {
  if (!element) return;
  element.style.viewTransitionName = '';
};

// CSS View Transition Styles (add to your global CSS)
export const viewTransitionStyles = `
  /* View Transitions - Fade animation */
  ::view-transition-old(root) {
    animation: fade-out 0.3s ease-out;
  }

  ::view-transition-new(root) {
    animation: fade-in 0.3s ease-in;
  }

  /* Slide animation (optional) */
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Smooth transitions for specific elements */
  ::view-transition-old(card),
  ::view-transition-new(card) {
    animation-duration: 0.4s;
  }

  /* Page slide transitions */
  ::view-transition-old(page) {
    animation: slide-out-left 0.3s ease-out;
  }

  ::view-transition-new(page) {
    animation: slide-in-right 0.3s ease-in;
  }

  @keyframes slide-out-left {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(-20px);
      opacity: 0;
    }
  }

  @keyframes slide-in-right {
    from {
      transform: translateX(20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    ::view-transition-old(root),
    ::view-transition-new(root),
    ::view-transition-old(card),
    ::view-transition-new(card),
    ::view-transition-old(page),
    ::view-transition-new(page) {
      animation: none !important;
    }
  }
`;
