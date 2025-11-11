import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

/**
 * Features 섹션 컴포넌트
 * @description 서비스 주요 특징을 보여주는 섹션 (국가지원금, 통합서비스, 전문의료진)
 */
const Features: React.FC = React.memo(() => {
  const { t } = useTranslation();

  const features = useMemo(() => [
    {
      icon: "💸",
      title: t('features.funding.title'),
      description: t('features.funding.description'),
      gradient: "from-primary-500 to-primary-600"
    },
    {
      icon: "📞",
      title: t('features.integrated.title'),
      description: t('features.integrated.description'),
      gradient: "from-accent-500 to-accent-600"
    },
    {
      icon: "👩‍⚕️",
      title: t('features.professional.title'),
      description: t('features.professional.description'),
      gradient: "from-warm-500 to-warm-600"
    }
  ], [t]);

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-primary-50/80 via-white to-secondary-50/80 dark:from-secondary-900 dark:via-secondary-950 dark:to-secondary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-secondary-900 dark:text-white mb-4">
            {t('features.sectionTitle')}
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto leading-relaxed">
            {t('features.sectionSubtitle')}
          </p>
        </motion.div>

        {/* 기능 카드들 */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white dark:bg-secondary-800 rounded-3xl p-8 shadow-soft hover:shadow-large transition-all duration-300 border border-secondary-100 dark:border-secondary-700"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} dark:opacity-90 shadow-glow mb-6`}
              >
                <span className="text-4xl">{feature.icon}</span>
              </motion.div>
              <h3 className="text-2xl font-bold font-heading mb-4 text-secondary-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Features.displayName = 'Features';

export default Features;
