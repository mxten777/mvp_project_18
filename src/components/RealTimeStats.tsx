import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRealTimeStats } from '../hooks/useRealTimeStats';
import StatCard from './StatCard';
import SimpleChart from './SimpleChart';

const RealTimeStats: React.FC = () => {
  const { stats, isLoading, lastUpdate, refreshStats } = useRealTimeStats();

  const formatLastUpdate = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}초 전 업데이트`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전 업데이트`;
    return `${Math.floor(diffInSeconds / 3600)}시간 전 업데이트`;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-secondary-50 via-white to-accent-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-accent-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full mb-6 shadow-lg"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M3 3v18h18"/>
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
            </svg>
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-secondary-800 dark:text-secondary-100 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text text-transparent">
              실시간 서비스
            </span>{' '}
            현황
          </motion.h2>
          
          <motion.p
            className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            현재 진행 중인 서비스와 상담 현황을 <br className="hidden sm:block" />
            <strong className="text-accent-600 dark:text-accent-400">실시간으로</strong> 확인하세요
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>{formatLastUpdate(lastUpdate)}</span>
            </div>
            <motion.button
              onClick={refreshStats}
              className="flex items-center gap-2 px-3 py-1 text-sm text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M1 4v6h6M23 20v-6h-6"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
              </svg>
              새로고침
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 주요 통계 카드들 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <StatCard
            title="현재 접속자"
            value={stats.activeUsers}
            icon={
              <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            }
            color="primary"
            isLoading={isLoading}
          />

          <StatCard
            title="오늘 상담 건수"
            value={stats.consultationsToday}
            change={8.3}
            icon={
              <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
            }
            suffix="건"
            color="secondary"
            isLoading={isLoading}
          />

          <StatCard
            title="진행 중인 서비스"
            value={stats.servicesInProgress}
            change={12.1}
            icon={
              <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
            }
            suffix="건"
            color="success"
            isLoading={isLoading}
          />

          <StatCard
            title="서비스 만족도"
            value={stats.satisfactionRate}
            change={2.1}
            icon={
              <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            }
            suffix="%"
            color="warning"
            isLoading={isLoading}
          />
        </motion.div>

        {/* 상세 통계 차트들 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* 시간별 상담 현황 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <SimpleChart
              type="line"
              data={stats.hourlyConsultations.map(item => ({
                label: item.hour,
                value: item.count
              }))}
              title="시간별 상담 현황"
              height={250}
            />
          </motion.div>

          {/* 지역별 서비스 현황 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <SimpleChart
              type="doughnut"
              data={stats.regionalStats.map(item => ({
                label: item.region,
                value: item.activeServices
              }))}
              title="지역별 서비스 현황"
              height={300}
            />
          </motion.div>
        </div>

        {/* 추가 통계 카드들 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <StatCard
            title="총 서비스 시간"
            value={stats.totalServiceHours}
            change={5.7}
            icon={
              <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
            }
            suffix="시간"
            color="accent"
            size="sm"
            isLoading={isLoading}
          />

          <StatCard
            title="긴급 요청"
            value={stats.emergencyRequests}
            icon={
              <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            }
            suffix="건"
            color="danger"
            size="sm"
            isLoading={isLoading}
          />

          <StatCard
            title="월간 성장률"
            value="15.2"
            change={15.2}
            icon={
              <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <line x1="12" y1="20" x2="12" y2="10"/>
                <line x1="18" y1="20" x2="18" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="16"/>
              </svg>
            }
            suffix="%"
            color="success"
            size="sm"
            isLoading={isLoading}
          />
        </motion.div>

        {/* 푸터 정보 */}
        <motion.div
          className="mt-16 text-center space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm rounded-full border border-secondary-200 dark:border-secondary-700">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-secondary-600 dark:text-secondary-400">
              실시간 데이터 업데이트 중 • 5초마다 갱신
            </span>
          </div>
          
          {/* 분석 대시보드 링크 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/analytics"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M3 3v18h18"/>
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
              </svg>
              고급 분석 대시보드
            </Link>
            <Link
              to="/analytics/custom"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              커스텀 분석 도구
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RealTimeStats;