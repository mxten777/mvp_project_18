import React, { useState } from "react";
import Button from "./Button";
import Card from "./Card";

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
      <ul className="space-y-6">
        {users.map(u => (
          <Card key={u.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6">
            <div>
              <div className="font-semibold text-lg text-blue-800">{u.name} <span className="text-xs text-blue-300">({u.email})</span></div>
              <div className="text-base text-blue-500 mb-1">권한: <span className={u.role === "admin" ? "text-blue-700 font-bold" : "text-blue-400"}>{u.role}</span></div>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0 min-w-[120px]">
              <Button size="sm" variant="secondary" onClick={() => toggleRole(u.id)} aria-label={u.role === "admin" ? "일반회원 전환" : "관리자 전환"}>
                {u.role === "admin" ? "일반회원 전환" : "관리자 전환"}
              </Button>
              <Button size="sm" variant="secondary" onClick={() => deleteUser(u.id)} aria-label="삭제">삭제</Button>
            </div>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default AdminUser;
