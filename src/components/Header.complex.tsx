import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import LanguageSelector from "./LanguageSelector.complex";

// 메뉴 구조를 다국어 키로 정의
const getMainMenus = (t: (key: string) => string) => [
  { to: "/", label: t('navigation.home'), icon: "🏠" },
  { to: "/services", label: t('navigation.services'), icon: "💊" },
  { to: "/pricing", label: "비용안내", icon: "💰" },
  { to: "/contact", label: t('navigation.contact'), icon: "📞" }
];

const getAdvancedMenus = (t: (key: string) => string) => [
  { 
    category: "스마트 서비스",
    items: [
      { to: "/ai-dashboard", label: t('navigation.ai'), icon: "🤖" },
      { to: "/analytics", label: t('navigation.analytics'), icon: "📊" },
      { to: "/collaboration", label: t('navigation.collaboration'), icon: "👥" }
    ]
  },
  {
    category: "정보센터", 
    items: [
      { to: "/faq", label: t('navigation.faq'), icon: "❓" },
      { to: "/notices", label: "공지사항", icon: "📢" },
      { to: "/downloads", label: "자료실", icon: "📥" }
    ]
  },
  {
    category: "계정",
    items: [
      { to: "/mypage", label: "마이페이지", icon: "👤" },
      { to: "/security-center", label: t('navigation.securityCenter'), icon: "🔒" },
      { to: "/login", label: "로그인", icon: "🔐" }
    ]
  }
];

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const location = useLocation();

  // 다국어 메뉴 생성
  const mainMenus = getMainMenus(t);
  const advancedMenus = getAdvancedMenus(t);

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
    setDropdownOpen(null);
  }, [location]);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-white shadow-sm border-b border-gray-100'
      }`}
    >
      <nav className="max-w-7xl mx-auto">
        {/* 상단 헤더 */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
          
          {/* 로고 */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="text-2xl text-white">💚</span>
            </motion.div>
            <div className="flex flex-col">
              <motion.span 
                className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors"
                whileHover={{ x: 2 }}
              >
                돌봄서비스
              </motion.span>
              <span className="text-xs text-gray-500 font-medium">Care Service</span>
            </div>
          </Link>

          {/* 데스크톱 메인 네비게이션 */}
          <div className="hidden lg:flex items-center gap-6">
            {mainMenus.map((menu, index) => (
              <motion.div
                key={menu.to}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={menu.to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    location.pathname === menu.to
                      ? 'bg-blue-50 text-blue-600 shadow-sm'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                >
                  <span className="text-sm">{menu.icon}</span>
                  <span>{menu.label}</span>
                </Link>
              </motion.div>
            ))}

            {/* 더보기 드롭다운 */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setDropdownOpen(dropdownOpen ? null : 'more')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200"
              >
                <span className="text-sm">⚙️</span>
                <span>{t('navigation.more')}</span>
                <motion.svg 
                  animate={{ rotate: dropdownOpen === 'more' ? 180 : 0 }}
                  className="w-4 h-4"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>

              {/* 드롭다운 메뉴 */}
              <AnimatePresence>
                {dropdownOpen === 'more' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden"
                  >
                    {advancedMenus.map((category, categoryIndex) => (
                      <div key={category.category} className="p-4 border-b border-gray-100 last:border-b-0">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                          {category.category}
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {category.items.map((item, itemIndex) => (
                            <motion.div
                              key={item.to}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (categoryIndex * 3 + itemIndex) * 0.05 }}
                            >
                              <Link
                                to={item.to}
                                onClick={() => setDropdownOpen(null)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                                  location.pathname === item.to
                                    ? 'bg-blue-50 text-blue-700 font-medium'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                                }`}
                              >
                                <span className="text-base">{item.icon}</span>
                                <span>{item.label}</span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 우측 액션 버튼들 */}
          <div className="flex items-center gap-3">
            <LanguageSelector />
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block"
            >
              <Button variant="primary" size="sm" className="shadow-lg">
                <span className="mr-1">📞</span>
                무료 상담
              </Button>
            </motion.div>
            
            {/* 모바일 햄버거 메뉴 */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-3 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="메뉴 토글"
            >
              <motion.div 
                animate={menuOpen ? "open" : "closed"}
                className="w-6 h-5 flex flex-col justify-between"
              >
                <motion.span 
                  variants={{
                    open: { rotate: 45, y: 8 },
                    closed: { rotate: 0, y: 0 }
                  }}
                  className="block h-0.5 bg-gray-600 transform transition-all"
                />
                <motion.span 
                  variants={{
                    open: { opacity: 0 },
                    closed: { opacity: 1 }
                  }}
                  className="block h-0.5 bg-gray-600 transition-opacity"
                />
                <motion.span 
                  variants={{
                    open: { rotate: -45, y: -8 },
                    closed: { rotate: 0, y: 0 }
                  }}
                  className="block h-0.5 bg-gray-600 transform transition-all"
                />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden bg-white border-t border-gray-200 shadow-lg"
            >
              <div className="px-4 py-6">
                {/* 모바일 메인 메뉴 */}
                <div className="space-y-3 mb-6">
                  {mainMenus.map((menu, index) => (
                    <motion.div
                      key={menu.to}
                      initial={{ x: -50, opacity: 0 }}
                      animate={menuOpen ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={menu.to}
                        className={`flex items-center gap-3 py-3 px-3 rounded-lg font-medium transition-all ${
                          location.pathname === menu.to
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                        }`}
                      >
                        <span className="text-lg">{menu.icon}</span>
                        <span>{menu.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* 모바일 고급 메뉴들 */}
                {advancedMenus.map((category, categoryIndex) => (
                  <div key={category.category} className="mb-6">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-3">
                      {category.category}
                    </div>
                    <div className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <motion.div
                          key={item.to}
                          initial={{ x: -30, opacity: 0 }}
                          animate={menuOpen ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
                          transition={{ delay: (categoryIndex * 3 + itemIndex + 4) * 0.1 }}
                        >
                          <Link
                            to={item.to}
                            className={`flex items-center gap-3 py-2 px-3 rounded-lg text-sm transition-all ${
                              location.pathname === item.to
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                            }`}
                          >
                            <span className="text-base">{item.icon}</span>
                            <span>{item.label}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* 모바일 CTA */}
                <motion.div 
                  className="pt-4 border-t border-gray-200"
                  initial={{ y: 20, opacity: 0 }}
                  animate={menuOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button variant="primary" size="sm" className="w-full">
                    <span className="mr-2">📞</span>
                    무료 상담 신청
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 드롭다운 배경 클릭 닫기 */}
        <AnimatePresence>
          {(dropdownOpen || menuOpen) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:block hidden"
              onClick={() => {
                setDropdownOpen(null);
                setMenuOpen(false);
              }}
            />
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;