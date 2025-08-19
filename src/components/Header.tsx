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
    <header className="w-full bg-white shadow sticky top-0 z-50">
      <nav
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-2 md:py-0"
        role="navigation"
        aria-label="주요 메뉴"
      >
        <div className="flex w-full md:w-auto items-center justify-between">
          <div className="text-lg md:text-xl font-bold text-blue-700">
            <Link to="/">백세플러스 재가복지센터</Link>
          </div>
          <button
            className="block md:hidden p-3 ml-2 rounded bg-white z-50 text-4xl font-extrabold tracking-widest text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-100"
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
              stroke="blue"
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
          className={`${menuOpen ? 'flex' : 'hidden'} flex-col md:flex md:flex-row flex-wrap gap-2 md:gap-6 text-base font-medium w-full md:w-auto mt-2 md:mt-0 bg-white md:bg-transparent border-t md:border-0`}
          role="menubar"
        >
          {navLinks.map((link) => (
            <li key={link.to} role="none">
              <Link
                to={link.to}
                className="block px-4 py-2 rounded hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-100 transition-colors duration-100"
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
