/**
 * 분석 시스템을 위한 React 훅
 * 자동 이벤트 추적, 성능 모니터링, 사용자 세션 관리
 */

import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsEngine, trackPageView, trackEvent } from '../utils/analytics';
import { useAuth } from '../contexts/AuthContext';

// 안전한 useLocation 훅 사용
const useSafeLocation = () => {
  try {
    return useLocation();
  } catch {
    return null;
  }
};

// 안전한 useAuth 훅 사용
const useSafeAuth = () => {
  try {
    return useAuth();
  } catch {
    return { user: null };
  }
};

// 자동 페이지 뷰 추적 훅
export const usePageTracking = () => {
  const location = useSafeLocation();
  const { user } = useSafeAuth();
  const previousPath = useRef<string>('');
  const pageStartTime = useRef<number>(Date.now());

  useEffect(() => {
    if (!location) return; // Router 컨텍스트가 없으면 추적하지 않음
    
    const currentPath = location.pathname;
    
    // 이전 페이지에서 보낸 시간 계산
    if (previousPath.current && previousPath.current !== currentPath) {
      const timeSpent = Date.now() - pageStartTime.current;
      trackEvent('page_exit', previousPath.current, timeSpent / 1000, user?.id);
    }

    // 새 페이지 뷰 추적
    trackPageView(currentPath, user?.id);
    
    previousPath.current = currentPath;
    pageStartTime.current = Date.now();

    // 언마운트 시 시간 추적
    return () => {
      if (previousPath.current) {
        const timeSpent = Date.now() - pageStartTime.current;
        trackEvent('page_exit', previousPath.current, timeSpent / 1000, user?.id);
      }
    };
  }, [location, user?.id]);
};

// 클릭 이벤트 자동 추적 훅
export const useClickTracking = (enabled: boolean = true) => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // 추적할 요소들
      const trackableElements = [
        'button',
        'a',
        '[data-track]',
        '.track-click'
      ];

      const isTrackable = trackableElements.some(selector => {
        if (selector.startsWith('[') || selector.startsWith('.')) {
          return target.matches(selector);
        }
        return target.tagName.toLowerCase() === selector;
      });

      if (isTrackable) {
        const elementText = target.textContent?.trim().substring(0, 50) || 'Unknown';
        const elementType = target.tagName.toLowerCase();
        const elementId = target.id || '';
        const elementClass = target.className || '';
        
        trackEvent(
          'element_click',
          location.pathname,
          0,
          user?.id
        );

        // 추가 메타데이터와 함께 상세 추적
        analyticsEngine.trackUserBehavior({
          userId: user?.id || 'anonymous',
          sessionId: analyticsEngine['getOrCreateSessionId'](),
          action: 'click',
          page: location.pathname,
          duration: 0,
          deviceType: analyticsEngine['detectDeviceType'](),
          userAgent: navigator.userAgent,
          metadata: {
            elementText,
            elementType,
            elementId,
            elementClass,
            timestamp: new Date().toISOString()
          }
        });
      }
    };

    document.addEventListener('click', handleClick, true);
    
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [enabled, location.pathname, user?.id]);
};

// 스크롤 추적 훅
export const useScrollTracking = (enabled: boolean = true) => {
  const location = useLocation();
  const { user } = useAuth();
  const scrollPositions = useRef<number[]>([]);
  const lastScrollTime = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      const now = Date.now();
      
      // 스크롤 이벤트 쓰로틀링 (500ms)
      if (now - lastScrollTime.current < 500) return;
      lastScrollTime.current = now;

      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      scrollPositions.current.push(scrollPercent);

      // 스크롤 마일스톤 추적 (25%, 50%, 75%, 100%)
      const milestones = [25, 50, 75, 100];
      const reachedMilestone = milestones.find(milestone => 
        scrollPercent >= milestone && 
        !scrollPositions.current.slice(0, -1).some(pos => pos >= milestone)
      );

      if (reachedMilestone) {
        trackEvent(
          `scroll_${reachedMilestone}`,
          location.pathname,
          scrollPercent,
          user?.id
        );
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      
      // 세션 종료 시 최대 스크롤 위치 추적
      const maxScroll = Math.max(...scrollPositions.current, 0);
      if (maxScroll > 0) {
        trackEvent(
          'max_scroll',
          location.pathname,
          maxScroll,
          user?.id
        );
      }
      
      scrollPositions.current = [];
    };
  }, [enabled, location.pathname, user?.id]);
};

// 성능 추적 훅
export const usePerformanceTracking = (enabled: boolean = true) => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const trackPerformance = () => {
      // Navigation Timing API
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const metrics = {
          dns: navigation.domainLookupEnd - navigation.domainLookupStart,
          connection: navigation.connectEnd - navigation.connectStart,
          request: navigation.responseStart - navigation.requestStart,
          response: navigation.responseEnd - navigation.responseStart,
          dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          load: navigation.loadEventEnd - navigation.loadEventStart,
          total: navigation.loadEventEnd - navigation.fetchStart
        };

        analyticsEngine.trackUserBehavior({
          userId: user?.id || 'anonymous',
          sessionId: analyticsEngine['getOrCreateSessionId'](),
          action: 'performance_timing',
          page: location.pathname,
          duration: metrics.total,
          deviceType: analyticsEngine['detectDeviceType'](),
          userAgent: navigator.userAgent,
          metadata: {
            performanceMetrics: metrics,
            timestamp: new Date().toISOString()
          }
        });
      }

      // Resource Timing API
      const resources = performance.getEntriesByType('resource');
      const slowResources = resources.filter((resource: any) => resource.duration > 1000);
      
      if (slowResources.length > 0) {
        trackEvent(
          'slow_resources',
          location.pathname,
          slowResources.length,
          user?.id
        );
      }
    };

    // DOM이 로드된 후 성능 추적
    if (document.readyState === 'complete') {
      setTimeout(trackPerformance, 1000);
    } else {
      window.addEventListener('load', () => {
        setTimeout(trackPerformance, 1000);
      });
    }
  }, [enabled, location.pathname, user?.id]);
};

