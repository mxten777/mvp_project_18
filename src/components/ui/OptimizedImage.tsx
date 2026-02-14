/**
 * 이미지 최적화 컴포넌트
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  quality?: number;
  placeholder?: string;
  fallback?: string;
  webp?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  quality = 85,
  placeholder,
  fallback,
  webp = true,
  sizes,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState<string>('');

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [loading]);

  // 이미지 소스 최적화
  useEffect(() => {
    if (!isInView) return;

    const optimizedSrc = getOptimizedSrc(src, {
      width,
      height,
      quality,
      webp
    });

    setCurrentSrc(optimizedSrc);
  }, [isInView, src, width, height, quality, webp]);

  const handleLoad = () => {
    setIsLoaded(true);
    setIsError(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
    if (fallback) {
      setCurrentSrc(fallback);
      setIsError(false);
    }
    onError?.();
  };

  // 다양한 크기의 srcSet 생성
  const generateSrcSet = (originalSrc: string): string => {
    if (!width) return '';

    const breakpoints = [480, 768, 1024, 1200, 1920];
    const srcSet = breakpoints
      .filter(bp => bp <= (width || 1920))
      .map(bp => {
        const optimizedSrc = getOptimizedSrc(originalSrc, {
          width: bp,
          height: height ? Math.round((height / (width || bp)) * bp) : undefined,
          quality,
          webp
        });
        return `${optimizedSrc} ${bp}w`;
      })
      .join(', ');

    return srcSet;
  };

  // 기본 sizes 속성 생성
  const defaultSizes = width 
    ? `(max-width: 768px) 100vw, (max-width: 1024px) 50vw, ${width}px`
    : '100vw';

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 플레이스홀더 */}
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
        >
          {placeholder ? (
            <img
              src={placeholder}
              alt=""
              className="w-full h-full object-cover filter blur-sm scale-110"
            />
          ) : (
            <motion.div
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"
            />
          )}
        </motion.div>
      )}

      {/* 실제 이미지 */}
      {isInView && (
        <motion.img
          ref={imgRef}
          src={currentSrc}
          srcSet={currentSrc ? generateSrcSet(src) : undefined}
          sizes={sizes || defaultSizes}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`w-full h-full object-cover ${isLoaded ? 'block' : 'absolute opacity-0'}`}
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined
          }}
        />
      )}

      {/* 에러 상태 */}
      {isError && !fallback && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">이미지를 불러올 수 없습니다</p>
          </div>
        </div>
      )}

      {/* 로딩 인디케이터 */}
      {isInView && !isLoaded && !isError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
          />
        </motion.div>
      )}
    </div>
  );
}

// 이미지 최적화 유틸리티 함수
function getOptimizedSrc(originalSrc: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  webp?: boolean;
}): string {
  const { width, height, quality = 85, webp = true } = options;
  
  // 이미 최적화된 URL인지 확인
  if (originalSrc.includes('?') || originalSrc.startsWith('data:')) {
    return originalSrc;
  }

  // CDN 서비스 사용 (예: Cloudinary, ImageKit 등)
  // 실제 환경에서는 사용하는 CDN에 맞게 수정
  const params = new URLSearchParams();
  
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  if (quality) params.append('q', quality.toString());
  if (webp) params.append('f', 'webp');
  
  // 간단한 최적화 URL 생성 (실제로는 CDN 서비스 사용 권장)
  const optimizedUrl = `${originalSrc}${originalSrc.includes('?') ? '&' : '?'}${params.toString()}`;
  
  return optimizedUrl;
}

// Progressive 이미지 로딩을 위한 Hook
export function useProgressiveImage(src: string, placeholder?: string) {
  const [currentSrc, setCurrentSrc] = useState(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

  return { src: currentSrc, isLoaded };
}

// 이미지 프리로딩을 위한 유틸리티
export function preloadImages(urls: string[]): Promise<void[]> {
  return Promise.all(
    urls.map(url => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = url;
      });
    })
  );
}

// WebP 지원 확인
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = function () {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}