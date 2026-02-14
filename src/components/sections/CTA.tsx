import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GlassCard, PremiumButton } from '../premium';
import {
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  StarIcon,
  ShieldCheckIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

/**
 * Premium CTA Section
 * @description 글로벌 표준 탑클래스 CTA 섹션 - 몰입형 Glassmorphism
 */
const CTA: React.FC = React.memo(() => {
  const benefits = useMemo(() => [
    { 
      icon: PhoneIcon, 
      title: "무료 전화 상담", 
      desc: "24시간 언제든지",
      gradient: "from-primary-400 to-emerald-400",
    },
    { 
      icon: SparklesIcon, 
      title: "맞춤형 서비스", 
      desc: "개인별 필요에 맞춤",
      gradient: "from-blue-400 to-cyan-400",
    },
    { 
      icon: StarIcon, 
      title: "국가 지원금", 
      desc: "최대 85% 지원",
      gradient: "from-warm-400 to-amber-400",
    },
  ], []);

  const handlePhoneClick = useCallback(() => {
    window.location.href = 'tel:1588-0000';
  }, []);

  const handleKakaoClick = useCallback(() => {
    window.open('https://pf.kakao.com/_돌봄서비스', '_blank');
  }, []);

  return (
    <section className="relative py-28 overflow-hidden">
      {/* 🎨 Premium immersive background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 dark:from-primary-900 dark:via-primary-800 dark:to-secondary-900" />
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
            x: [0, 80, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-white/20 to-primary-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.25, 0.1],
            x: [0, -60, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-warm-400/20 to-primary-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-conic from-white/10 via-transparent to-white/10 rounded-full blur-2xl"
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <ShieldCheckIcon className="w-4 h-4 text-primary-200" />
            <span className="text-sm font-semibold text-primary-100">
              정부 인증 전문 기관
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display text-white mb-8 tracking-tight leading-tight">
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="inline-block bg-gradient-to-r from-white via-primary-100 to-white bg-clip-text text-transparent bg-size-200"
            >
              지금 바로
            </motion.span>
            <br />
            <span className="text-white">상담받으세요</span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-primary-100 mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
            전화 한 통으로 전문 상담사가 맞춤형 돌봄 서비스를 안내해드립니다
          </p>
        </motion.div>

        {/* Benefits Cards */}
        <motion.div 
          className="grid sm:grid-cols-3 gap-6 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.12 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group"
              >
                <GlassCard variant="glass" size="md" hover="none" className="!bg-white/10 border-white/20 h-full">
                  <div className="flex flex-col items-center">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg mb-4`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-primary-200 text-sm font-medium">{item.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <PremiumButton
            variant="secondary"
            size="xl"
            onClick={handlePhoneClick}
            leftIcon={<PhoneIcon className="w-6 h-6" />}
            className="!bg-white !text-primary-600 hover:!bg-primary-50 shadow-2xl text-xl px-10"
          >
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              1588-0000
            </motion.span>
          </PremiumButton>
          
          <PremiumButton
            variant="glass"
            size="xl"
            onClick={handleKakaoClick}
            leftIcon={<ChatBubbleLeftRightIcon className="w-6 h-6" />}
            className="!border-2 !border-white/30 !text-white hover:!bg-white/20 text-xl px-10"
          >
            카카오톡 상담
          </PremiumButton>
        </motion.div>

        {/* Operating Hours */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
        >
          <GlassCard variant="glass" size="sm" hover="none" className="inline-flex !bg-white/5 !border-white/15 !rounded-2xl">
            <div className="flex items-center gap-3 text-primary-100">
              <ClockIcon className="w-5 h-5 text-primary-200 flex-shrink-0" />
              <span className="text-sm font-semibold">
                평일 09:00-18:00 / 주말·공휴일 응급상담 가능
              </span>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
});

CTA.displayName = 'CTA';

export default CTA;