// 에러 추적 훅
export const useErrorTracking = (enabled: boolean = true) => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (!enabled) return;

    const handleError = (event: ErrorEvent) => {
      trackEvent(
        'javascript_error',
        location.pathname,
        0,
        user?.id
      );

      analyticsEngine.trackUserBehavior({
        userId: user?.id || 'anonymous',
        sessionId: analyticsEngine['getOrCreateSessionId'](),
        action: 'error',
        page: location.pathname,
        duration: 0,
        deviceType: analyticsEngine['detectDeviceType'](),
        userAgent: navigator.userAgent,
        metadata: {
          errorMessage: event.message,
          errorFile: event.filename,
          errorLine: event.lineno,
          errorColumn: event.colno,
          errorStack: event.error?.stack,
          timestamp: new Date().toISOString()
        }
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackEvent(
        'promise_rejection',
        location.pathname,
        0,
        user?.id
      );

      analyticsEngine.trackUserBehavior({
        userId: user?.id || 'anonymous',
        sessionId: analyticsEngine['getOrCreateSessionId'](),
        action: 'promise_rejection',
        page: location.pathname,
        duration: 0,
        deviceType: analyticsEngine['detectDeviceType'](),
        userAgent: navigator.userAgent,
        metadata: {
          reason: event.reason?.toString(),
          timestamp: new Date().toISOString()
        }
      });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [enabled, location.pathname, user?.id]);
};

// 사용자 참여도 추적 훅
export const useEngagementTracking = (enabled: boolean = true) => {
  const location = useLocation();
  const { user } = useAuth();
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const isIdle = useRef(false);
  const lastActivity = useRef(Date.now());

  const resetIdleTimer = useCallback(() => {
    lastActivity.current = Date.now();
    
    if (isIdle.current) {
      isIdle.current = false;
      trackEvent('user_active', location.pathname, 0, user?.id);
    }

    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
    }

    idleTimer.current = setTimeout(() => {
      isIdle.current = true;
      trackEvent('user_idle', location.pathname, 0, user?.id);
    }, 60000); // 1분 후 유휴 상태로 간주
  }, [location.pathname, user?.id]);

  useEffect(() => {
    if (!enabled) return;

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer, true);
    });

    resetIdleTimer();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetIdleTimer, true);
      });
      
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }
    };
  }, [enabled, resetIdleTimer]);
};

// 폼 상호작용 추적 훅
export const useFormTracking = (enabled: boolean = true) => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (!enabled) return;

    const handleFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement;
      const formId = form.id || form.className || 'unknown';
      
      trackEvent('form_submit', location.pathname, 0, user?.id);
      
      analyticsEngine.trackUserBehavior({
        userId: user?.id || 'anonymous',
        sessionId: analyticsEngine['getOrCreateSessionId'](),
        action: 'form_submit',
        page: location.pathname,
        duration: 0,
        deviceType: analyticsEngine['detectDeviceType'](),
        userAgent: navigator.userAgent,
        metadata: {
          formId,
          formAction: form.action,
          formMethod: form.method,
          timestamp: new Date().toISOString()
        }
      });
    };

    const handleInputFocus = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.type === 'password') return; // 보안상 패스워드 필드는 추적하지 않음
      
      trackEvent('input_focus', location.pathname, 0, user?.id);
    };

    document.addEventListener('submit', handleFormSubmit);
    document.addEventListener('focusin', handleInputFocus);

    return () => {
      document.removeEventListener('submit', handleFormSubmit);
      document.removeEventListener('focusin', handleInputFocus);
    };
  }, [enabled, location.pathname, user?.id]);
};

// 통합 분석 훅 - 모든 추적 기능을 한 번에 활성화
export const useAnalytics = (options: {
  pageTracking?: boolean;
  clickTracking?: boolean;
  scrollTracking?: boolean;
  performanceTracking?: boolean;
  errorTracking?: boolean;
  engagementTracking?: boolean;
  formTracking?: boolean;
} = {}) => {
  const {
    pageTracking = true,
    clickTracking = true,
    scrollTracking = true,
    performanceTracking = true,
    errorTracking = true,
    engagementTracking = true,
    formTracking = true
  } = options;

  // 조건부 훅 호출 - React 훅 규칙을 위반하지 않도록 항상 호출하되 내부에서 조건 체크
  usePageTracking();
  useClickTracking(clickTracking);
  useScrollTracking(scrollTracking);
  usePerformanceTracking(performanceTracking);
  useErrorTracking(errorTracking);
  useEngagementTracking(engagementTracking);
  useFormTracking(formTracking);

  // 수동 이벤트 추적 함수들 반환
  return {
    trackEvent: useCallback((action: string, duration?: number) => {
      trackEvent(action, window.location.pathname, duration);
    }, []),
    
    trackCustomEvent: useCallback((eventData: any) => {
      analyticsEngine.trackUserBehavior(eventData);
    }, []),
    
    // 분석 데이터 가져오기
    getMetrics: useCallback(() => {
      return analyticsEngine.calculateBusinessMetrics();
    }, []),
    
    getPredictions: useCallback(() => {
      return analyticsEngine.generatePredictions();
    }, []),
    
    getInsights: useCallback(() => {
      return analyticsEngine.generateInsights();
    }, [])
  };
};