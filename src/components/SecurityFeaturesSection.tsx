/**
 * 고급 보안 기능 소개 섹션
 * 홈페이지에서 보안 시스템을 소개하고 빠른 접근 제공
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  LockClosedIcon,
  EyeIcon,
  KeyIcon,
  ExclamationTriangleIcon,
  CpuChipIcon,
  BellIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PlayIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const SecurityFeaturesSection: React.FC = () => {
  const features = [
    {
      icon: ShieldCheckIcon,
      title: '실시간 위협 탐지',
      description: 'AI 기반 위협 분석으로 보안 침해를 사전에 차단합니다',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      textColor: 'text-red-600 dark:text-red-400'
    },
    {
      icon: LockClosedIcon,
      title: '다중 인증 (MFA)',
      description: 'SMS, 이메일, TOTP, 생체인증을 통한 강화된 보안',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: CpuChipIcon,
      title: '시스템 모니터링',
      description: 'CPU, 메모리, 네트워크 실시간 성능 모니터링',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      icon: BellIcon,
      title: '즉시 알림 시스템',
      description: '보안 이벤트 발생 시 실시간 알림 및 대응',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  const securityMetrics = [
    { label: '보안 점수', value: '95', unit: '/100', color: 'text-green-600' },
    { label: '차단된 위협', value: '1,247', unit: '건', color: 'text-red-600' },
    { label: '모니터링 시간', value: '99.9', unit: '%', color: 'text-blue-600' },
    { label: '보안 규칙', value: '15', unit: '개', color: 'text-purple-600' }
  ];

  const threatTypes = [
    { name: 'XSS 공격', blocked: 156, severity: 'high' },
    { name: 'SQL Injection', blocked: 89, severity: 'critical' },
    { name: '무차별 대입 공격', blocked: 234, severity: 'medium' },
    { name: '악성 파일 업로드', blocked: 67, severity: 'high' },
    { name: '비정상 접근', blocked: 178, severity: 'medium' }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-purple-600 text-white px-4 py-2 rounded-full">
              <ShieldCheckIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Enterprise Security</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            군사급 보안으로
            <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent block mt-2">
              완벽한 보호를
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            실시간 위협 탐지, 다중 인증, 시스템 모니터링으로 
            귀하의 데이터와 시스템을 완벽하게 보호합니다.
          </p>
        </motion.div>

        {/* 보안 메트릭 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {securityMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">
                <span className={metric.color}>{metric.value}</span>
                <span className="text-lg text-gray-400">{metric.unit}</span>
              </div>
              <div className="text-sm text-gray-400">{metric.label}</div>
            </div>
          ))}
        </motion.div>

        {/* 보안 기능 카드들 */}
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
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl group-hover:-translate-y-2">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-8 w-8 ${feature.textColor}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* 호버 효과 */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 실시간 위협 현황 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* 좌측: 위협 통계 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">실시간 위협 현황</h3>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            
            <div className="space-y-4">
              {threatTypes.map((threat, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      threat.severity === 'critical' ? 'bg-red-500' :
                      threat.severity === 'high' ? 'bg-orange-500' :
                      'bg-yellow-500'
                    }`}></div>
                    <span className="text-white">{threat.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">차단됨:</span>
                    <span className="text-white font-semibold">{threat.blocked}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-900/30 border border-green-700 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-medium">시스템 안전</span>
              </div>
              <p className="text-sm text-green-300 mt-1">
                모든 위협이 성공적으로 차단되었습니다
              </p>
            </div>
          </motion.div>

          {/* 우측: 시스템 모니터링 미리보기 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
          >
            <h3 className="text-2xl font-bold text-white mb-6">시스템 성능</h3>
            
            <div className="space-y-6">
              {/* CPU 사용률 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">CPU 사용률</span>
                  <span className="text-white font-semibold">45%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full w-[45%] transition-all duration-300"></div>
                </div>
              </div>

              {/* 메모리 사용률 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">메모리 사용률</span>
                  <span className="text-white font-semibold">62%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full w-[62%] transition-all duration-300"></div>
                </div>
              </div>

              {/* 네트워크 활동 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">네트워크 활동</span>
                  <span className="text-white font-semibold">23%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full w-[23%] transition-all duration-300"></div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                <div className="text-2xl font-bold text-white">5</div>
                <div className="text-xs text-gray-400">활성 세션</div>
              </div>
              <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-xs text-gray-400">가동률</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center bg-gradient-to-r from-red-600 to-purple-600 rounded-3xl p-12"
        >
          <ShieldCheckIcon className="h-16 w-16 text-white mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-white mb-4">
            최고 수준의 보안을 경험하세요
          </h3>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            실시간 위협 탐지부터 다중 인증까지, 
            엔터프라이즈급 보안 솔루션으로 완벽한 보호를 받으세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/security-center"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 font-medium rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              보안 센터 가기
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/collaboration"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-medium rounded-xl hover:bg-white hover:text-red-600 transition-all duration-300"
            >
              <PlayIcon className="mr-2 h-5 w-5" />
              데모 체험하기
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <ExclamationTriangleIcon className="h-8 w-8 text-white mb-2" />
              <h4 className="font-semibold text-white">실시간 탐지</h4>
              <p className="text-sm text-red-100">AI 기반 위협 분석</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <KeyIcon className="h-8 w-8 text-white mb-2" />
              <h4 className="font-semibold text-white">다중 인증</h4>
              <p className="text-sm text-red-100">강화된 보안 인증</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <ChartBarIcon className="h-8 w-8 text-white mb-2" />
              <h4 className="font-semibold text-white">성능 모니터링</h4>
              <p className="text-sm text-red-100">24/7 시스템 감시</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecurityFeaturesSection;