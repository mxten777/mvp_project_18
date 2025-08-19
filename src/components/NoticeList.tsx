import React from "react";

const notices = [
  { title: "2025년 8월 센터 휴무 안내", date: "2025-08-01", content: "광복절(8/15) 휴무입니다." },
  { title: "여름철 건강관리 안내문 배포", date: "2025-07-20", content: "폭염 대비 건강수칙 안내문을 배포합니다." },
  { title: "신규 요양보호사 채용 공고", date: "2025-07-01", content: "신규 요양보호사 채용을 진행합니다. 자세한 내용은 문의 바랍니다." },
];

const NoticeList: React.FC = () => (
  <section className="py-8 max-w-2xl mx-auto">
    <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">공지사항</h3>
    <ul className="space-y-4">
      {notices.map((n, i) => (
        <li key={i} className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold">{n.title}</span>
            <span className="text-xs text-gray-400">{n.date}</span>
          </div>
          <div className="text-gray-700 text-sm">{n.content}</div>
        </li>
      ))}
    </ul>
  </section>
);

export default NoticeList;
