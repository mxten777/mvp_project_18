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
    <div className="max-w-md mx-auto py-12 px-2">
      <h2 className="text-2xl font-bold mb-7 text-center text-green-600 tracking-tight select-none" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>회원가입</h2>
      <form
        className="bg-white/90 rounded-2xl shadow-xl p-8 space-y-5 border border-gray-100"
        onSubmit={handleSubmit}
        autoComplete="on"
        aria-label="회원가입 폼"
      >
        <input
          className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition shadow-sm"
          placeholder="이름"
          value={name}
          onChange={e => setName(e.target.value)}
          aria-label="이름"
          aria-required="true"
          required
          autoComplete="name"
        />
        <input
          className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition shadow-sm"
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
          className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition shadow-sm"
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
          className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition shadow-sm"
          placeholder="비밀번호 확인"
          type="password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          aria-label="비밀번호 확인"
          aria-required="true"
          required
          autoComplete="new-password"
        />
        {error && (
          <div className="text-red-500 text-sm px-1 pt-1 animate-shake" role="alert">{error}</div>
        )}
        {success && (
          <div className="text-green-600 text-sm px-1 pt-1 animate-fade-in" role="status">{success}</div>
        )}
        <button
          className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold text-base shadow-md transition focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          type="submit"
          aria-label="회원가입 제출"
          style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
