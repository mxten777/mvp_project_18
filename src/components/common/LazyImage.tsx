import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * 이미지 소스 URL
   */
  src: string;
  /**
   * 대체 텍스트
   */
  alt: string;
  /**
   * 플레이스홀더 이미지 (로딩 중 표시)
   */
  placeholderSrc?: string;
  /**
   * 로딩 중 표시할 배경색
   */
  placeholderColor?: string;
  /**
   * 이미지 로드 완료 콜백
   */
  onLoad?: () => void;
  /**
   * 이미지 로드 실패 콜백
   */
  onError?: () => void;
  /**
   * Intersection Observer threshold (0~1)
   * @default 0.01
   */
  threshold?: number;
  /**
   * Intersection Observer rootMargin
   * @default "50px"
   */
  rootMargin?: string;
}

/**
 * Lazy Loading 이미지 컴포넌트
 * @description Intersection Observer API를 사용한 지연 로딩 이미지
 * @example
 * ```tsx
 * <LazyImage 
 *   src="/images/hero.jpg" 
 *   alt="Hero Image"
 *   placeholderColor="bg-gray-200"
 *   className="w-full h-96 object-cover"
 * />
 * ```
 */
const LazyImage: React.FC<LazyImageProps> = React.memo(({
  src,
  alt,
  placeholderSrc,
  placeholderColor = 'bg-gray-200',
  onLoad,
  onError,
  threshold = 0.01,
  rootMargin = '50px',
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    // Intersection Observer로 뷰포트 진입 감지
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* 플레이스홀더 */}
      {!isLoaded && !hasError && (
        <div 
          className={cn(
            'absolute inset-0 animate-pulse',
            placeholderColor
          )}
        >
          {placeholderSrc && (
            <img
              src={placeholderSrc}
              alt=""
              className="w-full h-full object-cover blur-sm"
            />
          )}
        </div>
      )}

      {/* 메인 이미지 */}
      <img
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'w-full h-full transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0',
          hasError && 'hidden'
        )}
        loading="lazy"
        decoding="async"
        {...props}
      />

      {/* 에러 플레이스홀더 */}
      {hasError && (
        <div className={cn('absolute inset-0 flex items-center justify-center', placeholderColor)}>
          <div className="text-center text-gray-500">
            <svg 
              className="w-12 h-12 mx-auto mb-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p className="text-sm">이미지를 불러올 수 없습니다</p>
          </div>
        </div>
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;
