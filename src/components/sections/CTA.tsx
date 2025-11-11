import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

/**
 * CTA(Call To Action) 섹션 컴포넌트
 * @description 상담 신청 유도 섹션
 */
const CTA: React.FC = React.memo(() => {
  const benefits = useMemo(() => [
    { icon: "📞", title: "무료 전화 상담", desc: "24시간 언제든지" },
    { icon: "🏠", title: "맞춤형 서비스", desc: "개인별 필요에 맞춤" },
    { icon: "💰", title: "국가 지원금", desc: "최대 85% 지원" }
  ], []);

  const handlePhoneClick = useCallback(() => {
    window.location.href = 'tel:1588-0000';
  }, []);

  const handleKakaoClick = useCallback(() => {
    window.open('https://pf.kakao.com/_돌봄서비스', '_blank');
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-900 relative overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-primary-300 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold font-heading text-white mb-6"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            지금 바로 상담받으세요
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-white dark:text-primary-50 mb-12 max-w-3xl mx-auto leading-relaxed font-semibold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            전화 한 통으로 전문 상담사가 맞춤형 돌봄 서비스를 안내해드립니다
          </motion.p>

          {/* 혜택 리스트 */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20"
              >
                <div className="text-5xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-primary-50 text-base font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA 버튼들 */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="secondary"
                size="xl"
                onClick={handlePhoneClick}
                className="bg-white text-primary-600 hover:bg-primary-50 text-xl px-12 py-5 shadow-large font-bold"
              >
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center gap-2"
                >
                  📞 1588-0000
                </motion.span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="xl"
                onClick={handleKakaoClick}
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 text-xl px-12 py-5 font-bold transition-all duration-300"
              >
                💬 카카오톡 상담
              </Button>
            </motion.div>
          </motion.div>

          <motion.p 
            className="text-primary-50 dark:text-primary-100 text-base font-semibold mt-10 bg-primary-700/30 dark:bg-primary-800/30 backdrop-blur-sm px-6 py-3 rounded-2xl border border-primary-400/30"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-2xl mr-2">⭐</span>
            평일 09:00-18:00 / 주말·공휴일 응급상담 가능
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
});

CTA.displayName = 'CTA';

export default CTA;