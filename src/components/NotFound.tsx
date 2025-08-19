import React from "react";

const NotFound: React.FC = () => (
  <section className="py-16 flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-5xl font-bold text-blue-700 mb-4">404</h1>
    <p className="text-lg text-gray-600 mb-6">페이지를 찾을 수 없습니다.</p>
    <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">홈으로 돌아가기</a>
  </section>
);

export default NotFound;
