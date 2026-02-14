import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PremiumButton } from '../premium';
import LanguageSelector from "../ui/LanguageSelector";
import DarkModeToggle from "../ui/DarkModeToggle";
import {
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

/**
 * Premium Header
 * @description 글로벌 표준 탑클래스 네비게이션 헤더
 */
const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleNavClick = (hash: string, path: string) => {
    if (hash === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (location.pathname === '/' && hash && hash !== '#') {
      const element = document.querySelector(hash);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    } else {
      handleNavigate(path);
    }
    setMenuOpen(false);
  };

  const navItems = [
    { label: t('navigation.home'), path: '/', hash: '#' },
    { label: t('navigation.features'), path: '/', hash: '#features' },
    { label: t('navigation.services'), path: '/services', hash: '#services' },
    { label: t('navigation.faq'), path: '/faq', hash: '#faq' },
    { label: t('navigation.contact'), path: '/contact', hash: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 dark:bg-secondary-900/80 backdrop-blur-xl shadow-glass border-b border-secondary-200/50 dark:border-secondary-700/50' 
          : 'bg-white/60 dark:bg-secondary-900/60 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 lg:py-4">
        
        {/* 🏠 Logo */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleNavClick('#', '/')}
        >
          <motion.div
            animate={{
              rotate: [0, 3, -3, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-600 rounded-2xl flex items-center justify-center shadow-glow"
          >
            <div className="absolute inset-0 rounded-2xl bg-glass-gradient" />
            <span className="relative text-xl">💚</span>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-lg font-bold font-display text-secondary-900 dark:text-white tracking-tight leading-none">
              {t('navigation.brandName')}
            </span>
            <span className="text-[10px] text-secondary-500 dark:text-secondary-400 font-medium tracking-wider uppercase">
              {t('navigation.brandSubtitle')}
            </span>
          </div>
        </motion.div>

        {/* 🧭 Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => handleNavClick(item.hash, item.path)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative px-4 py-2 text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors rounded-xl hover:bg-primary-50/80 dark:hover:bg-primary-900/20 group"
            >
              {item.label}
              <motion.span
                className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 rounded-full group-hover:w-3/4 transition-all duration-300"
              />
            </motion.button>
          ))}
        </div>

        {/* 🎛️ Right Controls */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <DarkModeToggle />
            <LanguageSelector />
          </div>
          
          <PremiumButton
            variant="gradient"
            size="sm"
            leftIcon={<SparklesIcon className="w-4 h-4" />}
            className="hidden sm:inline-flex !px-5 !py-2 shadow-glow text-sm"
          >
            {t('navigation.apply')}
          </PremiumButton>
          
          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden p-2 rounded-xl bg-secondary-100/80 dark:bg-secondary-800/80 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors backdrop-blur-sm"
            aria-label="메뉴"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className="w-6 h-6 text-secondary-700 dark:text-secondary-300" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bars3Icon className="w-6 h-6 text-secondary-700 dark:text-secondary-300" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* 📱 Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white/95 dark:bg-secondary-900/95 backdrop-blur-xl border-t border-secondary-200/50 dark:border-secondary-700/50 shadow-glass overflow-hidden"
          >
            <div className="px-4 py-5 space-y-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavClick(item.hash, item.path)}
                  className="block w-full text-left py-3.5 px-5 rounded-2xl text-secondary-700 dark:text-secondary-300 hover:bg-primary-50/80 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-all"
                >
                  {item.label}
                </motion.button>
              ))}
              
              <div className="flex items-center gap-3 pt-4 px-2 border-t border-secondary-200/50 dark:border-secondary-700/50">
                <DarkModeToggle />
                <LanguageSelector />
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="pt-3"
              >
                <PremiumButton
                  variant="gradient"
                  size="md"
                  fullWidth
                  leftIcon={<SparklesIcon className="w-4 h-4" />}
                  className="shadow-glow"
                >
                  {t('navigation.apply')}
                </PremiumButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
