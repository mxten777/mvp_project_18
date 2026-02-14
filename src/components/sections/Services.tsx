import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../premium';
import {
  HomeIcon,
  HeartIcon,
  SparklesIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

/**
 * Premium Services Section
 * @description 글로벌 표준 탑클래스 서비스 섹션 - Glassmorphism + 마이크로 인터랙션
 */
const Services: React.FC = React.memo(() => {
  const { t } = useTranslation();

  const services = useMemo(() => [
    {
      icon: HomeIcon,
      title: t('services.homecare.title'),
      description: t('services.homecare.description'),
      features: [
        t('services.homecare.feature1'),
        t('services.homecare.feature2'),
        t('services.homecare.feature3'),
        t('services.homecare.feature4'),
      ],
      price: t('services.homecare.price'),
      gradient: 'from-primary-500 via-primary-400 to-emerald-500',
      bgGlow: 'bg-primary-500/20',
      badge: '인기',
      badgeColor: 'bg-primary-500',
    },
    {
      icon: HeartIcon,
      title: t('services.nursing.title'),
      description: t('services.nursing.description'),
      features: [
        t('services.nursing.feature1'),
        t('services.nursing.feature2'),
        t('services.nursing.feature3'),
        t('services.nursing.feature4'),
      ],
      price: t('services.nursing.price'),
      gradient: 'from-accent-500 via-rose-400 to-pink-500',
      bgGlow: 'bg-accent-500/20',
      badge: '전문',
      badgeColor: 'bg-accent-500',
    },
    {
      icon: SparklesIcon,
      title: t('services.bathing.title'),
      description: t('services.bathing.description'),
      features: [
        t('services.bathing.feature1'),
        t('services.bathing.feature2'),
        t('services.bathing.feature3'),
        t('services.bathing.feature4'),
      ],
      price: t('services.bathing.price'),
      gradient: 'from-warm-500 via-amber-400 to-orange-500',
      bgGlow: 'bg-warm-500/20',
      badge: '추천',
      badgeColor: 'bg-warm-500',
    },
  ], [t]);

  return (
    <section id="services" className="relative py-28 overflow-hidden">
      {/* 🎨 Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-50 via-white to-primary-50/30 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950" />
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary-200/40 to-transparent dark:from-primary-800/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-warm-200/40 to-transparent dark:from-warm-800/20 rounded-full blur-3xl"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* 📢 Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/80 dark:bg-primary-900/30 backdrop-blur-sm border border-primary-200/50 dark:border-primary-700/50 mb-6"
          >
            <StarIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
              전문 돌봄 서비스
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-secondary-900 dark:text-white mb-6 tracking-tight">
            {t('services.title')}
          </h2>
          <p className="text-xl sm:text-2xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* 🃏 Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true, margin: '-50px' }}
                className="group relative"
              >
                {/* Hover glow */}
                <div className={`absolute -inset-2 ${service.bgGlow} rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <GlassCard
                  variant="default"
                  size="lg"
                  hover="lift"
                  className="relative h-full !p-0 overflow-hidden"
                >
                  {/* Top gradient bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${service.gradient}`} />

                  <div className="p-8 lg:p-10">
                    {/* Icon + Badge */}
                    <div className="flex justify-between items-start mb-8">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                        className="relative"
                      >
                        <div className={`absolute inset-0 ${service.bgGlow} rounded-2xl blur-xl`} />
                        <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg flex items-center justify-center`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                      </motion.div>

                      <span className={`${service.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
                        {service.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl lg:text-3xl font-bold font-display text-secondary-900 dark:text-white mb-4 tracking-tight">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-secondary-600 dark:text-secondary-300 mb-8 leading-relaxed text-base lg:text-lg">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-3 group/item"
                        >
                          <div className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-sm`}>
                            <CheckCircleIcon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-secondary-700 dark:text-secondary-300 group-hover/item:text-secondary-900 dark:group-hover/item:text-white transition-colors font-medium">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Price Card */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative rounded-2xl overflow-hidden"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-10`} />
                      <div className="relative bg-white/50 dark:bg-secondary-800/50 backdrop-blur-sm rounded-2xl p-5 border border-secondary-200/50 dark:border-secondary-700/50">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-xs font-semibold text-secondary-500 dark:text-secondary-400 mb-1 uppercase tracking-wider">
                              국가 지원금 적용
                            </div>
                            <div className={`text-xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                              {service.price}
                            </div>
                          </div>
                          <motion.div
                            whileHover={{ x: 5 }}
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-md cursor-pointer`}
                          >
                            <ArrowRightIcon className="w-5 h-5 text-white" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* 🎯 Bottom Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <GlassCard variant="glass" size="md" hover="none" className="!rounded-2xl">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              {[
                { icon: '🏆', label: '정부 인증 우수 기관' },
                { icon: '👨‍⚕️', label: '전문 자격 보유 인력' },
                { icon: '📋', label: '체계적 관리 시스템' },
                { icon: '💯', label: '고객 만족도 98%' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;