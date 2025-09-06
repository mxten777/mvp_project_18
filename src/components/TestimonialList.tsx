import React from "react";
import Card from "./Card";

const testimonials = [
  {
    name: "김OO 가족",
    text: "요양보호사님께서 말동무도 해주시고… 우울증이 좀 좋아지셨다고…",
  },
  {
    name: "박OO 어르신 가족",
    text: "건강체크 해주시는 것도 좋다 하구요.",
  },
  {
    name: "이OO 가족",
    text: "아버지가 보행기 너무 좋아하세요~ 운동 열심히 하시겠다네요~ 감사합니다!",
  },
];

const TestimonialList: React.FC = () => (
  <section className="py-16 bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 rounded-2xl shadow-xl mx-2 mt-6">
  <h3 className="text-2xl md:text-3xl font-extrabold text-green-700 dark:text-gray-100 mb-12 text-center tracking-tight select-none" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>고객 후기</h3>
    <div className="grid gap-12 md:grid-cols-3 max-w-6xl mx-auto px-6 md:px-8 py-2 md:py-4">
      {testimonials.map((t, i) => (
        <Card key={i} className="flex flex-col items-center bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-7">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-200 to-green-100 dark:from-gray-800 dark:to-gray-700 shadow text-2xl mb-4 border-2 border-green-200 dark:border-gray-700 text-green-700 dark:text-gray-100">💬</span>
          <p className="text-green-700 dark:text-gray-100 text-center mb-3 text-lg font-medium leading-relaxed">“{t.text}”</p>
          <span className="text-base text-green-400 dark:text-gray-300 font-semibold">- {t.name}</span>
        </Card>
      ))}
    </div>
  </section>
);

export default TestimonialList;
