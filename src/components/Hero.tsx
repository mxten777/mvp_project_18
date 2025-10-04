import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Button from "./Button";

const Hero: React.FC = () => {
  // 모바일 성능을 위해 애니메이션 간소화
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: isReducedMotion ? 0.1 : 0.6,
        staggerChildren: isReducedMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: isReducedMotion ? 0 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: isReducedMotion ? 0.1 : 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      className="relative py-16 sm:py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center justify-center overflow-hidden shadow-lg w-full max-w-full mt-4 mobile-safe"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
    
    {/* 단순화된 배경 */}
    <div className="absolute inset-0 pointer-events-none select-none">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10" />
    </div>

    <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-4 sm:px-6 text-center mobile-container">
      
      {/* 로고/아이콘 */}
      <motion.div 
        className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 shadow-glow mb-6 sm:mb-8 border-4 border-white/50 dark:border-secondary-800/50"
        variants={itemVariants}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" className="text-white">
          <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M16 28c4-8 16-8 20 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="19" cy="20" r="2.5" fill="currentColor"/>
          <circle cx="29" cy="20" r="2.5" fill="currentColor"/>
          <path d="M14 35h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.div>

      {/* 메인 헤딩 */}
      <motion.h1 
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-secondary-800 dark:text-secondary-100 mb-6 sm:mb-8 drop-shadow-soft tracking-tight leading-[1.2] max-w-4xl elegant-heading"
        variants={itemVariants}
      >
        <motion.span 
          className="block mb-2 sm:mb-3 text-base sm:text-lg md:text-xl font-normal"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          부모님 돌보시는 분들에게
        </motion.span>
        <motion.span 
          className="block"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="gradient-text font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            마음의 짐을 덜어드리겠습니다
          </span>
        </motion.span>
      </motion.h1>

      {/* 서브 헤딩 */}
      <motion.div 
        className="mb-6"
        variants={itemVariants}
      >
        <p className="text-lg sm:text-xl md:text-2xl text-secondary-600 dark:text-secondary-300 mb-3 sm:mb-4 font-medium max-w-3xl leading-relaxed elegant-text">
          <span className="inline-block bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-400 dark:to-primary-300 bg-clip-text text-transparent font-semibold text-xl sm:text-2xl md:text-3xl">
            국가 지원금 85% 이상
          </span>
        </p>
        <p className="text-base sm:text-lg md:text-xl text-secondary-700 dark:text-secondary-300 font-normal max-w-2xl leading-relaxed elegant-text">
          전화 한 통으로 통합 방문요양/간호/목욕 서비스
        </p>
      </motion.div>

      {/* 혜택 포인트 */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 animate-slide-in" style={{ animationDelay: '0.4s' }}>
        {[
          { icon: "🏠", text: "집에서 받는 전문 케어" },
          { icon: "💝", text: "24시간 상담 가능" },
          { icon: "⚡", text: "빠른 서비스 시작" }
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-2 bg-white/70 dark:bg-secondary-800/70 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-200/50 dark:border-primary-700/50 shadow-soft">
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium text-secondary-700 dark:text-secondary-200">{item.text}</span>
          </div>
        ))}
      </div>

      {/* CTA 버튼들 */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-in" style={{ animationDelay: '0.6s' }}>
        <Button
          variant="primary"
          size="xl"
          className="px-8 py-4 text-lg font-semibold shadow-glow hover:scale-105 transition-all duration-300"
          leftIcon={
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
            </svg>
          }
        >
          무료 상담 신청
        </Button>
        <Button
          variant="secondary"
          size="xl"
          className="px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300"
          leftIcon={
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
          }
        >
          서비스 자료 다운로드
        </Button>
      </div>

      {/* 신뢰도 지표 */}
      <div className="grid grid-cols-3 gap-8 w-full max-w-md animate-slide-in" style={{ animationDelay: '0.8s' }}>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">1,200+</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">만족 가족</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">95%</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">만족도</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">24시간</div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">응답 시간</div>
        </div>
      </div>
    </div>

    {/* 하단 웨이브 */}
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/20 to-transparent dark:from-secondary-900/20 backdrop-blur-sm" />
    </motion.section>
  );
};

export default Hero;