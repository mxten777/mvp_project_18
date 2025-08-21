import React from "react";
import { Link } from "react-router-dom";
import { useBodyOverflowHidden } from "../hooks/useBodyOverflowHidden";
import { createPortal } from "react-dom";

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
}> = ({ open, onClose }) => {
  useBodyOverflowHidden(open);
  if (!open) return null;
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex flex-col"
      aria-hidden={!open}
      style={{fontFamily:'Apple SD Gothic Neo, Malgun Gothic, Segoe UI, Arial, sans-serif'}}
    >
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 z-[9999]"
        style={{ background: '#fff', opacity: 1, zIndex: 9999 }}
        onClick={onClose}
      />
      {/* 모바일 메뉴 본체 */}
      <nav
        className="fixed inset-0 z-[10000] w-full h-full bg-white shadow-2xl border-l-2 border-green-200 flex flex-col items-center pt-0 pb-6 px-0 transition-transform duration-300"
        aria-label="모바일 메뉴"
        style={{paddingTop: '68px'}}
      >
        {/* 닫기(X) 버튼 - 메뉴 전체 오른쪽 상단에 고정 */}
      <button
        className="fixed top-4 right-4 p-2 rounded-full bg-green-50 hover:bg-green-200 text-xl font-bold text-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 shadow z-[200]"
        aria-label="메뉴 닫기"
        onClick={onClose}
        style={{boxShadow: '0 2px 8px #bbf7d0'}}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="9" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2"/>
          <path d="M6.5 6.5l7 7M13.5 6.5l-7 7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      {/* 상단 로고/센터명 영역 */}
        <div className="relative z-10 flex items-center gap-3 px-6 pt-7 pb-4 border-b-2 border-green-200/60 bg-white rounded-tr-2xl shadow-md w-full max-w-xs mx-auto">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg border-2 border-green-300">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="16" cy="16" r="15" stroke="#22c55e" strokeWidth="2" fill="#f0fdf4" />
            <path d="M10 20c2-4 10-4 12 0" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="13" cy="14" r="1.5" fill="#22c55e"/>
            <circle cx="19" cy="14" r="1.5" fill="#22c55e"/>
          </svg>
        </span>
        <span className="text-xl font-extrabold tracking-tight text-green-700 drop-shadow-sm whitespace-nowrap" style={{letterSpacing: '0.02em'}}>기쁨글로리 재가복지센터</span>
      </div>
  <ul className="flex flex-col gap-1 mt-6 list-none p-0 m-0 overflow-x-hidden w-full max-w-xs mx-auto bg-white">
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
    </div>,
    document.body
  );
};

export default MobileNav;
