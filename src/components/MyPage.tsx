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
    <section className="py-10 max-w-xl mx-auto px-2">
      <h3 className="text-2xl font-bold text-center text-green-600 mb-7 tracking-tight select-none" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>마이페이지</h3>
      {/* 내 활동 통계 */}
      <div className="grid grid-cols-2 gap-4 mb-7">
        <div className="bg-green-50 rounded-2xl p-5 text-center shadow-sm border border-green-100">
          <div className="text-3xl font-extrabold text-green-600 mb-1">{stats.applications}</div>
          <div className="text-sm text-gray-600">상담신청</div>
        </div>
        <div className="bg-green-50 rounded-2xl p-5 text-center shadow-sm border border-green-100">
          <div className="text-3xl font-extrabold text-green-600 mb-1">{stats.inquiries}</div>
          <div className="text-sm text-gray-600">문의</div>
        </div>
      </div>
      <div className="bg-white/90 rounded-2xl shadow-xl p-7 space-y-5 mb-7 border border-gray-100">
        <div>
          <span className="font-semibold text-gray-800">최근 로그인</span>
          <div className="text-gray-500 text-sm mt-1">{stats.lastLogin}</div>
        </div>
        <div>
          <span className="font-semibold text-gray-800">내 정보</span>
          <div className="text-gray-500 text-sm mt-1">(이름, 연락처 등, 추후 구현)</div>
        </div>
        <div>
          <span className="font-semibold text-gray-800">비밀번호 변경</span>
          <div className="text-gray-500 text-sm mt-1">(추후 구현)</div>
        </div>
      </div>
      {/* 최근 활동 로그 */}
      <div className="bg-white/90 rounded-2xl shadow p-5 mb-7 border border-gray-100">
        <div className="font-semibold mb-3 text-green-600">최근 내 활동 로그</div>
        <ul className="text-sm text-gray-700 divide-y divide-gray-100">
          {logs.map((log, i) => (
            <li key={i} className="flex justify-between py-2">
              <span className="w-32 text-gray-500">{log.time}</span>
              <span className="w-20 text-green-600 font-medium text-center">{log.action}</span>
              <span className="flex-1 text-gray-400 text-right">{log.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MyPage;
