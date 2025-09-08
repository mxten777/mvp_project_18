import React from "react";
import Card from "./Card";

const Features: React.FC = () => (
  <section className="py-16 bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 shadow-xl w-full mt-6">
    <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-3 px-6 md:px-8">
      <Card className="flex flex-col items-center bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-7">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-200 to-green-100 dark:from-gray-800 dark:to-gray-700 shadow text-4xl mb-4 border-2 border-green-200 dark:border-gray-700">💸</span>
        <h3 className="font-extrabold text-xl mb-2 text-green-700 dark:text-gray-100 tracking-tight" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>국가 지원금 85% 이상</h3>
        <p className="text-green-600 dark:text-gray-300 text-center text-lg font-medium">비용 부담을 크게 줄여드립니다.</p>
      </Card>
      <Card className="flex flex-col items-center bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-7">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-200 to-green-100 dark:from-gray-800 dark:to-gray-700 shadow text-4xl mb-4 border-2 border-green-200 dark:border-gray-700">📞</span>
        <h3 className="font-extrabold text-xl mb-2 text-green-700 dark:text-gray-100 tracking-tight" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>전화 한 통 통합 서비스</h3>
        <p className="text-green-600 dark:text-gray-300 text-center text-lg font-medium">방문요양, 간호, 목욕 등 한번에 신청 가능.</p>
      </Card>
      <Card className="flex flex-col items-center bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-7">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-200 to-green-100 dark:from-gray-800 dark:to-gray-700 shadow text-4xl mb-4 border-2 border-green-200 dark:border-gray-700">👩‍⚕️</span>
        <h3 className="font-extrabold text-xl mb-2 text-green-700 dark:text-gray-100 tracking-tight" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>간호사 직접 방문</h3>
        <p className="text-green-600 dark:text-gray-300 text-center text-lg font-medium">전문 의료인이 어르신 상태를 직접 확인·관리.</p>
      </Card>
    </div>
  </section>
);

export default Features;
