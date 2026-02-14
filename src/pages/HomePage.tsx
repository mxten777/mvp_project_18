import React, { lazy, Suspense } from 'react';
import SEOHead from '../components/ui/SEOHead';

// Lazy load components for better performance
const Hero = lazy(() => import('../components/sections/Hero'));
const Features = lazy(() => import('../components/sections/Features'));
const Services = lazy(() => import('../components/sections/Services'));
const Steps = lazy(() => import('../components/sections/Steps'));
const CTA = lazy(() => import('../components/sections/CTA'));
const FAQList = lazy(() => import('../components/ui/FAQList'));
const Contact = lazy(() => import('../components/sections/Contact'));

// Loading fallback component
const SectionLoader: React.FC = () => (
  <div className="w-full py-16 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

/**
 * 홈 페이지
 * @description 메인 랜딩 페이지 - lazy loading으로 초기 로딩 성능 최적화
 */
const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="돌봄서비스 - 전문 방문요양·간호·목욕 서비스"
        description="국가 지원금 85% 적용으로 합리적인 비용의 전문 돌봄 서비스"
        keywords="방문요양, 방문간호, 방문목욕, 돌봄서비스"
      />
      <Suspense fallback={<SectionLoader />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Steps />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <CTA />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FAQList />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
    </>
  );
};

export default HomePage;
