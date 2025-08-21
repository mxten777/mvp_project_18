import React, { useState } from "react";
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
          <div className="flex items-center gap-3 select-none">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-200 to-green-100 shadow-2xl border-4 border-green-200">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="16" cy="16" r="15" stroke="#22c55e" strokeWidth="2" fill="#f0fdf4" />
                <path d="M10 20c2-4 10-4 12 0" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="13" cy="14" r="1.5" fill="#22c55e"/>
                <circle cx="19" cy="14" r="1.5" fill="#22c55e"/>
              </svg>
            </span>
            <Link to="/" className="text-2xl md:text-3xl font-extrabold tracking-tight text-green-700 drop-shadow-lg" style={{letterSpacing: '0.03em', textShadow:'0 2px 8px #bbf7d0', fontFamily:'Apple SD Gothic Neo, Malgun Gothic, Segoe UI, Arial, sans-serif'}}>
              기쁨글로리 재가복지센터
            </Link>
          </div>
          {!menuOpen && (
            <button
              className="block md:hidden p-3 ml-2 rounded-full bg-white/90 shadow border border-green-200 text-3xl font-extrabold text-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 active:bg-green-50 transition-all duration-150"
              aria-label="메뉴 열기"
              aria-expanded={menuOpen}
              aria-controls="main-nav-menu"
              onClick={() => setMenuOpen(true)}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32" height="32" viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          )}
          {/* 모바일 메뉴는 모바일에서만 렌더링 */}
          {menuOpen && <MobileNav open={true} onClose={() => setMenuOpen(false)} />}
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
