import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Button from './common/Button';
import LanguageSelector from "./LanguageSelector";
import DarkModeToggle from "./DarkModeToggle";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 네비게이션 핸들러
  const handleNavigate = (path: string) => {
    setMenuOpen(false);
    
    if (path.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.querySelector(path)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.querySelector(path)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-secondary-900/95 backdrop-blur-md shadow-large border-b border-secondary-200 dark:border-secondary-700' 
          : 'bg-white dark:bg-secondary-900 shadow-soft border-b border-secondary-100 dark:border-secondary-800'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        
        {/* 로고 영역 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleNavigate('/')}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-600 rounded-2xl flex items-center justify-center shadow-glow">
            <span className="text-2xl">💚</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-heading text-secondary-900 dark:text-white">
              {t('navigation.brandName')}
            </span>
            <span className="text-xs text-secondary-500 dark:text-secondary-400">
              {t('navigation.brandSubtitle')}
            </span>
          </div>
        </motion.div>

        {/* 데스크톱 네비게이션 */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: t('navigation.home'), path: '/', hash: '#' },
            { label: t('navigation.features'), path: '/', hash: '#features' },
            { label: t('navigation.services'), path: '/services', hash: '#services' },
            { label: t('navigation.faq'), path: '/faq', hash: '#faq' },
            { label: t('navigation.contact'), path: '/contact', hash: '#contact' }
          ].map((item) => (
            <motion.button
              key={item.path}
              onClick={() => {
                if (item.hash === '#') {
                  // 홈 버튼 클릭 시 맨 위로 스크롤
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (location.pathname === '/' && item.hash && item.hash !== '#') {
                  // 홈페이지에서 섹션 메뉴 클릭 시 헤더 높이를 고려해서 스크롤
                  const element = document.querySelector(item.hash);
                  if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                } else {
                  // 다른 페이지로 이동
                  handleNavigate(item.path);
                }
                setMenuOpen(false);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all group-hover:w-full" />
            </motion.button>
          ))}
        </div>

        {/* CTA 버튼 및 언어 선택 */}
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <LanguageSelector />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:block"
          >
            <Button variant="primary" size="sm">
              {t('navigation.apply')}
            </Button>
          </motion.div>
          
          {/* 모바일 햄버거 메뉴 */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
            aria-label="메뉴"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block h-0.5 bg-secondary-700 dark:bg-secondary-300"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 bg-secondary-700 dark:bg-secondary-300"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block h-0.5 bg-secondary-700 dark:bg-secondary-300"
              />
            </div>
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-700 shadow-large overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {[
                { label: t('navigation.home'), path: '/', hash: '#' },
                { label: t('navigation.features'), path: '/', hash: '#features' },
                { label: t('navigation.services'), path: '/services', hash: '#services' },
                { label: t('navigation.faq'), path: '/faq', hash: '#faq' },
                { label: t('navigation.contact'), path: '/contact', hash: '#contact' }
              ].map((item, index) => (
                <motion.button
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    if (item.hash === '#') {
                      // 홈 버튼 클릭 시 맨 위로 스크롤
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else if (location.pathname === '/' && item.hash && item.hash !== '#') {
                      // 홈페이지에서 섹션 메뉴 클릭 시 헤더 높이를 고려해서 스크롤
                      const element = document.querySelector(item.hash);
                      if (element) {
                        const headerOffset = 80;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                      }
                    } else {
                      // 다른 페이지로 이동
                      handleNavigate(item.path);
                    }
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 px-4 rounded-xl text-secondary-700 dark:text-secondary-300 hover:bg-primary-50 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-all"
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="pt-4 border-t border-secondary-200 dark:border-secondary-700"
              >
                <Button variant="primary" size="sm" className="w-full">
                  {t('navigation.apply')}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
