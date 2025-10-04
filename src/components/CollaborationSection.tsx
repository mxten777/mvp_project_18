/**
 * 실시간 협업 기능 소개 섹션
 * 홈페이지에서 협업 시스템을 소개하고 빠른 접근 제공
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ShareIcon,
  BellIcon,
  SparklesIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

const CollaborationSection: React.FC = () => {
  const features = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: '실시간 채팅',
      description: '팀원들과 즉시 소통하고 파일을 공유하세요',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: VideoCameraIcon,
      title: '화상 통화',
      description: 'HD 화질의 비디오 콜과 화면 공유 기능',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      icon: DocumentTextIcon,
      title: '문서 협업',
      description: '실시간으로 문서를 함께 편집하고 관리하세요',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: BellIcon,
      title: '스마트 알림',
      description: '중요한 메시지와 업데이트를 놓치지 마세요',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-600 dark:text-orange-400'
    }
  ];

  const stats = [
    { label: '동시 접속자', value: '500+', unit: '명' },
    { label: '메시지 처리', value: '99.9', unit: '%' },
    { label: '응답 속도', value: '<50', unit: 'ms' },
    { label: '업타임', value: '99.9', unit: '%' }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full">
              <SparklesIcon className="h-5 w-5" />
              <span className="text-sm font-medium">새로운 기능</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            실시간 협업으로
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
              더 나은 서비스를
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            팀원들과 실시간으로 소통하고 협업하여 더 빠르고 효율적인 서비스를 제공하세요.
            최신 WebRTC 기술로 끊김 없는 소통 경험을 제공합니다.
          </p>
        </motion.div>

        {/* 통계 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
                <span className="text-lg text-blue-600 dark:text-blue-400">{stat.unit}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* 기능 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-xl group-hover:-translate-y-2">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-8 w-8 ${feature.textColor}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* 호버 효과 */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 데모 미리보기 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 shadow-2xl mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 좌측 콘텐츠 */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <UserGroupIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-600 dark:text-blue-400 font-medium">실시간 협업</span>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                언제 어디서나 팀과 함께
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">즉시 연결</p>
                    <p className="text-gray-600 dark:text-gray-400">클릭 한 번으로 팀원들과 바로 연결</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">끊김 없는 소통</p>
                    <p className="text-gray-600 dark:text-gray-400">안정적인 네트워크로 원활한 협업</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">보안 강화</p>
                    <p className="text-gray-600 dark:text-gray-400">엔드투엔드 암호화로 안전한 소통</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/collaboration"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  <span>지금 시작하기</span>
                  <PlayIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
                  <ShareIcon className="mr-2 h-5 w-5" />
                  데모 보기
                </button>
              </div>
            </div>

            {/* 우측 미리보기 */}
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-1">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                  {/* 가상 협업 화면 */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">5명 온라인</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                        <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                          <p className="text-xs text-gray-600 dark:text-gray-400">회의 자료 공유했습니다</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 justify-end">
                        <div className="flex-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2 max-w-xs">
                          <p className="text-xs text-gray-600 dark:text-gray-400">화상통화 시작할까요?</p>
                        </div>
                        <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                        <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                          <p className="text-xs text-gray-600 dark:text-gray-400">네, 좋습니다! 🎉</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-center space-x-4">
                        <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                          <VideoCameraIcon className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">화상통화 연결 중...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 플로팅 아이콘들 */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center animate-bounce">
                <ChatBubbleLeftRightIcon className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center animate-pulse">
                <BellIcon className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">
            지금 바로 팀 협업을 시작하세요
          </h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            무료로 시작하여 팀의 생산성을 향상시키고 더 나은 서비스를 제공하세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/collaboration"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-medium rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              협업 센터 가기
              <UserGroupIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/ai/chatbot"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-medium rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              AI 챗봇과 대화하기
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CollaborationSection;