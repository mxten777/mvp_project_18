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
    return <div className="p-6 text-center text-blue-700 font-bold">상담 신청이 접수되었습니다. 빠른 시일 내 연락드리겠습니다.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-blue-700 mb-2">상담 신청</h3>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="이름"
        required
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="이름"
      />
      <input
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="연락처"
        required
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="연락처"
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="문의 내용 (선택)"
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="문의 내용"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-800 text-base"
        aria-label="상담 신청 제출"
        role="button"
      >
        상담 신청하기
      </button>
    </form>
  );
};

export default ContactForm;
