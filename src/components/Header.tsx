import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import LanguageSelector from "./LanguageSelector";

const navLinks = [
  { to: "/about", labelKey: "navigation.about", icon: "🏠", primary: true },
  { to: "/services", labelKey: "navigation.services", icon: "💊", primary: true },
  { to: "/pricing", labelKey: "navigation.pricing", icon: "💰", primary: true },
  { to: "/notices", labelKey: "navigation.notices", icon: "📢", primary: true },
  { to: "/contact", labelKey: "navigation.contact", icon: "📞", primary: true },
  { to: "/downloads", labelKey: "navigation.downloads", icon: "�", primary: false },
  { to: "/reviews", labelKey: "navigation.reviews", icon: "⭐", primary: false },
  { to: "/faq", labelKey: "navigation.faq", icon: "❓", primary: false },
  { to: "/mypage", labelKey: "navigation.mypage", icon: "👤", primary: false },
  { to: "/login", labelKey: "navigation.login", icon: "🔐", primary: false },
];

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 라우트 변경 시 메뉴 닫기
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header className={`w-full sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass shadow-large border-b border-primary-200/30 dark:border-primary-700/30' 
        : 'bg-mesh-primary dark:bg-mesh-dark shadow-soft border-b-2 border-primary-200/50 dark:border-primary-800/50'
    }`}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3 md:py-4" role="navigation" aria-label="주요 메뉴">
        
        {/* 로고 영역 */}
        <Link to="/" className="flex items-center gap-3 group hover-lift">
          <div className={`inline-flex items-center justify-center rounded-2xl shadow-glow transition-all duration-300 group-hover:scale-110 ${
            scrolled ? 'w-12 h-12' : 'w-14 h-14'
          } bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500`}>
            <svg width={scrolled ? "28" : "32"} height={scrolled ? "28" : "32"} viewBox="0 0 32 32" fill="none" className="text-white">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M10 20c2-4 10-4 12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="13" cy="14" r="1.5" fill="currentColor"/>
              <circle cx="19" cy="14" r="1.5" fill="currentColor"/>
              <path d="M8 24h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className={`font-heading font-bold text-secondary-800 dark:text-secondary-100 tracking-tight whitespace-nowrap select-none transition-all duration-300 ${
            scrolled ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'
          }`}>
            바이칼 재가복지센터
          </span>
        </Link>

        {/* 데스크탑 메뉴 - 주요 메뉴만 표시 */}
        <ul className="hidden lg:flex items-center gap-2">
          {/* 주요 서비스 메뉴만 표시 */}
          {navLinks.filter(link => link.primary).map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 hover-lift text-sm ${
                  location.pathname === link.to
                    ? 'bg-primary-500 text-white shadow-glow'
                    : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-50 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {t(link.labelKey)}
              </Link>
            </li>
          ))}
          
          {/* 언어 선택기와 CTA 버튼 */}
          <li>
            <LanguageSelector />
          </li>
          <li>
            <Button
              variant="primary"
              size="md"
              className="ml-2"
              onClick={() => window.location.href = "/apply"}
            >
              상담신청
            </Button>
          </li>
        </ul>

        {/* 모바일 메뉴 버튼 */}
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSelector />
          <Button
            variant="primary"
            size="icon"
            onClick={() => setMenuOpen(true)}
            aria-label="메뉴 열기"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </Button>
        </div>

        {/* 모바일 메뉴 오버레이 */}
        {menuOpen && createPortal(
          <div className="fixed inset-0 z-[9999] lg:hidden">
            {/* 배경 오버레이 */}
            <div 
              className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm animate-fade-in" 
              onClick={() => setMenuOpen(false)} 
            />
            
            {/* 메뉴 패널 */}
            <div className="fixed top-0 right-0 h-full w-[85vw] max-w-sm glass border-l border-primary-200/50 dark:border-primary-700/50 shadow-2xl animate-slide-in flex flex-col">
              
              {/* 헤더 */}
              <div className="flex items-center justify-between p-6 border-b border-primary-200/30 dark:border-primary-700/30">
                <h2 className="text-xl font-bold gradient-text">메뉴</h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMenuOpen(false)}
                    aria-label="메뉴 닫기"
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </Button>
                </div>
              </div>

              {/* 메뉴 리스트 */}
              <div className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-2">
                  {navLinks.map((link, index) => (
                    <li key={link.to} className="animate-slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
                      <Link
                        to={link.to}
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                          location.pathname === link.to
                            ? 'bg-primary-500 text-white shadow-glow'
                            : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-50 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
                        }`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="text-lg">{link.icon}</span>
                        <span>{t(link.labelKey)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 하단 CTA */}
              <div className="p-6 border-t border-primary-200/30 dark:border-primary-700/30 space-y-4">
                <div className="flex items-center justify-center">
                  <LanguageSelector />
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth={true}
                  onClick={() => {
                    setMenuOpen(false);
                    window.location.href = "/apply";
                  }}
                  leftIcon={
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M22 2L11 13"></path>
                      <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                    </svg>
                  }
                >
                  무료 상담신청
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </nav>
    </header>
  );
};

export default Header;