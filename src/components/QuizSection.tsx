import React from 'react';
import { motion } from 'framer-motion';
import PersonalizationQuiz from './PersonalizationQuiz';

const QuizSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-secondary-50 via-white to-primary-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-primary-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mb-6 shadow-lg"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4"/>
              <path d="M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8"/>
              <path d="M12 8v4"/>
              <path d="M12 2v2"/>
              <path d="M2.05 12h2"/>
              <path d="M20 12h2"/>
            </svg>
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-secondary-800 dark:text-secondary-100 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              맞춤형 상담
            </span>{' '}
            진단하기
          </motion.h2>
          
          <motion.p
            className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            몇 가지 간단한 질문으로 어르신께 가장 적합한 <br className="hidden sm:block" />
            <strong className="text-primary-600 dark:text-primary-400">맞춤형 돌봄 서비스</strong>를 추천받으세요
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {[
              { icon: '⏱️', text: '3분 간단 진단' },
              { icon: '🎯', text: '맞춤 서비스 추천' },
              { icon: '💰', text: '비용 안내' },
              { icon: '📞', text: '즉시 상담 연결' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 bg-white/80 dark:bg-secondary-700/80 px-4 py-2 rounded-full border border-primary-200 dark:border-primary-700"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-lg">{feature.icon}</span>
                <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* 퀴즈 컴포넌트 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <PersonalizationQuiz />
        </motion.div>
      </div>
    </section>
  );
};

export default QuizSection;