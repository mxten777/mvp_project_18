import React from "react";

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
  <section className="py-8">
    <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">고객 후기</h3>
    <div className="grid gap-4 md:grid-cols-3">
      {testimonials.map((t, i) => (
        <div key={i} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <p className="text-gray-700 text-center mb-2">“{t.text}”</p>
          <span className="text-sm text-gray-400">- {t.name}</span>
        </div>
      ))}
    </div>
  </section>
);

export default TestimonialList;
