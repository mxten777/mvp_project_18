/**
 * 접근성 개선된 네비게이션 컴포넌트
 */

import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  UserIcon
} from '@heroicons/react/24/outline';

interface NavItem {
  to: string;
  labelKey: string;
  icon: React.ComponentType<any>;
  description?: string;
}

const navItems: NavItem[] = [
  { to: "/about", labelKey: "nav.about", icon: InformationCircleIcon, description: "센터 소개 페이지로 이동" },
  { to: "/services", labelKey: "nav.services", icon: HomeIcon, description: "서비스 소개 페이지로 이동" },
  { to: "/pricing", labelKey: "nav.pricing", icon: HomeIcon, description: "서비스 비용 페이지로 이동" },
  { to: "/notices", labelKey: "nav.notices", icon: InformationCircleIcon, description: "공지사항 페이지로 이동" },
  { to: "/downloads", labelKey: "nav.downloads", icon: HomeIcon, description: "자료실 페이지로 이동" },
  { to: "/reviews", labelKey: "nav.reviews", icon: ChatBubbleLeftRightIcon, description: "고객후기 페이지로 이동" },
  { to: "/faq", labelKey: "nav.faq", icon: InformationCircleIcon, description: "자주 묻는 질문 페이지로 이동" },
  { to: "/contact", labelKey: "nav.contact", icon: PhoneIcon, description: "연락처 페이지로 이동" },
  { to: "/apply", labelKey: "nav.apply", icon: ChatBubbleLeftRightIcon, description: "상담신청 페이지로 이동" },
  { to: "/privacy", labelKey: "nav.privacy", icon: ShieldCheckIcon, description: "개인정보보호 페이지로 이동" },
  { to: "/security", labelKey: "nav.security", icon: ShieldCheckIcon, description: "보안대시보드 페이지로 이동" },
  { to: "/mypage", labelKey: "nav.mypage", icon: UserIcon, description: "마이페이지로 이동" },
  { to: "/login", labelKey: "nav.login", icon: UserIcon, description: "로그인 페이지로 이동" }
];

interface AccessibleNavigationProps {
  className?: string;
}

export default function AccessibleNavigation({ className = "" }: AccessibleNavigationProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // 메뉴 닫기
  const closeMenu = () => {
    setIsMenuOpen(false);
    setFocusedIndex(-1);
    menuButtonRef.current?.focus();
  };

  // 키보드 네비게이션
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          closeMenu();
          break;
        
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex(prev => {
            const nextIndex = prev < navItems.length - 1 ? prev + 1 : 0;
            navItemsRef.current[nextIndex]?.focus();
            return nextIndex;
          });
          break;
        
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex(prev => {
            const nextIndex = prev > 0 ? prev - 1 : navItems.length - 1;
            navItemsRef.current[nextIndex]?.focus();
            return nextIndex;
          });
          break;
        
        case 'Home':
          event.preventDefault();
          setFocusedIndex(0);
          navItemsRef.current[0]?.focus();
          break;
        
        case 'End': {
          event.preventDefault();
          const lastIndex = navItems.length - 1;
          setFocusedIndex(lastIndex);
          navItemsRef.current[lastIndex]?.focus();
          break;
        }
        
        case 'Tab':
          if (!event.shiftKey && focusedIndex === navItems.length - 1) {
            closeMenu();
          } else if (event.shiftKey && focusedIndex === 0) {
            closeMenu();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, focusedIndex]);

  // 외부 클릭 감지
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // 페이지 변경 시 메뉴 닫기
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const isCurrentPage = (path: string) => location.pathname === path;

  return (
    <nav className={`relative ${className}`} role="navigation" aria-label="주요 메뉴">
      {/* 메뉴 토글 버튼 */}
      <button
        ref={menuButtonRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        aria-expanded={isMenuOpen}
        aria-haspopup="menu"
        aria-label={isMenuOpen ? t('accessibility.menu_toggle') + ' - 열림' : t('accessibility.menu_toggle') + ' - 닫힘'}
      >
        {isMenuOpen ? (
          <XMarkIcon className="w-6 h-6" aria-hidden="true" />
        ) : (
          <Bars3Icon className="w-6 h-6" aria-hidden="true" />
        )}
      </button>

      {/* 데스크톱 메뉴 */}
      <div className="hidden lg:flex lg:items-center lg:space-x-1">
        {navItems.slice(0, 8).map((item, index) => {
          const Icon = item.icon;
          const isActive = isCurrentPage(item.to);
          
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${isActive
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
              aria-describedby={`nav-desc-${index}`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              <span>{t(item.labelKey)}</span>
              <span id={`nav-desc-${index}`} className="sr-only">
                {item.description}
              </span>
            </Link>
          );
        })}
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 lg:hidden"
          role="menu"
          aria-orientation="vertical"
        >
          {/* 메뉴 제목 */}
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              사이트 메뉴
            </h2>
          </div>

          {/* 메뉴 항목들 */}
          <div className="py-2 max-h-96 overflow-y-auto">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = isCurrentPage(item.to);
              
              return (
                <Link
                  key={item.to}
                  ref={el => navItemsRef.current[index] = el}
                  to={item.to}
                  onClick={closeMenu}
                  onFocus={() => setFocusedIndex(index)}
                  className={`
                    flex items-center gap-3 px-4 py-3 text-sm transition-colors
                    focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700
                    ${isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                  aria-describedby={`mobile-nav-desc-${index}`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{t(item.labelKey)}</div>
                    {item.description && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {item.description}
                      </div>
                    )}
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full" aria-hidden="true" />
                  )}
                  <span id={`mobile-nav-desc-${index}`} className="sr-only">
                    {item.description}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* 키보드 네비게이션 도움말 */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <div>↑↓ 화살표: 메뉴 이동</div>
              <div>Enter/Space: 선택</div>
              <div>Esc: 메뉴 닫기</div>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}