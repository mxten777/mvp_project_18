import React from 'react';
import { BaseProps } from '../types';

interface AdminLayoutProps extends BaseProps {
  title?: string;
}

/**
 * 관리자 레이아웃
 * 관리자 페이지용 레이아웃
 */
const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  title = '관리자 대시보드',
  className = '' 
}) => {
  return (
    <div className={`min-h-screen bg-gray-100 ${className}`}>
      {/* 관리자 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>
      </header>

      {/* 관리자 컨텐츠 영역 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
