import React from "react";

const Footer: React.FC = () => (
  <footer className="w-full bg-gradient-to-r from-[#e0e7ff] via-[#fdf6e3] to-[#fef9c3] border-t-4 border-[#b4b4e6] mt-20 shadow-inner">
    <div className="max-w-7xl mx-auto py-10 px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-[#3b3b6d] text-base font-medium">
      <div className="flex items-center gap-4">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#b4b4e6] to-[#fef9c3] shadow-lg border-4 border-[#b4b4e6]">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="16" cy="16" r="15" stroke="#2563eb" strokeWidth="2" fill="#fffbe9" />
            <path d="M10 20c2-4 10-4 12 0" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="13" cy="14" r="1.5" fill="#2563eb"/>
            <circle cx="19" cy="14" r="1.5" fill="#2563eb"/>
          </svg>
        </span>
        <span className="font-extrabold text-xl font-serif tracking-tight drop-shadow">호수바이칼 재가복지센터</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-[#3b3b6d] text-sm md:text-base font-medium">
        <span>대표전화: <a href="tel:010-1234-5678" className="underline hover:text-[#b4b4e6]">010-1234-5678</a></span>
        <span>주소: 서울시 강남구 테헤란로 123</span>
        <span>사업자등록번호: 123-45-67890</span>
      </div>
      <div className="text-[#b4b4e6] text-xs md:text-sm font-medium mt-2 md:mt-0">
        © {new Date().getFullYear()} 호수바이칼 재가복지센터. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
