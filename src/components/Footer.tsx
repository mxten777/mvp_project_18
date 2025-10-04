import React from "react";

const Footer: React.FC = () => (
  <footer className="w-full bg-gradient-to-r from-green-100 via-white to-green-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 border-t-2 border-green-200/70 dark:border-gray-800 py-6 sm:py-7 px-4 mt-0 shadow-inner text-green-900 dark:text-gray-100 text-center text-sm select-none mobile-safe">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 mobile-container">
      <div className="flex items-center gap-3 mb-2 md:mb-0">
        <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-200 to-green-100 dark:from-gray-800 dark:to-gray-700 shadow-lg border-4 border-green-200 dark:border-gray-700">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="sm:w-8 sm:h-8">
            <circle cx="16" cy="16" r="15" stroke="#22c55e" strokeWidth="2" fill="#f0fdf4" />
            <path d="M10 20c2-4 10-4 12 0" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="13" cy="14" r="1.5" fill="#22c55e"/>
            <circle cx="19" cy="14" r="1.5" fill="#22c55e"/>
          </svg>
        </span>
        <span className="font-semibold text-base sm:text-lg md:text-xl tracking-tight text-green-800 dark:text-gray-100 drop-shadow-sm elegant-heading">바이칼 재가복지센터</span>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-green-700 dark:text-gray-300 text-xs sm:text-sm md:text-base font-normal elegant-text">
        <span className="px-2 border-l-2 border-green-200 dark:border-gray-700 first:border-0">대표전화: <a href="tel:010-1234-5678" className="underline hover:text-green-900 dark:hover:text-gray-100 transition-colors font-medium">010-1234-5678</a></span>
        <span className="px-2 border-l-2 border-green-200 dark:border-gray-700 first:border-0 hidden sm:inline">주소: 서울시 강남구 테헤란로 123</span>
        <span className="px-2 border-l-2 border-green-200 dark:border-gray-700 first:border-0 hidden md:inline">사업자등록번호: 123-45-67890</span>
      </div>
      <div className="mt-2 md:mt-0 text-xs text-green-500 dark:text-gray-400 elegant-accent">© {new Date().getFullYear()} 바이칼 재가복지센터. All rights reserved.</div>
    </div>
  </footer>
);

export default Footer;
