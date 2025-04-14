
import { BlogPost } from './types';

export const gsapAnimations: BlogPost = {
  id: "4",
  slug: "gsap-animations-guide",
  title: "Creating Stunning Animations with GSAP",
  description: "Master the art of web animations using GSAP (GreenSock Animation Platform) with practical examples and tips.",
  date: "2024-02-28",
  author: "Alex Turner",
  image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  readingTime: "12 min read",
  content: `# Creating Stunning Animations with GSAP

GSAP (GreenSock Animation Platform) is one of the most powerful animation libraries for the web. Let's explore how to create engaging animations with GSAP and dive deep into its advanced features.

## Getting Started

Basic GSAP animation:

\`\`\`javascript
gsap.to(".my-element", {
  duration: 1,
  x: 100,
  y: 100,
  rotation: 360,
  ease: "power2.out"
});
\`\`\`

### Understanding GSAP Properties

Before diving deeper, let's understand some key properties:
- duration: Length of the animation
- ease: Animation timing function
- delay: Time before animation starts
- repeat: Number of times to repeat
- yoyo: Whether to reverse the animation

## Timeline Animations

Creating complex sequences:

\`\`\`javascript
const tl = gsap.timeline();
tl.to(".first", {duration: 1, x: 100})
  .to(".second", {duration: 1, y: 50})
  .to(".third", {duration: 1, rotation: 360});
\`\`\`

### Advanced Timeline Features

- Labels for organization
- Position parameters
- Nested timelines
- Timeline control methods

\`\`\`javascript
const masterTimeline = gsap.timeline();
const childTimeline = gsap.timeline();

childTimeline.to(".child", { x: 100 })
             .to(".child", { y: 100 });

masterTimeline.add(childTimeline, "+=0.5")
             .to(".parent", { scale: 1.5 });
\`\`\`

## ScrollTrigger

Implement scroll-based animations:

\`\`\`javascript
gsap.to(".animate-on-scroll", {
  scrollTrigger: {
    trigger: ".animate-on-scroll",
    start: "top center",
    end: "bottom center",
    scrub: true,
    markers: true, // helpful for development
    toggleActions: "play pause reverse reset"
  },
  y: 100,
  opacity: 0
});
\`\`\`

### ScrollTrigger Advanced Configuration

- Pin elements while scrolling
- Horizontal scroll animations
- Parallax effects
- Multiple triggers
- Custom callback functions

## Performance Tips

1. Use transforms instead of positions
   - Transform: translate3d() for GPU acceleration
   - Avoid changing layout properties

2. Implement will-change when needed
   - Use sparingly
   - Remove after animation

3. Batch animations
   - Group similar animations
   - Use timelines effectively

4. Use requestAnimationFrame
   - Sync with browser's refresh rate
   - Smooth animations

## Advanced Techniques

### 1. Morphing SVG Paths
\`\`\`javascript
gsap.to("#path", {
  morphSVG: "#targetPath",
  duration: 1
});
\`\`\`

### 2. 3D Transformations
\`\`\`javascript
gsap.to(".element", {
  rotationY: 360,
  perspective: 1000,
  transformStyle: "preserve-3d"
});
\`\`\`

### 3. Custom Easing Functions
\`\`\`javascript
const customEase = CustomEase.create("custom", "M0,0,C0.126,0.382,0.282,0.674,0.44,0.822,0.632,1.002,0.818,1,1,1");
\`\`\`

### 4. Stagger Animations
\`\`\`javascript
gsap.to(".staggered", {
  y: 50,
  stagger: {
    amount: 1.5,
    from: "center",
    grid: "auto"
  }
});
\`\`\`

## Best Practices for Production

1. Plugin Management
   - Load only necessary plugins
   - Use modular imports

2. Memory Management
   - Kill animations when components unmount
   - Clear timelines properly
   - Use reference counting

3. Mobile Optimization
   - Test on various devices
   - Adjust animation complexity
   - Consider battery life

4. Debugging Tools
   - GSDevTools
   - Timeline visualization
   - Performance monitoring

Remember to always test your animations on various devices and optimize for performance. GSAP provides powerful tools, but with great power comes great responsibility!`,
  tags: ["GSAP", "Animation", "JavaScript", "Web Development"],
};
