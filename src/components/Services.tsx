import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Services: React.FC = () => {
  const { t } = useTranslation();

  const getServices = () => [
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
      price: t('services.homecare.price')
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
      price: t('services.nursing.price')
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
      price: t('services.bathing.price')
    }
  ];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('services.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {getServices().map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-6xl mb-6 text-center"
              >
                {service.icon}
              </motion.div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 text-center leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="flex items-center text-gray-700"
                  >
                    <span className="text-blue-500 mr-3">✓</span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-blue-50 rounded-xl p-4 text-center"
              >
                <div className="text-sm text-gray-600 mb-1">국가 지원금 적용</div>
                <div className="font-bold text-blue-600">{service.price}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;