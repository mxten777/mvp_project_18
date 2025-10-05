import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 핵심 레이아웃 컴포넌트
import Header from "./components/Header.complex";
import Footer from "./components/Footer";
import Hero from "./components/Hero.complex";
import Features from "./components/Features";
import Steps from "./components/Steps";
import FAQList from "./components/FAQList";
import Contact from "./components/Contact";
import Services from "./components/Services";
import CTA from "./components/CTA";

// 네비게이션 및 UX
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

// 보안 시스템
import SecurityDashboard from "./components/SecurityDashboard";
import SecuritySection from "./components/SecuritySection";
import SecurityFeaturesSection from "./components/SecurityFeaturesSection";
import SecureLogin from "./components/SecureLogin";
import PrivacyCenter from "./components/PrivacyCenter";

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
import NoticeList from "./components/NoticeList";
import DownloadList from "./components/DownloadList";

// PWA 및 성능 기능
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import PWAStatusIndicator from "./components/PWAStatusIndicator";
import NotificationSystem from "./components/NotificationSystem";
import PerformanceMonitor from "./components/PerformanceMonitor";

// SEO 및 메타데이터
import SEOHead from "./components/SEOHead";

// 컨텍스트
import { AuthProvider } from "./contexts/AuthContext";

// 홈 페이지 컴포넌트 - 논리적 순서로 정리된 구조
const HomePage: React.FC = () => (
  <>
    <SEOHead 
      title="돌봄서비스 - 전문 방문요양·간호·목욕 서비스"
      description="국가 지원금 85% 적용으로 합리적인 비용의 전문 돌봄 서비스. AI 기반 맞춤 케어, 24시간 응급 대응, 실시간 건강 모니터링"
      keywords="방문요양, 방문간호, 방문목욕, 돌봄서비스, 국가지원금, AI케어"
    />
    
    {/* 1. 메인 히어로 섹션 */}
    <Hero />
    
    {/* 2. 실시간 통계 (신뢰도 향상) */}
    <RealTimeStats />
    
    {/* 3. 핵심 서비스 소개 */}
    <Features />
    <Services />
    <Steps />
    
    {/* 4. AI 기술 및 혁신 */}
    <AIFeaturesSection />
    <AIChatbotSection />
    
    {/* 5. 보안 및 신뢰성 */}
    <SecuritySection />
    
    {/* 6. 고객 만족도 */}
    <TestimonialList />
    
    {/* 7. 협업 및 커뮤니티 */}
    <CollaborationSection />
    
    {/* 8. 개인화 및 인터랙션 */}
    <QuizSection />
    <MapSection />
    
    {/* 9. CTA (행동 유도) */}
    <CTA />
    
    {/* 10. FAQ 및 문의 */}
    <FAQList />
    <Contact />
    
    {/* 11. 글로벌 대시보드 */}
    <GlobalizationDashboard />
  </>
);

// 서비스 페이지
const ServicesPage: React.FC = () => (
  <div className="py-16">
    <SEOHead title="서비스 안내 - 돌봄서비스" description="방문요양, 방문간호, 방문목욕 전문 서비스 안내" />
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
    <SEOHead title="비용 안내 - 돌봄서비스" description="국가지원금 85% 적용된 합리적인 돌봄서비스 비용 안내" />
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
    <SEOHead title="자주 묻는 질문 - 돌봄서비스" description="돌봄서비스 관련 자주 묻는 질문과 답변" />
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">자주 묻는 질문</h1>
      <FAQList />
    </div>
  </div>
);

// 문의 페이지
const ContactPage: React.FC = () => (
  <div className="py-16">
    <SEOHead title="문의하기 - 돌봄서비스" description="돌봄서비스 상담 및 문의" />
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">문의하기</h1>
      <Contact />
      <div className="mt-16">
        <MapSection />
      </div>
    </div>
  </div>
);

