/**
 * 성능 모니터링 컴포넌트
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChartBarIcon, 
  ClockIcon, 
  GlobeAltIcon, 
  CpuChipIcon,
  SignalIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface PerformanceMetrics {
  loadTime: number;
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  memoryUsage?: number;
  connectionType?: string;
  bandwidth?: number;
}

interface PerformanceMonitorProps {
  isVisible?: boolean;
  onClose?: () => void;
}

export default function PerformanceMonitor({ isVisible = false, onClose }: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isCollecting, setIsCollecting] = useState(false);
  const [history, setHistory] = useState<PerformanceMetrics[]>([]);

  useEffect(() => {
    if (isVisible) {
      collectMetrics();
      const interval = setInterval(collectMetrics, 5000); // 5초마다 메트릭 수집
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const collectMetrics = async () => {
    setIsCollecting(true);
    
    try {
      const performance = window.performance;
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      // Core Web Vitals 수집
      const metrics: PerformanceMetrics = {
        loadTime: navigation.loadEventEnd - navigation.fetchStart,
        fcp: 0,
        lcp: 0,
        fid: 0,
        cls: 0,
        ttfb: navigation.responseStart - navigation.fetchStart,
      };

      // Performance Observer로 Core Web Vitals 수집
      if ('PerformanceObserver' in window) {
        // FCP (First Contentful Paint)
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            metrics.fcp = entries[0].startTime;
          }
        });
        
        try {
          fcpObserver.observe({ entryTypes: ['paint'] });
        } catch (e) {
          console.warn('FCP 측정 불가:', e);
        }

        // LCP (Largest Contentful Paint)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            metrics.lcp = entries[entries.length - 1].startTime;
          }
        });
        
        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.warn('LCP 측정 불가:', e);
        }

        // FID는 실제 사용자 상호작용이 필요하므로 기본값 사용
        metrics.fid = 0;

        // CLS (Cumulative Layout Shift)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          metrics.cls = clsValue;
        });
        
        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.warn('CLS 측정 불가:', e);
        }
      }

      // 메모리 사용량 (Chrome only)
      if ('memory' in performance) {
        metrics.memoryUsage = (performance as any).memory.usedJSHeapSize / 1024 / 1024; // MB
      }

      // 네트워크 정보
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        metrics.connectionType = connection.effectiveType;
        metrics.bandwidth = connection.downlink;
      }

      setMetrics(metrics);
      setHistory(prev => [...prev.slice(-9), metrics]); // 최근 10개 유지
      
    } catch (error) {
      console.error('성능 메트릭 수집 실패:', error);
    }
    
    setIsCollecting(false);
  };

  const getPerformanceGrade = (metric: keyof PerformanceMetrics, value: number): 'excellent' | 'good' | 'poor' => {
    const thresholds = {
      loadTime: { excellent: 1500, good: 3000 },
      fcp: { excellent: 1800, good: 3000 },
      lcp: { excellent: 2500, good: 4000 },
      fid: { excellent: 100, good: 300 },
      cls: { excellent: 0.1, good: 0.25 },
      ttfb: { excellent: 600, good: 1500 }
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'good';

    if (value <= threshold.excellent) return 'excellent';
    if (value <= threshold.good) return 'good';
    return 'poor';
  };

  const formatMetric = (value: number, unit: string): string => {
    if (unit === 'ms') {
      return `${Math.round(value)}ms`;
    }
    if (unit === 'MB') {
      return `${value.toFixed(1)}MB`;
    }
    if (unit === 'score') {
      return value.toFixed(3);
    }
    return value.toString();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-4 right-4 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50"
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <ChartBarIcon className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                성능 모니터
              </h3>
              {isCollecting && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"
                />
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* 메트릭 표시 */}
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {metrics ? (
              <>
                {/* Core Web Vitals */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <GlobeAltIcon className="w-4 h-4 mr-1" />
                    Core Web Vitals
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <MetricCard
                      label="FCP"
                      value={formatMetric(metrics.fcp, 'ms')}
                      grade={getPerformanceGrade('fcp', metrics.fcp)}
                    />
                    <MetricCard
                      label="LCP"
                      value={formatMetric(metrics.lcp, 'ms')}
                      grade={getPerformanceGrade('lcp', metrics.lcp)}
                    />
                    <MetricCard
                      label="FID"
                      value={formatMetric(metrics.fid, 'ms')}
                      grade={getPerformanceGrade('fid', metrics.fid)}
                    />
                    <MetricCard
                      label="CLS"
                      value={formatMetric(metrics.cls, 'score')}
                      grade={getPerformanceGrade('cls', metrics.cls)}
                    />
                  </div>
                </div>

                {/* 기본 메트릭 */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    로딩 성능
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <MetricCard
                      label="페이지 로딩"
                      value={formatMetric(metrics.loadTime, 'ms')}
                      grade={getPerformanceGrade('loadTime', metrics.loadTime)}
                    />
                    <MetricCard
                      label="TTFB"
                      value={formatMetric(metrics.ttfb, 'ms')}
                      grade={getPerformanceGrade('ttfb', metrics.ttfb)}
                    />
                  </div>
                </div>

                {/* 시스템 정보 */}
                {(metrics.memoryUsage || metrics.connectionType) && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                      <CpuChipIcon className="w-4 h-4 mr-1" />
                      시스템 정보
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      {metrics.memoryUsage && (
                        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">메모리 사용량</span>
                            <span className="font-mono">{formatMetric(metrics.memoryUsage, 'MB')}</span>
                          </div>
                        </div>
                      )}
                      
                      {metrics.connectionType && (
                        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400 flex items-center">
                              <SignalIcon className="w-3 h-3 mr-1" />
                              연결 타입
                            </span>
                            <span className="font-mono">{metrics.connectionType}</span>
                          </div>
                          {metrics.bandwidth && (
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-gray-600 dark:text-gray-400">대역폭</span>
                              <span className="font-mono">{metrics.bandwidth} Mbps</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 성능 히스토리 */}
                {history.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      로딩 시간 히스토리
                    </h4>
                    <div className="flex items-end space-x-1 h-16">
                      {history.map((metric, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-blue-200 dark:bg-blue-600 rounded-t"
                          style={{
                            height: `${Math.min((metric.loadTime / 5000) * 100, 100)}%`
                          }}
                          title={`${formatMetric(metric.loadTime, 'ms')}`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      최근 {history.length}회 측정 결과
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    성능 데이터 수집 중...
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 푸터 */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 rounded-b-xl">
            <button
              onClick={collectMetrics}
              disabled={isCollecting}
              className="w-full px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md transition-colors"
            >
              {isCollecting ? '수집 중...' : '새로고침'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  grade: 'excellent' | 'good' | 'poor';
}

function MetricCard({ label, value, grade }: MetricCardProps) {
  return (
    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <span className="text-gray-600 dark:text-gray-400">{label}</span>
          <span className={getGradeColor(grade)}>
            {getGradeIcon(grade)}
          </span>
        </div>
        <span className="font-mono text-gray-900 dark:text-white">{value}</span>
      </div>
    </div>
  );
}

function getGradeColor(grade: 'excellent' | 'good' | 'poor'): string {
  switch (grade) {
    case 'excellent': return 'text-green-600';
    case 'good': return 'text-yellow-600';
    case 'poor': return 'text-red-600';
  }
}

function getGradeIcon(grade: 'excellent' | 'good' | 'poor') {
  switch (grade) {
    case 'excellent': return <CheckCircleIcon className="w-3 h-3" />;
    case 'good': return <ClockIcon className="w-3 h-3" />;
    case 'poor': return <ExclamationTriangleIcon className="w-3 h-3" />;
  }
}