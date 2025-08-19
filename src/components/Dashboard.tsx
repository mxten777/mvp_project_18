import React from "react";

const Dashboard: React.FC = () => (
  <section className="py-8 max-w-2xl mx-auto">
    <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">관리자 대시보드 (샘플)</h3>
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div>
        <span className="font-semibold">상담 신청 내역</span>
        <div className="text-gray-500 text-sm mt-1">(Firebase 연동 시 목록 표시)</div>
      </div>
      <div>
        <span className="font-semibold">후기/FAQ/서비스 관리</span>
        <div className="text-gray-500 text-sm mt-1">(Firebase 연동 시 관리 기능 제공)</div>
      </div>
    </div>
  </section>
);

export default Dashboard;
