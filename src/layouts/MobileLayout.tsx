import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BaseProps } from '../types';

interface MobileLayoutProps extends BaseProps {
  showHeader?: boolean;
  showFooter?: boolean;
}

/**
 * 모바일 레이아웃
 * 모바일 디바이스용 간소화된 레이아웃
 */
const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  showHeader = true, 
  showFooter = true,
  className = '' 
}) => {
  return (
    <div className={`min-h-screen bg-white dark:bg-secondary-950 ${className}`}>
      {showHeader && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header />
        </div>
      )}
      <main className={`${showHeader ? 'pt-20' : ''}`}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default MobileLayout;
