import React from "react";

const Footer: React.FC = () => (
  <footer className="w-full bg-gradient-to-r from-blue-100 via-yellow-50 to-white border-t-2 border-blue-200 mt-16 shadow-inner">
    <div className="max-w-7xl mx-auto py-8 px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-blue-800 text-base font-medium">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-200 to-yellow-100 shadow border-2 border-blue-200">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="16" cy="16" r="15" stroke="#2563eb" strokeWidth="2" fill="#fffbe9" />
            <path d="M10 20c2-4 10-4 12 0" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="13" cy="14" r="1.5" fill="#2563eb"/>
            <circle cx="19" cy="14" r="1.5" fill="#2563eb"/>
          </svg>
        </span>
        <span className="font-extrabold text-lg font-serif tracking-tight">호수바이칼 재가복지센터</span>
      </div>
      <div className="text-blue-500 text-sm md:text-base font-medium">
        © {new Date().getFullYear()} 호수바이칼 재가복지센터. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
