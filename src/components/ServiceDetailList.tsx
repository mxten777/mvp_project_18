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
  <section className="py-8 max-w-2xl mx-auto">
    <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">서비스 상세 안내</h3>
    <ul className="space-y-4">
      {serviceDetails.map((s, i) => (
        <li key={i} className="bg-white rounded-lg shadow p-4">
          <div className="font-semibold text-lg mb-1">{s.title}</div>
          <div className="text-gray-700 text-sm">{s.desc}</div>
        </li>
      ))}
    </ul>
  </section>
);

export default ServiceDetailList;
