import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Button from "../common/Button";

const Hero: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-secondary-900 dark:to-secondary-800 overflow-hidden">
      {/* 배경 그라데이션 효과 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/50 dark:via-secondary-900/30 dark:to-secondary-900/50" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary-200 dark:bg-primary-900 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-secondary-200 dark:bg-secondary-900 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          {/* 로고/아이콘 */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-600 shadow-glow mb-8"
          >
            <span className="text-5xl">💚</span>
          </motion.div>

          {/* 메인 헤딩 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <p className="text-lg sm:text-xl text-secondary-600 dark:text-secondary-400 mb-4 font-medium">
              {t('hero.subtitle')}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-secondary-900 dark:text-white mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">
                {t('hero.title')}
              </span>
            </h1>
          </motion.div>

          {/* 서브 헤딩 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10 max-w-3xl"
          >
            <p className="text-xl sm:text-2xl text-primary-600 dark:text-primary-400 font-semibold mb-4">
              {t('hero.support')}
            </p>
            <p className="text-base sm:text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
              {t('hero.description')}
            </p>
          </motion.div>

          {/* CTA 버튼들 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Button
              variant="primary"
              size="lg"
              className="text-lg px-10 py-4 shadow-large hover:shadow-glow transition-all duration-300"
            >
              {t('hero.cta')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-4"
            >
              {t('hero.watchDemo')}
            </Button>
          </motion.div>

          {/* 신뢰 지표 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl"
          >
            {[
              { value: "1,000+", label: t('hero.stats.customers', '만족한 고객') },
              { value: "24/7", label: t('hero.stats.support', '응급 대응') },
              { value: "5년+", label: t('hero.stats.experience', '운영 경험') }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-4 rounded-2xl bg-white/50 dark:bg-secondary-800/50 backdrop-blur-sm"
              >
                <span className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.value}
                </span>
                <span className="text-sm text-secondary-600 dark:text-secondary-400">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;