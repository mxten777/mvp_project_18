/**
 * 커스텀 분석 도구 컴포넌트
 * 사용자 정의 쿼리 및 분석 도구
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  ChartBarIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  PlayIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { analyticsEngine, type UserBehaviorData } from '../utils/analytics';

interface CustomAnalyticsProps {
  className?: string;
}

interface QueryFilter {
  dateRange: {
    start: string;
    end: string;
  };
  deviceType: string;
  page: string;
  userType: string;
}

const CustomAnalytics: React.FC<CustomAnalyticsProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<QueryFilter>({
    dateRange: {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    },
    deviceType: '',
    page: '',
    userType: ''
  });
  const [queryResults, setQueryResults] = useState<UserBehaviorData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuery, setActiveQuery] = useState<string>('');

  // 사전 정의된 분석 쿼리
  const predefinedQueries = [
    {
      id: 'mobile_behavior',
      name: '모바일 사용자 행동',
      description: '모바일 디바이스에서의 사용자 행동 패턴 분석',
      filters: { deviceType: 'mobile' },
      icon: DevicePhoneMobileIcon
    },
    {
      id: 'bounce_analysis',
      name: '바운스율 분석',
      description: '단일 페이지 방문 후 이탈하는 사용자 패턴',
      filters: {},
      icon: ChartBarIcon
    },
    {
      id: 'engagement_deep_dive',
      name: '참여도 심층 분석',
      description: '높은 참여도를 보이는 사용자들의 행동 패턴',
      filters: {},
      icon: FunnelIcon
    },
    {
      id: 'page_performance',
      name: '페이지 성능 분석',
      description: '각 페이지별 성능 및 사용자 경험 분석',
      filters: {},
      icon: DocumentTextIcon
    }
  ];

  // 필터 변경 핸들러
  const handleFilterChange = (key: keyof QueryFilter, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // 쿼리 실행
  const executeQuery = async (customFilters?: Partial<QueryFilter>) => {
    setIsLoading(true);
    try {
      const queryFilters = customFilters ? { ...filters, ...customFilters } : filters;
      
      const results = analyticsEngine.customQuery({
        dateRange: {
          start: new Date(queryFilters.dateRange.start),
          end: new Date(queryFilters.dateRange.end)
        },
        deviceType: queryFilters.deviceType || undefined,
        page: queryFilters.page || undefined
      });

      setQueryResults(results);
    } catch (error) {
      console.error('Query execution failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 사전 정의된 쿼리 실행
  const executePredefinedQuery = async (queryId: string) => {
    setActiveQuery(queryId);
    const query = predefinedQueries.find(q => q.id === queryId);
    if (query) {
      await executeQuery(query.filters);
    }
  };

  // 결과 분석
  const analyzeResults = () => {
    if (queryResults.length === 0) return null;

    const totalEvents = queryResults.length;
    const uniqueUsers = new Set(queryResults.map(r => r.userId)).size;
    const uniqueSessions = new Set(queryResults.map(r => r.sessionId)).size;
    const pageViews = queryResults.filter(r => r.action === 'page_view').length;
    
    const deviceBreakdown = queryResults.reduce((acc, result) => {
      acc[result.deviceType] = (acc[result.deviceType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topPages = Object.entries(
      queryResults
        .filter(r => r.action === 'page_view')
        .reduce((acc, result) => {
          acc[result.page] = (acc[result.page] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
    )
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

    const averageSessionDuration = calculateAverageSessionDuration();

    return {
      totalEvents,
      uniqueUsers,
      uniqueSessions,
      pageViews,
      deviceBreakdown,
      topPages,
      averageSessionDuration
    };
  };

  const calculateAverageSessionDuration = (): number => {
    const sessions = queryResults.reduce((acc, data) => {
      if (!acc[data.sessionId]) {
        acc[data.sessionId] = [];
      }
      acc[data.sessionId].push(data);
      return acc;
    }, {} as Record<string, UserBehaviorData[]>);

    const durations = Object.values(sessions).map(session => {
      if (session.length < 2) return 0;
      const start = Math.min(...session.map(s => s.timestamp.getTime()));
      const end = Math.max(...session.map(s => s.timestamp.getTime()));
      return (end - start) / 1000;
    });

    return durations.length > 0 
      ? durations.reduce((sum, d) => sum + d, 0) / durations.length 
      : 0;
  };

  // CSV 내보내기
  const exportToCSV = () => {
    if (queryResults.length === 0) return;

    const headers = ['사용자ID', '세션ID', '액션', '페이지', '디바이스', '시간', '지속시간'];
    const csvContent = [
      headers.join(','),
      ...queryResults.map(result => [
        result.userId,
        result.sessionId,
        result.action,
        result.page,
        result.deviceType,
        result.timestamp.toISOString(),
        result.duration.toString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `analytics_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const analysis = analyzeResults();

  return (
    <div className={`bg-white rounded-xl shadow-lg ${className}`}>
      {/* 헤더 */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">커스텀 분석 도구</h2>
            <p className="text-gray-600 mt-1">맞춤형 쿼리로 데이터 인사이트 발견</p>
          </div>
          {queryResults.length > 0 && (
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
              CSV 내보내기
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 쿼리 빌더 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 사전 정의된 쿼리 */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 분석</h3>
              <div className="space-y-3">
                {predefinedQueries.map((query) => (
                  <button
                    key={query.id}
                    onClick={() => executePredefinedQuery(query.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      activeQuery === query.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <query.icon className="w-5 h-5 text-blue-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">{query.name}</p>
                        <p className="text-sm text-gray-600">{query.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 커스텀 필터 */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">커스텀 필터</h3>
              <div className="space-y-4">
                {/* 날짜 범위 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CalendarIcon className="w-4 h-4 inline mr-1" />
                    날짜 범위
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={filters.dateRange.start}
                      onChange={(e) => handleFilterChange('dateRange', {
                        ...filters.dateRange,
                        start: e.target.value
                      })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="date"
                      value={filters.dateRange.end}
                      onChange={(e) => handleFilterChange('dateRange', {
                        ...filters.dateRange,
                        end: e.target.value
                      })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* 디바이스 타입 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    디바이스 타입
                  </label>
                  <select
                    value={filters.deviceType}
                    onChange={(e) => handleFilterChange('deviceType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">모든 디바이스</option>
                    <option value="mobile">모바일</option>
                    <option value="tablet">태블릿</option>
                    <option value="desktop">데스크톱</option>
                  </select>
                </div>

                {/* 페이지 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    페이지
                  </label>
                  <input
                    type="text"
                    value={filters.page}
                    onChange={(e) => handleFilterChange('page', e.target.value)}
                    placeholder="예: /home, /about"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* 쿼리 실행 버튼 */}
                <button
                  onClick={() => executeQuery()}
                  disabled={isLoading}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <PlayIcon className="w-4 h-4 mr-2" />
                  )}
                  쿼리 실행
                </button>
              </div>
            </div>
          </div>

          {/* 결과 표시 */}
          <div className="lg:col-span-2">
            {queryResults.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-12 text-center">
                <ChartBarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">분석 결과가 없습니다</h3>
                <p className="text-gray-600">쿼리를 실행하거나 빠른 분석을 선택해보세요.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* 요약 통계 */}
                {analysis && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-blue-600">{analysis.totalEvents}</p>
                      <p className="text-sm text-blue-600">총 이벤트</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-green-600">{analysis.uniqueUsers}</p>
                      <p className="text-sm text-green-600">고유 사용자</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-purple-600">{analysis.uniqueSessions}</p>
                      <p className="text-sm text-purple-600">세션 수</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-orange-600">
                        {Math.floor(analysis.averageSessionDuration / 60)}m {analysis.averageSessionDuration % 60}s
                      </p>
                      <p className="text-sm text-orange-600">평균 세션</p>
                    </div>
                  </div>
                )}

                {/* 디바이스 분포 */}
                {analysis && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">디바이스 분포</h4>
                    <div className="space-y-3">
                      {Object.entries(analysis.deviceBreakdown).map(([device, count]) => (
                        <div key={device} className="flex items-center justify-between">
                          <div className="flex items-center">
                            {device === 'mobile' ? (
                              <DevicePhoneMobileIcon className="w-5 h-5 text-blue-500 mr-3" />
                            ) : (
                              <ComputerDesktopIcon className="w-5 h-5 text-green-500 mr-3" />
                            )}
                            <span className="text-gray-900 font-medium capitalize">{device}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${(count / analysis.totalEvents) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-gray-600 w-8">
                              {count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 상위 페이지 */}
                {analysis && analysis.topPages.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">인기 페이지</h4>
                    <div className="space-y-3">
                      {analysis.topPages.map(([page, count], index) => (
                        <div key={page} className="flex items-center justify-between bg-white p-3 rounded-lg">
                          <div className="flex items-center">
                            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                              {index + 1}
                            </span>
                            <span className="text-gray-900 font-medium">{page}</span>
                          </div>
                          <span className="text-blue-600 font-semibold">{count} 뷰</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 원시 데이터 테이블 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">원시 데이터</h4>
                    <span className="text-sm text-gray-600">
                      {queryResults.length}개 결과 (최근 50개 표시)
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">시간</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">사용자</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">액션</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">페이지</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">디바이스</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {queryResults.slice(0, 50).map((result, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {result.timestamp.toLocaleString()}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600">
                              {result.userId.substring(0, 8)}...
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">{result.action}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{result.page}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">
                              <span className="capitalize">{result.deviceType}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAnalytics;