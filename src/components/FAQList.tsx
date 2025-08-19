import React from "react";
import Card from "./Card";

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
  <section className="py-16 bg-gradient-to-br from-[#fdf6e3] via-[#e0e7ff] to-white">
    <h3 className="text-2xl md:text-3xl font-extrabold text-blue-800 mb-12 text-center font-serif tracking-tight">자주 묻는 질문</h3>
  <div className="space-y-12 max-w-3xl mx-auto px-6 md:px-8 py-2 md:py-4">
      {faqs.map((faq, i) => (
        <Card key={i} className="p-0 overflow-hidden">
          <details className="group transition-all duration-200">
            <summary className="font-bold cursor-pointer text-blue-700 text-lg flex items-center gap-2 group-open:text-yellow-700 group-open:bg-yellow-50 px-2 py-1 rounded-lg transition-all duration-200">
              <span className="inline-block w-6 h-6 text-blue-400">❓</span>
              {faq.q}
            </summary>
            <p className="mt-3 text-blue-800 text-base leading-relaxed font-medium">{faq.a}</p>
          </details>
        </Card>
      ))}
    </div>
  </section>
);

export default FAQList;
