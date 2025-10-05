import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import LanguageSelector from "./LanguageSelector.complex";

const navLinks = [
  // 메인 네비게이션 (상단 표시)
  { to: "/", labelKey: "navigation.home", icon: "🏠", primary: true },
  { to: "/services", labelKey: "navigation.services", icon: "💊", primary: true },
  { to: "/pricing", labelKey: "navigation.pricing", icon: "💰", primary: true },
  { to: "/faq", labelKey: "navigation.faq", icon: "❓", primary: true },
  { to: "/contact", labelKey: "navigation.contact", icon: "�", primary: true },
  
  // 고급 기능 (드롭다운 메뉴)
  { to: "/ai-dashboard", labelKey: "AI 돌봄", icon: "🤖", primary: false },
  { to: "/security", labelKey: "보안 센터", icon: "�", primary: false },
  { to: "/analytics", labelKey: "실시간 분석", icon: "📊", primary: false },
  { to: "/collaboration", labelKey: "협업 센터", icon: "👥", primary: false },
  
  // 정보 및 사용자
  { to: "/notices", labelKey: "공지사항", icon: "📢", primary: false },
  { to: "/downloads", labelKey: "자료실", icon: "📥", primary: false },
  { to: "/mypage", labelKey: "마이페이지", icon: "👤", primary: false },
  { to: "/login", labelKey: "로그인", icon: "🔐", primary: false },
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
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200' 
          : 'bg-white shadow-sm border-b border-gray-100'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        
        {/* 로고 영역 */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
          >
            <span className="text-2xl text-white">💚</span>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              돌봄서비스
            </span>
            <span className="text-xs text-gray-500">Care Service</span>
          </div>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-4 py-2 font-medium transition-all duration-200 rounded-lg group ${
                location.pathname === link.to
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <span className="mr-2">{link.icon}</span>
              {t(link.labelKey) || link.labelKey.split('.')[1]}
              
              {/* 활성 상태 표시 */}
              {location.pathname === link.to && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA 버튼 및 언어 선택 */}
        <div className="flex items-center gap-4">
          <LanguageSelector />
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="primary" size="sm" className="hidden sm:flex">
              무료 상담
            </Button>
          </motion.div>
          
          {/* 모바일 햄버거 메뉴 */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="메뉴 토글"
          >
            <motion.div 
              className="w-6 h-5 flex flex-col justify-between"
              animate={menuOpen ? "open" : "closed"}
            >
              <motion.span 
                className="block h-0.5 bg-gray-600 rounded"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="block h-0.5 bg-gray-600 rounded"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="block h-0.5 bg-gray-600 rounded"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8 }
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.to}
                    className={`flex items-center gap-3 py-3 px-4 rounded-lg font-medium transition-colors ${
                      location.pathname === link.to
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <span className="text-xl">{link.icon}</span>
                    {t(link.labelKey) || link.labelKey.split('.')[1]}
                  </Link>
                </motion.div>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <Button variant="primary" size="sm" className="w-full">
                  무료 상담 신청
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 모바일 메뉴 배경 오버레이 */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {createPortal(
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                onClick={() => setMenuOpen(false)}
              />,
              document.body
            )}
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;