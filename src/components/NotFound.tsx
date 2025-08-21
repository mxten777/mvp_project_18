import React from "react";

const NotFound: React.FC = () => (
  <section className="py-20 flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-green-50/60 to-white/90 rounded-2xl shadow-xl mx-2 mt-8">
    <h1 className="text-6xl font-extrabold text-green-600 mb-4 tracking-tight select-none" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>404</h1>
    <p className="text-lg text-gray-700 mb-7">페이지를 찾을 수 없습니다.</p>
    <a
      href="/"
      className="px-7 py-3 rounded-xl bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold text-base shadow-md transition focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}
    >
      홈으로 돌아가기
    </a>
  </section>
);

export default NotFound;
