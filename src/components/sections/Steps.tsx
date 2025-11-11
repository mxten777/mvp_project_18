import React, { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Steps 섹션 컴포넌트
 * @description 서비스 이용 절차 4단계를 시각적으로 표시
 */
const Steps: React.FC = React.memo(() => {
  const steps = useMemo(() => [
    { num: 1, label: '상담 신청', icon: '📞' },
    { num: 2, label: '방문 상담', icon: '🏠' },
    { num: 3, label: '서비스 신청', icon: '📝' },
    { num: 4, label: '맞춤 케어 시작', icon: '💚' },
  ], []);

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-primary-100/50 dark:from-secondary-900 dark:to-secondary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-bold font-heading text-secondary-900 dark:text-white mb-4">
            서비스 이용 절차
          </h3>
          <p className="text-xl text-secondary-600 dark:text-secondary-400">
            간편한 4단계로 시작하세요
          </p>
        </motion.div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
          {/* 연결선 (데스크탑) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-primary-300 to-primary-200 dark:from-secondary-700 dark:via-secondary-600 dark:to-secondary-700 z-0 transform -translate-y-1/2" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="relative z-10 flex flex-col items-center md:w-1/4"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-24 h-24 flex items-center justify-center rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-600 shadow-glow mb-4"
              >
                <span className="text-5xl">{step.icon}</span>
              </motion.div>
              
              <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-secondary-800 border-4 border-primary-500 dark:border-primary-400 text-2xl font-bold text-primary-600 dark:text-primary-400 shadow-medium mb-4 -mt-8 z-20">
                {step.num}
              </div>
              
              <span className="font-semibold text-lg text-secondary-900 dark:text-white text-center">
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Steps.displayName = 'Steps';

export default Steps;
