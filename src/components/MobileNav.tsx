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
      className={`absolute top-0 right-0 w-72 max-w-full h-full bg-gradient-to-br from-green-50 via-white to-green-100 shadow-2xl border-l-2 border-green-200 flex flex-col pt-8 pb-6 px-6 z-[130] transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      aria-label="모바일 메뉴"
    >
      <button
        className="absolute top-4 right-4 p-2 rounded-full bg-green-100 hover:bg-green-200 text-2xl font-bold text-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        aria-label="메뉴 닫기"
        onClick={onClose}
      >
        ×
      </button>
  <ul className="flex flex-col gap-3 mt-8 list-none p-0 m-0 overflow-x-hidden">
        {navLinks.map((link) => (
          <li key={link.to} className="w-full">
            <Link
              to={link.to}
              className="block w-full px-5 py-3 rounded-xl text-lg font-semibold text-green-800 hover:bg-green-200 hover:text-green-700 transition-all duration-150 shadow-sm whitespace-nowrap overflow-hidden text-ellipsis focus:outline-none focus:ring-2 focus:ring-green-400"
              onClick={onClose}
              style={{fontFamily:'Apple SD Gothic Neo, Malgun Gothic, Segoe UI, Arial, sans-serif'}}
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
