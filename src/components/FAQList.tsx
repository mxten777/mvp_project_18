import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

/**
 * FAQ 목록 컴포넌트
 * @description 자주 묻는 질문 목록 표시
 */
const FAQList: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = useMemo(() => t('faq.questions', { returnObjects: true }) as Array<{ q: string; a: string }>, [t]);

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-white via-secondary-50/50 to-white dark:from-secondary-900 dark:to-secondary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-secondary-900 dark:text-white mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-400">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-secondary-800 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-secondary-100 dark:border-secondary-700 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-6 flex items-start gap-4 hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors"
              >
                <motion.span
                  animate={{ rotate: openIndex === i ? 90 : 0 }}
                  className="flex-shrink-0 text-primary-500 dark:text-primary-400 text-2xl mt-1"
                >
                  ❓
                </motion.span>
                <div className="flex-1">
                  <h3 className="font-semibold font-heading text-lg text-secondary-900 dark:text-white">
                    {faq.q}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  className="flex-shrink-0 text-secondary-400"
                >
                  ▼
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pl-16">
                      <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

FAQList.displayName = 'FAQList';

export default FAQList;
