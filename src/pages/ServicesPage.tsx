import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import Services from '../components/sections/Services';

/**
 * 서비스 안내 페이지
 */
const ServicesPage: React.FC = () => {
  return (
    <>
      <SEOHead title="서비스 안내 - 돌봄서비스" />
      <Services />
    </>
  );
};

export default ServicesPage;
