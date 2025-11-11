import { useState, useEffect } from 'react';
import { debounce } from '../utils/performance';

/**
 * 윈도우 크기 추적 훅
 * @description 반응형 디자인을 위한 윈도우 크기 추적
 * @param debounceMs - debounce 지연 시간 (기본: 150ms)
 * @returns { width, height, isMobile, isTablet, isDesktop }
 * @example
 * ```tsx
 * const { width, isMobile } = useWindowSize();
 * ```
 */
export function useWindowSize(debounceMs = 150) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, debounceMs);

    window.addEventListener('resize', handleResize);
    
    // 초기값 설정
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [debounceMs]);

  return {
    ...windowSize,
    isMobile: windowSize.width < 768,
    isTablet: windowSize.width >= 768 && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024,
  };
}

/**
 * 미디어 쿼리 매칭 훅
 * @description CSS 미디어 쿼리를 JavaScript에서 사용
 * @param query - 미디어 쿼리 문자열
 * @returns 매칭 여부 boolean
 * @example
 * ```tsx
 * const isDark = useMediaQuery('(prefers-color-scheme: dark)');
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // 초기값 설정
    setMatches(mediaQuery.matches);

    // 이벤트 리스너 등록
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // 구형 브라우저 지원
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [query]);

  return matches;
}

/**
 * 온라인/오프라인 상태 추적 훅
 * @description 네트워크 연결 상태 모니터링
 * @returns 온라인 여부 boolean
 * @example
 * ```tsx
 * const isOnline = useOnlineStatus();
 * ```
 */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(() => {
    if (typeof navigator === 'undefined') return true;
    return navigator.onLine;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

/**
 * 스크롤 위치 추적 훅
 * @description 현재 스크롤 위치와 방향 추적
 * @returns { scrollY, scrollX, scrollDirection }
 * @example
 * ```tsx
 * const { scrollY, scrollDirection } = useScrollPosition();
 * ```
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({
    scrollY: typeof window !== 'undefined' ? window.scrollY : 0,
    scrollX: typeof window !== 'undefined' ? window.scrollX : 0,
    scrollDirection: 'down' as 'up' | 'down',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollPosition = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';

      setScrollPosition({
        scrollY,
        scrollX,
        scrollDirection,
      });

      lastScrollY = scrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
}

/**
 * 클립보드 복사 훅
 * @description 텍스트를 클립보드에 복사
 * @returns [copiedText, copy]
 * @example
 * ```tsx
 * const [copiedText, copy] = useClipboard();
 * <button onClick={() => copy('Hello World')}>Copy</button>
 * ```
 */
export function useClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard API not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      
      // 2초 후 자동으로 초기화
      setTimeout(() => setCopiedText(null), 2000);
      
      return true;
    } catch (error) {
      console.error('Failed to copy:', error);
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy] as const;
}
