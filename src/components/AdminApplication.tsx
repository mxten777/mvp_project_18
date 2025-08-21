import React, { useState } from "react";
import Button from "./Button";
import Card from "./Card";

interface Application {
  id: number;
  name: string;
  phone: string;
  service: string;
  status: "대기" | "승인" | "거절";
  date: string;
}

const initialApplications: Application[] = [
  { id: 1, name: "홍길동", phone: "010-1234-5678", service: "방문요양", status: "대기", date: "2025-08-19" },
  { id: 2, name: "김철수", phone: "010-2222-3333", service: "방문간호", status: "승인", date: "2025-08-18" },
];

const AdminApplication: React.FC = () => {
  const [apps, setApps] = useState<Application[]>(initialApplications);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const setStatus = (id: number, status: "대기" | "승인" | "거절") => {
    setLoading(true);
    setTimeout(() => {
      setApps(apps.map(a => a.id === id ? { ...a, status } : a));
      setLoading(false);
      setToast({ type: "success", message: `상태 변경: ${status}` });
    }, 700);
  };

  const deleteApp = (id: number) => {
    setLoading(true);
    setTimeout(() => {
      setApps(apps.filter(a => a.id !== id));
      setLoading(false);
      setToast({ type: "success", message: "삭제 완료" });
    }, 700);
  };

  return (
  <div className="max-w-3xl mx-auto py-10 px-2 relative">
      {/* Toast 알림 */}
      {toast && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-xl text-white animate-fadein ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
          style={{ minWidth: 180, textAlign: "center", fontFamily:'Pretendard,Noto Sans KR,sans-serif' }}
          role="alert"
        >
          {toast.message}
        </div>
      )}
      {/* 로딩 스피너 */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-40 animate-fadein">
          <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <style>{`
        @keyframes fadein { from { opacity: 0; transform: translateY(-10px);} to { opacity: 1; transform: none; } }
        .animate-fadein { animation: fadein 0.3s; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
      <h3 className="text-2xl font-bold mb-7 text-center text-green-600 tracking-tight select-none" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>신청서 관리</h3>
      <ul className="space-y-6">
        {apps.map(a => (
          <Card key={a.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-7 bg-white/90 rounded-2xl shadow-lg border border-gray-100">
            <div>
              <div className="font-semibold text-lg text-green-700">{a.name} <span className="text-xs text-green-300">({a.phone})</span></div>
              <div className="text-base text-green-500 mb-1">서비스: {a.service}</div>
              <div className="text-xs text-green-300">신청일: {a.date}</div>
              <div className="text-xs mt-1">상태: <span className={a.status === "승인" ? "text-green-600 font-bold" : a.status === "거절" ? "text-red-600 font-bold" : "text-green-400"}>{a.status}</span></div>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0 min-w-[180px] flex-wrap">
              <Button size="sm" variant="secondary" className="bg-green-100 hover:bg-green-200 text-green-700 font-bold rounded-xl transition" onClick={() => setStatus(a.id, "승인")}>승인</Button>
              <Button size="sm" variant="secondary" className="bg-red-100 hover:bg-red-200 text-red-600 font-bold rounded-xl transition" onClick={() => setStatus(a.id, "거절")}>거절</Button>
              <Button size="sm" variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl transition" onClick={() => setStatus(a.id, "대기")}>대기</Button>
              <Button size="sm" variant="secondary" className="bg-red-100 hover:bg-red-200 text-red-600 font-bold rounded-xl transition" onClick={() => deleteApp(a.id)}>삭제</Button>
            </div>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default AdminApplication;
