
import { BlogPost } from './types';

export const nextjsPerformance: BlogPost = {
  id: "3",
  slug: "nextjs-performance-optimization",
  title: "Performance Optimization Techniques in Next.js",
  description: "Learn advanced techniques for optimizing your Next.js applications, including code splitting, lazy loading, and image optimization.",
  date: "2024-03-05",
  author: "Emma Davis",
  image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  readingTime: "12 min read",
  content: `# Performance Optimization Techniques in Next.js

Optimizing performance in Next.js applications is crucial for providing the best user experience. Let's explore various techniques to enhance your app's performance and dive deep into implementation details.

## Image Optimization

Next.js provides built-in image optimization:

\`\`\`jsx
import Image from 'next/image'

function MyImage() {
  return (
    <Image
      src="/my-image.jpg"
      alt="Description"
      width={500}
      height={300}
      priority
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j..."
    />
  )
}
\`\`\`

### Advanced Image Optimization Techniques

1. Responsive Images
\`\`\`jsx
<Image
  src="/hero.jpg"
  alt="Hero"
  sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"
  fill
  className="object-cover"
/>
\`\`\`

2. Image Preloading
\`\`\`jsx
// pages/_app.js
export function reportWebVitals(metric) {
  if (metric.label === 'custom') {
    console.log(metric);
  }
}
\`\`\`

## Code Splitting

Implement effective code splitting:

### 1. Dynamic Imports
\`\`\`jsx
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Disable server-side rendering
})
\`\`\`

### 2. Route-based splitting
\`\`\`jsx
// pages/index.js
import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(() => import('../components/Header'))
const DynamicFooter = dynamic(() => import('../components/Footer'))

export default function Home() {
  return (
    <>
      <DynamicHeader />
      <main>Content</main>
      <DynamicFooter />
    </>
  )
}
\`\`\`

### 3. Component-level splitting
\`\`\`jsx
const DynamicChart = dynamic(() => import('../components/Chart'), {
  ssr: false,
  loading: () => <div>Loading chart...</div>
})
\`\`\`

## Lazy Loading

Use lazy loading for better initial load times:

### Implementation Examples

1. Lazy Loading Images
\`\`\`jsx
<Image
  loading="lazy"
  src="/large-image.jpg"
  alt="Large Image"
  width={1200}
  height={800}
/>
\`\`\`

2. Lazy Loading Components
\`\`\`jsx
const LazyComponent = dynamic(() => import('./LazyComponent'), {
  suspense: true
})

function MyPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyComponent />
    </Suspense>
  )
}
\`\`\`

## Caching Strategies

Implement proper caching:

### 1. Static Page Generation
\`\`\`jsx
// pages/blog/[slug].js
export async function getStaticProps({ params }) {
  const post = await getPost(params.slug)
  return {
    props: { post },
    revalidate: 3600 // Revalidate every hour
  }
}

export async function getStaticPaths() {
  const posts = await getPosts()
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug }
    })),
    fallback: 'blocking'
  }
}
\`\`\`

### 2. Incremental Static Regeneration
\`\`\`jsx
// pages/products/[id].js
export async function getStaticProps({ params }) {
  const product = await getProduct(params.id)
  return {
    props: { product },
    revalidate: 60 // Revalidate every minute
  }
}
\`\`\`

### 3. Stale-While-Revalidate
\`\`\`jsx
// pages/api/data.js
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
  const data = await getData()
  res.json(data)
}
\`\`\`

## Performance Monitoring

Always monitor your application's performance:

### 1. Core Web Vitals
\`\`\`jsx
// pages/_app.js
export function reportWebVitals(metric) {
  if (metric.label === 'web-vital') {
    console.log(metric)
  }
}
\`\`\`

### 2. Custom Performance Metrics
\`\`\`jsx
import { useEffect } from 'react'

function trackPageLoad() {
  const navigation = performance.getEntriesByType('navigation')[0]
  console.log(\`Page load time: \${navigation.duration}ms\`)
}

useEffect(() => {
  trackPageLoad()
}, [])
\`\`\`

### 3. Real User Monitoring
\`\`\`jsx
function sendToAnalytics(metric) {
  const body = JSON.stringify(metric)
  const url = 'https://analytics.example.com/api/metric'

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body)
  } else {
    fetch(url, { body, method: 'POST', keepalive: true })
  }
}
\`\`\`

## Advanced Optimization Techniques

### 1. Font Optimization
\`\`\`jsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function Layout({ children }) {
  return (
    <div className={inter.className}>
      {children}
    </div>
  )
}
\`\`\`

### 2. Script Optimization
\`\`\`jsx
import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script
        src="https://example.com/script.js"
        strategy="lazyOnload"
        onLoad={() => console.log('Script loaded')}
      />
    </>
  )
}
\`\`\`

Remember, performance optimization is an ongoing process. Regularly audit your application and make necessary improvements based on real user metrics and feedback.`,
  tags: ["Next.js", "Performance", "Web Development", "JavaScript"],
};
