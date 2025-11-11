import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import ScrollToTop from './components/ScrollToTop';
import { MobileLayout } from './layouts';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import Services from './components/sections/Services';
import Steps from './components/sections/Steps';
import FAQList from './components/FAQList';
import { CONTACT } from './constants';
import { AuthProvider } from './contexts/AuthContext';

/**
 * 모바일용 간소화된 앱
 * 모바일 디바이스에 최적화된 버전
 */
const AppMobile: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <MobileLayout>
      <Hero />
      <Features />
      <Services />
      <Steps />
      <FAQList />
        
      {/* 모바일용 간단한 연락처 */}
      <section id="contact" className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">문의하기</h2>
          
          <div className="grid gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-blue-600 text-4xl mb-3">📞</div>
              <h3 className="font-semibold text-gray-800 mb-2">전화 상담</h3>
              <p className="text-2xl font-bold text-blue-600">{CONTACT.PHONE}</p>
              <p className="text-sm text-gray-600">{CONTACT.BUSINESS_HOURS}</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-green-600 text-4xl mb-3">💬</div>
              <h3 className="font-semibold text-gray-800 mb-2">카카오톡 상담</h3>
              <p className="text-lg font-medium text-green-600">{CONTACT.KAKAO}</p>
              <p className="text-sm text-gray-600">24시간 상담 가능</p>
            </div>
          </div>

          <div className="space-y-3">
            <a 
              href={`tel:${CONTACT.PHONE}`}
              className="block w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              📞 지금 전화하기
            </a>
            <a 
              href={CONTACT.KAKAO_URL}
              className="block w-full bg-yellow-400 text-gray-800 py-4 rounded-lg text-lg font-medium hover:bg-yellow-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 카카오톡 상담
            </a>
          </div>
        </div>
      </section>
        </MobileLayout>
      </Router>
    </AuthProvider>
  </I18nextProvider>
  );
};

export default AppMobile;