import React from 'react';
import Header from './components/Header.simple';
import Hero from './components/Hero.simple';
import Features from './components/Features';
import Steps from './components/Steps';
import FAQList from './components/FAQList';
import Footer from './components/Footer';

// 모바일용 간소화된 앱
const AppMobile: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
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
                <p className="text-2xl font-bold text-blue-600">1588-0000</p>
                <p className="text-sm text-gray-600">평일 09:00 - 18:00</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-green-600 text-4xl mb-3">💬</div>
                <h3 className="font-semibold text-gray-800 mb-2">카카오톡 상담</h3>
                <p className="text-lg font-medium text-green-600">@돌봄서비스</p>
                <p className="text-sm text-gray-600">24시간 상담 가능</p>
              </div>
            </div>

            <div className="space-y-3">
              <a 
                href="tel:1588-0000" 
                className="block w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
              >
                📞 지금 전화하기
              </a>
              <a 
                href="https://pf.kakao.com/_xoLxoGT" 
                className="block w-full bg-yellow-400 text-gray-800 py-4 rounded-lg text-lg font-medium hover:bg-yellow-500 transition-colors"
              >
                💬 카카오톡 상담
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AppMobile;