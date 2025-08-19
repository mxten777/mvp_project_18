import React from "react";

const Features: React.FC = () => (
  <section className="py-8 grid gap-6 md:grid-cols-3">
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
      <span className="text-3xl mb-2">💸</span>
      <h3 className="font-bold text-lg mb-1">국가 지원금 85% 이상</h3>
      <p className="text-gray-600 text-center">비용 부담을 크게 줄여드립니다.</p>
    </div>
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
      <span className="text-3xl mb-2">📞</span>
      <h3 className="font-bold text-lg mb-1">전화 한 통 통합 서비스</h3>
      <p className="text-gray-600 text-center">방문요양, 간호, 목욕 등 한번에 신청 가능.</p>
    </div>
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
      <span className="text-3xl mb-2">👩‍⚕️</span>
      <h3 className="font-bold text-lg mb-1">간호사 직접 방문</h3>
      <p className="text-gray-600 text-center">전문 의료인이 어르신 상태를 직접 확인·관리.</p>
    </div>
  </section>
);

export default Features;
