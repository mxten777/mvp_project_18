import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 기본 컴포넌트만 임포트
import Header from "./components/Header.simple";
import Footer from "./components/Footer";
import Hero from "./components/Hero.simple";

// 컨텍스트
import { AuthProvider } from "./contexts/AuthContext";

// 임시 간단한 홈 페이지
const HomePage: React.FC = () => (
  <>
    <Hero />
    <div className="py-16 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">테스트 페이지</h2>
      <p className="text-gray-600">기본 컴포넌트 로딩 테스트 중입니다.</p>
    </div>
  </>
);

// 임시 단순화된 AppPC
const AppPC: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* 기본 네비게이션만 */}
          <Header />
          
          {/* 기본 라우팅 */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={
              <div className="py-16 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">페이지를 찾을 수 없습니다</h1>
                <p className="text-gray-600">요청하신 페이지가 존재하지 않습니다.</p>
              </div>
            } />
          </Routes>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default AppPC;