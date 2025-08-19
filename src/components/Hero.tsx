import React from "react";
import Button from "./Button";

const Hero: React.FC = () => (
  <section className="relative py-16 md:py-24 bg-gradient-to-br from-blue-50 via-yellow-50 to-white flex flex-col items-center justify-center overflow-hidden">
    <div className="absolute inset-0 pointer-events-none select-none">
      <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path fill="#e0e7ff" fillOpacity="0.25" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,154.7C840,149,960,171,1080,186.7C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
      </svg>
    </div>
    <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto px-4">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-200 to-yellow-100 shadow-lg mb-6 border-4 border-white">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="22" stroke="#2563eb" strokeWidth="3" fill="#fffbe9" />
          <path d="M16 30c3-6 15-6 18 0" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="20" cy="22" r="2.5" fill="#2563eb"/>
          <circle cx="28" cy="22" r="2.5" fill="#2563eb"/>
        </svg>
      </div>
      <h2 className="text-3xl md:text-5xl font-extrabold text-blue-800 mb-4 drop-shadow-sm font-serif tracking-tight leading-tight">
        부모님 돌보시는 분들에게<br className="hidden md:block" />
        <span className="bg-gradient-to-r from-yellow-200 via-blue-100 to-yellow-100 px-2 rounded-xl text-blue-900">마음의 짐을 덜어드리겠습니다.</span>
      </h2>
      <p className="text-xl md:text-2xl text-blue-700 mb-8 font-medium drop-shadow-sm">국가 지원금 85% 이상, 전화 한 통으로 통합 방문요양/간호/목욕 서비스</p>
      <Button
        size="lg"
        aria-label="상담신청 바로가기"
        onClick={() => window.location.href = "/apply"}
        className="flex items-center gap-2"
      >
        <svg width="24" height="24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
        상담신청 바로가기
      </Button>
    </div>
  </section>
);

export default Hero;
