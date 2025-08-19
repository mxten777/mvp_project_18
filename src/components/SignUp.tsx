import React, { useState } from "react";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      setError("모든 항목을 입력해 주세요.");
      return;
    }
    if (password !== confirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setSuccess("회원가입이 완료되었습니다. (실제 가입은 추후 구현)");
    setName(""); setEmail(""); setPassword(""); setConfirm("");
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">회원가입</h2>
      <form className="bg-white rounded shadow p-6 space-y-4" onSubmit={handleSubmit} autoComplete="on" aria-label="회원가입 폼">
        <input
          className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="이름"
          value={name}
          onChange={e => setName(e.target.value)}
          aria-label="이름"
          aria-required="true"
          required
          autoComplete="name"
        />
        <input
          className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="이메일"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          aria-label="이메일"
          aria-required="true"
          required
          autoComplete="email"
        />
        <input
          className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          aria-label="비밀번호"
          aria-required="true"
          required
          autoComplete="new-password"
        />
        <input
          className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="비밀번호 확인"
          type="password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          aria-label="비밀번호 확인"
          aria-required="true"
          required
          autoComplete="new-password"
        />
        {error && <div className="text-red-500 text-sm" role="alert">{error}</div>}
        {success && <div className="text-green-600 text-sm" role="status">{success}</div>}
        <button
          className="btn btn-blue w-full py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-700"
          type="submit"
          aria-label="회원가입 제출"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
