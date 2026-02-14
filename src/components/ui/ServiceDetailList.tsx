import React from "react";

const serviceDetails = [
  {
    title: "방문요양",
    desc: "요양보호사가 어르신 댁에 방문하여 신체활동, 가사, 정서지원 등 일상생활을 돕는 서비스입니다.",
  },
  {
    title: "방문간호",
    desc: "간호사 등 전문 인력이 방문하여 건강상태 확인, 상처/투약/영양관리 등 의료적 서비스를 제공합니다.",
  },
  {
    title: "방문목욕",
    desc: "목욕차량 또는 전문 인력이 어르신 댁에 방문하여 안전하게 목욕을 도와드립니다.",
  },
];

const ServiceDetailList: React.FC = () => (
  <section className="py-10 max-w-2xl mx-auto px-2">
    <h3 className="text-2xl font-bold text-center text-green-600 dark:text-gray-100 mb-7 tracking-tight select-none" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>서비스 상세 안내</h3>
    <ul className="space-y-5">
      {serviceDetails.map((s, i) => (
        <li key={i} className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 hover:shadow-2xl transition">
          <div className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">{s.title}</div>
          <div className="text-gray-700 dark:text-gray-300 text-sm">{s.desc}</div>
        </li>
      ))}
    </ul>
  </section>
);

export default ServiceDetailList;
