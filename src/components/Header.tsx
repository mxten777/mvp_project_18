import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";



const navLinks = [
  { to: "/about", label: "센터소개" },
  { to: "/services", label: "서비스소개" },
  { to: "/pricing", label: "서비스비용" },
  { to: "/notices", label: "공지사항" },
  { to: "/downloads", label: "자료실" },
  { to: "/reviews", label: "고객후기" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "연락처" },
  { to: "/apply", label: "상담신청" },
  { to: "/mypage", label: "마이페이지" },
  { to: "/login", label: "로그인" },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
  <header className="w-full bg-gradient-to-r from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 shadow-2xl sticky top-0 z-50 border-b-4 border-green-200/70 dark:border-gray-800 backdrop-blur-md/60" style={{fontFamily:'Apple SD Gothic Neo, Malgun Gothic, Segoe UI, Arial, sans-serif'}}>
      <nav
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-3 py-4 md:py-3 gap-2 md:gap-0 box-border"
        role="navigation"
        aria-label="주요 메뉴"
      >
  <div className="flex w-full md:w-auto items-center justify-between px-1">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-200 to-green-100 dark:from-gray-800 dark:to-gray-700 shadow-2xl border-4 border-green-200 dark:border-gray-700">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="16" cy="16" r="15" stroke="#22c55e" strokeWidth="2" fill="#f0fdf4" />
              <path d="M10 20c2-4 10-4 12 0" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="13" cy="14" r="1.5" fill="#22c55e"/>
              <circle cx="19" cy="14" r="1.5" fill="#22c55e"/>
            </svg>
          </span>
          <span className="ml-2 text-2xl md:text-3xl font-extrabold text-green-800 dark:text-gray-100 tracking-tight whitespace-nowrap select-none drop-shadow-sm" style={{letterSpacing:'-0.02em'}}>바이칼 재가복지센터</span>
          <div className="flex-1" />
          <button
            className="block md:hidden z-[99999] pointer-events-auto p-3 mr-3 rounded-full bg-green-600 dark:bg-gray-700 shadow border border-green-700 dark:border-gray-600 text-3xl font-extrabold text-white dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-gray-400 active:bg-green-700 dark:active:bg-gray-800 transition-all duration-150 hover:scale-105"
            style={{ position: 'relative' }}
            onClick={() => setMenuOpen(true)}
            aria-label="메뉴 열기"
          >
            ☰
          </button>
          {menuOpen && createPortal(
            <div className="fixed inset-0 z-[9999] w-full h-full" style={{fontFamily:'Apple SD Gothic Neo, Malgun Gothic, Segoe UI, Arial, sans-serif'}}>
              {/* 오버레이 배경 */}
              <div className="absolute inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-200" onClick={() => setMenuOpen(false)} />
              {/* 우측 슬라이드 메뉴 */}
              <div
                className={`fixed top-0 right-0 h-full w-[85vw] max-w-xs bg-gradient-to-br from-green-50 via-white to-green-100/90 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 border-l-4 border-green-200 dark:border-gray-700 shadow-2xl z-10 flex flex-col items-center justify-start px-3 py-6 transition-transform duration-300 transform will-change-transform rounded-l-3xl backdrop-bl-xl ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                style={{color:'#166534', left: 'auto', right: 0}}>
                <div className="flex items-center gap-3 mb-8 w-full justify-between">
                  <button
                    className="text-2xl px-3 py-2 rounded-full hover:bg-green-100 dark:hover:bg-gray-700 active:bg-green-200 dark:active:bg-gray-800 transition-colors shadow border border-green-200 dark:border-gray-700"
                    style={{color:'#16a34a'}}
                    onClick={() => window.history.back()}
                    aria-label="뒤로가기"
                  >
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <span className="text-3xl font-extrabold tracking-tight dark:text-gray-100" style={{color:'#16a34a'}}>메뉴</span>
                  <button
                    className="px-3 py-2 rounded-full bg-green-600 dark:bg-gray-700 hover:bg-green-700 dark:hover:bg-gray-800 text-white dark:text-gray-100 text-xl font-bold shadow border border-green-200 dark:border-gray-700 transition-all duration-150"
                    style={{background:'#16a34a'}} onClick={() => setMenuOpen(false)}
                    aria-label="닫기"
                  >
                    ×
                  </button>
                </div>
                <ul className="flex flex-col gap-1.5 mb-6 w-full">
                  {navLinks.map((item) => (
                    <li key={item.to} className="w-full">
                      <Link to={item.to} onClick={() => setMenuOpen(false)}
                        className="block w-[90%] mx-auto px-3 py-2.5 rounded-2xl text-base font-semibold border border-green-100 dark:border-gray-700 bg-white/80 dark:bg-gray-800/90 hover:bg-green-100 dark:hover:bg-gray-700 hover:text-green-800 dark:hover:text-gray-100 transition-all duration-200 whitespace-nowrap overflow-hidden text-ellipsis focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-gray-600 shadow-sm text-green-800 dark:text-gray-100"
                        style={{ textDecoration: 'none', borderBottom: 'none' }}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                {/* 닫기 버튼은 상단에 아이콘으로 대체 */}
              </div>
            </div>,
            document.body
          )}
        </div>
        {/* 데스크탑 메뉴는 md 이상에서만 렌더링, 모바일 메뉴가 열려있을 때는 숨김 */}
        <ul
          id="main-nav-menu"
          className={`hidden md:flex md:flex-row flex-wrap gap-3 md:gap-6 text-lg font-semibold w-full md:w-auto mt-2 md:mt-0 bg-white/90 dark:bg-gray-900 md:bg-transparent border-t-2 md:border-0 border-green-200 dark:border-gray-700 rounded-b-2xl md:rounded-none shadow-xl md:shadow-none px-3 md:px-0 py-3 md:py-0 backdrop-blur-sm items-center justify-end`}
          role="menubar"
        >
          {navLinks.map((link) => (
            <li key={link.to} role="none">
              <Link
                to={link.to}
                className="block px-5 py-2 rounded-2xl hover:bg-green-100 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-200 active:bg-green-200 transition-all duration-150 text-green-800 text-lg tracking-wide shadow border border-green-200/50 drop-shadow-sm font-semibold"
                aria-label={link.label}
                role="menuitem"
                tabIndex={0}
                onClick={() => setMenuOpen(false)}
                style={{fontFamily:'Apple SD Gothic Neo, Malgun Gothic, Segoe UI, Arial, sans-serif'}}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
