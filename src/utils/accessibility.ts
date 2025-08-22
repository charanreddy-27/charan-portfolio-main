// Accessibility utilities
export const a11y = {
  // Generate unique IDs for form elements
  generateId: (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`,
  
  // Screen reader only text
  srOnly: "sr-only absolute -inset-1 whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)] overflow-hidden",
  
  // Focus management
  focusElement: (selector: string) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },
  
  // Announce to screen readers
  announce: (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.classList.add('sr-only');
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },
  
  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
};

// Keyboard navigation helpers
export const keyboardNavigation = {
  isArrowKey: (key: string) => ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key),
  isEnterOrSpace: (key: string) => key === 'Enter' || key === ' ',
  isEscapeKey: (key: string) => key === 'Escape',
  
  // Handle roving tabindex for lists
  handleRovingTabIndex: (
    event: React.KeyboardEvent,
    items: NodeListOf<HTMLElement>,
    currentIndex: number
  ) => {
    const { key } = event;
    let nextIndex = currentIndex;
    
    if (key === 'ArrowDown' || key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % items.length;
    } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
      nextIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    } else if (key === 'Home') {
      nextIndex = 0;
    } else if (key === 'End') {
      nextIndex = items.length - 1;
    }
    
    if (nextIndex !== currentIndex) {
      event.preventDefault();
      items[currentIndex].setAttribute('tabindex', '-1');
      items[nextIndex].setAttribute('tabindex', '0');
      items[nextIndex].focus();
    }
  }
};
