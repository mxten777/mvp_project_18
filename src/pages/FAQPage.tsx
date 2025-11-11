import React from 'react';
import SEOHead from '../components/SEOHead';
import FAQList from '../components/FAQList';

/**
 * 자주 묻는 질문 페이지
 */
const FAQPage: React.FC = () => {
  return (
    <>
      <SEOHead title="자주 묻는 질문 - 돌봄서비스" />
      <FAQList />
    </>
  );
};

export default FAQPage;
