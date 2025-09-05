import React from "react";

const Footer: React.FC = () => (
  <footer className="w-full bg-gradient-to-r from-green-100 via-white to-green-50 border-t-2 border-green-200/70 py-7 px-4 mt-20 shadow-inner text-green-900 text-center text-sm select-none" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
      <div className="flex items-center gap-3 mb-2 md:mb-0">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-200 to-green-100 shadow-lg border-4 border-green-200">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="16" cy="16" r="15" stroke="#22c55e" strokeWidth="2" fill="#f0fdf4" />
            <path d="M10 20c2-4 10-4 12 0" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="13" cy="14" r="1.5" fill="#22c55e"/>
            <circle cx="19" cy="14" r="1.5" fill="#22c55e"/>
          </svg>
        </span>
        <span className="font-extrabold text-lg md:text-xl tracking-tight text-green-800 drop-shadow-sm">기쁨글로리 재가복지센터</span>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-7 text-green-700 text-sm md:text-base font-medium">
        <span className="px-2 border-l-2 border-green-200 first:border-0">대표전화: <a href="tel:010-1234-5678" className="underline hover:text-green-900 transition-colors">010-1234-5678</a></span>
        <span className="px-2 border-l-2 border-green-200 first:border-0">주소: 서울시 강남구 테헤란로 123</span>
        <span className="px-2 border-l-2 border-green-200 first:border-0">사업자등록번호: 123-45-67890</span>
      </div>
      <div className="mt-2 md:mt-0 text-xs text-green-500">© {new Date().getFullYear()} 기쁨글로리 재가복지센터. All rights reserved.</div>
    </div>
  </footer>
);

export default Footer;
