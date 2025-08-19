import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  // 임시 통계/로그 데이터 (실제 연동 전까지)
  const stats = {
    notices: 12,
    downloads: 7,
    users: 25,
    applications: 5,
  };
  const logs = [
    { time: "2025-08-19 10:12", action: "공지사항 등록", user: "admin" },
    { time: "2025-08-19 09:55", action: "회원 삭제", user: "admin" },
    { time: "2025-08-18 17:30", action: "자료실 파일 수정", user: "admin" },
    { time: "2025-08-18 15:10", action: "신청서 승인", user: "admin" },
  ];
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">관리자 대시보드</h2>

      {/* 통계 영역 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">{stats.notices}</div>
          <div className="text-sm text-gray-600">공지</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">{stats.downloads}</div>
          <div className="text-sm text-gray-600">자료</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">{stats.users}</div>
          <div className="text-sm text-gray-600">회원</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">{stats.applications}</div>
          <div className="text-sm text-gray-600">신청서</div>
        </div>
      </div>

      {/* 최근 활동 로그 */}
      <div className="bg-white rounded-lg shadow p-4 mb-8">
        <div className="font-semibold mb-2 text-blue-700">최근 활동 로그</div>
        <ul className="text-sm text-gray-700 space-y-1">
          {logs.map((log, i) => (
            <li key={i} className="flex justify-between">
              <span>{log.time}</span>
              <span>{log.action}</span>
              <span className="text-gray-400">{log.user}</span>
            </li>
          ))}
        </ul>
      </div>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-4xl mb-2">📢</span>
          <div className="font-semibold mb-1">공지사항 관리</div>
          <div className="text-sm text-gray-500 mb-2">공지 등록/수정/삭제</div>
          <button className="btn btn-blue w-full" onClick={() => navigate("/admin/notice")}>이동</button>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-4xl mb-2">📁</span>
          <div className="font-semibold mb-1">자료실 관리</div>
          <div className="text-sm text-gray-500 mb-2">자료 등록/수정/삭제</div>
          <button className="btn btn-blue w-full" onClick={() => navigate("/admin/download")}>이동</button>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-4xl mb-2">👤</span>
          <div className="font-semibold mb-1">회원 관리</div>
          <div className="text-sm text-gray-500 mb-2">회원 목록/권한 관리</div>
          <button className="btn btn-blue w-full" onClick={() => navigate("/admin/user")}>이동</button>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-4xl mb-2">📝</span>
          <div className="font-semibold mb-1">신청서 관리</div>
          <div className="text-sm text-gray-500 mb-2">신청 내역 확인/승인/거절</div>
          <button className="btn btn-blue w-full" onClick={() => navigate("/admin/application")}>이동</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
