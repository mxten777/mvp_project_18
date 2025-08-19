import React from "react";
import Card from "./Card";

const Features: React.FC = () => (
  <section className="py-12 bg-gradient-to-br from-yellow-50 via-blue-50 to-white">
    <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3 px-4">
      <Card className="flex flex-col items-center">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-200 to-blue-100 shadow text-4xl mb-4 border-2 border-blue-200">💸</span>
        <h3 className="font-extrabold text-xl mb-2 text-blue-800 font-serif tracking-tight">국가 지원금 85% 이상</h3>
        <p className="text-blue-700 text-center text-lg font-medium">비용 부담을 크게 줄여드립니다.</p>
      </Card>
      <Card className="flex flex-col items-center">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-200 to-blue-100 shadow text-4xl mb-4 border-2 border-blue-200">📞</span>
        <h3 className="font-extrabold text-xl mb-2 text-blue-800 font-serif tracking-tight">전화 한 통 통합 서비스</h3>
        <p className="text-blue-700 text-center text-lg font-medium">방문요양, 간호, 목욕 등 한번에 신청 가능.</p>
      </Card>
      <Card className="flex flex-col items-center">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-200 to-blue-100 shadow text-4xl mb-4 border-2 border-blue-200">👩‍⚕️</span>
        <h3 className="font-extrabold text-xl mb-2 text-blue-800 font-serif tracking-tight">간호사 직접 방문</h3>
        <p className="text-blue-700 text-center text-lg font-medium">전문 의료인이 어르신 상태를 직접 확인·관리.</p>
      </Card>
    </div>
  </section>
);

export default Features;
