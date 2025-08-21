import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Firebase 연동
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-16 px-2 md:px-0 max-w-md mx-auto bg-gradient-to-br from-green-50 via-white to-green-100 rounded-2xl shadow-xl mt-8">
        <div className="p-10 text-center text-green-700 font-extrabold text-xl select-none" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>
          상담 신청이 접수되었습니다.<br />빠른 시일 내 연락드리겠습니다.
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-2 md:px-0 max-w-md mx-auto bg-gradient-to-br from-green-50 via-white to-green-100 rounded-2xl shadow-xl mt-8">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white/95 rounded-2xl border border-gray-100 shadow-lg p-10">
        <h2
          className="text-2xl md:text-3xl font-extrabold text-green-700 mb-8 text-center tracking-tight select-none"
          style={{ fontFamily: 'Pretendard,Noto Sans KR,sans-serif' }}
        >
          상담 신청
        </h2>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="이름"
          required
          className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg transition-all duration-150"
          aria-label="이름"
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="연락처"
          required
          className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg transition-all duration-150"
          aria-label="연락처"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="문의 내용 (선택)"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg transition-all duration-150 min-h-[100px]"
          aria-label="문의 내용"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white font-bold py-3 rounded-xl shadow hover:from-green-500 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 active:bg-green-600 text-lg transition-all duration-150"
          aria-label="상담 신청 제출"
          role="button"
        >
          상담 신청하기
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
