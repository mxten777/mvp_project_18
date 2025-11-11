import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../common/Card";
import Button from "../common/Button";

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
    <div className="max-w-4xl mx-auto py-10 px-2">
      <h2 className="text-2xl font-bold mb-8 text-green-600 dark:text-gray-100 text-center tracking-tight select-none" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>관리자 대시보드</h2>

      {/* 통계 영역 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <Card className="flex flex-col items-center py-7 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="text-3xl font-extrabold text-green-600 dark:text-gray-100 mb-1">{stats.notices}</div>
          <div className="text-base text-green-500 dark:text-green-300 font-semibold">공지</div>
        </Card>
        <Card className="flex flex-col items-center py-7 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="text-3xl font-extrabold text-green-600 dark:text-gray-100 mb-1">{stats.downloads}</div>
          <div className="text-base text-green-500 dark:text-green-300 font-semibold">자료</div>
        </Card>
        <Card className="flex flex-col items-center py-7 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="text-3xl font-extrabold text-green-600 dark:text-gray-100 mb-1">{stats.users}</div>
          <div className="text-base text-green-500 dark:text-green-300 font-semibold">회원</div>
        </Card>
        <Card className="flex flex-col items-center py-7 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="text-3xl font-extrabold text-green-600 dark:text-gray-100 mb-1">{stats.applications}</div>
          <div className="text-base text-green-500 dark:text-green-300 font-semibold">신청서</div>
        </Card>
      </div>

      {/* 최근 활동 로그 */}
      <Card className="mb-10 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-7">
        <div className="font-bold mb-3 text-green-600 dark:text-gray-100 text-lg">최근 활동 로그</div>
        <ul className="text-base text-green-700 dark:text-green-300 space-y-2">
          {logs.map((log, i) => (
            <li key={i} className="flex justify-between items-center gap-2">
              <span className="text-green-400 dark:text-green-200 font-mono text-xs md:text-sm">{log.time}</span>
              <span className="font-semibold">{log.action}</span>
              <span className="text-green-300 dark:text-green-100 text-xs md:text-sm">{log.user}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="flex flex-col items-center py-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <span className="text-4xl mb-3">📢</span>
          <div className="font-bold mb-1 text-green-700 dark:text-gray-100">공지사항 관리</div>
          <div className="text-base text-green-500 dark:text-green-300 mb-4">공지 등록/수정/삭제</div>
          <Button className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 dark:active:bg-green-900 text-white font-bold rounded-xl py-2 transition focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2" onClick={() => navigate('/admin/notice')}>이동</Button>
        </Card>
        <Card className="flex flex-col items-center py-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <span className="text-4xl mb-3">📁</span>
          <div className="font-bold mb-1 text-green-700 dark:text-gray-100">자료실 관리</div>
          <div className="text-base text-green-500 dark:text-green-300 mb-4">자료 등록/수정/삭제</div>
          <Button className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 dark:active:bg-green-900 text-white font-bold rounded-xl py-2 transition focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2" onClick={() => navigate('/admin/download')}>이동</Button>
        </Card>
        <Card className="flex flex-col items-center py-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <span className="text-4xl mb-3">👤</span>
          <div className="font-bold mb-1 text-green-700 dark:text-gray-100">회원 관리</div>
          <div className="text-base text-green-500 dark:text-green-300 mb-4">회원 목록/권한 관리</div>
          <Button className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 dark:active:bg-green-900 text-white font-bold rounded-xl py-2 transition focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2" onClick={() => navigate('/admin/user')}>이동</Button>
        </Card>
        <Card className="flex flex-col items-center py-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <span className="text-4xl mb-3">📝</span>
          <div className="font-bold mb-1 text-green-700 dark:text-gray-100">신청서 관리</div>
          <div className="text-base text-green-500 dark:text-green-300 mb-4">신청 내역 확인/승인/거절</div>
          <Button className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 dark:active:bg-green-900 text-white font-bold rounded-xl py-2 transition focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2" onClick={() => navigate('/admin/application')}>이동</Button>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
