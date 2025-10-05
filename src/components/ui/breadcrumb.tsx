import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const location = useLocation();
  
  // Auto-generate breadcrumbs from path if not provided
  const breadcrumbs = items || generateBreadcrumbs(location.pathname);

  if (breadcrumbs.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn("py-4", className)}
    >
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        {/* Home Link */}
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors group"
            aria-label="Home"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="h-4 w-4" />
            </motion.div>
            <span className="relative">
              Home
              <motion.span 
                className="absolute bottom-0 left-0 h-[1px] bg-primary"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.2 }}
              />
            </span>
          </Link>
        </li>

        {/* Breadcrumb Items */}
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={item.path} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              {isLast ? (
                <span 
                  className="text-foreground font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  <span className="relative">
                    {item.label}
                    <motion.span 
                      className="absolute bottom-0 left-0 h-[1px] bg-primary"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.2 }}
                    />
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Helper function to generate breadcrumbs from pathname
function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  paths.forEach((path, index) => {
    const routePath = "/" + paths.slice(0, index + 1).join("/");
    
    // Format label (capitalize and handle special cases)
    const label = path
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    breadcrumbs.push({
      label,
      path: routePath,
    });
  });

  return breadcrumbs;
}

// Specialized breadcrumb for blog posts
export function BlogBreadcrumb({ postTitle }: { postTitle: string }) {
  return (
    <Breadcrumb
      items={[
        { label: "Blog", path: "/blog" },
        { label: postTitle, path: "" },
      ]}
    />
  );
}

// Specialized breadcrumb for project posts
export function ProjectBreadcrumb({ projectTitle }: { projectTitle: string }) {
  return (
    <Breadcrumb
      items={[
        { label: "Projects", path: "/projects" },
        { label: projectTitle, path: "" },
      ]}
    />
  );
}
