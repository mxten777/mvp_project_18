import React from "react";
import Button from "./Button";

const Hero: React.FC = () => (
  <section className="relative py-16 md:py-20 bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 flex flex-col items-center justify-center overflow-hidden rounded-2xl shadow-xl mx-2 mt-4">
    <div className="absolute inset-0 pointer-events-none select-none hidden md:block">
      <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path fill="#e0e7ff" fillOpacity="0.25" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,154.7C840,149,960,171,1080,186.7C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
      </svg>
    </div>
    <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto px-4">
  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-200 to-green-100 dark:from-gray-800 dark:to-gray-700 shadow-lg mb-4 border-4 border-white dark:border-gray-700">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="22" stroke="#2563eb" strokeWidth="3" fill="#fffbe9" />
          <path d="M16 30c3-6 15-6 18 0" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="20" cy="22" r="2.5" fill="#2563eb"/>
          <circle cx="28" cy="22" r="2.5" fill="#2563eb"/>
        </svg>
      </div>
  <h2
    className="text-2xl md:text-4xl font-extrabold text-green-700 dark:text-gray-100 mb-3 drop-shadow-sm tracking-tight leading-snug md:leading-relaxed select-none text-center"
    style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}
  >
    <span className="block md:inline">부모님 돌보시는 분들에게</span>
    <span className="block md:inline mt-2 md:mt-0">
      <span className="inline-block bg-gradient-to-r from-green-100 via-white to-green-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 px-2 py-1 rounded-xl text-green-800 dark:text-gray-100 align-middle">
        마음의 짐을 덜어드리겠습니다.
      </span>
    </span>
  </h2>
  <p className="text-base md:text-lg text-green-600 dark:text-gray-300 mb-6 font-medium drop-shadow-sm">
    <span className="text-green-700 dark:text-green-300 font-semibold">국가 지원금 85% 이상</span>
    , 전화 한 통으로 통합 방문요양/간호/목욕 서비스
  </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full justify-center items-center mt-2">
        <Button
          size="lg"
          aria-label="상담신청 바로가기"
          onClick={() => window.location.href = "/apply"}
          className="flex items-center gap-1.5 px-7 py-3 rounded-xl bg-green-500 dark:bg-gray-700 hover:bg-green-600 dark:hover:bg-gray-600 active:bg-green-700 dark:active:bg-gray-800 text-white dark:text-gray-100 font-bold text-base shadow-md transition focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-gray-400 focus:ring-offset-2"
          style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}
        >
          <svg width="24" height="24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
          상담신청 바로가기
        </Button>
        <a
          href="tel:0212345678"
          className="flex items-center gap-1.5 px-7 py-3 rounded-xl bg-white dark:bg-gray-800 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 font-bold text-base shadow-md transition hover:bg-green-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600 focus:ring-offset-2"
          style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}
          aria-label="전화걸기"
        >
          <svg width="22" height="22" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92V21a1 1 0 0 1-1.09 1A19.79 19.79 0 0 1 3 5.09 1 1 0 0 1 4 4h4.09a1 1 0 0 1 1 .75l1.13 4.52a1 1 0 0 1-.29 1L8.21 12.21a16 16 0 0 0 7.58 7.58l1.94-1.94a1 1 0 0 1 1-.29l4.52 1.13a1 1 0 0 1 .75 1V21z"></path></svg>
          전화걸기
        </a>
      </div>
    </div>
  </section>
);

export default Hero;
