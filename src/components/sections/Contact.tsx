import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../premium';
import ContactInfo from '../ui/ContactInfo';
import ContactForm from '../ui/ContactForm';
import {
  ChatBubbleBottomCenterTextIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

/**
 * Premium Contact Section
 * @description 글로벌 표준 탑클래스 연락처 섹션
 */
const Contact: React.FC = React.memo(() => {
  const { t } = useTranslation();
  
  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/60 via-white to-secondary-50/60 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950" />
        
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary-200/30 to-transparent dark:from-primary-800/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-warm-200/30 to-transparent dark:from-warm-800/15 rounded-full blur-3xl"
        />
        
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]" />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-100/80 dark:bg-warm-900/30 backdrop-blur-sm border border-warm-200/50 dark:border-warm-700/50 mb-6"
          >
            <ChatBubbleBottomCenterTextIcon className="w-4 h-4 text-warm-600 dark:text-warm-400" />
            <span className="text-sm font-semibold text-warm-700 dark:text-warm-300">
              상담 문의
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-secondary-900 dark:text-white mb-6 tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="text-xl sm:text-2xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <ContactInfo />
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* Bottom Assurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <GlassCard variant="glass" size="sm" hover="none" className="!rounded-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-sm text-secondary-600 dark:text-secondary-400">
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-primary-500" />
                <span className="font-medium">무료 상담</span>
              </div>
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-primary-500" />
                <span className="font-medium">24시간 이내 회신</span>
              </div>
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-primary-500" />
                <span className="font-medium">개인정보 철저 보호</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;

