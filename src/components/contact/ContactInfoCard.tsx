import React from 'react';
import { motion } from 'framer-motion';

export interface ContactInfoItem {
  icon: string;
  title: string;
  main: string;
  sub: string;
  bgColor: string;
  link?: string;
}

export interface ContactInfoCardProps {
  item: ContactInfoItem;
  index?: number;
}

/**
 * 연락처 정보 카드 컴포넌트
 * @description 개별 연락처 정보를 표시하는 카드
 */
const ContactInfoCard: React.FC<ContactInfoCardProps> = React.memo(({ item, index = 0 }) => {
  const content = (
    <>
      <div className="text-5xl mr-5 flex-shrink-0">{item.icon}</div>
      <div className="flex-1">
        <h4 className="font-bold text-lg text-secondary-900 dark:text-white mb-2">
          {item.title}
        </h4>
        <p className={`text-xl font-bold mb-1 ${
          index === 0 ? 'text-primary-600 dark:text-primary-400' : 
          index === 1 ? 'text-warm-600 dark:text-warm-400' : 
          index === 2 ? 'text-accent-600 dark:text-accent-400' : 
          'text-secondary-800 dark:text-secondary-200'
        }`}>
          {item.main}
        </p>
        <p className="text-sm text-secondary-600 dark:text-secondary-400 font-medium">
          {item.sub}
        </p>
      </div>
    </>
  );

  const baseClasses = `flex items-center p-6 ${item.bgColor} dark:bg-secondary-800 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-secondary-100 dark:border-secondary-700`;

  if (item.link) {
    return (
      <motion.a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02, x: 8 }}
        whileTap={{ scale: 0.98 }}
        className={baseClasses}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, x: 8 }}
      className={baseClasses}
    >
      {content}
    </motion.div>
  );
});

ContactInfoCard.displayName = 'ContactInfoCard';

export default ContactInfoCard;
