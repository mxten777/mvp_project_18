import NotFound from "./components/NotFound";
import MyPage from "./components/MyPage";
import DownloadList from "./components/DownloadList";
import NoticeList from "./components/NoticeList";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import PrivacyCenter from "./components/PrivacyCenter";
import SecurityDashboard from "./components/SecurityDashboard";
import SEOHead from "./components/SEOHead";
import PerformanceMonitor from "./components/PerformanceMonitor";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import CustomAnalytics from "./components/CustomAnalytics";
import SimpleAnalytics from "./components/SimpleAnalytics";
import AIDashboard from "./components/AIDashboard";
import SmartChatbot from "./components/SmartChatbot";
import CollaborationDashboard from "./components/CollaborationDashboard";
import { SEOManager } from "./utils/seo";
import { useAnalytics } from "./hooks/useAnalytics";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main 
    id="main-content"
    className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh] bg-transparent dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"
    role="main"
    aria-label="주요 콘텐츠"
    tabIndex={-1}
  >
    {children}
  </main>
);



import Features from "./components/Features";
import Steps from "./components/Steps";
import TestimonialList from "./components/TestimonialList";
import FAQList from "./components/FAQList";
import QuizSection from "./components/QuizSection";
import RealTimeStats from "./components/RealTimeStats";
import AIChatbotSection from "./components/AIChatbotSection";
import ChatInterface from "./components/ChatInterface";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import PWAStatusIndicator from "./components/PWAStatusIndicator";
import SecuritySection from "./components/SecuritySection";
import AccessibilityToolbar from "./components/AccessibilityToolbar";
import AccessibleHero from "./components/AccessibleHero";
import AIFeaturesSection from "./components/AIFeaturesSection";
import CollaborationSection from "./components/CollaborationSection";
import SecurityFeaturesSection from "./components/SecurityFeaturesSection";
import SecurityCenter from "./components/SecurityCenter";
import GlobalizationDashboard from "./components/GlobalizationDashboard";

const Home = () => (
  <>
    <AccessibleHero />
    <QuizSection />
    <RealTimeStats />
    <AIChatbotSection />
    <AIFeaturesSection />
    <CollaborationSection />
    <SecurityFeaturesSection />
    <Features />
    <SecuritySection />
    <Steps />
    <TestimonialList />
    <FAQList />
    <ChatInterface />
    <PWAInstallPrompt />
    <PWAStatusIndicator />
  </>
);

const About = () => (
  <section className="py-16 w-full">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h3 className="text-3xl md:text-4xl font-bold text-left text-secondary-800 dark:text-secondary-100 mb-12 tracking-tight font-heading">
        센터소개
      </h3>
      <div className="bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-secondary-200 dark:border-secondary-700 p-8 md:p-12 space-y-8">
        <p className="text-lg md:text-xl leading-relaxed text-secondary-700 dark:text-secondary-300 font-medium">
          바이칼 재가복지센터는 어르신과 가족의 행복을 최우선으로 생각합니다. 방문요양, 방문간호, 방문목욕 등 다양한 재가복지 서비스를 통해 어르신의 건강과 일상, 가족의 안심을 함께 지켜드립니다.
        </p>
        
        <div className="bg-primary-50/80 dark:bg-primary-900/30 rounded-xl p-6 border-l-4 border-primary-500">
          <h4 className="text-lg font-semibold text-secondary-800 dark:text-secondary-200 mb-4">우리의 강점</h4>
          <ul className="space-y-3 text-secondary-700 dark:text-secondary-300">
            <li className="flex items-start gap-3">
              <span className="text-primary-500 mt-1">✓</span>
              <span>전문 요양보호사, 간호사, 사회복지사 등 우수 인력 보유</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-500 mt-1">✓</span>
              <span>맞춤형 서비스 설계 및 1:1 상담</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-500 mt-1">✓</span>
              <span>국가 지원금 85% 이상, 합리적 비용</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-500 mt-1">✓</span>
              <span>신속한 상담 및 신청, 투명한 운영</span>
            </li>
          </ul>
        </div>
        
        <p className="text-lg leading-relaxed text-secondary-700 dark:text-secondary-300 border-l-4 border-primary-300 pl-6 bg-primary-50/30 dark:bg-primary-900/20 py-4 rounded-r-lg">
          지역사회와 함께하는 신뢰받는 복지센터로, 언제든 문의·상담 환영합니다.
        </p>
      </div>
    </div>
  </section>
);
import ServiceDetailList from "./components/ServiceDetailList";
const Services = () => (
  <section className="py-10 w-full">
    <h3 className="text-2xl font-bold text-center text-green-600 dark:text-gray-100 mb-7 tracking-tight select-none" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>서비스 소개</h3>
  <div className="mb-6 text-base leading-relaxed text-gray-800 dark:text-gray-200 max-w-3xl mx-auto px-2">
      <p>바이칼 재가복지센터는 방문요양, 방문간호, 방문목욕 등 다양한 재가복지 서비스를 제공합니다. 각 서비스는 어르신의 건강상태와 가족의 상황에 맞춰 맞춤형으로 설계됩니다.</p>
    </div>
  <ServiceDetailList />
  </section>
);
const Pricing = () => (
  <section className="py-10 w-full">
    <h3 className="text-2xl font-bold text-center text-green-600 dark:text-gray-100 mb-7 tracking-tight select-none" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>서비스 비용 안내</h3>
  <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 px-4 space-y-5 text-base leading-relaxed text-gray-800 dark:text-gray-200 max-w-2xl mx-auto">
      <p>국가 장기요양보험 지원으로 전체 비용의 85% 이상이 지원됩니다. 본인부담금은 서비스 종류, 등급, 이용시간에 따라 다르며, 자세한 내용은 상담 시 안내해드립니다.</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>방문요양: 월 10만원~20만원대(본인부담 기준)</li>
        <li>방문간호/목욕: 서비스별 상이</li>
        <li>기초생활수급자 등 감면/면제 가능</li>
      </ul>
      <p>정확한 비용은 1:1 상담을 통해 안내해드립니다.</p>
    </div>
  </section>
);
const Reviews = () => (
  <section className="py-10 w-full">
    <h3 className="text-2xl font-bold text-center text-green-600 dark:text-gray-100 mb-7 tracking-tight select-none" style={{fontFamily:'Pretendard,Noto Sans KR,sans-serif'}}>고객 후기</h3>
  <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 px-4 space-y-5 text-base leading-relaxed text-gray-800 dark:text-gray-200 max-w-2xl mx-auto">
      <p>실제 이용자와 가족분들의 소중한 후기를 통해 센터의 신뢰와 만족도를 확인하세요.</p>
  <ul className="list-disc pl-5 space-y-3">
        <li className="text-white">“요양보호사 선생님이 친절하고 세심하게 돌봐주셔서 안심이 됩니다. 매번 시간 맞춰 방문해주셔서 감사해요.”</li>
        <li className="text-blue-300">“상담부터 서비스까지 빠르고 투명해서 믿음이 갑니다. 궁금한 점도 바로바로 안내해주셔서 좋았습니다.”</li>
        <li className="text-white">“어르신이 밝아지고 가족 모두가 만족합니다. 집안 분위기도 한결 좋아졌어요.”</li>
        <li className="text-blue-300">“갑작스러운 일정 변경에도 유연하게 대응해주셔서 정말 고마웠습니다.”</li>
        <li className="text-white">“방문간호 서비스 덕분에 건강 관리가 한결 수월해졌어요. 전문 간호사님께 감사드립니다.”</li>
        <li className="text-blue-300">“기초생활수급자라 비용이 부담됐는데, 친절하게 안내해주셔서 큰 도움이 됐습니다.”</li>
      </ul>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">※ 더 많은 실제 후기는 상담 시 안내해드립니다.</p>
    </div>
  </section>
);
const FAQ = () => <FAQList />;
import ContactInfo from "./components/ContactInfo";
import MapSection from "./components/MapSection";
const Contact = () => (
  <div className="py-8 space-y-8">
    <ContactInfo />
    <MapSection />
  </div>
);
import ContactForm from "./components/ContactForm";
const Apply = () => (
  <div className="py-8">
    <ContactForm />
  </div>
);
import SecureLogin from "./components/SecureLogin";
import DashboardPage from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import AdminNotice from "./components/AdminNotice";
import AdminDownload from "./components/AdminDownload";
import AdminUser from "./components/AdminUser";
import SignUp from "./components/SignUp";
import AdminApplication from "./components/AdminApplication";
const Login = () => (
  <SecureLogin />
);
const Dashboard = () => (
  <DashboardPage />
);

