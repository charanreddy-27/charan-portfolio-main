import React, { useState, useEffect, useRef } from 'react';
import { cn } from "../../utils/cn";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  className?: string;
  imgClassName?: string;
  wrapperClassName?: string;
}

const LazyImage = ({
  src,
  alt,
  placeholderSrc,
  className,
  imgClassName,
  wrapperClassName,
  ...props
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted/30",
        wrapperClassName
      )}
      aria-busy={!isLoaded}
    >
      {/* Placeholder or skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-muted/20" />
      )}
      
      <img
        ref={imgRef}
        src={isInView ? src : placeholderSrc || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+'}
        alt={alt}
        onLoad={handleImageLoad}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          imgClassName
        )}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  );
};

export default LazyImage; 