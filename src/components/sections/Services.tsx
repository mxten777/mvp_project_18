import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/**
 * Services 섹션 컴포넌트
 * @description 방문요양/간호/목욕 서비스 상세 정보 표시
 */
const Services: React.FC = React.memo(() => {
  const { t } = useTranslation();

  const services = useMemo(() => [
    {
      icon: "🏥",
      title: t('services.homecare.title'),
      description: t('services.homecare.description'),
      features: [
        t('services.homecare.feature1'),
        t('services.homecare.feature2'), 
        t('services.homecare.feature3'),
        t('services.homecare.feature4')
      ],
      price: t('services.homecare.price'),
      gradient: "from-primary-500 to-primary-600"
    },
    {
      icon: "💊",
      title: t('services.nursing.title'),
      description: t('services.nursing.description'),
      features: [
        t('services.nursing.feature1'),
        t('services.nursing.feature2'),
        t('services.nursing.feature3'),
        t('services.nursing.feature4')
      ],
      price: t('services.nursing.price'),
      gradient: "from-accent-500 to-accent-600"
    },
    {
      icon: "🛁",
      title: t('services.bathing.title'),
      description: t('services.bathing.description'),
      features: [
        t('services.bathing.feature1'),
        t('services.bathing.feature2'),
        t('services.bathing.feature3'),
        t('services.bathing.feature4')
      ],
      price: t('services.bathing.price'),
      gradient: "from-warm-500 to-warm-600"
    }
  ], [t]);

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-white via-secondary-50/50 to-white dark:from-secondary-900 dark:to-secondary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-secondary-900 dark:text-white mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
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
                className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-glow mb-6`}
              >
                <span className="text-4xl">{service.icon}</span>
              </motion.div>
              
              <h3 className="text-2xl font-bold font-heading text-secondary-900 dark:text-white mb-4">
                {service.title}
              </h3>
              
              <p className="text-secondary-600 dark:text-secondary-300 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start text-secondary-700 dark:text-secondary-300"
                  >
                    <span className="text-primary-500 mr-3 mt-1 flex-shrink-0">✓</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-secondary-700 dark:to-secondary-800 rounded-2xl p-4 text-center border border-primary-100 dark:border-secondary-600"
              >
                <div className="text-sm text-secondary-600 dark:text-secondary-400 mb-1">
                  국가 지원금 적용
                </div>
                <div className="font-bold text-primary-600 dark:text-primary-400 text-lg">
                  {service.price}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;