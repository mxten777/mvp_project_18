

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  // 모바일 메뉴 오픈 시 body 스크롤 차단
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);
    const menuItems = [
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
  ]; // Closing bracket and semicolon added
  return (
    <header className="w-full bg-gradient-to-r from-green-50 via-white to-green-100 shadow-2xl sticky top-0 z-50 border-b-4 border-green-200/70 backdrop-blur-md/60 px-4 py-3 flex items-center justify-between">
      <span className="text-2xl font-extrabold tracking-tight text-green-700 drop-shadow-lg" style={{letterSpacing: '0.03em', textShadow:'0 2px 8px #bbf7d0', fontFamily:'Apple SD Gothic Neo, Malgun Gothic, Segoe UI, Arial, sans-serif'}}>테스트 헤더</span>
      {/* 모바일에서만 햄버거/메뉴/닫기 렌더 */}
      <button
        className="block md:hidden z-[99999] pointer-events-auto p-3 ml-2 rounded-full bg-white/90 shadow border border-green-200 text-3xl font-extrabold text-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 active:bg-green-50 transition-all duration-150"
        style={{ position: 'relative' }}
        onClick={() => setOpen(true)}
        aria-label="메뉴 열기"
      >
        ☰
      </button>
      {open && createPortal(
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white animate-fadein md:hidden" style={{fontFamily:'Apple SD Gothic Neo, Malgun Gothic, Segoe UI, Arial, sans-serif'}}>
          <div className="text-3xl font-extrabold text-green-700 mb-6">메뉴</div>
          <ul className="flex flex-col gap-2 mb-8 w-full max-w-xs mx-auto">
            {menuItems.map((item) => (
              <li key={item.to} className="w-full">
                <Link to={item.to} onClick={() => setOpen(false)}
                  className="block w-full px-6 py-3 rounded-2xl text-lg font-semibold text-green-800 hover:bg-green-200 hover:text-green-900 transition-all duration-200 whitespace-nowrap overflow-hidden text-ellipsis focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                  style={{fontFamily:'Apple SD Gothic Neo, Malgun Gothic, Segoe UI, Arial, sans-serif', textDecoration: 'none', borderBottom: 'none'}}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button className="px-8 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xl font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-150" onClick={() => setOpen(false)}>닫기</button>
        </div>,
        document.body
      )}
    </header>
  );
}

export default Header;
