import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BaseProps } from '../types';

interface MainLayoutProps extends BaseProps {
  showHeader?: boolean;
  showFooter?: boolean;
}

/**
 * 메인 레이아웃
 * 전체 페이지의 공통 레이아웃 (헤더, 푸터 포함)
 */
const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  showHeader = true, 
  showFooter = true,
  className = '' 
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-secondary-950 ${className}`}>
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

export default MainLayout;
