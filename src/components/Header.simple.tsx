import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import LanguageSelector from "./LanguageSelector";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200' 
        : 'bg-white shadow-sm border-b border-gray-100'
    }`}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        
        {/* 로고 영역 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-xl text-white">💚</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-800">돌봄서비스</span>
            <span className="text-xs text-gray-500">Care Service</span>
          </div>
        </div>

        {/* 데스크톱 네비게이션 */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            서비스 안내
          </a>
          <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            비용 안내
          </a>
          <a href="#faq" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            자주 묻는 질문
          </a>
          <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            문의하기
          </a>
        </div>

        {/* CTA 버튼 및 언어 선택 */}
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Button variant="primary" size="sm" className="hidden sm:flex">
            무료 상담
          </Button>
          
          {/* 모바일 햄버거 메뉴 */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="메뉴 토글"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-gray-600 transform transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-gray-600 transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-gray-600 transform transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            <a href="#services" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              서비스 안내
            </a>
            <a href="#pricing" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              비용 안내
            </a>
            <a href="#faq" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              자주 묻는 질문
            </a>
            <a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              문의하기
            </a>
            <div className="pt-4 border-t border-gray-200">
              <Button variant="primary" size="sm" className="w-full">
                무료 상담 신청
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;