/**
 * 고급 분석 대시보드 컴포넌트
 * 사용자 행동 분석, 비즈니스 메트릭, 예측 분석을 표시
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChartBarIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { 
  type BusinessMetric, 
  type PredictionData, 
  type InsightData,
  getRealTimeData,
  getBusinessMetrics,
  getPredictions,
  getInsights
} from '../utils/analytics';

interface AnalyticsDashboardProps {
  className?: string;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'behavior' | 'predictions' | 'insights'>('overview');
  const [metrics, setMetrics] = useState<BusinessMetric[]>([]);
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [insights, setInsights] = useState<InsightData[]>([]);
  const [realTimeData, setRealTimeData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // 데이터 로딩
  useEffect(() => {
    loadAllData();
  }, []);

  // 자동 새로고침
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      loadRealTimeData();
    }, 30000); // 30초마다 실시간 데이터 업데이트

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [metricsData, predictionsData, insightsData, realTimeInfo] = await Promise.all([
        Promise.resolve(getBusinessMetrics()),
        Promise.resolve(getPredictions()),
        Promise.resolve(getInsights()),
        Promise.resolve(getRealTimeData())
      ]);

      setMetrics(metricsData);
      setPredictions(predictionsData);
      setInsights(insightsData);
      setRealTimeData(realTimeInfo);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadRealTimeData = async () => {
    try {
      const data = getRealTimeData();
      setRealTimeData(data);
    } catch (error) {
      console.error('Failed to load real-time data:', error);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <LightBulbIcon className="w-5 h-5 text-yellow-500" />;
      case 'issue': return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      case 'trend': return <ArrowTrendingUpIcon className="w-5 h-5 text-blue-500" />;
      case 'recommendation': return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      default: return <ChartBarIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <div className="flex items-center justify-center h-64">
          <ArrowPathIcon className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600">분석 데이터 로딩 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg ${className}`}>
      {/* 헤더 */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">분석 대시보드</h2>
            <p className="text-gray-600 mt-1">실시간 인사이트와 비즈니스 메트릭</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                autoRefresh 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {autoRefresh ? '자동 새로고침 켜짐' : '자동 새로고침 꺼짐'}
            </button>
            <button
              onClick={loadAllData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowPathIcon className="w-4 h-4 inline mr-2" />
              새로고침
            </button>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="mt-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: '개요', icon: ChartBarIcon },
              { id: 'behavior', label: '사용자 행동', icon: UsersIcon },
              { id: 'predictions', label: '예측 분석', icon: ArrowTrendingUpIcon },
              { id: 'insights', label: '인사이트', icon: LightBulbIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* 실시간 메트릭 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">활성 사용자</p>
                      <p className="text-2xl font-bold">{realTimeData?.activeUsers || 0}</p>
                    </div>
                    <UsersIcon className="w-8 h-8 text-blue-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">페이지 뷰</p>
                      <p className="text-2xl font-bold">{realTimeData?.currentPageViews || 0}</p>
                    </div>
                    <EyeIcon className="w-8 h-8 text-green-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">평균 로딩시간</p>
                      <p className="text-2xl font-bold">{realTimeData?.averageLoadTime?.toFixed(0) || 0}ms</p>
                    </div>
                    <ClockIcon className="w-8 h-8 text-purple-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">모바일 사용률</p>
                      <p className="text-2xl font-bold">
                        {realTimeData?.deviceBreakdown?.find((d: any) => d.device === 'mobile')?.percentage?.toFixed(1) || 0}%
                      </p>
                    </div>
                    <DevicePhoneMobileIcon className="w-8 h-8 text-orange-200" />
                  </div>
                </div>
              </div>

              {/* 비즈니스 메트릭 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">주요 비즈니스 메트릭</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {metrics.map((metric) => (
                    <div key={metric.id} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">{metric.name}</p>
                          <p className="text-xl font-bold text-gray-900">
                            {metric.category === 'engagement' && metric.id === 'avg_session_duration'
                              ? formatDuration(metric.value)
                              : metric.id === 'bounce_rate' || metric.id === 'mobile_usage'
                              ? `${metric.value.toFixed(1)}%`
                              : formatNumber(metric.value)
                            }
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(metric.trend)}
                          <span className={`text-sm font-medium ${
                            metric.changePercent > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {metric.changePercent > 0 ? '+' : ''}{metric.changePercent.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 상위 페이지 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">인기 페이지</h3>
                <div className="space-y-3">
                  {realTimeData?.topPages?.map((page: any, index: number) => (
                    <div key={page.page} className="flex items-center justify-between bg-white p-3 rounded-lg">
                      <div className="flex items-center">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                          {index + 1}
                        </span>
                        <span className="text-gray-900 font-medium">{page.page}</span>
                      </div>
                      <span className="text-blue-600 font-semibold">{page.views} 뷰</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'behavior' && (
            <motion.div
              key="behavior"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* 디바이스 분포 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">디바이스 분포</h3>
                <div className="space-y-4">
                  {realTimeData?.deviceBreakdown?.map((device: any) => (
                    <div key={device.device} className="flex items-center justify-between">
                      <div className="flex items-center">
                        {device.device === 'mobile' ? (
                          <DevicePhoneMobileIcon className="w-5 h-5 text-blue-500 mr-3" />
                        ) : (
                          <ComputerDesktopIcon className="w-5 h-5 text-green-500 mr-3" />
                        )}
                        <span className="text-gray-900 font-medium capitalize">{device.device}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${device.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-600 w-12">
                          {device.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 사용자 행동 패턴 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">사용자 행동 패턴</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {formatDuration(metrics.find(m => m.id === 'avg_session_duration')?.value || 0)}
                    </p>
                    <p className="text-sm text-gray-600">평균 세션 시간</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {metrics.find(m => m.id === 'bounce_rate')?.value.toFixed(1) || 0}%
                    </p>
                    <p className="text-sm text-gray-600">바운스율</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-purple-600">2.3</p>
                    <p className="text-sm text-gray-600">평균 페이지 깊이</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'predictions' && (
            <motion.div
              key="predictions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {predictions.map((prediction, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {prediction.metric === 'page_views' ? '페이지 뷰 예측' : '참여도 예측'}
                      </h3>
                      <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        {prediction.timeframe}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">현재 값</span>
                        <span className="text-xl font-bold text-gray-900">
                          {formatNumber(prediction.currentValue)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">예측 값</span>
                        <span className="text-xl font-bold text-green-600">
                          {formatNumber(prediction.predictedValue)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">신뢰도</span>
                        <span className="text-lg font-semibold text-blue-600">
                          {(prediction.confidence * 100).toFixed(0)}%
                        </span>
                      </div>

                      <div className="pt-4 border-t border-blue-100">
                        <p className="text-sm text-gray-600 mb-2">주요 요인:</p>
                        <div className="flex flex-wrap gap-2">
                          {prediction.factors.map((factor, idx) => (
                            <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {factor}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {insights.map((insight) => (
                <div key={insight.id} className={`border rounded-xl p-6 ${getImpactColor(insight.impact)}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      {getInsightIcon(insight.type)}
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold">{insight.title}</h3>
                        <p className="text-sm opacity-75">{insight.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-50">
                        {insight.impact.toUpperCase()} 임팩트
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-50">
                        우선순위 {insight.priority}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="font-medium mb-2">액션 아이템:</p>
                      <ul className="space-y-1">
                        {insight.actionItems.map((item, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <CheckCircleIcon className="w-4 h-4 mr-2 opacity-75" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {insight.relatedMetrics.length > 0 && (
                      <div>
                        <p className="font-medium mb-2">관련 메트릭:</p>
                        <div className="flex flex-wrap gap-2">
                          {insight.relatedMetrics.map((metric, index) => (
                            <span key={index} className="text-xs bg-white bg-opacity-50 px-2 py-1 rounded">
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;