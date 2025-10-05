import React, { useState, useEffect } from 'react';
import AppPC from './AppPC';
import AppMobile from './AppMobile';

// 디바이스 감지 훅
const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'ipod', 'blackberry', 'webos'];
      
      // User-Agent 기반 모바일 감지
      const isMobileUserAgent = mobileKeywords.some(keyword => userAgent.includes(keyword));
      
      // 화면 크기 기반 감지 (768px 이하를 모바일로 간주)
      const isMobileScreen = window.innerWidth <= 768;
      
      // 터치 지원 감지
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // 종합 판단: 모바일 User-Agent이거나 (작은 화면 + 터치 지원)
      setIsMobile(isMobileUserAgent || (isMobileScreen && isTouchDevice));
    };

    checkDevice();
    
    // 화면 크기 변경 감지
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return isMobile;
};

const App: React.FC = () => {
  const isMobile = useDeviceDetection();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 초기 로딩 완료
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white">💚</span>
          </div>
          <div className="text-lg font-medium text-gray-700">돌봄서비스</div>
          <div className="text-sm text-gray-500 mt-2">로딩 중...</div>
        </div>
      </div>
    );
  }

  console.log(`Rendering ${isMobile ? 'Mobile' : 'PC'} version`);

  return isMobile ? <AppMobile /> : <AppPC />;
};

export default App;