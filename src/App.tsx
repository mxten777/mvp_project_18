import React, { useState, useEffect } from 'react';

// PC용 전체 기능 App
import AppPC from './AppPC';
// 모바일용 간소화 App  
import AppMobile from './AppMobile';

// 디바이스 감지 훅
const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return isMobile;
};

function App() {
  const isMobile = useDeviceDetection();

  // 로딩 중에는 기본 스피너 표시
  if (typeof isMobile === 'undefined') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // PC: 전체 기능, 모바일: 간소화된 기능
  return isMobile ? <AppMobile /> : <AppPC />;
}

export default App;