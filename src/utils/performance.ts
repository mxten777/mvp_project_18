/**
 * 성능 최적화 유틸리티
 */

// 디바운스 함수
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
}

// 스로틀 함수
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 메모이제이션 함수
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  maxCacheSize: number = 100
): T & { clearCache: () => void } {
  const cache = new Map();
  let cacheKeys: string[] = [];

  const memoized = (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    
    // 캐시 크기 제한
    if (cache.size >= maxCacheSize) {
      const oldestKey = cacheKeys.shift();
      if (oldestKey) {
        cache.delete(oldestKey);
      }
    }
    
    cache.set(key, result);
    cacheKeys.push(key);
    
    return result;
  };

  memoized.clearCache = () => {
    cache.clear();
    cacheKeys = [];
  };

  return memoized as T & { clearCache: () => void };
}

// 가상 스크롤링을 위한 훅
export function useVirtualScroll<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5
) {
  const [scrollTop, setScrollTop] = React.useState(0);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    startIndex,
    endIndex,
    setScrollTop
  };
}

// Intersection Observer 훅
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const [intersectionRatio, setIntersectionRatio] = React.useState(0);

  React.useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setIntersectionRatio(entry.intersectionRatio);
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        ...options
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, options]);

  return { isIntersecting, intersectionRatio };
}

// 지연 로딩 훅
export function useLazyLoad<T>(
  loadFn: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await loadFn();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  return { data, loading, error, load };
}

// Web Worker 유틸리티
export function createWebWorker(workerFunction: Function): Worker {
  const blob = new Blob([`(${workerFunction.toString()})()`], {
    type: 'application/javascript'
  });
  
  return new Worker(URL.createObjectURL(blob));
}

// 배치 처리 유틸리티
export class BatchProcessor<T, R> {
  private batch: T[] = [];
  private timer: NodeJS.Timeout | null = null;

  constructor(
    private processBatch: (items: T[]) => Promise<R[]>,
    private batchSize: number = 10,
    private delay: number = 100
  ) {}

  add(item: T): Promise<R> {
    return new Promise((resolve, reject) => {
      this.batch.push({ item, resolve, reject } as any);
      
      if (this.batch.length >= this.batchSize) {
        this.flush();
      } else {
        this.scheduleFlush();
      }
    });
  }

  private scheduleFlush() {
    if (this.timer) return;
    
    this.timer = setTimeout(() => {
      this.flush();
    }, this.delay);
  }

  private async flush() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    if (this.batch.length === 0) return;

    const currentBatch = this.batch.splice(0, this.batchSize);
    const items = currentBatch.map((b: any) => b.item);

    try {
      const results = await this.processBatch(items);
      currentBatch.forEach((b: any, index: number) => {
        b.resolve(results[index]);
      });
    } catch (error) {
      currentBatch.forEach((b: any) => {
        b.reject(error);
      });
    }
  }
}

// 이미지 프리로딩
export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// CSS 프리로딩
export function preloadCSS(href: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = reject;
    document.head.appendChild(link);
  });
}

// JavaScript 프리로딩
export function preloadJS(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// 성능 메트릭 수집
export interface PerformanceMetrics {
  navigationTiming: PerformanceNavigationTiming | null;
  paintTiming: PerformancePaintTiming[];
  resourceTiming: PerformanceResourceTiming[];
  memoryInfo: any;
  connectionInfo: any;
}

export function collectPerformanceMetrics(): PerformanceMetrics {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint') as PerformancePaintTiming[];
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  
  return {
    navigationTiming: navigation,
    paintTiming: paint,
    resourceTiming: resources,
    memoryInfo: (performance as any).memory || null,
    connectionInfo: (navigator as any).connection || null
  };
}

// Core Web Vitals 측정
export function measureWebVitals(callback: (metric: any) => void) {
  // FCP (First Contentful Paint)
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    for (const entry of entries) {
      if (entry.name === 'first-contentful-paint') {
        callback({
          name: 'FCP',
          value: entry.startTime,
          rating: entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs-improvement' : 'poor'
        });
      }
    }
  }).observe({ entryTypes: ['paint'] });

  // LCP (Largest Contentful Paint)
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    callback({
      name: 'LCP',
      value: lastEntry.startTime,
      rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor'
    });
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // CLS (Cumulative Layout Shift)
  let clsValue = 0;
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
      }
    }
    callback({
      name: 'CLS',
      value: clsValue,
      rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
    });
  }).observe({ entryTypes: ['layout-shift'] });
}

// 리소스 힌트 추가
export function addResourceHint(type: 'prefetch' | 'preload' | 'dns-prefetch', href: string, as?: string) {
  const link = document.createElement('link');
  link.rel = type;
  link.href = href;
  if (as) link.setAttribute('as', as);
  document.head.appendChild(link);
}

// 중요한 리소스 우선 로딩
export function prioritizeResource(element: HTMLElement) {
  element.setAttribute('importance', 'high');
  element.setAttribute('fetchpriority', 'high');
}

import React from 'react';