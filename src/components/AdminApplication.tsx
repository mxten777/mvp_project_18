import React, { useState } from "react";

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
    <div className="max-w-3xl mx-auto py-8 relative">
      {/* Toast 알림 */}
      {toast && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg text-white animate-fadein ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
          style={{ minWidth: 180, textAlign: "center" }}
          role="alert"
        >
          {toast.message}
        </div>
      )}
      {/* 로딩 스피너 */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-40 animate-fadein">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <style>{`
        @keyframes fadein { from { opacity: 0; transform: translateY(-10px);} to { opacity: 1; transform: none; } }
        .animate-fadein { animation: fadein 0.3s; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
      <h3 className="text-xl font-bold mb-4 text-blue-700 text-center">신청서 관리</h3>
      <ul className="space-y-4">
        {apps.map(a => (
          <li key={a.id} className="bg-gray-50 rounded p-4 shadow flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-semibold">{a.name} <span className="text-xs text-gray-400">({a.phone})</span></div>
              <div className="text-sm text-gray-600 mb-1">서비스: {a.service}</div>
              <div className="text-xs text-gray-400">신청일: {a.date}</div>
              <div className="text-xs mt-1">상태: <span className={a.status === "승인" ? "text-green-600" : a.status === "거절" ? "text-red-600" : "text-gray-700"}>{a.status}</span></div>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button
                className="btn btn-green py-2 px-4 text-base focus:outline-none focus:ring-2 focus:ring-green-400 active:bg-green-700"
                onClick={() => setStatus(a.id, "승인")}
                aria-label="승인"
                role="button"
              >승인</button>
              <button
                className="btn btn-red py-2 px-4 text-base focus:outline-none focus:ring-2 focus:ring-red-400 active:bg-red-700"
                onClick={() => setStatus(a.id, "거절")}
                aria-label="거절"
                role="button"
              >거절</button>
              <button
                className="btn btn-gray py-2 px-4 text-base focus:outline-none focus:ring-2 focus:ring-gray-400 active:bg-gray-400"
                onClick={() => setStatus(a.id, "대기")}
                aria-label="대기"
                role="button"
              >대기</button>
              <button
                className="btn btn-red py-2 px-4 text-base focus:outline-none focus:ring-2 focus:ring-red-400 active:bg-red-700"
                onClick={() => deleteApp(a.id)}
                aria-label="삭제"
                role="button"
              >삭제</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminApplication;
