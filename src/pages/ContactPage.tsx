import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import Contact from '../components/sections/Contact';

/**
 * 문의하기 페이지
 */
const ContactPage: React.FC = () => {
  return (
    <>
      <SEOHead title="문의하기 - 돌봄서비스" />
      <Contact />
    </>
  );
};

export default ContactPage;
