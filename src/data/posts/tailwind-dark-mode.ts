import { BlogPost } from './types';

export const tailwindDarkMode: BlogPost = {
  id: "5",
  slug: "tailwind-css-dark-mode",
  title: "Implementing Dark Mode with Tailwind CSS",
  description: "A comprehensive guide to implementing dark mode in your web applications using Tailwind CSS and best practices.",
  date: "2024-02-20",
  author: "Lisa Wang",
  image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  readingTime: "4 min read",
  content: `# Implementing Dark Mode with Tailwind CSS

Dark mode has become a standard feature in modern web applications. Let's explore how to implement it effectively using Tailwind CSS.

## Basic Setup

First, configure your tailwind.config.js:

\`\`\`javascript
module.exports = {
  darkMode: 'class',
  // ... rest of the config
}
\`\`\`

## Implementation

Basic dark mode toggle:

\`\`\`jsx
function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      Toggle Dark Mode
    </button>
  )
}
\`\`\`

## Best Practices

When implementing dark mode:

- Use semantic color names
- Consider system preferences
- Implement smooth transitions
- Test contrast ratios

## Color Strategy

Define your color palette:

\`\`\`css
:root {
  --primary: #2563eb;
  --background: #ffffff;
}

[data-theme='dark'] {
  --primary: #3b82f6;
  --background: #1a1a1a;
}
\`\`\`

Remember to maintain accessibility standards and provide a seamless user experience in both modes.`,
  tags: ["Tailwind CSS", "Dark Mode", "Web Development"],
};
