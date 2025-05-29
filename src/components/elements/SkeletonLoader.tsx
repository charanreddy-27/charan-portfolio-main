import { cn } from "@/utils/cn";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "avatar" | "card" | "button";
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

const Skeleton = ({
  className,
  variant = "rectangular",
  width,
  height,
  animate = true,
}: SkeletonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "text":
        return "h-4 w-full rounded";
      case "circular":
        return "rounded-full";
      case "avatar":
        return "rounded-full h-12 w-12";
      case "card":
        return "rounded-lg h-48 w-full";
      case "button":
        return "rounded-md h-10";
      default:
        return "rounded-md";
    }
  };

  return (
    <div
      className={cn(
        "bg-muted/30",
        animate && "animate-pulse",
        getVariantClasses(),
        className
      )}
      style={{
        width: width !== undefined ? (typeof width === "number" ? `${width}px` : width) : undefined,
        height: height !== undefined ? (typeof height === "number" ? `${height}px` : height) : undefined,
      }}
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeleton;

export const SkeletonText = ({ lines = 3, className }: { lines?: number; className?: string }) => {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          variant="text" 
          width={i === lines - 1 && lines > 1 ? "70%" : "100%"} 
        />
      ))}
    </div>
  );
};

export const SkeletonCard = ({ className }: { className?: string }) => {
  return (
    <div className={cn("space-y-3", className)}>
      <Skeleton variant="card" />
      <SkeletonText lines={2} />
    </div>
  );
};

export const SkeletonAvatar = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center space-x-4", className)}>
      <Skeleton variant="avatar" />
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  );
}; 