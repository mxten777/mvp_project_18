/**
 * 번들 사이즈 분석기
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArchiveBoxIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface BundleAnalyzerProps {
  isVisible?: boolean;
  onClose?: () => void;
}

interface BundleInfo {
  totalSize: number;
  gzippedSize: number;
  chunks: Array<{
    name: string;
    size: number;
    modules: number;
  }>;
  assets: Array<{
    name: string;
    size: number;
    type: string;
  }>;
}

export default function BundleAnalyzer({ isVisible = false, onClose }: BundleAnalyzerProps) {
  const [bundleInfo, setBundleInfo] = useState<BundleInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isVisible && !bundleInfo) {
      analyzeBundleSize();
    }
  }, [isVisible, bundleInfo]);

  const analyzeBundleSize = async () => {
    setIsLoading(true);
    
    try {
      // 실제 환경에서는 webpack-bundle-analyzer 또는 rollup-plugin-analyzer 결과를 사용
      // 여기서는 시뮬레이션된 데이터를 사용
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockBundleInfo: BundleInfo = {
        totalSize: 2450000, // 2.45MB
        gzippedSize: 850000, // 850KB
        chunks: [
          { name: 'vendor', size: 1200000, modules: 45 },
          { name: 'main', size: 580000, modules: 120 },
          { name: 'ui', size: 420000, modules: 35 },
          { name: 'utils', size: 180000, modules: 25 },
          { name: 'charts', size: 70000, modules: 8 }
        ],
        assets: [
          { name: 'main.js', size: 580000, type: 'javascript' },
          { name: 'vendor.js', size: 1200000, type: 'javascript' },
          { name: 'ui.js', size: 420000, type: 'javascript' },
          { name: 'main.css', size: 45000, type: 'stylesheet' },
          { name: 'images/*', size: 205000, type: 'images' }
        ]
      };
      
      setBundleInfo(mockBundleInfo);
    } catch (error) {
      console.error('번들 분석 실패:', error);
    }
    
    setIsLoading(false);
  };

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getPercentage = (size: number, total: number): number => {
    return Math.round((size / total) * 100);
  };

  const getSizeColor = (percentage: number): string => {
    if (percentage < 20) return 'bg-green-500';
    if (percentage < 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <ArchiveBoxIcon className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                번들 분석기
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* 내용 */}
          <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <p className="text-gray-600 dark:text-gray-400">번들 분석 중...</p>
                </div>
              </div>
            ) : bundleInfo ? (
              <div className="space-y-6">
                {/* 총 크기 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <DocumentChartBarIcon className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        총 크기
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatSize(bundleInfo.totalSize)}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <ArchiveBoxIcon className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        압축 크기
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatSize(bundleInfo.gzippedSize)}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <ChartBarIcon className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        압축률
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.round((bundleInfo.gzippedSize / bundleInfo.totalSize) * 100)}%
                    </p>
                  </div>
                </div>

                {/* 청크 분석 */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    청크별 분석
                  </h4>
                  <div className="space-y-3">
                    {bundleInfo.chunks.map((chunk, index) => {
                      const percentage = getPercentage(chunk.size, bundleInfo.totalSize);
                      return (
                        <motion.div
                          key={chunk.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {chunk.name}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                ({chunk.modules} 모듈)
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-gray-900 dark:text-white">
                                {formatSize(chunk.size)}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {percentage}%
                              </div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                              className={`h-2 rounded-full ${getSizeColor(percentage)}`}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* 애셋 분석 */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    애셋별 분석
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {bundleInfo.assets.map((asset, index) => (
                      <motion.div
                        key={asset.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white text-sm">
                              {asset.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {asset.type}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900 dark:text-white text-sm">
                              {formatSize(asset.size)}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 최적화 제안 */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                    최적화 제안
                  </h4>
                  <ul className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                    <li>• vendor 청크가 큽니다. 트리 셰이킹을 검토해보세요.</li>
                    <li>• 이미지 최적화(WebP, AVIF)를 고려해보세요.</li>
                    <li>• 사용하지 않는 라이브러리를 제거하세요.</li>
                    <li>• 코드 분할을 통해 초기 로딩 시간을 단축하세요.</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  번들 정보를 불러오지 못했습니다.
                </p>
                <button
                  onClick={analyzeBundleSize}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  다시 시도
                </button>
              </div>
            )}
          </div>

          {/* 푸터 */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                번들 분석 도구 v1.0 - 성능 최적화를 위한 분석 결과
              </p>
              <button
                onClick={analyzeBundleSize}
                disabled={isLoading}
                className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded transition-colors"
              >
                새로고침
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}