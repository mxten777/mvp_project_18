import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { GlassCard } from "../premium";
import { 
  CurrencyDollarIcon,
  PhoneIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  SparklesIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

/**
 * Premium Features Section
 * @description 글로벌 표준 프리미엄 기능 소개 섹션
 */
const Features: React.FC = React.memo(() => {
  const { t } = useTranslation();

  const features = useMemo(() => [
    {
      icon: CurrencyDollarIcon,
      emoji: "💸",
      title: t('features.funding.title', '국가 지원금 85%'),
      description: t('features.funding.description', '노인장기요양보험으로 부담을 최소화합니다'),
      gradient: "from-primary-500 to-primary-600",
      color: "primary",
      badge: t('features.funding.badge', '최대 할인')
    },
    {
      icon: PhoneIcon,
      emoji: "📞",
      title: t('features.integrated.title', '통합 서비스'),
      description: t('features.integrated.description', '방문요양, 간호, 목욕을 한 번에 제공합니다'),
      gradient: "from-info-500 to-info-600",
      color: "info",
      badge: t('features.integrated.badge', '원스톱')
    },
    {
      icon: UserGroupIcon,
      emoji: "👩‍⚕️",
      title: t('features.professional.title', '전문 의료진'),
      description: t('features.professional.description', '경력 10년+ 전문 요양보호사가 돌봐드립니다'),
      gradient: "from-warm-500 to-warm-600",
      color: "warning",
      badge: t('features.professional.badge', '검증된 전문가')
    }
  ], [t]);

  return (
    <section 
      id="features" 
      className="relative py-24 bg-gradient-to-br from-white via-primary-50/30 to-white dark:from-secondary-950 dark:via-secondary-900/50 dark:to-secondary-950 overflow-hidden"
    >
      {/* 🎨 Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-warm-200/30 dark:bg-warm-900/20 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* 📢 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-6"
          >
            <SparklesIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
              {t('features.badge', '프리미엄 돌봄 서비스')}
            </span>
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-secondary-900 dark:text-white mb-6">
            <span className="inline-block bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent">
              {t('features.sectionTitle', '특별한 혜택')}
            </span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-base md:text-lg lg:text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto leading-relaxed">
            {t('features.sectionSubtitle', '차별화된 서비스로 최상의 돌봄을 제공합니다')}
          </p>
        </motion.div>

        {/* 🎯 기능 카드들 */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.21, 0.45, 0.27, 0.90]
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <GlassCard
                  variant="gradient"
                  size="lg"
                  hover="lift"
                  className="group h-full relative overflow-hidden"
                >
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <motion.div
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                      className="absolute inset-0 w-1/2 bg-gradient-shimmer"
                    />
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/50 dark:bg-black/30 backdrop-blur-sm">
                      <CheckBadgeIcon className={`w-4 h-4 text-${feature.color}-600`} />
                      <span className={`text-xs font-semibold text-${feature.color}-700 dark:text-${feature.color}-300`}>
                        {feature.badge}
                      </span>
                    </div>
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: [0, -5, 5, -5, 0],
                    }}
                    transition={{ duration: 0.5 }}
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-glow-sm mb-6 relative`}
                  >
                    {/* Glassmorphism overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-glass-gradient backdrop-blur-sm" />
                    
                    {/* Icon */}
                    <IconComponent className="relative w-10 h-10 text-white" />
                    
                    {/* Pulse effect */}
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient}`}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-4">
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold font-heading text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm md:text-base text-secondary-600 dark:text-secondary-300 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Learn more link */}
                    <motion.div
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="pt-4"
                    >
                      <div className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold group-hover:gap-3 transition-all duration-300">
                        <span>{t('features.learnMore', '자세히 보기')}</span>
                        <motion.svg
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </motion.svg>
                      </div>
                    </motion.div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* 🎯 Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <GlassCard
            variant="glass"
            size="md"
            hover="none"
            className="inline-flex items-center gap-8 flex-wrap justify-center"
          >
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-6 h-6 text-success-500" />
              <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                {t('features.trust.certified', '정부 인증 기관')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckBadgeIcon className="w-6 h-6 text-primary-500" />
              <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                {t('features.trust.insurance', '보험 가입 완료')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-6 h-6 text-warning-500" />
              <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                {t('features.trust.quality', '최고 품질 보장')}
              </span>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );});

Features.displayName = 'Features';

export default Features;