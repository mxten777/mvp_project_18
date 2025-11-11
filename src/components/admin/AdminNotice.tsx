import React, { useState } from "react";
import Button from "../common/Button";
import Card from "../common/Card";

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
}

const initialNotices: Notice[] = [
  { id: 1, title: "첫 공지", content: "공지사항 예시입니다.", date: "2025-08-19" },
  { id: 2, title: "두번째 공지", content: "두번째 공지 내용입니다.", date: "2025-08-18" },
];

const AdminNotice: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState<Notice | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const PAGE_SIZE = 5;

  const addNotice = async () => {
    if (!title.trim() || !content.trim()) {
      setToast({ type: "error", message: "제목과 내용을 입력하세요." });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setNotices([
        { id: Date.now(), title, content, date: new Date().toISOString().slice(0, 10) },
        ...notices,
      ]);
      setTitle("");
      setContent("");
      setLoading(false);
      setToast({ type: "success", message: "공지 등록 완료" });
    }, 700);
  };

  const deleteNotice = (id: number) => {
    setLoading(true);
    setTimeout(() => {
      setNotices(notices.filter((n) => n.id !== id));
      if (editId === id) {
        setEditId(null);
        setEditTitle("");
        setEditContent("");
      }
      setLoading(false);
      setToast({ type: "success", message: "삭제 완료" });
    }, 700);
  };

  const startEdit = (n: Notice) => {
    setEditId(n.id);
    setEditTitle(n.title);
    setEditContent(n.content);
  };

  const saveEdit = (id: number) => {
    if (!editTitle.trim() || !editContent.trim()) {
      setToast({ type: "error", message: "제목과 내용을 입력하세요." });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setNotices(notices.map(n => n.id === id ? { ...n, title: editTitle, content: editContent } : n));
      setEditId(null);
      setEditTitle("");
      setEditContent("");
      setLoading(false);
      setToast({ type: "success", message: "수정 완료" });
    }, 700);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditContent("");
  };

  return (
    <div className="max-w-2xl mx-auto py-8 relative bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Toast 알림 */}
      {toast && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-7 py-3 rounded-xl shadow-xl text-base font-bold animate-fadein transition-all duration-200 ${toast.type === "success" ? "bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200 border border-green-300 dark:border-green-700" : "bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200 border border-red-200 dark:border-red-700"}`}
          style={{ minWidth: 200, textAlign: "center", boxShadow: '0 4px 24px 0 rgba(0,200,83,0.10)' }}
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
      <h3 className="text-xl font-bold mb-4 text-blue-700 text-center">공지사항 관리</h3>
      <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700">
        <input
          className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 w-full mb-3 text-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-700 transition-all duration-150 text-gray-900 dark:text-gray-100"
          placeholder="제목"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 w-full mb-3 text-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-700 transition-all duration-150 min-h-[90px] text-gray-900 dark:text-gray-100"
          placeholder="내용"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <Button className="w-full mt-2" size="md" onClick={addNotice} aria-label="공지 등록">공지 등록</Button>
      </Card>
      <input
        className="border border-gray-200 dark:border-gray-700 rounded-xl p-3 w-full mb-6 text-base bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-200 dark:focus:ring-green-700 transition-all duration-150 text-gray-900 dark:text-gray-100"
        placeholder="제목 또는 내용 검색"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul className="space-y-6">
        {notices
          .filter(n => n.title.includes(search) || n.content.includes(search))
          .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
          .map(n => (
            <Card key={n.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 bg-white/95 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700">
              {editId === n.id ? (
                <div className="flex-1 mb-2 md:mb-0 md:mr-4">
                  <input
                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-3 w-full mb-2 text-base bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-700 transition-all duration-150 text-gray-900 dark:text-gray-100"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                  />
                  <textarea
                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-3 w-full mb-2 text-base bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-700 transition-all duration-150 min-h-[70px] text-gray-900 dark:text-gray-100"
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => saveEdit(n.id)} aria-label="저장">저장</Button>
                    <Button size="sm" variant="secondary" onClick={cancelEdit} aria-label="취소">취소</Button>
                  </div>
                </div>
              ) : (
                <div>
                  <button className="font-semibold text-left hover:underline text-lg text-green-700 dark:text-green-300" onClick={() => setDetail(n)}>{n.title}</button>
                  <div className="text-base text-gray-700 dark:text-gray-200 mb-1 mt-1">{n.content}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-400">{n.date}</div>
                </div>
              )}
              <div className="flex flex-col gap-2 mt-2 md:mt-0 md:ml-4 min-w-[90px]">
                {editId !== n.id && (
                  <Button size="sm" variant="secondary" onClick={() => startEdit(n)} aria-label="수정">수정</Button>
                )}
                <Button size="sm" variant="secondary" onClick={() => deleteNotice(n.id)} aria-label="삭제">삭제</Button>
              </div>
            </Card>
        ))}
      </ul>
      {/* 페이징 */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: Math.ceil(notices.filter(n => n.title.includes(search) || n.content.includes(search)).length / PAGE_SIZE) }, (_, i) => (
          <Button
            key={i}
            size="sm"
            variant={page === i + 1 ? "primary" : "secondary"}
            className={page === i + 1 ? "!bg-blue-600 !text-white" : "!bg-gray-200 !text-blue-700"}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
      {detail && (
        <div className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadein">
          <div className="bg-white/95 dark:bg-gray-900/95 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl p-8 max-w-md w-full relative animate-fadein">
            <button
              className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900 text-2xl text-gray-400 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-700 transition-all duration-150"
              onClick={() => setDetail(null)}
              aria-label="닫기"
              type="button"
            >
              &times;
            </button>
            <div className="text-2xl font-extrabold mb-4 text-green-700 dark:text-green-300 tracking-tight">{detail.title}</div>
            <div className="text-base text-gray-700 dark:text-gray-200 mb-6 whitespace-pre-line">{detail.content}</div>
            <div className="text-xs text-gray-400 dark:text-gray-400 text-right">{detail.date}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotice;
