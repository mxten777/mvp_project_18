import React from "react";


const Dashboard: React.FC = () => (
  <section className="py-16 px-2 md:px-0 max-w-2xl mx-auto bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 rounded-2xl shadow-xl mt-8">
    <h2
      className="text-2xl md:text-3xl font-extrabold text-green-700 dark:text-gray-100 mb-10 text-center tracking-tight select-none"
      style={{ fontFamily: 'Pretendard,Noto Sans KR,sans-serif' }}
    >
      관리자 대시보드
    </h2>
    <div className="space-y-7">
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-7 flex flex-col items-center">
        <span className="font-bold text-green-700 dark:text-gray-100 text-lg mb-2">상담 신청 내역</span>
        <div className="text-gray-400 dark:text-gray-300 text-sm">(Firebase 연동 시 목록 표시)</div>
      </div>
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-7 flex flex-col items-center">
        <span className="font-bold text-green-700 dark:text-gray-100 text-lg mb-2">후기 / FAQ / 서비스 관리</span>
        <div className="text-gray-400 dark:text-gray-300 text-sm">(Firebase 연동 시 관리 기능 제공)</div>
      </div>
    </div>
  </section>
);

export default Dashboard;
