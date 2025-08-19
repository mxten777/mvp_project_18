import React from "react";

const Steps: React.FC = () => (
  <section className="py-12 bg-gradient-to-br from-blue-50 via-yellow-50 to-white">
    <h3 className="text-2xl md:text-3xl font-extrabold text-blue-800 mb-8 text-center font-serif tracking-tight">서비스 이용 절차</h3>
    <ol className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
      <li className="flex flex-col items-center">
        <span className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-200 to-yellow-100 text-blue-800 rounded-full font-extrabold text-2xl mb-3 shadow-lg border-2 border-blue-100">1</span>
        <span className="font-bold text-lg text-blue-700">상담 신청</span>
      </li>
      <li className="flex flex-col items-center">
        <span className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-200 to-yellow-100 text-blue-800 rounded-full font-extrabold text-2xl mb-3 shadow-lg border-2 border-blue-100">2</span>
        <span className="font-bold text-lg text-blue-700">방문 상담</span>
      </li>
      <li className="flex flex-col items-center">
        <span className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-200 to-yellow-100 text-blue-800 rounded-full font-extrabold text-2xl mb-3 shadow-lg border-2 border-blue-100">3</span>
        <span className="font-bold text-lg text-blue-700">서비스 신청</span>
      </li>
      <li className="flex flex-col items-center">
        <span className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-200 to-yellow-100 text-blue-800 rounded-full font-extrabold text-2xl mb-3 shadow-lg border-2 border-blue-100">4</span>
        <span className="font-bold text-lg text-blue-700">맞춤 케어 시작</span>
      </li>
    </ol>
  </section>
);

export default Steps;
