/**
 * 간단한 분석 테스트 페이지
 */

import React from 'react';

const SimpleAnalytics: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        🎉 분석 대시보드 작동 성공!
      </h1>
      
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">분석 시스템이 정상 작동합니다!</h2>
        
        <div className="space-y-4">
          <p className="text-lg">✅ 라우팅 정상 작동</p>
          <p className="text-lg">✅ React 컴포넌트 렌더링 성공</p>
          <p className="text-lg">✅ 분석 페이지 접근 가능</p>
        </div>
        
        <div className="mt-6 p-4 bg-green-100 rounded">
          <h3 className="font-bold text-green-800">상태: 정상</h3>
          <p className="text-green-700">분석 시스템이 성공적으로 구축되었습니다.</p>
        </div>
        
        <div className="mt-4">
          <a href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
};

export default SimpleAnalytics;