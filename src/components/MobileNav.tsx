import React from "react";
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

const MobileNav: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => (
  <div
    className={`fixed inset-0 z-[120] transition-all duration-300 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
    aria-hidden={!open}
    style={{fontFamily:'Apple SD Gothic Neo, Malgun Gothic, Segoe UI, Arial, sans-serif'}}
  >
    <div
      className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300"
      onClick={onClose}
    />
    <nav
      className={`absolute top-0 right-0 w-80 max-w-full h-full bg-gradient-to-br from-green-50 via-white to-green-100 shadow-2xl border-l-2 border-green-200 flex flex-col pt-0 pb-6 px-0 z-[130] transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      aria-label="모바일 메뉴"
    >
      {/* 상단 로고/센터명 영역 */}
  <div className="relative z-10 flex items-center gap-3 px-6 pt-7 pb-4 border-b-2 border-green-200/60 bg-white/90 rounded-tr-2xl shadow-md">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-200 to-green-100 shadow-lg border-2 border-green-300">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="16" cy="16" r="15" stroke="#22c55e" strokeWidth="2" fill="#f0fdf4" />
            <path d="M10 20c2-4 10-4 12 0" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="13" cy="14" r="1.5" fill="#22c55e"/>
            <circle cx="19" cy="14" r="1.5" fill="#22c55e"/>
          </svg>
        </span>
        <span className="text-xl font-extrabold tracking-tight text-green-700 drop-shadow-sm whitespace-nowrap" style={{letterSpacing: '0.02em'}}>호수바이칼 재가복지센터</span>
        <button
          className="absolute top-2 right-2 p-2 rounded-full bg-green-50 hover:bg-green-200 text-xl font-bold text-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 shadow"
          aria-label="메뉴 닫기"
          onClick={onClose}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2"/>
            <path d="M6.5 6.5l7 7M13.5 6.5l-7 7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
  <ul className="flex flex-col gap-1 mt-6 list-none p-0 m-0 overflow-x-hidden">
        {navLinks.map((link) => (
          <li key={link.to} className="w-full">
            <Link
              to={link.to}
              className="block w-full px-6 py-3 rounded-2xl text-lg font-semibold text-green-800 hover:bg-green-100 hover:text-green-700 transition-all duration-150 whitespace-nowrap overflow-hidden text-ellipsis focus:outline-none focus:ring-2 focus:ring-green-400"
              onClick={onClose}
              style={{fontFamily:'Apple SD Gothic Neo, Malgun Gothic, Segoe UI, Arial, sans-serif', textDecoration: 'none', borderBottom: 'none'}}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

export default MobileNav;
