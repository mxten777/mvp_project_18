import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";



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
  <header className="w-full bg-gradient-to-r from-green-50 via-white to-green-100 shadow-2xl sticky top-0 z-50 border-b-4 border-green-200/70 backdrop-blur-md/60" style={{fontFamily:'Apple SD Gothic Neo, Malgun Gothic, Segoe UI, Arial, sans-serif'}}>
      <nav
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-4 md:py-2"
        role="navigation"
        aria-label="주요 메뉴"
      >
        <div className="flex w-full md:w-auto items-center justify-between">
          <div className="flex items-center gap-3 select-none w-full">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-200 to-green-100 shadow-2xl border-4 border-green-200">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="16" cy="16" r="15" stroke="#22c55e" strokeWidth="2" fill="#f0fdf4" />
                <path d="M10 20c2-4 10-4 12 0" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="13" cy="14" r="1.5" fill="#22c55e"/>
                <circle cx="19" cy="14" r="1.5" fill="#22c55e"/>
              </svg>
            </span>
            <span className="ml-2 text-2xl md:text-3xl font-extrabold text-green-700 tracking-tight whitespace-nowrap select-none" style={{letterSpacing:'-0.02em'}}>기쁨글로리 복지센터</span>
            <div className="flex-1" />
            <button
              className="block md:hidden z-[99999] pointer-events-auto p-3 ml-2 rounded-full bg-green-600 shadow border border-green-700 text-3xl font-extrabold text-white focus:outline-none focus:ring-2 focus:ring-green-400 active:bg-green-700 transition-all duration-150"
              style={{ position: 'relative' }}
              onClick={() => setMenuOpen(true)}
              aria-label="메뉴 열기"
            >
              ☰
            </button>
            {menuOpen && createPortal(
              <div className="fixed inset-0 z-[9999] w-full h-full flex items-center justify-center" style={{fontFamily:'Apple SD Gothic Neo, Malgun Gothic, Segoe UI, Arial, sans-serif'}}>
                {/* 오버레이 배경 */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200" onClick={() => setMenuOpen(false)} />
                {/* 메뉴 카드 */}
                <div 
                  className="relative z-10 flex flex-col items-center justify-center rounded-2xl shadow-2xl border-4 border-green-200 px-6 py-10 w-[90vw] max-w-xs mx-auto animate-fadeIn"
                  style={{background:'#d1fae5', color:'#166534'}}>
                  <div className="text-3xl font-extrabold mb-6" style={{color:'#16a34a'}}>메뉴</div>
                  <ul className="flex flex-col gap-2 mb-8 w-full">
                    {navLinks.map((item) => (
                      <li key={item.to} className="w-full">
                        <Link to={item.to} onClick={() => setMenuOpen(false)}
                          className="block w-full px-6 py-3 rounded-2xl text-lg font-semibold border border-pink-200 bg-pink-50 hover:bg-pink-200 hover:text-pink-800 transition-all duration-200 whitespace-nowrap overflow-hidden text-ellipsis focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
                          style={{ textDecoration: 'none', borderBottom: 'none', color:'#be185d' }}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <button 
                    className="px-8 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xl font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-150" 
                    style={{background:'#db2777'}}
                    onClick={() => setMenuOpen(false)}
                  >닫기</button>
                </div>
              </div>,
              document.body
            )}
          {/* 모바일 메뉴는 모바일에서만 렌더링 */}
          <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
        </div>
      </div>
        {/* 데스크탑 메뉴는 md 이상에서만 렌더링, 모바일 메뉴가 열려있을 때는 숨김 */}
        <ul
          id="main-nav-menu"
          className={`hidden md:flex md:flex-row flex-wrap gap-3 md:gap-7 text-lg font-semibold w-full md:w-auto mt-2 md:mt-0 bg-white/95 md:bg-transparent border-t-2 md:border-0 border-green-200 rounded-b-2xl md:rounded-none shadow-xl md:shadow-none px-3 md:px-0 py-3 md:py-0 backdrop-blur-sm`}
          role="menubar"
        >
          {navLinks.map((link) => (
            <li key={link.to} role="none">
              <Link
                to={link.to}
                className="block px-6 py-2 rounded-2xl hover:bg-green-50 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-200 active:bg-green-100 transition-all duration-150 text-green-800 text-lg tracking-wide shadow border border-green-200/50 drop-shadow-sm font-semibold"
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
