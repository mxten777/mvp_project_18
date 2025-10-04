import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const AIChatbotSection: React.FC = () => {
  const features = [
    {
      icon: '🤖',
      title: '24시간 즉시 상담',
      description: '언제든지 궁금한 점을 물어보세요',
      color: 'primary'
    },
    {
      icon: '🎯',
      title: '맞춤형 서비스 추천',
      description: '상황에 맞는 최적의 서비스 안내',
      color: 'secondary'
    },
    {
      icon: '💬',
      title: '자연스러운 대화',
      description: '사람과 대화하는 것처럼 편안하게',
      color: 'accent'
    },
    {
      icon: '📞',
      title: '전문 상담사 연결',
      description: '필요시 즉시 전문 상담사 연결',
      color: 'success'
    }
  ];

  const handleStartChat = () => {
    // ChatInterface 컴포넌트의 트리거 버튼 클릭 시뮬레이션
    const chatButton = document.querySelector('[data-chat-trigger]') as HTMLElement;
    if (chatButton) {
      chatButton.click();
    } else {
      // 만약 버튼이 없다면 (이미 열려있다면) 페이지 맨 아래로 스크롤
      window.scrollTo({ 
        top: document.body.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-accent-50 via-white to-secondary-50 dark:from-accent-900/30 dark:via-secondary-800 dark:to-secondary-900">
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
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full mb-6 shadow-lg"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
          >
            <span className="text-4xl">🤖</span>
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-secondary-800 dark:text-secondary-100 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text text-transparent">
              AI 상담사
            </span>{' '}
            소피아
          </motion.h2>
          
          <motion.p
            className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            돌봄 서비스 전문 AI가 24시간 언제든지 <br className="hidden sm:block" />
            <strong className="text-accent-600 dark:text-accent-400">친근하고 정확한 상담</strong>을 제공합니다
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Button
              variant="primary"
              size="xl"
              className="px-8 py-4 text-lg font-bold shadow-xl"
              onClick={handleStartChat}
              leftIcon={
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💬
                </motion.span>
              }
            >
              AI 상담 시작하기
            </Button>
          </motion.div>
        </motion.div>

        {/* 기능 소개 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {features.map((feature, index) => {
            const colorClasses = {
              primary: 'bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-700 text-primary-600 dark:text-primary-400',
              secondary: 'bg-secondary-50 dark:bg-secondary-900/30 border-secondary-200 dark:border-secondary-700 text-secondary-600 dark:text-secondary-400',
              accent: 'bg-accent-50 dark:bg-accent-900/30 border-accent-200 dark:border-accent-700 text-accent-600 dark:text-accent-400',
              success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-600 dark:text-green-400'
            };

            return (
              <motion.div
                key={index}
                className={`${colorClasses[feature.color as keyof typeof colorClasses]} border-2 rounded-3xl p-6 text-center backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-secondary-800 dark:text-secondary-200 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 대화 예시 */}
        <motion.div
          className="bg-white dark:bg-secondary-800 rounded-3xl border border-secondary-200 dark:border-secondary-700 shadow-xl p-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-center text-secondary-800 dark:text-secondary-200 mb-8">
            실제 대화 예시
          </h3>
          
          <div className="max-w-2xl mx-auto space-y-4">
            {/* 사용자 메시지 */}
            <motion.div
              className="flex justify-end"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="bg-primary-500 text-white px-4 py-3 rounded-2xl max-w-xs">
                방문요양 서비스가 뭔가요?
              </div>
            </motion.div>

            {/* AI 응답 */}
            <motion.div
              className="flex justify-start items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                🤖
              </div>
              <div className="bg-gray-100 dark:bg-secondary-700 px-4 py-3 rounded-2xl max-w-md">
                <p className="text-secondary-800 dark:text-secondary-200 text-sm">
                  방문요양은 어르신 댁에 전문 요양보호사가 직접 방문해서 일상생활을 도와드리는 서비스예요! 
                  <br /><br />
                  🏠 신체활동 지원 (목욕, 식사 등)<br />
                  🧹 가사활동 지원 (청소, 세탁 등)<br />
                  💊 투약관리 및 건강체크
                  <br /><br />
                  더 자세한 정보가 필요하시면 언제든 물어보세요!
                </p>
              </div>
            </motion.div>

            {/* 퀵 리플라이 예시 */}
            <motion.div
              className="flex justify-start ml-11"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <div className="flex flex-wrap gap-2">
                {['비용이 궁금해요', '신청 방법', '상담 예약'].map((text, index) => (
                  <motion.button
                    key={index}
                    className="px-3 py-1 text-xs bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                  >
                    {text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm rounded-full border border-secondary-200 dark:border-secondary-700 shadow-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
              AI 상담사 소피아가 24시간 대기 중입니다
            </span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💬
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIChatbotSection;