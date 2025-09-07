import React from "react";
import Card from "./Card";

const faqs = [
  {
    q: "서비스 신청은 어떻게 하나요?",
    a: "상단 메뉴의 상담신청 또는 대표번호(02-1234-5678)로 전화주시면 신속히 안내해드립니다. 온라인/전화 모두 가능합니다.",
  },
  {
    q: "국가 지원금은 얼마나 받을 수 있나요?",
    a: "장기요양등급을 받으신 경우 전체 비용의 85% 이상이 지원됩니다. 기초생활수급자 등은 본인부담금이 감면 또는 면제될 수 있습니다.",
  },
  {
    q: "방문요양, 방문간호, 방문목욕 모두 신청 가능한가요?",
    a: "네, 한 번의 상담으로 모든 서비스 통합 신청이 가능합니다. 어르신 상태에 따라 맞춤형 서비스가 제공됩니다.",
  },
  {
    q: "장기요양등급이 없는데도 이용할 수 있나요?",
    a: "등급이 없으신 경우 등급신청 절차부터 무료로 안내해드리며, 필요시 민간 서비스도 상담 가능합니다.",
  },
  {
    q: "서비스 이용 절차는 어떻게 되나요?",
    a: "상담 → 방문상담/상태확인 → 서비스 계획 수립 → 계약 및 서비스 시작 순으로 진행됩니다.",
  },
  {
    q: "필요한 서류나 준비물이 있나요?",
    a: "장기요양인정서, 신분증, 건강보험증 등이 필요할 수 있습니다. 상황에 따라 상세히 안내해드립니다.",
  },
  {
    q: "가족이 멀리 살아도 서비스 이용이 가능한가요?",
    a: "네, 가족이 멀리 계셔도 센터에서 어르신의 상태를 정기적으로 보고드리며, 가족과의 소통을 적극 지원합니다.",
  },
  {
    q: "요양보호사/간호사 등 인력은 어떤 분들인가요?",
    a: "경력과 자격을 갖춘 전문 인력만을 채용하며, 정기 교육과 평가를 통해 서비스 품질을 유지합니다.",
  },
  {
    q: "서비스 비용은 어떻게 결제하나요?",
    a: "본인부담금은 계좌이체, 카드 등 다양한 방법으로 결제 가능합니다. 자세한 내용은 상담 시 안내해드립니다.",
  },
  {
    q: "기타 궁금한 점은 어디로 문의하나요?",
    a: "대표번호(02-1234-5678) 또는 홈페이지 문의를 통해 언제든 연락주시면 친절히 안내해드립니다.",
  },
];

const FAQList: React.FC = () => (
  <section className="py-16 bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 rounded-2xl shadow-xl mx-2 mt-6">
  <h3 className="text-2xl md:text-3xl font-extrabold text-green-700 dark:text-gray-100 mb-12 text-center tracking-tight select-none" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>자주 묻는 질문</h3>
    <div className="space-y-8 max-w-3xl mx-auto px-6 md:px-8 py-2 md:py-4">
      {faqs.map((faq, i) => (
        <Card key={i} className="p-0 overflow-hidden bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <details className="group transition-all duration-200">
            <summary className="font-bold cursor-pointer text-green-700 dark:text-gray-100 text-lg flex items-center gap-2 group-open:text-green-600 dark:group-open:text-gray-300 group-open:bg-green-50 dark:group-open:bg-gray-700 px-3 py-2 rounded-xl transition-all duration-200 select-none" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>
              <span className="inline-block w-6 h-6 text-green-400 dark:text-gray-300">❓</span>
              {faq.q}
            </summary>
            <p className="mt-3 text-green-700 dark:text-gray-100 text-base leading-relaxed font-medium">{faq.a}</p>
          </details>
        </Card>
      ))}
    </div>
  </section>
);

export default FAQList;
