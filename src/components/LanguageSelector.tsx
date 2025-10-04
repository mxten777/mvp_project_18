/**
 * 언어 선택기 컴포넌트
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const languages = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
    setIsOpen(false);
    
    // RTL 언어 지원
    const htmlElement = document.documentElement;
    if (languageCode === 'ar') {
      htmlElement.setAttribute('dir', 'rtl');
      htmlElement.setAttribute('lang', 'ar');
    } else {
      htmlElement.setAttribute('dir', 'ltr');
      htmlElement.setAttribute('lang', languageCode);
    }
    
    // 접근성을 위한 포커스 관리
    document.getElementById('language-button')?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent, languageCode?: string) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      document.getElementById('language-button')?.focus();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (languageCode) {
        handleLanguageChange(languageCode);
      } else {
        setIsOpen(!isOpen);
      }
    }
  };

  return (
    <div className="relative">
      <button
        id="language-button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => handleKeyDown(e)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="언어 선택"
        type="button"
      >
        <GlobeAltIcon className="w-4 h-4" />
        <span className="flex items-center gap-1">
          <span>{currentLanguage.flag}</span>
          <span className="hidden sm:inline">{currentLanguage.name}</span>
        </span>
        <ChevronDownIcon 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* 오버레이 */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* 드롭다운 메뉴 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.1 }}
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto"
              role="listbox"
              aria-label="언어 목록"
            >
              <div className="py-1">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    onKeyDown={(e) => handleKeyDown(e, language.code)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors
                      ${i18n.language === language.code
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }
                      focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700
                    `}
                    role="option"
                    aria-selected={i18n.language === language.code}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <span className="flex-1">{language.name}</span>
                    {i18n.language === language.code && (
                      <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}