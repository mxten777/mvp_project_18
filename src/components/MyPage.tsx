import React from "react";

const MyPage: React.FC = () => {
  // 임시 통계/로그 데이터 (실제 연동 전까지)
  const stats = {
    applications: 3,
    inquiries: 2,
    lastLogin: "2025-08-19 09:00",
  };
  const logs = [
    { time: "2025-08-19 08:55", action: "상담신청", detail: "방문요양" },
    { time: "2025-08-18 17:20", action: "문의 등록", detail: "서비스 문의" },
    { time: "2025-08-18 15:00", action: "비밀번호 변경", detail: "" },
  ];
  return (
    <section className="py-8 max-w-xl mx-auto">
      <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">마이페이지</h3>
      {/* 내 활동 통계 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">{stats.applications}</div>
          <div className="text-sm text-gray-600">상담신청</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">{stats.inquiries}</div>
          <div className="text-sm text-gray-600">문의</div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 space-y-4 mb-6">
        <div>
          <span className="font-semibold">최근 로그인</span>
          <div className="text-gray-500 text-sm mt-1">{stats.lastLogin}</div>
        </div>
        <div>
          <span className="font-semibold">내 정보</span>
          <div className="text-gray-500 text-sm mt-1">(이름, 연락처 등, 추후 구현)</div>
        </div>
        <div>
          <span className="font-semibold">비밀번호 변경</span>
          <div className="text-gray-500 text-sm mt-1">(추후 구현)</div>
        </div>
      </div>
      {/* 최근 활동 로그 */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="font-semibold mb-2 text-blue-700">최근 내 활동 로그</div>
        <ul className="text-sm text-gray-700 space-y-1">
          {logs.map((log, i) => (
            <li key={i} className="flex justify-between">
              <span>{log.time}</span>
              <span>{log.action}</span>
              <span className="text-gray-400">{log.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MyPage;
