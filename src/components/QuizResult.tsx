import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface UserProfile {
  careLevel: 'light' | 'moderate' | 'intensive';
  services: string[];
  urgency: 'immediate' | 'within_week' | 'within_month';
  location?: string;
}

interface QuizResultProps {
  profile: UserProfile;
  onStartOver: () => void;
  onBookConsultation: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({ profile, onStartOver, onBookConsultation }) => {
  // 맞춤 추천 생성
  const getRecommendations = () => {
    const recommendations = [];
    
    // 돌봄 수준에 따른 추천
    if (profile.careLevel === 'intensive') {
      recommendations.push({
        title: '집중 케어 패키지',
        description: '24시간 전문 돌봄이 필요한 어르신을 위한 종합 서비스',
        services: ['방문요양', '방문간호', '방문목욕', '주야간보호'],
        icon: '🏥',
        urgency: 'high'
      });
    } else if (profile.careLevel === 'moderate') {
      recommendations.push({
        title: '부분 도움 패키지',
        description: '일상생활에 부분적 도움이 필요한 어르신을 위한 맞춤 서비스',
        services: ['방문요양', '방문간호'],
        icon: '🤝',
        urgency: 'medium'
      });
    } else {
      recommendations.push({
        title: '라이트 케어 패키지',
        description: '독립적인 생활을 유지하면서 필요시 도움을 받는 서비스',
        services: ['방문간호', '건강체크'],
        icon: '🚶',
        urgency: 'low'
      });
    }

    return recommendations;
  };

  const recommendations = getRecommendations();
  const estimatedCost = profile.careLevel === 'intensive' ? '180,000' : 
                       profile.careLevel === 'moderate' ? '120,000' : '80,000';
  const govSupport = profile.careLevel === 'intensive' ? '153,000' : 
                    profile.careLevel === 'moderate' ? '102,000' : '68,000';

  return (
    <motion.div
      className="max-w-4xl mx-auto p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* 헤더 */}
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
        >
          <span className="text-3xl">✨</span>
        </motion.div>
        <h2 className="text-3xl font-bold text-secondary-800 dark:text-secondary-100 mb-2">
          맞춤 상담 결과
        </h2>
        <p className="text-lg text-secondary-600 dark:text-secondary-400">
          어르신의 상황에 최적화된 서비스를 추천드립니다
        </p>
      </div>

      {/* 추천 서비스 카드 */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {recommendations.map((rec, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-secondary-800 rounded-3xl p-8 border-2 border-primary-200 dark:border-primary-700 shadow-xl"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">{rec.icon}</div>
              <h3 className="text-xl font-bold text-secondary-800 dark:text-secondary-100 mb-2">
                {rec.title}
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                {rec.description}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-secondary-800 dark:text-secondary-200">
                포함 서비스:
              </h4>
              {rec.services.map((service, serviceIndex) => (
                <div key={serviceIndex} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-secondary-700 dark:text-secondary-300">{service}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 비용 정보 */}
      <motion.div
        className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-3xl p-8 mb-8 border border-primary-200/50 dark:border-primary-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-center text-secondary-800 dark:text-secondary-100 mb-6">
          예상 비용 (월간)
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/60 dark:bg-secondary-800/60 rounded-2xl p-6">
            <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">
              총 비용
            </div>
            <div className="text-3xl font-bold text-secondary-800 dark:text-secondary-200">
              {estimatedCost}원
            </div>
          </div>
          
          <div className="bg-primary-100/60 dark:bg-primary-900/60 rounded-2xl p-6">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              국가 지원
            </div>
            <div className="text-3xl font-bold text-primary-700 dark:text-primary-300">
              {govSupport}원
            </div>
          </div>
          
          <div className="bg-accent-100/60 dark:bg-accent-900/60 rounded-2xl p-6">
            <div className="text-2xl font-bold text-accent-600 dark:text-accent-400 mb-2">
              본인 부담
            </div>
            <div className="text-3xl font-bold text-accent-700 dark:text-accent-300">
              {(parseInt(estimatedCost.replace(',', '')) - parseInt(govSupport.replace(',', ''))).toLocaleString()}원
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary-100/40 dark:bg-primary-900/40 rounded-xl text-center">
          <p className="text-sm text-primary-700 dark:text-primary-300">
            💡 국가 지원금으로 <strong>85% 이상</strong> 비용 절감 가능
          </p>
        </div>
      </motion.div>

      {/* 긴급도 알림 */}
      {profile.urgency === 'immediate' && (
        <motion.div
          className="bg-accent-50 dark:bg-accent-900/30 border-l-4 border-accent-500 rounded-r-xl p-6 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚨</span>
            <div>
              <h4 className="font-bold text-accent-700 dark:text-accent-300">긴급 상담 필요</h4>
              <p className="text-accent-600 dark:text-accent-400">
                즉시 서비스가 필요하신 상황입니다. 24시간 내 전문 상담사가 연락드리겠습니다.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* 액션 버튼들 */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="primary"
            size="xl"
            className="px-8 py-4 text-lg font-bold shadow-xl"
            onClick={onBookConsultation}
            leftIcon={
              <motion.svg 
                width="24" 
                height="24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                viewBox="0 0 24 24"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
              </motion.svg>
            }
          >
            {profile.urgency === 'immediate' ? '긴급 상담 신청' : '맞춤 상담 예약'}
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="secondary"
            size="xl"
            className="px-8 py-4 text-lg font-bold"
            onClick={onStartOver}
            leftIcon={
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M1 4v6h6M23 20v-6h-6"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
              </svg>
            }
          >
            다시 진단하기
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default QuizResult;