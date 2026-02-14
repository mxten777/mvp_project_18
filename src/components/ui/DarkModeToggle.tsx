import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * 다크모드 토글 버튼 컴포넌트
 * @description 라이트/다크 모드를 전환하는 버튼
 */
const DarkModeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 초기 다크모드 상태 확인
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    const newIsDark = !isDark;
    
    if (newIsDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    setIsDark(newIsDark);
  };

  return (
    <motion.button
      onClick={toggleDarkMode}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-14 h-8 bg-secondary-200 dark:bg-secondary-700 rounded-full p-1 transition-colors duration-300 flex items-center"
      aria-label="다크모드 토글"
    >
      <motion.div
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="w-6 h-6 bg-white dark:bg-secondary-900 rounded-full shadow-md flex items-center justify-center"
      >
        {isDark ? (
          <span className="text-sm">🌙</span>
        ) : (
          <span className="text-sm">☀️</span>
        )}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;
