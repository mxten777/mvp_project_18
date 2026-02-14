import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    console.log('LanguageSelector 마운트됨');
    console.log('초기 언어:', i18n.language);
    console.log('사용 가능한 언어:', Object.keys(i18n.options.resources || {}));
    
    const handleLanguageChange = (lng: string) => {
      console.log('언어 변경 이벤트 감지:', lng);
      setCurrentLang(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  console.log('LanguageSelector 렌더링 - 현재 언어:', currentLang);

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];
  console.log('LanguageSelector - 선택된 언어:', currentLanguage);

  const handleLanguageChange = async (langCode: string) => {
    console.log('=== 언어 변경 시작 ===');
    console.log('변경 전 언어:', i18n.language);
    console.log('요청된 언어:', langCode);
    
    try {
      await i18n.changeLanguage(langCode);
      localStorage.setItem('selectedLanguage', langCode);
      setCurrentLang(langCode);
      
      console.log('변경 후 언어:', i18n.language);
      console.log('localStorage 저장:', localStorage.getItem('selectedLanguage'));
      console.log('=== 언어 변경 완료 ===');
    } catch (error) {
      console.error('언어 변경 실패:', error);
    }
    
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          console.log('버튼 클릭, 현재 isOpen:', isOpen);
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-900 bg-white border-2 border-gray-500 rounded-lg hover:bg-gray-50 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-md"
        aria-label="언어 선택"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="font-bold text-gray-900 whitespace-nowrap">{currentLanguage.name}</span>
        <svg 
          className={`w-4 h-4 ml-1 transform transition-transform text-gray-900 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* 배경 클릭으로 닫기 */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => {
              console.log('배경 클릭');
              setIsOpen(false);
            }}
          />
          
          {/* 드롭다운 메뉴 */}
          <div className="absolute right-0 mt-2 w-52 bg-white border-2 border-gray-500 rounded-xl shadow-2xl z-50 overflow-hidden">
            {languages.map((language, index) => (
              <button
                key={language.code}
                onClick={() => {
                  console.log('언어 선택:', language.code, language.name);
                  handleLanguageChange(language.code);
                }}
                className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-colors ${
                  index !== languages.length - 1 ? 'border-b border-gray-200' : ''
                } ${
                  currentLanguage.code === language.code 
                    ? 'bg-blue-500 text-white font-bold' 
                    : 'text-gray-900 font-semibold hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{language.flag}</span>
                <span className="flex-1 text-base">{language.name}</span>
                {currentLanguage.code === language.code && (
                  <span className="text-white font-bold text-lg">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}