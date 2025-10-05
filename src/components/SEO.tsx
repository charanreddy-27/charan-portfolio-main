import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

const defaultSEO = {
  siteName: "Charan Reddy Portfolio",
  title: "Charan Reddy - Data Scientist & ML Engineer",
  description: "Portfolio of Charan Reddy - Data Scientist, Machine Learning Engineer, and Full Stack Developer specializing in AI/ML, Python, React, and modern web technologies.",
  keywords: "Charan Reddy, Data Scientist, Machine Learning, AI Engineer, Full Stack Developer, Python, React, TypeScript, Portfolio",
  image: "https://charan-reddy.vercel.app/og-image.jpg",
  url: "https://charan-reddy.vercel.app",
  author: "Charan Reddy",
  twitterHandle: "@chandacharanr",
};

export function SEO({
  title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  image = defaultSEO.image,
  url = defaultSEO.url,
  type = "website",
  author = defaultSEO.author,
  publishedTime,
  modifiedTime,
  tags,
}: SEOProps) {
  const fullTitle = title 
    ? `${title} | ${defaultSEO.siteName}` 
    : defaultSEO.title;

  const canonicalUrl = url.startsWith('http') ? url : `${defaultSEO.url}${url}`;
  const imageUrl = image.startsWith('http') ? image : `${defaultSEO.url}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={defaultSEO.siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Article specific tags */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}
      {type === "article" && tags && tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content={defaultSEO.twitterHandle} />
      <meta name="twitter:site" content={defaultSEO.twitterHandle} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#F76D57" />
      <meta name="msapplication-TileColor" content="#F76D57" />
    </Helmet>
  );
}

// Specialized SEO components for different page types
export function HomeSEO() {
  return (
    <SEO
      title="Home"
      description="Welcome to Charan Reddy's portfolio. Explore my projects in Data Science, Machine Learning, AI, and Full Stack Development."
      keywords="Charan Reddy, Portfolio, Data Scientist, ML Engineer, Projects, AI, Machine Learning"
      type="website"
    />
  );
}

export function BlogSEO({ 
  title, 
  description, 
  publishedTime, 
  modifiedTime,
  tags,
  slug 
}: { 
  title: string; 
  description: string; 
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  slug: string;
}) {
  return (
    <SEO
      title={title}
      description={description}
      url={`/blog/${slug}`}
      type="article"
      publishedTime={publishedTime}
      modifiedTime={modifiedTime}
      tags={tags}
    />
  );
}

export function ProjectSEO({ 
  title, 
  description,
  slug 
}: { 
  title: string; 
  description: string; 
  slug: string;
}) {
  return (
    <SEO
      title={title}
      description={description}
      url={`/projects/${slug}`}
      type="article"
    />
  );
}

export function AboutSEO() {
  return (
    <SEO
      title="About Me"
      description="Learn more about Charan Reddy - my journey, experience, education, and skills in Data Science, Machine Learning, and Full Stack Development."
      keywords="About Charan Reddy, Experience, Education, Skills, Career"
      url="/about"
      type="profile"
    />
  );
}

export function CertificatesSEO() {
  return (
    <SEO
      title="Certificates"
      description="View my professional certifications in Data Science, Machine Learning, Cloud Computing, and Software Development."
      keywords="Certificates, Certifications, AWS, Azure, Python, Machine Learning, Data Science"
      url="/certificates"
    />
  );
}