function App() {
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
  const seoManager = SEOManager.getInstance();
  
  // 분석 시스템은 개별 페이지에서 필요에 따라 초기화

  useEffect(() => {
    // 기본 SEO 설정
    seoManager.setTitle('신뢰할 수 있는 돌봄 서비스');
    seoManager.setMeta('description', '전문적이고 안전한 요양보호 서비스로 어르신들의 건강하고 행복한 일상을 지원합니다.');
    seoManager.setMeta('keywords', '요양보호, 돌봄서비스, 요양보호사, 재가요양, 방문요양, 장기요양보험');
    
    // Open Graph 설정
    seoManager.setOpenGraph({
      title: '신뢰할 수 있는 돌봄 서비스 | 요양보호 전문센터',
      description: '전문적이고 안전한 요양보호 서비스로 어르신들의 건강하고 행복한 일상을 지원합니다.',
      type: 'website',
      url: window.location.href,
      image: '/images/og-image.jpg',
      siteName: '요양보호 전문센터'
    });

    // 키보드 단축키 설정
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'p') {
        e.preventDefault();
        setShowPerformanceMonitor(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [seoManager]);

  return (
    <AuthProvider>
      <Router>
          {/* SEO 헤드 */}
          <SEOHead />
          
          {/* 성능 모니터 */}
          <PerformanceMonitor 
            isVisible={showPerformanceMonitor}
            onClose={() => setShowPerformanceMonitor(false)}
          />

          {/* 성능 모니터 토글 버튼 */}
          <button
            onClick={() => setShowPerformanceMonitor(true)}
            className="fixed bottom-4 left-4 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
            title="성능 모니터 열기 (Alt+P)"
            aria-label="성능 모니터"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>

          <ScrollProgress />
          <Header />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/admin/application" element={<AdminApplication />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/notice" element={<AdminNotice />} />
              <Route path="/admin/download" element={<AdminDownload />} />
              <Route path="/admin/user" element={<AdminUser />} />
              <Route path="/notices" element={<NoticeList />} />
              <Route path="/downloads" element={<DownloadList />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/privacy" element={<PrivacyCenter />} />
              <Route path="/security" element={<SecurityDashboard />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route path="/analytics/custom" element={<CustomAnalytics />} />
              <Route path="/analytics/simple" element={<SimpleAnalytics />} />
              <Route path="/ai" element={<AIDashboard />} />
              <Route path="/ai/chatbot" element={<SmartChatbot className="h-screen" />} />
              <Route path="/collaboration" element={<CollaborationDashboard />} />
              <Route path="/security-center" element={<SecurityCenter />} />
              <Route path="/globalization" element={<GlobalizationDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
          <Footer />
          <BackToTop />
          <AccessibilityToolbar />
        </Router>
      </AuthProvider>
  );
}

export default App;
