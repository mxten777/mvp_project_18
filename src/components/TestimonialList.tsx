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
  <section className="py-16 bg-gradient-to-br from-[#e0e7ff] via-[#fdf6e3] to-white">
    <h3 className="text-2xl md:text-3xl font-extrabold text-blue-800 mb-12 text-center font-serif tracking-tight">고객 후기</h3>
  <div className="grid gap-16 md:grid-cols-3 max-w-6xl mx-auto px-6 md:px-8 py-2 md:py-4">
      {testimonials.map((t, i) => (
        <Card key={i} className="flex flex-col items-center">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-200 to-yellow-100 shadow text-2xl mb-4 border-2 border-blue-200 text-blue-700">💬</span>
          <p className="text-blue-800 text-center mb-3 text-lg font-medium leading-relaxed">“{t.text}”</p>
          <span className="text-base text-blue-400 font-semibold">- {t.name}</span>
        </Card>
      ))}
    </div>
  </section>
);

export default TestimonialList;
