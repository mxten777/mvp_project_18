import React, { useState } from "react";
import Button from "./Button";
import Card from "./Card";

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
      <Card className="mb-6">
        <input
          className="border-2 border-blue-200 rounded-xl p-3 w-full mb-3 text-lg focus:ring-2 focus:ring-blue-300"
          placeholder="파일명"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="border-2 border-blue-200 rounded-xl p-3 w-full mb-3 text-lg focus:ring-2 focus:ring-blue-300"
          placeholder="설명"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        <Button className="w-full mt-2" size="md" onClick={addFile} aria-label="자료 등록">자료 등록</Button>
      </Card>
      <input
        className="border-2 border-blue-100 rounded-xl p-3 w-full mb-6 text-base focus:ring-2 focus:ring-blue-200"
        placeholder="파일명 또는 설명 검색"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul className="space-y-6">
        {files
          .filter(f => f.name.includes(search) || f.desc.includes(search))
          .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
          .map(f => (
            <Card key={f.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6">
              {editId === f.id ? (
                <div className="flex-1 mb-2 md:mb-0 md:mr-4">
                  <input
                    className="border-2 border-blue-200 rounded-xl p-2 w-full mb-2 text-base focus:ring-2 focus:ring-blue-300"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                  />
                  <input
                    className="border-2 border-blue-200 rounded-xl p-2 w-full mb-2 text-base focus:ring-2 focus:ring-blue-300"
                    value={editDesc}
                    onChange={e => setEditDesc(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => saveEdit(f.id)} aria-label="저장">저장</Button>
                    <Button size="sm" variant="secondary" onClick={cancelEdit} aria-label="취소">취소</Button>
                  </div>
                </div>
              ) : (
                <div>
                  <button className="font-semibold text-left hover:underline text-lg text-blue-800" onClick={() => setDetail(f)}>{f.name}</button>
                  <div className="text-base text-blue-500 mb-1 mt-1">{f.desc}</div>
                  <div className="text-xs text-blue-300">{f.date}</div>
                </div>
              )}
              <div className="flex flex-col gap-2 mt-2 md:mt-0 md:ml-4 min-w-[90px]">
                {editId !== f.id && (
                  <Button size="sm" variant="secondary" onClick={() => startEdit(f)} aria-label="수정">수정</Button>
                )}
                <Button size="sm" variant="secondary" onClick={() => deleteFile(f.id)} aria-label="삭제">삭제</Button>
              </div>
            </Card>
        ))}
      </ul>
      {/* 페이징 */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: Math.ceil(files.filter(f => f.name.includes(search) || f.desc.includes(search)).length / PAGE_SIZE) }, (_, i) => (
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <Card className="p-8 max-w-md w-full relative animate-fadein">
            <Button className="absolute top-2 right-2 !bg-transparent !shadow-none text-blue-300 hover:text-blue-700 text-2xl px-2 py-0" size="sm" onClick={() => setDetail(null)} aria-label="닫기">&times;</Button>
            <div className="text-xl font-bold mb-3 text-blue-800">{detail.name}</div>
            <div className="text-base text-blue-700 mb-4 whitespace-pre-line">{detail.desc}</div>
            <div className="text-xs text-blue-300">{detail.date}</div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDownload;
