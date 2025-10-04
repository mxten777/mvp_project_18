/**
 * AI 기능 소개 섹션
 * 홈페이지에서 AI/ML 기능들을 소개하는 컴포넌트
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CpuChipIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  HeartIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

const AIFeaturesSection: React.FC = () => {
  const features = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: '지능형 AI 챗봇',
      description: '24시간 고객 상담과 음성 인식, 감정 분석 기능을 제공하는 스마트 챗봇',
      link: '/ai/chatbot',
      color: 'from-blue-500 to-cyan-500',
      stats: '95% 정확도'
    },
    {
      icon: SparklesIcon,
      title: '개인화 추천 시스템',
      description: '사용자 행동 패턴을 분석하여 맞춤형 서비스와 컨텐츠를 추천',
      link: '/ai',
      color: 'from-purple-500 to-pink-500',
      stats: '87% 만족도'
    },
    {
      icon: HeartIcon,
      title: '실시간 감정 분석',
      description: '텍스트와 음성에서 감정을 인식하여 고객 만족도를 실시간 모니터링',
      link: '/ai',
      color: 'from-green-500 to-emerald-500',
      stats: '91% 정밀도'
    },
    {
      icon: ChartBarIcon,
      title: '예측 분석 엔진',
      description: '머신러닝 기반 트렌드 예측과 데이터 인사이트 제공',
      link: '/ai',
      color: 'from-orange-500 to-red-500',
      stats: '83% 예측률'
    },
    {
      icon: DocumentTextIcon,
      title: '자동 컨텐츠 생성',
      description: 'AI 기반 문서, 공지사항, FAQ 자동 생성 및 최적화',
      link: '/ai',
      color: 'from-indigo-500 to-purple-500',
      stats: '빠른 생성'
    },
    {
      icon: CpuChipIcon,
      title: '통합 AI 대시보드',
      description: '모든 AI 기능을 한 곳에서 관리하고 모니터링할 수 있는 통합 대시보드',
      link: '/ai',
      color: 'from-gray-500 to-gray-700',
      stats: '실시간 분석'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <BoltIcon className="h-8 w-8 text-blue-500 mr-3" />
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
              AI/ML 기술
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            인공지능으로 한 단계 더
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              스마트한 케어 서비스
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            최신 AI/ML 기술을 활용하여 더욱 개인화되고 효율적인 돌봄 서비스를 제공합니다. 
            머신러닝 기반 예측 분석과 지능형 챗봇으로 최고의 사용자 경험을 선사합니다.
          </p>
        </motion.div>

        {/* AI 기능 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Link to={feature.link} className="block">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full">
                  {/* 아이콘과 통계 */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}>
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium">
                      {feature.stats}
                    </span>
                  </div>

                  {/* 제목과 설명 */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* 액션 링크 */}
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                    <span>자세히 보기</span>
                    <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* AI 성과 통계 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              AI 기술의 성과
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              데이터 기반의 검증된 AI 성능 지표
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: '응답 정확도', value: '95%', icon: '🎯' },
              { label: '사용자 만족도', value: '92%', icon: '😊' },
              { label: '처리 속도', value: '0.3초', icon: '⚡' },
              { label: '가동 시간', value: '99.9%', icon: '🔄' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              AI 기술을 직접 체험해보세요
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              최신 인공지능 기술이 어떻게 돌봄 서비스를 혁신하는지 
              직접 확인해보실 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/ai"
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                AI 대시보드 둘러보기
              </Link>
              <Link
                to="/ai/chatbot"
                className="bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
              >
                AI 챗봇 체험하기
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIFeaturesSection;