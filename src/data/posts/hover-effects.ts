
import { BlogPost } from './types';

export const hoverEffects: BlogPost = {
  id: "6",
  slug: "custom-hover-effects",
  title: "Creating Custom Hover Effects with CSS and JavaScript",
  description: "Learn how to create engaging and interactive hover effects using modern CSS techniques and JavaScript.",
  date: "2024-02-15",
  author: "David Smith",
  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  readingTime: "10 min read",
  content: `# Creating Custom Hover Effects with CSS and JavaScript

Hover effects can significantly enhance user experience and add personality to your website. Let's explore various creative techniques for implementing custom hover effects, from basic transitions to advanced interactive animations.

## CSS-only Hover Effects

### Basic Transitions

Simple yet effective hover transitions:

\`\`\`css
.hover-scale {
  transition: transform 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.1);
}

.hover-rotate {
  transition: transform 0.4s ease-in-out;
}

.hover-rotate:hover {
  transform: rotate(10deg);
}
\`\`\`

### Color Transitions

Smooth color changes on hover:

\`\`\`css
.hover-color {
  transition: all 0.3s ease;
  background: #2563eb;
  color: white;
}

.hover-color:hover {
  background: #1d4ed8;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
\`\`\`

## Advanced Effects

### Using Pseudo-elements

Creating dynamic underline effects:

\`\`\`css
.hover-reveal {
  position: relative;
  overflow: hidden;
}

.hover-reveal::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.hover-reveal:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
\`\`\`

### Multiple Pseudo-elements

Creating complex layered effects:

\`\`\`css
.hover-layers {
  position: relative;
}

.hover-layers::before,
.hover-layers::after {
  content: '';
  position: absolute;
  inset: 0;
  transition: transform 0.3s ease;
}

.hover-layers:hover::before {
  transform: translate(-5px, -5px);
  background: rgba(37, 99, 235, 0.1);
}

.hover-layers:hover::after {
  transform: translate(5px, 5px);
  background: rgba(37, 99, 235, 0.2);
}
\`\`\`

## JavaScript Enhancements

### Basic Mouse Tracking

Adding interactive elements:

\`\`\`javascript
const element = document.querySelector('.interactive-hover');

element.addEventListener('mousemove', (e) => {
  const { left, top, width, height } = element.getBoundingClientRect();
  const x = (e.clientX - left) / width;
  const y = (e.clientY - top) / height;
  
  element.style.setProperty('--x', x);
  element.style.setProperty('--y', y);
});
\`\`\`

### Advanced Mouse Effects

Creating magnetic button effects:

\`\`\`javascript
function magneticButton(element) {
  const strength = 50;
  
  element.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = e.clientX - (left + width/2);
    const y = e.clientY - (top + height/2);
    
    element.style.transform = \`translate(\${x/strength}px, \${y/strength}px)\`;
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.transform = '';
  });
}
\`\`\`

## Performance Considerations

### GPU Acceleration

Use transform properties for better performance:

\`\`\`css
.gpu-accelerated {
  transform: translateZ(0);
  will-change: transform;
}
\`\`\`

### Debouncing Events

Implement event debouncing for smooth interactions:

\`\`\`javascript
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const handleHover = debounce((e) => {
  // Hover effect logic
}, 16);
\`\`\`

## Accessibility Considerations

1. Ensure sufficient contrast
2. Provide alternative interactions for touch devices
3. Consider reduced motion preferences
4. Maintain keyboard focus styles

## Testing Guidelines

1. Test on different browsers
2. Verify mobile device behavior
3. Check performance metrics
4. Validate accessibility features

Remember to keep accessibility in mind and ensure your hover effects don't interfere with usability. The best hover effects enhance the user experience without compromising functionality or performance.`,
  tags: ["CSS", "JavaScript", "Web Development", "UI/UX"],
};
