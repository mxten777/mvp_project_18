import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/ui/SEOHead';

/**
 * 404 Not Found 페이지
 */
const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-secondary-900 dark:via-secondary-950 dark:to-secondary-800">
      <SEOHead title="페이지를 찾을 수 없습니다 - 돌봄서비스" />
      <div className="max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-9xl mb-8">🔍</div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold font-heading text-secondary-900 dark:text-white mb-4"
          >
            404
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-semibold text-secondary-700 dark:text-secondary-300 mb-6"
          >
            페이지를 찾을 수 없습니다
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-secondary-600 dark:text-secondary-400 mb-12 leading-relaxed"
          >
            요청하신 페이지가 존재하지 않거나 이동되었습니다.<br />
            홈으로 돌아가서 다시 시작해보세요.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-2xl hover:shadow-large transition-all font-semibold text-lg"
            >
              🏠 홈으로 돌아가기
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 px-8 py-4 rounded-2xl hover:shadow-medium transition-all font-semibold text-lg border border-secondary-200 dark:border-secondary-700"
            >
              ← 이전 페이지
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
