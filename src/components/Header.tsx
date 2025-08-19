import React, { useState } from "react";
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
    <header className="w-full bg-gradient-to-r from-blue-100 via-white to-yellow-50 shadow-lg sticky top-0 z-50 border-b border-blue-200">
      <nav
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-3 md:py-1.5"
        role="navigation"
        aria-label="주요 메뉴"
      >
        <div className="flex w-full md:w-auto items-center justify-between">
          <div className="flex items-center gap-2 select-none">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-300 to-yellow-200 shadow-md border-2 border-blue-200">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="16" cy="16" r="15" stroke="#2563eb" strokeWidth="2" fill="#fffbe9" />
                <path d="M10 20c2-4 10-4 12 0" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="13" cy="14" r="1.5" fill="#2563eb"/>
                <circle cx="19" cy="14" r="1.5" fill="#2563eb"/>
              </svg>
            </span>
            <Link to="/" className="text-2xl md:text-3xl font-extrabold tracking-tight text-blue-800 drop-shadow-sm font-serif" style={{letterSpacing: '0.02em'}}>
              호수바이칼 재가복지센터
            </Link>
          </div>
          <button
            className="block md:hidden p-3 ml-2 rounded-full bg-white/80 shadow border border-blue-200 text-4xl font-extrabold text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-100 transition-all duration-150"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={menuOpen}
            aria-controls="main-nav-menu"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32" height="32" viewBox="0 0 24 24"
              fill="none"
              stroke="#2563eb"
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
        </div>
        <ul
          id="main-nav-menu"
          className={`${menuOpen ? 'flex' : 'hidden'} flex-col md:flex md:flex-row flex-wrap gap-2 md:gap-6 text-lg font-semibold w-full md:w-auto mt-2 md:mt-0 bg-white/90 md:bg-transparent border-t md:border-0 rounded-b-2xl md:rounded-none shadow-md md:shadow-none px-2 md:px-0 py-2 md:py-0`}
          role="menubar"
        >
          {navLinks.map((link) => (
            <li key={link.to} role="none">
              <Link
                to={link.to}
                className="block px-5 py-2 rounded-xl hover:bg-yellow-100 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-100 transition-all duration-150 text-blue-700 text-lg font-serif tracking-wide shadow-sm"
                aria-label={link.label}
                role="menuitem"
                tabIndex={0}
                onClick={() => setMenuOpen(false)}
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
