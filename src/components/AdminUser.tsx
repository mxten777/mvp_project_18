import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
}

const initialUsers: User[] = [
  { id: 1, name: "홍길동", email: "hong@test.com", role: "admin" },
  { id: 2, name: "김철수", email: "kim@test.com", role: "user" },
];

const AdminUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const toggleRole = (id: number) => {
    setLoading(true);
    setTimeout(() => {
      setUsers(users.map(u => u.id === id ? { ...u, role: u.role === "admin" ? "user" : "admin" } : u));
      setLoading(false);
      setToast({ type: "success", message: "권한 변경 완료" });
    }, 700);
  };

  const deleteUser = (id: number) => {
    setLoading(true);
    setTimeout(() => {
      setUsers(users.filter(u => u.id !== id));
      setLoading(false);
      setToast({ type: "success", message: "삭제 완료" });
    }, 700);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 relative">
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
      <h3 className="text-xl font-bold mb-4 text-blue-700 text-center">회원 관리</h3>
      <ul className="space-y-4">
        {users.map(u => (
          <li key={u.id} className="bg-gray-50 rounded p-4 shadow flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-semibold">{u.name} <span className="text-xs text-gray-400">({u.email})</span></div>
              <div className="text-sm text-gray-600 mb-1">권한: <span className={u.role === "admin" ? "text-blue-600" : "text-gray-700"}>{u.role}</span></div>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button
                className="btn btn-green py-2 px-4 text-base focus:outline-none focus:ring-2 focus:ring-green-400 active:bg-green-700"
                onClick={() => toggleRole(u.id)}
                aria-label={u.role === "admin" ? "일반회원 전환" : "관리자 전환"}
                role="button"
              >{u.role === "admin" ? "일반회원 전환" : "관리자 전환"}</button>
              <button
                className="btn btn-red py-2 px-4 text-base focus:outline-none focus:ring-2 focus:ring-red-400 active:bg-red-700"
                onClick={() => deleteUser(u.id)}
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

export default AdminUser;
