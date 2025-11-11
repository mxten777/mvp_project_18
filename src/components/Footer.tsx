import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="w-full bg-gradient-to-br from-secondary-50 via-white to-primary-50 dark:from-secondary-900 dark:via-secondary-950 dark:to-secondary-800 border-t border-secondary-200 dark:border-secondary-700 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* 로고 및 소개 */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-600 rounded-2xl flex items-center justify-center shadow-glow">
                <span className="text-2xl">💚</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-heading text-secondary-900 dark:text-white">
                  {t('footer.brandName')}
                </span>
                <span className="text-sm text-secondary-500 dark:text-secondary-400">
                  {t('footer.brandSubtitle')}
                </span>
              </div>
            </motion.div>
            <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed max-w-md whitespace-pre-line">
              {t('footer.description')}
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="font-bold font-heading text-secondary-900 dark:text-white mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {[
                { label: t('navigation.features'), hash: '#features' },
                { label: t('navigation.services'), hash: '#services' },
                { label: t('navigation.faq'), hash: '#faq' },
                { label: t('navigation.contact'), hash: '#contact' }
              ].map((item) => (
                <li key={item.hash}>
                  <motion.a
                    whileHover={{ x: 4 }}
                    href={item.hash}
                    className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="font-bold font-heading text-secondary-900 dark:text-white mb-4">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3 text-secondary-600 dark:text-secondary-400">
              <li className="flex items-start gap-2">
                <span className="text-primary-500">📞</span>
                <a href={`tel:${t('footer.phone')}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {t('footer.phone')}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500">📍</span>
                <span className="text-sm">
                  {t('footer.address')}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 text-xl">🕒</span>
                <div>
                  <span className="text-base font-semibold block mb-1">
                    {t('footer.hours')}
                  </span>
                  <span className="text-xs text-secondary-500 dark:text-secondary-500">
                    {t('footer.hoursNote')}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="pt-8 border-t border-secondary-200 dark:border-secondary-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-secondary-600 dark:text-secondary-400">
              <span>{t('footer.businessNumber')}</span>
              <span className="mx-2">|</span>
              <span>{t('footer.ceo')}</span>
            </div>
            <div className="text-sm text-secondary-500 dark:text-secondary-500">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
