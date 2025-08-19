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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xs mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h3 className="text-lg font-bold text-blue-700 mb-2">관리자 로그인</h3>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="이메일"
        required
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="이메일"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="비밀번호"
        required
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="비밀번호"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        로그인
      </button>
    </form>
  );
};

export default Login;
