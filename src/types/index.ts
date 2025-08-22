// Base types
export interface BaseEntity {
  id: string;
  title: string;
  description: string;
  date: string;
}

// Project types
export interface Project extends BaseEntity {
  slug: string;
  image: string;
  tools: string[];
  github?: string;
  liveDemo?: string;
  category: ProjectCategory;
  featured: boolean;
  status: ProjectStatus;
  challenges: string[];
  solution: string;
  outcome: string;
  techStack: TechStack;
  timeline: string;
}

export type ProjectCategory = 
  | "web-app" 
  | "mobile-app" 
  | "data-science" 
  | "machine-learning" 
  | "ai" 
  | "iot" 
  | "other";

export type ProjectStatus = "completed" | "in-progress" | "planned";

export interface TechStack {
  frontend?: string[];
  backend?: string[];
  database?: string[];
  deployment?: string[];
  other?: string[];
}

// Blog types
export interface BlogPost extends BaseEntity {
  slug: string;
  content: string;
  author: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
  excerpt: string;
  coverImage?: string;
  lastModified: string;
  seo: SEOData;
}

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl?: string;
}

// Experience types
export interface Experience {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  responsibilities: string[];
  tools: string[];
  type: ExperienceType;
  companyLogo?: string;
  companyUrl?: string;
}

export type ExperienceType = "full-time" | "part-time" | "internship" | "freelance" | "contract";

// Education types
export interface Education {
  school: string;
  degree: string;
  duration: string;
  gpa: string;
  location: string;
  courses: string[];
  achievements?: string[];
  relevantProjects?: string[];
}

// Certification types
export interface Certification extends BaseEntity {
  issuer: string;
  skills: string[];
  detailsUrl: string;
  icon: any; // React icon component
  credentialId?: string;
  expiryDate?: string;
  verified: boolean;
}

// Contact types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  consent?: string;
}

// UI Component types
export interface LoadingState {
  isLoading: boolean;
  error?: string;
  data?: any;
}

export interface NavigationItem {
  path: string;
  label: string;
  icon: any;
  external?: boolean;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
  proficiency?: number; // 1-100
}

// Animation types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  error?: string;
}

// Theme types
export type Theme = "light" | "dark" | "system";

// Accessibility types
export interface AccessibilityPreferences {
  reduceMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  screenReader: boolean;
}

// Performance types
export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

// Analytics types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  userId?: string;
  timestamp: Date;
}

// Error types
export interface AppError {
  message: string;
  code?: string;
  stack?: string;
  timestamp: Date;
  userId?: string;
  page?: string;
}
