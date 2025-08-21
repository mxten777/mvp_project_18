import React from "react";

const downloads = [
  { name: "이용안내문.pdf", url: "#", desc: "센터 서비스 이용안내문 (PDF)" },
  { name: "상담신청서.hwp", url: "#", desc: "상담신청서 양식 (한글)" },
  { name: "요양보호사 채용공고.pdf", url: "#", desc: "2025년 요양보호사 채용공고 (PDF)" },
];

const DownloadList: React.FC = () => (
  <section className="py-10 max-w-2xl mx-auto px-2">
    <h3 className="text-2xl font-bold text-center text-green-600 mb-7 tracking-tight select-none" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>자료실 / 다운로드</h3>
    <ul className="space-y-5">
      {downloads.map((d, i) => (
        <li key={i} className="bg-white/90 rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:shadow-2xl transition">
          <div>
            <span className="font-semibold text-gray-900 text-base">{d.name}</span>
            <span className="ml-2 text-gray-500 text-sm">{d.desc}</span>
          </div>
          <a
            href={d.url}
            download
            className="inline-block px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold text-base shadow-md transition focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            aria-label={`${d.name} 다운로드`}
            style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}
          >
            다운로드
          </a>
        </li>
      ))}
    </ul>
  </section>
);

export default DownloadList;
