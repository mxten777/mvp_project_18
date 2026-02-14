import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { GlassCard, PremiumButton } from "../premium";
import { 
  SparklesIcon, 
  HeartIcon, 
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

/**
 * Premium Hero Section
 * @description 글로벌 표준 탑클래스급 히어로 섹션
 */
const Hero: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative min-h-[90vh] flex items-center bg-hero-gradient dark:bg-hero-gradient-dark overflow-hidden">
      {/* 🎨 배경 애니메이션 요소 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/3 -right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary-300/30 to-primary-500/30 dark:from-primary-700/20 dark:to-primary-900/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-1/3 -left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-warm-300/30 to-warm-500/30 dark:from-warm-700/20 dark:to-warm-900/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-primary-200/20 via-transparent to-primary-200/20 dark:from-primary-800/10 dark:via-transparent dark:to-primary-800/10 rounded-full blur-2xl"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <div className="flex flex-col items-center text-center">
          
          {/* ✨ 브랜드 아이콘 */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.68, -0.55, 0.265, 1.55],
              delay: 0.2
            }}
            className="relative mb-8"
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-600 shadow-glow-lg"
            >
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 rounded-3xl bg-glass-gradient backdrop-blur-sm" />
              
              {/* Icon */}
              <span className="relative text-6xl animate-float">💚</span>
              
              {/* Sparkle effect */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2"
              >
                <SparklesIcon className="w-8 h-8 text-warning-400" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 📢 Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <GlassCard 
              variant="glass" 
              size="sm" 
              hover="glow"
              className="inline-flex items-center gap-2 px-4 py-2"
              animate={false}
            >
              <CheckCircleIcon className="w-5 h-5 text-success-500" />
              <span className="text-sm font-semibold text-secondary-700 dark:text-secondary-200">
                {t('hero.badge', '정부 지원 85% | 전문 돌봄 서비스')}
              </span>
            </GlassCard>
          </motion.div>

          {/* 🎯 메인 헤딩 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-secondary-900 dark:text-white mb-6 tracking-tight leading-tight">
              <motion.span
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="inline-block bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 dark:from-primary-400 dark:via-primary-500 dark:to-primary-400 bg-clip-text text-transparent bg-size-200"
              >
                {t('hero.title', '바이칼 재가복지센터')}
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg sm:text-xl lg:text-2xl text-secondary-600 dark:text-secondary-300 font-medium max-w-3xl mx-auto"
            >
              {t('hero.subtitle', '사랑과 정성으로 제공하는 전문 돌봄 서비스')}
            </motion.p>
          </motion.div>

          {/* 📝 서브 헤딩 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-10 max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30">
                <ShieldCheckIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span className="text-lg font-bold text-primary-700 dark:text-primary-300">
                  {t('hero.support', '국가 지원금 85% 적용')}
                </span>
              </div>
            </div>
            
            <p className="text-lg sm:text-xl text-secondary-700 dark:text-secondary-300 leading-relaxed">
              {t('hero.description', '방문요양, 방문간호, 방문목욕 서비스를 전문적이고 체계적으로 제공합니다.')}
            </p>
          </motion.div>

          {/* 🎬 CTA 버튼들 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <PremiumButton
              variant="gradient"
              size="xl"
              rightIcon={<ArrowRightIcon className="w-6 h-6" />}
              className="shadow-glow-lg"
            >
              {t('hero.cta', '무료 상담 신청')}
            </PremiumButton>
            
            <PremiumButton
              variant="glass"
              size="xl"
              leftIcon={<HeartIcon className="w-6 h-6" />}
            >
              {t('hero.learnMore', '서비스 알아보기')}
            </PremiumButton>
          </motion.div>

          {/* 📊 신뢰 지표 - Glassmorphism Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full"
          >
            {[
              { 
                value: "1,000+", 
                label: t('hero.stats.customers', '만족한 고객'),
                icon: "👥",
                color: "primary"
              },
              { 
                value: "24/7", 
                label: t('hero.stats.support', '응급 대응'),
                icon: "🚑",
                color: "accent"
              },
              { 
                value: "15년+", 
                label: t('hero.stats.experience', '운영 경험'),
                icon: "⭐",
                color: "warning"
              }
            ].map((stat, index) => (
              <GlassCard
                key={index}
                variant="gradient"
                size="lg"
                hover="lift"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.3 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="flex flex-col items-center"
                >
                  {/* Icon */}
                  <motion.div
                    animate={{
                      rotate: [0, -10, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                    className="text-4xl mb-4"
                  >
                    {stat.icon}
                  </motion.div>
                  
                  {/* Value */}
                  <motion.span 
                    className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-400 dark:to-primary-500 bg-clip-text text-transparent mb-2"
                  >
                    {stat.value}
                  </motion.span>
                  
                  {/* Label */}
                  <span className="text-base font-medium text-secondary-600 dark:text-secondary-300">
                    {stat.label}
                  </span>
                </motion.div>
              </GlassCard>
            ))}
          </motion.div>

          {/* 🎯 Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-secondary-500 dark:text-secondary-400"
          >
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-success-500" />
              <span>{t('hero.trust.certified', '정부 인증')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-success-500" />
              <span>{t('hero.trust.insurance', '보험 가입')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-success-500" />
              <span>{t('hero.trust.privacy', '개인정보 보호')}</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* 🌊 Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-secondary-900 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;