import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 1단계: 핵심 컴포넌트만
import Header from "./components/Header.simple";
import Footer from "./components/Footer";
import Hero from "./components/Hero.simple";
import Features from "./components/Features";
import Steps from "./components/Steps";
import FAQList from "./components/FAQList";

// 컨텍스트
import { AuthProvider } from "./contexts/AuthContext";
import SEOHead from "./components/SEOHead";

// 홈 페이지 - 1단계: 기본 컴포넌트만
const HomePage: React.FC = () => (
  <>
    <SEOHead 
      title="돌봄서비스 - 전문 방문요양·간호·목욕 서비스"
      description="국가 지원금 85% 적용으로 합리적인 비용의 전문 돌봄 서비스"
      keywords="방문요양, 방문간호, 방문목욕, 돌봄서비스"
    />
    <Hero />
    <Features />
    <Steps />
    <FAQList />
  </>
);

// 서비스 페이지
const ServicesPage: React.FC = () => (
  <div className="py-16">
    <SEOHead title="서비스 안내 - 돌봄서비스" />
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">돌봄 서비스 안내</h1>
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
    <SEOHead title="자주 묻는 질문 - 돌봄서비스" />
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">자주 묻는 질문</h1>
      <FAQList />
    </div>
  </div>
);

// 문의 페이지
const ContactPage: React.FC = () => (
  <div className="py-16">
    <SEOHead title="문의하기 - 돌봄서비스" />
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">문의하기</h1>
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">연락처 정보</h3>
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="text-4xl mb-3">📞</div>
            <h4 className="font-semibold text-gray-800">전화 상담</h4>
            <p className="text-2xl font-bold text-blue-600">1588-0000</p>
            <p className="text-sm text-gray-600">평일 09:00 - 18:00</p>
          </div>
          <div className="bg-green-50 rounded-xl p-6">
            <div className="text-4xl mb-3">💬</div>
            <h4 className="font-semibold text-gray-800">카카오톡 상담</h4>
            <p className="text-lg font-medium text-green-600">@돌봄서비스</p>
            <p className="text-sm text-gray-600">24시간 상담 가능</p>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">상담 신청</h3>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-600 mb-4">전화 또는 카카오톡으로 상담 신청해주세요.</p>
            <div className="space-y-3">
              <a 
                href="tel:1588-0000" 
                className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-center hover:bg-blue-700 transition-colors"
              >
                📞 지금 전화하기
              </a>
              <a 
                href="https://pf.kakao.com/_xoLxoGT" 
                className="block w-full bg-yellow-400 text-gray-800 py-3 px-6 rounded-lg text-center hover:bg-yellow-500 transition-colors"
              >
                💬 카카오톡 상담
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// PC용 앱 - 1단계: 기본 기능만
const AppPC: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* 기본 네비게이션 */}
          <Header />
          
          {/* 기본 라우팅 */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* 404 페이지 */}
            <Route path="*" element={
              <div className="py-16 text-center">
                <SEOHead title="페이지를 찾을 수 없습니다 - 돌봄서비스" />
                <h1 className="text-4xl font-bold text-gray-800 mb-4">페이지를 찾을 수 없습니다</h1>
                <p className="text-gray-600 mb-8">요청하신 페이지가 존재하지 않습니다.</p>
                <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  홈으로 돌아가기
                </a>
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