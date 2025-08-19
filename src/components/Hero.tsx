import React from "react";

const Hero: React.FC = () => (
  <section className="py-12 text-center">
    <h2 className="text-3xl md:text-5xl font-bold text-blue-700 mb-4">부모님 돌보시는 분들에게<br className="hidden md:block" /> 마음의 짐을 덜어드리겠습니다.</h2>
    <p className="text-lg md:text-xl text-gray-600 mb-6">국가 지원금 85% 이상, 전화 한 통으로 통합 방문요양/간호/목욕 서비스</p>
    <a href="/apply" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label="상담신청 바로가기">상담신청 바로가기</a>
  </section>
);

export default Hero;
