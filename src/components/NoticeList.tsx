import React from "react";

const notices = [
  { title: "2025년 8월 센터 휴무 안내", date: "2025-08-01", content: "광복절(8/15) 휴무입니다." },
  { title: "여름철 건강관리 안내문 배포", date: "2025-07-20", content: "폭염 대비 건강수칙 안내문을 배포합니다." },
  { title: "신규 요양보호사 채용 공고", date: "2025-07-01", content: "신규 요양보호사 채용을 진행합니다. 자세한 내용은 문의 바랍니다." },
];

const NoticeList: React.FC = () => (
  <section className="py-10 max-w-2xl mx-auto px-2">
    <h3 className="text-2xl font-bold text-center text-green-600 mb-7 tracking-tight select-none" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>공지사항</h3>
    <ul className="space-y-5">
      {notices.map((n, i) => (
        <li key={i} className="bg-white/90 rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-900 text-base">{n.title}</span>
            <span className="text-xs text-gray-400 font-mono">{n.date}</span>
          </div>
          <div className="text-gray-700 text-sm mt-1">{n.content}</div>
        </li>
      ))}
    </ul>
  </section>
);

export default NoticeList;
