import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.complex";
import Footer from "./components/Footer";
import Hero from "./components/Hero.complex";
import Features from "./components/Features";
import Steps from "./components/Steps";
import FAQList from "./components/FAQList";
import Contact from "./components/Contact";
import Services from "./components/Services";
import CTA from "./components/CTA";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";

// 홈 페이지 컴포넌트
const HomePage: React.FC = () => (
  <>
    <Hero />
    <Features />
    <Services />
    <Steps />
    <CTA />
    <FAQList />
    <Contact />
  </>
);

// 서비스 페이지
const ServicesPage: React.FC = () => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">돌봄 서비스 안내</h1>
      <Services />
      <div className="mt-16">
        <Steps />
      </div>
    </div>
  </div>
);

// 비용 안내 페이지
const PricingPage: React.FC = () => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">비용 안내</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">방문요양</h3>
          <div className="text-3xl font-bold mb-4">월 50만원</div>
          <div className="text-gray-600 mb-6">국가지원금 85% 적용시 월 7.5만원</div>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 일상생활 지원</li>
            <li>• 신체활동 도움</li>
            <li>• 정서적 지원</li>
            <li>• 가사 지원</li>
          </ul>
        </div>
        <div className="bg-blue-50 rounded-xl shadow-lg p-8 border-2 border-blue-200">
          <div className="text-center text-blue-600 text-sm font-medium mb-2">추천</div>
          <h3 className="text-2xl font-bold text-blue-600 mb-4">방문간호</h3>
          <div className="text-3xl font-bold mb-4">월 80만원</div>
          <div className="text-gray-600 mb-6">국가지원금 85% 적용시 월 12만원</div>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 건강상태 체크</li>
            <li>• 투약 관리</li>
            <li>• 상처 처치</li>
            <li>• 의료진 연계</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">방문목욕</h3>
          <div className="text-3xl font-bold mb-4">회당 15만원</div>
          <div className="text-gray-600 mb-6">국가지원금 85% 적용시 회당 2.2만원</div>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 전문 목욕 서비스</li>
            <li>• 위생 관리</li>
            <li>• 안전한 목욕</li>
            <li>• 피부 관리</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// FAQ 페이지
const FAQPage: React.FC = () => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">자주 묻는 질문</h1>
      <FAQList />
    </div>
  </div>
);

// 문의 페이지
const ContactPage: React.FC = () => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">문의하기</h1>
      <Contact />
    </div>
  </div>
);

// PC용 전체 기능 앱
const AppPC: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <ScrollProgress />
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={
            <div className="py-16 text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">페이지를 찾을 수 없습니다</h1>
              <p className="text-gray-600">요청하신 페이지가 존재하지 않습니다.</p>
            </div>
          } />
        </Routes>

        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
};

export default AppPC;