import React, { useState } from "react";

interface FileItem {
  id: number;
  name: string;
  desc: string;
  date: string;
}

const initialFiles: FileItem[] = [
  { id: 1, name: "이용안내.pdf", desc: "서비스 이용안내 자료", date: "2025-08-19" },
  { id: 2, name: "신청서.docx", desc: "서비스 신청서 양식", date: "2025-08-18" },
];

const AdminDownload: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState<FileItem | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const PAGE_SIZE = 5;

  const addFile = async () => {
    if (!name.trim() || !desc.trim()) {
      setToast({ type: "error", message: "파일명과 설명을 입력하세요." });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setFiles([
        { id: Date.now(), name, desc, date: new Date().toISOString().slice(0, 10) },
        ...files,
      ]);
      setName("");
      setDesc("");
      setLoading(false);
      setToast({ type: "success", message: "자료 등록 완료" });
    }, 700);
  };

  const deleteFile = (id: number) => {
    setLoading(true);
    setTimeout(() => {
      setFiles(files.filter((f) => f.id !== id));
      if (editId === id) {
        setEditId(null);
        setEditName("");
        setEditDesc("");
      }
      setLoading(false);
      setToast({ type: "success", message: "삭제 완료" });
    }, 700);
  };

  const startEdit = (f: FileItem) => {
    setEditId(f.id);
    setEditName(f.name);
    setEditDesc(f.desc);
  };

  const saveEdit = (id: number) => {
    if (!editName.trim() || !editDesc.trim()) {
      setToast({ type: "error", message: "파일명과 설명을 입력하세요." });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setFiles(files.map(f => f.id === id ? { ...f, name: editName, desc: editDesc } : f));
      setEditId(null);
      setEditName("");
      setEditDesc("");
      setLoading(false);
      setToast({ type: "success", message: "수정 완료" });
    }, 700);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
    setEditDesc("");
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
      <h3 className="text-xl font-bold mb-4 text-blue-700 text-center">자료실 관리</h3>
      <div className="bg-white rounded shadow p-4 mb-6">
        <input
          className="border p-2 w-full mb-2"
          placeholder="파일명"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="설명"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        <button
          className="btn btn-blue w-full py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-700"
          onClick={addFile}
          aria-label="자료 등록"
          role="button"
        >자료 등록</button>
      </div>
      <input
        className="border p-2 w-full mb-4"
        placeholder="파일명 또는 설명 검색"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul className="space-y-4">
        {files
          .filter(f => f.name.includes(search) || f.desc.includes(search))
          .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
          .map(f => (
          <li key={f.id} className="bg-gray-50 rounded p-4 shadow flex flex-col md:flex-row md:items-center md:justify-between">
            {editId === f.id ? (
              <div className="flex-1 mb-2 md:mb-0 md:mr-4">
                <input
                  className="border p-2 w-full mb-2"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                />
                <input
                  className="border p-2 w-full mb-2"
                  value={editDesc}
                  onChange={e => setEditDesc(e.target.value)}
                />
                <div className="flex gap-2">
                  <button className="btn btn-blue py-2 px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-700" onClick={() => saveEdit(f.id)} aria-label="저장" role="button">저장</button>
                  <button className="btn btn-gray py-2 px-4 text-base focus:outline-none focus:ring-2 focus:ring-gray-400 active:bg-gray-400" onClick={cancelEdit} aria-label="취소" role="button">취소</button>
                </div>
              </div>
            ) : (
              <div>
                <button className="font-semibold text-left hover:underline" onClick={() => setDetail(f)}>{f.name}</button>
                <div className="text-sm text-gray-600 mb-1">{f.desc}</div>
                <div className="text-xs text-gray-400">{f.date}</div>
              </div>
            )}
            <div className="flex flex-col gap-2 mt-2 md:mt-0 md:ml-4">
              {editId !== f.id && (
                <button className="btn btn-green py-2 px-4 text-base focus:outline-none focus:ring-2 focus:ring-green-400 active:bg-green-700" onClick={() => startEdit(f)} aria-label="수정" role="button">수정</button>
              )}
              <button className="btn btn-red py-2 px-4 text-base focus:outline-none focus:ring-2 focus:ring-red-400 active:bg-red-700" onClick={() => deleteFile(f.id)} aria-label="삭제" role="button">삭제</button>
            </div>
          </li>
        ))}
      </ul>
      {/* 페이징 */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: Math.ceil(files.filter(f => f.name.includes(search) || f.desc.includes(search)).length / PAGE_SIZE) }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {detail && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setDetail(null)}>&times;</button>
            <div className="text-lg font-bold mb-2">{detail.name}</div>
            <div className="text-gray-700 mb-4 whitespace-pre-line">{detail.desc}</div>
            <div className="text-xs text-gray-400">{detail.date}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDownload;
