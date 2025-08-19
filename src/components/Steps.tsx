import React from "react";

const Steps: React.FC = () => (
  <section className="py-8">
    <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">서비스 이용 절차</h3>
    <ol className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
      <li className="flex flex-col items-center">
        <span className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold mb-2">1</span>
        <span className="font-medium">상담 신청</span>
      </li>
      <li className="flex flex-col items-center">
        <span className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold mb-2">2</span>
        <span className="font-medium">방문 상담</span>
      </li>
      <li className="flex flex-col items-center">
        <span className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold mb-2">3</span>
        <span className="font-medium">서비스 신청</span>
      </li>
      <li className="flex flex-col items-center">
        <span className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold mb-2">4</span>
        <span className="font-medium">맞춤 케어 시작</span>
      </li>
    </ol>
  </section>
);

export default Steps;
