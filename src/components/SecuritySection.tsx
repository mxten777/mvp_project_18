/**
 * 보안 기능 소개 섹션
 */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  Lock,
  Eye,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  Users,
  Database,
  Activity
} from 'lucide-react';

const securityFeatures = [
  {
    icon: Shield,
    title: '개인정보 보호',
    description: '고급 암호화 기술로 개인정보를 안전하게 보호합니다.',
    link: '/privacy',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    icon: Lock,
    title: '보안 인증',
    description: '2단계 인증과 생체 인식으로 계정을 보호합니다.',
    link: '/login',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    icon: Eye,
    title: '실시간 모니터링',
    description: '24시간 보안 위협을 모니터링하고 즉시 대응합니다.',
    link: '/security',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    icon: FileCheck,
    title: '데이터 백업',
    description: '정기적 백업으로 데이터 손실을 방지합니다.',
    link: '/privacy',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  }
];

const securityStats = [
  {
    icon: CheckCircle,
    value: '99.9%',
    label: '보안 신뢰도',
    color: 'text-green-500'
  },
  {
    icon: Activity,
    value: '24/7',
    label: '실시간 모니터링',
    color: 'text-blue-500'
  },
  {
    icon: Database,
    value: '256bit',
    label: 'AES 암호화',
    color: 'text-purple-500'
  },
  {
    icon: Users,
    value: '0',
    label: '보안 사고',
    color: 'text-orange-500'
  }
];

export default function SecuritySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-blue-500" />
            <h2 className="text-4xl font-bold text-gray-900">
              보안 및 개인정보보호
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            최고 수준의 보안 기술로 고객님의 소중한 정보를 안전하게 보호합니다.
            엄격한 보안 정책과 실시간 모니터링으로 신뢰할 수 있는 서비스를 제공합니다.
          </p>
        </motion.div>

        {/* 보안 통계 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {securityStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-white rounded-lg shadow-md border border-gray-200"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 보안 기능 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className={`
                p-6 rounded-lg border-2 transition-all duration-300 hover:shadow-lg
                ${feature.bgColor} ${feature.borderColor} hover:border-opacity-50
              `}
            >
              <feature.icon className={`w-12 h-12 mb-4 ${feature.color}`} />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {feature.description}
              </p>
              <Link
                to={feature.link}
                className={`
                  inline-flex items-center text-sm font-medium transition-colors
                  ${feature.color} hover:opacity-80
                `}
              >
                자세히 보기 →
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 보안 인증서 및 규정 준수 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg border border-gray-200 p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              보안 인증 및 규정 준수
            </h3>
            <p className="text-gray-600">
              국제 표준 보안 규정을 준수하여 최고 수준의 보안 서비스를 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'ISO 27001',
                description: '정보보안 관리 시스템 국제 표준',
                icon: Shield
              },
              {
                title: 'GDPR 준수',
                description: 'EU 개인정보보호 규정 완전 준수',
                icon: FileCheck
              },
              {
                title: 'K-ISMS',
                description: '국내 정보보호 관리체계 인증',
                icon: CheckCircle
              }
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-lg"
              >
                <cert.icon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h4 className="font-semibold text-gray-900 mb-2">
                  {cert.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 보안 정책 링크 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/privacy"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Shield className="w-5 h-5" />
              개인정보보호센터
            </Link>
            <Link
              to="/security"
              className="px-6 py-3 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <Activity className="w-5 h-5" />
              보안 대시보드
            </Link>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg inline-block">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm">
                의심스러운 활동이 감지되면 즉시 고객지원팀(1588-0000)으로 연락주세요.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}