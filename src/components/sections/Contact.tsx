import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ContactInfoList from '../contact/ContactInfoList';
import ContactForm from '../contact/ContactForm';

/**
 * Contact 섹션 컴포넌트
 * @description 연락처 정보 및 상담 신청 폼
 */
const Contact: React.FC = React.memo(() => {
  const { t } = useTranslation();
  
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-secondary-900 dark:to-secondary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-secondary-900 dark:text-white mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <ContactInfoList />
          <ContactForm />
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;

