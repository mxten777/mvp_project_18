import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  suffix?: string;
  isLoading?: boolean;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  suffix,
  isLoading = false,
  color = 'primary',
  size = 'md'
}) => {
  const colorClasses = {
    primary: {
      bg: 'bg-primary-50 dark:bg-primary-900/30',
      border: 'border-primary-200 dark:border-primary-700',
      icon: 'text-primary-600 dark:text-primary-400',
      value: 'text-primary-800 dark:text-primary-200',
      change: change && change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'
    },
    secondary: {
      bg: 'bg-secondary-50 dark:bg-secondary-900/30',
      border: 'border-secondary-200 dark:border-secondary-700',
      icon: 'text-secondary-600 dark:text-secondary-400',
      value: 'text-secondary-800 dark:text-secondary-200',
      change: change && change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'
    },
    accent: {
      bg: 'bg-accent-50 dark:bg-accent-900/30',
      border: 'border-accent-200 dark:border-accent-700',
      icon: 'text-accent-600 dark:text-accent-400',
      value: 'text-accent-800 dark:text-accent-200',
      change: change && change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/30',
      border: 'border-green-200 dark:border-green-700',
      icon: 'text-green-600 dark:text-green-400',
      value: 'text-green-800 dark:text-green-200',
      change: change && change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/30',
      border: 'border-yellow-200 dark:border-yellow-700',
      icon: 'text-yellow-600 dark:text-yellow-400',
      value: 'text-yellow-800 dark:text-yellow-200',
      change: change && change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'
    },
    danger: {
      bg: 'bg-red-50 dark:bg-red-900/30',
      border: 'border-red-200 dark:border-red-700',
      icon: 'text-red-600 dark:text-red-400',
      value: 'text-red-800 dark:text-red-200',
      change: change && change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'
    }
  };

  const sizeClasses = {
    sm: {
      container: 'p-4',
      icon: 'w-8 h-8',
      value: 'text-xl',
      title: 'text-sm'
    },
    md: {
      container: 'p-6',
      icon: 'w-10 h-10',
      value: 'text-3xl',
      title: 'text-base'
    },
    lg: {
      container: 'p-8',
      icon: 'w-12 h-12',
      value: 'text-4xl',
      title: 'text-lg'
    }
  };

  const colors = colorClasses[color];
  const sizes = sizeClasses[size];

  if (isLoading) {
    return (
      <div className={`${colors.bg} ${colors.border} border rounded-2xl ${sizes.container} animate-pulse`}>
        <div className="flex items-center justify-between mb-4">
          <div className={`${sizes.icon} bg-gray-200 dark:bg-gray-700 rounded-lg`}></div>
          <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <motion.div
      className={`${colors.bg} ${colors.border} border rounded-2xl ${sizes.container} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`${colors.icon} ${sizes.icon} flex items-center justify-center`}>
          {icon}
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 ${colors.change}`}>
            {change > 0 ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M18 15l-6-6-6 6"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            )}
            <span className="text-xs font-medium">
              {Math.abs(change)}%
            </span>
          </div>
        )}
      </div>

      <motion.div
        className={`${colors.value} ${sizes.value} font-bold mb-2`}
        key={value}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}
        {suffix && <span className="text-sm font-normal ml-1">{suffix}</span>}
      </motion.div>

      <div className={`text-secondary-600 dark:text-secondary-400 ${sizes.title} font-medium`}>
        {title}
      </div>

      {/* 실시간 업데이트 표시 */}
      <motion.div
        className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default StatCard;