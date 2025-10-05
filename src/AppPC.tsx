import React from "react";
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

// AI 및 고급 기능들
import SmartChatbot from "./components/SmartChatbot";
import AIChatbotSection from "./components/AIChatbotSection";
import AIDashboard from "./components/AIDashboard";
import AIFeaturesSection from "./components/AIFeaturesSection";

// 실시간 통계 및 분석
import RealTimeStats from "./components/RealTimeStats";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import CustomAnalytics from "./components/CustomAnalytics";
import SimpleAnalytics from "./components/SimpleAnalytics";
import PerformanceMonitor from "./components/PerformanceMonitor";

// 보안 시스템
import SecurityDashboard from "./components/SecurityDashboard";
import SecuritySection from "./components/SecuritySection";
import SecurityFeaturesSection from "./components/SecurityFeaturesSection";
import SecurityCenter from "./components/SecurityCenter";
import SecureLogin from "./components/SecureLogin";
import PrivacyCenter from "./components/PrivacyCenter";

// PWA 및 성능 기능
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import PWAStatusIndicator from "./components/PWAStatusIndicator";
import NotificationSystem from "./components/NotificationSystem";

// 사용자 경험 향상
import TestimonialList from "./components/TestimonialList";
import QuizSection from "./components/QuizSection";
import PersonalizationQuiz from "./components/PersonalizationQuiz";
import MapSection from "./components/MapSection";

// 협업 및 커뮤니케이션
import CollaborationSection from "./components/CollaborationSection";
import CollaborationDashboard from "./components/CollaborationDashboard";
import RealtimeChat from "./components/RealtimeChat";
import ChatInterface from "./components/ChatInterface";
import VideoCallSystem from "./components/VideoCallSystem";

// 글로벌 및 접근성
import GlobalizationDashboard from "./components/GlobalizationDashboard";
import AccessibilityToolbar from "./components/AccessibilityToolbar";

// 시스템 관리
import SystemMonitor from "./components/SystemMonitor";
import Dashboard from "./components/Dashboard";
import MyPage from "./components/MyPage";
import Login from "./components/Login";
import NoticeList from "./components/NoticeList";
import DownloadList from "./components/DownloadList";

// SEO 및 메타데이터
import SEOHead from "./components/SEOHead";

// 컨텍스트
import { AuthProvider } from "./contexts/AuthContext";

// 홈 페이지 컴포넌트 - 모든 고급 기능 포함
const HomePage: React.FC = () => (
  <>
    <SEOHead 
      title="돌봄서비스 - 전문 방문요양·간호·목욕 서비스"
      description="국가 지원금 85% 적용으로 합리적인 비용의 전문 돌봄 서비스. AI 기반 맞춤 케어, 24시간 응급 대응, 실시간 건강 모니터링"
      keywords="방문요양, 방문간호, 방문목욕, 돌봄서비스, 국가지원금, AI케어"
    />
    <Hero />
    <RealTimeStats />
    <Features />
    <AIFeaturesSection />
    <Services />
    <AIChatbotSection />
    <Steps />
    <SecuritySection />
    <TestimonialList />
    <CollaborationSection />
    <MapSection />
    <QuizSection />
    <CTA />
    <FAQList />
    <Contact />
    <GlobalizationDashboard />
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
      <MapSection />
    </div>
  </div>
);

// AI 대시보드 페이지
const AIDashboardPage: React.FC = () => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">AI 돌봄 시스템</h1>
      <AIDashboard />
      <SmartChatbot />
    </div>
  </div>
);

// 보안 센터 페이지
const SecurityCenterPage: React.FC = () => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">보안 센터</h1>
      <SecurityDashboard />
      <SecurityFeaturesSection />
      <PrivacyCenter />
    </div>
  </div>
);

// 분석 대시보드 페이지
const AnalyticsPage: React.FC = () => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">실시간 분석</h1>
      <AnalyticsDashboard />
      <SimpleAnalytics />
      <CustomAnalytics />
    </div>
  </div>
);

// 협업 센터 페이지
const CollaborationPage: React.FC = () => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">협업 센터</h1>
      <CollaborationDashboard />
      <RealtimeChat />
      <VideoCallSystem />
    </div>
  </div>
);

// 마이페이지
const MyPagePage: React.FC = () => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">마이페이지</h1>
      <MyPage />
      <PersonalizationQuiz />
    </div>
  </div>
);

// 로그인 페이지
const LoginPage: React.FC = () => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">로그인</h1>
      <SecureLogin />
    </div>
  </div>
);

// 공지사항 페이지
const NoticePage: React.FC = () => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">공지사항</h1>
      <NoticeList />
    </div>
  </div>
);

// 자료실 페이지
const DownloadsPage: React.FC = () => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">자료실</h1>
      <DownloadList />
    </div>
  </div>
);

// PC용 전체 기능 앱 - 모든 고급 기능 포함
const AppPC: React.FC = () => {

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
        {/* 시스템 모니터링 및 성능 */}
        <PerformanceMonitor />
        <SystemMonitor />
        
        {/* PWA 기능 */}
        <PWAInstallPrompt />
        <PWAStatusIndicator />
        
        {/* 알림 및 접근성 */}
        <NotificationSystem />
        <AccessibilityToolbar />
        
        {/* 네비게이션 */}
        <ScrollProgress />
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* AI 및 고급 기능 */}
          <Route path="/ai-dashboard" element={<AIDashboardPage />} />
          <Route path="/security" element={<SecurityCenterPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/collaboration" element={<CollaborationPage />} />
          
          {/* 사용자 관련 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage" element={<MyPagePage />} />
          
          {/* 정보 페이지 */}
          <Route path="/notices" element={<NoticePage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          
          {/* 404 페이지 */}
          <Route path="*" element={
            <div className="py-16 text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">페이지를 찾을 수 없습니다</h1>
              <p className="text-gray-600 mb-8">요청하신 페이지가 존재하지 않습니다.</p>
              <div className="space-x-4">
                <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  홈으로 돌아가기
                </a>
                <a href="/contact" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  문의하기
                </a>
              </div>
            </div>
          } />
        </Routes>

        <Footer />
        
        {/* 플로팅 UI */}
        <BackToTop />
        <SmartChatbot />
        <ChatInterface />
        
        {/* 글로벌 시스템 */}
        <Dashboard />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default AppPC;