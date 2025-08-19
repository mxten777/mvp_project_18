import React from "react";

const faqs = [
  {
    q: "서비스 신청은 어떻게 하나요?",
    a: "상단 메뉴의 상담신청을 통해 간단히 신청하실 수 있습니다.",
  },
  {
    q: "국가 지원금은 얼마나 받을 수 있나요?",
    a: "대부분 85% 이상 지원받으실 수 있습니다. 자세한 내용은 상담 시 안내해드립니다.",
  },
  {
    q: "방문간호/요양/목욕 모두 신청 가능한가요?",
    a: "네, 전화 한 통으로 통합 신청이 가능합니다.",
  },
];

const FAQList: React.FC = () => (
  <section className="py-8">
    <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">자주 묻는 질문</h3>
    <div className="space-y-4 max-w-2xl mx-auto">
      {faqs.map((faq, i) => (
        <details key={i} className="bg-white rounded-lg shadow p-4">
          <summary className="font-semibold cursor-pointer text-blue-700">{faq.q}</summary>
          <p className="mt-2 text-gray-700">{faq.a}</p>
        </details>
      ))}
    </div>
  </section>
);

export default FAQList;
