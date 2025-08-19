import React from "react";

const downloads = [
  { name: "이용안내문.pdf", url: "#", desc: "센터 서비스 이용안내문 (PDF)" },
  { name: "상담신청서.hwp", url: "#", desc: "상담신청서 양식 (한글)" },
  { name: "요양보호사 채용공고.pdf", url: "#", desc: "2025년 요양보호사 채용공고 (PDF)" },
];

const DownloadList: React.FC = () => (
  <section className="py-8 max-w-2xl mx-auto">
    <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">자료실 / 다운로드</h3>
    <ul className="space-y-4">
      {downloads.map((d, i) => (
        <li key={i} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <span className="font-semibold">{d.name}</span>
            <span className="ml-2 text-gray-500 text-sm">{d.desc}</span>
          </div>
          <a
            href={d.url}
            download
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label={`${d.name} 다운로드`}
          >
            다운로드
          </a>
        </li>
      ))}
    </ul>
  </section>
);

export default DownloadList;
