/**
 * AI 예측 분석 컴포넌트
 * 사용자 데이터 기반 트렌드 예측 및 인사이트 제공
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { aiEngine, type PredictionResult } from '../utils/aiEngine';

interface PredictionAnalyticsProps {
  className?: string;
}

const PredictionAnalytics: React.FC<PredictionAnalyticsProps> = ({ className = '' }) => {
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<string>('');

  const metrics = [
    { id: 'satisfaction', name: '고객 만족도', unit: '%' },
    { id: 'service_usage', name: '서비스 이용률', unit: '%' },
    { id: 'inquiry_count', name: '문의 건수', unit: '건' },
    { id: 'completion_rate', name: '완료율', unit: '%' }
  ];

  useEffect(() => {
    loadPredictions();
  }, []);

  const loadPredictions = async () => {
    setIsLoading(true);
    try {
      const predictionResults: PredictionResult[] = [];

      for (const metric of metrics) {
        const sampleData = generateSampleData(metric.id);
        const prediction = await aiEngine.generatePredictions(metric.name, sampleData, 30);
        predictionResults.push(prediction);
      }

      setPredictions(predictionResults);
      setSelectedMetric(predictionResults[0]?.metric || '');
    } catch (error) {
      console.error('예측 데이터 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSampleData = (metricId: string) => {
    const data = [];
    const baseDate = new Date();
    
    // 메트릭별 기본값과 패턴 설정
    const patterns = {
      satisfaction: { base: 85, variance: 8, trend: 0.1 },
      service_usage: { base: 72, variance: 12, trend: 0.2 },
      inquiry_count: { base: 45, variance: 15, trend: -0.05 },
      completion_rate: { base: 92, variance: 5, trend: 0.15 }
    };

    const pattern = patterns[metricId as keyof typeof patterns] || patterns.satisfaction;

    for (let i = 60; i >= 0; i--) {
      const date = new Date(baseDate.getTime() - i * 24 * 60 * 60 * 1000);
      const trendValue = pattern.trend * (60 - i);
      const seasonalValue = Math.sin((60 - i) / 7 * Math.PI * 2) * 3;
      const randomValue = (Math.random() - 0.5) * pattern.variance;
      
      const value = Math.max(0, 
        pattern.base + trendValue + seasonalValue + randomValue
      );

      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.round(value * 100) / 100
      });
    }

    return data;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUpIcon className="h-5 w-5 text-green-500" />;
      case 'decreasing':
        return <TrendingDownIcon className="h-5 w-5 text-red-500" />;
      default:
        return <MinusIcon className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return 'text-green-600 dark:text-green-400';
      case 'decreasing':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-yellow-600 dark:text-yellow-400';
    }
  };

  const getTrendDescription = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return '증가 추세';
      case 'decreasing':
        return '감소 추세';
      default:
        return '안정적';
    }
  };

  const getInsightIcon = (impact: number) => {
    if (impact > 0.7) return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />;
    if (impact > 0.4) return <LightBulbIcon className="h-4 w-4 text-yellow-500" />;
    return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
  };

  const selectedPrediction = predictions.find(p => p.metric === selectedMetric);

  if (isLoading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* 헤더 */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <ChartBarIcon className="h-6 w-6 mr-2 text-blue-500" />
            AI 예측 분석
          </h3>
          
          {/* 메트릭 선택 */}
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {predictions.map((prediction) => (
              <option key={prediction.metric} value={prediction.metric}>
                {prediction.metric}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="p-6 space-y-6">
        {selectedPrediction ? (
          <>
            {/* 예측 요약 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">예측값</span>
                  {getTrendIcon(selectedPrediction.trend)}
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedPrediction.predicted_value.toFixed(1)}
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                    {metrics.find(m => m.name === selectedMetric)?.unit}
                  </span>
                </div>
                <div className={`text-sm ${getTrendColor(selectedPrediction.trend)}`}>
                  {getTrendDescription(selectedPrediction.trend)}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4"
              >
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">신뢰구간</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedPrediction.confidence_interval[0].toFixed(1)} - {selectedPrediction.confidence_interval[1].toFixed(1)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  ±{((selectedPrediction.confidence_interval[1] - selectedPrediction.confidence_interval[0]) / 2).toFixed(1)}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4"
              >
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">예측 기간</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedPrediction.timeline.length}일
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  향후 예측 데이터
                </div>
              </motion.div>
            </div>

            {/* 타임라인 차트 (간단한 시각화) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
            >
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                예측 타임라인
              </h4>
              
              <div className="space-y-2">
                {selectedPrediction.timeline.slice(0, 10).map((point, index) => (
                  <div key={point.date} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(point.date).toLocaleDateString('ko-KR')}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${(point.value / selectedPrediction.predicted_value) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                        {point.value.toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 w-12 text-right">
                        {(point.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 주요 영향 요인 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                주요 영향 요인
              </h4>
              
              <div className="space-y-3">
                {selectedPrediction.factors.map((factor, index) => (
                  <div key={factor.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getInsightIcon(factor.impact)}
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {factor.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            factor.impact > 0.7 ? 'bg-red-500' :
                            factor.impact > 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${factor.impact * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {(factor.impact * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI 인사이트 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4"
            >
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <LightBulbIcon className="h-5 w-5 mr-2 text-yellow-500" />
                AI 인사이트
              </h4>
              
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  • <strong>{selectedPrediction.metric}</strong>은(는) 향후 30일간 <strong>{getTrendDescription(selectedPrediction.trend)}</strong>를 보일 것으로 예상됩니다.
                </p>
                <p>
                  • 예측값은 <strong>{selectedPrediction.predicted_value.toFixed(1)}</strong>로, 현재 수준과 비교하여 
                  {selectedPrediction.trend === 'increasing' ? ' 개선' : selectedPrediction.trend === 'decreasing' ? ' 주의' : ' 안정적'} 상태입니다.
                </p>
                <p>
                  • 주요 영향 요인은 <strong>{selectedPrediction.factors[0]?.name}</strong>이며, 
                  이에 대한 관리가 중요합니다.
                </p>
                <p>
                  • 신뢰구간을 고려할 때, 실제 값은 <strong>
                    {selectedPrediction.confidence_interval[0].toFixed(1)} - {selectedPrediction.confidence_interval[1].toFixed(1)}
                  </strong> 범위에서 움직일 가능성이 높습니다.
                </p>
              </div>
            </motion.div>
          </>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <ChartBarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>예측 데이터를 불러오는 중입니다...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionAnalytics;