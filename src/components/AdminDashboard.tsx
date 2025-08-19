import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import Button from "./Button";

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <Card className="flex flex-col items-center py-6">
          <div className="text-3xl font-extrabold text-blue-800 mb-1">{stats.notices}</div>
          <div className="text-base text-blue-500 font-semibold">공지</div>
        </Card>
        <Card className="flex flex-col items-center py-6">
          <div className="text-3xl font-extrabold text-blue-800 mb-1">{stats.downloads}</div>
          <div className="text-base text-blue-500 font-semibold">자료</div>
        </Card>
        <Card className="flex flex-col items-center py-6">
          <div className="text-3xl font-extrabold text-blue-800 mb-1">{stats.users}</div>
          <div className="text-base text-blue-500 font-semibold">회원</div>
        </Card>
        <Card className="flex flex-col items-center py-6">
          <div className="text-3xl font-extrabold text-blue-800 mb-1">{stats.applications}</div>
          <div className="text-base text-blue-500 font-semibold">신청서</div>
        </Card>
      </div>

      {/* 최근 활동 로그 */}
      <Card className="mb-10">
        <div className="font-bold mb-3 text-blue-700 text-lg">최근 활동 로그</div>
        <ul className="text-base text-blue-800 space-y-2">
          {logs.map((log, i) => (
            <li key={i} className="flex justify-between items-center gap-2">
              <span className="text-blue-400 font-mono text-xs md:text-sm">{log.time}</span>
              <span className="font-semibold">{log.action}</span>
              <span className="text-blue-300 text-xs md:text-sm">{log.user}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="flex flex-col items-center py-8">
          <span className="text-4xl mb-3">📢</span>
          <div className="font-bold mb-1 text-blue-800">공지사항 관리</div>
          <div className="text-base text-blue-500 mb-4">공지 등록/수정/삭제</div>
          <Button className="w-full" onClick={() => navigate("/admin/notice")}>이동</Button>
        </Card>
        <Card className="flex flex-col items-center py-8">
          <span className="text-4xl mb-3">📁</span>
          <div className="font-bold mb-1 text-blue-800">자료실 관리</div>
          <div className="text-base text-blue-500 mb-4">자료 등록/수정/삭제</div>
          <Button className="w-full" onClick={() => navigate("/admin/download")}>이동</Button>
        </Card>
        <Card className="flex flex-col items-center py-8">
          <span className="text-4xl mb-3">👤</span>
          <div className="font-bold mb-1 text-blue-800">회원 관리</div>
          <div className="text-base text-blue-500 mb-4">회원 목록/권한 관리</div>
          <Button className="w-full" onClick={() => navigate("/admin/user")}>이동</Button>
        </Card>
        <Card className="flex flex-col items-center py-8">
          <span className="text-4xl mb-3">📝</span>
          <div className="font-bold mb-1 text-blue-800">신청서 관리</div>
          <div className="text-base text-blue-500 mb-4">신청 내역 확인/승인/거절</div>
          <Button className="w-full" onClick={() => navigate("/admin/application")}>이동</Button>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
