import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  priority = false,
  sizes,
  quality = 85,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority || loading === 'eager');
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority || loading === 'eager') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start loading 50px before the image enters viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, loading]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const getOptimizedSrc = (originalSrc: string, targetWidth?: number) => {
    // For production, you might want to use a service like Cloudinary or ImageKit
    // For now, we'll use the original src but add loading attributes
    return originalSrc;
  };

  const imageSizes = sizes || (width ? `${width}px` : '100vw');

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width: width ? `${width}px` : 'auto', height: height ? `${height}px` : 'auto' }}
    >
      {/* Placeholder/blur while loading */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ width: '100%', height: '100%' }}
        >
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Actual image */}
      {isInView && (
        <img
          src={getOptimizedSrc(src, width)}
          alt={alt}
          width={width}
          height={height}
          sizes={imageSizes}
          loading={loading}
          decoding="async"
          onLoad={handleLoad}
          className={`
            transition-opacity duration-300 w-full h-full object-cover
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${className}
          `}
          // Add fetchpriority for LCP images
          {...(priority && { fetchPriority: 'high' as any })}
        />
      )}
    </div>
  );
};

export default OptimizedImage;