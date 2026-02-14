import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../premium";
import {
  PhoneIcon,
  HomeModernIcon,
  DocumentTextIcon,
  HeartIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

/**
 * Premium Steps Section
 * @description 글로벌 표준 탑클래스 서비스 이용 절차 - Glassmorphism Timeline
 */
const Steps: React.FC = React.memo(() => {
  const steps = useMemo(() => [
    { 
      num: 1, 
      label: '상담 신청',
      description: '전화 또는 온라인으로 간편하게 상담을 신청하세요',
      icon: PhoneIcon,
      gradient: 'from-primary-500 to-emerald-500',
      bgGlow: 'bg-primary-500/20',
    },
    { 
      num: 2, 
      label: '방문 상담',
      description: '전문 상담사가 직접 방문하여 맞춤 서비스를 설계합니다',
      icon: HomeModernIcon,
      gradient: 'from-blue-500 to-cyan-500',
      bgGlow: 'bg-blue-500/20',
    },
    { 
      num: 3, 
      label: '서비스 신청',
      description: '국가 지원금 신청부터 모든 절차를 도와드립니다',
      icon: DocumentTextIcon,
      gradient: 'from-violet-500 to-purple-500',
      bgGlow: 'bg-violet-500/20',
    },
    { 
      num: 4, 
      label: '맞춤 케어 시작',
      description: '전문 요양보호사의 따뜻한 돌봄이 시작됩니다',
      icon: HeartIcon,
      gradient: 'from-accent-500 to-rose-500',
      bgGlow: 'bg-accent-500/20',
    },
  ], []);

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white to-blue-50/50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950" />
        
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-200/30 to-transparent dark:from-primary-800/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.15, 0.35, 0.15], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-violet-200/30 to-transparent dark:from-violet-800/15 rounded-full blur-3xl"
        />
        
        {/* Dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#80808015_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 mb-6"
          >
            <CheckCircleIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              간편한 4단계
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-secondary-900 dark:text-white mb-6 tracking-tight">
            서비스 이용 절차
          </h2>
          <p className="text-xl sm:text-2xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto leading-relaxed">
            간편한 4단계로 전문 돌봄 서비스를 시작하세요
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 -translate-y-1/2 z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-full bg-gradient-to-r from-primary-300 via-blue-300 via-violet-300 to-accent-300 dark:from-primary-700 dark:via-blue-700 dark:via-violet-700 dark:to-accent-700 origin-left rounded-full"
            />
          </div>

          {/* Connection Line - Mobile */}
          <div className="lg:hidden absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 z-0">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-full bg-gradient-to-b from-primary-300 via-blue-300 via-violet-300 to-accent-300 dark:from-primary-700 dark:via-blue-700 dark:via-violet-700 dark:to-accent-700 origin-top rounded-full"
            />
          </div>

          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative z-10"
                >
                  <div className="group flex flex-col items-center text-center">
                    {/* Step Number Badge */}
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="relative mb-6"
                    >
                      {/* Glow */}
                      <div className={`absolute inset-0 ${step.bgGlow} rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
                      
                      {/* Icon Container */}
                      <div className={`relative w-24 h-24 rounded-3xl bg-gradient-to-br ${step.gradient} shadow-xl flex items-center justify-center`}>
                        <Icon className="w-12 h-12 text-white" />
                        
                        {/* Number Badge */}
                        <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-xl bg-white dark:bg-secondary-800 border-2 border-secondary-200 dark:border-secondary-600 shadow-lg flex items-center justify-center">
                          <span className={`text-lg font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                            {step.num}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Content */}
                    <GlassCard 
                      variant="default" 
                      size="md" 
                      hover="lift"
                      className="w-full"
                    >
                      <h3 className="text-xl font-bold font-display text-secondary-900 dark:text-white mb-3 tracking-tight">
                        {step.label}
                      </h3>
                      <p className="text-secondary-600 dark:text-secondary-400 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </GlassCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

Steps.displayName = 'Steps';

export default Steps;
