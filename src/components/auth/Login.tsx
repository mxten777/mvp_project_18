import React, { useState } from "react";

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Firebase Auth 연동
    setError("(샘플) 로그인 기능은 추후 구현됩니다.");
  };

  return (
    <section className="py-16 px-2 md:px-0 max-w-md mx-auto bg-gradient-to-br from-green-50 via-white to-green-100 rounded-2xl shadow-xl mt-12">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white/95 rounded-2xl border border-gray-100 shadow-lg p-10">
        <h2
          className="text-2xl md:text-3xl font-extrabold text-green-700 mb-8 text-center tracking-tight select-none"
          style={{ fontFamily: 'Pretendard,Noto Sans KR,sans-serif' }}
        >
          관리자 로그인
        </h2>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="이메일"
          required
          className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg transition-all duration-150"
          aria-label="이메일"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호"
          required
          className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg transition-all duration-150"
          aria-label="비밀번호"
        />
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white font-bold py-3 rounded-xl shadow hover:from-green-500 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 active:bg-green-600 text-lg transition-all duration-150"
        >
          로그인
        </button>
      </form>
    </section>
  );
};

export default Login;
