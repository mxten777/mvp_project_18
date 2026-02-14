import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChevronRightIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

/**
 * Premium Footer
 * @description 글로벌 표준 탑클래스 푸터
 */
const Footer: React.FC = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { label: t('navigation.features'), hash: '#features' },
    { label: t('navigation.services'), hash: '#services' },
    { label: t('navigation.faq'), hash: '#faq' },
    { label: t('navigation.contact'), hash: '#contact' },
  ];

  const contactItems = [
    {
      icon: PhoneIcon,
      content: t('footer.phone'),
      href: `tel:${t('footer.phone')}`,
      gradient: 'from-primary-500 to-primary-600',
    },
    {
      icon: MapPinIcon,
      content: t('footer.address'),
      gradient: 'from-accent-500 to-accent-600',
    },
    {
      icon: ClockIcon,
      content: t('footer.hours'),
      sub: t('footer.hoursNote'),
      gradient: 'from-warm-500 to-warm-600',
    },
  ];

  return (
    <footer className="relative w-full overflow-hidden border-t border-secondary-200/50 dark:border-secondary-700/30">
      {/* 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-50 via-white to-primary-50/50 dark:from-secondary-950 dark:via-secondary-900 dark:to-primary-950/30" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary-200/20 dark:bg-primary-800/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent-200/20 dark:bg-accent-800/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">

          {/* 🏠 Brand Column */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="relative w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-600 rounded-2xl flex items-center justify-center shadow-glow">
                <div className="absolute inset-0 rounded-2xl bg-glass-gradient" />
                <span className="relative text-2xl">💚</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-display text-secondary-900 dark:text-white tracking-tight">
                  {t('footer.brandName')}
                </span>
                <span className="text-xs text-secondary-500 dark:text-secondary-400 tracking-wider uppercase">
                  {t('footer.brandSubtitle')}
                </span>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-secondary-600 dark:text-secondary-400 leading-relaxed max-w-md whitespace-pre-line text-sm"
            >
              {t('footer.description')}
            </motion.p>
          </div>

          {/* 🔗 Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-3"
          >
            <h3 className="font-bold font-display text-secondary-900 dark:text-white mb-5 text-sm uppercase tracking-wider">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.hash}>
                  <motion.a
                    whileHover={{ x: 4 }}
                    href={item.hash}
                    className="inline-flex items-center gap-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group text-sm"
                  >
                    <ChevronRightIcon className="w-3.5 h-3.5 text-secondary-400 dark:text-secondary-600 group-hover:text-primary-500 transition-colors" />
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 📞 Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4"
          >
            <h3 className="font-bold font-display text-secondary-900 dark:text-white mb-5 text-sm uppercase tracking-wider">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-4">
              {contactItems.map((item) => (
                <li key={item.content} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <span className="text-sm text-secondary-700 dark:text-secondary-300 font-medium">
                        {item.content}
                      </span>
                    )}
                    {item.sub && (
                      <span className="text-xs text-secondary-500 dark:text-secondary-500 mt-0.5">
                        {item.sub}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Bottom Bar  ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-secondary-200/50 dark:border-secondary-700/30"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-secondary-500 dark:text-secondary-500 flex flex-wrap items-center gap-x-3 gap-y-1 justify-center md:justify-start">
              <span>{t('footer.businessNumber')}</span>
              <span className="text-secondary-300 dark:text-secondary-700">|</span>
              <span>{t('footer.ceo')}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-secondary-400 dark:text-secondary-600">
              <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
              <span className="inline-flex items-center gap-0.5">
                — Made with <HeartIcon className="w-3 h-3 text-error-400" /> &amp; Care
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