// AI 대시보드 페이지
const AIDashboardPage: React.FC = () => (
  <div className="py-16">
    <SEOHead title="AI 돌봄 시스템 - 돌봄서비스" description="AI 기반 스마트 돌봄 시스템 대시보드" />
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">AI 돌봄 시스템</h1>
      <AIDashboard />
      <div className="mt-16">
        <SmartChatbot />
      </div>
    </div>
  </div>
);

// 보안 센터 페이지
const SecurityCenterPage: React.FC = () => (
  <div className="py-16">
    <SEOHead title="보안 센터 - 돌봄서비스" description="개인정보 보호 및 보안 시스템" />
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">보안 센터</h1>
      <SecurityDashboard />
      <div className="mt-16">
        <SecurityFeaturesSection />
      </div>
      <div className="mt-16">
        <PrivacyCenter />
      </div>
    </div>
  </div>
);

// 분석 대시보드 페이지
const AnalyticsPage: React.FC = () => (
  <div className="py-16">
    <SEOHead title="실시간 분석 - 돌봄서비스" description="돌봄서비스 실시간 데이터 분석 대시보드" />
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">실시간 분석</h1>
      <AnalyticsDashboard />
      <div className="mt-16">
        <SimpleAnalytics />
      </div>
      <div className="mt-16">
        <CustomAnalytics />
      </div>
    </div>
  </div>
);

// 협업 센터 페이지
const CollaborationPage: React.FC = () => (
  <div className="py-16">
    <SEOHead title="협업 센터 - 돌봄서비스" description="팀 협업 및 커뮤니케이션 센터" />
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">협업 센터</h1>
      <CollaborationDashboard />
      <div className="mt-16">
        <RealtimeChat />
      </div>
      <div className="mt-16">
        <VideoCallSystem />
      </div>
    </div>
  </div>
);

// 마이페이지
const MyPagePage: React.FC = () => (
  <div className="py-16">
    <SEOHead title="마이페이지 - 돌봄서비스" description="개인 설정 및 서비스 관리" />
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">마이페이지</h1>
      <MyPage />
      <div className="mt-16">
        <PersonalizationQuiz />
      </div>
    </div>
  </div>
);

// 로그인 페이지
const LoginPage: React.FC = () => (
  <div className="py-16">
    <SEOHead title="로그인 - 돌봄서비스" description="안전한 로그인 시스템" />
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">로그인</h1>
      <SecureLogin />
    </div>
  </div>
);

// 공지사항 페이지
const NoticePage: React.FC = () => (
  <div className="py-16">
    <SEOHead title="공지사항 - 돌봄서비스" description="돌봄서비스 최신 공지사항" />
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">공지사항</h1>
      <NoticeList />
    </div>
  </div>
);

// 자료실 페이지
const DownloadsPage: React.FC = () => (
  <div className="py-16">
    <SEOHead title="자료실 - 돌봄서비스" description="돌봄서비스 관련 자료 다운로드" />
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">자료실</h1>
      <DownloadList />
    </div>
  </div>
);

// PC용 엔터프라이즈 앱 - 완벽하게 구조화된 아키텍처
const AppPC: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          
          {/* === 시스템 레이어 (백그라운드) === */}
          <PerformanceMonitor />
          <SystemMonitor />
          
          {/* === PWA & 알림 레이어 === */}
          <PWAInstallPrompt />
          <PWAStatusIndicator />
          <NotificationSystem />
          
          {/* === 접근성 레이어 === */}
          <AccessibilityToolbar />
          
          {/* === 네비게이션 레이어 === */}
          <ScrollProgress />
          <Header />
          
          {/* 페이지 라우팅 */}
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
                <SEOHead title="페이지를 찾을 수 없습니다 - 돌봄서비스" />
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

          {/* === 메인 푸터 === */}
          <Footer />
          
          {/* === 플로팅 UI 레이어 (사용자 도구) === */}
          <BackToTop />
          <SmartChatbot />
          <ChatInterface />
          
          {/* === 관리자 대시보드 (최하단) === */}
          <Dashboard />
          
        </div>
      </Router>
    </AuthProvider>
  );
};

export default AppPC;